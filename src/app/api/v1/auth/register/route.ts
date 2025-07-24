import { NextResponse, type NextRequest } from 'next/server';
import { createApiResponse, handleApiError, rateLimit } from '@/lib/middleware/api.middleware';
import { AuthService } from '@/lib/services/auth.services';
import { registerSchema } from '@/lib/validations/auth.validations';

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const rateLimitResult = rateLimit(50, 60 * 60 * 1000)(request); // 3 requests per hour
        if (rateLimitResult) return rateLimitResult;

        const body = await request.json();
        const validatedData = registerSchema.parse(body);

        const result = await AuthService.register(validatedData);

        const response = NextResponse.json(
            createApiResponse(
                true,
                {
                    user: result.user,
                    accessToken: result.accessToken,
                },
                'Registration successful',
            ),
        );

        // Set refresh token cookie
        response.cookies.set('refreshToken', result.refreshToken, {
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
