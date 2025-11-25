"use server";

import { CreateProfile } from "@/types";
import { createClient } from "../supabase/server";
import { Profile } from "@/types";
import { adminAuthClient } from "../supabase/admin";
export const createProfile = async (formData: CreateProfile) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const trimmedUsername = formData.username.toLowerCase().trim();
  
  // Check if username is already taken by another user
  const { data: existingUsername, error: usernameCheckError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", trimmedUsername)
    .maybeSingle();

  if (usernameCheckError) {
    throw usernameCheckError;
  }

  // Only throw error if username is taken by a different user
  if (existingUsername && existingUsername.id !== user.id) {
    throw new Error("Username is already taken");
  }

  // Use upsert to create or update profile (without select().single() to avoid PGRST116)
  const { error: upsertError } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: trimmedUsername,
      subscription_level: "free", // Set default subscription level for new users
    });

  if (upsertError) {
    // Log full error for debugging
    console.error("Upsert error:", upsertError);
    // Provide more detailed error message
    const errorMessage = upsertError.message || upsertError.code || "Database error saving new user";
    throw new Error(errorMessage);
  }

  // Fetch the profile separately after successful upsert
  const { data: profile, error: fetchError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (fetchError) {
    console.error("Fetch error:", fetchError);
    throw fetchError;
  }

  if (!profile) {
    throw new Error("Failed to create profile. Please try again.");
  }

  return profile;
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

