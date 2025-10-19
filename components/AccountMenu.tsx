"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sparkles,
  Crown,
  Settings,
  Mail,
  LogOut,
  ExternalLink,
  UserIcon,
} from "lucide-react";

export default function AccountMenu() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer">
          <UserIcon className="h-4 w-4 text-gray-500" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/prompts" className="flex items-center">
            <Sparkles className="h-4 w-4" />
            <span>Saved prompts</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/upgrade" className="flex items-center">
            <Crown className="w-4 h-4" />
            <span>Upgrade plan</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings" className="flex items-center">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href="/feedback"
            target="_blank"
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center flex-1">
              <Mail className="mr-2 h-4 w-4" />
              <span>Feedback & support</span>
            </div>
            <ExternalLink className="ml-auto h-4 w-4" />
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
