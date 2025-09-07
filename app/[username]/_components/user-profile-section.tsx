import { Button } from "@/components/ui/button";
import { User, Share } from "lucide-react";

interface UserProfileSectionProps {
  userName: string;
  onShareClick: () => void;
}

export function UserProfileSection({
  userName,
  onShareClick,
}: UserProfileSectionProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="h-8 w-8 text-gray-600" />
        </div>

        <h1 className="text-2xl font-bold">{userName}&apos;s prompts</h1>

        <Button
          onClick={onShareClick}
          className="flex items-center gap-2"
          variant="secondary"
        >
          <Share className="h-4 w-4" />
          Share prompts
        </Button>
      </div>
    </div>
  );
}
