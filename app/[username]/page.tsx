import { readProfile } from "@/lib/actions/profile.actions";
import { readFolders } from "@/lib/actions/folder.actions";
import { readPrompts } from "@/lib/actions/prompt.actions";
import UserDashboard from "./_components/UserDashboard";

export default async function UsernamePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;

  const [profile, folders, prompts] = await Promise.all([
    readProfile(),
    readFolders(username),
    readPrompts(username),
  ]);

  return (
    <UserDashboard profile={profile} folders={folders} prompts={prompts} />
  );
}
