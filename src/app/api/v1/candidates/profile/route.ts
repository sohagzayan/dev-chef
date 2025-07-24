import { NextResponse, type NextRequest } from 'next/server';
import {
    authenticateRequest,
    createApiResponse,
    handleApiError,
    requireRole,
} from '@/lib/middleware/api.middleware';
import { prisma } from '@/lib/prisma';
import { updateCandidateProfileSchema } from '@/lib/validations/auth.validations';

export async function GET(request: NextRequest) {
    try {
        const authResult = await authenticateRequest(request);
        if (authResult instanceof NextResponse) return authResult;

        const { user } = authResult;

        // Check if user is candidate
        const roleCheck = await requireRole(['CANDIDATE'])(request, user);
        if (roleCheck) return roleCheck;

        return NextResponse.json(
            createApiResponse(
                true,
                { profile: user.candidateProfile },
                'Profile retrieved successfully',
            ),
        );
    } catch (error) {
        return handleApiError(error);
    }
}

export async function PUT(request: NextRequest) {
    try {
        const authResult = await authenticateRequest(request);
        if (authResult instanceof NextResponse) return authResult;

        const { user } = authResult;

        // Check if user is candidate
        const roleCheck = await requireRole(['CANDIDATE'])(request, user);
        if (roleCheck) return roleCheck;

        const body = await request.json();
        const validatedData = updateCandidateProfileSchema.parse(body);

        const updatedProfile = await prisma.candidateProfile.update({
            where: { userId: user.id },
            data: validatedData,
            include: {
                skills: true,
                experiences: true,
                educations: true,
            },
        });

        return NextResponse.json(
            createApiResponse(true, { profile: updatedProfile }, 'Profile updated successfully'),
        );
    } catch (error) {
        return handleApiError(error);
    }
}
