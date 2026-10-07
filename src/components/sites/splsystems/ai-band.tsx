import { AskAi } from "./ask-ai";
import { InView, Reveal } from "./reveal";

/** Standalone band between the last content section and the footer. */
export function AiBand() {
  return (
    <section className="relative flex min-h-[60svh] items-center bg-[#fbfbfb] px-4 py-20 md:px-8 md:py-28">
      <InView className="relative mx-auto flex w-full max-w-[2000px] items-center justify-center">
        <Reveal>
        <AskAi
          label="Summarize this page with AI"
          prompt="Summarize this page: https://splsystems.com"
          size="lg"
        />
        </Reveal>
      </InView>
    </section>
  );
}
