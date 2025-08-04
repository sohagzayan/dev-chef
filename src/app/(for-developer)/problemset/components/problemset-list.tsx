'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Shield, Star } from 'lucide-react';
import { Problem } from '@/lib/api/problems';
import { ProblemsetPagination } from './problemset-pagination';

interface ProblemsetListProps {
    problems: Problem[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function ProblemsetList({
    problems,
    loading,
    currentPage,
    totalPages,
    onPageChange,
}: ProblemsetListProps) {
    const router = useRouter();

    console.log('problems----10', problems);
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'EASY':
                return 'text-green-400';
            case 'MEDIUM':
                return 'text-orange-400';
            case 'HARD':
                return 'text-red-400';
            default:
                return 'text-gray-400';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'SOLVED':
                return <CheckCircle className="h-4 w-4 text-green-400" />;
            case 'ATTEMPTED':
                return <Circle className="h-4 w-4 text-orange-400" />;
            case 'UNSOLVED':
            default:
                return <Circle className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        if (status === 'SOLVED') {
            return (
                <div className="flex items-center gap-1 rounded-full border border-green-500/30 bg-green-900/30 px-2 py-1 text-xs font-medium text-green-400">
                    <CheckCircle className="h-3 w-3" />
                    <span>Solved</span>
                </div>
            );
        }
        return null;
    };

    if (problems.length === 0 && !loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
            >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gray-700 bg-gray-800">
                    <Shield className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">No problems found</h3>
                <p className="text-gray-400">Try adjusting your filters to find more problems.</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Problems List */}
            <div className="space-y-2">
                {problems.map((problem, index) => (
                    <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{
                            backgroundColor: problem.isSolved
                                ? 'rgba(34, 197, 94, 0.1)'
                                : 'rgba(55, 65, 81, 0.5)',
                        }}
                        className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                            problem.isSolved
                                ? 'border-green-500/30 bg-green-900/20'
                                : 'border-gray-700 bg-gray-900/50'
                        }`}
                        onClick={() => router.push(`/problems/${problem.id}`)}
                    >
                        <div className="flex items-center justify-between">
                            {/* Left side - Problem info */}
                            <div className="flex flex-1 items-center gap-4">
                                {/* Status icon and problem number */}
                                <div className="flex min-w-[60px] items-center gap-2">
                                    {problem.isSolved ? (
                                        <div className="flex items-center gap-1">
                                            <CheckCircle className="h-5 w-5 text-green-400" />
                                            <span className="text-sm font-medium text-green-400">
                                                {index + 1}.
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            {getStatusIcon(problem.status)}
                                            <span className="text-sm font-medium text-gray-400">
                                                {index + 1}.
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Problem title */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-medium text-white transition-colors hover:text-indigo-400">
                                            {problem.title}
                                        </h3>
                                        {getStatusBadge(problem.status)}
                                    </div>
                                </div>

                                {/* Success rate */}
                                <div className="min-w-[60px] text-right text-sm text-gray-400">
                                    <div className="flex items-center justify-end gap-1">
                                        {problem.isSolved && (
                                            <CheckCircle className="h-3 w-3 text-green-400" />
                                        )}
                                        <span>{problem.successRate}%</span>
                                    </div>
                                </div>

                                {/* Difficulty */}
                                <div
                                    className={`min-w-[50px] text-right text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}
                                >
                                    {problem.difficulty === 'MEDIUM' ? 'Med.' : problem.difficulty}
                                </div>

                                {/* Progress bars */}
                                <div className="flex min-w-[80px] gap-1">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="h-3 w-1 rounded-sm bg-gray-600" />
                                    ))}
                                </div>
                            </div>

                            {/* Right side - Star icon */}
                            <div className="ml-4">
                                <Star
                                    className="h-4 w-4 cursor-pointer text-gray-500 transition-colors hover:text-yellow-400"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // TODO: Add bookmark functionality
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <ProblemsetPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                loading={loading}
            />
        </div>
    );
}
