import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types";

// https://github.com/adrianhajdin/saas-app/blob/main/lib/actions/companion.actions.ts
export const createProfile = async (
  id: string,
  firstName: string,
  lastName: string,
  username: string,
  avatarUrl: string
): Promise<Profile> => {
  const supabase = createClient();

  const { data, error } = await supabase.from("profiles").insert({
    id: id,
    first_name: firstName,
    last_name: lastName,
    username: username,
    avatar_url: avatarUrl,
  });
  if (error || !data) {
    throw error;
  }
  return data;
};

export const readProfile = async (id: string): Promise<Profile> => {};

export const updateProfile = async (
  id: string,
  firstName: string,
  lastName: string,
  username: string,
  avatarUrl: string
): Promise<Profile> => {};

export const deleteProfile = async (id: string): Promise<void> => {};
