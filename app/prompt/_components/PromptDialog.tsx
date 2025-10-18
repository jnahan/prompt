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
import Image from "next/image";

interface PromptDialogProps {
  title: string;
  content: string;
  variables?: string;
  children?: React.ReactNode;
}

function PromptDialog({ title, content, children }: PromptDialogProps) {
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
      <DialogContent className={`flex flex-col max-w-[640px] min-w-[640px]`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium font-mono">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p className="text-sm">{content}</p>
        </DialogDescription>

        <div className="flex flex-row gap-2">
          <Button
            variant="secondary"
            onClick={async () => {
              await navigator.clipboard.writeText(content);
            }}
          >
            <Copy className="h-4 w-4" /> Copy prompt
          </Button>
          <ButtonGroup>
            <Button variant="secondary">
              <Image
                src="/ai-logos/openai.svg"
                alt="ChatGPT"
                width={20}
                height={20}
              />
              Send to ChatGPT
            </Button>
            <ButtonGroupSeparator />
            <Button variant="secondary">
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PromptDialog;
