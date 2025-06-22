/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import { Clock, Trophy, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { pastContests, upcomingContests } from '@/data/problem-data';

interface ContestsSectionProps {
    onContestRegister: (contestId: string) => void;
    onContestView: (contestId: string) => void;
}

export function ContestsSection({ onContestRegister, onContestView }: ContestsSectionProps) {
    return (
        <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-12"
        >
            {/* Upcoming Contests */}
            <div>
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="mb-2 flex items-center gap-3 text-3xl font-bold text-gray-900">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                                <Clock className="h-5 w-5 text-white" />
                            </div>
                            Upcoming Contests
                        </h2>
                        <p className="text-gray-600">
                            Compete with developers worldwide and win exciting prizes
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                        View All Contests
                    </Button>
                </div>

                <div className="professional-table">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="table-header">
                                <tr>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Contest
                                    </th>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Start Time
                                    </th>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Duration
                                    </th>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Prize Pool
                                    </th>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Difficulty
                                    </th>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Starts In
                                    </th>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingContests.map((contest: any, index: number) => (
                                    <motion.tr
                                        key={contest.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="table-row"
                                    >
                                        <td className="p-6">
                                            <div>
                                                <div className="mb-1 font-semibold text-gray-900">
                                                    {contest.name}
                                                </div>
                                                <div className="font-mono text-sm text-gray-500">
                                                    {contest.id}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-sm text-gray-700">
                                            {contest.startTime}
                                        </td>
                                        <td className="p-6">
                                            <Badge className="border-blue-200 bg-blue-50 text-blue-700">
                                                {contest.duration}
                                            </Badge>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <Trophy className="h-4 w-4 text-yellow-500" />
                                                <span className="font-semibold text-green-700">
                                                    {contest.prize}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <Badge
                                                className={
                                                    contest.difficulty === 'Advanced'
                                                        ? 'border-red-200 bg-red-50 text-red-700'
                                                        : 'border-yellow-200 bg-yellow-50 text-yellow-700'
                                                }
                                            >
                                                {contest.difficulty}
                                            </Badge>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500"></div>
                                                <span className="font-semibold text-orange-700">
                                                    {contest.startsIn}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <Button
                                                size="sm"
                                                className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                                                onClick={() => onContestRegister(contest.id)}
                                            >
                                                Register Now
                                            </Button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Past Contests */}
            <div>
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="mb-2 flex items-center gap-3 text-3xl font-bold text-gray-900">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                                <Trophy className="h-5 w-5 text-white" />
                            </div>
                            Past Contests
                        </h2>
                        <p className="text-gray-600">
                            Review previous competitions and learn from top performers
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                        View All Results
                    </Button>
                </div>

                <div className="professional-table">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="table-header">
                                <tr>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Contest
                                    </th>
                                    <th className="p-6 text-left font-bold text-gray-900">Date</th>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Duration
                                    </th>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Participants
                                    </th>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Winner
                                    </th>
                                    <th className="p-6 text-left font-bold text-gray-900">Prize</th>
                                    <th className="p-6 text-left font-bold text-gray-900">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastContests.map((contest: any, index: number) => (
                                    <motion.tr
                                        key={contest.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="table-row"
                                    >
                                        <td className="p-6">
                                            <div>
                                                <div className="mb-1 font-semibold text-gray-900">
                                                    {contest.name}
                                                </div>
                                                <div className="font-mono text-sm text-gray-500">
                                                    {contest.id}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-sm text-gray-700">
                                            {contest.startTime}
                                        </td>
                                        <td className="p-6">
                                            <Badge className="border-gray-200 bg-gray-50 text-gray-700">
                                                {contest.duration}
                                            </Badge>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-blue-500" />
                                                <span className="font-semibold">
                                                    {contest.participants.toLocaleString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500">
                                                    <span className="text-xs">👑</span>
                                                </div>
                                                <span className="font-semibold text-gray-900">
                                                    {contest.winner}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="font-semibold text-green-700">
                                                {contest.prize}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                                                onClick={() => onContestView(contest.id)}
                                            >
                                                View Results
                                            </Button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
