import Image from "next/image";
import { RevealWords, ScrambleText, FadeUp } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-isora-governance-risk-and-compliance-assessment-platform-f30cfee1/images";

const SERVICES = ["#UX Audit", "#Product redesign", "#Web development", "#Team extension"];

const TECH = [
  { icon: "tech-vite.svg", label: "Vite" },
  { icon: "tech-react.svg", label: "React" },
  { icon: "tech-typescript.svg", label: "Typescript" },
  { icon: "tech-react-router.svg", label: "React Router Dom" },
  { icon: "tech-radix.svg", label: "Radix Primitives" },
  { icon: "tech-tailwind.svg", label: "TailwindCSS" },
  { icon: null, label: "Recharts" },
  { icon: "tech-storybook.svg", label: "Storybook" },
];

function Chip({ icon, label }: { icon?: string | null; label: string }) {
  return (
    <span className="font-body inline-flex items-center gap-1.5 rounded-full bg-[#080d10]/[0.04] px-3 py-1.5 text-xs font-semibold text-[#080d10]">
      {icon && <Image src={`${ASSET}/${icon}`} alt="" width={14} height={14} className="size-3.5 object-contain" />}
      {label}
    </span>
  );
}

export function Overview() {
  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Overview" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Overcoming all GRC challenges in one place" />
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2">
          <div className="hidden sm:block" />
          <FadeUp className="flex flex-col gap-12">
            <p className="text-lg text-[#080d10]/80 sm:text-xl">
              Isora is a GRC platform built for the whole organization, not just the security team. It handles data
              collection, risk identification, and regulatory compliance tracking — the parts of risk management
              that eat up time without requiring much judgment. More than 20% of R1 research universities in the
              U.S. rely on it.
            </p>

            <div className="flex flex-col gap-3">
              <div className="text-sm font-medium text-[#080d10]">Client</div>
              <div className="flex flex-wrap gap-2">
                <Chip label="SaltyCloud" />
                <Chip icon="client-flag.svg" label="Texas, USA" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-sm font-medium text-[#080d10]">Services</div>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <Chip key={s} label={s} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-sm font-medium text-[#080d10]">Technologies</div>
              <div className="flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <Chip key={t.label} icon={t.icon} label={t.label} />
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
