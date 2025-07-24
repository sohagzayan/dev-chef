import { NextResponse, type NextRequest } from 'next/server';
import { revokeAllUserRefreshTokens, revokeRefreshToken } from '@/lib/jwt';
import { authenticateRequest, createApiResponse } from '@/lib/middleware/api.middleware';

export async function POST(request: NextRequest) {
    try {
        const refreshToken = request.cookies.get('refreshToken')?.value;

        // Try to get user from access token for complete logout
        const authResult = await authenticateRequest(request);

        if (refreshToken) {
            await revokeRefreshToken(refreshToken);
        }

        // If we have user info, revoke all their tokens
        if (authResult && 'user' in authResult) {
            await revokeAllUserRefreshTokens(authResult.user.id);
        }

        const response = NextResponse.json(
            createApiResponse(true, null, 'Logged out successfully'),
        );

        // Clear refresh token cookie
        response.cookies.set('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
        });

        return response;
    } catch {
        // Even if there's an error, clear the cookie
        const response = NextResponse.json(createApiResponse(true, null, 'Logged out'));
        response.cookies.set('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
        });

        return response;
    }
}
