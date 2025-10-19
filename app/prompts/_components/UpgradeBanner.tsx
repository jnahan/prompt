import { Info } from "lucide-react";
import Link from "next/link";

function UpgradeBanner() {
  return (
    <div className="flex items-center justify-between bg-blue-50 p-3">
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-blue-500" />
        <span className="text-sm">
          5/5 prompts saved. Upgrade to save unlimited prompts
        </span>
      </div>
      <Link className="underline text-sm" href="/upgrade">
        Upgrade now
      </Link>
    </div>
  );
}

export default UpgradeBanner;
