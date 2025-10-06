"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProfileInfo from "@/app/[username]/_components/ProfileInfo";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

import { readProfile, deleteProfile } from "@/lib/actions/profile.actions";
import { Profile } from "@/types";

export default function SettingsPage() {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await readProfile();
      setProfile(profile);
    };
    fetchProfile();
  }, []);

  const handleUpgradePlan = () => {
    router.push("/upgrade");
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteProfile();
    router.push("/auth/login");
  };

  return (
    <div>
      {/* Main Content */}
      <div className="mt-12">
        <ProfileInfo username={profile?.username || ""} />
        {profile && (
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
        )}
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
        />
      </div>
    </div>
  );
}
