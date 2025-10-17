import Image from "next/image";
import { Link } from "lucide-react";

function QuickLinks() {
  return (
    <div className="flex flex-row gap-4 items-center justify-center my-4">
      <div className="flex flex-row gap-2 items-center">
        <Link className="w-4 h-4" />
        <span className="text-sm font-medium font-mono">Quick links</span>
      </div>
      <a href="https://claude.ai/" target="_blank">
        <Image
          src={`ai-logos/claude.svg`}
          alt={"claude"}
          width={24}
          height={24}
        />
      </a>
      <a href="https://copilot.microsoft.com/" target="_blank">
        <Image
          src={`ai-logos/copilot.svg`}
          alt={"copilot"}
          width={24}
          height={24}
        />
      </a>
      <a href="https://gemini.google.com/" target="_blank">
        <Image
          src={`ai-logos/gemini.svg`}
          alt={"gemini"}
          width={24}
          height={24}
        />
      </a>
      <a href="https://grok.com/" target="_blank">
        <Image src={`ai-logos/grok.svg`} alt={"grok"} width={24} height={24} />
      </a>
      <a href="https://chat.openai.com/" target="_blank">
        <Image
          src={`ai-logos/openai.svg`}
          alt={"openai"}
          width={24}
          height={24}
        />
      </a>
      <a href="https://www.perplexity.ai/" target="_blank">
        <Image
          src={`ai-logos/perplexity.svg`}
          alt={"perplexity"}
          width={24}
          height={24}
        />
      </a>
    </div>
  );
}

export default QuickLinks;
