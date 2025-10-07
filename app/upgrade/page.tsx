"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function UpgradePage() {
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Upgrade plan</h1>
      <ul className="flex flex-row border border-gray-200 rounded-lg">
        <li className="flex flex-1 flex-col justify-between border-r border-gray-200 px-6 py-8">
          <h2 className="font-semibold mb-3">Starter</h2>
          <h3 className="text-2xl font-bold mb-6">$0</h3>
          <Button className="mb-6" variant="secondary" disabled>
            Current plan
          </Button>
          <ul className="list-none flex flex-col gap-4">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-medium">Up to 5 prompts</p>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-medium">Up to 5 prompts</p>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-medium">Up to 5 prompts</p>
            </li>
          </ul>
        </li>
        <li className="flex flex-1 flex-col justify-between border-r border-gray-200 px-6 py-8 ">
          <div className="flex flex-row gap-2 items-center mb-3">
            <h2 className="font-semibold">Unlimited prompts</h2>
            <div className="p-1 bg-blue-100 rounded-sm">
              <p className="text-[10px] font-semibold text-blue-500">
                Lifetime access
              </p>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-6">$39.99</h3>
          <Button className="mb-6">
            <Link href="/checkout">Upgrade</Link>
          </Button>
          <ul className="list-none flex flex-col gap-4">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-medium">Up to 5 prompts</p>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-medium">Up to 5 prompts</p>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-500" />
              <p className="text-sm font-medium">Up to 5 prompts</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
