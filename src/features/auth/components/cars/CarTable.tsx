"use client";

import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";

export function CarTable({ cars }: { cars: any }) {
  const t = useTranslations("Cars");
  const queryClient = useQueryClient();
  const router = useRouter();
  const { locale } = useParams();
  
  const carList = Array.isArray(cars) ? cars : cars?.content || [];

  // Mutação para Excluir Carro
  const deleteMutation = useMutation({
    mutationFn: async (carId: number) => {
      await api.delete(`/cars/${carId}`);
    },
    onSuccess: () => {
    
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      
      toast.success("Vehicle deleted successfully!", { autoClose: 5000, theme: "dark" });
    },
    onError: () => {
      toast.error("Error deleting vehicle. Check backend connection.");
    }
  });

  const handleDelete = (id: number) => {
    if (confirm(t("messages.deleteConfirm") || "Are you sure?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (id: number) => {
    // Redireciona para a página de edição que você criará
    router.push(`/${locale}/cars/edit/${id}`);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#525859] bg-[#0E1D26] shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#022859] text-white uppercase text-[11px] tracking-widest">
          <tr>
            <th className="p-4 font-bold">{t("fields.brand")}</th>
            <th className="p-4 font-bold">{t("fields.model")}</th>
            <th className="p-4 font-bold">{t("fields.color")}</th>
            <th className="p-4 font-bold">{t("fields.year")}</th>
            <th className="p-4 font-bold">{t("fields.createdAt")}</th>
            <th className="p-4 font-bold text-right">{t("fields.actions")}</th>
          </tr>
        </thead>
        <tbody className="text-[#818A8C]">
          {carList.map((car: any) => (
            <tr key={car.id} className="border-b border-[#525859] hover:bg-[#022873]/10 transition-colors">
              <td className="p-4 text-white font-medium">{car.brand}</td>
              <td className="p-4">{car.model}</td>
              <td className="p-4">{car.color}</td>
              <td className="p-4">{car.year}</td>
              <td className="p-4 text-xs italic">
                {car.createdAt ? format(new Date(car.createdAt), "dd/MM/yyyy") : "N/A"}
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => handleEdit(car.id)}
                    className="hover:text-blue-400 transition-all cursor-pointer"
                  >
                    <Pencil size={18}/>
                  </button>
                  <button 
                    onClick={() => handleDelete(car.id)}
                    className="hover:text-red-500 transition-all cursor-pointer"
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 size={18}/>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}