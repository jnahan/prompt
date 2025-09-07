"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateFolder: (name: string, color: string) => void;
}

const folderColors = [
  { name: "Gray", value: "gray", bgColor: "bg-gray-500" },
  { name: "Red", value: "red", bgColor: "bg-red-500" },
  { name: "Yellow", value: "yellow", bgColor: "bg-yellow-500" },
  { name: "Green", value: "green", bgColor: "bg-green-500" },
  { name: "Blue", value: "blue", bgColor: "bg-blue-500" },
  { name: "Purple", value: "purple", bgColor: "bg-purple-500" },
  { name: "Orange", value: "orange", bgColor: "bg-orange-500" },
  { name: "Pink", value: "pink", bgColor: "bg-pink-500" },
];

export function CreateFolderDialog({
  open,
  onOpenChange,
  onCreateFolder,
}: CreateFolderDialogProps) {
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("gray");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onCreateFolder(folderName.trim(), selectedColor);
      setFolderName("");
      setSelectedColor("gray");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setFolderName("");
    setSelectedColor("gray");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Create a new folder to organize your prompts. Choose a name and
            color for your folder.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="folder-name">Folder Name</Label>
            <Input
              id="folder-name"
              placeholder="Enter folder name..."
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Folder Color</Label>
            <div className="grid grid-cols-4 gap-3">
              {folderColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`
                    relative w-12 h-12 rounded-lg border-2 transition-all hover:scale-105
                    ${color.bgColor}
                    ${
                      selectedColor === color.value
                        ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                        : "border-gray-300 hover:border-gray-400"
                    }
                  `}
                  title={color.name}
                >
                  {selectedColor === color.value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!folderName.trim()}>
              Create Folder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
