"use client";

import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { AccountMenu } from "@/components/account-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    <nav className="py-2 flex items-center justify-between">
      <Link href="/" key={"Home"}>
        <Image src={`logo.svg`} alt={"logo"} width="125" height="32" />
      </Link>
      <div className="flex items-center gap-1">
        <Button variant="link">
          <Link href="/upgrade">Get unlimited prompts</Link>
        </Button>
        <AccountMenu userName="User" onLogout={handleLogout} />
      </div>
    </nav>
  );
}
