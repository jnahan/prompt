"use server";

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

  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", user.id);
  if (error) {
    throw error;
  }
  return data;
};

export const deleteFolder = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase.from("folders").delete().eq("id", id);
  if (error) {
    throw error;
  }
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
  return data;
};
