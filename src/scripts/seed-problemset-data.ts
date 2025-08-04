import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

const topics = [
    {
        name: 'Array',
        slug: 'array',
        description: 'Array manipulation and algorithms',
        difficulty: 'BEGINNER' as const,
        type: 'CORE_CS' as const,
        tags: ['Data Structures', 'Algorithms'],
        order: 1,
    },
    {
        name: 'String',
        slug: 'string',
        description: 'String processing and manipulation',
        difficulty: 'BEGINNER' as const,
        type: 'CORE_CS' as const,
        tags: ['Data Structures', 'Text Processing'],
        order: 2,
    },
    {
        name: 'Hash Table',
        slug: 'hash-table',
        description: 'Hash table and dictionary problems',
        difficulty: 'INTERMEDIATE' as const,
        type: 'CORE_CS' as const,
        tags: ['Data Structures', 'Algorithms'],
        order: 3,
    },
    {
        name: 'Dynamic Programming',
        slug: 'dynamic-programming',
        description: 'Dynamic programming and optimization',
        difficulty: 'ADVANCED' as const,
        type: 'SPECIALIZED' as const,
        tags: ['Algorithms', 'Optimization'],
        order: 4,
    },
    {
        name: 'Math',
        slug: 'math',
        description: 'Mathematical problems and algorithms',
        difficulty: 'INTERMEDIATE' as const,
        type: 'CORE_CS' as const,
        tags: ['Mathematics', 'Algorithms'],
        order: 5,
    },
    {
        name: 'Sorting',
        slug: 'sorting',
        description: 'Sorting algorithms and techniques',
        difficulty: 'INTERMEDIATE' as const,
        type: 'CORE_CS' as const,
        tags: ['Algorithms', 'Data Structures'],
        order: 6,
    },
    {
        name: 'Greedy',
        slug: 'greedy',
        description: 'Greedy algorithms and strategies',
        difficulty: 'INTERMEDIATE' as const,
        type: 'SPECIALIZED' as const,
        tags: ['Algorithms', 'Optimization'],
        order: 7,
    },
    {
        name: 'Depth-First Search',
        slug: 'depth-first-search',
        description: 'DFS and tree traversal problems',
        difficulty: 'INTERMEDIATE' as const,
        type: 'SPECIALIZED' as const,
        tags: ['Graph Theory', 'Algorithms'],
        order: 8,
    },
    {
        name: 'Binary Search',
        slug: 'binary-search',
        description: 'Binary search and divide-and-conquer',
        difficulty: 'INTERMEDIATE' as const,
        type: 'CORE_CS' as const,
        tags: ['Algorithms', 'Search'],
        order: 9,
    },
    {
        name: 'Tree',
        slug: 'tree',
        description: 'Tree data structures and algorithms',
        difficulty: 'INTERMEDIATE' as const,
        type: 'CORE_CS' as const,
        tags: ['Data Structures', 'Algorithms'],
        order: 10,
    },
    {
        name: 'Graph',
        slug: 'graph',
        description: 'Graph algorithms and problems',
        difficulty: 'ADVANCED' as const,
        type: 'SPECIALIZED' as const,
        tags: ['Graph Theory', 'Algorithms'],
        order: 11,
    },
    {
        name: 'Two Pointers',
        slug: 'two-pointers',
        description: 'Two pointer technique problems',
        difficulty: 'INTERMEDIATE' as const,
        type: 'CORE_CS' as const,
        tags: ['Algorithms', 'Techniques'],
        order: 12,
    },
    {
        name: 'Stack',
        slug: 'stack',
        description: 'Stack data structure problems',
        difficulty: 'BEGINNER' as const,
        type: 'CORE_CS' as const,
        tags: ['Data Structures'],
        order: 13,
    },
    {
        name: 'Queue',
        slug: 'queue',
        description: 'Queue data structure problems',
        difficulty: 'BEGINNER' as const,
        type: 'CORE_CS' as const,
        tags: ['Data Structures'],
        order: 14,
    },
    {
        name: 'Heap',
        slug: 'heap',
        description: 'Heap and priority queue problems',
        difficulty: 'INTERMEDIATE' as const,
        type: 'CORE_CS' as const,
        tags: ['Data Structures', 'Algorithms'],
        order: 15,
    },
    {
        name: 'Backtracking',
        slug: 'backtracking',
        description: 'Backtracking and recursive problems',
        difficulty: 'ADVANCED' as const,
        type: 'SPECIALIZED' as const,
        tags: ['Algorithms', 'Recursion'],
        order: 16,
    },
    {
        name: 'Sliding Window',
        slug: 'sliding-window',
        description: 'Sliding window technique problems',
        difficulty: 'INTERMEDIATE' as const,
        type: 'SPECIALIZED' as const,
        tags: ['Algorithms', 'Techniques'],
        order: 17,
    },
    {
        name: 'Union Find',
        slug: 'union-find',
        description: 'Union-Find data structure problems',
        difficulty: 'ADVANCED' as const,
        type: 'SPECIALIZED' as const,
        tags: ['Data Structures', 'Algorithms'],
        order: 18,
    },
    {
        name: 'Trie',
        slug: 'trie',
        description: 'Trie data structure problems',
        difficulty: 'ADVANCED' as const,
        type: 'SPECIALIZED' as const,
        tags: ['Data Structures', 'String Processing'],
        order: 19,
    },
    {
        name: 'Bit Manipulation',
        slug: 'bit-manipulation',
        description: 'Bit manipulation problems',
        difficulty: 'ADVANCED' as const,
        type: 'SPECIALIZED' as const,
        tags: ['Algorithms', 'Bit Operations'],
        order: 20,
    },
];

const problems = [
    {
        title: 'Two Sum',
        slug: 'two-sum',
        description:
            'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        difficulty: 'EASY' as const,
        tags: ['Array', 'Hash Table'],
        companyTags: ['Google', 'Microsoft', 'Amazon'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 85.5,
        score: 10,
        order: 1,
    },
    {
        title: 'Add Two Numbers',
        slug: 'add-two-numbers',
        description:
            'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.',
        difficulty: 'MEDIUM' as const,
        tags: ['Linked List', 'Math'],
        companyTags: ['Microsoft', 'Amazon'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 65.2,
        score: 15,
        order: 2,
    },
    {
        title: 'Longest Substring Without Repeating Characters',
        slug: 'longest-substring-without-repeating-characters',
        description:
            'Given a string s, find the length of the longest substring without repeating characters.',
        difficulty: 'MEDIUM' as const,
        tags: ['String', 'Sliding Window'],
        companyTags: ['Google', 'Microsoft'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 72.1,
        score: 15,
        order: 3,
    },
    {
        title: 'Median of Two Sorted Arrays',
        slug: 'median-of-two-sorted-arrays',
        description:
            'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
        difficulty: 'HARD' as const,
        tags: ['Array', 'Binary Search'],
        companyTags: ['Google', 'Microsoft', 'Amazon'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 45.8,
        score: 25,
        order: 4,
    },
    {
        title: 'Longest Palindromic Substring',
        slug: 'longest-palindromic-substring',
        description: 'Given a string s, return the longest palindromic substring in s.',
        difficulty: 'MEDIUM' as const,
        tags: ['String', 'Dynamic Programming'],
        companyTags: ['Microsoft', 'Amazon'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 58.3,
        score: 15,
        order: 5,
    },
];

async function seedData() {
    try {
        console.log('🌱 Seeding problemset data...');

        // Create topics
        for (const topicData of topics) {
            const existingTopic = await prisma.topic.findUnique({
                where: { slug: topicData.slug },
            });

            if (!existingTopic) {
                const topic = await prisma.topic.create({
                    data: topicData,
                });
                console.log(`✅ Created topic: ${topic.name}`);
            } else {
                console.log(`⏭️  Topic already exists: ${topicData.name}`);
            }
        }

        // Get the first topic to associate problems with
        const firstTopic = await prisma.topic.findFirst({
            where: { slug: 'array' },
        });

        if (firstTopic) {
            // Create problems
            for (const problemData of problems) {
                const existingProblem = await prisma.problem.findUnique({
                    where: { slug: problemData.slug },
                });

                if (!existingProblem) {
                    const problem = await prisma.problem.create({
                        data: {
                            ...problemData,
                            topicId: firstTopic.id,
                        },
                    });
                    console.log(`✅ Created problem: ${problem.title}`);
                } else {
                    console.log(`⏭️  Problem already exists: ${problemData.title}`);
                }
            }
        }

        // Update topic problem counts
        const topicsWithCounts = await prisma.topic.findMany({
            include: {
                _count: {
                    select: {
                        problems: {
                            where: { isActive: true },
                        },
                    },
                },
            },
        });

        for (const topic of topicsWithCounts) {
            await prisma.topic.update({
                where: { id: topic.id },
                data: { problemCount: topic._count.problems },
            });
        }

        console.log('🎉 Problemset data seeding completed!');
    } catch (error) {
        console.error('❌ Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedData();
