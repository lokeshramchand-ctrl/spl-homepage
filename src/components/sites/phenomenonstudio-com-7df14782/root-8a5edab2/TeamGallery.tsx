import Image from "next/image";
import { ScrambleText, RevealWords, FadeUp } from "../shared/reveal";
import { Button } from "../shared/button";

const ASSET = "/sites/phenomenonstudio-com-7df14782/root-8a5edab2";

const PHOTOS = [
  { src: "telegram-cloud-photo-size-2-5253719888026007023-y.jpg.webp", span: 1 },
  { src: null, span: 1 },
  { src: "IMG_0477-e1776164064781.jpg.webp", span: 2 },
  { src: "telegram-cloud-document-2-5300745544623214761.jpg.webp", span: 1 },
  { src: "image.jpg.webp", span: 1 },
  { src: null, span: 1 },
  { src: "telegram-cloud-document-2-5300745544623214765-1.jpg.webp", span: 1 },
  { src: null, span: 1 },
  { src: "IMG_4435-2-e1776164116574.jpg.webp", span: 1 },
  { src: "IMG_0478.jpg.webp", span: 1 },
];

export function TeamGallery() {
  return (
    <section className="bg-white py-24 sm:py-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Meet our Team" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/60" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Meet the team driving your product's success" />
        </h2>
        <p className="font-body mt-6 max-w-[760px] text-lg text-[#080d10]/60">
          Established in 2019, Phenomenon Studio was built with one goal—to become a long-term product design and
          development partner for companies looking to launch, scale, and innovate. Our team of strategists,
          designers, developers, and product experts spans Canada, the U.S., Ukraine, Poland, Estonia, and
          Switzerland, bringing global expertise to every project.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {PHOTOS.map((p, i) =>
            p.src ? (
              <FadeUp key={i} className={p.span === 2 ? "col-span-2" : ""} delayMs={i * 40}>
                <Image
                  src={`${ASSET}/images/${p.src}`}
                  alt="Phenomenon Studio team"
                  width={p.span === 2 ? 800 : 380}
                  height={460}
                  className="h-full w-full rounded-xl object-cover"
                />
              </FadeUp>
            ) : (
              <div key={i} />
            )
          )}
          <FadeUp className="col-span-2 flex flex-col justify-between rounded-xl bg-[#f4f5f4] p-8 sm:col-span-1">
            <div className="text-2xl font-medium text-[#080d10]">70+ team members</div>
            <div className="mt-8">
              <Button href="/about-us" variant="simple-dark">
                Learn more
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
