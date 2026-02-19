"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { api } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const t = useTranslations("Auth");
  const { locale } = useParams();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      // Chamada para o endpoint que agora existe no seu AuthController
      await api.post("/auth/register", data);
      
      // Pop-up de sucesso configurado para 5 segundos
      toast.success("Account created successfully!", { autoClose: 5000 });
      
      router.push(`/${locale}/login`);
    } catch (error: any) {
      // Captura erros de CORS ou 500 e exibe para debug
      const errorMessage = error.response?.data?.message || "Error creating account";
      toast.error(errorMessage, { autoClose: 5000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        {/* Labels em BRANCO para contraste */}
        <label className="text-sm font-bold text-white ml-1 uppercase">{t("fields.name")}</label>
        <Input 
          {...register("name")} 
          placeholder="Your Full Name" 
          className="h-11 bg-white !text-black border-none" // Fundo branco, texto PRETO
        />
        {errors.name && <p className="text-[11px] text-red-400 font-medium ml-1">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-bold text-white ml-1 uppercase">{t("fields.email")}</label>
        <Input 
          {...register("email")} 
          placeholder="email@example.com" 
          className="h-11 bg-white !text-black border-none" 
        />
        {errors.email && <p className="text-[11px] text-red-400 font-medium ml-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-bold text-white ml-1 uppercase">{t("fields.password")}</label>
        <Input 
          {...register("password")} 
          type="password" 
          placeholder="••••••••" 
          className="h-11 bg-white !text-black border-none" 
        />
        {errors.password && <p className="text-[11px] text-red-400 font-medium ml-1">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full h-11 bg-black text-white hover:bg-zinc-900 font-bold mt-2 border border-white/10" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : t("register")}
      </Button>
    </form>
  );
}