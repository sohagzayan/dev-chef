import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function testSolvedBy() {
    try {
        console.log('Testing solvedBy functionality...');

        // Get all problems with their solvedBy data
        const problems = await prisma.problem.findMany({
            select: {
                id: true,
                title: true,
                solvedBy: true,
            },
        });

        console.log('\nProblems and their solvers:');
        problems.forEach((problem) => {
            console.log(`${problem.title}: ${problem.solvedBy.length} solvers`);
            if (problem.solvedBy.length > 0) {
                console.log(`  Solver IDs: ${problem.solvedBy.join(', ')}`);
            }
        });

        // Get all accepted submissions
        const acceptedSubmissions = await prisma.submission.findMany({
            where: {
                status: 'ACCEPTED',
            },
            select: {
                id: true,
                userId: true,
                problemId: true,
                problem: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        console.log('\nAccepted submissions:');
        acceptedSubmissions.forEach((sub) => {
            console.log(`User ${sub.userId} solved "${sub.problem.title}"`);
        });

        // Verify that solvedBy arrays match accepted submissions
        console.log('\nVerifying solvedBy arrays...');
        for (const problem of problems) {
            const problemAcceptedSubmissions = acceptedSubmissions.filter(
                (sub) => sub.problemId === problem.id,
            );

            const uniqueSolvers = [...new Set(problemAcceptedSubmissions.map((sub) => sub.userId))];

            if (problem.solvedBy.length !== uniqueSolvers.length) {
                console.log(`❌ Mismatch for "${problem.title}":`);
                console.log(`  solvedBy array has ${problem.solvedBy.length} users`);
                console.log(`  Accepted submissions have ${uniqueSolvers.length} unique users`);
            } else {
                console.log(`✅ "${problem.title}" - ${problem.solvedBy.length} solvers`);
            }
        }
    } catch (error) {
        console.error('Error testing solvedBy:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the test
testSolvedBy();
