"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserProfileSection } from "@/components/prompts/user-profile-section";
import { PromptItem } from "@/components/prompts/prompt-item";
import { FolderItem } from "@/components/prompts/folder-item";
import { OnboardingOverlay } from "./onboarding-overlay";
import { CreateFolderDialog } from "@/components/forms/create-folder-dialog";
import { ShareDialog } from "@/components/forms/share-dialog";
import { useOnboarding } from "@/hooks/use-onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, FolderPlus, Crown, Search } from "lucide-react";
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
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { isOpen, onSubmit, onClose } = useOnboarding();

  // Mock data - in a real app, this would come from your database
  const mockPrompts: Prompt[] = [
    {
      id: "1",
      title: "Prompt title",
      description: "Prompt description",
      content:
        "Generate icons in the style of modern minimalist design with clean lines and subtle gradients.",
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

  const handleUpgradeClick = () => {
    router.push("/upgrade");
  };

  const handleShareClick = () => {
    setIsShareDialogOpen(true);
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

  const handleEditPrompt = (promptId: string) => {
    console.log("Editing prompt:", promptId);
    // TODO: Implement edit functionality
  };

  const handleDeletePrompt = (promptId: string) => {
    console.log("Deleting prompt:", promptId);
    // TODO: Implement delete functionality
  };

  const handleEditFolder = (folderId: string) => {
    console.log("Editing folder:", folderId);
    // TODO: Implement edit functionality
  };

  const handleDeleteFolder = (folderId: string) => {
    console.log("Deleting folder:", folderId);
    // TODO: Implement delete functionality
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
    <div>
      {/* Onboarding Overlay */}
      <OnboardingOverlay
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      />

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
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <span className="text-sm text-gray-700">
              You saved 3/3 prompts. Upgrade to save unlimited prompts.
            </span>
            <Button
              onClick={handleUpgradeClick}
              size="sm"
              className="flex items-center gap-2"
            >
              <Crown className="h-4 w-4" />
              Upgrade
            </Button>
          </div>
        </div>

        {/* Prompt Management Controls */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {promptCount} saved prompts
            </span>

            <div className="flex gap-2">
              <Button
                onClick={handleNewPrompt}
                size="sm"
                className="flex items-center gap-2"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
                New prompt
              </Button>

              <Button
                onClick={handleNewFolder}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <FolderPlus className="h-4 w-4" />
                New folder
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Prompts and Folders List */}
        <ul className="mt-8 space-y-2">
          {/* Individual Prompts */}
          {filteredPrompts.map((prompt) => (
            <PromptItem
              key={prompt.id}
              title={prompt.title}
              description={prompt.description}
              content={prompt.content}
              onEdit={() => handleEditPrompt(prompt.id)}
              onDelete={() => handleDeletePrompt(prompt.id)}
            />
          ))}

          {/* Folders */}
          {filteredFolders.map((folder) => (
            <FolderItem
              key={folder.id}
              name={folder.name}
              prompts={folder.prompts}
              onEdit={() => handleEditFolder(folder.id)}
              onDelete={() => handleDeleteFolder(folder.id)}
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
        </ul>
      </div>

      {/* Create Folder Dialog */}
      <CreateFolderDialog
        open={isCreateFolderDialogOpen}
        onOpenChange={setIsCreateFolderDialogOpen}
        onCreateFolder={handleCreateFolder}
      />

      {/* Share Dialog */}
      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        userName={userName}
      />
    </div>
  );
}
