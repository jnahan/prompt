import React from "react";
import PromptDialog from "@/app/prompt/_components/PromptDialog";
import UpdatePromptMenu from "./UpdatePromptMenu";

interface PromptItemProps {
  id: string;
  title: string;
  content: string;
}

function PromptItem({ id, title, content }: PromptItemProps) {
  return (
    <PromptDialog title={title} content={content}>
      <li className="flex flex-col gap-1 cursor-pointer px-4 py-3 text-left w-full">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-gray-500">{content}</p>
        <UpdatePromptMenu id={id} />
      </li>
    </PromptDialog>
  );
}

export default PromptItem;
