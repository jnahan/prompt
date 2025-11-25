"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Share, Copy, Check } from "lucide-react";

interface ShareDialogProps {
  username: string | null;
}

export default function ShareDialog({ username }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    if (username) {
      // Use production URL for sharing
      const baseUrl = "https://www.promptkit.so";
      setProfileUrl(`${baseUrl}/${username}`);
    }
  }, [username]);

  const handleCopy = async () => {
    if (profileUrl) {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!username) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="default"
          variant="outline"
          className="h-9 w-9 p-0"
        >
          <Share className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share prompts</DialogTitle>
          <DialogDescription>
            Share this link to let others view your prompts. All prompts created by you will be visible to others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            value={profileUrl}
            readOnly
            className="flex-1 font-mono text-sm"
          />
          <Button
            onClick={handleCopy}
            variant="outline"
            size="default"
            className="px-3"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

