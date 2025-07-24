import { NextResponse, type NextRequest } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';
import { generateTokens } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { googleToken, userInfo } = body;

        // Verify Google token (you should verify this with Google's API)
        // For now, we'll assume the token is valid and userInfo is correct

        const { email, name, picture, sub: googleId } = userInfo;

        // Check if user exists
        let user = await prisma.user.findUnique({
            where: { email },
            include: { accounts: true },
        });

        if (user) {
            // Check if Google account is already linked
            const googleAccount = user.accounts.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (account: any) => account.provider === 'google',
            );

            if (!googleAccount) {
                // Link Google account to existing user
                await prisma.account.create({
                    data: {
                        userId: user.id,
                        type: 'oauth',
                        provider: 'google',
                        providerAccountId: googleId,
                        access_token: googleToken,
                    },
                });
            }

            // Update last login
            await prisma.user.update({
                where: { id: user.id },
                data: { lastLoginAt: new Date() },
            });
        } else {
            // Create new user
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    image: picture,
                    role: 'USER',
                    emailVerified: new Date(),
                    accounts: {
                        create: {
                            type: 'oauth',
                            provider: 'google',
                            providerAccountId: googleId,
                            access_token: googleToken,
                        },
                    },
                },
                include: { accounts: true },
            });

            // Send welcome email
            try {
                await sendWelcomeEmail(email, name || 'User');
            } catch (emailError) {
                console.error('Failed to send welcome email:', emailError);
            }
        }

        // Generate tokens
        const { accessToken, refreshToken } = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        const response = NextResponse.json({
            message: 'Google authentication successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image,
            },
            accessToken,
        });

        // Set refresh token cookie
        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return response;
    } catch (error) {
        console.error('Google auth error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
