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
  const isAuthPage = pathname.includes("/auth");

  useEffect(() => {
    if (!isAuthPage)
      readProfile()
        .then((p) => setProfile(p))
        .catch(() => setProfile(null));
  }, [isAuthPage]);

  if (isAuthPage) return null;

  return (
    <nav className="py-2 flex items-center justify-between mb-6">
      <Link href="/" key={"Home"}>
        <Image src={`/logo.svg`} alt={"PromptKit"} width="125" height="32" />
      </Link>
      <div className="flex items-center gap-1">
        {profile?.subscription_level === "free" && (
          <Button variant="link">
            <Link href="/upgrade">Get unlimited prompts</Link>
          </Button>
        )}
        <AccountMenu />
      </div>
    </nav>
  );
}
