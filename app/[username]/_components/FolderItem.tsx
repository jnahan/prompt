import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";

import UpdateFolderMenu from "./UpdateFolderMenu";

export interface FolderItemProps {
  id: string;
  name: string;
  children: React.ReactNode;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
  isOwnProfile?: boolean;
}

function FolderItem({
  id,
  name,
  children,
  count,
  isOpen,
  onToggle,
  isOwnProfile,
}: FolderItemProps) {
  return (
    <li className="flex flex-col">
      <button
        onClick={onToggle}
        className="flex flex-row px-4 py-3 items-center justify-between cursor-pointer hover:bg-gray-50 rounded-md transition"
      >
        <div className="flex flex-row items-center gap-2">
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
        </div>
        {isOwnProfile && <UpdateFolderMenu id={id} name={name} />}
      </button>

      {isOpen && <ul className="pl-4">{children}</ul>}
    </li>
  );
}

export default FolderItem;
