import React from "react";

interface PromptItemProps {
  title: string;
  content: string;
}

function PromptItem({ title, content }: PromptItemProps) {
  return (
    <li className="flex flex-col gap-1 cursor-pointer px-4 py-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-gray-500">{content}</p>
    </li>
  );
}

export default PromptItem;
