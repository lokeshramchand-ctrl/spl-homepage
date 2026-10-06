import { AskAi } from "./ask-ai";

/** Standalone band between the last content section and the footer. */
export function AiBand() {
  return (
    <section className="bg-[#fbfbfb] px-4 py-24 md:px-8 md:py-16">
      <div className="mx-auto flex min-h-0 w-full max-w-[2000px] items-center justify-center md:min-h-[50vh]">
        <AskAi
          label="Summarize this page with AI"
          prompt="Summarize this page: https://cyphercapital.com"
          size="lg"
        />
      </div>
    </section>
  );
}
