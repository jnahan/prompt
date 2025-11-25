"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PromptDialog from "@/app/prompt/_components/PromptDialog";
import UpdatePromptMenu from "./UpdatePromptMenu";
import { cn } from "@/lib/utils";
import { savePrompt, unsavePrompt } from "@/lib/actions/prompt.actions";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface PromptItemProps {
  id: string;
  title: string;
  content: string;
  isNested?: boolean;
  isOwnProfile?: boolean;
  isSaved?: boolean;
  userId?: string; // The user_id of the prompt owner
  currentUserId?: string; // The current user's ID
}

function PromptItem({ 
  id, 
  title, 
  content, 
  isNested, 
  isOwnProfile = true,
  isSaved = false,
  userId,
  currentUserId
}: PromptItemProps) {
  // Check if this prompt belongs to the current user
  const isOwnPrompt = userId && currentUserId && userId === currentUserId;
  const router = useRouter();
  const supabase = createClient();
  const [saved, setSaved] = useState(isSaved);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the dialog
    
    if (isLoading) return;
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // Preserve the current page URL so we can redirect back after sign up
      const currentPath = window.location.pathname;
      router.push(`/auth/sign-up?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    setIsLoading(true);
    try {
      if (saved) {
        await unsavePrompt(id);
        setSaved(false);
      } else {
        await savePrompt(id);
        setSaved(true);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
      // Check if error is due to authentication
      if (error instanceof Error && error.message === "User not authenticated") {
        router.push("/auth/sign-up");
        return;
      }
      // Revert on error
      setSaved(!saved);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PromptDialog title={title} content={content}>
      <li
        className={cn(
          "flex flex-row justify-between items-center px-5 py-3 w-full cursor-pointer group",
          isNested && "pl-10 bg-blue-50 box-border"
        )}
      >
        <div className="flex flex-col gap-1 cursor-pointer text-left">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-gray-500 text-ellipsis max-w-[640px] overflow-hidden line-clamp-2">
            {content}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Show save button if: not own profile OR (saved and not own prompt) */}
          {(!isOwnProfile || (saved && !isOwnPrompt)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              disabled={isLoading}
              className="h-8 w-8 p-0"
            >
              {saved ? (
                <BookmarkCheck className="h-4 w-4 text-blue-600" />
              ) : (
                <Bookmark className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          )}
          {/* Show update menu if it's their own prompt */}
          {isOwnProfile && isOwnPrompt && <UpdatePromptMenu id={id} />}
        </div>
      </li>
    </PromptDialog>
  );
}

export default PromptItem;
