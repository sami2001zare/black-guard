import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, verifyToken } from './lib/auth';

const i18nMiddleware = createMiddleware({
    locales: ['en', 'ar', 'fa'],
    defaultLocale: 'en',
    localePrefix: 'always',
    localeDetection: true,
});

// ===== Public admin paths (no auth required) =====
const publicAdminPaths = ['/admin/login'];

// ===== Main Middleware =====
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // --- 1. Handle /admin/* routes (auth required) ---
    const isAdminPath = pathname.startsWith('/admin');
    const isPublicAdminPath = publicAdminPaths.some((p) => pathname === p);

    if (isAdminPath && !isPublicAdminPath) {
        // Check for JWT token
        const token = getTokenFromRequest(request);

        if (!token) {
            // Redirect to login
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        // Verify token
        const payload = verifyToken(token);
        if (!payload) {
            // Invalid token, redirect to login
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        // Valid token: attach user info to headers for server components
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', payload.id.toString());
        requestHeaders.set('x-user-name', payload.name);
        requestHeaders.set('x-user-email', payload.email);
        requestHeaders.set('x-user-role', payload.role);

        // Continue to the admin page (do NOT run i18n middleware)
        return NextResponse.next({
            request: { headers: requestHeaders },
        });
    }

    // --- 2. For all other routes, use i18n middleware ---
    // This includes API, static assets, and all non-admin pages
    return i18nMiddleware(request);
}

export const config = {
    matcher: ['/', '/(en|ar|fa)/:path*', '/((?!api/auth|api|_next|_vercel|admin|.*\\..*).*)'],
};
