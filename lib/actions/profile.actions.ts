"use server";

import { CreateProfile } from "@/types";
import { createClient } from "../supabase/server";

// https://github.com/adrianhajdin/saas-app/blob/main/lib/actions/companion.actions.ts
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

// export const readProfile = async (id: string): Promise<Profile> => {};

// export const updateProfile = async (formData: CreateProfile): Promise<Profile> => {};

// export const deleteProfile = async (id: string): Promise<void> => {};
