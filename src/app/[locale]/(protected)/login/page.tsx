"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { LoginForm } from "@/features/auth/components/login-form";
import { HeroImageLayout } from "@/components/layout/HeroImageLayout";

export default function LoginPage() {
  const t = useTranslations("Auth");
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;

  return (
    <HeroImageLayout>
        <div className="w-full max-w-[450px] rounded-2xl bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:p-6">
          <div className="mb-5 text-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              {t("loginTitle")}
            </h1>
            <p className="mt-1.5 text-sm text-gray-700">
              {t("loginSubtitle")}
            </p>
          </div>

          <LoginForm />

          <div className="mt-5 border-t border-gray-100 pt-4 text-center text-xs text-gray-600">
            {t("noAccount")}{" "}
            <Link
              href={`/${localeValue}/register`}
              className="font-bold text-blue-600 transition-all hover:underline"
            >
              {t("registerNow")}
            </Link>
          </div>
        </div>
    </HeroImageLayout>
  );
}
