import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function cleanupAnonymousSubmissions() {
    try {
        console.log('Starting cleanup of anonymous submissions and user problem status...');

        // Find all submissions with 'anonymous' userId
        const anonymousSubmissions = await prisma.submission.findMany({
            where: {
                userId: 'anonymous',
            },
            include: {
                testResults: true,
            },
        });

        console.log(`Found ${anonymousSubmissions.length} anonymous submissions to clean up`);

        if (anonymousSubmissions.length === 0) {
            console.log('No anonymous submissions found.');
        } else {
            // Delete test results first (due to foreign key constraints)
            for (const submission of anonymousSubmissions) {
                if (submission.testResults.length > 0) {
                    await prisma.testResult.deleteMany({
                        where: {
                            submissionId: submission.id,
                        },
                    });
                    console.log(
                        `Deleted ${submission.testResults.length} test results for submission ${submission.id}`,
                    );
                }
            }

            // Delete the submissions
            const deleteResult = await prisma.submission.deleteMany({
                where: {
                    userId: 'anonymous',
                },
            });

            console.log(`Successfully deleted ${deleteResult.count} anonymous submissions`);
        }

        // Find and clean up UserProblemStatus entries with 'anonymous' userId
        const anonymousUserProblemStatus = await prisma.userProblemStatus.findMany({
            where: {
                userId: 'anonymous',
            },
        });

        console.log(
            `Found ${anonymousUserProblemStatus.length} anonymous user problem status entries to clean up`,
        );

        if (anonymousUserProblemStatus.length > 0) {
            const deleteStatusResult = await prisma.userProblemStatus.deleteMany({
                where: {
                    userId: 'anonymous',
                },
            });

            console.log(
                `Successfully deleted ${deleteStatusResult.count} anonymous user problem status entries`,
            );
        } else {
            console.log('No anonymous user problem status entries found.');
        }

        console.log('Cleanup complete!');
    } catch (error) {
        console.error('Error during cleanup:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the cleanup
cleanupAnonymousSubmissions();
