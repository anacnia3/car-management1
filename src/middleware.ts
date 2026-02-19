import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Captura todas as rotas, exceto arquivos internos e API
  matcher: ['/', '/(pt|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};