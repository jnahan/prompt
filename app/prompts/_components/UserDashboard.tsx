"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import UpgradeBanner from "./UpgradeBanner";
import QuickLinks from "./QuickLinks";
import EmptyState from "./EmptyState";
import PromptItem from "./PromptItem";
import FolderItem from "./FolderItem";
import CreateFolderDialog from "./CreateFolderDialog";
import ShareDialog from "./ShareDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

import type { Profile, Folder, Prompt } from "@/types";

type TabType = "my" | "saved" | "all";

interface UserDashboardProps {
  profile: Profile;
  folders: Folder[];
  prompts: Prompt[];
  savedPrompts?: Prompt[];
  isOwnProfile?: boolean;
  currentUserId?: string;
}

export default function UserDashboard({
  profile,
  folders,
  prompts,
  savedPrompts = [],
  isOwnProfile = true,
  currentUserId,
}: UserDashboardProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFolderIds, setOpenFolderIds] = useState<string[]>([]);

  // Determine which prompts to display based on active tab
  const displayPrompts = useMemo(() => {
    if (!isOwnProfile) {
      return prompts; // Always show user's prompts when viewing someone else's profile
    }

    switch (activeTab) {
      case "my":
        return prompts;
      case "saved":
        // Remove folder_id from saved prompts so they display in a flat list
        return savedPrompts.map((p) => ({ ...p, folder_id: undefined }));
      case "all":
        // Combine my prompts and saved prompts, removing duplicates
        // Remove folder_id from saved prompts in the "all" view too
        const allPromptsMap = new Map<string, Prompt>();
        prompts.forEach((p) => allPromptsMap.set(p.id, p));
        savedPrompts.forEach((p) => {
          allPromptsMap.set(p.id, { ...p, folder_id: undefined });
        });
        return Array.from(allPromptsMap.values());
      default:
        return prompts;
    }
  }, [activeTab, prompts, savedPrompts, isOwnProfile]);

  // For "my" and "all" tabs, we show folders. For "saved", we don't.
  const displayFolders = useMemo(() => {
    return activeTab === "saved" || !isOwnProfile ? [] : folders;
  }, [activeTab, isOwnProfile, folders]);

  const rootPrompts = displayPrompts.filter((p) => !p.folder_id);

  const groupedPrompts = useMemo(() => {
    return displayFolders.map((folder) => ({
      ...folder,
      prompts: displayPrompts.filter((p) => p.folder_id === folder.id),
    }));
  }, [displayFolders, displayPrompts]);

  const filteredGroupedPrompts = groupedPrompts
    .map((folder) => {
      const folderMatches = folder.name.toLowerCase().includes(searchQuery);
      const filteredPrompts = folder.prompts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery) ||
          p.content.toLowerCase().includes(searchQuery)
      );

      // If the folder name matches, show all its prompts
      if (folderMatches) return { ...folder, prompts: folder.prompts };

      return { ...folder, prompts: filteredPrompts };
    })
    .filter((folder) => {
      // Only hide empty folders when searching
      // Otherwise show all folders (even empty ones)
      if (searchQuery) {
        return (
          folder.prompts.length > 0 ||
          folder.name.toLowerCase().includes(searchQuery)
        );
      }
      return true; // Show all folders when not searching
    });

  const filteredRootPrompts = rootPrompts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery) ||
      p.content.toLowerCase().includes(searchQuery)
  );

  return (
    <section className="flex flex-col gap-6 pb-8">
      {isOwnProfile && profile.subscription_level === "free" && prompts.length >= 5 && (
        <UpgradeBanner />
      )}

      {/* Header with title/tabs and buttons */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
        {isOwnProfile ? (
          /* Segmented Control - replaces title for own profile */
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "text-sm font-mono font-medium transition-colors pb-1 border-b-2",
                activeTab === "all"
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              )}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("my")}
              className={cn(
                "text-sm font-mono font-medium transition-colors pb-1 border-b-2",
                activeTab === "my"
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              )}
            >
              Created
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={cn(
                "text-sm font-mono font-medium transition-colors pb-1 border-b-2",
                activeTab === "saved"
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              )}
            >
              Saved
            </button>
          </div>
        ) : (
          /* Title for other users' profiles */
          <h1 className="text-2xl font-medium font-mono">
            {profile.username ? `${profile.username}'s prompts` : "Prompts"}
          </h1>
        )}
        
        {isOwnProfile && (
          <div className="flex gap-2 items-center">
            <Button
              onClick={() =>
                profile.subscription_level === "free" && prompts.length >= 5
                  ? router.push("/upgrade")
                  : router.push("/prompt/new")
              }
              size="default"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              New prompt
            </Button>
            {activeTab !== "saved" && <CreateFolderDialog />}
            <ShareDialog username={profile.username} />
          </div>
        )}
      </div>

      <div className="border">
        <QuickLinks />
        {/* Search Bar */}
        <div className="h-14 flex items-center pl-5">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value.toLowerCase().trim())
            }
            placeholder="Search prompts..."
            className="border-0 outline-none appearance-none focus-visible:outline-none focus-visible:ring-0"
          />
        </div>

        {displayPrompts.length === 0 && displayFolders.length === 0 && <EmptyState />}

        {/* Prompts and Folders List */}
        <ul className="list-none pb-2">
          {/* Folders with prompts */}
          {filteredGroupedPrompts.map((folder) => (
            <FolderItem
              key={folder.id}
              id={folder.id}
              name={folder.name}
              count={folder.prompts.length}
              isOpen={openFolderIds.includes(folder.id)}
              onToggle={() => {
                setOpenFolderIds(
                  (prev) =>
                    prev.includes(folder.id)
                      ? prev.filter((id) => id !== folder.id) // close
                      : [...prev, folder.id] // open
                );
              }}
              isOwnProfile={isOwnProfile}
            >
              <ul className="list-none">
                {folder.prompts.map((prompt) => (
                  <PromptItem
                    key={prompt.id}
                    id={prompt.id}
                    title={prompt.title}
                    content={prompt.content}
                    isNested={true}
                    isOwnProfile={isOwnProfile}
                    isSaved={prompt.is_saved}
                    userId={prompt.user_id}
                    currentUserId={currentUserId}
                  />
                ))}
              </ul>
            </FolderItem>
          ))}

          {/* Root-level prompts */}
          {filteredRootPrompts.map((prompt) => (
            <PromptItem
              key={prompt.id}
              id={prompt.id}
              title={prompt.title}
              content={prompt.content}
              isOwnProfile={isOwnProfile}
              isSaved={prompt.is_saved ?? true}
              userId={prompt.user_id}
              currentUserId={currentUserId}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
