import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Crown,
  Settings,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface AccountMenuProps {
  userName: string;
  onLogout: () => void;
}

export function AccountMenu({ userName, onLogout }: AccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={userName} />
            <AvatarFallback className="bg-gray-200 text-gray-600">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              My Account
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <div>
            <Link href="/" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>My prompts</span>
            </Link>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <div>
            <Link href="/upgrade" className="flex items-center">
              <Crown className="mr-2 h-4 w-4" />
              <span>Upgrade plan</span>
            </Link>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <div>
            <Link href="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <div>
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
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
