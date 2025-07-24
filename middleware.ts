import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { verifyAccessToken } from '@/lib/jwt';

// Define role-based route access
const roleRoutes = {
    admin: ['/admin'],
    employer: ['/employer', '/jobs/create', '/jobs/manage'],
    candidate: ['/candidate', '/applications'],
    user: ['/profile'],
};

// Define protected routes and their required roles
const protectedRoutes = {
    '/admin': ['ADMIN'],
    '/employer': ['EMPLOYER', 'ADMIN'],
    '/candidate': ['CANDIDATE', 'ADMIN'],
    '/dashboard': ['USER', 'CANDIDATE', 'EMPLOYER', 'ADMIN'],
    '/profile': ['USER', 'CANDIDATE', 'EMPLOYER', 'ADMIN'],
};

const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/forgot-password',
    '/api/auth/reset-password',
    '/api/auth/google',
    '/api/auth/github',
    '/api/auth/refresh',
];

export default auth((req: NextRequest & { auth: any }) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const userRole = req.auth?.user?.role;

    const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
    const isPublicRoute = publicRoutes.some((route) => nextUrl.pathname.startsWith(route));

    // Allow API auth routes
    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    // Allow public routes
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Redirect logged-in users away from auth pages
    if (['/auth/login', '/auth/register'].includes(nextUrl.pathname)) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL('/dashboard', nextUrl));
        }
        return NextResponse.next();
    }

    // Redirect unauthenticated users to login
    if (!isLoggedIn) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return NextResponse.redirect(
            new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
        );
    }

    // Check if route requires authentication
    const protectedRoute = Object.keys(protectedRoutes).find((route) =>
        nextUrl.pathname.startsWith(route),
    );

    if (protectedRoute) {
        // Get token from Authorization header or cookie
        let token = req.headers.get('authorization')?.replace('Bearer ', '');

        if (!token) {
            // Try to get from cookie for browser requests
            token = req.cookies.get('accessToken')?.value;
        }

        if (!token) {
            // No token, redirect to login
            const loginUrl = new URL('/auth/login', req.url);
            loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Verify token
        const payload = verifyAccessToken(token);
        if (!payload) {
            // Invalid token, redirect to login
            const loginUrl = new URL('/auth/login', req.url);
            loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Check role permissions
        const requiredRoles = protectedRoutes[protectedRoute as keyof typeof protectedRoutes];
        if (!requiredRoles.includes(payload.role)) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

        // Add user info to headers for API routes
        const response = NextResponse.next();
        response.headers.set('x-user-id', payload.userId);
        response.headers.set('x-user-email', payload.email);
        response.headers.set('x-user-role', payload.role);

        return response;
    }

    // Check role-based access
    const currentPath = nextUrl.pathname;

    // Check if current path requires specific role
    for (const [role, routes] of Object.entries(roleRoutes)) {
        if (routes.some((route) => currentPath.startsWith(route))) {
            if (userRole !== role) {
                return NextResponse.redirect(new URL('/unauthorized', nextUrl));
            }
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
};
