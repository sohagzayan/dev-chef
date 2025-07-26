import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { COOKIE_CONFIG } from '@/lib/utils/cookies';

// Define protected routes
const protectedRoutes = [
    '/for-developer/dashboard',
    '/for-developer/profile',
    '/for-developer/settings',
    '/admin',
    '/companies/dashboard',
];

// Define auth routes (login, signup)
const authRoutes = [
    '/developers/login',
    '/developers/signup',
    '/companies/login',
    '/companies/trial',
    '/access-account',
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    // Check if the route is an auth route
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    // Get access token from cookies
    const accessToken = request.cookies.get(COOKIE_CONFIG.accessToken.name)?.value;

    // If accessing an auth route with a valid token, redirect to appropriate dashboard
    if (isAuthRoute && accessToken) {
        try {
            const tokenPayload = await verifyAccessToken(accessToken);

            if (tokenPayload) {
                // Check if user exists and is active
                const user = await prisma.user.findUnique({
                    where: { id: tokenPayload.userId },
                    select: { isActive: true, role: true },
                });

                if (user?.isActive) {
                    // Redirect based on user role
                    let dashboardUrl: string;
                    if (user.role === 'RECRUITER') {
                        dashboardUrl = '/';
                    } else {
                        dashboardUrl = '/';
                    }

                    // Check if there's a redirect parameter and it's a valid path
                    const redirectParam = request.nextUrl.searchParams.get('redirect');
                    if (redirectParam && redirectParam.startsWith('/')) {
                        // Validate the redirect path is appropriate for the user role
                        if (user.role === 'RECRUITER' && redirectParam.startsWith('/companies/')) {
                            dashboardUrl = redirectParam;
                        } else if (
                            user.role !== 'RECRUITER' &&
                            !redirectParam.startsWith('/companies/')
                        ) {
                            dashboardUrl = redirectParam;
                        }
                    }

                    return NextResponse.redirect(new URL(dashboardUrl, request.url));
                }
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            // Continue to auth page if token is invalid
        }
    }

    // If accessing a protected route without a token, redirect to appropriate login
    if (isProtectedRoute && !accessToken) {
        let loginUrl: string;

        // Determine which login page to redirect to based on the protected route
        if (pathname.startsWith('/companies/') || pathname.startsWith('/admin/')) {
            loginUrl = '/companies/login';
        } else {
            loginUrl = '/developers/login';
        }

        const redirectUrl = new URL(loginUrl, request.url);
        redirectUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(redirectUrl);
    }

    // For protected routes with a token, verify it
    if (isProtectedRoute && accessToken) {
        try {
            const tokenPayload = await verifyAccessToken(accessToken);

            if (!tokenPayload) {
                // Invalid token, redirect to login
                let loginUrl: string;
                if (pathname.startsWith('/companies/') || pathname.startsWith('/admin/')) {
                    loginUrl = '/companies/login';
                } else {
                    loginUrl = '/developers/login';
                }

                const redirectUrl = new URL(loginUrl, request.url);
                redirectUrl.searchParams.set('redirect', pathname);
                return NextResponse.redirect(redirectUrl);
            }

            // Check if user exists and is active
            const user = await prisma.user.findUnique({
                where: { id: tokenPayload.userId },
                select: { isActive: true, role: true },
            });

            if (!user?.isActive) {
                // User is deactivated, redirect to login
                let loginUrl: string;
                if (pathname.startsWith('/companies/') || pathname.startsWith('/admin/')) {
                    loginUrl = '/companies/login';
                } else {
                    loginUrl = '/developers/login';
                }

                const redirectUrl = new URL(loginUrl, request.url);
                redirectUrl.searchParams.set('redirect', pathname);
                return NextResponse.redirect(redirectUrl);
            }

            // Check role-based access
            if (pathname.startsWith('/companies/') && user.role !== 'RECRUITER') {
                // Non-recruiter trying to access company routes
                return NextResponse.redirect(
                    new URL('/developers/login?error=access_denied', request.url),
                );
            }

            if (pathname.startsWith('/admin/') && user.role !== 'ADMIN') {
                // Non-admin trying to access admin routes
                return NextResponse.redirect(
                    new URL('/developers/login?error=access_denied', request.url),
                );
            }

            // Add user info to headers for API routes
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-user-id', tokenPayload.userId);
            requestHeaders.set('x-user-email', tokenPayload.email);
            requestHeaders.set('x-user-role', tokenPayload.role);

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (error) {
            // Token verification failed, redirect to login
            console.error('Token verification failed:', error);
            let loginUrl: string;
            if (pathname.startsWith('/companies/') || pathname.startsWith('/admin/')) {
                loginUrl = '/companies/login';
            } else {
                loginUrl = '/developers/login';
            }

            const redirectUrl = new URL(loginUrl, request.url);
            redirectUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(redirectUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
