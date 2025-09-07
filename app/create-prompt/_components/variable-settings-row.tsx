import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  type: "text" | "date" | "select" | "textarea";
  defaultValue?: string;
  selectOptions?: string[];
  onTypeChange: (type: string) => void;
  onDefaultValueChange: (value: string) => void;
  onAddSelectOption?: () => void;
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
}: VariableSettingsRowProps) {
  const colorClasses = {
    gray: "bg-gray-100",
    red: "bg-red-100",
    yellow: "bg-yellow-100",
    green: "bg-green-100",
    blue: "bg-blue-100",
    purple: "bg-purple-100",
    orange: "bg-orange-100",
    pink: "bg-pink-100",
  };

  return (
    <div className="grid grid-cols-3 gap-4 items-start">
      {/* Variable */}
      <div className="flex items-center">
        <Button
          variant="outline"
          className={`${colorClasses[color]} border-0 text-black font-mono text-sm`}
          disabled
        >
          {`{{${variable}}}`}
        </Button>
      </div>

      {/* Type */}
      <div>
        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="select">Select</SelectItem>
            <SelectItem value="textarea">Textarea</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Default Value */}
      <div className="space-y-2">
        {type === "select" ? (
          <div className="space-y-2">
            {selectOptions.map((option, index) => (
              <Input
                key={index}
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...selectOptions];
                  newOptions[index] = e.target.value;
                  onDefaultValueChange(JSON.stringify(newOptions));
                }}
              />
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
