"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { createCarSchema, CreateCarFormData, CreateCarFormInput } from "@/features/auth/schemas/car.schema";
import { ApiError } from "@/features/auth/types/api.types";
import { useCreateCarMutation } from "@/features/auth/hooks/useCarMutations";

export default function CreateCarPage() {
  const t = useTranslations("Cars");
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;
  const router = useRouter();
  const createCarMutation = useCreateCarMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCarFormInput, unknown, CreateCarFormData>({
    resolver: zodResolver(createCarSchema),
  });

  const onSubmit = async (data: CreateCarFormData) => {
    try {
      await createCarMutation.mutateAsync(data);
      toast.success(t("messages.createSuccess"));
      router.push(`/${localeValue}/cars`);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      const message = axiosError.response?.data?.message;
      if (message?.startsWith("messages.")) {
        toast.error(t(message as "messages.createError"));
      } else {
        toast.error(t("messages.createError"));
      }
    }
  };

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-6 text-2xl font-bold">{t("createTitle")}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("brand")}
              placeholder={t("fields.brand")}
              className="rounded-lg border border-white/10 bg-white/10 p-3 outline-none focus:border-white/40"
            />
            <input
              {...register("model")}
              placeholder={t("fields.model")}
              className="rounded-lg border border-white/10 bg-white/10 p-3 outline-none focus:border-white/40"
            />
            <input
              {...register("color")}
              placeholder={t("fields.color")}
              className="rounded-lg border border-white/10 bg-white/10 p-3 outline-none focus:border-white/40"
            />
            <input
              {...register("year", { valueAsNumber: true })}
              type="number"
              placeholder={t("fields.year")}
              className="rounded-lg border border-white/10 bg-white/10 p-3 outline-none focus:border-white/40"
            />
            {errors.year?.message && (
              <p className="text-xs text-red-400">{t(errors.year.message)}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={createCarMutation.isPending}
              className="flex-1 rounded-lg bg-white p-3 font-bold text-black hover:bg-white/90"
            >
              {createCarMutation.isPending ? t("messages.saving") : t("actions.save")}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/${localeValue}/cars`)}
              className="flex-1 rounded-lg bg-white/10 p-3 text-white hover:bg-white/20"
            >
              {t("actions.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
