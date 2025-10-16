import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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

import { useState, useMemo } from "react";

function extractVariables(content: string): string[] {
  const matches = content.match(/{{(.*?)}}/g);
  if (!matches) return [];
  return matches.map((m) => m.replace(/{{|}}/g, "").trim());
}

function PromptDialog({ title, content, children }: PromptDialogProps) {
  const variableList = extractVariables(content);

  // store variable values
  const [values, setValues] = useState<Record<string, string>>({});

  // replace variables dynamically
  const previewText = useMemo(() => {
    let result = content;
    for (const variable of variableList) {
      const value = values[variable] ?? "";
      result = result.replace(
        new RegExp(`{{\\s*${variable}\\s*}}`, "g"),
        value || `{{${variable}}}`
      );
    }
    return result;
  }, [content, variableList, values]);

  const handleChange = (variable: string, value: string) => {
    setValues((prev) => ({ ...prev, [variable]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger className={children ? "w-full" : ""}>
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
          <DialogDescription>Prompt preview</DialogDescription>
          <p className="text-sm">{previewText}</p>
        </section>
        {variableList.length > 0 && (
          <div className="px-6 py-8 overflow-y-auto w-1/3">
            <ul>
              {variableList.map((variable, index) => (
                <PromptField
                  key={index}
                  label={variable}
                  value={values[variable] || ""}
                  onChange={(e) => handleChange(variable, e.target.value)}
                />
              ))}
            </ul>
            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(previewText);
              }}
            >
              <Copy className="h-4 w-4" /> Copy prompt
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PromptDialog;
