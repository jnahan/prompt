"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { OnboardingData, Profile } from "@/types";

export function useOnboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Check if user has completed onboarding by looking for their profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, username")
          .eq("id", user.id)
          .single();

        // If no profile exists or missing required fields, show onboarding
        if (
          !profile ||
          !profile.first_name ||
          !profile.last_name ||
          !profile.username
        ) {
          setIsOpen(true);
        }
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      // If there's an error (like profile doesn't exist), show onboarding
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setIsOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingSubmit = async (data: OnboardingData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No authenticated user");
      }

      // Check if username is already taken
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", data.username)
        .neq("id", user.id)
        .single();

      if (existingProfile) {
        throw new Error(
          "Username is already taken. Please choose a different one."
        );
      }

      // Update user profile in profiles table
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        username: data.username,
        first_name: data.firstName,
        last_name: data.lastName,
        subscription_level: "free",
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      setIsOpen(false);
      router.refresh(); // Refresh to update the UI
    } catch (error) {
      console.error("Onboarding error:", error);
      throw error;
    }
  };

  const closeOnboarding = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    isLoading,
    onSubmit: handleOnboardingSubmit,
    onClose: closeOnboarding,
  };
}
