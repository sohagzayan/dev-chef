import { NextRequest, NextResponse } from 'next/server';
import { CodeExecutor } from '@/lib/code-executor';
import { verifyAccessToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { COOKIE_CONFIG } from '@/lib/utils/cookies';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ problemId: string }> },
) {
    try {
        const { problemId } = await params;

        // Get the access token from cookies
        const accessToken = request.cookies.get(COOKIE_CONFIG.accessToken.name)?.value;
        let tokenPayload = null;

        if (accessToken) {
            tokenPayload = await verifyAccessToken(accessToken);
        }

        // Check if problem exists
        const problem = await prisma.problem.findUnique({
            where: { id: problemId },
            include: { topic: true },
        });

        if (!problem) {
            return NextResponse.json(
                { success: false, message: 'Problem not found' },
                { status: 404 },
            );
        }

        // Get test cases
        const testCases = await prisma.testCase.findMany({
            where: { problemId },
            orderBy: { order: 'asc' },
        });

        // Filter test cases based on user role
        const isAdmin = tokenPayload && tokenPayload.role === 'ADMIN';

        const filteredTestCases = testCases.map((testCase) => ({
            id: testCase.id,
            input: testCase.input,
            output: isAdmin || !testCase.isHidden ? testCase.output : '***',
            isHidden: testCase.isHidden,
            order: testCase.order,
        }));

        return NextResponse.json({
            success: true,
            data: filteredTestCases,
        });
    } catch (error) {
        console.error('Error fetching test cases:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 },
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ problemId: string }> },
) {
    try {
        // Allow unauthenticated access for development (you can remove this in production)
        // const session = await auth();
        // if (!session?.user?.id) {
        //     return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        // }

        const { problemId } = await params;
        const body = await request.json();
        const { code, language, testCaseIds } = body;

        // Validate required fields
        if (!code || !language) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 },
            );
        }

        // Get problem and test cases
        const problem = await prisma.problem.findUnique({
            where: { id: problemId },
            include: {
                testCases: {
                    where: testCaseIds ? { id: { in: testCaseIds } } : {},
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

        if (problem.testCases.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No test cases found for this problem' },
                { status: 404 },
            );
        }

        // Execute code against test cases
        const results = await CodeExecutor.executeCode(
            code,
            language,
            problem.testCases.map((tc) => ({
                id: tc.id,
                input: tc.input,
                output: tc.output,
            })),
        );

        // Calculate summary
        const passedCount = results.filter((r) => r.status === 'PASSED').length;
        const totalCount = results.length;
        const allPassed = passedCount === totalCount;

        return NextResponse.json({
            success: true,
            data: {
                results,
                summary: {
                    total: totalCount,
                    passed: passedCount,
                    failed: totalCount - passedCount,
                    allPassed,
                },
            },
        });
    } catch (error) {
        console.error('Error running test cases:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to run test cases' },
            { status: 500 },
        );
    }
}
