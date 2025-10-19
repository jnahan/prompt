"use server";

import { CreateProfile } from "@/types";
import { createClient } from "../supabase/server";
import { Profile } from "@/types";
import { adminAuthClient } from "../supabase/admin";
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

  const { data, error } = await supabase.from("profiles").upsert({
    username: formData.username,
    first_name: formData.first_name,
    last_name: formData.last_name,
    id: user.id,
  });

  if (error) {
    if (error.code === "23505") {
      // 23505 = unique violation in Postgres
      throw new Error("duplicate username");
    }
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

export const deleteProfile = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await adminAuthClient.deleteUser(user.id);

  if (error) {
    throw error;
  }
  return data;
};

export const updateSubscriptionLevel = async (
  level: "free" | "lifetime",
  userId: string
) => {
  const { adminClient } = await import("../supabase/admin");

  const { error } = await adminClient
    .from("profiles")
    .update({ subscription_level: level })
    .eq("id", userId);

  if (error) throw error;
};

export const getUserIdByUsername = async (
  username: string
): Promise<string> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (error || !data) {
    throw new Error("User not found");
  }

  return data.id;
};
