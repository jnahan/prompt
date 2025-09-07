"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { UserProfileSection } from "./prompts/user-profile-section";
import { PromptUsageBar } from "./prompts/prompt-usage-bar";
import { PromptManagementControls } from "./prompts/prompt-management-controls";
import { PromptSearchBar } from "./prompts/prompt-search-bar";
import { PromptItem } from "./prompts/prompt-item";
import { FolderItem } from "./prompts/folder-item";
import { Navigation } from "./navigation";
import { OnboardingOverlay } from "./auth/onboarding-overlay";
import { CreateFolderDialog } from "./forms/create-folder-dialog";
import { useOnboarding } from "@/hooks/use-onboarding";

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
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
    useState(false);
  const { isOpen, onSubmit, onClose } = useOnboarding();

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
  const promptLimit = 3;

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
    setIsCreateFolderDialogOpen(true);
  };

  const handleCreateFolder = (name: string, color: string) => {
    // For now, just log the folder creation
    // In a real app, this would make an API call to create the folder
    console.log("Creating folder:", { name, color });

    // TODO: Add the new folder to the mockFolders state
    // This would be replaced with actual API call in production
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
      {/* Onboarding Overlay */}
      <OnboardingOverlay
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      />
      {/* Navigation */}
      <Navigation userName={userName} onLogout={handleLogout} />

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

      {/* Create Folder Dialog */}
      <CreateFolderDialog
        open={isCreateFolderDialogOpen}
        onOpenChange={setIsCreateFolderDialogOpen}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  );
}
