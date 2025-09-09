"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, X } from "lucide-react";
import { Variable } from "@/types";
import { COLOR_CLASSES } from "@/constants";

interface PromptUsageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: string;
  variables: Variable[];
  title?: string;
  description?: string;
}

export function PromptUsageDialog({
  open,
  onOpenChange,
  prompt,
  variables,
  title,
  description,
}: PromptUsageDialogProps) {
  const [variableValues, setVariableValues] = useState<Record<string, string>>(
    {}
  );

  // Update variable values when variables change
  useEffect(() => {
    const newValues: Record<string, string> = {};
    variables.forEach((variable) => {
      newValues[variable.name] =
        variableValues[variable.name] || variable.defaultValue || "";
    });
    setVariableValues(newValues);
  }, [variables]);

  const renderLivePrompt = () => {
    if (!prompt) return null;

    const variablePattern = /(\{\{[^}]+\}\})/g;
    const parts = prompt.split(variablePattern);

    return parts.map((part, index) => {
      if (part.match(/^\{\{[^}]+\}\}$/)) {
        const variableName = part.slice(2, -2);
        const variable = variables.find((v) => v.name === variableName);
        const colorClass = variable?.color || "gray";
        const value =
          variableValues[variableName] || variable?.defaultValue || "";

        // If there's a value, show it with highlighting; otherwise show the variable placeholder
        if (value.trim()) {
          return (
            <span
              key={index}
              className={`px-1 py-0.5 rounded text-sm font-medium ${COLOR_CLASSES[colorClass]}`}
            >
              {value}
            </span>
          );
        } else {
          return (
            <span
              key={index}
              className={`px-1 py-0.5 rounded text-sm font-mono ${COLOR_CLASSES[colorClass]}`}
            >
              {part}
            </span>
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleVariableChange = (variableName: string, value: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [variableName]: value,
    }));
  };

  const generateFinalPrompt = () => {
    let finalPrompt = prompt;
    variables.forEach((variable) => {
      const value =
        variableValues[variable.name] || variable.defaultValue || "";
      finalPrompt = finalPrompt.replace(
        new RegExp(`\\{\\{${variable.name}\\}\\}`, "g"),
        value
      );
    });
    return finalPrompt;
  };

  const areAllVariablesFilled = () => {
    return variables.every((variable) => {
      const value =
        variableValues[variable.name] || variable.defaultValue || "";
      return value.trim() !== "";
    });
  };

  const handleCopy = () => {
    if (areAllVariablesFilled()) {
      const finalPrompt = generateFinalPrompt();
      navigator.clipboard.writeText(finalPrompt);
      // Optional: Show success feedback
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!w-[80vw] !max-w-[1080px] !h-[80vh] !max-h-[80vh] overflow-hidden p-0 !min-w-[80vw] !min-h-[80vh]"
        style={{ width: "80vw", height: "80vh", maxWidth: "1080px" }}
      >
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            <div>
              {title && <div className="text-xl font-bold">{title}</div>}
              {description && (
                <div className="text-sm text-gray-600 mt-1">{description}</div>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 h-full overflow-hidden">
          {/* Left side - Variables and inputs with gray background */}
          <div className="bg-gray-50 p-6 space-y-6 overflow-y-auto">
            {/* Variables section - only show if there are variables */}
            {variables.length > 0 && (
              <div className="space-y-4">
                <Label className="text-base font-medium">Variables</Label>
                <div className="space-y-4">
                  {variables.map((variable) => (
                    <div key={variable.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1 py-0.5 rounded text-xs font-mono ${
                            COLOR_CLASSES[variable.color]
                          }`}
                        >
                          {`{{${variable.name}}}`}
                        </span>
                      </div>

                      {variable.type === "select" ? (
                        <Select
                          value={variableValues[variable.name] || ""}
                          onValueChange={(value) =>
                            handleVariableChange(variable.name, value)
                          }
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {variable.selectOptions?.map((option, index) => (
                              <SelectItem key={index} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : variable.type === "textarea" ? (
                        <Textarea
                          placeholder={variable.defaultValue || "Enter value"}
                          value={variableValues[variable.name] || ""}
                          onChange={(e) =>
                            handleVariableChange(variable.name, e.target.value)
                          }
                          rows={3}
                          className="bg-white"
                        />
                      ) : (
                        <Input
                          placeholder={variable.defaultValue || "Enter value"}
                          value={variableValues[variable.name] || ""}
                          onChange={(e) =>
                            handleVariableChange(variable.name, e.target.value)
                          }
                          className="bg-white"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Copy button - full width */}
            <Button
              onClick={handleCopy}
              disabled={variables.length > 0 && !areAllVariablesFilled()}
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white"
            >
              <Copy className="h-4 w-4" />
              Copy Prompt
            </Button>
          </div>

          {/* Right side - Live prompt preview with white background */}
          <div className="bg-white p-6 space-y-4 overflow-y-auto">
            <Label className="text-base font-medium">Results</Label>
            <div className="p-4 bg-white border rounded-lg min-h-32 text-sm leading-relaxed">
              {renderLivePrompt()}
            </div>
            <div className="text-xs text-gray-500">
              <span>Generated content</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
