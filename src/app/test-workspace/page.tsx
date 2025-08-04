'use client';

import { useState } from 'react';
import { Problem } from '@/lib/api/problems';
import Workspace from '../(for-developer)/problems/[problemId]/components/Workspace';

export default function TestWorkspacePage() {
    const [problem] = useState<Problem>({
        id: 'test-1',
        title: 'Search a 2D Matrix',
        slug: 'search-a-2d-matrix',
        description: `Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

• Integers in each row are sorted from left to right.
• The first integer of each row is greater than the last integer of the previous row.

Return true if target is in matrix, or false otherwise.

You must write a solution in O(log(m * n)) time complexity.`,
        difficulty: 'MEDIUM',
        tags: ['Array', 'Binary Search', 'Matrix'],
        companyTags: ['Google', 'Microsoft', 'Amazon'],
        timeLimit: 3000,
        memoryLimit: 256,
        successRate: 85,
        score: 100,
        topic: {
            id: 'algorithms',
            name: 'Algorithms',
            slug: 'algorithms',
        },
        status: 'UNSOLVED',
        attempts: 0,
        submissionCount: 0,
        isActive: true,
        order: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        maxScore: 100,
        solvedBy: ['user123', 'user456'],
        companies: ['Google', 'Microsoft', 'Amazon'],
        estimatedTime: '30 min',
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b border-gray-200 bg-white px-6 py-4">
                <h1 className="text-2xl font-bold text-gray-900">Workspace Test</h1>
                <p className="mt-2 text-gray-600">
                    Testing the new workspace component with split panels
                </p>
            </div>
            <Workspace problem={problem} />
        </div>
    );
}
