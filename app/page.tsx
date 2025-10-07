import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { readProfile } from "@/lib/actions/profile.actions";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const profile = await readProfile();
  redirect(`/${profile.username}`);
}
