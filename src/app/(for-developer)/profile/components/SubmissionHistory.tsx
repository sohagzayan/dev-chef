'use client';

import { motion } from 'framer-motion';
import { Calendar, Flame, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ActivityData {
    date: string;
    submissions: number;
}

interface SubmissionHistoryProps {
    activityData: ActivityData[];
    totalActiveDays: number;
    maxStreak: number;
}

export default function SubmissionHistory({
    activityData,
    totalActiveDays,
    maxStreak,
}: SubmissionHistoryProps) {
    const getActivityColor = (submissions: number) => {
        if (submissions === 0) return 'bg-gray-100 hover:bg-gray-200';
        if (submissions === 1) return 'bg-[#94f27f] hover:bg-[#79d65e]';
        if (submissions === 2) return 'bg-[#79d65e] hover:bg-[#6ac54d]';
        if (submissions === 3) return 'bg-[#6ac54d] hover:bg-[#5bb43c]';
        return 'bg-[#5bb43c] hover:bg-[#4ca32b]';
    };

    const getActivityIntensity = (submissions: number) => {
        if (submissions === 0) return 'No activity';
        if (submissions === 1) return '1 submission';
        if (submissions === 2) return '2 submissions';
        if (submissions === 3) return '3 submissions';
        return `${submissions}+ submissions`;
    };

    // Group data by months for better visualization
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <Card className="border-0 bg-white shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#94f27f] to-[#79d65e]">
                                <Calendar className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold text-[rgba(14,15,12,1)] sm:text-xl">
                                    Submission History
                                </CardTitle>
                                <p className="text-sm text-[rgba(106,108,106,1)]">
                                    {activityData.filter((d) => d.submissions > 0).length}{' '}
                                    submissions in the past year
                                </p>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    {/* Stats Overview */}
                    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                                    <Calendar className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-blue-900 sm:text-2xl">
                                        {totalActiveDays}
                                    </div>
                                    <div className="text-sm text-blue-600">Active Days</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="rounded-lg bg-gradient-to-r from-orange-50 to-red-50 p-3 sm:p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                                    <Flame className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-orange-900 sm:text-2xl">
                                        {maxStreak}
                                    </div>
                                    <div className="text-sm text-orange-600">Max Streak</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#94f27f]">
                                    <TrendingUp className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-green-900 sm:text-2xl">
                                        {((totalActiveDays / 365) * 100).toFixed(1)}%
                                    </div>
                                    <div className="text-sm text-green-600">Consistency</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Activity Heatmap */}
                    <div className="mb-6">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <h4 className="font-semibold text-[rgba(14,15,12,1)]">
                                Activity Heatmap
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-[rgba(106,108,106,1)]">
                                <span>Less</span>
                                <div className="flex gap-1">
                                    <div className="h-3 w-3 rounded-sm bg-gray-100"></div>
                                    <div className="h-3 w-3 rounded-sm bg-[#94f27f]"></div>
                                    <div className="h-3 w-3 rounded-sm bg-[#79d65e]"></div>
                                    <div className="h-3 w-3 rounded-sm bg-[#6ac54d]"></div>
                                    <div className="h-3 w-3 rounded-sm bg-[#5bb43c]"></div>
                                </div>
                                <span>More</span>
                            </div>
                        </div>

                        {/* Month labels */}
                        <div className="mb-2 grid grid-cols-12 gap-1">
                            {months.map((month) => (
                                <div
                                    key={month}
                                    className="col-span-1 flex h-6 items-center justify-center text-xs text-[rgba(106,108,106,1)]"
                                >
                                    {month}
                                </div>
                            ))}
                        </div>

                        {/* Activity grid */}
                        <div className="grid grid-cols-52 gap-1 overflow-x-auto">
                            {activityData.map((day, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.001 }}
                                    className={cn(
                                        'h-3 w-3 cursor-pointer rounded-sm transition-all duration-200',
                                        getActivityColor(day.submissions),
                                    )}
                                    title={`${day.date}: ${getActivityIntensity(day.submissions)}`}
                                    whileHover={{ scale: 1.2 }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity Summary */}
                    <div className="rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-3 sm:p-4">
                        <h4 className="mb-3 font-semibold text-[rgba(14,15,12,1)]">
                            Recent Activity
                        </h4>
                        <div className="space-y-2">
                            {activityData
                                .filter((day) => day.submissions > 0)
                                .slice(-5)
                                .reverse()
                                .map((day, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 * index }}
                                        className="flex items-center justify-between rounded-md bg-white p-2 shadow-sm"
                                    >
                                        <div className="flex min-w-0 flex-1 items-center gap-2">
                                            <div
                                                className={cn(
                                                    'h-2 w-2 flex-shrink-0 rounded-full',
                                                    day.submissions === 1
                                                        ? 'bg-[#94f27f]'
                                                        : day.submissions === 2
                                                          ? 'bg-[#79d65e]'
                                                          : 'bg-[#6ac54d]',
                                                )}
                                            />
                                            <span className="truncate text-sm font-medium text-[rgba(14,15,12,1)]">
                                                {new Date(day.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="flex-shrink-0 text-xs"
                                        >
                                            {day.submissions} submission
                                            {day.submissions !== 1 ? 's' : ''}
                                        </Badge>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
