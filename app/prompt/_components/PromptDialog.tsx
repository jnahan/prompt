"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { ChevronDownIcon, Copy, EyeIcon } from "lucide-react";
import Prompt from "./Prompt";

interface PromptDialogProps {
  title: string;
  content: string;
  children?: React.ReactNode;
}

interface AIPlatform {
  name: string;
  logo: string;
  getUrl: (prompt: string) => string;
}

const aiPlatforms: AIPlatform[] = [
  {
    name: "Claude",
    logo: "/ai-logos/claude.svg",
    getUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Copilot",
    logo: "/ai-logos/copilot.svg",
    getUrl: (prompt) =>
      `https://copilot.microsoft.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Gemini",
    logo: "/ai-logos/gemini.svg",
    getUrl: (prompt) =>
      `https://gemini.google.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Grok",
    logo: "/ai-logos/grok.svg",
    getUrl: (prompt) => `https://grok.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "ChatGPT",
    logo: "/ai-logos/openai-white.svg",
    getUrl: (prompt) =>
      `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Perplexity",
    logo: "/ai-logos/perplexity.svg",
    getUrl: (prompt) =>
      `https://www.perplexity.ai/?q=${encodeURIComponent(prompt)}`,
  },
];

export default function PromptDialog({
  title,
  content,
  children,
}: PromptDialogProps) {
  const [filled, setFilled] = useState("");
  const [selectedAI, setSelectedAI] = useState<AIPlatform>(aiPlatforms[4]); // default: ChatGPT
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSendToAI = () => {
    if (!filled.trim()) return;
    window.open(selectedAI.getUrl(filled), "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild className={children ? "w-full" : ""}>
        {children ?? (
          <Button variant="outline">
            <EyeIcon className="h-4 w-4" />
            Preview
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="flex flex-col max-w-[640px] min-w-[640px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium font-mono">
            {title}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <Prompt content={content} onChange={setFilled} />
        </DialogDescription>

        <div className="flex flex-row gap-2 mt-4">
          {/* Copy Button */}
          <Button
            className="flex-1"
            variant="secondary"
            onClick={async () => {
              if (filled.trim()) await navigator.clipboard.writeText(filled);
            }}
          >
            <Copy className="h-4 w-4" /> Copy prompt
          </Button>

          {/* AI Send Button with Dropdown */}
          <ButtonGroup className="flex-1 relative">
            <Button className="flex-1" onClick={handleSendToAI}>
              <Image
                src={selectedAI.logo}
                alt={selectedAI.name}
                width={16}
                height={16}
              />
              {`Send to ${selectedAI.name}`}
            </Button>

            <ButtonGroupSeparator />

            <Button onClick={() => setMenuOpen((prev) => !prev)}>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>

            {menuOpen && (
              <div className="absolute top-full right-0 mt-1 w-44 bg-white border rounded shadow z-50">
                {aiPlatforms.map((ai) => (
                  <button
                    key={ai.name}
                    className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100"
                    onClick={() => {
                      setSelectedAI(ai);
                      setMenuOpen(false);
                    }}
                  >
                    <Image src={ai.logo} alt={ai.name} width={16} height={16} />
                    {ai.name}
                  </button>
                ))}
              </div>
            )}
          </ButtonGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}
