"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CarForm } from "./car-form";

type Car = {
  id: number;
  brand: string;
  model: string;
  color: string;
  year: number;
  createdAt?: string;
};

type CarsData = Car[] | { content?: Car[] } | undefined;

type CarTableProps = {
  cars: CarsData;
  search: string;
  onSearchChange: (value: string) => void;
};

export function CarTable({ cars, search, onSearchChange }: CarTableProps) {
  const t = useTranslations("Cars");
  const queryClient = useQueryClient();
  const router = useRouter();
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;
  const [carToDelete, setCarToDelete] = useState<number | null>(null);
  const [carToEdit, setCarToEdit] = useState<Car | null>(null);

  const carList = useMemo(() => {
    return Array.isArray(cars) ? cars : cars?.content || [];
  }, [cars]);
  const filteredCars = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return carList;
    }

    return carList.filter((car) => {
      const composed = `${car.brand} ${car.model} ${car.color} ${car.year}`.toLowerCase();
      return composed.includes(query);
    });
  }, [carList, search]);

  const deleteMutation = useMutation({
    mutationFn: async (carId: number) => {
      await api.delete(`/cars/${carId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      toast.success(t("messages.deleted"), {
        autoClose: 3000,
        theme: "dark",
      });
      setCarToDelete(null);
    },
    onError: () => {
      toast.error(t("messages.error"));
    },
  });

  const handleDelete = () => {
    if (!carToDelete) return;
    deleteMutation.mutate(carToDelete);
  };

  const handleEdit = (id: number) => {
    const selectedCar = carList.find((car) => car.id === id) || null;
    setCarToEdit(selectedCar);
  };

  const handleDetails = (id: number) => {
    router.push(`/${localeValue}/cars/details/${id}`);
  };

  return (
    <div className="mx-auto w-[88%] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl dark:text-white sm:w-[84%] md:w-[76%] lg:w-[66%]">
      <div className="border-b border-[var(--color-border)] p-3">
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t("searchPlaceholder")}
          className="h-9 border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus-visible:ring-[var(--color-highlight)]"
        />
      </div>

      <table className="w-full border-collapse text-left">
        <thead className="bg-[#FDE047] text-[10px] uppercase tracking-widest text-[#111827] md:text-[11px]">
          <tr>
            <th className="p-3 font-bold md:p-4">{t("fields.brand")}</th>
            <th className="p-3 font-bold md:p-4">{t("fields.model")}</th>
            <th className="p-3 font-bold md:p-4">{t("fields.color")}</th>
            <th className="p-3 font-bold md:p-4">{t("fields.year")}</th>
            <th className="p-3 font-bold md:p-4">{t("fields.createdAt")}</th>
            <th className="p-3 text-right font-bold md:p-4">{t("fields.actions")}</th>
          </tr>
        </thead>
        <tbody className="text-sm text-[var(--color-muted)] dark:text-white">
          {filteredCars.map((car) => (
            <tr
              key={car.id}
              className="border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-highlight)]/10"
            >
              <td className="p-3 font-medium text-[var(--color-text)] md:p-4">{car.brand}</td>
              <td className="p-3 md:p-4">{car.model}</td>
              <td className="p-3 md:p-4">{car.color}</td>
              <td className="p-3 md:p-4">{car.year}</td>
              <td className="p-3 text-[11px] font-bold md:p-4 md:text-xs">
                {car.createdAt ? format(new Date(car.createdAt), "dd/MM/yyyy") : t("fields.notAvailable")}
              </td>
              <td className="p-3 text-right md:p-4">
                <div className="flex justify-end gap-2 md:gap-3">
                  <button
                    onClick={() => handleDetails(car.id)}
                    className="cursor-pointer transition-all hover:text-[var(--color-highlight)]"
                    title={t("actions.details")}
                    aria-label={t("actions.details")}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEdit(car.id)}
                    className="cursor-pointer transition-all hover:text-[var(--color-accent)]"
                    title={t("actions.edit")}
                    aria-label={t("actions.edit")}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => setCarToDelete(car.id)}
                    className="cursor-pointer transition-all hover:text-red-500"
                    disabled={deleteMutation.isPending}
                    title={t("actions.delete")}
                    aria-label={t("actions.delete")}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredCars.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-sm text-[var(--color-muted)] dark:text-white">
                {t("empty")}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Dialog open={carToDelete !== null} onOpenChange={(open) => !open && setCarToDelete(null)}>
        <DialogContent className="border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]">
          <DialogHeader>
            <DialogTitle>{t("messages.deleteConfirmTitle")}</DialogTitle>
            <DialogDescription className="text-[var(--color-muted)] dark:text-white">
              {t("messages.deleteConfirm")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setCarToDelete(null)}
              className="border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-highlight)]"
            >
              {t("actions.cancel")}
            </Button>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-[var(--color-success)] text-[#111827] hover:brightness-95"
            >
              {t("actions.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={carToEdit !== null} onOpenChange={(open) => !open && setCarToEdit(null)}>
        <DialogContent className="border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] dark:text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("editTitle")}</DialogTitle>
            <DialogDescription className="text-[var(--color-muted)] dark:text-white">
              {t("messages.editDescription")}
            </DialogDescription>
          </DialogHeader>
          {carToEdit && <CarForm initialData={carToEdit} onSuccess={() => setCarToEdit(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
