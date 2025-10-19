import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";

import UpdateFolderMenu from "./UpdateFolderMenu";
import { cn } from "@/lib/utils";
export interface FolderItemProps {
  id: string;
  name: string;
  children: React.ReactNode;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FolderItem({
  id,
  name,
  children,
  count,
  isOpen,
  onToggle,
}: FolderItemProps) {
  return (
    <li className="flex flex-col">
      <div
        onClick={onToggle}
        className={cn(
          "group flex flex-row px-4 py-3 items-center justify-between cursor-pointer border-l-4 border-transparent",
          isOpen && "bg-blue-50 border-blue-500"
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-1">
            <Image
              src={`/folder.svg`}
              alt={"folder"}
              width={24}
              height={24}
              className="mr-1"
            />
            <p className="text-sm font-medium">{name}</p>
            <p className="text-sm text-gray-500">{`(${count})`}</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <UpdateFolderMenu id={id} name={name} />
          {isOpen ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>

      {isOpen && <>{children}</>}
    </li>
  );
}

export default FolderItem;
