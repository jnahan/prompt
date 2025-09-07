"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { UserProfileSection } from "./user-profile-section";
import { PromptUsageBar } from "./prompt-usage-bar";
import { PromptManagementControls } from "./prompt-management-controls";
import { PromptSearchBar } from "./prompt-search-bar";
import { PromptItem } from "./prompt-item";
import { FolderItem } from "./folder-item";
import { MyAccountMenu } from "./my-account-menu";

interface Prompt {
  id: string;
  title: string;
  description: string;
  content?: string;
}

interface Folder {
  id: string;
  name: string;
  prompts: Prompt[];
}

interface PromptsPageClientProps {
  userName: string;
}

export function PromptsPageClient({ userName }: PromptsPageClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in a real app, this would come from your database
  const mockPrompts: Prompt[] = [
    {
      id: "1",
      title: "Prompt title",
      description: "Prompt description",
    },
  ];

  const mockFolders: Folder[] = [
    {
      id: "1",
      name: "Folder",
      prompts: [
        {
          id: "2",
          title: "Prompt title",
          description: "Prompt description",
        },
        {
          id: "3",
          title: "Prompt title",
          description: "Prompt description",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          id: "4",
          title: "Prompt title",
          description: "Prompt description",
        },
      ],
    },
    {
      id: "2",
      name: "Folder",
      prompts: [],
    },
  ];

  const promptCount =
    mockPrompts.length +
    mockFolders.reduce((acc, folder) => acc + folder.prompts.length, 0);
  const promptLimit = 15;

  const handleUpgradeClick = () => {
    router.push("/upgrade");
  };

  const handleShareClick = () => {
    // Handle share logic
    console.log("Share clicked");
  };

  const handleNewPrompt = () => {
    router.push("/create-prompt");
  };

  const handleNewFolder = () => {
    // Handle new folder creation
    console.log("New folder clicked");
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
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
        (prompt) =>
          prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">QuickPrompt</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-gray-700">
              My prompts
            </span>
            <span className="text-sm font-medium text-gray-700">My apps</span>
            <span className="text-sm font-medium text-gray-700">
              Discover apps
            </span>
            <MyAccountMenu userName={userName} onLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* User Profile Section */}
        <UserProfileSection
          userName={userName}
          onUpgradeClick={handleUpgradeClick}
          onShareClick={handleShareClick}
        />

        {/* Prompt Usage Bar */}
        <div className="mt-8">
          <PromptUsageBar
            used={promptCount}
            limit={promptLimit}
            onUpgradeClick={handleUpgradeClick}
          />
        </div>

        {/* Prompt Management Controls */}
        <div className="mt-6">
          <PromptManagementControls
            promptCount={promptCount}
            onNewPrompt={handleNewPrompt}
            onNewFolder={handleNewFolder}
          />
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <PromptSearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Prompts and Folders List */}
        <div className="mt-8 space-y-2">
          {/* Individual Prompts */}
          {filteredPrompts.map((prompt) => (
            <PromptItem
              key={prompt.id}
              title={prompt.title}
              description={prompt.description}
              content={prompt.content}
            />
          ))}

          {/* Folders */}
          {filteredFolders.map((folder) => (
            <FolderItem
              key={folder.id}
              name={folder.name}
              prompts={folder.prompts}
            />
          ))}

          {/* Empty State */}
          {filteredPrompts.length === 0 && filteredFolders.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {searchQuery
                ? "No prompts found matching your search."
                : "No prompts yet. Create your first prompt!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
