import PromptDialog from "@/app/prompt/_components/PromptDialog";
import UpdatePromptMenu from "./UpdatePromptMenu";
import { cn } from "@/lib/utils";
interface PromptItemProps {
  id: string;
  title: string;
  content: string;
  isNested?: boolean;
}

function PromptItem({ id, title, content, isNested }: PromptItemProps) {
  return (
    <PromptDialog title={title} content={content}>
      <li
        className={cn(
          "flex flex-row justify-between items-center px-5 py-3 w-full cursor-pointer group",
          isNested && "pl-10 bg-blue-50 box-border"
        )}
      >
        <div className="flex flex-col gap-1 cursor-pointer text-left">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-gray-500 text-ellipsis max-w-[640px] overflow-hidden line-clamp-2">
            {content}
          </p>
        </div>
        <UpdatePromptMenu id={id} />
      </li>
    </PromptDialog>
  );
}

export default PromptItem;
