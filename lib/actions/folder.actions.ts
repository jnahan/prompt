"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { Folder, CreateFolder } from "@/types";

export const createFolder = async (formData: CreateFolder) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase.from("folders").insert({
    user_id: user.id,
    name: formData.name,
  });

  if (error) {
    throw error;
  }
  revalidatePath("/", "layout"); // Revalidate all routes under root layout
  return data;
};

export const readFolders = async (): Promise<Folder[]> => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  // Fetch folders for the user
  const { data: folders, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false }); // optional: latest first

  if (error) {
    throw error;
  }

  return folders ?? [];
};

export const updateFolder = async (id: string, formData: CreateFolder) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("folders")
    .update({ name: formData.name })
    .eq("id", id);
  if (error) {
    throw error;
  }
  revalidatePath("/", "layout"); // Revalidate all routes under root layout
  return data;
};

export const deleteFolder = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase.from("folders").delete().eq("id", id);
  if (error) {
    throw error;
  }
  revalidatePath("/", "layout"); // Revalidate all routes under root layout
};
