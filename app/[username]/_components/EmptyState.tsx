import { Button } from "@/components/ui/button";
import { Sparkles, Plus } from "lucide-react";
import Link from "next/link";

function EmptyState() {
  return (
    <div className="p-12 text-center">
      <div className="flex justify-center mb-2">
        <Sparkles width={32} height={32} className="text-muted-foreground" />
      </div>
      <h3 className="font-semibold mb-1">Add a new prompt</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Your prompts will show up here
      </p>
      <Button>
        <Plus className="h-4 w-4" />
        <Link href="/prompt/new">Add prompt</Link>
      </Button>
    </div>
  );
}

export default EmptyState;
