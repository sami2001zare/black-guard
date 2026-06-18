import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
    locales: ['en', 'ar', 'fa'],
    defaultLocale: 'en',
    localePrefix: 'always',
    localeDetection: true,
});


export const config = {
  matcher: [
    '/',
    '/(en|ar|fa)/:path*',
    '/((?!api/auth|api|_next|_vercel|admin|.*\\..*).*)'
  ],
};