import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface PromptUsageBarProps {
  used: number;
  limit: number;
  onUpgradeClick: () => void;
}

export function PromptUsageBar({
  used,
  limit,
  onUpgradeClick,
}: PromptUsageBarProps) {
  const isUnlimited = limit === -1;
  const usageText = isUnlimited
    ? `You saved ${used} prompts.`
    : `You saved ${used}/${limit} prompts. Upgrade to get unlimited prompts.`;

  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
      <span className="text-sm text-gray-700">{usageText}</span>
      {!isUnlimited && (
        <Button
          onClick={onUpgradeClick}
          size="sm"
          className="flex items-center gap-2"
        >
          <Crown className="h-4 w-4" />
          Upgrade
        </Button>
      )}
    </div>
  );
}
