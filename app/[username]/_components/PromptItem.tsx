import PromptDialog from "@/app/prompt/_components/PromptDialog";
import UpdatePromptMenu from "./UpdatePromptMenu";
import { cn } from "@/lib/utils";
interface PromptItemProps {
  id: string;
  title: string;
  content: string;
  isOwnProfile?: boolean;
  isNested?: boolean;
}

function PromptItem({
  id,
  title,
  content,
  isOwnProfile,
  isNested,
}: PromptItemProps) {
  return (
    <PromptDialog title={title} content={content}>
      <li
        className={cn(
          "flex flex-row justify-between items-center px-4 py-3 w-full cursor-pointer",
          isNested && "pl-10 bg-gray-50 box-border"
        )}
      >
        <div className="flex flex-col gap-1 cursor-pointer text-left">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-gray-500">{content}</p>
        </div>
        {isOwnProfile && <UpdatePromptMenu id={id} />}
      </li>
    </PromptDialog>
  );
}

export default PromptItem;
