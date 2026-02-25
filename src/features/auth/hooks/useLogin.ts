import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { LoginFormData } from "../schemas/login.schema";
import { toast } from "react-toastify";

export function useLogin() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;

  const resolveLoginErrorMessage = (message?: string) => {
    if (!message) return t("messages.invalidCredentials");

    if (message.startsWith("messages.")) {
      return t(message as "messages.invalidCredentials");
    }

    const nextAuthErrors = new Set([
      "CredentialsSignin",
      "AccessDenied",
      "CallbackRouteError",
      "Configuration",
      "Verification",
    ]);

    if (nextAuthErrors.has(message)) {
      return t("messages.invalidCredentials");
    }

    return message;
  };

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result || result.error) {
        throw new Error(result?.error || "messages.invalidCredentials");
      }

      return result;
    },
    onSuccess: () => {
      toast.success(t("messages.loginSuccess"));
      router.push(`/${localeValue}/cars`);
      router.refresh();
    },
    onError: (error: unknown) => {
      const rawMessage = error instanceof Error ? error.message : undefined;
      toast.error(resolveLoginErrorMessage(rawMessage));
    },
  });
}
