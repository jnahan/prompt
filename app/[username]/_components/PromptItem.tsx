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
      <li className="flex flex-row justify-between items-center px-4 py-3 w-full">
        <div className="flex flex-col gap-1 cursor-pointer text-left">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-gray-500">{content}</p>
        </div>
        <UpdatePromptMenu id={id} />
      </li>
    </PromptDialog>
  );
}

export default PromptItem;
