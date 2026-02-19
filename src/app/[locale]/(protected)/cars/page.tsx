"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";

import { CarTable } from "@/features/auth/components/cars/CarTable";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

import { Button } from "@/components/ui/button";

import { Plus, Car as CarIcon } from "lucide-react";

export default function CarsPage() {
  const t = useTranslations("Cars");
  const { locale } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const response = await api.get("/cars");
      return response.data;
    },
  });

  return (
    <main className="min-h-screen bg-[#0E1D26] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER: Título à esquerda, Botões à direita */}
        <header className="flex items-center justify-between border-b border-[#525859] pb-8">
          
          <div className="flex items-center gap-4">
            <div className="bg-[#022873] p-3 rounded-lg text-white">
              <CarIcon size={28} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
              {t("title") || "Vehicle Management"}
            </h1>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            {/* Botão de Adicionar */}
            <Link href={`/${locale}/cars/create`}>
              <Button className="bg-[#022873] hover:bg-[#022859] text-white font-bold h-11 px-6 flex gap-2 items-center transition-all">
                <Plus size={20} />
                <span className="hidden sm:inline">{t("addCar") || "Add Car"}</span>
              </Button>
            </Link>

            {/* Logout posicionado totalmente à direita */}
            <LogoutButton />
          </div>
        </header>

        {/* LISTAGEM */}
        <section>
          {error && (
            <div className="bg-red-900/20 border border-red-500 p-6 rounded-xl text-red-200 mb-6 font-mono text-sm">
              [System Error]: Java Backend not reachable on port 8080.
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#022873] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <CarTable cars={data} />
          )}
        </section>

      </div>
    </main>
  );
}