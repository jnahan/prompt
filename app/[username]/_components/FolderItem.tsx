import React from "react";
import Image from "next/image";

export interface FolderItemProps {
  name: string;
  children: React.ReactNode;
  count: number;
}

function FolderItem({ name, children, count }: FolderItemProps) {
  return (
    <li className="flex flex-col cursor-pointer px-4 py-3">
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
      <ul className="pl-4">{children}</ul>
    </li>
  );
}

export default FolderItem;
