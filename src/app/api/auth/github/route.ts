import { NextResponse, type NextRequest } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';
import { generateTokens } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { githubToken, userInfo } = body;

        // Verify GitHub token (you should verify this with GitHub's API)
        // For now, we'll assume the token is valid and userInfo is correct

        const { email, name, avatar_url, id: githubId } = userInfo;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required from GitHub account' },
                { status: 400 },
            );
        }

        // Check if user exists
        let user = await prisma.user.findUnique({
            where: { email },
            include: { accounts: true },
        });

        if (user) {
            // Check if GitHub account is already linked
            const githubAccount = user.accounts.find(
                (account: any) => account.provider === 'github',
            );

            if (!githubAccount) {
                // Link GitHub account to existing user
                await prisma.account.create({
                    data: {
                        userId: user.id,
                        type: 'oauth',
                        provider: 'github',
                        providerAccountId: githubId.toString(),
                        access_token: githubToken,
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
                    image: avatar_url,
                    role: 'CANDIDATE', // Default to CANDIDATE role
                    emailVerified: new Date(),
                    accounts: {
                        create: {
                            type: 'oauth',
                            provider: 'github',
                            providerAccountId: githubId.toString(),
                            access_token: githubToken,
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
            message: 'GitHub authentication successful',
            user: {
                id: user.id,
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
        console.error('GitHub auth error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
