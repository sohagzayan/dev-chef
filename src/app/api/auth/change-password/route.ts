import { NextResponse, type NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { authMiddleware } from '@/lib/auth-middleware';
import { generateTokens, revokeAllUserRefreshTokens } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain uppercase, lowercase, number and special character',
        ),
});

export async function POST(request: NextRequest) {
    try {
        // Authenticate user
        const authResult = await authMiddleware(request);
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const { user } = authResult;

        const body = await request.json();
        const { currentPassword, newPassword } = changePasswordSchema.parse(body);

        // Get user with password
        const userWithPassword = await prisma.user.findUnique({
            where: { id: user.id },
        });

        if (!userWithPassword || !userWithPassword.password) {
            return NextResponse.json(
                { error: 'User not found or no password set' },
                { status: 400 },
            );
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(
            currentPassword,
            userWithPassword.password,
        );

        if (!isCurrentPasswordValid) {
            return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
        }

        // Check if new password is different
        const isSamePassword = await bcrypt.compare(newPassword, userWithPassword.password);
        if (isSamePassword) {
            return NextResponse.json(
                { error: 'New password must be different from current password' },
                { status: 400 },
            );
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        // Update password
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedNewPassword },
        });

        // Revoke all existing refresh tokens for security
        await revokeAllUserRefreshTokens(user.id);

        // Generate new tokens
        const { accessToken, refreshToken } = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        const response = NextResponse.json({
            message: 'Password changed successfully',
            accessToken,
        });

        // Set new refresh token cookie
        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return response;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 },
            );
        }

        console.error('Change password error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
