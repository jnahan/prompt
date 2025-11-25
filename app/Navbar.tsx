"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { readProfile } from "@/lib/actions/profile.actions";
import AccountMenu from "@/components/AccountMenu";
import type { Profile } from "@/types";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const isAuthPage = pathname.includes("/auth");

  useEffect(() => {
    if (!isAuthPage) {
      readProfile()
        .then((p) => {
          setProfile(p);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setProfile(null);
          setIsAuthenticated(false);
        });
    }
  }, [isAuthPage]);

  if (isAuthPage) return null;

  return (
    <nav className="py-2 flex items-center justify-between mb-6">
      <Link href="/" key={"Home"}>
        <Image src={`/logo.svg`} alt={"PromptKit"} width="125" height="32" />
      </Link>
      <div className="flex items-center gap-1">
        {isAuthenticated === false ? (
          // Unauthenticated: Discover, Login, Sign up
          <div className="flex items-center gap-1">
            <Button variant="link" className="px-2">
              <Link href="/promptkit">Discover</Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Sign up</Link>
              </Button>
            </div>
          </div>
        ) : isAuthenticated === true ? (
          // Authenticated: Discover, Upgrade (if free), AccountMenu
          <>
            <div className="flex items-center gap-1">
              <Button variant="link" className="px-2">
                <Link href="/promptkit">Discover</Link>
              </Button>
              {profile?.subscription_level === "free" && (
                <Button variant="link" className="px-2">
                  <Link href="/upgrade">
                    <span className="hidden md:inline">Get unlimited prompts</span>
                    <span className="md:hidden">Upgrade</span>
                  </Link>
                </Button>
              )}
            </div>
            <AccountMenu />
          </>
        ) : (
          // Loading state - show nothing or minimal
          null
        )}
      </div>
    </nav>
  );
}
