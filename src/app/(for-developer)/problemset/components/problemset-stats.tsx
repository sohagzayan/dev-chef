'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, LogIn, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface ProblemsetStatsProps {
    stats: {
        total: number;
        solved: number;
        attempted: number;
        unsolved: number;
        completionRate?: number;
        totalSolved?: number;
        averageSolvedPerProblem?: number;
    };
    loading?: boolean;
    isFiltered?: boolean;
    filterInfo?: string;
    isAuthenticated?: boolean;
}

export function ProblemsetStats({
    stats,
    loading = false,
    isFiltered,
    filterInfo,
    isAuthenticated: propIsAuthenticated,
}: ProblemsetStatsProps) {
    // Use the prop value for server-side rendering, fallback to context for client-side updates
    const [mounted, setMounted] = useState(false);
    const { isAuthenticated: contextIsAuthenticated } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    // During SSR, use the prop value. After hydration, use context if available
    const isAuthenticated = mounted
        ? (propIsAuthenticated ?? contextIsAuthenticated)
        : propIsAuthenticated;

    const completionRate =
        stats.completionRate ??
        (stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0);

    const StatCard = ({
        title,
        value,
        icon: Icon,
        iconBgColor,
        iconColor,
        valueColor,
    }: {
        title: string;
        value: string | number;
        icon: any;
        iconBgColor: string;
        iconColor: string;
        valueColor: string;
    }) => (
        <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-6 shadow-lg transition-all duration-300 hover:bg-gray-900/70 hover:shadow-xl">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">{title}</p>
                    {loading ? (
                        <div className="mt-2 h-8 w-16 animate-pulse rounded bg-gray-700"></div>
                    ) : (
                        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
                    )}
                </div>
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBgColor}`}
                >
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
            </div>
        </div>
    );

    // Show general stats for unauthenticated users
    if (!isAuthenticated && !loading) {
        return (
            <div className="mb-6 space-y-4">
                {/* Filter Indicator */}
                {isFiltered && filterInfo && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-3"
                    >
                        <p className="text-sm text-blue-300">
                            <span className="font-medium">Filtered by:</span> {filterInfo}
                        </p>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 gap-4 md:grid-cols-4"
                >
                    {/* Total Problems */}
                    <StatCard
                        title="Total Problems"
                        value={stats.total}
                        icon={Target}
                        iconBgColor="bg-blue-900/30 border border-blue-500/30"
                        iconColor="text-blue-400"
                        valueColor="text-white"
                    />

                    {/* Total Solved (Community) */}
                    <StatCard
                        title="Community Solved"
                        value={stats.totalSolved || stats.solved}
                        icon={CheckCircle}
                        iconBgColor="bg-green-900/30 border border-green-500/30"
                        iconColor="text-green-400"
                        valueColor="text-green-400"
                    />

                    {/* Average Solved Per Problem */}
                    <StatCard
                        title="Avg. Solved/Problem"
                        value={stats.averageSolvedPerProblem || 0}
                        icon={TrendingUp}
                        iconBgColor="bg-orange-900/30 border border-orange-500/30"
                        iconColor="text-orange-400"
                        valueColor="text-orange-400"
                    />

                    {/* Completion Rate */}
                    <StatCard
                        title="Success Rate"
                        value={`${completionRate}%`}
                        icon={TrendingUp}
                        iconBgColor="bg-purple-900/30 border border-purple-500/30"
                        iconColor="text-purple-400"
                        valueColor="text-purple-400"
                    />
                </motion.div>

                {/* Login Prompt Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8 text-center shadow-lg"
                >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/30 bg-blue-900/30">
                        <LogIn className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">Track Your Progress</h3>
                    <p className="mb-6 text-gray-300">
                        Sign in to see your solved problems, track your progress, and get
                        personalized statistics.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/developers/login">
                            <Button className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
                        </Link>
                        <Link href="/developers/signup">
                            <Button
                                variant="outline"
                                className="border-blue-500 text-blue-400 hover:bg-blue-900/20"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="mb-6 space-y-4">
            {/* Filter Indicator */}
            {isFiltered && filterInfo && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-3"
                >
                    <p className="text-sm text-blue-300">
                        <span className="font-medium">Filtered by:</span> {filterInfo}
                    </p>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 gap-4 md:grid-cols-4"
            >
                {/* Total Problems */}
                <StatCard
                    title="Total Problems"
                    value={stats.total}
                    icon={Target}
                    iconBgColor="bg-blue-900/30 border border-blue-500/30"
                    iconColor="text-blue-400"
                    valueColor="text-white"
                />

                {/* Solved Problems */}
                <StatCard
                    title="Solved"
                    value={stats.solved}
                    icon={CheckCircle}
                    iconBgColor="bg-green-900/30 border border-green-500/30"
                    iconColor="text-green-400"
                    valueColor="text-green-400"
                />

                {/* Attempted Problems */}
                <StatCard
                    title="Attempted"
                    value={stats.attempted}
                    icon={Clock}
                    iconBgColor="bg-orange-900/30 border border-orange-500/30"
                    iconColor="text-orange-400"
                    valueColor="text-orange-400"
                />

                {/* Completion Rate */}
                <StatCard
                    title="Completion"
                    value={`${completionRate}%`}
                    icon={TrendingUp}
                    iconBgColor="bg-purple-900/30 border border-purple-500/30"
                    iconColor="text-purple-400"
                    valueColor="text-purple-400"
                />
            </motion.div>
        </div>
    );
}
