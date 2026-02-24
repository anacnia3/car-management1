"use client";

import { useTranslations } from "next-intl";
import { LoginForm } from "@/features/auth/components/login-form";
import { HeroImageLayout } from "@/components/layout/HeroImageLayout";

export default function LoginPage() {
  const t = useTranslations("Auth");

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
        </div>
    </HeroImageLayout>
  );
}
