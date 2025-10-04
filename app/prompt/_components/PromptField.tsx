import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PromptField() {
  return (
    <div className="w-full">
      <Label htmlFor="email" className="text-sm font-medium p-1 bg-gray-100">
        Variable
      </Label>
      <Input className="mt-2" type="email" id="email" placeholder="Email" />
    </div>
  );
}

export default PromptField;
