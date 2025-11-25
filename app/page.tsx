import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LandingPage from "./_components/LandingPage";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    // Show landing page for unauthenticated users
    return <LandingPage />;
  }

  // Check if user has a profile with username
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();

    // If no profile or no username, redirect to onboarding
    if (!profile || !profile.username) {
      redirect("/auth/onboarding");
    }

    // Redirect to user's own username route
    redirect(`/${profile.username}`);
  }

  // Show landing page for unauthenticated users
  return <LandingPage />;
}
