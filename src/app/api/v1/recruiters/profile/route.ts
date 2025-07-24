import { NextResponse, type NextRequest } from 'next/server';
import {
    authenticateRequest,
    createApiResponse,
    handleApiError,
    requireRole,
} from '@/lib/middleware/api.middleware';
import { prisma } from '@/lib/prisma';
import { updateRecruiterProfileSchema } from '@/lib/validations/auth.validations';

export async function GET(request: NextRequest) {
    try {
        const authResult = await authenticateRequest(request);
        if (authResult instanceof NextResponse) return authResult;

        const { user } = authResult;

        // Check if user is recruiter
        const roleCheck = await requireRole(['RECRUITER', 'ADMIN'])(request, user);
        if (roleCheck) return roleCheck;

        return NextResponse.json(
            createApiResponse(
                true,
                { profile: user.recruiterProfile },
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

        // Check if user is recruiter
        const roleCheck = await requireRole(['RECRUITER'])(request, user);
        if (roleCheck) return roleCheck;

        const body = await request.json();
        const validatedData = updateRecruiterProfileSchema.parse(body);

        const updatedProfile = await prisma.recruiterProfile.update({
            where: { userId: user.id },
            data: validatedData,
        });

        return NextResponse.json(
            createApiResponse(true, { profile: updatedProfile }, 'Profile updated successfully'),
        );
    } catch (error) {
        return handleApiError(error);
    }
}
