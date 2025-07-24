import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
    tokenType: 'access' | 'refresh';
}

export function generateAccessToken(payload: Omit<JWTPayload, 'tokenType'>) {
    return jwt.sign({ ...payload, tokenType: 'access' }, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
}

export function generateRefreshToken(payload: Omit<JWTPayload, 'tokenType'>) {
    return jwt.sign({ ...payload, tokenType: 'refresh' }, JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
}

export function verifyAccessToken(token: string): JWTPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        if (decoded.tokenType !== 'access') return null;
        return decoded;
    } catch {
        return null;
    }
}

export function verifyRefreshToken(token: string): JWTPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
        if (decoded.tokenType !== 'refresh') return null;
        return decoded;
    } catch {
        return null;
    }
}

export async function storeRefreshToken(userId: string, token: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.refreshToken.create({
        data: {
            token,
            userId,
            expiresAt,
        },
    });
}

export async function revokeRefreshToken(token: string) {
    await prisma.refreshToken.updateMany({
        where: { token },
        data: { revoked: true },
    });
}

export async function revokeAllUserRefreshTokens(userId: string) {
    await prisma.refreshToken.updateMany({
        where: { userId },
        data: { revoked: true },
    });
}

export async function isRefreshTokenValid(token: string): Promise<boolean> {
    const refreshToken = await prisma.refreshToken.findUnique({
        where: { token },
    });

    if (!refreshToken || refreshToken.revoked || refreshToken.expiresAt < new Date()) {
        return false;
    }

    return true;
}

// Use Web Crypto API instead of Node.js crypto
export function generateSecureToken(): string {
    if (typeof window !== 'undefined') {
        // Browser environment
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    } else {
        // Server environment - use a simple random string generator
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 64; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}

export async function generateTokens(user: { id: string; email: string; role: string }) {
    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await storeRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
}
