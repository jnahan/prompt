"use client";

import PromptForm from "../../_components/PromptForm";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { readPrompt, updatePrompt } from "@/lib/actions/prompt.actions";

export default function EditPromptPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<{
    title: string;
    content: string;
    folder_id?: string;
  }>({
    title: "",
    content: "",
    folder_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!params?.id) return;
      const prompt = await readPrompt(params.id);
      if (prompt) {
        setInitialValues({
          title: prompt.title,
          content: prompt.content,
          folder_id: prompt.folder_id,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [params?.id]);

  if (loading) return null;

  return (
    <PromptForm
      initialValues={initialValues}
      onSubmit={async (values) => {
        await updatePrompt(params.id as string, values);
        router.replace("/");
      }}
    />
  );
}
