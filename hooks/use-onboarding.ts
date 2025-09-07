"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface OnboardingData {
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
}

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
          .from("users")
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

      // Update user profile in users table
      const { error } = await supabase.from("users").upsert({
        id: user.id,
        email: user.email,
        username: data.username,
        first_name: data.firstName,
        last_name: data.lastName,
        name: `${data.firstName} ${data.lastName}`,
        plan: "free",
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      // Update password if provided
      if (data.password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: data.password,
        });

        if (passwordError) {
          throw passwordError;
        }
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
