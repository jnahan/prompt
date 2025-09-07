import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, Folder } from "lucide-react";
import { PromptItem } from "./prompt-item";

interface Prompt {
  id: string;
  title: string;
  description: string;
  content?: string;
}

interface FolderItemProps {
  name: string;
  prompts: Prompt[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function FolderItem({
  name,
  prompts,
  isExpanded = false,
  onToggle,
}: FolderItemProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle?.();
  };

  return (
    <div className="py-2">
      <Button
        variant="ghost"
        onClick={handleToggle}
        className="flex items-center gap-2 p-0 h-auto justify-start text-left"
      >
        {expanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        <Folder className="h-4 w-4" />
        <span className="font-medium">{name}</span>
      </Button>

      {expanded && (
        <div className="mt-2">
          {prompts.map((prompt) => (
            <PromptItem
              key={prompt.id}
              title={prompt.title}
              description={prompt.description}
              content={prompt.content}
            />
          ))}
        </div>
      )}
    </div>
  );
}
