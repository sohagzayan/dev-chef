import bcrypt from 'bcryptjs';
import { prisma } from '@/shared/lib/db/prisma';
import type { LoginCredentials, SignupData } from '../types/auth.types';

export interface AuthServiceResult {
    success: boolean;
    error?: string;
    user?: {
        id: string;
        email: string;
        name?: string;
    };
}

/**
 * Authentication services
 * Handle authentication business logic
 */

export async function authenticateUser(credentials: LoginCredentials): Promise<AuthServiceResult> {
    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: credentials.email },
        });

        if (!user) {
            return {
                success: false,
                error: 'Invalid email or password',
            };
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
            return {
                success: false,
                error: 'Invalid email or password',
            };
        }

        // TODO: Create session/token here
        // For now, return user info
        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name || undefined,
            },
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Authentication failed',
        };
    }
}

export async function createUser(data: SignupData): Promise<AuthServiceResult> {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            return {
                success: false,
                error: 'User with this email already exists',
            };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                role: data.role || 'CANDIDATE',
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name || undefined,
            },
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create user',
        };
    }
}

export async function logoutUser(userId: string): Promise<{ success: boolean }> {
    try {
        // TODO: Implement logout logic
        // - Invalidate session
        // - Clear tokens
        // - Update user session status

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
}
