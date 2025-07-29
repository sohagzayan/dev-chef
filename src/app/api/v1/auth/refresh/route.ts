import { NextResponse, type NextRequest } from 'next/server';
import { generateTokens, isRefreshTokenValid, verifyRefreshToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        // Get refresh token from cookies
        const refreshToken = request.cookies.get('devchef_refresh_token')?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { success: false, error: 'Refresh token not found' },
                { status: 401 },
            );
        }

        // Verify the refresh token
        const tokenPayload = verifyRefreshToken(refreshToken);
        if (!tokenPayload) {
            return NextResponse.json(
                { success: false, error: 'Invalid refresh token' },
                { status: 401 },
            );
        }

        // Check if refresh token is valid in database
        const isValid = await isRefreshTokenValid(refreshToken);
        if (!isValid) {
            return NextResponse.json(
                { success: false, error: 'Refresh token expired or revoked' },
                { status: 401 },
            );
        }

        // Get user from database
        const user = await prisma.user.findUnique({
            where: {
                id: tokenPayload.userId,
                isActive: true,
            },
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found or inactive' },
                { status: 401 },
            );
        }

        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        // Create response
        const response = NextResponse.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    isActive: user.isActive,
                },
                accessToken,
            },
            message: 'Token refreshed successfully',
        });

        // Set new cookies
        response.cookies.set('devchef_access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60, // 15 minutes
            path: '/',
        });

        response.cookies.set('devchef_refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Refresh token error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 },
        );
    }
}
