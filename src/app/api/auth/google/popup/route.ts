import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userType = searchParams.get('userType');

    if (!userType || !['developer', 'company'].includes(userType)) {
        return new NextResponse('Invalid user type', { status: 400 });
    }

    // Create the Google OAuth URL
    const redirectUri = encodeURIComponent(
        `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/api/auth/google/popup/callback?userType=${userType}`,
    );

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email profile&access_type=offline&prompt=consent`;

    // Return HTML that will redirect to Google OAuth
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Google Login</title>
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
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
                <h2>Redirecting to Google...</h2>
                <p>Please wait while we redirect you to Google for authentication.</p>
            </div>
            <script>
                // Redirect to Google OAuth
                window.location.href = '${googleAuthUrl}';
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
