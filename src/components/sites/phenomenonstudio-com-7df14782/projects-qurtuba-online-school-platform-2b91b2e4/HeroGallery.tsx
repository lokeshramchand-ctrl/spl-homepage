import Image from "next/image";
import { FadeUp } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/images";

export function HeroGallery() {
  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FadeUp className="overflow-hidden rounded-2xl bg-[#080d10]">
            <Image
              src={`${ASSET}/gallery-1.png.webp`}
              alt="Qurtuba dashboard screenshot"
              width={1400}
              height={1000}
              className="w-full object-cover"
            />
          </FadeUp>
          <FadeUp delayMs={100} className="overflow-hidden rounded-2xl bg-[#080d10]">
            <Image
              src={`${ASSET}/gallery-2.png.webp`}
              alt="Qurtuba assessment screenshot"
              width={1400}
              height={1000}
              className="w-full object-cover"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
