import { NextRequest, NextResponse } from 'next/server';
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

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
}

export function rateLimit(config: RateLimitConfig) {
    return function (request: NextRequest) {
        const ip =
            request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const now = Date.now();

        const rateLimitInfo = rateLimitMap.get(ip);

        if (!rateLimitInfo || now > rateLimitInfo.resetTime) {
            // First request or window expired
            rateLimitMap.set(ip, {
                count: 1,
                resetTime: now + config.windowMs,
            });
            return null; // Continue
        }

        if (rateLimitInfo.count >= config.maxRequests) {
            // Rate limit exceeded
            return NextResponse.json(
                {
                    success: false,
                    error: 'Too many requests',
                    message: 'Please try again later',
                },
                { status: 429 },
            );
        }

        // Increment count
        rateLimitInfo.count++;
        return null; // Continue
    };
}

export function validateContentType(request: NextRequest) {
    const contentType = request.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
        return NextResponse.json(
            {
                success: false,
                error: 'Invalid content type',
                message: 'Content-Type must be application/json',
            },
            { status: 400 },
        );
    }

    return null; // Continue
}

export function validateRequestSize(request: NextRequest) {
    const contentLength = request.headers.get('content-length');

    if (contentLength) {
        const size = parseInt(contentLength, 10);
        const maxSize = 1024 * 1024; // 1MB

        if (size > maxSize) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Request too large',
                    message: 'Request body must be less than 1MB',
                },
                { status: 413 },
            );
        }
    }

    return null; // Continue
}

export function corsHeaders() {
    return {
        'Access-Control-Allow-Origin':
            process.env.NODE_ENV === 'production'
                ? process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com'
                : '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
}

export function handleOptions(request: NextRequest) {
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: corsHeaders(),
        });
    }

    return null; // Continue
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
