import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
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

        // Get total problems count
        const totalProblems = await prisma.problem.count({
            where: problemWhere,
        });

        // Get problems with solvedBy data
        const problems = await prisma.problem.findMany({
            where: problemWhere,
            select: {
                id: true,
                solvedBy: true,
            },
        });

        // Calculate general statistics
        const totalSolved = problems.reduce((sum, problem) => sum + problem.solvedBy.length, 0);
        const averageSolvedPerProblem =
            totalProblems > 0 ? Math.round(totalSolved / totalProblems) : 0;

        // Get difficulty distribution
        const difficultyStats = await prisma.problem.groupBy({
            by: ['difficulty'],
            where: problemWhere,
            _count: {
                difficulty: true,
            },
        });

        const difficultyDistribution = difficultyStats.reduce(
            (acc, stat) => {
                acc[stat.difficulty] = stat._count.difficulty;
                return acc;
            },
            {} as Record<string, number>,
        );

        // Get topic distribution if no specific topic is selected
        let topicDistribution = {};
        if (!topicId) {
            const topicStats = await prisma.problem.groupBy({
                by: ['topicId'],
                where: problemWhere,
                _count: {
                    topicId: true,
                },
            });

            // Get topic names
            const topicIds = topicStats.map((stat) => stat.topicId);
            const topics = await prisma.topic.findMany({
                where: {
                    id: { in: topicIds },
                },
                select: {
                    id: true,
                    name: true,
                },
            });

            topicDistribution = topicStats.reduce(
                (acc, stat) => {
                    const topic = topics.find((t) => t.id === stat.topicId);
                    if (topic) {
                        acc[topic.name] = stat._count.topicId;
                    }
                    return acc;
                },
                {} as Record<string, number>,
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                total: totalProblems,
                totalSolved,
                averageSolvedPerProblem,
                difficultyDistribution,
                topicDistribution,
                // For compatibility with existing stats structure
                solved: totalSolved,
                attempted: 0, // Not available for general stats
                unsolved: totalProblems - totalSolved,
                completionRate:
                    totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0,
            },
        });
    } catch (error) {
        console.error('Error fetching general problem stats:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch problem statistics' },
            { status: 500 },
        );
    }
}
