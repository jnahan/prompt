"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import UpgradeBanner from "./UpgradeBanner";
import QuickLinks from "./QuickLinks";
import EmptyState from "./EmptyState";
import PromptItem from "./PromptItem";
import FolderItem from "./FolderItem";
import CreateFolderDialog from "./CreateFolderDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

import type { Profile, Folder, Prompt } from "@/types";

interface UserDashboardProps {
  profile: Profile;
  folders: Folder[];
  prompts: Prompt[];
}

export default function UserDashboard({
  profile,
  folders,
  prompts,
}: UserDashboardProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [openFolderIds, setOpenFolderIds] = useState<string[]>([]);

  const rootPrompts = prompts.filter((p) => !p.folder_id);

  const groupedPrompts = useMemo(() => {
    return folders.map((folder) => ({
      ...folder,
      prompts: prompts.filter((p) => p.folder_id === folder.id),
    }));
  }, [folders, prompts]);

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
    <section className="flex flex-col gap-6">
      {profile.subscription_level === "free" && prompts.length >= 5 && (
        <UpgradeBanner />
      )}

      {/* Saved prompts, buttons */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium font-mono">Saved prompts</h1>
        <div className="flex gap-2">
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
          <CreateFolderDialog />
        </div>
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

        {prompts.length === 0 && folders.length === 0 && <EmptyState />}

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
            >
              <ul className="list-none">
                {folder.prompts.map((prompt) => (
                  <PromptItem
                    key={prompt.id}
                    id={prompt.id}
                    title={prompt.title}
                    content={prompt.content}
                    isNested={true}
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
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
