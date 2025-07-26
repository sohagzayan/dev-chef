import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { sendPasswordResetEmail } from '@/lib/email';
import { generateSecureToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
    userType: z.enum(['candidate', 'recruiter']).optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, userType } = forgotPasswordSchema.parse(body);

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Check if user exists
        if (!user) {
            return NextResponse.json(
                {
                    error: 'No account found with this email address',
                    code: 'USER_NOT_FOUND',
                },
                { status: 404 },
            );
        }

        // Check if user is active
        if (!user.isActive) {
            return NextResponse.json(
                {
                    error: 'This account has been deactivated. Please contact support.',
                    code: 'ACCOUNT_DEACTIVATED',
                },
                { status: 403 },
            );
        }

        // Validate user type if provided
        if (userType) {
            const expectedRole = userType === 'candidate' ? 'CANDIDATE' : 'RECRUITER';
            if (user.role !== expectedRole) {
                return NextResponse.json(
                    {
                        error: `This email is registered as a ${user.role.toLowerCase()}. Please use the correct account type.`,
                        code: 'WRONG_USER_TYPE',
                        actualRole: user.role.toLowerCase(),
                    },
                    { status: 400 },
                );
            }
        }

        // Check if user has too many recent reset attempts (rate limiting)
        const recentResets = await prisma.passwordReset.count({
            where: {
                userId: user.id,
                createdAt: {
                    gte: new Date(Date.now() - 15 * 60 * 1000), // Last 15 minutes
                },
            },
        });

        if (recentResets >= 3) {
            return NextResponse.json(
                {
                    error: 'Too many reset attempts. Please wait 15 minutes before trying again.',
                    code: 'RATE_LIMITED',
                },
                { status: 429 },
            );
        }

        // Invalidate any existing password reset tokens
        await prisma.passwordReset.updateMany({
            where: {
                userId: user.id,
                used: false,
                expiresAt: { gt: new Date() },
            },
            data: { used: true },
        });

        // Generate reset token
        const resetToken = generateSecureToken();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

        // Store reset token
        await prisma.passwordReset.create({
            data: {
                email: user.email,
                token: resetToken,
                expiresAt,
                userId: user.id,
            },
        });

        // Send reset email using nodemailer
        try {
            await sendPasswordResetEmail(user.email, resetToken);
            console.log(`Password reset email sent successfully to: ${user.email}`);
        } catch (emailError) {
            console.error('Failed to send password reset email:', emailError);
            return NextResponse.json(
                {
                    error: 'Failed to send reset email. Please try again later.',
                    code: 'EMAIL_SEND_FAILED',
                },
                { status: 500 },
            );
        }

        return NextResponse.json({
            message: 'Password reset link sent successfully',
            success: true,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: 'Invalid email format. Please enter a valid email address.',
                    code: 'VALIDATION_ERROR',
                },
                { status: 400 },
            );
        }

        console.error('Forgot password error:', error);
        return NextResponse.json(
            {
                error: 'Something went wrong. Please try again later.',
                code: 'INTERNAL_ERROR',
            },
            { status: 500 },
        );
    }
}
