import { NextRequest, NextResponse } from 'next/server';
import { CodeExecutor } from '@/lib/code-executor';
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
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const problemId = searchParams.get('problemId');
        const status = searchParams.get('status');
        const language = searchParams.get('language');

        const skip = (page - 1) * limit;

        // Build filter conditions - only show submissions for the authenticated user
        const where: any = {
            userId: tokenPayload.userId,
        };

        if (problemId) {
            where.problemId = problemId;
        }

        if (status) {
            where.status = status;
        }

        if (language) {
            where.language = language;
        }

        const submissions = await prisma.submission.findMany({
            where,
            include: {
                problem: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        difficulty: true,
                        topic: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                            },
                        },
                    },
                },
                testResults: {
                    select: {
                        status: true,
                        runtime: true,
                        memory: true,
                        error: true,
                    },
                },
            },
            orderBy: {
                submittedAt: 'desc',
            },
            skip,
            take: limit,
        });

        const total = await prisma.submission.count({ where });

        return NextResponse.json({
            success: true,
            data: submissions,
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
        console.error('Error fetching submissions:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch submissions' },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
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

        const body = await request.json();
        const { problemId, language, code } = body;

        // Validate required fields
        if (!problemId || !language || !code) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 },
            );
        }

        // Check if problem exists
        const problem = await prisma.problem.findUnique({
            where: { id: problemId },
            include: {
                testCases: {
                    orderBy: { order: 'asc' },
                },
            },
        });

        if (!problem) {
            return NextResponse.json(
                { success: false, message: 'Problem not found' },
                { status: 404 },
            );
        }

        // Create submission with authenticated user's ID
        const submission = await prisma.submission.create({
            data: {
                userId: tokenPayload.userId,
                problemId,
                language,
                code,
                status: 'PENDING',
            },
        });

        // Count this submission as an attempt immediately
        console.log(`Counting attempt for user ${tokenPayload.userId} on problem ${problemId}`);
        await updateUserProblemAttempts(tokenPayload.userId, problemId);

        // Execute code against test cases using real code execution
        const testResults = await executeCodeAgainstTestCases(
            submission.id,
            code,
            language,
            problem.testCases,
        );

        return NextResponse.json(
            {
                success: true,
                data: {
                    id: submission.id,
                    status: submission.status,
                    message: 'Submission received and being processed',
                    testResults: testResults, // Return test results for immediate feedback
                },
            },
            { status: 201 },
        );
    } catch (error) {
        console.error('Error creating submission:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create submission' },
            { status: 500 },
        );
    }
}

// Execute code against test cases using real code execution
async function executeCodeAgainstTestCases(
    submissionId: string,
    code: string,
    language: string,
    testCases: any[],
) {
    try {
        // Execute code against all test cases
        const results = await CodeExecutor.executeCode(
            code,
            language,
            testCases.map((tc) => ({
                id: tc.id,
                input: tc.input,
                output: tc.output,
            })),
        );

        // Create test results in database
        const testResults = results.map((result) => ({
            submissionId,
            testCaseId: result.testCaseId,
            status: result.status,
            input: result.input,
            expectedOutput: result.expectedOutput,
            actualOutput: result.actualOutput,
            runtime: result.runtime,
            memory: result.memory,
            error: result.error,
        }));

        await prisma.testResult.createMany({
            data: testResults,
        });

        // Calculate overall results
        const allPassed = results.every((r) => r.status === 'PASSED');
        const totalRuntime = results.reduce((sum, r) => sum + r.runtime, 0);
        const avgRuntime = Math.round(totalRuntime / results.length);
        const avgMemory = Math.round(
            results.reduce((sum, r) => sum + r.memory, 0) / results.length,
        );
        const score = allPassed ? 100 : 0;

        // Determine final status
        let finalStatus: 'ACCEPTED' | 'WRONG_ANSWER' | 'COMPILATION_ERROR' = 'WRONG_ANSWER';
        if (allPassed) {
            finalStatus = 'ACCEPTED';
        } else if (results.some((r) => r.status === 'ERROR')) {
            finalStatus = 'COMPILATION_ERROR';
        }

        // Update submission status
        await prisma.submission.update({
            where: { id: submissionId },
            data: {
                status: finalStatus,
                runtime: avgRuntime,
                memory: avgMemory,
                score,
            },
        });

        // Update user problem status
        await updateUserProblemStatus(submissionId, finalStatus, score);

        // Return the results for immediate feedback
        return results.map((result, index) => ({
            case: index + 1,
            status: result.status,
            input: result.input,
            output: result.actualOutput || 'No output',
            expected: result.expectedOutput,
            runtime: result.runtime,
            memory: result.memory,
            error: result.error,
        }));
    } catch (error) {
        console.error('Error in code execution:', error);

        // Update submission with error status
        await prisma.submission.update({
            where: { id: submissionId },
            data: {
                status: 'SYSTEM_ERROR',
                error: 'Code execution failed',
            },
        });

        // Return error result
        return [
            {
                case: 1,
                status: 'ERROR',
                error: 'Code execution failed',
            },
        ];
    }
}

async function updateUserProblemStatus(submissionId: string, status: string, score: number) {
    try {
        const submission = await prisma.submission.findUnique({
            where: { id: submissionId },
            select: {
                userId: true,
                problemId: true,
            },
        });

        if (!submission) return;

        const existingStatus = await prisma.userProblemStatus.findUnique({
            where: {
                userId_problemId: {
                    userId: submission.userId,
                    problemId: submission.problemId,
                },
            },
        });

        const newStatus = status === 'ACCEPTED' ? 'SOLVED' : 'ATTEMPTED';
        const bestScore = existingStatus?.bestScore || 0;

        if (existingStatus) {
            await prisma.userProblemStatus.update({
                where: {
                    userId_problemId: {
                        userId: submission.userId,
                        problemId: submission.problemId,
                    },
                },
                data: {
                    status: newStatus,
                    lastAttempted: new Date(),
                    bestScore: Math.max(bestScore, score),
                    // Attempts are already incremented when submission was created
                },
            });
        } else {
            // This should not happen since we create the status when submission is created
            // But just in case, create it with attempts = 1
            await prisma.userProblemStatus.create({
                data: {
                    userId: submission.userId,
                    problemId: submission.problemId,
                    status: newStatus,
                    lastAttempted: new Date(),
                    bestScore: score,
                    attempts: 1,
                },
            });
        }

        // If the submission was accepted, add user to the solvedBy array
        if (status === 'ACCEPTED') {
            const problem = await prisma.problem.findUnique({
                where: { id: submission.problemId },
                select: { solvedBy: true },
            });

            if (problem && !problem.solvedBy.includes(submission.userId)) {
                await prisma.problem.update({
                    where: { id: submission.problemId },
                    data: {
                        solvedBy: {
                            push: submission.userId,
                        },
                    },
                });
            }
        }
    } catch (error) {
        console.error('Error updating user problem status:', error);
    }
}

async function updateUserProblemAttempts(userId: string, problemId: string) {
    try {
        console.log(`Updating attempts for user ${userId} on problem ${problemId}`);
        const existingStatus = await prisma.userProblemStatus.findUnique({
            where: {
                userId_problemId: {
                    userId,
                    problemId,
                },
            },
        });

        if (existingStatus) {
            console.log(`Existing status found. Current attempts: ${existingStatus.attempts}`);
            await prisma.userProblemStatus.update({
                where: {
                    userId_problemId: {
                        userId,
                        problemId,
                    },
                },
                data: {
                    attempts: existingStatus.attempts + 1,
                },
            });
            console.log(`Updated attempts to: ${existingStatus.attempts + 1}`);
        } else {
            console.log(`No existing status found. Creating new status with attempts: 1`);
            await prisma.userProblemStatus.create({
                data: {
                    userId,
                    problemId,
                    status: 'ATTEMPTED',
                    attempts: 1,
                },
            });
            console.log(`Created new status with attempts: 1`);
        }
    } catch (error) {
        console.error('Error updating user problem attempts:', error);
    }
}
