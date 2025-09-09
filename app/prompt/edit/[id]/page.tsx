"use client";

import { useRouter } from "next/navigation";
import { CreatePromptForm } from "@/app/prompt/_components/create-prompt-form";
import { mockPrompts, mockFolders } from "@/lib/mock-data";
import { Prompt, Variable } from "@/types";

interface EditPromptPageProps {
  params: { id: string };
}

export default function EditPromptPage({ params }: EditPromptPageProps) {
  const router = useRouter();
  const { id } = params;

  // Find the prompt to edit from mock data
  // First check standalone prompts
  let promptToEdit: Prompt | undefined = mockPrompts.find((p) => p.id === id);

  // If not found, check prompts in folders
  if (!promptToEdit) {
    for (const folder of mockFolders) {
      promptToEdit = folder.prompts.find((p) => p.id === id);
      if (promptToEdit) break;
    }
  }

  if (!promptToEdit) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Prompt Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The prompt you're trying to edit could not be found.
          </p>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Convert prompt variables to the expected format
  const initialVariables: Variable[] =
    promptToEdit.variables?.map((v) => ({
      id: v.id,
      name: v.name,
      color: v.color,
      type: v.type,
      defaultValue: v.defaultValue || "",
      selectOptions: v.selectOptions || [],
    })) || [];

  const handleSave = (formData: any) => {
    console.log("Saving prompt changes:", formData);
    // TODO: Implement actual save logic here
    // For now, just redirect back
    router.push(`/${promptToEdit?.id}`); // or wherever you want to redirect
  };

  return (
    <div>
      <CreatePromptForm
        initialData={{
          ...promptToEdit,
          variables: initialVariables,
        }}
        mode="edit"
        onSave={handleSave}
      />
    </div>
  );
}
