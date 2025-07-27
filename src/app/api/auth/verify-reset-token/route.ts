import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const verifyTokenSchema = z.object({
    token: z.string().min(1, 'Token is required'),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token } = verifyTokenSchema.parse(body);

        // Find the password reset record
        const passwordReset = await prisma.passwordReset.findUnique({
            where: { token },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        isActive: true,
                    },
                },
            },
        });

        // Check if token exists
        if (!passwordReset) {
            return NextResponse.json(
                {
                    error: 'Invalid reset token',
                    code: 'INVALID_TOKEN',
                },
                { status: 400 },
            );
        }

        // Check if token has been used
        if (passwordReset.used) {
            return NextResponse.json(
                {
                    error: 'This reset link has already been used',
                    code: 'TOKEN_USED',
                },
                { status: 400 },
            );
        }

        // Check if token has expired
        if (passwordReset.expiresAt < new Date()) {
            return NextResponse.json(
                {
                    error: 'Reset link has expired',
                    code: 'TOKEN_EXPIRED',
                },
                { status: 400 },
            );
        }

        // Check if user is active
        if (!passwordReset.user.isActive) {
            return NextResponse.json(
                {
                    error: 'This account has been deactivated',
                    code: 'ACCOUNT_DEACTIVATED',
                },
                { status: 400 },
            );
        }

        return NextResponse.json({
            message: 'Token is valid',
            success: true,
            email: passwordReset.user.email,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: 'Invalid token format',
                    code: 'VALIDATION_ERROR',
                },
                { status: 400 },
            );
        }

        console.error('Verify reset token error:', error);
        return NextResponse.json(
            {
                error: 'Something went wrong. Please try again later.',
                code: 'INTERNAL_ERROR',
            },
            { status: 500 },
        );
    }
}
