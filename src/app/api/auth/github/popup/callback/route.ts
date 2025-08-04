import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';
import { generateTokens } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const userType = searchParams.get('userType');

    if (error) {
        return new NextResponse(
            renderErrorPage('Authentication was cancelled or failed. Please try again.'),
            {
                headers: {
                    'Content-Type': 'text/html',
                },
            },
        );
    }

    if (!code || !userType) {
        return new NextResponse(
            renderErrorPage('Invalid authentication response. Please try again.'),
            {
                headers: {
                    'Content-Type': 'text/html',
                },
            },
        );
    }

    try {
        // Exchange code for tokens
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_ID,
                client_secret: process.env.GITHUB_SECRET,
                code,
                redirect_uri: `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/api/auth/github/popup/callback?userType=${userType}`,
            }),
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to exchange code for tokens');
        }

        const tokenData = await tokenResponse.json();
        const { access_token } = tokenData;

        if (!access_token) {
            throw new Error('Failed to get access token from GitHub');
        }

        // Get user info from GitHub
        const userInfoResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        if (!userInfoResponse.ok) {
            throw new Error('Failed to get user info from GitHub');
        }

        const userInfo = await userInfoResponse.json();
        const { email, name, avatar_url, id: githubId } = userInfo;

        // If email is not public, get it from GitHub's email endpoint
        let userEmail = email;
        if (!userEmail) {
            const emailResponse = await fetch('https://api.github.com/user/emails', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            });

            if (emailResponse.ok) {
                const emails = await emailResponse.json();
                const primaryEmail = emails.find((email: any) => email.primary);
                userEmail = primaryEmail?.email;
            }
        }

        if (!userEmail) {
            return renderErrorPage(
                'Email is required from GitHub account. Please make sure your email is public or add it to your GitHub account.',
            );
        }

        // Check if user exists
        let user = await prisma.user.findUnique({
            where: { email: userEmail },
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
            // Create new user
            user = await prisma.user.create({
                data: {
                    email: userEmail,
                    image: avatar_url,
                    role: userType === 'company' ? 'RECRUITER' : 'CANDIDATE',
                    emailVerified: new Date(),
                    accounts: {
                        create: {
                            type: 'oauth',
                            provider: 'github',
                            providerAccountId: githubId.toString(),
                            access_token: access_token,
                        },
                    },
                },
                include: { accounts: true },
            });

            // Send welcome email
            try {
                await sendWelcomeEmail(userEmail, name || 'User');
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

        // Create response with cookies
        const response = new NextResponse(
            renderSuccessPage({
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    image: user.image,
                },
                accessToken,
                refreshToken,
            }),
            {
                headers: {
                    'Content-Type': 'text/html',
                },
            },
        );

        // Set HTTP-only cookies
        response.cookies.set('devchef_access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60, // 15 minutes
            path: '/',
        });

        response.cookies.set('devchef_refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        // Set user data cookie (non-httpOnly for client access)
        response.cookies.set(
            'devchef_user',
            JSON.stringify({
                id: user.id,
                email: user.email,
                role: user.role,
                image: user.image,
            }),
            {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: '/',
            },
        );

        return response;
    } catch (error) {
        console.error('GitHub popup auth error:', error);
        return new NextResponse(renderErrorPage('Authentication failed. Please try again.'), {
            headers: {
                'Content-Type': 'text/html',
            },
        });
    }
}

function renderSuccessPage(userData: any): string {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Authentication Successful</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                }
                .container {
                    text-align: center;
                    padding: 2rem;
                }
                .success-icon {
                    width: 60px;
                    height: 60px;
                    border: 3px solid white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    font-size: 24px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="success-icon">✓</div>
                <h2>Authentication Successful!</h2>
                <p>You have been successfully signed in. This window will close automatically.</p>
            </div>
            <script>
                // Send success message to parent window
                if (window.opener) {
                    window.opener.postMessage({
                        type: 'GITHUB_LOGIN_SUCCESS',
                        userData: ${JSON.stringify(userData)}
                    }, '${process.env.NEXTAUTH_URL || 'http://localhost:3001'}');
                    
                    // Close popup after a short delay
                    setTimeout(() => {
                        window.close();
                    }, 1000);
                } else {
                    // Fallback if no opener (shouldn't happen in popup)
                    window.location.href = '/';
                }
            </script>
        </body>
        </html>
    `;

    return html;
}

function renderErrorPage(errorMessage: string): string {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Authentication Failed</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    color: white;
                }
                .container {
                    text-align: center;
                    padding: 2rem;
                }
                .error-icon {
                    width: 60px;
                    height: 60px;
                    border: 3px solid white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    font-size: 24px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="error-icon">✕</div>
                <h2>Authentication Failed</h2>
                <p>${errorMessage}</p>
                <button onclick="window.close()" style="
                    background: white;
                    color: #dc2626;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 1rem;
                ">Close Window</button>
            </div>
            <script>
                // Send error message to parent window
                if (window.opener) {
                    window.opener.postMessage({
                        type: 'GITHUB_LOGIN_ERROR',
                        error: '${errorMessage}'
                    }, '${process.env.NEXTAUTH_URL || 'http://localhost:3001'}');
                }
            </script>
        </body>
        </html>
    `;

    return html;
}
