"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, LoginFormData } from "../schemas/login.schema";

export function LoginForm() {
  const t = useTranslations("Auth");
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1 text-left">
          <label className="ml-1 text-sm font-bold uppercase tracking-wider text-gray-700">
            {t("fields.email")}
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="email@example.com"
            className="h-11 border border-gray-300 bg-white text-black placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-gray-300"
          />
          {errors.email?.message && (
            <p className="ml-1 text-[11px] font-bold text-red-500">
              {t(errors.email.message)}
            </p>
          )}
        </div>

        <div className="space-y-1 text-left">
          <label className="ml-1 text-sm font-bold uppercase tracking-wider text-gray-700">
            {t("fields.password")}
          </label>
          <Input
            {...register("password")}
            type="password"
            placeholder="********"
            className="h-11 border border-gray-300 bg-white text-black placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-gray-300"
          />
          {errors.password?.message && (
            <p className="ml-1 text-[11px] font-bold text-red-500">
              {t(errors.password.message)}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="mt-2 h-11 w-full rounded-lg border border-transparent bg-[var(--color-accent)] font-bold text-[#111827] transition-all hover:brightness-95"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {t("messages.loading")}
            </span>
          ) : (
            t("submit")
          )}
        </Button>
      </form>

      <div className="border-t border-gray-200 pt-4 text-center">
        <p className="text-sm text-gray-600">
          {t("noAccount")}{" "}
          <Link
            href={`/${localeValue}/register`}
            className="font-bold text-black transition-colors hover:underline"
          >
            {t("registerNow")}
          </Link>
        </p>
      </div>
    </div>
  );
}
