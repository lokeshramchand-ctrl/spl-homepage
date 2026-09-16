import { ScrambleText, RevealWords, FadeUp } from "../shared/reveal";
import { Button } from "../shared/button";

const CARDS = [
  {
    title: "Services",
    body: "From investor-ready MVPs and product design systems to full dev team extensions, we help tech companies build things that work and last. Whether you need UX strategy, interface design, or ongoing product delivery, you'll work with a focused team that embeds fast, adapts to your stack, and delivers without dragging timelines.",
    href: "/#services",
  },
  {
    title: "Cases",
    body: "We design and build products across FinTech, EdTech, Healthcare, Web3, and SaaS. From mobile apps and dashboards to branded websites and internal platforms, our work covers real user needs at every product stage. Whether it's shaping flows from scratch or delivering clean UI kits for development, we focus on clarity, usability, and results that make sense.",
    href: "/projects",
  },
  {
    title: "Prices",
    body: "Every product and company are different, but pricing shouldn't feel like a black box. We offer transparent estimates for every stage of building a product: design, development, research, and strategy. Whether launching an app, building an MVP, or redesigning a platform, you'll see the scope, service, and delivery details clearly laid out.",
    href: "/contact-us",
  },
];

export function DivingDeeper() {
  return (
    <section className="bg-white pb-24 sm:pb-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="What if you hire Phenomenon" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Diving deeper into what we can bring to your table" />
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[#080d10]/60">
          If you&apos;re curious to see the thinking, processes, and hands-on delivery that power our work, here&apos;s
          where to start:
        </p>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CARDS.map((c) => (
            <FadeUp key={c.title} className="flex flex-col rounded-xl bg-[#f4f5f4] p-8">
              <h3 className="text-2xl font-medium text-[#080d10]">{c.title}</h3>
              <p className="font-body mt-4 flex-1 text-sm text-[#080d10]/60">{c.body}</p>
              <Button href={c.href} variant="simple-dark" className="mt-6 self-start">
                Explore
              </Button>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
