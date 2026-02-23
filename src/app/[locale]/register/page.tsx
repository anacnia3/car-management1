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
    <HeroImageLayout>
      <div className="w-full max-w-[450px] rounded-2xl bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{t("register")}</h1>
          <p className="mt-2 text-sm text-gray-500">{t("registerSubtitle")}</p>
        </div>

        <RegisterForm />

        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm text-gray-600">
          {t("hasAccount")}{" "}
          <Link
            href={`/${localeValue}/login`}
            className="font-bold text-blue-600 transition-all hover:underline"
          >
            {t("loginNow")}
          </Link>
        </div>
      </div>
    </HeroImageLayout>
  );
}
