"use client";

import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProfile } from "@/lib/actions/profile.actions";
import { Profile } from "@/types";

function ManageSettings({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    await deleteProfile();
    router.push("/auth/login");
  };

  return (
    <section className="mt-2">
      <h1 className="text-3xl font-medium font-mono mb-8 text-center">
        Settings
      </h1>
      {/* Manage Plan */}
      <section className="mb-6">
        <div className="border border-gray-200 p-4 flex justify-between items-center">
          <div>
            <p className="font-medium mb-1">Plan</p>
            <p className="text-sm text-muted-foreground">
              {profile.subscription_level === "free"
                ? "Basic plan"
                : "Lifetime plan"}
            </p>
          </div>
          <Button onClick={() => router.push("/upgrade")}>
            {profile.subscription_level === "free" ? "Upgrade" : "Current plan"}
          </Button>
        </div>
      </section>

      {/* Manage Account */}
      <section>
        <div className="border border-gray-200 p-4 flex justify-between items-center">
          <div>
            <p className="font-medium mb-1">Delete account</p>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete account
          </Button>
        </div>

        <ConfirmationDialog
          open={showDeleteConfirm}
          onOpenChange={setShowDeleteConfirm}
          onConfirm={handleDelete}
          title="Delete Account"
          description="Are you sure you want to delete your account? This will permanently delete all your prompts, folders, and account data."
          confirmText="Delete Account"
          cancelText="Cancel"
          variant="destructive"
        />
      </section>
    </section>
  );
}

export default ManageSettings;
