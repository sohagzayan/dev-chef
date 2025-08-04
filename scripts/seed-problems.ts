import {
    PrismaClient,
    ProblemDifficulty,
    TopicDifficulty,
    TopicType,
} from '../src/generated/prisma';

const prisma = new PrismaClient();

const problems = [
    {
        id: '688992b1cfbf234f98a74e61',
        title: 'Two Sum',
        slug: 'two-sum',
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        difficulty: ProblemDifficulty.EASY,
        tags: ['Array', 'Hash Table'],
        companyTags: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 56.0,
        score: 100,
        order: 1,
        topicId: '507f1f77bcf86cd799439011', // Will be created
    },
    {
        id: '688ce0f28f6225e4814efe02',
        title: 'Add Two Numbers',
        slug: 'add-two-numbers',
        description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
        difficulty: ProblemDifficulty.MEDIUM,
        tags: ['Linked List', 'Math', 'Recursion'],
        companyTags: ['Microsoft', 'Amazon', 'Google', 'Apple'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 46.6,
        score: 150,
        order: 2,
        topicId: '507f1f77bcf86cd799439011',
    },
    {
        id: '688992b2cfbf234f98a74e65',
        title: 'Valid Parentheses',
        slug: 'valid-parentheses',
        description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
        difficulty: ProblemDifficulty.EASY,
        tags: ['Stack', 'String'],
        companyTags: ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Apple'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 42.6,
        score: 100,
        order: 3,
        topicId: '507f1f77bcf86cd799439011',
    },
    {
        id: '688994cd8f6ed519de3af20d',
        title: 'Maximum Subarray',
        slug: 'maximum-subarray',
        description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
        difficulty: ProblemDifficulty.MEDIUM,
        tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
        companyTags: ['Microsoft', 'Amazon', 'Google', 'Apple', 'Facebook'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 52.3,
        score: 150,
        order: 4,
        topicId: '507f1f77bcf86cd799439011',
    },
    {
        id: '688994cd8f6ed519de3af20e',
        title: 'Merge Two Sorted Lists',
        slug: 'merge-two-sorted-lists',
        description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
        difficulty: ProblemDifficulty.EASY,
        tags: ['Linked List', 'Recursion'],
        companyTags: ['Microsoft', 'Amazon', 'Google', 'Apple'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 58.7,
        score: 100,
        order: 5,
        topicId: '507f1f77bcf86cd799439011',
    },
    {
        id: '688994cd8f6ed519de3af20f',
        title: 'Climbing Stairs',
        slug: 'climbing-stairs',
        description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
        difficulty: ProblemDifficulty.EASY,
        tags: ['Dynamic Programming', 'Math', 'Memoization'],
        companyTags: ['Google', 'Microsoft', 'Amazon', 'Apple'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 51.2,
        score: 100,
        order: 6,
        topicId: '507f1f77bcf86cd799439011',
    },
    {
        id: '688994cd8f6ed519de3af210',
        title: 'Best Time to Buy and Sell Stock',
        slug: 'best-time-to-buy-and-sell-stock',
        description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
        difficulty: ProblemDifficulty.EASY,
        tags: ['Array', 'Dynamic Programming'],
        companyTags: ['Microsoft', 'Amazon', 'Google', 'Apple', 'Facebook'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 54.8,
        score: 100,
        order: 7,
        topicId: '507f1f77bcf86cd799439011',
    },
    {
        id: '688994cd8f6ed519de3af211',
        title: 'Linked List Cycle',
        slug: 'linked-list-cycle',
        description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.`,
        difficulty: ProblemDifficulty.EASY,
        tags: ['Linked List', 'Two Pointers', 'Hash Table'],
        companyTags: ['Microsoft', 'Amazon', 'Google', 'Apple'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 48.9,
        score: 100,
        order: 8,
        topicId: '507f1f77bcf86cd799439011',
    },
    {
        id: '688994cd8f6ed519de3af212',
        title: 'Reverse String',
        slug: 'reverse-string',
        description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
        difficulty: ProblemDifficulty.EASY,
        tags: ['Two Pointers', 'String'],
        companyTags: ['Microsoft', 'Amazon', 'Google', 'Apple'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 72.1,
        score: 100,
        order: 9,
        topicId: '507f1f77bcf86cd799439011',
    },
    {
        id: '688994cd8f6ed519de3af213',
        title: 'Move Zeroes',
        slug: 'move-zeroes',
        description: `Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.`,
        difficulty: ProblemDifficulty.EASY,
        tags: ['Array', 'Two Pointers'],
        companyTags: ['Microsoft', 'Amazon', 'Google', 'Apple', 'Facebook'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 63.4,
        score: 100,
        order: 10,
        topicId: '507f1f77bcf86cd799439011',
    },
];

async function main() {
    try {
        console.log('🚀 Starting problem seeding...');

        // First, create a default topic if it doesn't exist
        const defaultTopic = await prisma.topic.upsert({
            where: { id: '507f1f77bcf86cd799439011' },
            update: {},
            create: {
                id: '507f1f77bcf86cd799439011',
                name: 'General Problems',
                slug: 'general-problems',
                description: 'General algorithmic problems',
                difficulty: TopicDifficulty.BEGINNER,
                type: TopicType.CORE_CS,
                isActive: true,
                order: 1,
            },
        });

        console.log('✅ Default topic created/updated:', defaultTopic.name);

        // Delete all existing problems
        console.log('🗑️  Deleting existing problems...');
        await prisma.problem.deleteMany({});
        console.log('✅ All existing problems deleted');

        // Create new problems
        console.log('📝 Creating new problems...');
        for (const problem of problems) {
            const createdProblem = await prisma.problem.create({
                data: problem,
            });
            console.log(`✅ Created problem: ${createdProblem.title} (${createdProblem.id})`);
        }

        console.log('🎉 Problem seeding completed successfully!');
        console.log(`📊 Total problems created: ${problems.length}`);
    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .then(() => {
        console.log('✅ Seeding completed');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    });
