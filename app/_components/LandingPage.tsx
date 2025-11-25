import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="flex flex-col gap-4 pt-8">
        <h1 className="text-2xl font-medium font-mono">
          All your prompts in one place
        </h1>
        <p className="text-sm text-gray-600">
          Create, organize, and share your AI prompts effortlessly
        </p>
        <div className="pt-2">
          <Button asChild>
            <Link href="/auth/sign-up">Get started</Link>
          </Button>
        </div>
      </section>

      {/* Create & Organize Section */}
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-medium font-mono">
          Create prompts / organize in folders
        </h2>
        <p className="text-sm text-gray-600">
          Build your prompt library and keep everything organized with folders
        </p>
      </section>

      {/* Discover Section */}
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-medium font-mono">Discover prompts</h2>
        <p className="text-sm text-gray-600">
          Browse prompts from the community and save your favorites
        </p>
      </section>

      {/* One-click AI Section */}
      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-medium font-mono">One-click send to AI</h2>
        <p className="text-sm text-gray-600">
          Send prompts directly to ChatGPT, Claude, Gemini, and more with a single click
        </p>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col gap-4 pt-4 border-t">
        <Button asChild size="lg">
          <Link href="/auth/sign-up">Sign up free</Link>
        </Button>
        <p className="text-xs text-gray-500 text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
}

