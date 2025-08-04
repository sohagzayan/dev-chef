import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

async function seedTopics() {
    console.log('🌱 Seeding topics...');

    const topics = [
        {
            name: 'Algorithms',
            slug: 'algorithms',
            description: 'Core algorithmic concepts and problem-solving techniques',
            difficulty: 'INTERMEDIATE' as const,
            type: 'CORE_CS' as const,
            tags: ['Architecture', 'Performance'],
            order: 1,
        },
        {
            name: 'Data Structures',
            slug: 'data-structures',
            description: 'Fundamental data structures and their implementations',
            difficulty: 'BEGINNER' as const,
            type: 'CORE_CS' as const,
            tags: ['Architecture', 'Memory'],
            order: 2,
        },
        {
            name: 'Dynamic Programming',
            slug: 'dynamic-programming',
            description: 'Advanced problem-solving with dynamic programming',
            difficulty: 'ADVANCED' as const,
            type: 'SPECIALIZED' as const,
            tags: ['Optimization', 'Algorithms'],
            order: 3,
        },
        {
            name: 'Graph Algorithms',
            slug: 'graph-algorithms',
            description: 'Graph theory and network algorithms',
            difficulty: 'INTERMEDIATE' as const,
            type: 'SPECIALIZED' as const,
            tags: ['Networks', 'Algorithms'],
            order: 4,
        },
        {
            name: 'String Manipulation',
            slug: 'string-manipulation',
            description: 'String processing and text algorithms',
            difficulty: 'BEGINNER' as const,
            type: 'CORE_CS' as const,
            tags: ['Text Processing', 'Algorithms'],
            order: 5,
        },
        {
            name: 'Python',
            slug: 'python',
            description: 'Python-specific programming challenges',
            difficulty: 'BEGINNER' as const,
            type: 'LANGUAGE' as const,
            tags: ['Python', 'Programming'],
            order: 6,
        },
        {
            name: 'JavaScript',
            slug: 'javascript',
            description: 'JavaScript and Node.js programming challenges',
            difficulty: 'BEGINNER' as const,
            type: 'LANGUAGE' as const,
            tags: ['JavaScript', 'Web Development'],
            order: 7,
        },
        {
            name: 'SQL',
            slug: 'sql',
            description: 'Database queries and SQL challenges',
            difficulty: 'INTERMEDIATE' as const,
            type: 'TOOL' as const,
            tags: ['Database', 'Queries'],
            order: 8,
        },
    ];

    for (const topicData of topics) {
        await prisma.topic.upsert({
            where: { slug: topicData.slug },
            update: topicData,
            create: topicData,
        });
    }

    console.log('✅ Topics seeded successfully');
}

async function seedProblems() {
    console.log('🌱 Seeding problems...');

    // Get topic IDs
    const algorithmsTopic = await prisma.topic.findUnique({ where: { slug: 'algorithms' } });
    const dataStructuresTopic = await prisma.topic.findUnique({
        where: { slug: 'data-structures' },
    });
    const dynamicProgrammingTopic = await prisma.topic.findUnique({
        where: { slug: 'dynamic-programming' },
    });
    const graphTopic = await prisma.topic.findUnique({ where: { slug: 'graph-algorithms' } });
    const stringTopic = await prisma.topic.findUnique({ where: { slug: 'string-manipulation' } });
    const pythonTopic = await prisma.topic.findUnique({ where: { slug: 'python' } });
    const jsTopic = await prisma.topic.findUnique({ where: { slug: 'javascript' } });
    const sqlTopic = await prisma.topic.findUnique({ where: { slug: 'sql' } });

    const problems = [
        // Algorithms
        {
            title: 'Search a 2D Matrix',
            slug: 'search-a-2d-matrix',
            description: `Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

• Integers in each row are sorted from left to right.
• The first integer of each row is greater than the last integer of the previous row.

Given matrix, an m x n matrix, and target, return true if target is in the matrix, and false otherwise.

Example 1:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Explanation: 3 exists in the matrix, so we return true.

Example 2:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
Explanation: 13 does not exist in the matrix, so we return false.

Constraints:
• m == matrix.length
• n == matrix[i].length
• 1 ≤ m, n ≤ 100
• -10⁴ ≤ matrix[i][j], target ≤ 10⁴`,
            topicId: algorithmsTopic?.id,
            difficulty: 'EASY' as const,
            tags: ['Array', 'Hash Table'],
            companyTags: ['Google', 'Microsoft', 'Amazon'],
            timeLimit: 3000,
            memoryLimit: 256,
            score: 100,
            order: 1,
        },
        {
            title: 'Valid Parentheses',
            slug: 'valid-parentheses',
            description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false`,
            topicId: dataStructuresTopic?.id,
            difficulty: 'EASY' as const,
            tags: ['Stack', 'String'],
            companyTags: ['Google', 'Facebook', 'Microsoft'],
            timeLimit: 3000,
            memoryLimit: 256,
            score: 100,
            order: 1,
        },
        {
            title: 'Climbing Stairs',
            slug: 'climbing-stairs',
            description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

Example 2:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step`,
            topicId: dynamicProgrammingTopic?.id,
            difficulty: 'EASY' as const,
            tags: ['Dynamic Programming', 'Math'],
            companyTags: ['Google', 'Amazon', 'Apple'],
            timeLimit: 3000,
            memoryLimit: 256,
            score: 100,
            order: 1,
        },
        {
            title: 'Number of Islands',
            slug: 'number-of-islands',
            description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3`,
            topicId: graphTopic?.id,
            difficulty: 'MEDIUM' as const,
            tags: ['Depth-First Search', 'Breadth-First Search', 'Union Find'],
            companyTags: ['Google', 'Amazon', 'Microsoft'],
            timeLimit: 3000,
            memoryLimit: 256,
            score: 150,
            order: 1,
        },
        {
            title: 'Reverse String',
            slug: 'reverse-string',
            description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]`,
            topicId: stringTopic?.id,
            difficulty: 'EASY' as const,
            tags: ['Two Pointers', 'String'],
            companyTags: ['Google', 'Microsoft', 'Apple'],
            timeLimit: 3000,
            memoryLimit: 256,
            score: 100,
            order: 1,
        },
        {
            title: 'Python List Operations',
            slug: 'python-list-operations',
            description: `Write a Python function that performs the following operations on a list:

1. Remove all duplicates while preserving order
2. Sort the list in ascending order
3. Return the sum of all even numbers in the list

Example:
Input: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
Output: 12 (sum of even numbers: 4 + 2 + 6 = 12)

The function should return the sum of even numbers after removing duplicates and sorting.`,
            topicId: pythonTopic?.id,
            difficulty: 'EASY' as const,
            tags: ['Python', 'Lists', 'Arrays'],
            companyTags: ['Google', 'Microsoft'],
            timeLimit: 3000,
            memoryLimit: 256,
            score: 100,
            order: 1,
        },
        {
            title: 'JavaScript Array Methods',
            slug: 'javascript-array-methods',
            description: `Write a JavaScript function that processes an array of objects with the following requirements:

1. Filter out objects where age is less than 18
2. Map the remaining objects to include a new property 'status' set to 'adult'
3. Sort by age in descending order
4. Return the first 3 results

Example:
Input: [
  {name: 'Alice', age: 25},
  {name: 'Bob', age: 17},
  {name: 'Charlie', age: 30},
  {name: 'David', age: 16},
  {name: 'Eve', age: 28}
]

Output: [
  {name: 'Charlie', age: 30, status: 'adult'},
  {name: 'Eve', age: 28, status: 'adult'},
  {name: 'Alice', age: 25, status: 'adult'}
]`,
            topicId: jsTopic?.id,
            difficulty: 'EASY' as const,
            tags: ['JavaScript', 'Arrays', 'Objects'],
            companyTags: ['Google', 'Facebook'],
            timeLimit: 3000,
            memoryLimit: 256,
            score: 100,
            order: 1,
        },
        {
            title: 'SQL Employee Analysis',
            slug: 'sql-employee-analysis',
            description: `Given the following tables:

Employees:
- id (INT)
- name (VARCHAR)
- department (VARCHAR)
- salary (DECIMAL)

Write a SQL query to:
1. Find the average salary by department
2. Show only departments with average salary > 50000
3. Order by average salary in descending order

Example data:
Employees:
| id | name    | department | salary |
|----|---------|------------|--------|
| 1  | Alice   | Engineering| 75000  |
| 2  | Bob     | Sales      | 45000  |
| 3  | Charlie | Engineering| 80000  |
| 4  | David   | Marketing  | 60000  |
| 5  | Eve     | Sales      | 55000  |

Expected output:
| department  | avg_salary |
|-------------|------------|
| Engineering | 77500      |
| Marketing   | 60000      |`,
            topicId: sqlTopic?.id,
            difficulty: 'MEDIUM' as const,
            tags: ['SQL', 'Aggregation', 'Group By'],
            companyTags: ['Google', 'Amazon', 'Microsoft'],
            timeLimit: 3000,
            memoryLimit: 256,
            score: 150,
            order: 1,
        },
    ];

    for (const problemData of problems) {
        if (problemData.topicId) {
            await prisma.problem.upsert({
                where: { slug: problemData.slug },
                update: problemData,
                create: {
                    ...problemData,
                    topicId: problemData.topicId,
                },
            });
        }
    }

    console.log('✅ Problems seeded successfully');
}

async function seedTestCases() {
    console.log('🌱 Seeding test cases...');

    const searchMatrixProblem = await prisma.problem.findUnique({
        where: { slug: 'search-a-2d-matrix' },
    });
    const validParenthesesProblem = await prisma.problem.findUnique({
        where: { slug: 'valid-parentheses' },
    });

    if (searchMatrixProblem) {
        const testCases = [
            {
                problemId: searchMatrixProblem.id,
                input: '[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3',
                output: 'true',
                isHidden: false,
                order: 1,
            },
            {
                problemId: searchMatrixProblem.id,
                input: '[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n13',
                output: 'false',
                isHidden: false,
                order: 2,
            },
            {
                problemId: searchMatrixProblem.id,
                input: '[[1]]\n1',
                output: 'true',
                isHidden: false,
                order: 3,
            },
            {
                problemId: searchMatrixProblem.id,
                input: '[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n100',
                output: 'false',
                isHidden: true,
                order: 4,
            },
        ];

        for (const testCase of testCases) {
            await prisma.testCase.create({
                data: testCase,
            });
        }
    }

    if (validParenthesesProblem) {
        const testCases = [
            {
                problemId: validParenthesesProblem.id,
                input: '"()"',
                output: 'true',
                isHidden: false,
                order: 1,
            },
            {
                problemId: validParenthesesProblem.id,
                input: '"()[]{}"',
                output: 'true',
                isHidden: false,
                order: 2,
            },
            {
                problemId: validParenthesesProblem.id,
                input: '"(]"',
                output: 'false',
                isHidden: false,
                order: 3,
            },
            {
                problemId: validParenthesesProblem.id,
                input: '"([)]"',
                output: 'false',
                isHidden: true,
                order: 4,
            },
        ];

        for (const testCase of testCases) {
            await prisma.testCase.create({
                data: testCase,
            });
        }
    }

    console.log('✅ Test cases seeded successfully');
}

async function main() {
    try {
        await seedTopics();
        await seedProblems();
        await seedTestCases();

        console.log('🎉 All data seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

if (require.main === module) {
    main();
}

export { seedTopics, seedProblems, seedTestCases };
