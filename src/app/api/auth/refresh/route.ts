import { NextResponse, type NextRequest } from 'next/server';
import { generateTokens, isRefreshTokenValid, verifyRefreshToken } from '@/lib/jwt';
import { createApiResponse, handleApiError } from '@/lib/middleware/api.middleware';
import { prisma } from '@/lib/prisma';
import { ServerCookies } from '@/lib/utils/cookies';

export async function POST(request: NextRequest) {
    try {
        // Get refresh token from cookie
        const refreshToken = ServerCookies.getRefreshToken(request);

        if (!refreshToken) {
            return NextResponse.json(
                createApiResponse(false, null, null, 'Refresh token not found'),
                { status: 401 },
            );
        }

        // Verify refresh token
        const payload = verifyRefreshToken(refreshToken);
        if (!payload) {
            return NextResponse.json(
                createApiResponse(false, null, null, 'Invalid refresh token'),
                { status: 401 },
            );
        }

        // Check if refresh token is valid in database
        const isValid = await isRefreshTokenValid(refreshToken);
        if (!isValid) {
            return NextResponse.json(
                createApiResponse(false, null, null, 'Refresh token expired or revoked'),
                { status: 401 },
            );
        }

        // Get user to ensure they still exist and are active
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            include: {
                candidateProfile: true,
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

        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        // Format user response
        const authenticatedUser = {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            lastLoginAt: user.lastLoginAt?.toISOString(),
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            profile: user.candidateProfile || user.recruiterProfile || user.adminProfile,
        };

        // Create response
        const response = NextResponse.json(
            createApiResponse(
                true,
                {
                    user: authenticatedUser,
                    accessToken,
                },
                'Token refreshed successfully',
            ),
        );

        // Set new secure cookies
        response.cookies.set('devchef_access_token', accessToken, {
            maxAge: 15 * 60, // 15 minutes
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        response.cookies.set('devchef_refresh_token', newRefreshToken, {
            maxAge: 7 * 24 * 60 * 60, // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return response;
    } catch (error) {
        return handleApiError(error);
    }
}
