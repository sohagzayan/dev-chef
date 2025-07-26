import { NextResponse, type NextRequest } from 'next/server';
import { createApiResponse, handleApiError, rateLimit } from '@/lib/middleware/api.middleware';
import { AuthService } from '@/lib/services/auth.services';
import { setAuthCookies } from '@/lib/utils/cookies';
import { companyLoginSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
    try {
        // Rate limiting - 5 attempts per 15 minutes
        const rateLimitResult = rateLimit({ maxRequests: 5, windowMs: 15 * 60 * 1000 })(request);
        if (rateLimitResult) return rateLimitResult;

        const body = await request.json();
        const validatedData = companyLoginSchema.parse(body);

        // Attempt login - AuthService will validate user role
        const result = await AuthService.login(validatedData);

        // Verify user is a recruiter
        if (result.user.role !== 'RECRUITER') {
            return NextResponse.json(
                createApiResponse(
                    false,
                    null,
                    null,
                    'Access denied. Company login is for recruiters only.',
                ),
                { status: 403 },
            );
        }

        // Create response
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

        // Set secure cookies
        return setAuthCookies(
            response,
            result.accessToken,
            result.refreshToken,
            result.rememberMe,
            {
                id: result.user.id,
                email: result.user.email,
                role: result.user.role,
                profile: result.user.profile,
            },
        );
    } catch (error) {
        return handleApiError(error);
    }
}
