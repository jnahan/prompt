import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PromptField from "./PromptField";

import { Copy, EyeIcon } from "lucide-react";

interface PromptDialogProps {
  title: string;
  content: string;
  variables?: string;
  children?: React.ReactNode;
}

function PromptDialog({ title, content, children }: PromptDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        {children ?? (
          <Button variant="secondary">
            <EyeIcon className="h-4 w-4" />
            Preview
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex flex-row min-w-[60vw] max-h-[80vh]">
        <section className="p-8 overflow-y-auto w-2/3">
          <DialogHeader className="mb-4">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <p className="text-sm">{content}</p>
        </section>
        <section className="px-6 py-8 w-1/3 flex flex-col gap-4 border-l border-gray-200 overflow-y-auto">
          <PromptField />
          <PromptField />
          <PromptField />
          <PromptField />
          <Button>
            <Copy className="h-4 w-4" /> Copy prompt
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default PromptDialog;
