import "../globals.css";
import { QueryProvider } from "@/provider/query-provider";
import { AuthProvider } from "@/provider/auth-provider";
import { ThemeProvider } from "@/provider/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Roboto } from "next/font/google";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const locales = ["pt", "en"] as const;
type Locale = (typeof locales)[number];
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: " CAR MANAGEMENT",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider>
          <AuthProvider>
            <QueryProvider>
              <NextIntlClientProvider locale={locale} messages={messages}>
                <ThemeToggle />
                <LanguageToggle />
                {children}
                <ToastContainer
                  position="bottom-right"
                  autoClose={500}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
              </NextIntlClientProvider>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
