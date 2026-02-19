import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { QueryProvider } from "@/provider/query-provider";
import { ToastContainer } from "react-toastify"; // 🆕 Importar o container
import "react-toastify/dist/ReactToastify.css"; // 🆕 Importar o CSS obrigatório

const locales = ["pt", "en"] as const;

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <QueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            {/* 🆕 Configuração do Pop-up para 5 segundos */}
            <ToastContainer 
              position="bottom-right"
              autoClose={5000} // 5 segundos
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}