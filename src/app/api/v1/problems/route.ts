import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { COOKIE_CONFIG } from '@/lib/utils/cookies';

export async function GET(request: NextRequest) {
    try {
        // Get the access token from cookies
        const accessToken = request.cookies.get(COOKIE_CONFIG.accessToken.name)?.value;

        let userId: string | null = null;

        if (accessToken) {
            // Verify the token
            const tokenPayload = await verifyAccessToken(accessToken);
            if (tokenPayload) {
                userId = tokenPayload.userId;
            }
        }

        console.log('Session debug:', {
            hasToken: !!accessToken,
            hasUser: !!userId,
            userId: userId,
        });
        const { searchParams } = new URL(request.url);

        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const topicId = searchParams.get('topicId');
        const difficulty = searchParams.get('difficulty');
        const status = searchParams.get('status');
        const search = searchParams.get('search');
        const tags = searchParams.get('tags')?.split(',').filter(Boolean);
        const companyTags = searchParams.get('companyTags')?.split(',').filter(Boolean);

        const skip = (page - 1) * limit;

        // Build filter conditions
        const where: any = {
            isActive: true,
        };

        if (topicId) {
            where.topicId = topicId;
        }

        if (difficulty) {
            where.difficulty = difficulty;
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (tags && tags.length > 0) {
            where.tags = {
                hasSome: tags,
            };
        }

        if (companyTags && companyTags.length > 0) {
            where.companyTags = {
                hasSome: companyTags,
            };
        }

        // Add status filter to the main query if user is authenticated
        if (status && userId) {
            // For status filtering, we need to handle it differently for MongoDB
            // First, get the problem IDs that match the status
            const userProblemStatuses = await prisma.userProblemStatus.findMany({
                where: {
                    userId: userId,
                    status: status as any, // Type assertion for MongoDB compatibility
                },
                select: {
                    problemId: true,
                },
            });

            const problemIds = userProblemStatuses.map((ups) => ups.problemId);

            if (problemIds.length > 0) {
                where.id = { in: problemIds };
            } else {
                // No problems match this status, return empty result
                return NextResponse.json({
                    success: true,
                    data: [],
                    pagination: {
                        page,
                        limit,
                        total: 0,
                        totalPages: 0,
                        hasNext: false,
                        hasPrev: false,
                    },
                });
            }
        } else if (status && !userId) {
            // If user is not authenticated but status filter is applied, return empty results
            return NextResponse.json({
                success: true,
                data: [],
                pagination: {
                    page,
                    limit,
                    total: 0,
                    totalPages: 0,
                    hasNext: false,
                    hasPrev: false,
                },
            });
        }

        // Get problems with topic and user status
        const problems = await prisma.problem.findMany({
            where,
            include: {
                topic: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                userStatuses: userId
                    ? {
                          where: {
                              userId: userId,
                          },
                          select: {
                              status: true,
                              lastAttempted: true,
                              bestScore: true,
                              attempts: true,
                          },
                      }
                    : false,
            },
            orderBy: [{ order: 'asc' }, { title: 'asc' }],
            skip,
            take: limit,
        });

        // Get submission counts separately to avoid MongoDB count issues
        const problemIds = problems.map((p) => p.id);
        const submissionCounts = await prisma.submission.groupBy({
            by: ['problemId'],
            where: {
                problemId: { in: problemIds },
                status: 'ACCEPTED',
            },
            _count: {
                problemId: true,
            },
        });

        // Create a map of problemId to count
        const solvedCountMap = new Map(
            submissionCounts.map((item) => [item.problemId, item._count.problemId]),
        );

        // Get total count for pagination (with status filter applied)
        const total = await prisma.problem.count({ where });

        // Transform data to include user status and submission count
        const transformedProblems = problems.map((problem) => {
            const userStatus = problem.userStatuses?.[0];
            const solvedCount = solvedCountMap.get(problem.id) || 0; // Count of accepted submissions

            // Determine user status and solved status based on solvedBy array
            let userProblemStatus = 'UNSOLVED';
            let isSolved = false;
            console.log('userId', userId);
            if (userId) {
                // Debug logging to check the comparison
                console.log('Debug isSolved check:', {
                    userId: userId,
                    solvedBy: problem.solvedBy,
                    includes: problem.solvedBy.includes(userId),
                    userIdType: typeof userId,
                    solvedByTypes: problem.solvedBy.map((id) => typeof id),
                });

                // Convert both to strings for comparison to handle potential type mismatches
                const userIdString = userId.toString();
                isSolved = problem.solvedBy.some(
                    (solvedId) => solvedId.toString() === userIdString,
                );

                console.log('After conversion:', {
                    userIdString,
                    solvedByStrings: problem.solvedBy.map((id) => id.toString()),
                    isSolved,
                });
                if (isSolved) {
                    userProblemStatus = 'SOLVED';
                } else if (userStatus?.status === 'ATTEMPTED') {
                    userProblemStatus = 'ATTEMPTED';
                }
            }

            return {
                id: problem.id,
                title: problem.title,
                slug: problem.slug,
                description: problem.description,
                difficulty: problem.difficulty,
                tags: problem.tags,
                companyTags: problem.companyTags,
                timeLimit: problem.timeLimit,
                memoryLimit: problem.memoryLimit,
                successRate: problem.successRate,
                score: problem.score,
                topic: problem.topic,
                status: userProblemStatus,
                isSolved, // New field: boolean indicating if current user solved this problem
                lastAttempted: userStatus?.lastAttempted,
                bestScore: userStatus?.bestScore,
                attempts: userStatus?.attempts || 0,
                submissionCount: solvedCount,
                isActive: problem.isActive,
                order: problem.order,
                createdAt: problem.createdAt,
                updatedAt: problem.updatedAt,
                // Additional properties for UI compatibility
                maxScore: problem.score,
                solvedBy: problem.solvedBy, // Array of user IDs who solved this problem
                solvedCount: problem.solvedBy.length, // Count for backward compatibility
                companies: problem.companyTags,
                estimatedTime: `${Math.ceil(problem.timeLimit / 1000)}s`,
            };
        });

        return NextResponse.json({
            success: true,
            data: transformedProblems,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1,
            },
        });
    } catch (error) {
        console.error('Error fetching problems:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch problems' },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Get the access token from cookies
        const accessToken = request.cookies.get(COOKIE_CONFIG.accessToken.name)?.value;

        if (!accessToken) {
            return NextResponse.json(
                { success: false, message: 'No token provided' },
                { status: 401 },
            );
        }

        // Verify the token
        const tokenPayload = await verifyAccessToken(accessToken);
        if (!tokenPayload) {
            return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
        }

        // Check if user is admin
        const user = await prisma.user.findUnique({
            where: { id: tokenPayload.userId },
        });

        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const {
            topicId,
            title,
            description,
            difficulty,
            tags,
            companyTags,
            timeLimit,
            memoryLimit,
            score,
            order,
        } = body;

        // Validate required fields
        if (!topicId || !title || !description || !difficulty) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 },
            );
        }

        // Check if topic exists
        const topic = await prisma.topic.findUnique({
            where: { id: topicId },
        });

        if (!topic) {
            return NextResponse.json(
                { success: false, message: 'Topic not found' },
                { status: 404 },
            );
        }

        // Create slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Check if problem already exists
        const existingProblem = await prisma.problem.findFirst({
            where: {
                OR: [{ title }, { slug }],
            },
        });

        if (existingProblem) {
            return NextResponse.json(
                { success: false, message: 'Problem with this title or slug already exists' },
                { status: 409 },
            );
        }

        const problem = await prisma.problem.create({
            data: {
                topicId,
                title,
                slug,
                description,
                difficulty,
                tags: tags || [],
                companyTags: companyTags || [],
                timeLimit: timeLimit || 3000,
                memoryLimit: memoryLimit || 256,
                score: score || 0,
                order: order || 0,
            },
            include: {
                topic: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });

        return NextResponse.json(
            {
                success: true,
                data: problem,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error('Error creating problem:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create problem' },
            { status: 500 },
        );
    }
}
