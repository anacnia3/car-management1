"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";


const carSchema = z.object({
  brand: z.string().min(2, "Brand is required"),
  model: z.string().min(2, "Model is required"),
  color: z.string().min(2, "Color is required"),
  year: z.number().min(1886).max(new Date().getFullYear() + 1),
});

type CarFormData = z.infer<typeof carSchema>;

interface CarFormProps {
  initialData?: any; // Dados para edição
  onSuccess: () => void; // Fecha o modal após o sucesso
}

export function CarForm({ initialData, onSuccess }: CarFormProps) {
  const t = useTranslations("Cars");
  const queryClient = useQueryClient();
  const isEditing = !!initialData;

  const { register, handleSubmit, formState: { errors } } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: initialData || {
      brand: "",
      model: "",
      color: "",
      year: new Date().getFullYear(),
    },
  });

  // Mutação unificada para Criar ou Editar
  const mutation = useMutation({
    mutationFn: async (data: CarFormData) => {
      if (isEditing) {
        return api.put(`/cars/${initialData.id}`, data); // Requisito 5
      }
      return api.post("/cars", data); // Requisito 4
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success(isEditing ? "Car updated!" : "Car created!");
      onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Operation failed");
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-white/70">{t("brand")}</label>
          <Input {...register("brand")} className="bg-white/5 border-white/10 text-white" />
          {errors.brand && <p className="text-[10px] text-red-500">{errors.brand.message}</p>}
        </div>
        
        <div className="space-y-1">
          <label className="text-xs font-medium text-white/70">{t("model")}</label>
          <Input {...register("model")} className="bg-white/5 border-white/10 text-white" />
          {errors.model && <p className="text-[10px] text-red-500">{errors.model.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-white/70">{t("color")}</label>
          <Input {...register("color")} className="bg-white/5 border-white/10 text-white" />
          {errors.color && <p className="text-[10px] text-red-500">{errors.color.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-white/70">{t("year")}</label>
          <Input 
            {...register("year", { valueAsNumber: true })} 
            type="number" 
            className="bg-white/5 border-white/10 text-white" 
          />
          {errors.year && <p className="text-[10px] text-red-500">{errors.year.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <Button type="button" variant="ghost" onClick={onSuccess} className="text-white hover:bg-white/5">
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending} className="bg-white text-black hover:bg-white/90 font-bold">
          {mutation.isPending ? "Saving..." : isEditing ? "Update Car" : "Save Car"}
        </Button>
      </div>
    </form>
  );
}