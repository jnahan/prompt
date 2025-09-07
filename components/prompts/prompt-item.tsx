import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PromptItemProps {
  title: string;
  description: string;
  content?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
  isNested?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function PromptItem({
  title,
  description,
  content,
  isExpanded = false,
  onToggle,
  isNested = false,
  onEdit,
  onDelete,
}: PromptItemProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle?.();
  };

  return (
    <li
      className={`${isNested ? "border-l-2 border-gray-200 pl-4" : ""} group`}
    >
      <div
        className="flex items-start justify-between hover:bg-gray-50 rounded-lg px-2 py-2 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-start gap-2 flex-1">
          {expanded ? (
            <ChevronDown className="h-4 w-4 mt-0.5" />
          ) : (
            <ChevronRight className="h-4 w-4 mt-0.5" />
          )}
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
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {expanded && content && (
        <div
          className={`mt-2 ${
            isNested ? "ml-6" : "ml-6"
          } p-3 bg-gray-50 rounded text-sm text-gray-700`}
        >
          {content}
        </div>
      )}
    </li>
  );
}
