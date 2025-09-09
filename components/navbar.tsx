"use client";

import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { AccountMenu } from "@/components/account-menu";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Don't render navbar on auth pages
  if (pathname.startsWith("/auth/")) {
    return null;
  }

  return (
    <nav className="mx-auto px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold hover:text-gray-600">
        QuickPrompt
      </Link>
      <AccountMenu userName="User" onLogout={handleLogout} />
    </nav>
  );
}
