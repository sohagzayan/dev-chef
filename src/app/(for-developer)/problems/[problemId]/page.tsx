'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AuthDebug from './components/AuthDebug';
import Workspace from './components/Workspace';

interface Problem {
    id: string;
    title: string;
    slug: string;
    description: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    tags: string[];
    companyTags: string[];
    timeLimit: number;
    memoryLimit: number;
    successRate: number;
    score: number;
    topic: {
        id: string;
        name: string;
        slug: string;
    };
    status: 'UNSOLVED' | 'ATTEMPTED' | 'SOLVED';
    lastAttempted?: string;
    bestScore?: number;
    attempts: number;
    submissionCount: number;
    isActive: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
    // Additional properties for UI compatibility
    maxScore: number;
    solvedBy: string[]; // Array of user IDs who solved this problem
    companies: string[];
    estimatedTime: string;
    hints?: string[];
}

export default function ProblemPage() {
    const params = useParams();
    const problemId = params.problemId as string;

    const [problem, setProblem] = useState<Problem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshProblem = () => {
        setRefreshKey((prev) => prev + 1);
    };

    useEffect(() => {
        if (!problemId) {
            setError('Problem ID is required');
            setLoading(false);
            return;
        }

        const fetchProblem = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/v1/problems/${problemId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Problem not found');
                    }
                    throw new Error('Failed to fetch problem');
                }

                const result = await response.json();

                if (result.success) {
                    setProblem(result.data);
                } else {
                    throw new Error(result.message || 'Failed to fetch problem');
                }
            } catch (err) {
                console.error('Error fetching problem:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, [problemId, refreshKey]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="text-lg text-gray-600">Loading problem...</div>
                <AuthDebug />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="text-lg text-red-600">Error: {error}</div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="text-lg text-red-600">Problem not found</div>
            </div>
        );
    }

    // Transform the API data to match the expected format for Workspace component
    const transformedProblem = {
        ...problem,
        category: problem.topic.name,
        companies: problem.companyTags,
        examples: [
            {
                input: 'Example input will be added',
                output: 'Example output will be added',
                explanation: 'Example explanation will be added',
            },
        ],
        constraints: ['Constraints will be added'],
        starterCode: problem.starterCode || {
            javascript: `// JavaScript starter code will be added`,
            python: `# Python starter code will be added`,
            java: `// Java starter code will be added`,
            cpp: `// C++ starter code will be added`,
        },
        testCases: (problem.testCases || []).map((tc) => ({
            id: tc.id,
            name: tc.name,
            inputs: tc.inputs || {},
            expectedOutput: tc.expectedOutput || (tc as any).output,
            isCustom: tc.isCustom,
        })),
        solutions: [],
        editorial: {
            id: '1',
            title: 'Solution',
            content: 'Solution content will be added',
            approach: 'Approach will be added',
            algorithm: 'Algorithm will be added',
            code: 'Code will be added',
            language: 'java',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
        },
        submissions: [],
        hints: [],
        acceptanceRate: problem.successRate,
        totalSubmissions: problem.submissionCount,
        solvedBy: problem.solvedBy,
        isPremium: false,
        estimatedTime: problem.estimatedTime,
        order: problem.order,
        createdAt: problem.createdAt,
        updatedAt: problem.updatedAt,
    };

    return (
        <div className="h-screen w-full overflow-hidden">
            <Workspace
                key={problem.id}
                problem={transformedProblem}
                onSuccessfulSubmission={refreshProblem}
            />
            <AuthDebug />
        </div>
    );
}
