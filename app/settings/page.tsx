import { readProfile } from "@/lib/actions/profile.actions";
import ManageSettings from "./_components/ManageSettings";

export default async function SettingsPage() {
  const profile = await readProfile();

  return <ManageSettings profile={profile} />;
}
