import { NextResponse, type NextRequest } from 'next/server';
import { revokeRefreshToken } from '@/lib/jwt';
import { createApiResponse, handleApiError } from '@/lib/middleware/api.middleware';
import { ServerCookies } from '@/lib/utils/cookies';

export async function POST(request: NextRequest) {
    try {
        // Get refresh token from cookie
        const refreshToken = ServerCookies.getRefreshToken(request);

        // Revoke refresh token if it exists
        if (refreshToken) {
            await revokeRefreshToken(refreshToken);
        }

        // Create response
        const response = NextResponse.json(
            createApiResponse(true, null, 'Logged out successfully'),
        );

        // Clear all auth cookies
        return ServerCookies.clearAuthCookies(response);
    } catch (error) {
        return handleApiError(error);
    }
}
