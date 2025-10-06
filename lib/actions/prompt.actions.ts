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

export const updatePrompt = async (id: string, formData: CreatePrompt) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prompts")
    .update(formData)
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
