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
    <>
      {/* Manage Plan */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold font-mono mb-4">Manage plan</h2>
        <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-semibold mb-1">Plan</p>
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
        <h2 className="text-sm font-semibold font-mono mb-4">Manage account</h2>
        <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-semibold mb-1">Delete account</p>
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
    </>
  );
}

export default ManageSettings;
