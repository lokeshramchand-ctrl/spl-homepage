import { AskAi } from "./ask-ai";
import { InView, Reveal } from "./reveal";

/** Standalone black band between the Values section and the footer. */
export function AiBand() {
  return (
    <section id="ai-band" className="relative flex min-h-[60svh] items-center px-4 py-20 md:px-8 md:py-28">
      <div className="absolute inset-0 z-0 bg-[#181818]" aria-hidden="true" />
      <InView className="relative z-20 mx-auto flex w-full max-w-[2000px] items-center justify-center">
        <Reveal>
          <AskAi
            label="Summarize this page with AI"
            prompt="Summarize this page: https://splsystems.com"
            size="lg"
            tone="dark"
          />
        </Reveal>
      </InView>
    </section>
  );
}
