import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { COOKIE_CONFIG } from '@/lib/utils/cookies';

export async function GET(request: NextRequest) {
    try {
        // Get the access token from cookies
        const accessToken = request.cookies.get(COOKIE_CONFIG.accessToken.name)?.value;

        if (!accessToken) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // Verify the token
        const tokenPayload = await verifyAccessToken(accessToken);
        if (!tokenPayload) {
            return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const topicId = searchParams.get('topicId');
        const difficulty = searchParams.get('difficulty');
        const tags = searchParams.get('tags');
        const companies = searchParams.get('companies');

        // Build filter conditions for problems
        const problemWhere: any = {
            isActive: true,
        };

        if (topicId) {
            problemWhere.topicId = topicId;
        }

        if (difficulty && difficulty !== 'All difficulties') {
            problemWhere.difficulty = difficulty;
        }

        if (tags) {
            const tagArray = tags.split(',');
            problemWhere.tags = {
                hasSome: tagArray,
            };
        }

        if (companies) {
            const companyArray = companies.split(',');
            problemWhere.companyTags = {
                hasSome: companyArray,
            };
        }

        // Get total problems count and problem IDs
        const problems = await prisma.problem.findMany({
            where: problemWhere,
            select: {
                id: true,
                solvedBy: true,
            },
        });

        const totalProblems = problems.length;
        const problemIds = problems.map((p) => p.id);

        // Get user's problem statuses for these problems
        const userProblemStatuses = await prisma.userProblemStatus.findMany({
            where: {
                userId: tokenPayload.userId,
                problemId: {
                    in: problemIds,
                },
            },
        });

        // Calculate statistics using solvedBy array for solved problems
        const solved = problems.filter((problem) =>
            problem.solvedBy.includes(tokenPayload.userId),
        ).length;

        const attempted = userProblemStatuses.filter(
            (status) =>
                status.status === 'ATTEMPTED' &&
                !problems
                    .find((p) => p.id === status.problemId)
                    ?.solvedBy.includes(tokenPayload.userId),
        ).length;

        const unsolved = totalProblems - solved - attempted;
        const completionRate = totalProblems > 0 ? Math.round((solved / totalProblems) * 100) : 0;

        return NextResponse.json({
            success: true,
            data: {
                total: totalProblems,
                solved,
                attempted,
                unsolved,
                completionRate,
            },
        });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch user statistics' },
            { status: 500 },
        );
    }
}
