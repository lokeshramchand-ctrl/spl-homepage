"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="toggle-btn"
    >
      {/* Icon only - colors inherited from parent text */}
      {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}

      <style jsx>{`
        .toggle-btn {
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          color: var(--text-secondary); /* Starts slightly muted */
          transition: color 0.3s ease, transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toggle-btn:hover {
          color: var(--text-primary); /* Becomes fully active on hover */
          transform: scale(1.1);      /* Subtle zoom */
        }
      `}</style>
    </button>
  );
}