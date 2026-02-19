import { useMutation } from "@tanstack/react-query";
import { login } from "../actions/login";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify"; // Importação necessária para feedback

export function useLogin() {
  const router = useRouter();
  const { locale } = useParams();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // 1. Salva o Token JWT no localStorage para uso do interceptor
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      // 2. Feedback visual de sucesso em inglês
      toast.success("Login successful! Redirecting...");

      // 3. Redirecionamento para a área protegida
      router.push(`/${locale}/cars`);
      router.refresh();
    },
    onError: (error: any) => {
      // 4. Captura a mensagem de erro vinda do seu backend no IntelliJ
      const errorMessage = error.response?.data?.message || "Invalid email or password";
      toast.error(errorMessage);
      console.error("Login Error:", error);
    },
  });
}