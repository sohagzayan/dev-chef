import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { authMiddleware } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';

const updateProfileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
});

export async function GET(request: NextRequest) {
    try {
        const authResult = await authMiddleware(request);

        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const { user } = authResult;

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const authResult = await authMiddleware(request);

        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const { user } = authResult;

        const body = await request.json();
        const validatedData = updateProfileSchema.parse(body);

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: validatedData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                company: true,
                image: true,
                lastLoginAt: true,
                createdAt: true,
            },
        });

        return NextResponse.json({
            message: 'Profile updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 },
            );
        }

        console.error('Update profile error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
