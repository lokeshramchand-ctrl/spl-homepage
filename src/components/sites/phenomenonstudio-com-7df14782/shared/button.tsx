import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "./icons";

type Variant = "orange" | "dark" | "white" | "white-light" | "simple-dark" | "simple-white";

const variantClasses: Record<Variant, string> = {
  orange: "bg-[#ff7a00] text-white hover:bg-white hover:text-[#080d10]",
  dark: "bg-[#080d10] text-white hover:bg-[#1a1f22]",
  white: "bg-white text-[#080d10] hover:bg-[#e9e9e9]",
  "white-light": "bg-white/10 text-white hover:bg-white",
  "simple-dark": "text-[#080d10] hover:opacity-60",
  "simple-white": "text-white hover:opacity-60",
};

export function Button({
  href,
  children,
  variant = "orange",
  arrow = true,
  className,
  target,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  target?: string;
}) {
  const isSimple = variant.startsWith("simple");
  const base = isSimple
    ? "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide transition-colors"
    : "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-xs font-semibold uppercase tracking-wide transition-colors";

  return (
    <Link href={href} target={target} className={cn(base, variantClasses[variant], className)}>
      <span>{children}</span>
      {arrow && <ArrowRightIcon className="size-3.5" />}
    </Link>
  );
}
