"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const carSchema = z.object({
  model: z.string().min(2, "Required"),
  brand: z.string().min(2, "Required"),
  color: z.string().min(2, "Required"),
  year: z.number().min(1900).max(2027),
});

export default function CreateCarPage() {
  const { locale } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("Cars");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(carSchema),
  });

  const mutation = useMutation({
    mutationFn: (newCar: any) => api.post("/cars", newCar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success("Car created successfully!");
      router.push(`/${locale}/cars`);
    },
    onError: () => toast.error("Error creating car.")
  });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10">
        <h1 className="text-2xl font-bold mb-6">Add New Car</h1>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input {...register("brand")} placeholder="Brand" className="bg-white/10 p-3 rounded-lg border border-white/10 outline-none focus:border-white/40" />
            <input {...register("model")} placeholder="Model" className="bg-white/10 p-3 rounded-lg border border-white/10 outline-none focus:border-white/40" />
            <input {...register("color")} placeholder="Color" className="bg-white/10 p-3 rounded-lg border border-white/10 outline-none focus:border-white/40" />
            <input {...register("year", { valueAsNumber: true })} type="number" placeholder="Year" className="bg-white/10 p-3 rounded-lg border border-white/10 outline-none focus:border-white/40" />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-1 bg-white text-black font-bold p-3 rounded-lg hover:bg-white/90">Save Car</button>
            <button type="button" onClick={() => router.back()} className="flex-1 bg-white/10 text-white p-3 rounded-lg hover:bg-white/20">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}