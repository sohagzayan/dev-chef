import { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { COOKIE_CONFIG } from '@/lib/utils/cookies';
import { createErrorResponse, createSuccessResponse } from '@/lib/utils/error-handler';

export async function GET(request: NextRequest) {
    try {
        // Get the access token from cookies
        const accessToken = request.cookies.get(COOKIE_CONFIG.accessToken.name)?.value;

        if (!accessToken) {
            return createErrorResponse(new Error('No token provided'));
        }

        // Verify the token
        const tokenPayload = await verifyAccessToken(accessToken);
        if (!tokenPayload) {
            return createErrorResponse(new Error('Invalid token'));
        }

        // Get user data from database
        const user = await prisma.user.findUnique({
            where: { id: tokenPayload.userId },
            include: {
                candidateProfile: {
                    include: {
                        skills: true,
                        experiences: true,
                        educations: true,
                    },
                },
                recruiterProfile: true,
                adminProfile: true,
            },
        });

        if (!user || !user.isActive) {
            return createErrorResponse(new Error('User not found or inactive'));
        }

        // Format user response
        const userResponse = {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            lastLoginAt: user.lastLoginAt?.toISOString(),
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            profile: user.candidateProfile || user.recruiterProfile || user.adminProfile,
        };

        return createSuccessResponse({ user: userResponse }, 'Authentication successful', 200);
    } catch (error) {
        console.error('Auth me error:', error);
        return createErrorResponse(error);
    }
}
