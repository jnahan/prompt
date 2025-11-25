import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { readProfile } from "@/lib/actions/profile.actions";
import { readSavedPrompts } from "@/lib/actions/prompt.actions";
import UserDashboard from "../prompts/_components/UserDashboard";
import type { Prompt } from "@/types";

export default async function SavedPromptsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const profile = await readProfile();
  
  if (!profile) {
    redirect("/auth/onboarding");
  }

  const savedPrompts = await readSavedPrompts();

  // Remove folder_id from saved prompts so they display in a flat list
  // (folders belong to the original creator, not the person who saved them)
  const flattenedPrompts: Prompt[] = savedPrompts.map((prompt) => ({
    ...prompt,
    folder_id: undefined,
  }));

  // Create a modified profile for display purposes with custom title
  const displayProfile = {
    ...profile,
    username: null, // This will make the title show "Saved prompts"
  };

  return (
    <UserDashboard
      profile={displayProfile}
      folders={[]} // Saved prompts don't have folders
      prompts={flattenedPrompts}
      isOwnProfile={true}
    />
  );
}

