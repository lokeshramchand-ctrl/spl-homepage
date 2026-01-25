import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Footer from "./components/common/Footer";
import { ThemeProvider } from "./components/common/Themes/themeprovider";
import Navigation from "./components/common/Navbar/Navigation";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPL Systems",
  description: "Engineering the Intelligent Future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>

        {/* Analytics */}
        <Script
          src="https://analytics.priyatham.in/state-min.js"
          strategy="afterInteractive"
          data-website-id="cmkdp4wam0wuirxiqhm16lfsn"
        />
      </body>
    </html>
  );
}
