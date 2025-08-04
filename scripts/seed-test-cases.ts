import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

const testCases = [
    // Two Sum test cases
    {
        problemId: '688992b1cfbf234f98a74e61',
        testCases: [
            {
                input: '[2,7,11,15]\n9',
                output: '[0,1]',
                isHidden: false,
                order: 1,
            },
            {
                input: '[3,2,4]\n6',
                output: '[1,2]',
                isHidden: false,
                order: 2,
            },
            {
                input: '[3,3]\n6',
                output: '[0,1]',
                isHidden: false,
                order: 3,
            },
        ],
    },
    // Add Two Numbers test cases
    {
        problemId: '688ce0f28f6225e4814efe02',
        testCases: [
            {
                input: '[2,4,3]\n[5,6,4]',
                output: '[7,0,8]',
                isHidden: false,
                order: 1,
            },
            {
                input: '[0]\n[0]',
                output: '[0]',
                isHidden: false,
                order: 2,
            },
            {
                input: '[9,9,9,9,9,9,9]\n[9,9,9,9]',
                output: '[8,9,9,9,0,0,0,1]',
                isHidden: false,
                order: 3,
            },
        ],
    },
    // Valid Parentheses test cases
    {
        problemId: '688992b2cfbf234f98a74e65',
        testCases: [
            {
                input: '()',
                output: 'true',
                isHidden: false,
                order: 1,
            },
            {
                input: '()[]{}',
                output: 'true',
                isHidden: false,
                order: 2,
            },
            {
                input: '(]',
                output: 'false',
                isHidden: false,
                order: 3,
            },
            {
                input: '([)]',
                output: 'false',
                isHidden: false,
                order: 4,
            },
        ],
    },
    // Maximum Subarray test cases
    {
        problemId: '688994cd8f6ed519de3af20d',
        testCases: [
            {
                input: '[-2,1,-3,4,-1,2,1,-5,4]',
                output: '6',
                isHidden: false,
                order: 1,
            },
            {
                input: '[1]',
                output: '1',
                isHidden: false,
                order: 2,
            },
            {
                input: '[5,4,-1,7,8]',
                output: '23',
                isHidden: false,
                order: 3,
            },
        ],
    },
    // Merge Two Sorted Lists test cases
    {
        problemId: '688994cd8f6ed519de3af20e',
        testCases: [
            {
                input: '[1,2,4]\n[1,3,4]',
                output: '[1,1,2,3,4,4]',
                isHidden: false,
                order: 1,
            },
            {
                input: '[]\n[]',
                output: '[]',
                isHidden: false,
                order: 2,
            },
            {
                input: '[]\n[0]',
                output: '[0]',
                isHidden: false,
                order: 3,
            },
        ],
    },
];

async function main() {
    console.log('🌱 Seeding test cases...');

    try {
        for (const problemTestCases of testCases) {
            const { problemId, testCases: cases } = problemTestCases;

            // Check if problem exists
            const problem = await prisma.problem.findUnique({
                where: { id: problemId },
            });

            if (!problem) {
                console.log(`⚠️  Problem ${problemId} not found, skipping...`);
                continue;
            }

            console.log(`📝 Adding test cases for problem: ${problem.title}`);

            // Delete existing test cases for this problem
            await prisma.testCase.deleteMany({
                where: { problemId },
            });

            // Create new test cases
            for (const testCase of cases) {
                await prisma.testCase.create({
                    data: {
                        problemId,
                        input: testCase.input,
                        output: testCase.output,
                        isHidden: testCase.isHidden,
                        order: testCase.order,
                    },
                });
            }

            console.log(`✅ Added ${cases.length} test cases for ${problem.title}`);
        }

        console.log('🎉 Test cases seeding completed!');
    } catch (error) {
        console.error('❌ Error seeding test cases:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .then(() => {
        console.log('✅ Test cases seeded successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Failed to seed test cases:', error);
        process.exit(1);
    });
