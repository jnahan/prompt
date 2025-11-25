import { redirect } from "next/navigation";
import { readProfile } from "@/lib/actions/profile.actions";

export default async function PromptsPage() {
  // Redirect to user's own username route
  const profile = await readProfile();

  if (profile.username) {
    redirect(`/${profile.username}`);
  }

  // Fallback if no username (shouldn't happen, but just in case)
  redirect("/auth/onboarding");
}
