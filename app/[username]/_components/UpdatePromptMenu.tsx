"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { deletePrompt } from "@/lib/actions/prompt.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

function UpdatePromptMenu({ id }: { id: string }) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePrompt(id);
      router.refresh();
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56"
          align="start"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/prompt/edit/${id}`);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteClick}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Delete prompt?"
        description="This action cannot be undone. This will permanently delete this prompt."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}

export default UpdatePromptMenu;
