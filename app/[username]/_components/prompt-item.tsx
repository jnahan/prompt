import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

interface PromptItemProps {
  id: string;
  title: string;
  description: string;
  isNested?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onUse?: () => void;
}

export function PromptItem({
  id,
  title,
  description,
  isNested = false,
  onEdit,
  onDelete,
  onUse,
}: PromptItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleClick = () => {
    onUse?.();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  const handleDeleteConfirm = () => {
    onDelete?.();
    setShowDeleteConfirm(false);
  };

  return (
    <li className={`${isNested ? "pl-4" : ""} group`}>
      <div
        className="flex items-start justify-between hover:bg-gray-50 rounded-lg px-2 py-2 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-start gap-2 flex-1">
          <div className="flex flex-col">
            <span className="font-medium">{title}</span>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
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
            <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDeleteClick}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ConfirmationDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={handleDeleteConfirm}
        title="Delete Prompt"
        description={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
        confirmText="Delete Prompt"
        cancelText="Cancel"
        variant="destructive"
      />
    </li>
  );
}
