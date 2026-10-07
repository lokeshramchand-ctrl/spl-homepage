import { AskAi } from "./ask-ai";

/** Standalone band between the last content section and the footer. */
export function AiBand() {
  return (
    <section className="relative bg-[#fbfbfb] px-4 py-20 md:px-8 md:py-24">
      <div className="relative mx-auto flex w-full max-w-[2000px] items-center justify-center">
        <AskAi
          label="Summarize this page with AI"
          prompt="Summarize this page: https://splsystems.com"
          size="lg"
        />
      </div>
    </section>
  );
}
