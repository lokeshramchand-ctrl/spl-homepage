import Image from "next/image";
import { FadeUp } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/images";

export function IntroGallery() {
  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FadeUp className="overflow-hidden rounded-2xl bg-[#080d10]">
            <Image
              src={`${ASSET}/gallery-1.png.webp`}
              alt="Isora GRC screenshot"
              width={1364}
              height={1024}
              className="w-full object-cover"
            />
          </FadeUp>
          <FadeUp delayMs={100} className="overflow-hidden rounded-2xl bg-[#080d10]">
            <Image
              src={`${ASSET}/gallery-2.png.webp`}
              alt="Isora GRC screenshot"
              width={1364}
              height={1024}
              className="w-full object-cover"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
