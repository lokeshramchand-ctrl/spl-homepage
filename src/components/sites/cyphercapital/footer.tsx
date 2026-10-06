import { AskAi } from "./ask-ai";
import { LogoMark } from "./icons";
import { WipeLink } from "./reveal";

const PRIMARY: { label: string; href: string }[] = [
  { label: "Cypher", href: "https://www.cyphercapital.com/" },
  { label: "Philosophy", href: "https://www.cyphercapital.com/philosophy" },
  { label: "Capabilities", href: "https://www.cyphercapital.com/capabilities" },
  { label: "AI Infrastructure", href: "https://www.cyphercapital.com/ai-infrastructure" },
  { label: "Access Formats", href: "https://www.cyphercapital.com/access-formats" },
];

const SECONDARY: { label: string; href: string; external?: boolean }[] = [
  {
    label: "Digital Multi-Strategy Fund",
    href: "https://www.cyphercapital.com/digital-multi-strategy-fund",
  },
  { label: "Leadership", href: "https://www.cyphercapital.com/leadership" },
  { label: "Risk Management", href: "https://www.cyphercapital.com/risk-management" },
  { label: "Insights", href: "https://www.cyphercapital.com/insights" },
  { label: "Global presence", href: "/global-presence", external: false },
  { label: "Contact", href: "/global-presence#contacts", external: false },
];

export function Footer() {
  return (
    <footer className="bg-[#fbfbfb] text-[#181818]">
      <div className="mx-auto flex w-full max-w-[2000px] flex-col gap-16 px-4 py-16 md:px-8 md:py-8">
        <nav aria-label="Footer" className="flex flex-col gap-16 md:flex-row md:items-stretch">
          <ul className="flex flex-1 flex-col gap-4 md:gap-2">
            {PRIMARY.map((item) => (
              <li
                key={item.label}
                className="text-[2rem] leading-[1.2] tracking-[-0.03em]"
              >
                <WipeLink href={item.href} external className="block">
                  {item.label}
                </WipeLink>
              </li>
            ))}
          </ul>

          <div className="flex flex-1 flex-col justify-between gap-16 md:gap-8">
            <ul className="flex flex-col gap-3 text-[1rem] tracking-[-0.03em] md:gap-2">
              {SECONDARY.map((item) => (
                <li key={item.label}>
                  <WipeLink href={item.href} external={item.external !== false} className="block">
                    {item.label}
                  </WipeLink>
                </li>
              ))}
            </ul>

            <AskAi
              label="Ask your AI about Cypher"
              prompt="Tell me about Cypher Capital, based on https://cyphercapital.com"
            />
          </div>
        </nav>

        <div className="flex flex-col gap-16 text-[#1818184d] md:gap-3">
          <p className="max-w-none text-[0.75rem] leading-[1.3] tracking-[-0.03em]">
            Investment management services are provided by Cypher Capital (BVI)
            Limited, registered in the British Virgin Islands. Cypher Capital
            (BVI) Limited and Cypher Investments Limited are not licensed or
            regulated by the Central Bank of the UAE (CBUAE), the Securities and
            Commodities Authority (SCA), or the Virtual Assets Regulatory
            Authority (VARA). Cypher Proprietary Capital FZCO, registered in
            Dubai, is authorised by VARA solely as a Virtual Asset Proprietary
            Trader. Cypher Proprietary Capital FZCO conducts proprietary trading
            using its own capital only and does not provide investment
            management, advisory, or other financial services to third parties.
            This website and its contents are intended for Professional
            Investors, Accredited Investors, and Institutional Investors only.
            Nothing on this website constitutes an offer or solicitation to
            purchase or sell any investment product, nor does it constitute a
            financial promotion within the United Arab Emirates or any other
            jurisdiction where such communication would be unlawful. Past
            performance is not indicative of future results. Investment
            involves significant risks, including potential loss of principal.
          </p>

          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.75rem] tracking-[-0.03em] md:gap-4">
            <li>&copy; {new Date().getFullYear()} Cypher Capital</li>
            <li>Zurich | Dubai</li>
            <li>All Rights Reserved</li>
            <li>
              <WipeLink href="https://www.cyphercapital.com/privacy" external>
                Privacy Policy
              </WipeLink>
            </li>
            <li>
              <WipeLink href="https://www.cyphercapital.com/terms" external>
                Terms of Use
              </WipeLink>
            </li>
          </ul>
        </div>

        <div className="flex items-end justify-between gap-3 pb-10 pt-16 md:gap-8">
          <span className="text-[2rem] leading-none tracking-[-0.016em] md:text-[4rem]">
            Cypher
          </span>
          <LogoMark
            aria-hidden="true"
            className="h-[1.5rem] w-auto shrink-0 text-[#181818] md:h-[2.6rem]"
          />
          <span className="text-[2rem] leading-none tracking-[-0.016em] md:text-[4rem]">
            Capital
          </span>
        </div>
      </div>
    </footer>
  );
}
