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

export const readPrompts = async (username: string): Promise<Prompt[]> => {
  const supabase = await createClient();

  // Get user ID by username
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (profileError || !profile) {
    throw new Error("User not found");
  }

  // Fetch prompts by user ID
  const { data: prompts, error: promptsError } = await supabase
    .from("prompts")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false }); // optional: latest first

  if (promptsError) {
    throw promptsError;
  }

  return prompts ?? [];
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
