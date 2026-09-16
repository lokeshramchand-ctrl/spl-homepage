import Image from "next/image";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";
import { LogoMark } from "../shared/icons";

const ASSET = "/sites/phenomenonstudio-com-7df14782/contact-us-ae5848da";

const REGIONS = [
  {
    title: "North America & Switzerland",
    items: ["Client-facing", "Strategy & discovery", "Product leads"],
  },
  {
    title: "Europe",
    items: ["UX/UI design", "Development", "Branding & motion design", "Marketing & growth"],
  },
];

export function WorldwideMap() {
  return (
    <section className="bg-white pt-24 pb-24 sm:pt-40 sm:pb-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText
          text="Worldwide, where you need us"
          as="p"
          className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50"
        />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Collaborating across borders to deliver seamless solutions — wherever you are" />
        </h2>

        <p className="mt-8 max-w-xl text-lg text-[#080d10]/60">
          You&apos;ll collaborate with project leads based near your region in the USA and Switzerland, while your
          design &amp; development team works across senior hubs in Europe. This setup gives you the proximity and
          trust of a local partner with the efficiency and speed of a global team.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#080d10]/8 pt-10 lg:grid-cols-[360px_1fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            {REGIONS.map((region) => (
              <div key={region.title}>
                <h3 className="text-2xl font-medium text-[#080d10]">{region.title}</h3>
                <ul className="font-body mt-4 flex flex-col gap-3 text-base text-[#080d10]/70">
                  {region.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <LogoMark className="size-3 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <FadeUp className="overflow-hidden rounded-xl">
            <Image
              src={`${ASSET}/images/map-locations.svg`}
              alt="Phenomenon offices worldwide — Estonia Tallinn, Poland Kraków, Ukraine Kyiv, Switzerland Lugano, USA Dover"
              width={955}
              height={504}
              className="h-auto w-full"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
