import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { sendWelcomeEmail } from '@/lib/email';
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
    ErrorMessages,
} from '@/lib/utils/error-handler';

// Enhanced validation schema for developer registration
const developerRegisterSchema = z
    .object({
        fullName: z
            .string()
            .min(2, 'Full name must be at least 2 characters')
            .max(100, 'Full name must be less than 100 characters')
            .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
        email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number')
            .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
        confirmPassword: z.string(),
        agreeToTerms: z
            .boolean()
            .refine((val) => val === true, 'You must agree to the terms and conditions'),
        subscribeNewsletter: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })
    .refine(
        async (data) => {
            const existingUser = await prisma.user.findUnique({
                where: { email: data.email },
            });
            return !existingUser;
        },
        {
            message: 'An account with this email already exists',
            path: ['email'],
        },
    );

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Apply middleware
        const optionsResponse = handleOptions(request);
        if (optionsResponse) return optionsResponse;

        const contentTypeResponse = validateContentType(request);
        if (contentTypeResponse) return contentTypeResponse;

        const sizeResponse = validateRequestSize(request);
        if (sizeResponse) return sizeResponse;

        const rateLimitResponse = rateLimit({ maxRequests: 5, windowMs: 15 * 60 * 1000 })(request);
        if (rateLimitResponse) return rateLimitResponse;

        // Parse and validate request body
        const body = await request.json();

        const validationResult = await developerRegisterSchema.safeParseAsync(body);

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

        const { fullName, email, password } = validationResult.data;

        // Split full name into first and last name
        const nameParts = fullName.trim().split(/\s+/);
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || '';

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user and profile in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create base user
            const user = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: 'CANDIDATE',
                    isActive: true,
                },
            });

            // Create candidate profile
            const profile = await tx.candidateProfile.create({
                data: {
                    userId: user.id,
                    firstName,
                    lastName,
                    isOpenToWork: true,
                },
            });

            return { user, profile };
        });

        // Send welcome email (non-blocking)
        try {
            await sendWelcomeEmail(email, fullName);
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Don't fail the registration if email fails
        }

        // Generate authentication tokens
        const { accessToken, refreshToken } = await generateTokens({
            id: result.user.id,
            email: result.user.email,
            role: result.user.role,
        });

        // Get complete user data
        const completeUser = await prisma.user.findUnique({
            where: { id: result.user.id },
            include: {
                candidateProfile: {
                    include: {
                        skills: true,
                        experiences: true,
                        educations: true,
                    },
                },
            },
        });

        // Format response
        const userResponse = {
            id: completeUser!.id,
            email: completeUser!.email,
            role: completeUser!.role,
            isActive: completeUser!.isActive,
            lastLoginAt: completeUser!.lastLoginAt?.toISOString(),
            createdAt: completeUser!.createdAt.toISOString(),
            updatedAt: completeUser!.updatedAt.toISOString(),
            profile: completeUser!.candidateProfile,
        };

        // Create response with new tokens
        let response = createSuccessResponse(
            {
                user: userResponse,
                accessToken,
                refreshToken,
            },
            'Account created successfully! Welcome to DevChef!',
            201,
        );

        // Set cookies
        response = setAuthCookies(
            response,
            accessToken,
            refreshToken,
            false, // No remember me for registration
            userResponse,
        );

        return response;
    } catch (error) {
        console.error('Developer registration error:', error);

        // Handle specific database errors
        if (error instanceof Error) {
            if (error.message.includes('Unique constraint')) {
                return createErrorResponse(
                    new AppError(ErrorMessages.EMAIL_EXISTS, 409, 'EMAIL_EXISTS'),
                );
            }
        }

        return createErrorResponse(error);
    }
}
