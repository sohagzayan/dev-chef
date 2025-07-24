import { NextResponse, type NextRequest } from 'next/server';
import { createApiResponse, handleApiError, rateLimit } from '@/lib/middleware/api.middleware';
import { AuthService } from '@/lib/services/auth.services';
import { loginSchema } from '@/lib/validations/auth.validations';

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const rateLimitResult = rateLimit(5, 15 * 60 * 1000)(request); // 5 requests per 15 minutes
        if (rateLimitResult) return rateLimitResult;

        const body = await request.json();
        const validatedData = loginSchema.parse(body);

        const result = await AuthService.login(validatedData);

        const response = NextResponse.json(
            createApiResponse(
                true,
                {
                    user: result.user,
                    accessToken: result.accessToken,
                },
                'Login successful',
            ),
        );

        // Set refresh token cookie
        const maxAge = result.rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60;
        response.cookies.set('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge,
        });

        return response;
    } catch (error) {
        return handleApiError(error);
    }
}
