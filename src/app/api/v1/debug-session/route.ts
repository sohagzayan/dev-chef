import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        return NextResponse.json({
            success: true,
            session: {
                hasSession: !!session,
                hasUser: !!session?.user,
                userId: session?.user?.id,
                userEmail: session?.user?.email,
                userIdType: typeof session?.user?.id,
            },
            headers: {
                authorization: request.headers.get('authorization'),
                cookie: request.headers.get('cookie'),
            },
        });
    } catch (error) {
        console.error('Debug session error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to get session debug info' },
            { status: 500 },
        );
    }
}
