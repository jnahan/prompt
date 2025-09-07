"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, Crown, Trash2, Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  // Mock user data - in a real app, this would come from your database
  const userData = {
    name: "Sofia Davis",
    email: "m@example.com",
    plan: "Basic plan",
  };

  const handleUpgradePlan = () => {
    router.push("/upgrade");
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <div>
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* User Profile Section */}
        <div className="text-center mb-8">
          <Avatar className="h-24 w-24 mx-auto mb-4">
            <AvatarImage src="" alt={userData.name} />
            <AvatarFallback className="bg-gray-200 text-gray-600 text-2xl">
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {userData.name}
          </h1>
          <p className="text-gray-600">{userData.email}</p>
        </div>

        {/* Manage Plan Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Manage plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Plan</p>
                <p className="font-medium">{userData.plan}</p>
              </div>
              <Button
                onClick={handleUpgradePlan}
                className="bg-gray-800 hover:bg-gray-900 text-white"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">
                    Account Visibility
                  </Label>
                  <p className="text-sm text-gray-600">
                    {isPublic
                      ? "Your prompts are visible to everyone with your share link"
                      : "Your prompts are private and only visible to you"}
                  </p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  {isPublic ? (
                    <>
                      <Eye className="h-4 w-4" />
                      Public
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Private
                    </>
                  )}
                </Button>
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                <p className="font-medium mb-1">How it works:</p>
                <ul className="space-y-1">
                  <li>
                    • <strong>Public:</strong> Anyone with your share link can
                    view your prompts
                  </li>
                  <li>
                    • <strong>Private:</strong> Only you can see your prompts
                  </li>
                  <li>
                    • Individual prompts can still be marked as public/private
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manage Account Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Manage account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Delete account</p>
                <p className="text-xs text-gray-500">
                  This action cannot be undone
                </p>
              </div>
              <Button
                disabled={isDeleting}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete account"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
