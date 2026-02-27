"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { CarTable } from "@/features/auth/components/cars/CarTable";
import { CarForm } from "@/features/auth/components/cars/car-form";
import { useCarsQuery } from "@/features/auth/hooks/useCarsQuery";
import { SearchField } from "@/features/auth/types/cars.types";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function CarsPage() {
  const t = useTranslations("Cars");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<SearchField>("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data, isLoading, error } = useCarsQuery({
    page,
    pageSize,
    search,
    searchField,
  });

  const content = Array.isArray(data) ? data : data?.content || [];
  const currentPage = Array.isArray(data) ? 0 : data?.number ?? page;
  const totalPages = Array.isArray(data) ? 1 : Math.max(data?.totalPages ?? 1, 1);
  const visibleItems = content.length;
  const totalItems = Array.isArray(data) ? content.length : (data?.totalElements ?? content.length);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex h-9 items-center gap-2 bg-[var(--color-accent)] px-4 text-sm font-bold text-[#111827] transition-all hover:brightness-95"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">{t("addCar")}</span>
          </Button>
        </div>

        <div className="fixed right-36 top-4 z-50">
          <LogoutButton />
        </div>

        <section className="space-y-4">
          {error && (
            <div className="mb-6 rounded-xl border border-red-500 bg-red-900/20 p-6 font-mono text-sm text-red-200">
              {t("systemError")}
            </div>
          )}

          <>
            {isLoading && (
              <div className="flex justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-accent)] border-t-transparent" />
              </div>
            )}

            <CarTable
              cars={content}
              search={search}
              searchField={searchField}
              onSearchChange={(value) => {
                setSearch(value);
                setPage(0);
              }}
              onSearchFieldChange={(value) => {
                setSearchField(value);
                setPage(0);
              }}
            />

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-sm text-[var(--color-text)] sm:flex-row sm:items-center sm:justify-between">
              <p className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-xs text-[var(--color-muted)] sm:text-sm">
                {t("pagination.showing", { visible: visibleItems, total: totalItems })}
              </p>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <label htmlFor="page-size" className="text-xs text-[var(--color-muted)] sm:text-sm">
                  {t("pagination.show")}
                </label>
                <select
                  id="page-size"
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    setPage(0);
                  }}
                  className="h-9 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2 text-xs text-[var(--color-text)] sm:text-sm"
                >
                  {[10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={currentPage <= 0}
                  className="h-9 border-[var(--color-border)] bg-transparent px-3 text-xs text-[var(--color-text)] hover:bg-[var(--color-highlight)] sm:text-sm"
                >
                  {t("pagination.previous")}
                </Button>

                <span className="min-w-14 text-center text-[var(--color-muted)]">
                  {currentPage + 1} / {totalPages}
                </span>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                  disabled={currentPage >= totalPages - 1}
                  className="h-9 border-[var(--color-border)] bg-transparent px-3 text-xs text-[var(--color-text)] hover:bg-[var(--color-highlight)] sm:text-sm"
                >
                  {t("pagination.next")}
                </Button>
              </div>
            </div>
          </>
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
