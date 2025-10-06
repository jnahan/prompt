"use server";

import { createClient } from "../supabase/server";
import { Prompt, CreatePrompt } from "@/types";

export const createPrompt = async (formData: CreatePrompt) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase.from("prompts").insert({
    user_id: user.id,
    title: formData.title,
    content: formData.content,
    ...(formData.folder_id && { folder_id: formData.folder_id }),
  });

  if (error) {
    throw error;
  }
  return data;
};

export const readPrompts = async (): Promise<Prompt[]> => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .eq("user_id", user.id);
  if (error) {
    throw error;
  }
  return data;
};

export const readPrompt = async (id: string): Promise<Prompt | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data ?? null;
};

export const updatePrompt = async (id: string, formData: CreatePrompt) => {
  const supabase = await createClient();

  const updateData: Partial<CreatePrompt> & { title: string; content: string } =
    {
      title: formData.title,
      content: formData.content,
    };

  if (typeof formData.folder_id !== "undefined") {
    // Map empty string to null for uuid column compatibility
    (updateData as any).folder_id = formData.folder_id || null;
  }

  const { data, error } = await supabase
    .from("prompts")
    .update(updateData)
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

export const deletePrompt = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("prompts").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};
