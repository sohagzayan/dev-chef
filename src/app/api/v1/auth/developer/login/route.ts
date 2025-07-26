import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { generateTokens } from '@/lib/jwt';
import {
    handleOptions,
    rateLimit,
    validateContentType,
    validateRequestSize,
} from '@/lib/middleware/api.middleware';
import { prisma } from '@/lib/prisma';
import { setAuthCookies } from '@/lib/utils/cookies';
import {
    AppError,
    createErrorResponse,
    createSuccessResponse,
    createValidationErrorResponse,
} from '@/lib/utils/error-handler';

// Enhanced validation schema for developer login
const developerLoginSchema = z.object({
    email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Apply middleware
        const optionsResponse = handleOptions(request);
        if (optionsResponse) return optionsResponse;

        const contentTypeResponse = validateContentType(request);
        if (contentTypeResponse) return contentTypeResponse;

        const sizeResponse = validateRequestSize(request);
        if (sizeResponse) return sizeResponse;

        const rateLimitResponse = rateLimit({ maxRequests: 10, windowMs: 15 * 60 * 1000 })(request);
        if (rateLimitResponse) return rateLimitResponse;

        // Parse and validate request body
        const body = await request.json();

        const validationResult = developerLoginSchema.safeParse(body);

        if (!validationResult.success) {
            const errors: Record<string, string[]> = {};

            validationResult.error.errors.forEach((error) => {
                const field = error.path.join('.');
                if (!errors[field]) {
                    errors[field] = [];
                }
                errors[field].push(error.message);
            });

            return createValidationErrorResponse(errors);
        }

        const { email, password, rememberMe = false } = validationResult.data;

        // Find user with profile
        const user = await prisma.user.findUnique({
            where: { email },
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

        if (!user || !user.password) {
            return createErrorResponse(
                new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS'),
            );
        }

        if (!user.isActive) {
            return createErrorResponse(
                new AppError(
                    'Account is deactivated. Please contact support.',
                    401,
                    'ACCOUNT_DEACTIVATED',
                ),
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return createErrorResponse(
                new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS'),
            );
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        // Generate authentication tokens
        const { accessToken, refreshToken } = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        // Format user response based on role
        const userResponse = {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            lastLoginAt: user.lastLoginAt?.toISOString(),
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            profile: user.candidateProfile || user.recruiterProfile || user.adminProfile,
        };

        // Create response with new tokens
        let response = createSuccessResponse(
            {
                user: userResponse,
                accessToken,
                refreshToken,
                rememberMe,
            },
            'Login successful! Welcome back!',
            200,
        );

        // Set cookies
        response = setAuthCookies(response, accessToken, refreshToken, rememberMe, userResponse);

        return response;
    } catch (error) {
        console.error('Developer login error:', error);
        return createErrorResponse(error);
    }
}
