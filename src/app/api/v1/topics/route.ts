import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const difficulty = searchParams.get('difficulty');
        const isActive = searchParams.get('isActive') !== 'false';

        // Build where clause
        const where: any = { isActive };

        if (type) {
            where.type = type;
        }

        if (difficulty) {
            where.difficulty = difficulty;
        }

        // Get topics with problem counts
        const topics = await prisma.topic.findMany({
            where,
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                difficulty: true,
                type: true,
                problemCount: true,
                tags: true,
                order: true,
                _count: {
                    select: {
                        problems: {
                            where: { isActive: true },
                        },
                    },
                },
            },
            orderBy: [{ order: 'asc' }, { name: 'asc' }],
        });

        // Calculate total problems per topic
        const topicsWithCounts = await Promise.all(
            topics.map(async (topic) => {
                const problemCount = await prisma.problem.count({
                    where: {
                        topicId: topic.id,
                        isActive: true,
                    },
                });

                return {
                    ...topic,
                    problemCount,
                    _count: undefined,
                };
            }),
        );

        // Get overall statistics
        const totalTopics = await prisma.topic.count({ where: { isActive: true } });
        const totalProblems = await prisma.problem.count({ where: { isActive: true } });

        // Get topic type statistics
        const topicTypeStats = await prisma.topic.groupBy({
            by: ['type'],
            where: { isActive: true },
            _count: {
                id: true,
            },
        });

        // Get difficulty statistics
        const difficultyStats = await prisma.topic.groupBy({
            by: ['difficulty'],
            where: { isActive: true },
            _count: {
                id: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: topicsWithCounts,
            stats: {
                totalTopics,
                totalProblems,
                topicTypes: topicTypeStats.map((stat) => ({
                    type: stat.type,
                    count: stat._count.id,
                })),
                difficulties: difficultyStats.map((stat) => ({
                    difficulty: stat.difficulty,
                    count: stat._count.id,
                })),
            },
        });
    } catch (error) {
        console.error('Error fetching topics:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch topics' },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, difficulty, type, tags, order } = body;

        // Validate required fields
        if (!name || !difficulty || !type) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 },
            );
        }

        // Create slug from name
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Check if topic already exists
        const existingTopic = await prisma.topic.findFirst({
            where: {
                OR: [{ name }, { slug }],
            },
        });

        if (existingTopic) {
            return NextResponse.json(
                { success: false, message: 'Topic with this name or slug already exists' },
                { status: 409 },
            );
        }

        const topic = await prisma.topic.create({
            data: {
                name,
                slug,
                description,
                difficulty,
                type,
                tags: tags || [],
                order: order || 0,
            },
        });

        return NextResponse.json(
            {
                success: true,
                data: topic,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error('Error creating topic:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create topic' },
            { status: 500 },
        );
    }
}
