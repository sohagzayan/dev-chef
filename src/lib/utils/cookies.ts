import { NextRequest, NextResponse } from 'next/server';

// Cookie configuration with security best practices
export const COOKIE_CONFIG = {
    // Access token - short lived, httpOnly for security
    accessToken: {
        name: 'devchef_access_token',
        maxAge: 15 * 60, // 15 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
    },
    // Refresh token - longer lived, httpOnly for security
    refreshToken: {
        name: 'devchef_refresh_token',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
    },
    // Remember me token - even longer lived
    rememberMe: {
        name: 'devchef_remember_me',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
    },
    // User data - non-sensitive info
    userData: {
        name: 'devchef_user',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        httpOnly: false, // Allow client access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
    },
} as const;

// Server-side cookie management
export class ServerCookies {
    static setAccessToken(token: string, response: NextResponse): NextResponse {
        response.cookies.set(COOKIE_CONFIG.accessToken.name, token, {
            maxAge: COOKIE_CONFIG.accessToken.maxAge,
            httpOnly: COOKIE_CONFIG.accessToken.httpOnly,
            secure: COOKIE_CONFIG.accessToken.secure,
            sameSite: COOKIE_CONFIG.accessToken.sameSite,
            path: COOKIE_CONFIG.accessToken.path,
        });
        return response;
    }

    static setRefreshToken(token: string, response: NextResponse): NextResponse {
        response.cookies.set(COOKIE_CONFIG.refreshToken.name, token, {
            maxAge: COOKIE_CONFIG.refreshToken.maxAge,
            httpOnly: COOKIE_CONFIG.refreshToken.httpOnly,
            secure: COOKIE_CONFIG.refreshToken.secure,
            sameSite: COOKIE_CONFIG.refreshToken.sameSite,
            path: COOKIE_CONFIG.refreshToken.path,
        });
        return response;
    }

    static setRememberMe(enabled: boolean, response: NextResponse): NextResponse {
        if (enabled) {
            response.cookies.set(COOKIE_CONFIG.rememberMe.name, 'true', {
                maxAge: COOKIE_CONFIG.rememberMe.maxAge,
                httpOnly: COOKIE_CONFIG.rememberMe.httpOnly,
                secure: COOKIE_CONFIG.rememberMe.secure,
                sameSite: COOKIE_CONFIG.rememberMe.sameSite,
                path: COOKIE_CONFIG.rememberMe.path,
            });
        } else {
            response.cookies.delete(COOKIE_CONFIG.rememberMe.name);
        }
        return response;
    }

    static setUserData(userData: any, response: NextResponse): NextResponse {
        response.cookies.set(COOKIE_CONFIG.userData.name, JSON.stringify(userData), {
            maxAge: COOKIE_CONFIG.userData.maxAge,
            httpOnly: COOKIE_CONFIG.userData.httpOnly,
            secure: COOKIE_CONFIG.userData.secure,
            sameSite: COOKIE_CONFIG.userData.sameSite,
            path: COOKIE_CONFIG.userData.path,
        });
        return response;
    }

    static getAccessToken(request: NextRequest): string | undefined {
        return request.cookies.get(COOKIE_CONFIG.accessToken.name)?.value;
    }

    static getRefreshToken(request: NextRequest): string | undefined {
        return request.cookies.get(COOKIE_CONFIG.refreshToken.name)?.value;
    }

    static getRememberMe(request: NextRequest): boolean {
        return request.cookies.get(COOKIE_CONFIG.rememberMe.name)?.value === 'true';
    }

    static getUserData(request: NextRequest): any {
        const userData = request.cookies.get(COOKIE_CONFIG.userData.name)?.value;
        return userData ? JSON.parse(userData) : null;
    }

    static clearAll(response: NextResponse): NextResponse {
        Object.values(COOKIE_CONFIG).forEach((config) => {
            response.cookies.delete(config.name);
        });
        return response;
    }

    static clearAuthCookies(response: NextResponse): NextResponse {
        response.cookies.delete(COOKIE_CONFIG.accessToken.name);
        response.cookies.delete(COOKIE_CONFIG.refreshToken.name);
        response.cookies.delete(COOKIE_CONFIG.rememberMe.name);
        return response;
    }
}

// Client-side cookie management (for non-httpOnly cookies)
export class ClientCookies {
    static setUserData(userData: any): void {
        if (typeof window !== 'undefined') {
            const cookieValue = JSON.stringify(userData);
            document.cookie = `${COOKIE_CONFIG.userData.name}=${encodeURIComponent(cookieValue)}; max-age=${COOKIE_CONFIG.userData.maxAge}; path=${COOKIE_CONFIG.userData.path}; ${COOKIE_CONFIG.userData.secure ? 'secure;' : ''} samesite=${COOKIE_CONFIG.userData.sameSite}`;
        }
    }

    static getUserData(): any {
        if (typeof window !== 'undefined') {
            const cookies = document.cookie.split(';');
            const userDataCookie = cookies.find((cookie) =>
                cookie.trim().startsWith(`${COOKIE_CONFIG.userData.name}=`),
            );

            if (userDataCookie) {
                const value = userDataCookie.split('=')[1];
                return JSON.parse(decodeURIComponent(value));
            }
        }
        return null;
    }

    static clearUserData(): void {
        if (typeof window !== 'undefined') {
            document.cookie = `${COOKIE_CONFIG.userData.name}=; max-age=0; path=${COOKIE_CONFIG.userData.path}`;
        }
    }
}

// Utility functions for API responses
export function setAuthCookies(
    response: NextResponse,
    accessToken: string,
    refreshToken: string,
    rememberMe: boolean = false,
    userData?: any,
): NextResponse {
    response = ServerCookies.setAccessToken(accessToken, response);
    response = ServerCookies.setRefreshToken(refreshToken, response);
    response = ServerCookies.setRememberMe(rememberMe, response);

    if (userData) {
        response = ServerCookies.setUserData(userData, response);
    }

    return response;
}

export function clearAuthCookies(response: NextResponse): NextResponse {
    return ServerCookies.clearAuthCookies(response);
}
