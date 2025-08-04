import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function populateSolvedBy() {
    try {
        console.log('Starting to populate solvedBy field...');

        // Get all problems
        const problems = await prisma.problem.findMany({
            select: {
                id: true,
                title: true,
            },
        });

        console.log(`Found ${problems.length} problems to process`);

        for (const problem of problems) {
            console.log(`Processing problem: ${problem.title}`);

            // Get all accepted submissions for this problem
            const acceptedSubmissions = await prisma.submission.findMany({
                where: {
                    problemId: problem.id,
                    status: 'ACCEPTED',
                },
                select: {
                    userId: true,
                },
                distinct: ['userId'], // Only get unique users
            });

            // Extract unique user IDs
            const solvedByUserIds = acceptedSubmissions.map((sub) => sub.userId);

            // Update the problem with the solvedBy array
            await prisma.problem.update({
                where: { id: problem.id },
                data: {
                    solvedBy: solvedByUserIds,
                },
            });

            console.log(
                `Updated problem "${problem.title}" with ${solvedByUserIds.length} solvers`,
            );
        }

        console.log('Successfully populated solvedBy field for all problems!');
    } catch (error) {
        console.error('Error populating solvedBy field:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the script
populateSolvedBy();
