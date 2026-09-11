import Image from "next/image";
import { ScrambleText, RevealWords, FadeUp } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

const CLIENTS = [
  { logo: "logo1.svg", name: "Airportr", desc: "Recognized as one of the top 5 most innovative UK transport tech firms by TransportTech 2023.", stat: "", tag: "Logistics", flag: "UK.svg", country: "UK" },
  { logo: "nomupay.svg", name: "Nomupay", desc: "Nomupay raises €35.9 million to expand unified payments access in Asia market.", stat: "€35.9M", tag: "Fintech", flag: "Ireland.svg", country: "Ireland" },
  { logo: "logo3.svg", name: "One Text", desc: "Y Combinator-backed SaaS startup enabling frictionless payments via SMS.", stat: "", tag: "Saas", flag: "USA.svg", country: "USA" },
  { logo: "logo4.svg", name: "Shaga", desc: "An emerging leader in cloud gaming, successfully raised $1M in a Pre-Seed funding round.", stat: "$1M", tag: "Web3", flag: "USA.svg", country: "USA" },
  { logo: "DoStuffMedia-1.svg", name: "DoStuffMedia", desc: "A prominent entertainment platform with 2.5 million monthly website visits and 23 million monthly social impressions.", stat: "", tag: "Entertainment", flag: "USA.svg", country: "USA" },
  { logo: "logo6.svg", name: "Isora", desc: "A collaborative GRC risk assessment platform trusted by Berkeley, Yale, and other leading institutions. TechStars graduate.", stat: "", tag: "Saas", flag: "USA.svg", country: "USA" },
  { logo: "Wisdom.svg", name: "Wisdom", desc: "After redesign, Wisdom raised $1.3M and partnered with Samsung Health & Galaxy Watch for AI gait and fall-prevention insights.", stat: "$1.3M", tag: "HealthTech", flag: "USA.svg", country: "USA" },
  { logo: "logo8.svg", name: "Qurtuba Online", desc: "Recognized as South Africa's top-performing EdTech institution in 2023.", stat: "", tag: "EdTech", flag: "South-Africa.svg", country: "South Africa" },
];

export function FeaturedWins() {
  return (
    <section className="pt-24 pb-8 sm:pt-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="Award-Winning Product Design and Development Agency"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/60"
        />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Our featured client wins" />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#080d10]/8 bg-[#080d10]/8 sm:grid-cols-2 lg:grid-cols-4">
          {CLIENTS.map((c) => (
            <FadeUp key={c.name} className="flex items-center justify-center bg-white p-6">
              <div className="relative flex w-full flex-col overflow-hidden rounded-lg bg-[#080d10] p-8">
                <Image src={`${ASSET}/icons/${c.logo}`} alt={c.name} width={100} height={28} className="h-6 w-auto object-contain object-left invert" />
                <div className="mt-6 text-base font-medium text-white">{c.name}</div>
                <p className="font-body mt-1.5 text-sm text-white/60">{c.desc}</p>
                {c.stat && <div className="mt-6 text-2xl font-medium text-white">{c.stat}</div>}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="font-body rounded-full bg-white/10 px-3 py-1 text-xs text-white">{c.tag}</span>
                  <span className="font-body flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    <Image src={`${ASSET}/icons/${c.flag}`} alt={c.country} width={14} height={14} />
                    {c.country}
                  </span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
