import { NextResponse } from 'next/server';
import { createApiResponse, handleApiError } from '@/lib/middleware/api.middleware';
import { clearAuthCookies } from '@/lib/utils/cookies';

export async function POST() {
    try {
        // Create response
        const response = NextResponse.json(createApiResponse(true, null, 'Logout successful'));

        // Clear all auth cookies
        return clearAuthCookies(response);
    } catch (error) {
        return handleApiError(error);
    }
}
