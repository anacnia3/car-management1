import { useMutation } from "@tanstack/react-query";
import { getSession, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { LoginFormData } from "../schemas/login.schema";
import { toast } from "react-toastify";

export function useLogin() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result || result.error) {
        throw new Error(result?.error || t("messages.invalidCredentials"));
      }

      const session = await getSession();
      if (session?.accessToken) {
        localStorage.setItem("token", session.accessToken);
      }

      return result;
    },
    onSuccess: () => {
      toast.success(t("messages.loginSuccess"));
      router.push(`/${localeValue}/cars`);
      router.refresh();
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : t("messages.invalidCredentials");
      toast.error(errorMessage);
    },
  });
}
