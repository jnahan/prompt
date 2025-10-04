"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Check } from "lucide-react";
import { OnboardingData } from "@/types";

interface OnboardingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OnboardingData) => void;
}

export function OnboardingOverlay({
  isOpen,
  onClose,
  onSubmit,
}: OnboardingOverlayProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate username from first and last name
  const generateUsername = (first: string, last: string) => {
    if (!first || !last) return "";
    const base = `${first.toLowerCase()}${last.toLowerCase()}`;
    return `@${base}`;
  };

  // Update username when first/last name changes
  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    if (!username || username.startsWith("@")) {
      setUsername(generateUsername(value, lastName));
    }
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    if (!username || username.startsWith("@")) {
      setUsername(generateUsername(firstName, value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await onSubmit({
        firstName,
        lastName,
        username: username.replace("@", ""), // Remove @ for storage
      });
    } catch (error: any) {
      console.error("Onboarding error:", error);
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = firstName && lastName && username;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">👋</div>
          <h2 className="text-2xl font-bold">Nice to meet you!</h2>
          <p className="text-gray-600 text-sm mt-2">
            Complete your profile to get started with QuickPrompt
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Alex"
                value={firstName}
                onChange={(e) => handleFirstNameChange(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Smith"
                value={lastName}
                onChange={(e) => handleLastNameChange(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                id="username"
                placeholder="@alexsmith"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pr-10"
                required
              />
              {username && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-500" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setUsername("")}
                    className="h-4 w-4 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">
              This will be associated with your prompts and shared content
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Setting up..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
