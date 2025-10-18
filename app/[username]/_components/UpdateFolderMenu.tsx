"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useState } from "react";
import { deleteFolder } from "@/lib/actions/folder.actions";
import CreateFolderDialog from "./CreateFolderDialog";

interface UpdateFolderMenuProps {
  id: string;
  name: string;
}

function UpdateFolderMenu({ id, name }: UpdateFolderMenuProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteFolder(id);
      // No need for router.refresh() - server action handles revalidation
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="ml-auto opacity-0 group-hover:opacity-100"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="h-4 w-4 opacity-0 group-hover:opacity-100 text-gray-500 mr-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setIsEditOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteClick}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateFolderDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialName={name}
        folderId={id}
      />

      <ConfirmationDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Delete folder?"
        description="This will permanently delete the folder and its contents."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}

export default UpdateFolderMenu;
