import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./components/Navbar/Navbar.js";

import Navigation from "./components/Navbar/Navigation";
import Footer from "./components/Footer";
import NavbarScript from "./components/Navbar/Navbar.js";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPL",
  description: "Consulting and Solutions for the Digital Age",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <NavbarScript />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}