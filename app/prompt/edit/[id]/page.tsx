import PromptForm from "../../_components/PromptForm";
import { readPrompt } from "@/lib/actions/prompt.actions";
import { readFolders } from "@/lib/actions/folder.actions";

export default async function EditPromptPage({
  params,
}: {
  params: { id: string };
}) {
  const prompt = await readPrompt(params.id);

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
    <PromptForm
      promptId={params.id}
      initialValues={initialValues}
      folders={folders}
    />
  );
}
