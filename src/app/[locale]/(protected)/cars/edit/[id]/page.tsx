"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { api } from "@/lib/api";
import { CarForm } from "@/features/auth/components/cars/car-form";

type CarData = {
  id: number;
  brand: string;
  model: string;
  color: string;
  year: number;
};

export default function EditCarPage() {
  const tCars = useTranslations("Cars");
  const tCommon = useTranslations("Common");
  const { locale, id } = useParams();
  const router = useRouter();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;
  const idValue = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["car-edit", idValue],
    queryFn: async () => {
      const response = await api.get(`/cars/${idValue}`);
      return response.data as CarData;
    },
    enabled: !!idValue,
  });

  return (
    <main className="min-h-screen bg-[var(--color-bg)] p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black uppercase tracking-tight text-[var(--color-text)]">
            {tCars("editTitle")}
          </h1>
          <Link
            href={`/${localeValue}/cars/details/${idValue}`}
            className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-highlight)]"
          >
            {tCommon("back")}
          </Link>
        </div>

        {isLoading && (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-accent)] border-t-transparent" />
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-500 bg-red-900/20 p-6 text-sm text-red-200">
            {tCars("messages.detailsLoadError")}
          </div>
        )}

        {data && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl">
            <CarForm
              initialData={data}
              onSuccess={() => router.push(`/${localeValue}/cars/details/${idValue}`)}
            />
          </div>
        )}
      </div>
    </main>
  );
}
