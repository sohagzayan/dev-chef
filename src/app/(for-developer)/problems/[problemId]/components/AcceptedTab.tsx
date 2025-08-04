'use client';

import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTrendingUp } from 'react-icons/bi';
import { useAuth } from '@/context/AuthContext';

interface AcceptedSubmission {
    id: string;
    status: string;
    language: string;
    runtime: number;
    memory: number;
    submittedAt: string;
    testCasesPassed: number;
    totalTestCases: number;
    code: string;
    runtimePercentile: number;
    memoryPercentile: number;
}

interface AcceptedTabProps {
    problemId: string;
}

const AcceptedTab: React.FC<AcceptedTabProps> = ({ problemId }) => {
    const [submission, setSubmission] = useState<AcceptedSubmission | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchAcceptedSubmission = async () => {
            // If user is not authenticated, don't fetch submissions
            if (!isAuthenticated) {
                setLoading(false);
                setError('Please log in to view your submissions');
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `/api/v1/submissions?problemId=${problemId}&status=ACCEPTED&limit=1`,
                    {
                        credentials: 'include', // Include cookies for authentication
                    },
                );

                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.data.length > 0) {
                        const latestSubmission = data.data[0];
                        setSubmission({
                            id: latestSubmission.id,
                            status: latestSubmission.status,
                            language: latestSubmission.language,
                            runtime: latestSubmission.runtime || 0,
                            memory: latestSubmission.memory || 0,
                            submittedAt: latestSubmission.submittedAt,
                            testCasesPassed:
                                latestSubmission.testResults?.filter(
                                    (r: any) => r.status === 'PASSED',
                                ).length || 0,
                            totalTestCases: latestSubmission.testResults?.length || 0,
                            code: latestSubmission.code,
                            runtimePercentile: 71.12, // Mock data - would come from API
                            memoryPercentile: 54.8, // Mock data - would come from API
                        });
                    } else {
                        // No accepted submissions found for current user
                        setSubmission(null);
                    }
                } else {
                    setError('Failed to fetch submission data');
                }
            } catch (error) {
                console.error('Error fetching accepted submission:', error);
                setError('Failed to fetch submission data');
            } finally {
                setLoading(false);
            }
        };

        fetchAcceptedSubmission();
    }, [problemId, isAuthenticated]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-gray-600">Loading accepted submission...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8 text-center">
                <div className="mb-4 text-6xl">⚠️</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Authentication Required
                </h3>
                <p className="text-gray-600">{error}</p>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="py-8 text-center">
                <div className="mb-4 text-6xl">🎯</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    No Accepted Submission Yet
                </h3>
                <p className="text-gray-600">
                    Submit your solution to see your accepted submission here
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                    <AiOutlineArrowLeft size={14} />
                    <span>← All Submissions</span>
                </button>
            </div>

            {/* Status Banner */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-center space-x-2">
                    <AiOutlineCheckCircle className="text-green-600" size={20} />
                    <div>
                        <h3 className="text-lg font-semibold text-green-800">Accepted</h3>
                        <p className="text-sm text-green-700">
                            {submission.testCasesPassed} / {submission.totalTestCases} testcases
                            passed
                        </p>
                    </div>
                </div>
                <p className="mt-2 text-sm text-green-600">
                    Submitted by You on{' '}
                    {new Date(submission.submittedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Runtime */}
                <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">Runtime</h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gray-900">
                                {submission.runtime} ms
                            </span>
                            <div className="flex items-center space-x-1 text-green-600">
                                <BiTrendingUp size={16} />
                                <span className="text-sm font-medium">
                                    Beats {submission.runtimePercentile}%
                                </span>
                            </div>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                            Analyze Complexity
                        </button>
                    </div>
                </div>

                {/* Memory */}
                <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">Memory</h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gray-900">
                                {submission.memory} MB
                            </span>
                            <div className="flex items-center space-x-1 text-green-600">
                                <BiTrendingUp size={16} />
                                <span className="text-sm font-medium">
                                    Beats {submission.memoryPercentile}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Distribution Charts */}
            <div className="space-y-6">
                {/* Runtime Distribution */}
                <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-4 text-lg font-semibold text-gray-900">
                        Runtime Distribution
                    </h4>
                    <div className="flex h-32 items-end justify-between rounded bg-gray-50 px-4 py-2">
                        {[15, 30, 44, 59, 74, 89, 103].map((ms, index) => (
                            <div key={ms} className="flex flex-col items-center">
                                <div
                                    className="mb-2 w-8 rounded-t bg-blue-200"
                                    style={{
                                        height: `${Math.random() * 60 + 20}%`,
                                        position: 'relative',
                                    }}
                                >
                                    {index === 2 && (
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white">
                                            3.3% of solutions used {ms} ms
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs text-gray-600">{ms}ms</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>0%</span>
                        <span>20%</span>
                        <span>40%</span>
                        <span>60%</span>
                    </div>
                </div>

                {/* Memory Distribution */}
                <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-4 text-lg font-semibold text-gray-900">
                        Memory Distribution
                    </h4>
                    <div className="flex h-32 items-end justify-between rounded bg-gray-50 px-4 py-2">
                        {[15, 30, 44, 59, 74, 89, 103].map((ms) => (
                            <div key={ms} className="flex flex-col items-center">
                                <div
                                    className="mb-2 w-8 rounded-t bg-green-200"
                                    style={{ height: `${Math.random() * 60 + 20}%` }}
                                ></div>
                                <span className="text-xs text-gray-600">{ms}ms</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>0%</span>
                        <span>20%</span>
                        <span>40%</span>
                        <span>60%</span>
                    </div>
                </div>
            </div>

            {/* Code Section */}
            <div className="rounded-lg border border-gray-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">Solution Code</h4>
                    <span className="text-sm text-gray-600">{submission.language}</span>
                </div>
                <div className="max-h-96 overflow-y-auto rounded-lg bg-gray-900 p-4">
                    <pre className="overflow-x-auto text-sm text-gray-100">
                        <code>{submission.code}</code>
                    </pre>
                </div>
                <button className="mt-3 text-sm text-blue-600 hover:text-blue-800">
                    View more
                </button>
            </div>

            {/* Related Challenges */}
            <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-4 text-lg font-semibold text-gray-900">More challenges</h4>
                <div className="space-y-2">
                    {[
                        { id: '15', title: '3Sum' },
                        { id: '18', title: '4Sum' },
                        { id: '167', title: 'Two Sum II - Input Array Is Sorted' },
                    ].map((challenge) => (
                        <div
                            key={challenge.id}
                            className="flex items-center justify-between rounded p-2 hover:bg-gray-50"
                        >
                            <span className="text-sm text-gray-900">
                                {challenge.id}. {challenge.title}
                            </span>
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notes Section */}
            <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-4 text-lg font-semibold text-gray-900">Notes</h4>
                <textarea
                    className="h-24 w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your notes here"
                />
                <div className="mt-2 flex items-center justify-between">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                        Select related tags
                    </button>
                    <span className="text-sm text-gray-500">0/5</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
                <button className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
                    Editorial
                </button>
                <button className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Solution
                </button>
            </div>
        </div>
    );
};

export default AcceptedTab;
