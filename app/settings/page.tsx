import { readProfile } from "@/lib/actions/profile.actions";
import ProfileInfo from "@/components/ProfileInfo";
import ManageSettings from "./_components/ManageSettings";

export default async function SettingsPage() {
  const profile = await readProfile();

  return (
    <section className="mt-12">
      <ProfileInfo username={profile.username} />
      <ManageSettings />
    </section>
  );
}
