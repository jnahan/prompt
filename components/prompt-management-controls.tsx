import { Button } from "@/components/ui/button";
import { Plus, FolderPlus } from "lucide-react";

interface PromptManagementControlsProps {
  promptCount: number;
  onNewPrompt: () => void;
  onNewFolder: () => void;
}

export function PromptManagementControls({
  promptCount,
  onNewPrompt,
  onNewFolder,
}: PromptManagementControlsProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{promptCount} saved prompts</span>

      <div className="flex gap-2">
        <Button
          onClick={onNewPrompt}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New prompt
        </Button>

        <Button
          onClick={onNewFolder}
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
        >
          <FolderPlus className="h-4 w-4" />
          New folder
        </Button>
      </div>
    </div>
  );
}
