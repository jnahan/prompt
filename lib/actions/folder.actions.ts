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

// export const readFolder = async (id: string): Promise<Folder> => {};

// export const updateFolder = async (
//   id: string,
//   name: string,
//   description: string,
//   color: string
// ): Promise<Folder> => {};

// export const deleteFolder = async (id: string): Promise<void> => {};
