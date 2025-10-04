"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PromptItem } from "./_components/PromptItem";
import { FolderItem } from "./_components/FolderItem";
import { CreateFolderDialog } from "./_components/CreateFolderDialog";
import { ShareDialog } from "./_components/share-dialog";
import { useOnboarding } from "@/hooks/use-onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, FolderPlus, Search, Share } from "lucide-react";
import { Prompt } from "@/types";
import { mockPrompts, mockFolders } from "@/lib/mock-data";

import { readProfile } from "@/lib/actions/profile.actions";
import { Profile } from "@/types";

import OnboardingDialog from "./_components/OnboardingDialog";
import UpgradeBanner from "./_components/UpgradeBanner";
import ProfileInfo from "./_components/ProfileInfo";
import EmptyState from "./_components/EmptyState";

export default function UsernamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const showOnboarding = searchParams.get("onboarding") === "true";
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await readProfile();
      setProfile(profile);
    };
    fetchProfile();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [editingFolder, setEditingFolder] = useState<{
    id: string;
    name: string;
    color: string;
  } | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const { isOpen, onSubmit, onClose } = useOnboarding();

  const handleNewPrompt = () => {
    router.push("/prompt/new");
  };

  const handleEditPrompt = (promptId: string) => {
    router.push(`/prompt/edit/${promptId}`);
  };

  const handleDeletePrompt = (promptId: string) => {
    console.log("Deleting prompt:", promptId);
    // TODO: Implement delete functionality
  };

  const handleUsePrompt = (promptId: string) => {
    // Find the prompt in mockPrompts or nested in folders
    let prompt = mockPrompts.find((p) => p.id === promptId);

    if (!prompt) {
      // Look for the prompt in folders
      for (const folder of mockFolders) {
        const foundPrompt = folder.prompts.find(
          (p: Prompt) => p.id === promptId
        );
        if (foundPrompt) {
          prompt = foundPrompt;
          break;
        }
      }
    }

    if (prompt) {
      setSelectedPrompt(prompt);
    }
  };

  // Filter prompts and folders based on search query
  const filteredPrompts = mockPrompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFolders = mockFolders.filter(
    (folder) =>
      folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folder.prompts.some(
        (prompt: Prompt) =>
          prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    profile && (
      <div className="mt-12">
        {/* Onboarding Overlay */}
        {showOnboarding && <OnboardingDialog />}
        <UpgradeBanner />

        {/* Main Content */}
        <div className="mt-12">
          <ProfileInfo username={profile.username} />

          <section className="mt-8">
            {/* Saved prompts, buttons */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold">Saved prompts</h1>
              <div className="flex gap-2">
                <Button
                  onClick={handleNewPrompt}
                  size="default"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                  New prompt
                </Button>
                <CreateFolderDialog />

                <Button
                  variant="outline"
                  onClick={() => setIsShareDialogOpen(true)}
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg">
              {/* Search Bar */}
              <div className="h-14 flex items-center pl-5">
                <Search className="h-5 w-5 text-gray-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search prompts..."
                  className="border-0 outline-none focus:outline-none focus:ring-0 focus:shadow-none focus:border-transparent appearance-none bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
                />
              </div>

              {filteredPrompts.length === 0 && filteredFolders.length === 0 && (
                <EmptyState />
              )}

              {/* Prompts and Folders List */}
              <ul className="list-none pb-2">
                {/* Folders */}
                {filteredFolders.map((folder) => (
                  <FolderItem
                    key={folder.id}
                    name={folder.name}
                    color={folder.color}
                    prompts={folder.prompts}
                    onEdit={() => handleEditFolder(folder.id)}
                    onDelete={() => handleDeleteFolder(folder.id)}
                    onUsePrompt={handleUsePrompt}
                    onEditPrompt={handleEditPrompt}
                    onDeletePrompt={handleDeletePrompt}
                  />
                ))}

                {/* Individual Prompts */}
                {filteredPrompts.map((prompt) => (
                  <PromptItem
                    key={prompt.id}
                    id={prompt.id}
                    title={prompt.title}
                    description={prompt.description}
                    onEdit={() => handleEditPrompt(prompt.id)}
                    onDelete={() => handleDeletePrompt(prompt.id)}
                    onUse={() => handleUsePrompt(prompt.id)}
                  />
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Share Dialog */}
        <ShareDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          userName={profile.username}
        />
      </div>
    )
  );
}
