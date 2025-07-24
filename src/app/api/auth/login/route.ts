import { NextResponse, type NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { generateTokens, revokeAllUserRefreshTokens } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, rememberMe } = loginSchema.parse(body);

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Check if user is active
        if (!user.isActive) {
            return NextResponse.json({ error: 'Account is deactivated' }, { status: 401 });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Revoke all existing refresh tokens for security
        await revokeAllUserRefreshTokens(user.id);

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        // Generate new tokens
        const { accessToken, refreshToken } = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            company: user.company,
            lastLoginAt: user.lastLoginAt,
        };

        const response = NextResponse.json({
            message: 'Login successful',
            user: userResponse,
            accessToken,
        });

        // Set refresh token cookie
        const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60; // 30 days or 7 days
        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge,
        });

        return response;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 },
            );
        }

        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
