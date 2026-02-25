"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const carSchema = z.object({
  brand: z.string().min(2, "validation.brandRequired"),
  model: z.string().min(2, "validation.modelRequired"),
  color: z.string().min(2, "validation.colorRequired"),
  year: z.number().min(1886).max(new Date().getFullYear() + 1),
});

type CarFormData = z.infer<typeof carSchema>;
type ApiError = { message?: string };

type CarInitialData = CarFormData & { id: number };

interface CarFormProps {
  initialData?: CarInitialData;
  onSuccess: () => void;
}

export function CarForm({ initialData, onSuccess }: CarFormProps) {
  const t = useTranslations("Cars");
  const queryClient = useQueryClient();
  const isEditing = !!initialData;
  const resolveCarErrorMessage = (message?: string) => {
    if (!message) return t("messages.operationFailed");
    if (message.startsWith("messages.")) {
      return t(message as "messages.operationFailed");
    }
    return t("messages.operationFailed");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: initialData || {
      brand: "",
      model: "",
      color: "",
      year: new Date().getFullYear(),
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CarFormData) => {
      if (isEditing && initialData) {
        return api.put(`/cars/${initialData.id}`, data);
      }
      return api.post("/cars", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success(isEditing ? t("messages.updateSuccess") : t("messages.createSuccess"));
      onSuccess();
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(resolveCarErrorMessage(axiosError.response?.data?.message));
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="space-y-4 pt-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-muted)] dark:text-white">{t("fields.brand")}</label>
          <Input
            {...register("brand")}
            className="border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] dark:text-white"
          />
          {errors.brand?.message && <p className="text-[10px] text-red-500">{t(errors.brand.message)}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-muted)] dark:text-white">{t("fields.model")}</label>
          <Input
            {...register("model")}
            className="border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] dark:text-white"
          />
          {errors.model?.message && <p className="text-[10px] text-red-500">{t(errors.model.message)}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-muted)] dark:text-white">{t("fields.color")}</label>
          <Input
            {...register("color")}
            className="border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] dark:text-white"
          />
          {errors.color?.message && <p className="text-[10px] text-red-500">{t(errors.color.message)}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[var(--color-muted)] dark:text-white">{t("fields.year")}</label>
          <Input
            {...register("year", { valueAsNumber: true })}
            type="number"
            className="border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] dark:text-white"
          />
          {errors.year?.message && <p className="text-[10px] text-red-500">{errors.year.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-[var(--color-border)] pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onSuccess}
          className="text-[var(--color-text)] hover:bg-[var(--color-highlight)]/10"
        >
          {t("actions.cancel")}
        </Button>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="bg-[var(--color-accent)] font-bold text-[#111827] hover:brightness-95"
        >
          {mutation.isPending ? t("messages.saving") : isEditing ? t("actions.update") : t("actions.save")}
        </Button>
      </div>
    </form>
  );
}
