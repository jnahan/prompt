import { readProfile } from "@/lib/actions/profile.actions";
import { readFolders } from "@/lib/actions/folder.actions";
import { readPrompts } from "@/lib/actions/prompt.actions";
import UserDashboard from "./_components/UserDashboard";

export default async function PromptsPage() {
  const [profile, folders, prompts] = await Promise.all([
    readProfile(),
    readFolders(),
    readPrompts(),
  ]);

  return (
    <UserDashboard profile={profile} folders={folders} prompts={prompts} />
  );
}
