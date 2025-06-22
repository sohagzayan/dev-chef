'use client';

import { motion } from 'framer-motion';
import { Clock, Loader2, Shield, TrendingUp, Trophy, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Problem {
    id: string;
    title: string;
    difficulty: string;
    status: string;
    successRate: number;
    maxScore: number;
    solvedBy: number;
    tags: string[];
    companies: string[];
    estimatedTime: string;
}

interface ProblemsListProps {
    problems: Problem[];
    loading: boolean;
    hasMore: boolean;
    lastProblemElementRef: (node: HTMLDivElement) => void;
}

export function ProblemsList({
    problems,
    loading,
    hasMore,
    lastProblemElementRef,
}: ProblemsListProps) {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'Medium':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'Hard':
                return 'bg-red-50 text-red-700 border-red-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Solved':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'Attempted':
                return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'Unsolved':
                return 'bg-gray-50 text-gray-700 border-gray-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-4">
            {problems.map((problem, index) => (
                <motion.div
                    key={problem.id}
                    ref={index === problems.length - 1 ? lastProblemElementRef : null}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ y: -2 }}
                >
                    <Card className="group border-0 shadow-md transition-all duration-300 hover:shadow-xl">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="mb-3 flex items-center gap-3">
                                        <h3 className="cursor-pointer text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 hover:text-blue-600">
                                            {problem.title}
                                        </h3>
                                        <Badge
                                            className={`${getDifficultyColor(problem.difficulty)} border font-medium`}
                                        >
                                            {problem.difficulty}
                                        </Badge>
                                        <Badge
                                            className={`${getStatusColor(problem.status)} border font-medium`}
                                        >
                                            {problem.status}
                                        </Badge>
                                    </div>

                                    <div className="mb-4 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                                        <div className="flex items-center gap-2">
                                            <Trophy className="h-4 w-4 text-yellow-500" />
                                            <span className="text-gray-600">Score:</span>
                                            <span className="font-semibold">
                                                {problem.maxScore}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                            <span className="text-gray-600">Success:</span>
                                            <span className="font-semibold">
                                                {problem.successRate}%
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-blue-500" />
                                            <span className="text-gray-600">Solved:</span>
                                            <span className="font-semibold">
                                                {problem.solvedBy.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-purple-500" />
                                            <span className="text-gray-600">Time:</span>
                                            <span className="font-semibold">
                                                {problem.estimatedTime}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {problem.tags.slice(0, 3).map((tag: string) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="bg-gray-100 text-xs text-gray-700"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {problem.companies
                                                .slice(0, 2)
                                                .map((company: string) => (
                                                    <Badge
                                                        key={company}
                                                        className="border-blue-200 bg-blue-50 text-xs text-blue-700"
                                                    >
                                                        {company}
                                                    </Badge>
                                                ))}
                                        </div>
                                    </div>
                                </div>

                                <Button className="ml-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:from-blue-700 hover:to-blue-800">
                                    Solve Challenge
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}

            {loading && (
                <div className="flex justify-center py-12">
                    <div className="flex items-center gap-3">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                        <span className="font-medium text-gray-600">
                            Loading more challenges...
                        </span>
                    </div>
                </div>
            )}

            {!hasMore && problems.length > 0 && (
                <div className="py-12 text-center">
                    <div className="inline-flex items-center gap-2 text-gray-500">
                        <Shield className="h-5 w-5" />
                        <span>Youve mastered all available challenges in this topic!</span>
                    </div>
                </div>
            )}
        </div>
    );
}
