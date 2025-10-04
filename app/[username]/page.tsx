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

import OnboardingOverlay from "./_components/OnboardingOverlay";
import UpgradeBanner from "./_components/UpgradeBanner";
import ProfileInfo from "./_components/ProfileInfo";
import EmptyState from "./_components/EmptyState";

interface UsernamePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function UsernamePage({ params }: UsernamePageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const showOnboarding = searchParams.get("onboarding") === "true";

  const [username, setUsername] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
    useState(false);
  const [isEditFolderDialogOpen, setIsEditFolderDialogOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<{
    id: string;
    name: string;
    color: string;
  } | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const { isOpen, onSubmit, onClose } = useOnboarding();

  // Resolve params promise
  useEffect(() => {
    params.then(({ username }) => {
      setUsername(username);
    });
  }, [params]);

  const handleNewPrompt = () => {
    router.push("/prompt/new");
  };

  const handleNewFolder = () => {
    setIsCreateFolderDialogOpen(true);
  };

  const handleCreateFolder = (name: string, color: string) => {
    // For now, just log the folder creation
    // In a real app, this would make an API call to create the folder
    console.log("Creating folder:", { name, color });

    // TODO: Add the new folder to the mockFolders state
    // This would be replaced with actual API call in production
  };

  const handleEditPrompt = (promptId: string) => {
    router.push(`/prompt/edit/${promptId}`);
  };

  const handleDeletePrompt = (promptId: string) => {
    console.log("Deleting prompt:", promptId);
    // TODO: Implement delete functionality
  };

  const handleEditFolder = (folderId: string) => {
    // Find the folder to edit
    const folderToEdit = mockFolders.find((f) => f.id === folderId);
    if (folderToEdit) {
      setEditingFolder({
        id: folderToEdit.id,
        name: folderToEdit.name,
        color: folderToEdit.color || "gray",
      });
      setIsEditFolderDialogOpen(true);
    }
  };

  const handleSaveFolder = (name: string, color: string) => {
    if (editingFolder) {
      console.log("Saving folder changes:", {
        id: editingFolder.id,
        name,
        color,
      });
      // TODO: Implement actual save logic here
      // For now, just log the changes
    }
    setEditingFolder(null);
    setIsEditFolderDialogOpen(false);
  };

  const handleDeleteFolder = (folderId: string) => {
    console.log("Deleting folder:", folderId);
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
    <div className="mt-12">
      {/* Onboarding Overlay */}
      {showOnboarding && <OnboardingOverlay />}
      <UpgradeBanner />

      {/* Main Content */}
      <div className="mt-12">
        <ProfileInfo username={username} />

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
              <Button
                onClick={handleNewFolder}
                size="default"
                variant="outline"
              >
                <FolderPlus className="h-4 w-4" />
                New folder
              </Button>
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

      {/* Create Folder Dialog */}
      <CreateFolderDialog
        open={isCreateFolderDialogOpen}
        onOpenChange={setIsCreateFolderDialogOpen}
        onCreateFolder={handleCreateFolder}
      />

      {/* Edit Folder Dialog */}
      <CreateFolderDialog
        open={isEditFolderDialogOpen}
        onOpenChange={setIsEditFolderDialogOpen}
        onCreateFolder={handleSaveFolder}
        mode="edit"
        initialData={
          editingFolder
            ? { name: editingFolder.name, color: editingFolder.color }
            : undefined
        }
      />

      {/* Share Dialog */}
      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        userName={username}
      />
    </div>
  );
}
