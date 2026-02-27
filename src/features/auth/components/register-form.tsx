"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema, RegisterData } from "@/features/auth/schemas/register.schema";
import { ApiError } from "@/features/auth/types/api.types";
import { useRegisterMutation } from "@/features/auth/hooks/useRegisterMutation";

export function RegisterForm() {
  const t = useTranslations("Auth");
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;
  const router = useRouter();
  const registerMutation = useRegisterMutation();
  const resolveRegisterErrorMessage = (message?: string) => {
    if (!message) return t("messages.registerError");
    if (message.startsWith("messages.")) {
      return t(message as "messages.registerError");
    }
    return t("messages.registerError");
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const { confirmPassword, ...payload } = data;
      void confirmPassword;
      await registerMutation.mutateAsync(payload);
      toast.success(t("messages.registerSuccess"), { autoClose: 3000 });
      router.push(`/${localeValue}/login`);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      const errorMessage = resolveRegisterErrorMessage(axiosError.response?.data?.message);
      toast.error(errorMessage, { autoClose: 3000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="space-y-1">
        <label htmlFor="register-name" className="ml-1 text-sm font-bold uppercase text-[var(--color-muted)]">
          {t("fields.name")}
        </label>
        <Input
          id="register-name"
          {...register("name")}
          autoComplete="name"
          placeholder={t("placeholders.name")}
          className="h-11 border border-[var(--color-border)] bg-[var(--color-input-bg)] text-[var(--color-input-text)] placeholder:text-[var(--color-input-placeholder)]"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "register-name-error" : undefined}
        />
        {errors.name?.message && (
          <p id="register-name-error" className="ml-1 text-[11px] font-medium text-red-500">
            {t(errors.name.message)}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="register-email" className="ml-1 text-sm font-bold uppercase text-[var(--color-muted)]">
          {t("fields.email")}
        </label>
        <Input
          id="register-email"
          {...register("email")}
          autoComplete="email"
          placeholder={t("placeholders.email")}
          className="h-11 border border-[var(--color-border)] bg-[var(--color-input-bg)] text-[var(--color-input-text)] placeholder:text-[var(--color-input-placeholder)]"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "register-email-error" : undefined}
        />
        {errors.email?.message && (
          <p id="register-email-error" className="ml-1 text-[11px] font-medium text-red-500">
            {t(errors.email.message)}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="register-password" className="ml-1 text-sm font-bold uppercase text-[var(--color-muted)]">
          {t("fields.password")}
        </label>
        <Input
          id="register-password"
          {...register("password")}
          type="password"
          autoComplete="new-password"
          placeholder={t("placeholders.password")}
          className="h-11 border border-[var(--color-border)] bg-[var(--color-input-bg)] text-[var(--color-input-text)] placeholder:text-[var(--color-input-placeholder)]"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "register-password-error" : undefined}
        />
        {errors.password?.message && (
          <p id="register-password-error" className="ml-1 text-[11px] font-medium text-red-500">
            {t(errors.password.message)}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="register-confirm-password" className="ml-1 text-sm font-bold uppercase text-[var(--color-muted)]">
          {t("fields.confirmPassword")}
        </label>
        <Input
          id="register-confirm-password"
          {...register("confirmPassword")}
          type="password"
          autoComplete="new-password"
          placeholder={t("placeholders.confirmPassword")}
          className="h-11 border border-[var(--color-border)] bg-[var(--color-input-bg)] text-[var(--color-input-text)] placeholder:text-[var(--color-input-placeholder)]"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? "register-confirm-password-error" : undefined}
        />
        {errors.confirmPassword?.message && (
          <p id="register-confirm-password-error" className="ml-1 text-[11px] font-medium text-red-500">
            {t(errors.confirmPassword.message)}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="mt-2 h-11 w-full border border-transparent bg-[var(--color-accent)] font-bold text-[#111827] hover:brightness-95"
        disabled={isSubmitting || registerMutation.isPending}
      >
        {isSubmitting || registerMutation.isPending ? t("messages.creatingAccount") : t("register")}
      </Button>
    </form>
  );
}
