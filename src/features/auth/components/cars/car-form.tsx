"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { carFormSchema, CarFormData, CarFormInput } from "@/features/auth/schemas/car.schema";
import { ApiError } from "@/features/auth/types/api.types";
import { CarInitialData } from "@/features/auth/types/cars.types";
import { useCreateCarMutation, useUpdateCarMutation } from "@/features/auth/hooks/useCarMutations";

interface CarFormProps {
  initialData?: CarInitialData;
  onSuccess: () => void;
}

export function CarForm({ initialData, onSuccess }: CarFormProps) {
  const t = useTranslations("Cars");
  const createCarMutation = useCreateCarMutation();
  const updateCarMutation = useUpdateCarMutation();
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
  } = useForm<CarFormInput, unknown, CarFormData>({
    resolver: zodResolver(carFormSchema),
    defaultValues: initialData || {
      brand: "",
      model: "",
      color: "",
      year: new Date().getFullYear(),
    },
  });

  const onSubmit = async (data: CarFormData) => {
    try {
      if (isEditing && initialData) {
        await updateCarMutation.mutateAsync({ id: initialData.id, payload: data });
      } else {
        await createCarMutation.mutateAsync(data);
      }
      toast.success(isEditing ? t("messages.updateSuccess") : t("messages.createSuccess"));
      onSuccess();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(resolveCarErrorMessage(axiosError.response?.data?.message));
    }
  };

  const isPending = createCarMutation.isPending || updateCarMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          {errors.year?.message && <p className="text-[10px] text-red-500">{t(errors.year.message)}</p>}
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
          disabled={isPending}
          className="bg-[var(--color-accent)] font-bold text-[#111827] hover:brightness-95"
        >
          {isPending ? t("messages.saving") : isEditing ? t("actions.update") : t("actions.save")}
        </Button>
      </div>
    </form>
  );
}
