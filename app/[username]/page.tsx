import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { readProfileByUsername } from "@/lib/actions/profile.actions";
import { readPromptsByUsername } from "@/lib/actions/prompt.actions";
import { readFoldersByUsername } from "@/lib/actions/folder.actions";
import UserDashboard from "../prompts/_components/UserDashboard";

interface UsernamePageProps {
  params: Promise<{ username: string }>;
}

export default async function UsernamePage({ params }: UsernamePageProps) {
  const { username } = await params;

  // Fetch profile, folders, and prompts for this username
  const [profile, folders, prompts] = await Promise.all([
    readProfileByUsername(username),
    readFoldersByUsername(username),
    readPromptsByUsername(username),
  ]);

  // If profile doesn't exist, show 404
  if (!profile) {
    notFound();
  }

  // Check if the current user is viewing their own profile
  let isOwnProfile = false;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.id === profile.id) {
      isOwnProfile = true;
    }
  } catch {
    // User not authenticated, isOwnProfile stays false
  }

  return (
    <UserDashboard
      profile={profile}
      folders={folders}
      prompts={prompts}
      isOwnProfile={isOwnProfile}
    />
  );
}

