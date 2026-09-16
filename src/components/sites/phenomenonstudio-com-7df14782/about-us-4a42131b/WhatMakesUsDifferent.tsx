import { ScrambleText, RevealWords, FadeUp } from "../shared/reveal";

function PartnersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M26 40V36C26 30.4772 21.5228 26 16 26C10.4772 26 6 30.4772 6 36V40H26ZM26 40H42V38C42 32.109 37.5228 28 32 28C29.1734 28 26.6206 29.251 24.8018 31.2622M22 14C22 17.3137 19.3137 20 16 20C12.6863 20 10 17.3137 10 14C10 10.6863 12.6863 8 16 8C19.3137 8 22 10.6863 22 14ZM36 18C36 20.2092 34.2092 22 32 22C29.7908 22 28 20.2092 28 18C28 15.7909 29.7908 14 32 14C34.2092 14 36 15.7909 36 18Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DesignIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M31 17H31.02M21 15H21.02M15 23H15.02M24 42C14.0589 42 6 33.9412 6 24C6 14.0589 14.0589 6 24 6C33.9412 6 42 14.0589 42 24C42 27.3138 39.3138 30 36 30H34.8C34.0568 30 33.6852 30 33.3742 30.0492C31.6626 30.3204 30.3204 31.6626 30.0492 33.3742C30 33.6852 30 34.0568 30 34.8V36C30 39.3138 27.3138 42 24 42ZM32 17C32 17.5523 31.5522 18 31 18C30.4478 18 30 17.5523 30 17C30 16.4477 30.4478 16 31 16C31.5522 16 32 16.4477 32 17ZM22 15C22 15.5523 21.5522 16 21 16C20.4478 16 20 15.5523 20 15C20 14.4477 20.4478 14 21 14C21.5522 14 22 14.4477 22 15ZM16 23C16 23.5522 15.5523 24 15 24C14.4477 24 14 23.5522 14 23C14 22.4478 14.4477 22 15 22C15.5523 22 16 22.4478 16 23Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DevIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M14 16L6 23.3846L14 32M34 16L42 23.3846L34 32M28 8L20 40" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ProcessIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M5.99805 6V32.4C5.99805 35.7604 5.99805 37.4404 6.65201 38.724C7.22725 39.853 8.14515 40.7708 9.27411 41.346C10.5576 42 12.2377 42 15.598 42H41.998M39.9996 30H31.9996M25.9996 14H13.9996M35.9996 22H17.9996" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ProductIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M42 24C42 33.9412 33.9412 42 24 42C14.0589 42 6 33.9412 6 24C6 14.0589 14.0589 6 24 6M34 24C34 29.5228 29.5228 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14M29.5158 18.7032L37.4338 19.5348L41.7258 13.5258L36.5752 11.809L34.8584 6.65842L28.8494 10.9506L29.5158 18.7032ZM29.5158 18.7032L24 23.9998" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PeopleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M24 11.9999C20.4012 7.80585 14.3875 6.50971 9.87846 10.3502C5.36936 14.1907 4.73454 20.6117 8.27556 25.1539C11.2197 28.9303 20.1296 36.8953 23.0498 39.4733C23.3764 39.7617 23.5398 39.9059 23.7304 39.9625C23.8966 40.0119 24.0786 40.0119 24.245 39.9625C24.4356 39.9059 24.5988 39.7617 24.9256 39.4733C27.8458 36.8953 36.7556 28.9303 39.6998 25.1539C43.2408 20.6117 42.6834 14.1503 38.0968 10.3502C33.5102 6.55011 27.5988 7.80585 24 11.9999Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CARDS = [
  { Icon: PartnersIcon, title: "Partners, not vendors", body: "We don't disappear after a kickoff call or pass work down a chain. You'll work directly with the team building your product: in Slack, in Figma, and in your workflow." },
  { Icon: DesignIcon, title: "Design that holds up over time", body: "We build thoughtful, system-based interfaces, not flashy one-offs. Our work adapts to your product, keeps logic intact, and holds up to change." },
  { Icon: DevIcon, title: "Developer-ready by default", body: "Every component is reusable, accessible, and engineered for handoff. Tokens, states, constraints—we speak dev and design like we code. That's how we ship fast." },
  { Icon: ProcessIcon, title: "Process you can follow", body: "You see what we see. From day one, we make progress visible in Notion, Jira, Figma, or your stack. Scope, estimates, and feedback loops stay open and honest." },
  { Icon: ProductIcon, title: "Product-led design thinking", body: "We work at the intersection of design and business. From product-market fit to scale-readiness, our designers think like product managers, aligning UX with growth metrics, not just user flow." },
  { Icon: PeopleIcon, title: "People who care about the work", body: "Our edge isn't tools or templates—it's the people. Curious, invested, and obsessive about doing the right thing right. You'll feel it in the work and in every interaction." },
];

export function WhatMakesUsDifferent() {
  return (
    <section className="rounded-[40px] bg-[#080d10] pt-24 pb-24 text-white sm:rounded-[64px] sm:pt-40 sm:pb-40">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="What makes us different" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-white/50" />
        <h2 className="mt-4 max-w-[1040px] text-3xl font-medium tracking-tight sm:text-5xl">
          <RevealWords text="We've built hundreds of products by focusing on the right things. Here's what our clients value most" />
        </h2>

        <div className="mt-16 grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {CARDS.map((c) => (
            <FadeUp key={c.title} className="flex flex-col p-8">
              <c.Icon className="size-10 text-white" />
              <h3 className="mt-6 text-xl font-medium">{c.title}</h3>
              <p className="font-body mt-3 text-sm text-white/60">{c.body}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
