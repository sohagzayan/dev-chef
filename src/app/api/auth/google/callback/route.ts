import { NextResponse, type NextRequest } from 'next/server';
import { generateTokens } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        console.log('Google callback route called');

        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        const userType = searchParams.get('userType') || 'developer';
        const error = searchParams.get('error');

        console.log('Callback parameters:', {
            code: code ? 'present' : 'missing',
            userType,
            error,
        });

        // Check environment variables
        if (!process.env.GOOGLE_CLIENT_ID) {
            console.error('GOOGLE_CLIENT_ID is not set');
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/developers/login?error=Google OAuth not configured`,
            );
        }

        if (!process.env.GOOGLE_CLIENT_SECRET) {
            console.error('GOOGLE_CLIENT_SECRET is not set');
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/developers/login?error=Google OAuth not configured`,
            );
        }

        if (error) {
            console.error('Google OAuth error:', error);
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/developers/login?error=Google authentication failed`,
            );
        }

        if (!code) {
            console.error('No authorization code received');
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/developers/login?error=No authorization code received`,
            );
        }

        console.log('Exchanging authorization code for access token...');

        // Exchange code for access token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/google/callback?userType=${userType}`,
                grant_type: 'authorization_code',
            }),
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error('Token exchange failed:', errorText);
            console.error('Response status:', tokenResponse.status);
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/developers/login?error=Failed to exchange authorization code: ${tokenResponse.status}`,
            );
        }

        const tokenData = await tokenResponse.json();
        const { access_token } = tokenData;

        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!userInfoResponse.ok) {
            console.error('Failed to get user info:', await userInfoResponse.text());
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/developers/login?error=Failed to get user information`,
            );
        }

        const userInfo = await userInfoResponse.json();
        const { email, name, picture, id: googleId } = userInfo;

        console.log('User info from Google:', {
            email,
            name: name ? 'present' : 'missing',
            picture: picture ? 'present' : 'missing',
            googleId,
        });

        // Check if user exists
        let user = await prisma.user.findUnique({
            where: { email },
            include: { accounts: true },
        });

        console.log('Existing user found:', user ? 'yes' : 'no');

        if (user) {
            // Check if Google account is already linked
            const googleAccount = user.accounts.find(
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
                        access_token: access_token,
                    },
                });
            }

            // Update last login
            await prisma.user.update({
                where: { id: user.id },
                data: { lastLoginAt: new Date() },
            });
        } else {
            console.log('Creating new user...');
            // Create new user
            const role = userType === 'company' ? 'RECRUITER' : 'CANDIDATE';

            try {
                user = await prisma.user.create({
                    data: {
                        email,
                        image: picture,
                        role,
                        emailVerified: new Date(),
                        isActive: true,
                        accounts: {
                            create: {
                                type: 'oauth',
                                provider: 'google',
                                providerAccountId: googleId,
                                access_token: access_token,
                            },
                        },
                    },
                    include: { accounts: true },
                });

                console.log('User created successfully:', user.id);

                // Create profile based on user type (commented out for now to debug)
                /*
                if (role === 'RECRUITER') {
                    await prisma.recruiterProfile.create({
                        data: {
                            userId: user.id,
                            firstName: name?.split(' ')[0] || '',
                            lastName: name?.split(' ').slice(1).join(' ') || '',
                            companyName: 'Company', // Default value, user can update later
                        },
                    });
                    console.log('Recruiter profile created');
                } else {
                    await prisma.candidateProfile.create({
                        data: {
                            userId: user.id,
                            firstName: name?.split(' ')[0] || '',
                            lastName: name?.split(' ').slice(1).join(' ') || '',
                        },
                    });
                    console.log('Candidate profile created');
                }
                */
                console.log('Profile creation skipped for debugging');

                // Send welcome email (commented out for debugging)
                /*
                try {
                    await sendWelcomeEmail(email, name || 'User');
                } catch (emailError) {
                    console.error('Failed to send welcome email:', emailError);
                }
                */
                console.log('Welcome email skipped for debugging');
            } catch (userCreationError) {
                console.error('Error creating user:', userCreationError);
                throw userCreationError;
            }
        }

        // Ensure user exists
        if (!user) {
            throw new Error('Failed to create or retrieve user');
        }

        console.log('Generating tokens...');

        // Generate tokens
        const { accessToken, refreshToken } = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        console.log('Tokens generated successfully');

        // Create response with redirect
        const response = NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/developers/login?success=true&googleLogin=true&userId=${user.id}`,
        );

        // Set refresh token cookie
        response.cookies.set('devchef_refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        // Set access token cookie
        response.cookies.set('devchef_access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60, // 15 minutes
            path: '/',
        });

        console.log('Response created, redirecting...');
        return response;
    } catch (error) {
        console.error('Google callback error:', error);
        console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
        });
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/developers/login?error=Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}
