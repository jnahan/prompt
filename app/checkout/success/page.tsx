import { Button } from "@/components/ui/button";
import { updateSubscriptionLevel } from "@/lib/actions/profile.actions";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

async function page() {
  await updateSubscriptionLevel("lifetime");

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
      <h1 className="text-lg font-semibold mb-1">Payment successful</h1>
      <p className="mb-4 text-secondary-foreground">
        Your account has been upgraded!
      </p>
      <Button asChild>
        <Link href="/">Return home</Link>
      </Button>
    </div>
  );
}

export default page;
