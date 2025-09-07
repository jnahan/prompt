import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";

interface PromptItemProps {
  title: string;
  description: string;
  content?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function PromptItem({
  title,
  description,
  content,
  isExpanded = false,
  onToggle,
}: PromptItemProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle?.();
  };

  return (
    <div className="border-l-2 border-gray-200 pl-4 py-2">
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
        <span className="font-medium">{title}</span>
      </Button>

      <p className="text-sm text-gray-600 ml-6">{description}</p>

      {expanded && content && (
        <div className="mt-2 ml-6 p-3 bg-gray-50 rounded text-sm text-gray-700">
          {content}
        </div>
      )}
    </div>
  );
}
