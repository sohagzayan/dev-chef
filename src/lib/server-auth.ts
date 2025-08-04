import { cookies } from 'next/headers';
import { verifyAccessToken } from './jwt';
import { prisma } from './prisma';
import { COOKIE_CONFIG } from './utils/cookies';

export async function getServerAuth() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(COOKIE_CONFIG.accessToken.name)?.value;

        if (!accessToken) {
            return { user: null, isAuthenticated: false };
        }

        const tokenPayload = await verifyAccessToken(accessToken);
        if (!tokenPayload) {
            return { user: null, isAuthenticated: false };
        }

        // Get user data from database
        const user = await prisma.user.findUnique({
            where: { id: tokenPayload.userId },
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user || !user.isActive) {
            return { user: null, isAuthenticated: false };
        }

        return { user, isAuthenticated: true };
    } catch (error) {
        console.error('Server auth error:', error);
        return { user: null, isAuthenticated: false };
    }
}
