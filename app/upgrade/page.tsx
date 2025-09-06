"use client";

import { PricingCard } from "@/components/pricing-card";
import { Star } from "lucide-react";

export default function UpgradePage() {
  const handleUpgrade = () => {
    // Handle upgrade logic
    console.log("Upgrade to lifetime plan");
  };

  const freeFeatures = ["Label", "Label", "Label", "Label", "Label"];

  const lifetimeFeatures = ["Label", "Label", "Label", "Label", "Label"];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center py-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Star className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">QuickPrompt</span>
        </div>
        <h1 className="text-3xl font-bold">Upgrade plan</h1>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <PricingCard
            title="Free"
            price="$0"
            features={freeFeatures}
            buttonText="Current plan"
            buttonVariant="outline"
            isCurrent={true}
            icon="diamond"
            onButtonClick={() => {}}
          />

          {/* Lifetime Plan */}
          <PricingCard
            title="Unlimited prompts"
            price="$24.99"
            subtitle="One-time payment"
            features={lifetimeFeatures}
            buttonText="Upgrade Plan"
            buttonVariant="default"
            isHighlighted={true}
            badge="Lifetime access"
            icon="crown"
            onButtonClick={handleUpgrade}
          />
        </div>
      </div>
    </div>
  );
}
