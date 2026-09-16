import Image from "next/image";

const ASSET = "/sites/phenomenonstudio-com-7df14782/about-us-4a42131b/images";

const LOGOS = [
  "client-logo-1.svg",
  "client-logo-2.svg",
  "client-logo-3.svg",
  "client-logo-4.svg",
  "client-logo-5.svg",
  "client-logo-6.svg",
  "client-logo-8.svg",
  "client-logo-wisdom.svg",
  "client-logo-hormn.svg",
  "client-logo-pragmatike.svg",
  "client-logo-prettypatty.svg",
  "client-logo-zebeyond.svg",
];

export function ClientLogos() {
  return (
    <section className="bg-white pb-16 sm:pb-24">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="grid grid-cols-2 divide-x divide-y divide-[#080d10]/8 border border-[#080d10]/8 sm:grid-cols-4">
          {LOGOS.map((logo) => (
            <div key={logo} className="flex items-center justify-center p-8 sm:p-10">
              <Image src={`${ASSET}/${logo}`} alt="" width={120} height={40} className="h-6 w-auto object-contain opacity-70 sm:h-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
