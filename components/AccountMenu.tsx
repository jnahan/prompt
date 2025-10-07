"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";

interface AccountMenuProps {
  userName: string;
  avatarUrl?: string;
}

export default function AccountMenu({ userName, avatarUrl }: AccountMenuProps) {
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

  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={`${userName} avatar`} />
            <AvatarFallback className="bg-blue-100 text-blue-700 font-medium text-sm">
              {firstLetter}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem>
          <Link href="/" className="flex items-center">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Saved prompts</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/upgrade" className="flex items-center">
            <Crown className="mr-2 h-4 w-4" />
            <span>Upgrade plan</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
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
