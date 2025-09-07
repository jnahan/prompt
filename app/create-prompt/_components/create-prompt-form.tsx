"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { VariableComponent } from "./variable-button";
import { VariableSettingsRow } from "./variable-settings-row";
import { PromptUsageDialog } from "@/components/prompt-usage-dialog";
import { ChevronDown, Plus } from "lucide-react";
import { Variable, AVAILABLE_COLORS } from "@/lib/types";

export function CreatePromptForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [isVariableSettingsOpen, setIsVariableSettingsOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);

  const handleInsertVariable = (
    variableName: string,
    color: Variable["color"]
  ) => {
    const variableText = `{{${variableName}}}`;
    setPrompt((prev) => prev + variableText);

    // Add to variables list if not already exists
    if (!variables.find((v) => v.name === variableName)) {
      const newVariable: Variable = {
        id: Date.now().toString(),
        name: variableName,
        color,
        type: "text",
        defaultValue: "",
        selectOptions: [],
      };
      setVariables((prev) => [...prev, newVariable]);
    }
  };

  const handlePromptChange = (value: string) => {
    setPrompt(value);

    // Update variables list based on what's in the prompt
    const variablePattern = /\{\{([^}]+)\}\}/g;
    const variablesInPrompt = new Set<string>();
    let match;

    while ((match = variablePattern.exec(value)) !== null) {
      variablesInPrompt.add(match[1]);
    }

    setVariables((prev) => {
      // Filter out variables that are no longer in the prompt
      const existingVariables = prev.filter((v) =>
        variablesInPrompt.has(v.name)
      );

      // Find new variables that need to be created
      const existingVariableNames = new Set(
        existingVariables.map((v) => v.name)
      );
      const newVariableNames = Array.from(variablesInPrompt).filter(
        (name) => !existingVariableNames.has(name)
      );

      // Create new variables with auto-assigned colors
      const newVariables = newVariableNames.map((name, index) => {
        const colorIndex =
          (existingVariables.length + index) % AVAILABLE_COLORS.length;
        return {
          id: Date.now().toString() + index,
          name,
          color: AVAILABLE_COLORS[colorIndex],
          type: "text" as const,
          defaultValue: "",
          selectOptions: [],
        };
      });

      return [...existingVariables, ...newVariables];
    });
  };

  const handleVariableTypeChange = (variableId: string, type: string) => {
    setVariables((prev) =>
      prev.map((v) =>
        v.id === variableId
          ? {
              ...v,
              type: type as Variable["type"],
              selectOptions: type === "select" ? ["", ""] : [],
            }
          : v
      )
    );
  };

  const handleDefaultValueChange = (variableId: string, value: string) => {
    setVariables((prev) =>
      prev.map((v) => (v.id === variableId ? { ...v, defaultValue: value } : v))
    );
  };

  const handleAddSelectOption = (variableId: string) => {
    setVariables((prev) =>
      prev.map((v) =>
        v.id === variableId
          ? { ...v, selectOptions: [...(v.selectOptions || []), ""] }
          : v
      )
    );
  };

  const handleRemoveSelectOption = (
    variableId: string,
    optionIndex: number
  ) => {
    setVariables((prev) =>
      prev.map((v) =>
        v.id === variableId
          ? {
              ...v,
              selectOptions: (v.selectOptions || []).filter(
                (_, index) => index !== optionIndex
              ),
            }
          : v
      )
    );
  };

  const handleCreatePrompt = () => {
    console.log("Creating prompt:", {
      title,
      description,
      prompt,
      attachments,
      variables,
    });
  };

  const handleCancel = () => {
    console.log("Cancel");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create prompt</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsPreviewDialogOpen(true)}
            variant="outline"
            size="sm"
          >
            Preview
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Placeholder"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Placeholder"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Prompt */}
        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="Ex. Pretend you are a business executive. Write pitch deck about {{placeholder 1}}"
            value={prompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            className="min-h-32"
          />
        </div>

        {/* Insert Variable Section */}
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            Variables are like placeholders that can be assigned values. Use
            variables to set fields you want to control like Name.
          </div>

          <div className="flex flex-wrap gap-2">
            {AVAILABLE_COLORS.map((color, index) => (
              <VariableComponent
                key={index}
                variable="Variable"
                color={color}
                onClick={() =>
                  handleInsertVariable(`Variable${index + 1}`, color)
                }
              />
            ))}
          </div>
        </div>

        {/* Variable Settings */}
        <Collapsible
          open={isVariableSettingsOpen}
          onOpenChange={setIsVariableSettingsOpen}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 p-0 h-auto"
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isVariableSettingsOpen ? "rotate-180" : ""
                }`}
              />
              <span>Variable settings</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
              <div>Variable</div>
              <div>Type</div>
              <div>Default value</div>
            </div>
            {variables.map((variable) => (
              <VariableSettingsRow
                key={variable.id}
                variable={variable.name}
                color={variable.color}
                type={variable.type}
                defaultValue={variable.defaultValue}
                selectOptions={variable.selectOptions}
                onTypeChange={(type) =>
                  handleVariableTypeChange(variable.id, type)
                }
                onDefaultValueChange={(value) =>
                  handleDefaultValueChange(variable.id, value)
                }
                onAddSelectOption={() => handleAddSelectOption(variable.id)}
                onRemoveSelectOption={(index) =>
                  handleRemoveSelectOption(variable.id, index)
                }
              />
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Attachments */}
        <div className="space-y-2">
          <Label htmlFor="attachments">Attachments (optional)</Label>
          <div className="space-y-2">
            <Input
              id="attachments"
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setAttachments(files);
              }}
              className="cursor-pointer"
            />
            {attachments.length > 0 && (
              <div className="text-sm text-gray-600">
                {attachments.length} file(s) selected
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleCreatePrompt}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create prompt
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>

      {/* Preview Dialog */}
      <PromptUsageDialog
        open={isPreviewDialogOpen}
        onOpenChange={setIsPreviewDialogOpen}
        prompt={prompt}
        variables={variables}
        title={title}
        description={description}
      />
    </div>
  );
}
