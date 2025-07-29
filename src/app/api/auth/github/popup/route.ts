import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userType = searchParams.get('userType');

    if (!userType || !['developer', 'company'].includes(userType)) {
        return new NextResponse('Invalid user type', { status: 400 });
    }

    // Create the GitHub OAuth URL
    const redirectUri = encodeURIComponent(
        `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/api/auth/github/popup/callback?userType=${userType}`,
    );

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}&redirect_uri=${redirectUri}&scope=user:email&state=${userType}`;

    // Return HTML that will redirect to GitHub OAuth
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>GitHub Login</title>
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
                    background: linear-gradient(135deg, #24292e 0%, #1a1e22 100%);
                    color: white;
                }
                .container {
                    text-align: center;
                    padding: 2rem;
                }
                .spinner {
                    border: 3px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top: 3px solid white;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="spinner"></div>
                <h2>Redirecting to GitHub...</h2>
                <p>Please wait while we redirect you to GitHub for authentication.</p>
            </div>
            <script>
                // Redirect to GitHub OAuth
                window.location.href = '${githubAuthUrl}';
            </script>
        </body>
        </html>
    `;

    return new NextResponse(html, {
        headers: {
            'Content-Type': 'text/html',
        },
    });
}
