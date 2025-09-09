import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VariableComponent } from "./variable-button";
import { X } from "lucide-react";
import { useState } from "react";

interface VariableSettingsRowProps {
  variable: string;
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
  onTypeChange: (type: string) => void;
  onDefaultValueChange: (value: string) => void;
  onAddSelectOption?: () => void;
  onRemoveSelectOption?: (index: number) => void;
}

export function VariableSettingsRow({
  variable,
  color,
  type,
  defaultValue = "",
  selectOptions = [],
  onTypeChange,
  onDefaultValueChange,
  onAddSelectOption,
  onRemoveSelectOption,
}: VariableSettingsRowProps) {
  return (
    <div className="grid grid-cols-3 gap-4 items-start">
      {/* Variable */}
      <div className="flex items-center">
        <VariableComponent
          variable={variable}
          color={color}
          onClick={() => {}} // Disabled in settings, so empty function
          disabled={true}
        />
      </div>

      {/* Type */}
      <div>
        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Input</SelectItem>
            <SelectItem value="textarea">Textarea</SelectItem>
            <SelectItem value="select">Select</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Default Value */}
      <div className="space-y-2">
        {type === "select" ? (
          <div className="space-y-2">
            {selectOptions.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...selectOptions];
                    newOptions[index] = e.target.value;
                    onDefaultValueChange(JSON.stringify(newOptions));
                  }}
                />
                {onRemoveSelectOption && selectOptions.length > 1 && (
                  <Button
                    onClick={() => onRemoveSelectOption(index)}
                    variant="outline"
                    size="sm"
                    className="p-1 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {onAddSelectOption && (
              <Button
                onClick={onAddSelectOption}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                + Add select option
              </Button>
            )}
          </div>
        ) : type === "textarea" ? (
          <Textarea
            placeholder="Default value (optional)"
            value={defaultValue}
            onChange={(e) => onDefaultValueChange(e.target.value)}
            rows={4}
            className="min-h-[100px]"
          />
        ) : (
          <Input
            placeholder="Default value (optional)"
            value={defaultValue}
            onChange={(e) => onDefaultValueChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
