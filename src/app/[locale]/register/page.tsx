"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  const t = useTranslations("Auth");
  const { locale } = useParams();

  return (
    <main className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      
     
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/login.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60 z-10" />

      
      <div className="relative z-20 w-full max-w-[450px] px-6">
        <div className="bg-white rounded-2xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-200">
          
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {t("register")}
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Create your account to manage your fleet.
            </p>
          </div>

          {/* Componente de Formulário */}
          <RegisterForm />

          {/* Link para voltar ao Login */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
            {t("hasAccount")}{" "}
            <Link 
              href={`/${locale}/login`} 
              className="text-blue-600 font-bold hover:underline transition-all"
            >
              {t("loginNow")}
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}