"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import UpgradeBanner from "./UpgradeBanner";
import EmptyState from "./EmptyState";
import PromptItem from "./PromptItem";
import FolderItem from "./FolderItem";
import CreateFolderDialog from "./CreateFolderDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Image from "next/image";

import type { Profile, Folder, Prompt } from "@/types";

interface UserDashboardProps {
  profile: Profile;
  folders: Folder[];
  prompts: Prompt[];
  username: string;
}

export default function UserDashboard({
  profile,
  folders,
  prompts,
  username,
}: UserDashboardProps) {
  const router = useRouter();
  const isOwnProfile = profile.username === username;

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
    <div className="mt-12">
      {isOwnProfile &&
        profile.subscription_level === "free" &&
        prompts.length >= 5 && <UpgradeBanner />}

      {/* Main Content */}
      <div className="my-12">
        <div className="flex flex-row gap-4 items-center justify-center my-4">
          <a href="https://claude.ai/" target="_blank">
            <Image
              src={`ai-logos/claude.svg`}
              alt={"claude"}
              width={24}
              height={24}
            />
          </a>
          <a href="https://copilot.microsoft.com/" target="_blank">
            <Image
              src={`ai-logos/copilot.svg`}
              alt={"copilot"}
              width={24}
              height={24}
            />
          </a>
          <a href="https://gemini.google.com/" target="_blank">
            <Image
              src={`ai-logos/gemini.svg`}
              alt={"gemini"}
              width={24}
              height={24}
            />
          </a>
          <a href="https://grok.com/" target="_blank">
            <Image
              src={`ai-logos/grok.svg`}
              alt={"grok"}
              width={24}
              height={24}
            />
          </a>
          <a href="https://chat.openai.com/" target="_blank">
            <Image
              src={`ai-logos/openai.svg`}
              alt={"openai"}
              width={24}
              height={24}
            />
          </a>
          <a href="https://www.perplexity.ai/" target="_blank">
            <Image
              src={`ai-logos/perplexity.svg`}
              alt={"perplexity"}
              width={24}
              height={24}
            />
          </a>
        </div>

        <section className="mt-8">
          {/* Saved prompts, buttons */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-medium font-mono">Saved prompts</h1>
            {isOwnProfile && (
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

                {/* Folder creation - server action handles revalidation */}
                <CreateFolderDialog />
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg">
            {/* Search Bar */}
            <div className="h-14 flex items-center pl-5">
              <Search className="h-5 w-5 text-gray-500" />
              <Input
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value.toLowerCase().trim())
                }
                placeholder="Search prompts..."
                className="border-0 outline-none focus:outline-none focus:ring-0 focus:shadow-none focus:border-transparent appearance-none bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
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
                  isOwnProfile={isOwnProfile}
                  onToggle={() => {
                    setOpenFolderIds(
                      (prev) =>
                        prev.includes(folder.id)
                          ? prev.filter((id) => id !== folder.id) // close
                          : [...prev, folder.id] // open
                    );
                    console.log("openFolderIds", openFolderIds);
                    console.log("folder.id", folder.id);
                  }}
                >
                  <ul className="list-none">
                    {folder.prompts.map((prompt) => (
                      <PromptItem
                        key={prompt.id}
                        id={prompt.id}
                        title={prompt.title}
                        content={prompt.content}
                        isOwnProfile={isOwnProfile}
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
                  isOwnProfile={isOwnProfile}
                />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
