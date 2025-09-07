"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { VariableButton } from "./variable-button";
import { VariableSettingsRow } from "./variable-settings-row";
import { ChevronDown, Plus } from "lucide-react";

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
  type: "text" | "date" | "select" | "textarea";
  defaultValue?: string;
  selectOptions?: string[];
}

export function CreatePromptForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [generationType, setGenerationType] = useState("");
  const [prompt, setPrompt] = useState("");
  const [attachments, setAttachments] = useState("");
  const [variables, setVariables] = useState<Variable[]>([]);
  const [isVariableSettingsOpen, setIsVariableSettingsOpen] = useState(false);

  const colors: Array<
    "gray" | "red" | "yellow" | "green" | "blue" | "purple" | "orange" | "pink"
  > = ["gray", "red", "yellow", "green", "blue", "purple", "orange", "pink"];

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

  const handleCreatePrompt = () => {
    console.log("Creating prompt:", {
      title,
      description,
      generationType,
      prompt,
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
          <Button variant="outline" size="sm">
            Create
          </Button>
          <Button variant="ghost" size="sm">
            Preview
          </Button>
        </div>
      </div>

      {/* Form */}
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

        {/* Generation Type */}
        <div className="space-y-2">
          <Label htmlFor="generation-type">Generation type</Label>
          <Select value={generationType} onValueChange={setGenerationType}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text Generation</SelectItem>
              <SelectItem value="image">Image Generation</SelectItem>
              <SelectItem value="code">Code Generation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prompt */}
        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="Ex. Pretend you are a business executive. Write pitch deck about {{placeholder 1}}"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-32"
          />
        </div>

        {/* Insert Variable Section */}
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            Variables are like placeholders that can be assigned values. Use
            variables to set fields you want to control like Name.
          </div>

          <div className="grid grid-cols-6 gap-2">
            {colors.slice(0, 6).map((color, index) => (
              <VariableButton
                key={index}
                variable="Variable"
                color={color}
                onClick={() =>
                  handleInsertVariable(`Variable${index + 1}`, color)
                }
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <VariableButton
              variable="Variable"
              color="purple"
              onClick={() => handleInsertVariable("Variable7", "purple")}
            />
            <VariableButton
              variable="Variable"
              color="pink"
              onClick={() => handleInsertVariable("Variable8", "pink")}
            />
            <VariableButton
              variable="Variable"
              color="red"
              onClick={() => handleInsertVariable("Variable9", "red")}
            />
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
              />
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Attachments */}
        <div className="space-y-2">
          <Label htmlFor="attachments">Attachments (optional)</Label>
          <Input
            id="attachments"
            placeholder="Placeholder"
            value={attachments}
            onChange={(e) => setAttachments(e.target.value)}
          />
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
    </div>
  );
}
