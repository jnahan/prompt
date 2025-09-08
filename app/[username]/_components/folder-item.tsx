import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  MoreHorizontal,
} from "lucide-react";
import { PromptItem } from "./prompt-item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Prompt } from "@/lib/types";

interface FolderItemProps {
  name: string;
  prompts: Prompt[];
  isExpanded?: boolean;
  onToggle?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onUsePrompt?: (promptId: string) => void;
}

export function FolderItem({
  name,
  prompts,
  isExpanded = false,
  onToggle,
  onEdit,
  onDelete,
  onUsePrompt,
}: FolderItemProps) {
  const [expanded, setExpanded] = useState(isExpanded);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle?.();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    onDelete?.();
    setShowDeleteConfirm(false);
  };

  return (
    <li>
      <div
        className="group flex items-center justify-between hover:bg-gray-50 rounded-lg px-2 py-2 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2 flex-1">
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <Folder className="h-4 w-4" />
          <span className="font-medium">{name}</span>
          <span className="text-sm text-muted-foreground">
            ({prompts.length})
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDeleteClick}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {expanded && (
        <ul className="mt-2">
          {prompts.map((prompt) => (
            <PromptItem
              key={prompt.id}
              id={prompt.id}
              title={prompt.title}
              description={prompt.description}
              isNested={true}
              onEdit={() => console.log("Edit nested prompt:", prompt.id)}
              onDelete={() => console.log("Delete nested prompt:", prompt.id)}
              onUse={() => onUsePrompt?.(prompt.id)}
            />
          ))}
        </ul>
      )}

      <ConfirmationDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={handleDeleteConfirm}
        title="Delete Folder"
        description={`Are you sure you want to delete "${name}"? This will permanently delete the folder and all ${
          prompts.length
        } prompt${
          prompts.length === 1 ? "" : "s"
        } inside it. This action cannot be undone.`}
        confirmText="Delete Folder"
        cancelText="Cancel"
        variant="destructive"
      />
    </li>
  );
}
