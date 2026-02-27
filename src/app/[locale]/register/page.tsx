"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { HeroImageLayout } from "@/components/layout/HeroImageLayout";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  const t = useTranslations("Auth");
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;

  return (
    <HeroImageLayout
      titleWrapperClassName="top-10 gap-2 md:top-12 [&>svg]:size-10 md:[&>svg]:size-12"
      titleClassName="text-lg md:text-2xl"
      contentClassName="items-center justify-center pt-8 md:pt-10"
    >
      <div className="w-full max-w-[320px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:p-4">
        <div className="mb-3 text-center">
          <h1 className="text-base font-bold tracking-tight text-[var(--color-text)] md:text-lg">{t("register")}</h1>
          <p className="mt-0.5 text-[11px] text-[var(--color-muted)] md:text-xs">{t("registerSubtitle")}</p>
        </div>

        <RegisterForm />

        <div className="mt-3 border-t border-[var(--color-border)] pt-2.5 text-center text-[11px] text-[var(--color-muted)] md:text-xs">
          {t("hasAccount")}{" "}
          <Link
            href={`/${localeValue}/login`}
            className="font-bold text-[var(--color-highlight)] transition-all hover:underline"
          >
            {t("loginNow")}
          </Link>
        </div>
      </div>
    </HeroImageLayout>
  );
}
