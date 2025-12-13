import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navbar/Navigation";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/themeprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPL Systems",
  description: "Engineering the Intelligent Future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* suppressHydrationWarning is required for next-themes */
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* attribute="data-theme" tells next-themes to toggle the 
            data-theme='light' or 'dark' attribute on the <html> tag,
            which matches our globals.css setup.
        */}
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}