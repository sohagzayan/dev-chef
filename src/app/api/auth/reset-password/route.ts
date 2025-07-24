import { NextResponse, type NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { revokeAllUserRefreshTokens } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Reset token is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain uppercase, lowercase, number and special character',
        ),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token, password } = resetPasswordSchema.parse(body);

        // Find valid reset token
        const passwordReset = await prisma.passwordReset.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!passwordReset || passwordReset.used || passwordReset.expiresAt < new Date()) {
            return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
        }

        // Check if user is active
        if (!passwordReset.user.isActive) {
            return NextResponse.json({ error: 'Account is deactivated' }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update user password and mark reset token as used
        await prisma.$transaction([
            prisma.user.update({
                where: { id: passwordReset.userId },
                data: { password: hashedPassword },
            }),
            prisma.passwordReset.update({
                where: { id: passwordReset.id },
                data: { used: true },
            }),
        ]);

        // Revoke all existing refresh tokens for security
        await revokeAllUserRefreshTokens(passwordReset.userId);

        return NextResponse.json({
            message: 'Password reset successfully',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 },
            );
        }

        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
