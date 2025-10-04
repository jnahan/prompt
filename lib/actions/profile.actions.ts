"use server";

import { CreateProfile } from "@/types";
import { createClient } from "../supabase/server";
import { Profile } from "@/types";

// TODO: handle duplicate username
export const createProfile = async (formData: CreateProfile) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase.from("profiles").insert({
    username: formData.username,
    first_name: formData.firstName,
    last_name: formData.lastName,
    id: user.id,
  });

  if (error) {
    throw error;
  }
  return data;
};

export const readProfile = async (): Promise<Profile> => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};
