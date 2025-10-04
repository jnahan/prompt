"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

export default function SettingsPage() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock user data - in a real app, this would come from your database
  const userData = {
    name: "Sofia Davis",
    email: "m@example.com",
    plan: "Basic plan",
  };

  const handleUpgradePlan = () => {
    router.push("/upgrade");
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    // TODO: Implement actual account deletion logic
    // For now, just simulate the process
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      // In a real app, this would redirect after successful deletion
      console.log("Account would be deleted");
    }, 2000);
  };

  return (
    <div>
      {/* Main Content */}
      <div className="mt-12">
        {/* User Profile Section */}
        <div className="text-center mb-8">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarImage src={""} alt={`avatar`} />
            <AvatarFallback className="bg-blue-100 text-blue-700 font-medium text-2xl">
              {userData.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {userData.name}
          </h1>
          <p className="text-gray-600">{userData.email}</p>
        </div>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Manage plan</h2>
          <div className="border border-gray-200 p-4 rounded-lg flex flex-row justify-between items-center">
            <div>
              <p className="font-semibold mb-1">Plan</p>
              <p className="text-sm text-muted-foreground">Basic plan</p>
            </div>
            <Button onClick={() => handleUpgradePlan()}>Upgrade</Button>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Manage account</h2>
          <div className="border border-gray-200 p-4 rounded-lg flex flex-row justify-between items-center">
            <div>
              <p className="font-semibold mb-1">Delete account</p>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                handleDeleteClick();
                setShowDeleteConfirm(true);
              }}
            >
              Delete account
            </Button>
          </div>
        </section>
        <ConfirmationDialog
          open={showDeleteConfirm}
          onOpenChange={setShowDeleteConfirm}
          onConfirm={handleDeleteConfirm}
          title="Delete Account"
          description="Are you sure you want to delete your account? This will permanently delete all your prompts, folders, and account data. This action cannot be undone."
          confirmText="Delete Account"
          cancelText="Cancel"
          variant="destructive"
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
}
