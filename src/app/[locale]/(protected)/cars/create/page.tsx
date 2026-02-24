"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import * as z from "zod";
import { api } from "@/lib/api";

const carSchema = z.object({
  model: z.string().min(2, "validation.required"),
  brand: z.string().min(2, "validation.required"),
  color: z.string().min(2, "validation.required"),
  year: z.number().min(1886).max(new Date().getFullYear() + 1),
});

type CreateCarFormData = z.infer<typeof carSchema>;

export default function CreateCarPage() {
  const t = useTranslations("Cars");
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<CreateCarFormData>({
    resolver: zodResolver(carSchema),
  });

  const mutation = useMutation({
    mutationFn: (newCar: CreateCarFormData) => api.post("/cars", newCar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success(t("messages.createSuccess"));
      router.push(`/${localeValue}/cars`);
    },
    onError: () => toast.error(t("messages.createError")),
  });

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-6 text-2xl font-bold">{t("createTitle")}</h1>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
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
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-white p-3 font-bold text-black hover:bg-white/90"
            >
              {t("actions.save")}
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
