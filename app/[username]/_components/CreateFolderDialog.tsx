"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateFolder: (name: string) => void;
  mode?: "create" | "edit";
  initialData?: {
    name: string;
  };
}

export function CreateFolderDialog({
  open,
  onOpenChange,
  onCreateFolder,
  mode = "create",
  initialData,
}: CreateFolderDialogProps) {
  const [folderName, setFolderName] = useState(initialData?.name || "");
  // Update form when initialData changes (when dialog opens with different data)
  useEffect(() => {
    if (initialData) {
      setFolderName(initialData.name || "");
    } else {
      setFolderName("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onCreateFolder(folderName.trim());
      setFolderName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit folder" : "New folder"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="folder-name">Folder name</Label>
            <Input
              id="folder-name"
              placeholder="Folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              autoFocus
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!folderName.trim()}>
              {mode === "edit" ? "Save Changes" : "Create Folder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
