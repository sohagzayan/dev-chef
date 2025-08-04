import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ topicId: string }> },
) {
    try {
        const { topicId } = await params;

        const topic = await prisma.topic.findUnique({
            where: { id: topicId },
            include: {
                _count: {
                    select: {
                        problems: {
                            where: { isActive: true },
                        },
                    },
                },
            },
        });

        if (!topic) {
            return NextResponse.json(
                { success: false, message: 'Topic not found' },
                { status: 404 },
            );
        }

        const transformedTopic = {
            id: topic.id,
            name: topic.name,
            slug: topic.slug,
            description: topic.description,
            difficulty: topic.difficulty,
            type: topic.type,
            problemCount: topic._count.problems,
            tags: topic.tags,
            isActive: topic.isActive,
            order: topic.order,
            createdAt: topic.createdAt,
            updatedAt: topic.updatedAt,
        };

        return NextResponse.json({
            success: true,
            data: transformedTopic,
        });
    } catch (error) {
        console.error('Error fetching topic:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch topic' },
            { status: 500 },
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ topicId: string }> },
) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { topicId } = await params;
        const body = await request.json();
        const { name, description, difficulty, type, tags, order, isActive } = body;

        // Check if topic exists
        const existingTopic = await prisma.topic.findUnique({
            where: { id: topicId },
        });

        if (!existingTopic) {
            return NextResponse.json(
                { success: false, message: 'Topic not found' },
                { status: 404 },
            );
        }

        // Check if new name/slug conflicts with existing topics
        if (name && name !== existingTopic.name) {
            const slug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            const conflictingTopic = await prisma.topic.findFirst({
                where: {
                    OR: [{ name }, { slug }],
                    NOT: {
                        id: topicId,
                    },
                },
            });

            if (conflictingTopic) {
                return NextResponse.json(
                    { success: false, message: 'Topic with this name or slug already exists' },
                    { status: 409 },
                );
            }
        }

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (difficulty !== undefined) updateData.difficulty = difficulty;
        if (type !== undefined) updateData.type = type;
        if (tags !== undefined) updateData.tags = tags;
        if (order !== undefined) updateData.order = order;
        if (isActive !== undefined) updateData.isActive = isActive;

        // Update slug if name changed
        if (name && name !== existingTopic.name) {
            updateData.slug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        const updatedTopic = await prisma.topic.update({
            where: { id: topicId },
            data: updateData,
        });

        return NextResponse.json({
            success: true,
            data: updatedTopic,
        });
    } catch (error) {
        console.error('Error updating topic:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update topic' },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ topicId: string }> },
) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { topicId } = await params;

        // Check if topic exists
        const existingTopic = await prisma.topic.findUnique({
            where: { id: topicId },
            include: {
                _count: {
                    select: {
                        problems: true,
                    },
                },
            },
        });

        if (!existingTopic) {
            return NextResponse.json(
                { success: false, message: 'Topic not found' },
                { status: 404 },
            );
        }

        // Check if topic has problems
        if (existingTopic._count.problems > 0) {
            return NextResponse.json(
                { success: false, message: 'Cannot delete topic with existing problems' },
                { status: 400 },
            );
        }

        await prisma.topic.delete({
            where: { id: topicId },
        });

        return NextResponse.json({
            success: true,
            message: 'Topic deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting topic:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete topic' },
            { status: 500 },
        );
    }
}
