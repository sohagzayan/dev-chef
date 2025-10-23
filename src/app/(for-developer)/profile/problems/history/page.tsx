'use client';

import { useState } from 'react';
import {
    CalendarIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    FireIcon,
    MagnifyingGlassIcon,
    StarIcon,
    TrophyIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function SolvingHistoryPage() {
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');

    const periods = [
        { id: 'all', label: 'All Time', count: 156, color: 'from-gray-500 to-gray-600' },
        { id: 'today', label: 'Today', count: 3, color: 'from-green-500 to-emerald-600' },
        { id: 'week', label: 'This Week', count: 12, color: 'from-blue-500 to-cyan-600' },
        { id: 'month', label: 'This Month', count: 45, color: 'from-purple-500 to-pink-600' },
        { id: 'year', label: 'This Year', count: 156, color: 'from-orange-500 to-red-600' },
    ];

    const statuses = [
        { id: 'all', label: 'All Statuses', count: 156, color: 'from-gray-500 to-gray-600' },
        { id: 'solved', label: 'Solved', count: 87, color: 'from-green-500 to-emerald-600' },
        { id: 'attempted', label: 'Attempted', count: 45, color: 'from-yellow-500 to-amber-600' },
        { id: 'failed', label: 'Failed', count: 24, color: 'from-red-500 to-pink-600' },
    ];

    const solvingHistory = [
        {
            id: 1,
            problemTitle: 'Two Sum',
            difficulty: 'easy',
            category: 'arrays',
            status: 'solved',
            solvedAt: '2024-01-20T14:15:00Z',
            timeSpent: '15 min',
            attempts: 1,
            rating: 4.8,
            notes: 'First attempt success! Hash table approach worked perfectly.',
            tags: ['Hash Table', 'Two Pointers', 'Array'],
            performance: { accuracy: 100, efficiency: 95, readability: 90 },
            learning: ['Hash table implementation', 'Two-pointer technique', 'Edge case handling'],
        },
        {
            id: 2,
            problemTitle: 'Valid Parentheses',
            difficulty: 'easy',
            category: 'strings',
            status: 'solved',
            solvedAt: '2024-01-19T09:30:00Z',
            timeSpent: '12 min',
            attempts: 1,
            rating: 4.6,
            notes: 'Stack-based solution was intuitive. Good practice for LIFO operations.',
            tags: ['Stack', 'String', 'Early Termination'],
            performance: { accuracy: 100, efficiency: 88, readability: 85 },
            learning: ['Stack operations', 'String manipulation', 'Early return optimization'],
        },
        {
            id: 3,
            problemTitle: 'Merge Sorted Arrays',
            difficulty: 'medium',
            category: 'arrays',
            status: 'attempted',
            solvedAt: null,
            timeSpent: '45 min',
            attempts: 3,
            rating: 4.4,
            notes: 'Struggled with edge cases. Need to practice in-place algorithms more.',
            tags: ['Two Pointers', 'In-place', 'Merge'],
            performance: { accuracy: 60, efficiency: 70, readability: 75 },
            learning: ['In-place algorithms', 'Two-pointer technique', 'Edge case handling'],
        },
        {
            id: 4,
            problemTitle: 'Binary Tree Inorder Traversal',
            difficulty: 'medium',
            category: 'trees',
            status: 'failed',
            solvedAt: null,
            timeSpent: '60 min',
            attempts: 5,
            rating: 4.2,
            notes: 'Recursion was challenging. Need to understand tree traversal better.',
            tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
            performance: { accuracy: 30, efficiency: 40, readability: 60 },
            learning: ['Tree data structure', 'Recursion', 'Depth-first search'],
        },
        {
            id: 5,
            problemTitle: 'Longest Substring Without Repeating Characters',
            difficulty: 'hard',
            category: 'strings',
            status: 'solved',
            solvedAt: '2024-01-16T13:10:00Z',
            timeSpent: '90 min',
            attempts: 7,
            rating: 4.7,
            notes: 'Sliding window technique clicked after several attempts. Very satisfying!',
            tags: ['Sliding Window', 'Hash Table', 'Optimization'],
            performance: { accuracy: 100, efficiency: 92, readability: 88 },
            learning: ['Sliding window', 'Hash table optimization', 'Performance tuning'],
        },
        {
            id: 6,
            problemTitle: 'Regular Expression Matching',
            difficulty: 'expert',
            category: 'dp',
            status: 'attempted',
            solvedAt: null,
            timeSpent: '120 min',
            attempts: 8,
            rating: 4.9,
            notes: 'DP state transitions are complex. Need more practice with 2D DP problems.',
            tags: ['Dynamic Programming', 'Regex', '2D DP'],
            performance: { accuracy: 45, efficiency: 55, readability: 65 },
            learning: ['2D Dynamic Programming', 'State transitions', 'Regex patterns'],
        },
    ];

    const filteredHistory = solvingHistory.filter((problem) => {
        const matchesPeriod =
            selectedPeriod === 'all' ||
            (selectedPeriod === 'today' &&
                new Date(problem.solvedAt || problem.timeSpent).toDateString() ===
                    new Date().toDateString()) ||
            (selectedPeriod === 'week' &&
                new Date(problem.solvedAt || problem.timeSpent) >=
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
            (selectedPeriod === 'month' &&
                new Date(problem.solvedAt || problem.timeSpent) >=
                    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
            (selectedPeriod === 'year' &&
                new Date(problem.solvedAt || problem.timeSpent) >=
                    new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));

        const matchesStatus = selectedStatus === 'all' || problem.status === selectedStatus;
        const matchesSearch =
            problem.problemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesPeriod && matchesStatus && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'solved':
                return 'text-green-600 bg-green-100';
            case 'attempted':
                return 'text-yellow-600 bg-yellow-100';
            case 'failed':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'solved':
                return <CheckCircleIcon className="h-4 w-4" />;
            case 'attempted':
                return <ClockIcon className="h-4 w-4" />;
            case 'failed':
                return <XCircleIcon className="h-4 w-4" />;
            default:
                return <ClockIcon className="h-4 w-4" />;
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'text-green-600 bg-green-100';
            case 'medium':
                return 'text-yellow-600 bg-yellow-100';
            case 'hard':
                return 'text-orange-600 bg-orange-100';
            case 'expert':
                return 'text-purple-600 bg-purple-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getPerformanceColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 70) return 'text-yellow-600';
        if (score >= 50) return 'text-orange-600';
        return 'text-red-600';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-gray-900 md:text-4xl"
                    >
                        Solving History
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-2 text-gray-600"
                    >
                        Track your problem-solving journey and analyze your learning progress
                    </motion.p>
                </div>

                {/* Stats Overview */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    <div className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <ChartBarIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">156</div>
                                <div className="text-purple-100">Total Attempts</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">87</div>
                                <div className="text-green-100">Successfully Solved</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <FireIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">55.8%</div>
                                <div className="text-orange-100">Success Rate</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <ClockIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">45.2</div>
                                <div className="text-blue-100">Avg Time (min)</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8 space-y-6"
                >
                    {/* Search Bar */}
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search solving history by problem title, notes, or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 shadow-sm transition-all duration-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    {/* Period Filter */}
                    <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-700">Time Period</h3>
                        <div className="flex flex-wrap gap-3">
                            {periods.map((period) => (
                                <button
                                    key={period.id}
                                    onClick={() => setSelectedPeriod(period.id)}
                                    className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                        selectedPeriod === period.id
                                            ? 'bg-gradient-to-r text-white shadow-lg'
                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    } ${period.color}`}
                                >
                                    <span>{period.label}</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            selectedPeriod === period.id
                                                ? 'bg-white/20'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        {period.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-700">Problem Status</h3>
                        <div className="flex flex-wrap gap-3">
                            {statuses.map((status) => (
                                <button
                                    key={status.id}
                                    onClick={() => setSelectedStatus(status.id)}
                                    className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                        selectedStatus === status.id
                                            ? 'bg-gradient-to-r text-white shadow-lg'
                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    } ${status.color}`}
                                >
                                    <span>{status.label}</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            selectedStatus === status.id
                                                ? 'bg-white/20'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        {status.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                            >
                                <option value="date">Solving Date</option>
                                <option value="difficulty">Difficulty</option>
                                <option value="time-spent">Time Spent</option>
                                <option value="attempts">Attempts</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                        <div className="text-sm text-gray-600">
                            {filteredHistory.length} problems found
                        </div>
                    </div>
                </motion.div>

                {/* Solving History Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-6"
                >
                    {filteredHistory.map((problem, index) => (
                        <motion.div
                            key={problem.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                        >
                            {/* Timeline Connector */}
                            {index < filteredHistory.length - 1 && (
                                <div className="absolute top-16 bottom-0 left-8 w-0.5 bg-gray-200"></div>
                            )}

                            {/* Status Badge */}
                            <div className="absolute top-4 right-4">
                                <span
                                    className={`inline-flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(problem.status)}`}
                                >
                                    {getStatusIcon(problem.status)}
                                    <span className="capitalize">{problem.status}</span>
                                </span>
                            </div>

                            <div className="flex space-x-4">
                                {/* Timeline Dot */}
                                <div className="relative">
                                    <div
                                        className={`h-4 w-4 rounded-full border-2 ${
                                            problem.status === 'solved'
                                                ? 'border-green-500 bg-green-100'
                                                : problem.status === 'attempted'
                                                  ? 'border-yellow-500 bg-yellow-100'
                                                  : 'border-red-500 bg-red-100'
                                        }`}
                                    ></div>
                                </div>

                                <div className="flex-1 pr-32">
                                    {/* Header */}
                                    <div className="mb-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
                                                {problem.problemTitle}
                                            </h3>
                                            <div className="flex items-center space-x-2">
                                                <span
                                                    className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}
                                                >
                                                    <span className="capitalize">
                                                        {problem.difficulty}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mb-3 text-sm text-gray-600">
                                            {problem.notes}
                                        </p>

                                        {/* Tags */}
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            {problem.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Performance Metrics */}
                                    {problem.performance && (
                                        <div className="mb-4">
                                            <h4 className="mb-2 text-xs font-medium text-gray-500">
                                                Performance Analysis
                                            </h4>
                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Accuracy:</span>
                                                    <span
                                                        className={`ml-2 font-medium ${getPerformanceColor(problem.performance.accuracy)}`}
                                                    >
                                                        {problem.performance.accuracy}%
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">
                                                        Efficiency:
                                                    </span>
                                                    <span
                                                        className={`ml-2 font-medium ${getPerformanceColor(problem.performance.efficiency)}`}
                                                    >
                                                        {problem.performance.efficiency}%
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">
                                                        Readability:
                                                    </span>
                                                    <span
                                                        className={`ml-2 font-medium ${getPerformanceColor(problem.performance.readability)}`}
                                                    >
                                                        {problem.performance.readability}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Learning Points */}
                                    {problem.learning && problem.learning.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="mb-2 text-xs font-medium text-gray-500">
                                                Key Learnings
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {problem.learning.map((learning, learningIndex) => (
                                                    <span
                                                        key={learningIndex}
                                                        className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
                                                    >
                                                        {learning}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Stats */}
                                    <div className="mb-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                                        <div>
                                            <span className="text-gray-500">Time Spent:</span>
                                            <span className="ml-2 font-medium text-gray-900">
                                                {problem.timeSpent}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Attempts:</span>
                                            <span className="ml-2 font-medium text-gray-900">
                                                {problem.attempts}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Rating:</span>
                                            <span className="ml-2 font-medium text-gray-900">
                                                {problem.rating}/5
                                            </span>
                                        </div>
                                        {problem.solvedAt && (
                                            <div>
                                                <span className="text-gray-500">Solved:</span>
                                                <span className="ml-2 font-medium text-gray-900">
                                                    {formatDate(problem.solvedAt)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between">
                                        <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                                            {problem.status === 'solved'
                                                ? 'Review Solution'
                                                : 'Retry Problem'}
                                        </button>
                                        <div className="flex items-center space-x-2">
                                            <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500">
                                                <ChartBarIcon className="h-5 w-5" />
                                            </button>
                                            <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-yellow-50 hover:text-yellow-500">
                                                <StarIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredHistory.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-12 text-center"
                    >
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <CalendarIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                            No solving history found
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Try adjusting your search criteria or filters
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedPeriod('all');
                                setSelectedStatus('all');
                            }}
                            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}

                {/* Insights Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white"
                >
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">Learning Insights</h2>
                            <p className="text-purple-100">
                                Track your progress and identify areas for improvement. Every
                                attempt is a learning opportunity!
                            </p>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <button className="rounded-lg bg-white/20 px-4 py-2 font-medium transition-colors hover:bg-white/30">
                                View Analytics
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
