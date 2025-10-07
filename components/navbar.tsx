import Link from "next/link";
import Image from "next/image";

import AccountMenu from "@/components/AccountMenu";
import { Button } from "@/components/ui/button";
import { readProfile } from "@/lib/actions/profile.actions";

export default async function Navbar() {
  const profile = await readProfile();

  return (
    <nav className="py-2 flex items-center justify-between mb-12">
      <Link href="/" key={"Home"}>
        <Image src={`logo.svg`} alt={"logo"} width="125" height="32" />
      </Link>
      <div className="flex items-center gap-1">
        <Button variant="link">
          <Link href="/upgrade">Get unlimited prompts</Link>
        </Button>
        <AccountMenu userName={profile?.username || ""} />
      </div>
    </nav>
  );
}
