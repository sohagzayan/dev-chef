import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import type { ApiResponse, AuthenticatedUser } from '@/types/api/api';

export interface AuthenticatedRequest extends NextRequest {
    user?: AuthenticatedUser;
}

// API Response helper
export function createApiResponse<T>(
    success: boolean,
    data?: T,
    message?: string | null,
    error?: string,
    errors?: Record<string, string[]>,
    meta?: any,
): ApiResponse<T> {
    return {
        success,
        data,
        message,
        error,
        errors,
        meta,
    };
}

// Authentication middleware
export async function authenticateRequest(request: NextRequest) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json(createApiResponse(false, null, null, 'Authentication required'), {
            status: 401,
        });
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
        return NextResponse.json(createApiResponse(false, null, null, 'Invalid or expired token'), {
            status: 401,
        });
    }

    // Get user with profile
    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        include: {
            candidateProfile: {
                include: {
                    skills: true,
                    experiences: true,
                    educations: true,
                },
            },
            recruiterProfile: true,
            adminProfile: true,
        },
    });

    if (!user || !user.isActive) {
        return NextResponse.json(
            createApiResponse(false, null, null, 'User not found or inactive'),
            { status: 401 },
        );
    }

    return { user, payload };
}

// Role-based authorization
export function requireRole(allowedRoles: string[]) {
    return async (request: NextRequest, user: any) => {
        if (!allowedRoles.includes(user.role)) {
            return NextResponse.json(
                createApiResponse(false, null, null, 'Insufficient permissions'),
                { status: 403 },
            );
        }
        return null;
    };
}

// Rate limiting helper (basic implementation)
const rateLimitMap = new Map();

export function rateLimit(maxRequests: number, windowMs: number) {
    return (request: NextRequest) => {
        const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();
        const windowStart = now - windowMs;

        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, []);
        }

        const requests = rateLimitMap.get(ip);
        const validRequests = requests.filter((time: number) => time > windowStart);

        if (validRequests.length >= maxRequests) {
            return NextResponse.json(createApiResponse(false, null, null, 'Too many requests'), {
                status: 429,
            });
        }

        validRequests.push(now);
        rateLimitMap.set(ip, validRequests);

        return null;
    };
}

// Error handler
export function handleApiError(error: any) {
    console.error('API Error:', error);

    if (error.name === 'ZodError') {
        return NextResponse.json(
            createApiResponse(false, null, null, 'Validation failed', error.flatten().fieldErrors),
            {
                status: 400,
            },
        );
    }

    if (error.message) {
        return NextResponse.json(createApiResponse(false, null, null, error.message), {
            status: 400,
        });
    }

    return NextResponse.json(createApiResponse(false, null, null, 'Internal server error'), {
        status: 500,
    });
}
