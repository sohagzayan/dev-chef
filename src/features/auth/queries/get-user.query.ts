import { prisma } from '@/shared/lib/db/prisma';
import type { User } from '../types/auth.types';

export interface GetUserQueryResult {
    user: User | null;
    error?: string;
}

/**
 * Query to get user by ID
 * Server-side data fetching for user information
 */
export async function getUserById(userId: string): Promise<GetUserQueryResult> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });

        if (!user) {
            return {
                user: null,
                error: 'User not found',
            };
        }

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name || undefined,
                role: user.role as User['role'],
            },
        };
    } catch (error) {
        return {
            user: null,
            error: error instanceof Error ? error.message : 'Failed to fetch user',
        };
    }
}

/**
 * Query to get user by email
 */
export async function getUserByEmail(email: string): Promise<GetUserQueryResult> {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });

        if (!user) {
            return {
                user: null,
                error: 'User not found',
            };
        }

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name || undefined,
                role: user.role as User['role'],
            },
        };
    } catch (error) {
        return {
            user: null,
            error: error instanceof Error ? error.message : 'Failed to fetch user',
        };
    }
}
