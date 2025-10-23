'use client';

import { useState } from 'react';
import {
    CheckCircleIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    FireIcon,
    MagnifyingGlassIcon,
    StarIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function MySubmissionsPage() {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedLanguage, setSelectedLanguage] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');

    const statuses = [
        { id: 'all', label: 'All', count: 156, color: 'from-gray-500 to-gray-600' },
        { id: 'accepted', label: 'Accepted', count: 87, color: 'from-green-500 to-emerald-600' },
        { id: 'wrong-answer', label: 'Wrong Answer', count: 45, color: 'from-red-500 to-pink-600' },
        {
            id: 'time-limit',
            label: 'Time Limit',
            count: 15,
            color: 'from-orange-500 to-yellow-600',
        },
        {
            id: 'memory-limit',
            label: 'Memory Limit',
            count: 9,
            color: 'from-purple-500 to-indigo-600',
        },
    ];

    const languages = [
        { id: 'all', label: 'All Languages', count: 156, icon: '💻' },
        { id: 'python', label: 'Python', count: 67, icon: '🐍' },
        { id: 'javascript', label: 'JavaScript', count: 45, icon: '🟨' },
        { id: 'java', label: 'Java', count: 23, icon: '☕' },
        { id: 'cpp', label: 'C++', count: 21, icon: '⚡' },
    ];

    const submissions = [
        {
            id: 1,
            problemTitle: 'Two Sum',
            status: 'accepted',
            language: 'python',
            runtime: 32,
            memory: 14.2,
            submittedAt: '2024-01-15T10:30:00Z',
            executionTime: '15ms',
            memoryUsed: '14.2MB',
            codeLength: 156,
            testCases: { passed: 47, total: 47 },
            difficulty: 'easy',
            rating: 4.8,
            notes: 'Used hash table approach for O(n) time complexity',
        },
        {
            id: 2,
            problemTitle: 'Valid Parentheses',
            status: 'accepted',
            language: 'javascript',
            runtime: 45,
            memory: 42.1,
            submittedAt: '2024-01-14T15:45:00Z',
            executionTime: '45ms',
            memoryUsed: '42.1MB',
            testCases: { passed: 91, total: 91 },
            difficulty: 'easy',
            rating: 4.6,
            notes: 'Stack-based solution with early termination',
        },
        {
            id: 3,
            problemTitle: 'Merge Sorted Arrays',
            status: 'wrong-answer',
            language: 'python',
            runtime: 28,
            memory: 14.1,
            submittedAt: '2024-01-13T09:15:00Z',
            executionTime: '28ms',
            memoryUsed: '14.1MB',
            testCases: { passed: 15, total: 59 },
            difficulty: 'medium',
            rating: 4.4,
            notes: 'Edge case handling issue with empty arrays',
        },
        {
            id: 4,
            problemTitle: 'Binary Tree Inorder Traversal',
            status: 'time-limit',
            language: 'java',
            runtime: 0,
            memory: 0,
            submittedAt: '2024-01-12T14:20:00Z',
            executionTime: 'N/A',
            memoryUsed: 'N/A',
            testCases: { passed: 0, total: 68 },
            difficulty: 'medium',
            rating: 4.2,
            notes: 'Recursive solution caused stack overflow',
        },
        {
            id: 5,
            problemTitle: 'Longest Substring Without Repeating Characters',
            status: 'accepted',
            language: 'cpp',
            runtime: 12,
            memory: 6.8,
            submittedAt: '2024-01-11T11:10:00Z',
            executionTime: '12ms',
            memoryUsed: '6.8MB',
            testCases: { passed: 987, total: 987 },
            difficulty: 'hard',
            rating: 4.7,
            notes: 'Sliding window with optimized character lookup',
        },
        {
            id: 6,
            problemTitle: 'Regular Expression Matching',
            status: 'memory-limit',
            language: 'python',
            runtime: 0,
            memory: 0,
            submittedAt: '2024-01-10T16:30:00Z',
            executionTime: 'N/A',
            memoryUsed: 'N/A',
            testCases: { passed: 0, total: 353 },
            difficulty: 'expert',
            rating: 4.9,
            notes: 'DP solution exceeded memory constraints',
        },
    ];

    const filteredSubmissions = submissions.filter((submission) => {
        const matchesStatus = selectedStatus === 'all' || submission.status === selectedStatus;
        const matchesLanguage =
            selectedLanguage === 'all' || submission.language === selectedLanguage;
        const matchesSearch =
            submission.problemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            submission.notes.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesStatus && matchesLanguage && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'accepted':
                return 'text-green-600 bg-green-100';
            case 'wrong-answer':
                return 'text-red-600 bg-red-100';
            case 'time-limit':
                return 'text-orange-600 bg-orange-100';
            case 'memory-limit':
                return 'text-purple-600 bg-purple-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'accepted':
                return <CheckCircleIcon className="h-4 w-4" />;
            case 'wrong-answer':
                return <XCircleIcon className="h-4 w-4" />;
            case 'time-limit':
                return <ClockIcon className="h-4 w-4" />;
            case 'memory-limit':
                return <ExclamationTriangleIcon className="h-4 w-4" />;
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

    const getLanguageIcon = (language: string) => {
        const lang = languages.find((l) => l.id === language);
        return lang ? lang.icon : '💻';
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
                        My Submissions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-2 text-gray-600"
                    >
                        Track your problem-solving journey and analyze your performance
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
                            <CheckCircleIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">156</div>
                                <div className="text-purple-100">Total Submissions</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <StarIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">87</div>
                                <div className="text-green-100">Accepted</div>
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
                                <div className="text-2xl font-bold">24.5ms</div>
                                <div className="text-blue-100">Avg Runtime</div>
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
                            placeholder="Search submissions by problem title or notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 shadow-sm transition-all duration-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-700">
                            Submission Status
                        </h3>
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

                    {/* Language Filter */}
                    <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-700">
                            Programming Language
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {languages.map((language) => (
                                <button
                                    key={language.id}
                                    onClick={() => setSelectedLanguage(language.id)}
                                    className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                        selectedLanguage === language.id
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-lg">{language.icon}</span>
                                    <span>{language.label}</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            selectedLanguage === language.id
                                                ? 'bg-white/20'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        {language.count}
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
                                <option value="date">Submission Date</option>
                                <option value="status">Status</option>
                                <option value="runtime">Runtime</option>
                                <option value="memory">Memory Usage</option>
                                <option value="difficulty">Difficulty</option>
                            </select>
                        </div>
                        <div className="text-sm text-gray-600">
                            {filteredSubmissions.length} submissions found
                        </div>
                    </div>
                </motion.div>

                {/* Submissions List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-4"
                >
                    {filteredSubmissions.map((submission, index) => (
                        <motion.div
                            key={submission.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                        >
                            {/* Status Badge */}
                            <div className="absolute top-4 right-4">
                                <span
                                    className={`inline-flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(submission.status)}`}
                                >
                                    {getStatusIcon(submission.status)}
                                    <span className="capitalize">
                                        {submission.status.replace('-', ' ')}
                                    </span>
                                </span>
                            </div>

                            <div className="pr-32">
                                {/* Header */}
                                <div className="mb-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
                                            {submission.problemTitle}
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <span
                                                className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(submission.difficulty)}`}
                                            >
                                                <span className="capitalize">
                                                    {submission.difficulty}
                                                </span>
                                            </span>
                                            <span className="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                                <span className="text-lg">
                                                    {getLanguageIcon(submission.language)}
                                                </span>
                                                <span className="capitalize">
                                                    {submission.language}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">{submission.notes}</p>
                                </div>

                                {/* Performance Metrics */}
                                <div className="mb-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                                    <div>
                                        <span className="text-gray-500">Runtime:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {submission.runtime > 0
                                                ? `${submission.runtime}ms`
                                                : 'N/A'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Memory:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {submission.memory > 0
                                                ? `${submission.memory}MB`
                                                : 'N/A'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Test Cases:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {submission.testCases.passed}/
                                            {submission.testCases.total}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Code Length:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {submission.codeLength} chars
                                        </span>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span>Submitted: {formatDate(submission.submittedAt)}</span>
                                        <span>Rating: {submission.rating}/5</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-purple-50 hover:text-purple-500">
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500">
                                            <StarIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredSubmissions.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-12 text-center"
                    >
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <ClockIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                            No submissions found
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Try adjusting your search criteria or filters
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedStatus('all');
                                setSelectedLanguage('all');
                            }}
                            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
