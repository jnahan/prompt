"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { AccountMenu } from "@/components/account-menu";

export function Navbar() {
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // Get user profile from database
          const { data: profile } = await supabase
            .from("users")
            .select("name, username")
            .eq("id", user.id)
            .single();

          if (profile) {
            setUserName(
              profile.name ||
                profile.username ||
                user.email?.split("@")[0] ||
                "User"
            );
          } else {
            setUserName(user.email?.split("@")[0] || "User");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("User");
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, [supabase]);

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

  // Show loading state while fetching user data
  if (isLoading) {
    return (
      <nav className="mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold hover:text-gray-600">
            QuickPrompt
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold hover:text-gray-600">
          QuickPrompt
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <AccountMenu userName={userName} onLogout={handleLogout} />
      </div>
    </nav>
  );
}
