import { Button } from "@/components/ui/button";
import { updateSubscriptionLevel } from "@/lib/actions/profile.actions";
import Link from "next/link";
import Image from "next/image";

async function page() {
  await updateSubscriptionLevel("lifetime");

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Image
        className="mb-6"
        src="/illustrations/check.svg"
        alt="Check circle"
        width={100}
        height={92}
      />
      <h1 className="text-lg font-medium mb-2">Thank you for your purchase!</h1>
      <p className="mb-6 text-secondary-foreground">
        Your account has been upgraded. You can now save unlimited prompts for
        life!
      </p>
      <Button asChild>
        <Link href="/">Return home</Link>
      </Button>
    </div>
  );
}

export default page;
