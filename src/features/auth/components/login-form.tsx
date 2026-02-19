"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const t = useTranslations("Auth");
  const { locale } = useParams();
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched", // Valida assim que o usuário sai do campo
  });

  const onSubmit = (data: LoginFormData) => {
    // Se o Zod validar, esta função será chamada
    mutate(data);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
      
        <div className="space-y-1 text-left">
          <label className="text-sm font-bold text-white ml-1 uppercase tracking-wider">
            {t("fields.email")}
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="email@example.com"
            
            className="h-11 bg-white border-none !text-black placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-white/20"
          />
          {errors.email && (
            <p className="text-[11px] text-red-400 font-bold ml-1 animate-pulse">
              {t(errors.email.message)}
            </p>
          )}
        </div>

        {/* Campo de Senha */}
        <div className="space-y-1 text-left">
          <label className="text-sm font-bold text-white ml-1 uppercase tracking-wider">
            {t("fields.password")}
          </label>
          <Input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="h-11 bg-white border-none !text-black placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-white/20"
          />
          {errors.password && (
            <p className="text-[11px] text-red-400 font-bold ml-1 animate-pulse">
              {t(errors.password.message)}
            </p>
          )}
        </div>

  
        <Button 
          type="submit" 
          className="w-full h-11 bg-black text-white hover:bg-zinc-900 transition-all font-bold rounded-lg mt-2 border border-white/10" 
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {t("messages.loading")}
            </span>
          ) : (
            t("submit")
          )}
        </Button>
      </form>

      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-sm text-gray-300">
          {t("noAccount")}{" "}
          <Link 
            href={`/${locale}/register`} 
            className="text-white font-bold hover:underline underline-offset-4 transition-colors"
          >
            {t("registerNow")}
          </Link>
        </p>
      </div>
    </div>
  );
}