'use client';

import { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiMemoryCard } from 'react-icons/bi';

interface Submission {
    id: string;
    status:
        | 'ACCEPTED'
        | 'WRONG_ANSWER'
        | 'COMPILATION_ERROR'
        | 'TIME_LIMIT_EXCEEDED'
        | 'MEMORY_LIMIT_EXCEEDED';
    language: string;
    runtime: number;
    memory: number;
    submittedAt: string;
    testCasesPassed?: number;
    totalTestCases?: number;
    code?: string;
}

interface SubmissionsTabProps {
    problemId: string;
}

const SubmissionsTab: React.FC<SubmissionsTabProps> = ({ problemId }) => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [languageFilter, setLanguageFilter] = useState<string>('all');

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`/api/v1/submissions?problemId=${problemId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setSubmissions(data.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching submissions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [problemId]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACCEPTED':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'WRONG_ANSWER':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'COMPILATION_ERROR':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'TIME_LIMIT_EXCEEDED':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'MEMORY_LIMIT_EXCEEDED':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusLabel = (status: string) => {
        return status
            .replace('_', ' ')
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

        return date.toLocaleDateString();
    };

    const filteredSubmissions = submissions.filter((submission) => {
        if (statusFilter !== 'all' && submission.status !== statusFilter) return false;
        if (languageFilter !== 'all' && submission.language !== languageFilter) return false;
        return true;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-gray-600">Loading submissions...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Your Submissions</h3>
                <div className="flex items-center space-x-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="ACCEPTED">Accepted</option>
                        <option value="WRONG_ANSWER">Wrong Answer</option>
                        <option value="COMPILATION_ERROR">Compilation Error</option>
                        <option value="TIME_LIMIT_EXCEEDED">Time Limit Exceeded</option>
                        <option value="MEMORY_LIMIT_EXCEEDED">Memory Limit Exceeded</option>
                    </select>
                    <select
                        value={languageFilter}
                        onChange={(e) => setLanguageFilter(e.target.value)}
                        className="rounded border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="all">All Languages</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>
            </div>

            {/* Submissions Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                    <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-700">
                        <div className="flex items-center">
                            Status
                            <svg
                                className="ml-1 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                        <div className="flex items-center">
                            Language
                            <svg
                                className="ml-1 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                        <div>Runtime</div>
                        <div>Memory</div>
                        <div>Notes</div>
                    </div>
                </div>

                {filteredSubmissions.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                        <div className="mb-4 text-6xl text-gray-400">📊</div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            No Submissions Yet
                        </h3>
                        <p className="text-gray-600">
                            Submit your solution to see your submission history
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {filteredSubmissions.map((submission, index) => (
                            <div key={submission.id} className="px-4 py-3 hover:bg-gray-50">
                                <div className="grid grid-cols-5 items-center gap-4">
                                    {/* Status */}
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getStatusColor(submission.status)}`}
                                            >
                                                {getStatusLabel(submission.status)}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div className="mt-1 text-xs text-gray-500">
                                            {formatTimeAgo(submission.submittedAt)}
                                        </div>
                                    </div>

                                    {/* Language */}
                                    <div>
                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                            {submission.language}
                                        </span>
                                    </div>

                                    {/* Runtime */}
                                    <div className="flex items-center space-x-1">
                                        <AiOutlineClockCircle className="text-gray-400" size={14} />
                                        <span className="text-sm text-gray-900">
                                            {submission.runtime} ms
                                        </span>
                                    </div>

                                    {/* Memory */}
                                    <div className="flex items-center space-x-1">
                                        <BiMemoryCard className="text-gray-400" size={14} />
                                        <span className="text-sm text-gray-900">
                                            {submission.memory} MB
                                        </span>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <span className="text-sm text-gray-500">-</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Submission Details Modal (would be implemented) */}
            {submissions.length > 0 && (
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Click on any submission to view detailed results and code
                    </p>
                </div>
            )}
        </div>
    );
};

export default SubmissionsTab;
