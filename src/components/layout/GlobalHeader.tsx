"use client";

import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";

const HIDDEN_HEADER_ROUTES = ["/login", "/register"];

export function GlobalHeader() {
  const pathname = usePathname();
  const shouldHideHeader = HIDDEN_HEADER_ROUTES.some((route) => pathname.endsWith(route));

  if (shouldHideHeader) {
    return null;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pt-4 md:px-8 md:pt-8">
      <AppHeader />
    </main>
  );
}

