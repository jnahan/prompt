"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy } from "lucide-react";

interface Variable {
  id: string;
  name: string;
  color:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "orange"
    | "pink";
  type: "text" | "textarea" | "select";
  defaultValue?: string;
  selectOptions?: string[];
}

interface PromptPreviewProps {
  prompt: string;
  variables: Variable[];
}

export function PromptPreview({ prompt, variables }: PromptPreviewProps) {
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

  const colorClasses = {
    gray: "bg-gray-100 text-gray-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    orange: "bg-orange-100 text-orange-800",
    pink: "bg-pink-100 text-pink-800",
  };

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
              className={`px-1 py-0.5 rounded text-sm font-medium ${colorClasses[colorClass]}`}
            >
              {value}
            </span>
          );
        } else {
          return (
            <span
              key={index}
              className={`px-1 py-0.5 rounded text-sm font-mono ${colorClasses[colorClass]}`}
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
    }
  };

  return (
    <div className="space-y-6">
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
                      colorClasses[variable.color]
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
                    <SelectTrigger>
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
                  />
                ) : (
                  <Input
                    placeholder={variable.defaultValue || "Enter value"}
                    value={variableValues[variable.name] || ""}
                    onChange={(e) =>
                      handleVariableChange(variable.name, e.target.value)
                    }
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
        className="w-full flex items-center justify-center gap-2"
      >
        <Copy className="h-4 w-4" />
        Copy Prompt
      </Button>

      {/* Bottom section - Live prompt preview */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Prompt</Label>
        <div className="p-4 bg-gray-50 rounded-lg border min-h-32 text-sm leading-relaxed">
          {renderLivePrompt()}
        </div>
      </div>
    </div>
  );
}
