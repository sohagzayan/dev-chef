import { NextResponse } from 'next/server';
import { generateTokens } from '@/lib/jwt';

export async function GET() {
    try {
        console.log('Testing JWT generation...');
        console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
        console.log('JWT_REFRESH_SECRET exists:', !!process.env.JWT_REFRESH_SECRET);

        const testUser = {
            id: 'test-user-id',
            email: 'test@example.com',
            role: 'CANDIDATE',
        };

        const tokens = await generateTokens(testUser);

        return NextResponse.json({
            success: true,
            message: 'JWT generation works',
            hasAccessToken: !!tokens.accessToken,
            hasRefreshToken: !!tokens.refreshToken,
        });
    } catch (error) {
        console.error('JWT test error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 },
        );
    }
}
