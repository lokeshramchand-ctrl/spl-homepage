import { AiIconRow } from "./ai-links";
import { InView, Reveal } from "./reveal";

/** "Ask your AI about SPL Systems" / "Summarize this page with AI" — reused in the AI band and the footer. */
export function AskAi({
  label,
  prompt,
  size = "default",
  className = "",
}: {
  label: string;
  prompt: string;
  size?: "default" | "lg";
  className?: string;
}) {
  return (
    <InView className={`flex flex-wrap items-center gap-8 ${className}`}>
      <Reveal
        as="p"
        className="whitespace-nowrap text-[1rem] tracking-[-0.03em] text-[#181818]"
      >
        {label}
      </Reveal>
      <AiIconRow prompt={prompt} className={size === "lg" ? "gap-3" : "gap-2"} />
    </InView>
  );
}
