"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import * as z from "zod";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const registerSchema = z.object({
  name: z.string().min(3, "validation.nameMin"),
  email: z.string().email("validation.emailInvalid"),
  password: z.string().min(6, "validation.passwordMin"),
});

type RegisterData = z.infer<typeof registerSchema>;
type ApiError = { message?: string };

export function RegisterForm() {
  const t = useTranslations("Auth");
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;
  const router = useRouter();
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
      await api.post("/auth/register", data);
      toast.success(t("messages.registerSuccess"), { autoClose: 3000 });
      router.push(`/${localeValue}/login`);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      const errorMessage = resolveRegisterErrorMessage(axiosError.response?.data?.message);
      toast.error(errorMessage, { autoClose: 3000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <label className="ml-1 text-sm font-bold uppercase text-gray-700">
          {t("fields.name")}
        </label>
        <Input
          {...register("name")}
          placeholder={t("placeholders.name")}
          className="h-11 border border-gray-300 bg-white text-black"
        />
        {errors.name?.message && (
          <p className="ml-1 text-[11px] font-medium text-red-500">{t(errors.name.message)}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="ml-1 text-sm font-bold uppercase text-gray-700">
          {t("fields.email")}
        </label>
        <Input
          {...register("email")}
          placeholder={t("placeholders.email")}
          className="h-11 border border-gray-300 bg-white text-black"
        />
        {errors.email?.message && (
          <p className="ml-1 text-[11px] font-medium text-red-500">{t(errors.email.message)}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="ml-1 text-sm font-bold uppercase text-gray-700">
          {t("fields.password")}
        </label>
        <Input
          {...register("password")}
          type="password"
          placeholder={t("placeholders.password")}
          className="h-11 border border-gray-300 bg-white text-black"
        />
        {errors.password?.message && (
          <p className="ml-1 text-[11px] font-medium text-red-500">{t(errors.password.message)}</p>
        )}
      </div>

      <Button
        type="submit"
        className="mt-2 h-11 w-full border border-transparent bg-[var(--color-accent)] font-bold text-[#111827] hover:brightness-95"
        disabled={isSubmitting}
      >
        {isSubmitting ? t("messages.creatingAccount") : t("register")}
      </Button>
    </form>
  );
}
