"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  const t = useTranslations("Auth");
  const { locale } = useParams();

  return (
    <main className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      
      {/* 🎥 Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/login.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 💳 Login Card (Estilo Vercel/Clean conforme a imagem) */}
      <div className="relative z-20 w-full max-w-[450px] px-6">
        <div className="bg-white rounded-2xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-200">
          
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Login to Car Management
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Chamada do formulário que você já tem */}
          <LoginForm />

          {/* 🔗 Opção de Cadastro (Requisito do Estágio) */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              href={`/${locale}/register`} 
              className="text-blue-600 font-bold hover:underline transition-all"
            >
              Register Now
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}