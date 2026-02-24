"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { api } from "@/lib/api";
import { CarTable } from "@/features/auth/components/cars/CarTable";
import { CarForm } from "@/features/auth/components/cars/car-form";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Car = {
  id: number;
  brand: string;
  model: string;
  color: string;
  year: number;
  createdAt?: string;
};

type CarsResponse =
  | Car[]
  | {
      content: Car[];
      totalPages: number;
      number: number;
      totalElements?: number;
    };

const PAGE_SIZE = 15;

export default function CarsPage() {
  const t = useTranslations("Cars");
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const isSearchActive = search.trim().length > 0;

  const { data, isLoading, error } = useQuery({
    queryKey: ["cars", page, PAGE_SIZE],
    queryFn: async () => {
      const response = await api.get<CarsResponse>("/cars", {
        params: { page, size: PAGE_SIZE },
      });
      return response.data;
    },
  });

  const { data: allCarsData = [], isLoading: isLoadingAllCars } = useQuery({
    queryKey: ["cars", "all", PAGE_SIZE],
    enabled: isSearchActive,
    queryFn: async () => {
      const firstPageResponse = await api.get<CarsResponse>("/cars", {
        params: { page: 0, size: PAGE_SIZE },
      });

      const firstPageData = firstPageResponse.data;
      if (Array.isArray(firstPageData)) {
        return firstPageData;
      }

      const totalPages = Math.max(firstPageData.totalPages ?? 1, 1);
      if (totalPages <= 1) {
        return firstPageData.content || [];
      }

      const remainingRequests = Array.from({ length: totalPages - 1 }, (_, index) =>
        api.get<CarsResponse>("/cars", {
          params: { page: index + 1, size: PAGE_SIZE },
        })
      );

      const remainingResponses = await Promise.all(remainingRequests);
      const remainingCars = remainingResponses.flatMap((response) => {
        const responseData = response.data;
        return Array.isArray(responseData) ? responseData : responseData.content || [];
      });

      return [...(firstPageData.content || []), ...remainingCars];
    },
  });

  const content = Array.isArray(data) ? data : data?.content || [];
  const carsForTable = isSearchActive && !isLoadingAllCars ? allCarsData : content;
  const currentPage = Array.isArray(data) ? 0 : data?.number ?? page;
  const totalPages = Array.isArray(data) ? 1 : Math.max(data?.totalPages ?? 1, 1);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <AppHeader
          actions={
            <>
            <Button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="flex h-11 items-center gap-2 bg-[var(--color-accent)] px-6 font-bold text-[#111827] transition-all hover:brightness-95"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">{t("addCar")}</span>
            </Button>

            <LogoutButton />
            </>
          }
        />

        <section className="space-y-4">
          {error && (
            <div className="mb-6 rounded-xl border border-red-500 bg-red-900/20 p-6 font-mono text-sm text-red-200">
              {t("systemError")}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-accent)] border-t-transparent" />
            </div>
          ) : (
            <>
              <CarTable cars={carsForTable} search={search} onSearchChange={setSearch} />

              {!isSearchActive && (
                <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text)]">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={currentPage <= 0}
                    className="border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-highlight)]"
                  >
                    {t("pagination.previous")}
                  </Button>

                  <span className="text-[var(--color-muted)]">
                    {currentPage + 1} / {totalPages}
                  </span>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage >= totalPages - 1}
                    className="border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-highlight)]"
                  >
                    {t("pagination.next")}
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t("addCar")}</DialogTitle>
            </DialogHeader>
            <CarForm onSuccess={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
