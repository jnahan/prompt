import Image from "next/image";

function QuickLinks() {
  return (
    <div className="flex flex-row gap-4 items-center justify-start border-b px-5 py-3">
      <span className="text-sm font-medium font-mono">Quick links:</span>
      <a href="https://claude.ai/" target="_blank">
        <Image
          src={`/ai-logos/claude.svg`}
          alt={"claude"}
          width={20}
          height={20}
        />
      </a>
      <a href="https://copilot.microsoft.com/" target="_blank">
        <Image
          src={`/ai-logos/copilot.svg`}
          alt={"copilot"}
          width={20}
          height={20}
        />
      </a>
      <a href="https://gemini.google.com/" target="_blank">
        <Image
          src={`/ai-logos/gemini.svg`}
          alt={"gemini"}
          width={20}
          height={20}
        />
      </a>
      <a href="https://grok.com/" target="_blank">
        <Image src={`/ai-logos/grok.svg`} alt={"grok"} width={20} height={20} />
      </a>
      <a href="https://chat.openai.com/" target="_blank">
        <Image
          src={`/ai-logos/openai.svg`}
          alt={"openai"}
          width={20}
          height={20}
        />
      </a>
      <a href="https://www.perplexity.ai/" target="_blank">
        <Image
          src={`/ai-logos/perplexity.svg`}
          alt={"perplexity"}
          width={20}
          height={20}
        />
      </a>
    </div>
  );
}

export default QuickLinks;
