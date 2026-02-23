"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === "dark";
  const title = mounted
    ? isDark
      ? "Ativar tema claro"
      : "Ativar tema escuro"
    : "Alternar tema";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed right-4 top-4 z-50 h-10 w-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-0 text-[var(--color-text)] shadow-md hover:bg-[var(--color-highlight)]/20"
      title={title}
      aria-label={title}
    >
      {mounted ? (isDark ? <Sun size={18} /> : <Moon size={18} />) : <Moon size={18} />}
    </Button>
  );
}
