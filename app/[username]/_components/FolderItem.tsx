import React from "react";
import Image from "next/image";

export interface FolderItemProps {
  name: string;
}

function FolderItem({ name }: FolderItemProps) {
  return (
    <li className="flex items-center gap-2 cursor-pointer px-4 py-3">
      <Image src={`folder.svg`} alt={"folder"} width={24} height={24} />
      <p className="text-sm font-semibold">{name}</p>
    </li>
  );
}

export default FolderItem;
