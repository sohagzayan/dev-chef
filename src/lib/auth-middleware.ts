import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccessToken } from './jwt';
import { prisma } from './prisma';

export async function authMiddleware(request: NextRequest) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user still exists and is active
    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
    });

    if (!user || !user.isActive) {
        return NextResponse.json({ error: 'User not found or inactive' }, { status: 401 });
    }

    return { user, payload };
}

export function requireRole(allowedRoles: string[]) {
     
    return async (request: NextRequest, user: any) => {
        if (!allowedRoles.includes(user.role)) {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
        }
        return null;
    };
}
