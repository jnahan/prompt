import PromptForm from "../../_components/PromptForm";
import { readPrompt } from "@/lib/actions/prompt.actions";
import { readFolders } from "@/lib/actions/folder.actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditPromptPage({ params }: any) {
  const { id } = params as { id: string };

  const prompt = await readPrompt(id);

  if (!prompt) {
    throw new Error("Prompt not found");
  }

  const initialValues = {
    title: prompt.title,
    content: prompt.content,
    folder_id: prompt.folder_id || "",
  };

  const folders = await readFolders();

  return (
    <PromptForm promptId={id} initialValues={initialValues} folders={folders} />
  );
}
