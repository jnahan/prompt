"use server";

import { revalidatePath } from "next/cache";
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

  // Check if user is on free plan and has reached the limit
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("subscription_level")
    .eq("id", user.id)
    .single();

  if (profileError) throw profileError;

  if (profile.subscription_level === "free") {
    const { count, error: countError } = await supabase
      .from("prompts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (countError) throw countError;

    if (count !== null && count >= 5) {
      throw new Error(
        "Free users can only create up to 5 prompts. Please upgrade."
      );
    }
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
  revalidatePath("/", "layout"); // Revalidate all routes under root layout
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
  revalidatePath("/", "layout"); // Revalidate all routes under root layout
  return data;
};

export const deletePrompt = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("prompts").delete().eq("id", id);
  if (error) {
    throw error;
  }
  revalidatePath("/", "layout"); // Revalidate all routes under root layout
  return data;
};

export const readPromptsByUsername = async (username: string): Promise<Prompt[]> => {
  const supabase = await createClient();

  // First get the user's profile to get their user_id
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username.toLowerCase().trim())
    .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  if (!profile) {
    return [];
  }

  // Get current user (if authenticated) to check saved status
  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch prompts by user ID
  const { data: prompts, error: promptsError } = await supabase
    .from("prompts")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  if (promptsError) {
    throw promptsError;
  }

  if (!prompts || prompts.length === 0) {
    return [];
  }

  // If user is authenticated, check which prompts they've saved
  if (user) {
    const promptIds = prompts.map((p) => p.id);
    const { data: savedPrompts } = await supabase
      .from("saved_prompts")
      .select("prompt_id")
      .eq("user_id", user.id)
      .in("prompt_id", promptIds);

    const savedPromptIds = new Set(savedPrompts?.map((sp) => sp.prompt_id) || []);

    // Add is_saved flag to each prompt
    return prompts.map((prompt) => ({
      ...prompt,
      is_saved: savedPromptIds.has(prompt.id),
    }));
  }

  return prompts;
};

export const savePrompt = async (promptId: string) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("saved_prompts").insert({
    user_id: user.id,
    prompt_id: promptId,
  });

  if (error) {
    // Handle unique constraint violation (user already saved this prompt)
    if (error.code === "23505") {
      throw new Error("Prompt already saved");
    }
    throw error;
  }

  revalidatePath("/", "layout");
};

export const unsavePrompt = async (promptId: string) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("saved_prompts")
    .delete()
    .eq("user_id", user.id)
    .eq("prompt_id", promptId);

  if (error) {
    throw error;
  }

  revalidatePath("/", "layout");
};

export const readSavedPrompts = async (): Promise<Prompt[]> => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  // Get all saved prompt IDs for the user
  const { data: savedPrompts, error: savedError } = await supabase
    .from("saved_prompts")
    .select("prompt_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (savedError) {
    throw savedError;
  }

  if (!savedPrompts || savedPrompts.length === 0) {
    return [];
  }

  const promptIds = savedPrompts.map((sp) => sp.prompt_id);

  // Fetch the actual prompts
  const { data: prompts, error: promptsError } = await supabase
    .from("prompts")
    .select("*")
    .in("id", promptIds);

  if (promptsError) {
    throw promptsError;
  }

  if (!prompts) {
    return [];
  }

  // Sort prompts by the order they were saved (most recent first)
  const savedMap = new Map(
    savedPrompts.map((sp) => [sp.prompt_id, sp.created_at])
  );

  const promptsWithSaved = prompts
    .map((prompt) => ({
      ...prompt,
      is_saved: true, // All prompts here are saved by definition
    }))
    .sort((a, b) => {
      const aSavedAt = savedMap.get(a.id) || "";
      const bSavedAt = savedMap.get(b.id) || "";
      return bSavedAt.localeCompare(aSavedAt);
    });

  return promptsWithSaved;
};
