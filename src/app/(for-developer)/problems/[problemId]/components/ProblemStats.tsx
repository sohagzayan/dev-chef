'use client';

import { Problem } from '@/lib/api/problems';

type ProblemStatsProps = {
    problem: Problem;
};

const ProblemStats: React.FC<ProblemStatsProps> = ({ problem }) => {
    // Calculate acceptance rate based on success rate
    const acceptanceRate = problem.successRate;
    const totalSubmissions = Math.round((problem.solvedBy.length * 100) / acceptanceRate);
    const acceptedSubmissions = problem.solvedBy.length;

    return (
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                            Accepted {acceptedSubmissions.toLocaleString()}/
                            {totalSubmissions.toLocaleString()}
                        </div>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                            Acceptance Rate {acceptanceRate}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex cursor-pointer items-center justify-between rounded border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-100">
                            <span className="text-xs text-blue-600">🏷️</span>
                        </div>
                        <span className="font-medium text-gray-900">Topics</span>
                    </div>
                    <div className="text-gray-400">›</div>
                </div>

                <div className="flex cursor-pointer items-center justify-between rounded border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-orange-100">
                            <span className="text-xs text-orange-600">🔒</span>
                        </div>
                        <span className="font-medium text-orange-600">Companies</span>
                    </div>
                    <div className="text-gray-400">›</div>
                </div>

                <div className="flex cursor-pointer items-center justify-between rounded border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-yellow-100">
                            <span className="text-xs text-yellow-600">💡</span>
                        </div>
                        <span className="font-medium text-gray-900">Hint 1</span>
                    </div>
                    <div className="text-gray-400">›</div>
                </div>

                <div className="flex cursor-pointer items-center justify-between rounded border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-yellow-100">
                            <span className="text-xs text-yellow-600">💡</span>
                        </div>
                        <span className="font-medium text-gray-900">Hint 2</span>
                    </div>
                    <div className="text-gray-400">›</div>
                </div>

                <div className="flex cursor-pointer items-center justify-between rounded border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-yellow-100">
                            <span className="text-xs text-yellow-600">💡</span>
                        </div>
                        <span className="font-medium text-gray-900">Hint 3</span>
                    </div>
                    <div className="text-gray-400">›</div>
                </div>

                <div className="flex cursor-pointer items-center justify-between rounded border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-green-100">
                            <span className="text-xs text-green-600">📋</span>
                        </div>
                        <span className="font-medium text-gray-900">Similar Questions</span>
                    </div>
                    <div className="text-gray-400">›</div>
                </div>

                <div className="flex cursor-pointer items-center justify-between rounded border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-purple-100">
                            <span className="text-xs text-purple-600">💬</span>
                        </div>
                        <span className="font-medium text-gray-900">Discussion (1.5K)</span>
                    </div>
                    <div className="text-gray-400">›</div>
                </div>
            </div>
        </div>
    );
};

export default ProblemStats;
