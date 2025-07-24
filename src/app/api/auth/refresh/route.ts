import { NextResponse, type NextRequest } from 'next/server';
import {
    generateTokens,
    isRefreshTokenValid,
    revokeRefreshToken,
    verifyRefreshToken,
} from '@/lib/jwt';
import { createApiResponse, handleApiError } from '@/lib/middleware/api.middleware';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/services/auth.services';

export async function POST(request: NextRequest) {
    try {
        const refreshToken = request.cookies.get('refreshToken')?.value;

        if (!refreshToken) {
            return NextResponse.json(
                createApiResponse(false, null, null, 'No refresh token provided'),
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

        // Check if token exists in database and is valid
        const isValid = await isRefreshTokenValid(refreshToken);
        if (!isValid) {
            return NextResponse.json(
                createApiResponse(false, null, null, 'Refresh token expired or revoked'),
                {
                    status: 401,
                },
            );
        }

        // Get user
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
        });

        if (!user || !user.isActive) {
            return NextResponse.json(
                createApiResponse(false, null, null, 'User not found or inactive'),
                { status: 401 },
            );
        }

        // Revoke old refresh token
        await revokeRefreshToken(refreshToken);

        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        // Get complete user data
        const completeUser = await AuthService.getUserById(user.id);

        const response = NextResponse.json(
            createApiResponse(
                true,
                {
                    accessToken,
                    user: completeUser,
                },
                'Token refreshed successfully',
            ),
        );

        // Set new refresh token cookie
        response.cookies.set('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return response;
    } catch (error) {
        return handleApiError(error);
    }
}
