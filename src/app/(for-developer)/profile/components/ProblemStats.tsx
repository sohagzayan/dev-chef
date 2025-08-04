'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Eye, EyeOff, Target, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProblemStatsProps {
    stats: {
        total: number;
        solved: number;
        attempting: number;
        easy: { total: number; solved: number };
        medium: { total: number; solved: number };
        hard: { total: number; solved: number };
    };
    showStats: boolean;
    onToggleStats: () => void;
}

export default function ProblemStats({ stats, showStats, onToggleStats }: ProblemStatsProps) {
    const progressPercentage = (stats.solved / stats.total) * 100;
    const circumference = 2 * Math.PI * 60; // radius = 60
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            <Card className="border-0 bg-white shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#94f27f] to-[#79d65e]">
                                <Target className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-bold text-[rgba(14,15,12,1)] sm:text-2xl">
                                    Problem Solved
                                </CardTitle>
                                <p className="text-sm text-[rgba(106,108,106,1)]">
                                    Track your coding progress
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onToggleStats}
                            className="hover:bg-gray-100"
                        >
                            {showStats ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
                        {/* Enhanced Circular Progress */}
                        <div className="relative flex-shrink-0">
                            <svg
                                className="h-32 w-32 -rotate-90 transform sm:h-40 sm:w-40"
                                viewBox="0 0 140 140"
                            >
                                {/* Background circle */}
                                <circle
                                    cx="70"
                                    cy="70"
                                    r="60"
                                    stroke="#e5e7eb"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                {/* Progress circle */}
                                <circle
                                    cx="70"
                                    cy="70"
                                    r="60"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    className="transition-all duration-1000 ease-out"
                                />
                                {/* Gradient definition */}
                                <defs>
                                    <linearGradient
                                        id="progressGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="0%"
                                    >
                                        <stop offset="0%" stopColor="#94f27f" />
                                        <stop offset="50%" stopColor="#79d65e" />
                                        <stop offset="100%" stopColor="#6ac54d" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Center content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                                        <CheckCircle className="h-4 w-4 text-[#94f27f] sm:h-6 sm:w-6" />
                                        <div className="text-2xl font-bold text-[rgba(14,15,12,1)] sm:text-3xl">
                                            {stats.solved}/{stats.total}
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-[rgba(106,108,106,1)]">
                                        Solved
                                    </div>
                                    <div className="mt-1 text-xs text-[rgba(106,108,106,1)]">
                                        {progressPercentage.toFixed(1)}% Complete
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Difficulty Breakdown */}
                        <div className="w-full flex-1 space-y-4">
                            {/* Attempting Section */}
                            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                                        <Clock className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-base font-semibold text-blue-900 sm:text-lg">
                                            {stats.attempting} Attempting
                                        </div>
                                        <div className="text-sm text-blue-600">
                                            Problems in progress
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Difficulty Levels */}
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#94f27f]">
                                            <Zap className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="font-semibold text-green-700">Easy</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base font-bold text-green-900 sm:text-lg">
                                            {stats.easy.solved}/{stats.easy.total}
                                        </span>
                                        <Badge className="bg-green-100 text-xs text-green-800 hover:bg-green-200">
                                            {((stats.easy.solved / stats.easy.total) * 100).toFixed(
                                                1,
                                            )}
                                            %
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 p-3 sm:p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500">
                                            <Target className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="font-semibold text-yellow-700">
                                            Medium
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base font-bold text-yellow-900 sm:text-lg">
                                            {stats.medium.solved}/{stats.medium.total}
                                        </span>
                                        <Badge className="bg-yellow-100 text-xs text-yellow-800 hover:bg-yellow-200">
                                            {(
                                                (stats.medium.solved / stats.medium.total) *
                                                100
                                            ).toFixed(1)}
                                            %
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-red-50 to-pink-50 p-3 sm:p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                                            <Zap className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="font-semibold text-red-700">Hard</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base font-bold text-red-900 sm:text-lg">
                                            {stats.hard.solved}/{stats.hard.total}
                                        </span>
                                        <Badge className="bg-red-100 text-xs text-red-800 hover:bg-red-200">
                                            {((stats.hard.solved / stats.hard.total) * 100).toFixed(
                                                1,
                                            )}
                                            %
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
