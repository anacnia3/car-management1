"use client";

import { useRouter, useParams } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export function LogoutButton() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { locale } = useParams();
  const localeValue = Array.isArray(locale) ? locale[0] : locale;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    localStorage.removeItem("token");

    toast.info(t("messages.logout"), {
      autoClose: 1000,
      theme: "dark",
    });

    router.push(`/${localeValue}/login`);
  };

  return (
    <Button
      onClick={handleLogout}
      title={t("logoutLabel")}
      aria-label={t("logoutLabel")}
      className="flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 text-[var(--color-accent)] shadow-lg transition-transform hover:scale-110 hover:bg-[var(--color-sidebar)]"
    >
      <LogOut size={20} />
    </Button>
  );
}
