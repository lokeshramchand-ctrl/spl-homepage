import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPL Systems | Engineering the Intelligent Future",
  description:
    "SPL Systems builds high-performance digital infrastructure for ambitious enterprises: custom software, AI-powered platforms and automation for finance, real estate, government and education.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Flags the root path before hydration so the header logo and
            in-view reveals stay hidden under the intro splash instead of
            flashing in first (matches source's own entry-detection script). */}
        <Script
          id="cc-entry-gate"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(location.pathname.replace(/\\/+$/,'')!=='')return;document.documentElement.setAttribute('data-entry','');}catch(e){}})()",
          }}
        />
        {children}
      </body>
    </html>
  );
}
