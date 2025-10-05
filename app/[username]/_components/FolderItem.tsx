import React from "react";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface FolderItemProps {
  name: string;
  children: React.ReactNode;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FolderItem({
  name,
  children,
  count,
  isOpen,
  onToggle,
}: FolderItemProps) {
  return (
    <li className="flex flex-col">
      <button
        onClick={onToggle}
        className="flex flex-row px-4 py-3 items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md transition"
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        )}
        <div className="flex flex-row items-center gap-1">
          <Image
            src={`folder.svg`}
            alt={"folder"}
            width={24}
            height={24}
            className="mr-1"
          />
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{`(${count})`}</p>
        </div>
      </button>

      {isOpen && <ul className="pl-4">{children}</ul>}
    </li>
  );
}

export default FolderItem;
