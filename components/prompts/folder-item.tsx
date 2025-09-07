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
  onEdit?: () => void;
  onDelete?: () => void;
}

export function FolderItem({
  name,
  prompts,
  isExpanded = false,
  onToggle,
  onEdit,
  onDelete,
}: FolderItemProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle?.();
  };

  return (
    <li className="group">
      <div
        className="flex items-center justify-between hover:bg-gray-50 rounded-lg px-2 py-2 cursor-pointer"
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
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
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
              title={prompt.title}
              description={prompt.description}
              content={prompt.content}
              isNested={true}
              onEdit={() => console.log("Edit nested prompt:", prompt.id)}
              onDelete={() => console.log("Delete nested prompt:", prompt.id)}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
