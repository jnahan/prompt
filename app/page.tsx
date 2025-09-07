import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PromptsPageClient } from "./_components/prompts-page-client";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const userEmail = data.claims.email || "User";
  const userName = userEmail.split("@")[0];

  return <PromptsPageClient userName={userName} />;
}
