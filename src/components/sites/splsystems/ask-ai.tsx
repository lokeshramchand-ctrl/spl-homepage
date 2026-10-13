import { AiIconRow } from "./ai-links";
import { InView, Reveal } from "./reveal";

/** "Ask your AI about SPL Systems" / "Summarize this page with AI" — reused in the AI band and the footer. */
export function AskAi({
  label,
  prompt,
  size = "default",
  className = "",
  tone = "light",
}: {
  label: string;
  prompt: string;
  size?: "default" | "lg";
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <InView className={`flex flex-wrap items-center gap-8 ${className}`}>
      <Reveal
        as="p"
        className={`whitespace-nowrap text-[1rem] tracking-[-0.03em] ${tone === "dark" ? "text-white" : "text-[#181818]"}`}
      >
        {label}
      </Reveal>
      <AiIconRow prompt={prompt} tone={tone} className={size === "lg" ? "gap-3" : "gap-2"} />
    </InView>
  );
}
