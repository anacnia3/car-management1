"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { api } from "@/lib/api";

type CarDetails = {
  id: number;
  brand: string;
  model: string;
  color: string;
  year: number;
  createdAt?: string;
};

export default function CarDetailsPage() {
  const tCars = useTranslations("Cars");
  const tCommon = useTranslations("Common");
  const { locale, id } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;
  const idValue = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["car-details", idValue],
    queryFn: async () => {
      const response = await api.get(`/cars/${idValue}`);
      return response.data as CarDetails;
    },
    enabled: !!idValue,
  });

  return (
    <main className="min-h-screen bg-[var(--color-bg)] p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black uppercase tracking-tight text-[var(--color-text)]">
            {tCars("detailsTitle")}
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href={`/${localeValue}/cars/edit/${idValue}`}
              className="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[#111827] transition hover:brightness-95"
            >
              {tCars("actions.edit")}
            </Link>
            <Link
              href={`/${localeValue}/cars`}
              className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-highlight)]"
            >
              {tCommon("back")}
            </Link>
          </div>
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
          <div className="grid gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-[var(--color-text)] shadow-2xl">
            <DetailItem label={tCars("fields.id")} value={String(data.id)} />
            <DetailItem label={tCars("fields.brand")} value={data.brand} />
            <DetailItem label={tCars("fields.model")} value={data.model} />
            <DetailItem label={tCars("fields.color")} value={data.color} />
            <DetailItem label={tCars("fields.year")} value={String(data.year)} />
            <DetailItem
              label={tCars("fields.createdAt")}
              value={data.createdAt ? format(new Date(data.createdAt), "dd/MM/yyyy") : "N/A"}
            />
          </div>
        )}
      </div>
    </main>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <span className="text-xs uppercase tracking-widest text-[var(--color-muted)]">{label}</span>
      <span className="mt-1 text-base font-semibold text-[var(--color-text)]">{value}</span>
    </div>
  );
}
