import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PromptFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PromptField({ label, value, onChange }: PromptFieldProps) {
  return (
    <li className="w-full mb-4">
      <Label className="text-sm font-medium p-1 bg-gray-100">{label}</Label>
      <Input
        className="mt-2"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </li>
  );
}

export default PromptField;
