"use client";

import { useRouter, useParams } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export function LogoutButton() {
  const router = useRouter();
  const { locale } = useParams();

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.info("Logging out...", {
      autoClose: 5000,
      theme: "dark",
    });

    router.push(`/${locale}/login`);
  };

  return (
    <Button
      onClick={handleLogout}
      title="Logout"
      className="bg-white text-[#0E1D26] hover:bg-[#818A8C] p-2.5 rounded-full shadow-lg border-none transition-transform hover:scale-110 flex items-center justify-center"
    >
      <LogOut size={20} />
    </Button>
  );
}
