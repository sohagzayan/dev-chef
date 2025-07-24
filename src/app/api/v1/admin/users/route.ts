import { NextResponse, type NextRequest } from 'next/server';
import {
    authenticateRequest,
    createApiResponse,
    handleApiError,
    requireRole,
} from '@/lib/middleware/api.middleware';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const authResult = await authenticateRequest(request);
        if (authResult instanceof NextResponse) return authResult;

        const { user } = authResult;

        // Check if user is admin
        const roleCheck = await requireRole(['ADMIN'])(request, user);
        if (roleCheck) return roleCheck;

        const { searchParams } = new URL(request.url);
        const page = Number.parseInt(searchParams.get('page') || '1');
        const limit = Number.parseInt(searchParams.get('limit') || '10');
        const role = searchParams.get('role');
        const search = searchParams.get('search');

        const skip = (page - 1) * limit;

        // Build where clause
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const where: any = {};
        if (role) where.role = role;
        if (search) {
            where.OR = [
                { email: { contains: search, mode: 'insensitive' } },
                { candidateProfile: { firstName: { contains: search, mode: 'insensitive' } } },
                { candidateProfile: { lastName: { contains: search, mode: 'insensitive' } } },
                { recruiterProfile: { firstName: { contains: search, mode: 'insensitive' } } },
                { recruiterProfile: { lastName: { contains: search, mode: 'insensitive' } } },
            ];
        }

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: limit,
                include: {
                    candidateProfile: true,
                    recruiterProfile: true,
                    adminProfile: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.user.count({ where }),
        ]);

        return NextResponse.json(
            createApiResponse(
                true,
                { users },
                'Users retrieved successfully',
                undefined,
                undefined,
                {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            ),
        );
    } catch (error) {
        return handleApiError(error);
    }
}
