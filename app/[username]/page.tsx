import { readProfile } from "@/lib/actions/profile.actions";
import { readFolders } from "@/lib/actions/folder.actions";
import { readPrompts } from "@/lib/actions/prompt.actions";
import UserDashboard from "./_components/UserDashboard";

export default async function UsernamePage({
  searchParams,
}: {
  searchParams: { onboarding?: string };
}) {
  const [profile, folders, prompts] = await Promise.all([
    readProfile(),
    readFolders(),
    readPrompts(),
  ]);

  const showOnboarding = (await searchParams)?.onboarding === "true";

  return (
    <UserDashboard
      profile={profile}
      folders={folders}
      prompts={prompts}
      showOnboarding={showOnboarding}
    />
  );
}
