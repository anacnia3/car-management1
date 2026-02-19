import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // OBRIGATÓRIO: No Next.js 16, precisamos dar 'await' no locale
  let locale = await requestLocale;

  // Validação: Se o locale não for suportado, usa o padrão do seu routing.ts (en)
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // O import busca o JSON correspondente dentro de src/i18n/messages/
    messages: (await import(`./messages/${locale}.json`)).default
  };
});