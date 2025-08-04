import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ problemId: string }> },
) {
    try {
        const session = await auth();
        const { problemId } = await params;

        if (!problemId) {
            return NextResponse.json(
                { success: false, message: 'Problem ID is required' },
                { status: 400 },
            );
        }

        const problem = await prisma.problem.findUnique({
            where: { id: problemId },
            include: {
                topic: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                testCases: {
                    select: {
                        id: true,
                        input: true,
                        output: true,
                        isHidden: true,
                        order: true,
                    },
                    orderBy: { order: 'asc' },
                },
                solutions: {
                    select: {
                        id: true,
                        language: true,
                        code: true,
                        isOfficial: true,
                    },
                },
                userStatuses: session?.user?.id
                    ? {
                          where: {
                              userId: session.user.id,
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
        });

        if (!problem) {
            return NextResponse.json(
                { success: false, message: 'Problem not found' },
                { status: 404 },
            );
        }

        // Get submission count
        const submissionCount = await prisma.submission.count({
            where: {
                problemId,
                status: 'ACCEPTED',
            },
        });

        // Determine user status based on solvedBy array
        let userProblemStatus = 'UNSOLVED';
        if (session?.user?.id) {
            if (problem.solvedBy.includes(session.user.id)) {
                userProblemStatus = 'SOLVED';
            } else {
                const userStatus = problem.userStatuses?.[0];
                if (userStatus?.status === 'ATTEMPTED') {
                    userProblemStatus = 'ATTEMPTED';
                }
            }
        }

        const transformedProblem = {
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
            lastAttempted: problem.userStatuses?.[0]?.lastAttempted,
            bestScore: problem.userStatuses?.[0]?.bestScore,
            attempts: problem.userStatuses?.[0]?.attempts || 0,
            submissionCount,
            isActive: problem.isActive,
            order: problem.order,
            createdAt: problem.createdAt,
            updatedAt: problem.updatedAt,
            testCases: problem.testCases,
            solutions: problem.solutions,
            // Additional properties for UI compatibility
            maxScore: problem.score,
            solvedBy: problem.solvedBy, // Array of user IDs who solved this problem
            solvedCount: problem.solvedBy.length, // Count for backward compatibility
            companies: problem.companyTags,
            estimatedTime: `${Math.ceil(problem.timeLimit / 1000)}s`,
        };

        console.log(
            `Problem ${problemId} - User attempts: ${transformedProblem.attempts}, User status: ${userProblemStatus}`,
        );

        return NextResponse.json({
            success: true,
            data: transformedProblem,
        });
    } catch (error) {
        console.error('Error fetching problem:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch problem' },
            { status: 500 },
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ problemId: string }> },
) {
    try {
        const session = await auth();
        const { problemId } = await params;

        if (!session?.user?.id) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        if (!problemId) {
            return NextResponse.json(
                { success: false, message: 'Problem ID is required' },
                { status: 400 },
            );
        }

        const body = await request.json();
        const { action } = body;

        if (action === 'markSolved') {
            // Add user to solvedBy array if not already there
            const problem = await prisma.problem.findUnique({
                where: { id: problemId },
                select: { solvedBy: true },
            });

            if (!problem) {
                return NextResponse.json(
                    { success: false, message: 'Problem not found' },
                    { status: 404 },
                );
            }

            if (!problem.solvedBy.includes(session.user.id)) {
                await prisma.problem.update({
                    where: { id: problemId },
                    data: {
                        solvedBy: {
                            push: session.user.id,
                        },
                    },
                });
            }

            return NextResponse.json({
                success: true,
                message: 'Problem marked as solved',
            });
        }

        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Error updating problem:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update problem' },
            { status: 500 },
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ problemId: string }> },
) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { problemId } = await params;
        const body = await request.json();
        const {
            title,
            description,
            difficulty,
            tags,
            companyTags,
            timeLimit,
            memoryLimit,
            score,
            order,
            isActive,
        } = body;

        // Check if problem exists
        const existingProblem = await prisma.problem.findUnique({
            where: { id: problemId },
        });

        if (!existingProblem) {
            return NextResponse.json(
                { success: false, message: 'Problem not found' },
                { status: 404 },
            );
        }

        // Check if new title/slug conflicts with existing problems
        if (title && title !== existingProblem.title) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            const conflictingProblem = await prisma.problem.findFirst({
                where: {
                    OR: [{ title }, { slug }],
                    NOT: {
                        id: problemId,
                    },
                },
            });

            if (conflictingProblem) {
                return NextResponse.json(
                    { success: false, message: 'Problem with this title or slug already exists' },
                    { status: 409 },
                );
            }
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (difficulty !== undefined) updateData.difficulty = difficulty;
        if (tags !== undefined) updateData.tags = tags;
        if (companyTags !== undefined) updateData.companyTags = companyTags;
        if (timeLimit !== undefined) updateData.timeLimit = timeLimit;
        if (memoryLimit !== undefined) updateData.memoryLimit = memoryLimit;
        if (score !== undefined) updateData.score = score;
        if (order !== undefined) updateData.order = order;
        if (isActive !== undefined) updateData.isActive = isActive;

        // Update slug if title changed
        if (title && title !== existingProblem.title) {
            updateData.slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        const updatedProblem = await prisma.problem.update({
            where: { id: problemId },
            data: updateData,
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

        return NextResponse.json({
            success: true,
            data: updatedProblem,
        });
    } catch (error) {
        console.error('Error updating problem:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update problem' },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ problemId: string }> },
) {
    try {
        const session = await auth();

        if (!session?.user || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { problemId } = await params;

        // Check if problem exists
        const existingProblem = await prisma.problem.findUnique({
            where: { id: problemId },
            include: {
                _count: {
                    select: {
                        submissions: true,
                    },
                },
            },
        });

        if (!existingProblem) {
            return NextResponse.json(
                { success: false, message: 'Problem not found' },
                { status: 404 },
            );
        }

        // Check if problem has submissions
        if (existingProblem._count.submissions > 0) {
            return NextResponse.json(
                { success: false, message: 'Cannot delete problem with existing submissions' },
                { status: 400 },
            );
        }

        await prisma.problem.delete({
            where: { id: problemId },
        });

        return NextResponse.json({
            success: true,
            message: 'Problem deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting problem:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete problem' },
            { status: 500 },
        );
    }
}
