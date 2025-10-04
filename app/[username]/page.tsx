"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PromptItem from "./_components/PromptItem";

import FolderItem from "./_components/FolderItem";

import { CreateFolderDialog } from "./_components/CreateFolderDialog";
import { ShareDialog } from "./_components/share-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Share } from "lucide-react";
import { Prompt } from "@/types";

import { readProfile } from "@/lib/actions/profile.actions";
import { Profile, Folder } from "@/types";

import OnboardingDialog from "./_components/OnboardingDialog";
import UpgradeBanner from "./_components/UpgradeBanner";
import ProfileInfo from "./_components/ProfileInfo";
import EmptyState from "./_components/EmptyState";
import { readFolders } from "@/lib/actions/folder.actions";
import { readPrompts } from "@/lib/actions/prompt.actions";

export default function UsernamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const showOnboarding = searchParams.get("onboarding") === "true";
  const [profile, setProfile] = useState<Profile | null>(null);

  const [folders, setFolders] = useState<Folder[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await readProfile();
      setProfile(profile);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchPrompts = async () => {
      const prompts = await readPrompts();
      setPrompts(prompts);
    };
    fetchPrompts();
  }, []);

  useEffect(() => {
    const fetchFolders = async () => {
      const folders = await readFolders();
      setFolders(folders);
      console.log(folders);
    };
    fetchFolders();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

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
                  onClick={() => router.push("/prompt/new")}
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

              {prompts.length === 0 && <EmptyState />}

              {/* Prompts and Folders List */}
              <ul className="list-none pb-2">
                {/* Folders */}
                {folders.map((folder) => (
                  <FolderItem key={folder.id} name={folder.name} />
                ))}
                {prompts.map((prompt) => (
                  <PromptItem
                    key={prompt.id}
                    title={prompt.title}
                    content={prompt.content}
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
