"use client";

import { useState } from "react";
import { UserProfileSection } from "./user-profile-section";
import { PromptUsageBar } from "./prompt-usage-bar";
import { PromptManagementControls } from "./prompt-management-controls";
import { PromptSearchBar } from "./prompt-search-bar";
import { PromptItem } from "./prompt-item";
import { FolderItem } from "./folder-item";

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

interface PromptsPageProps {
  userName: string;
  promptCount: number;
  promptLimit: number;
  prompts: Prompt[];
  folders: Folder[];
  onUpgradeClick: () => void;
  onShareClick: () => void;
  onNewPrompt: () => void;
  onNewFolder: () => void;
  onLogout: () => void;
}

export function PromptsPage({
  userName,
  promptCount,
  promptLimit,
  prompts,
  folders,
  onUpgradeClick,
  onShareClick,
  onNewPrompt,
  onNewFolder,
  onLogout,
}: PromptsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter prompts and folders based on search query
  const filteredPrompts = prompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFolders = folders.filter(
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
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-600">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* User Profile Section */}
        <UserProfileSection
          userName={userName}
          onUpgradeClick={onUpgradeClick}
          onShareClick={onShareClick}
        />

        {/* Prompt Usage Bar */}
        <div className="mt-8">
          <PromptUsageBar
            used={promptCount}
            limit={promptLimit}
            onUpgradeClick={onUpgradeClick}
          />
        </div>

        {/* Prompt Management Controls */}
        <div className="mt-6">
          <PromptManagementControls
            promptCount={promptCount}
            onNewPrompt={onNewPrompt}
            onNewFolder={onNewFolder}
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
