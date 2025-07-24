import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { sendPasswordResetEmail } from '@/lib/email';
import { generateSecureToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = forgotPasswordSchema.parse(body);

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Always return success to prevent email enumeration
        if (!user) {
            return NextResponse.json({
                message: 'If an account with that email exists, we sent a password reset link',
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return NextResponse.json({
                message: 'If an account with that email exists, we sent a password reset link',
            });
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

        // Send reset email
        try {
            await sendPasswordResetEmail(user.email, resetToken);
        } catch (emailError) {
            console.error('Failed to send password reset email:', emailError);
            return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 });
        }

        return NextResponse.json({
            message: 'If an account with that email exists, we sent a password reset link',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 },
            );
        }

        console.error('Forgot password error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
