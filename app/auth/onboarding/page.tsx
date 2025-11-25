"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createProfile } from "@/lib/actions/profile.actions";

const formSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .regex(/^[a-z0-9_]+$/, {
      message: "Username can only contain lowercase letters, numbers, and underscores",
    }),
});

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await createProfile(values);
      router.push("/prompts");
    } catch (error) {
      // Log error for debugging
      console.error("Profile creation error:", error);
      
      if (error instanceof Error) {
        if (error.message === "Username is already taken") {
          form.setError("username", {
            type: "manual",
            message: "Username is already taken",
          });
        } else {
          // Show the actual error message for debugging
          form.setError("root", {
            type: "manual",
            message: error.message || "Something went wrong. Please try again",
          });
        }
      } else {
        form.setError("root", {
          type: "manual",
          message: "Something went wrong. Please try again",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center bg-background px-4"
      )}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to PromptKit 👋</CardTitle>
          <CardDescription>
            Complete your profile to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-4">
              <div className="flex gap-3">
                <div className="flex-1 grid gap-2">
                  <Label htmlFor="first_name">First name</Label>
                  <Input
                    id="first_name"
                    placeholder="First name"
                    {...form.register("first_name")}
                  />
                  {form.formState.errors.first_name && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.first_name.message}
                    </p>
                  )}
                </div>

                <div className="flex-1 grid gap-2">
                  <Label htmlFor="last_name">Last name</Label>
                  <Input
                    id="last_name"
                    placeholder="Last name"
                    {...form.register("last_name")}
                  />
                  {form.formState.errors.last_name && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="username"
                  {...form.register("username")}
                />
                {form.formState.errors.username && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.username.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Only lowercase letters, numbers, and underscores allowed
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating profile..." : "Continue"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
