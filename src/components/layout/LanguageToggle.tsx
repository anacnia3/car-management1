"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/routing";

type SupportedLocale = "pt" | "en";

const locales: Array<{ code: SupportedLocale; label: string }> = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
];

export function LanguageToggle() {
  const locale = useLocale() as SupportedLocale;
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (nextLocale: SupportedLocale) => {
    if (nextLocale === locale) {
      return;
    }

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="fixed right-14 top-4 z-50 flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 shadow-md">
      {locales.map(({ code, label }) => {
        const isActive = code === locale;

        return (
          <Button
            key={code}
            type="button"
            onClick={() => changeLocale(code)}
            aria-pressed={isActive}
            className={cn(
              "h-7 min-w-9 rounded-full px-2.5 text-[11px] font-bold",
              isActive
                ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]"
                : "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-highlight)]/20"
            )}
            title={code === "pt" ? "Trocar para portugues" : "Switch to English"}
            aria-label={code === "pt" ? "Trocar para portugues" : "Switch to English"}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
