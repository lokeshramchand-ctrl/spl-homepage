import { RevealWords, ScrambleText } from "../shared/reveal";

const AWARDS = [
  { name: "Red Dot Award", items: ["Winner 2026 – app design"] },
  {
    name: "Clutch",
    items: [
      "Top Design Company 2026 – United States",
      "Top Product Design Company 2026 – United States",
      "Top Product Design Company 2026 – United Kingdom",
      "Top 1000 Company 2025",
      "Top Product Design Company 2024",
      "Top User Research Company 2024",
      "Top React Developers 2024",
    ],
  },
  { name: "UX Design Awards", items: ["Isora GRC - Nomination 2024", "Wisdom - Nomination 2026"] },
  { name: "Dribbble", items: ["Dribbble Select Agency 2026", "Hormn – Dribbble Select Shot 2026"] },
  { name: "Webflow", items: ["Webflow 101 certification", "Webflow CMS certification", "Webflow experts certification", "Webflow layouts certification"] },
  { name: "Upwork", items: ["Top Rated Agency"] },
  { name: "Behance", items: ["Featured in different galleries"] },
  { name: "DesignRush Award", items: ["Shaga Odyssey - Website Design Award 2025"] },
  {
    name: "awwwards",
    items: [
      "Shaga Odyssey – Site Of The Day Oct 27, 2024",
      "Shaga Odyssey – Developer Award 2024",
      "Vita Travels – Honorable Mention 2026",
      "Tabela – Honorable Mention 2026",
      "Elyse Residence – Honorable Mention 2026",
      "Pretty Patty – Honorable Mention 2025",
      "Paradigm – Honorable Mention 2025",
      "Shaga – Honorable Mention 2024",
      "Phenomenon studio website – Honorable Mention 2022",
      "Osiris – Honorable Mention 2022",
    ],
  },
  { name: "50pros", items: ["Featured in different categories"] },
  { name: "i.design Award", items: ["Shaga Odyssey - Winner 2026"] },
  { name: "The Manifest", items: ["The Most Reviewed Company in Switzerland 2023"] },
  {
    name: "CSS Winner",
    items: [
      "OneText – Winner Star Award 2025",
      "DoMORE – Winner Star Award 2025",
      "Pragmatike – Winner Star Award 2025",
      "Pretty Patty – Winner Star Award 2025",
      "Shaga Odyssey – Site Of The Day Mar 26, 2025",
      "Shaga – Winner Star Award 2025",
    ],
  },
];

export function Awards() {
  return (
    <section className="bg-white pt-24 pb-24 sm:pt-40 sm:pb-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Awards" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Wins that inspire us forward" />
        </h2>

        <div className="mt-12 border-t border-[#080d10]/8">
          {AWARDS.map((award) => (
            <div key={award.name} className="grid grid-cols-1 gap-4 border-b border-[#080d10]/8 py-8 sm:grid-cols-[280px_1fr] sm:items-start sm:gap-8">
              <h3 className="text-xl font-medium text-[#080d10]">{award.name}</h3>
              <div className="font-body flex flex-col gap-3 text-base text-[#080d10]/70">
                {award.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
