"use client";

import { useTranslations } from "next-intl";
import { LoginForm } from "@/features/auth/components/login-form";
import { HeroImageLayout } from "@/components/layout/HeroImageLayout";

export default function LoginPage() {
  const t = useTranslations("Auth");

  return (
    <HeroImageLayout
      titleWrapperClassName="top-12 gap-2 md:top-14 [&>svg]:size-14 md:[&>svg]:size-16"
      titleClassName="text-xl md:text-3xl"
      contentClassName="items-center justify-center pt-8 md:pt-10"
    >
      <div className="w-full max-w-[390px] rounded-xl bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:p-4">
        <div className="mb-3 text-center">
          <h1 className="text-base font-bold tracking-tight text-gray-900 md:text-lg">
            {t("loginTitle")}
          </h1>
          <p className="mt-0.5 text-[11px] text-gray-700 md:text-xs">
            {t("loginSubtitle")}
          </p>
        </div>

        <LoginForm />
      </div>
    </HeroImageLayout>
  );
}
