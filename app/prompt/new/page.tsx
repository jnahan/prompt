import PromptForm from "../_components/PromptForm";
import { readFolders } from "@/lib/actions/folder.actions";

export default async function NewPromptPage() {
  const folders = await readFolders();

  return <PromptForm folders={folders} />;
}
