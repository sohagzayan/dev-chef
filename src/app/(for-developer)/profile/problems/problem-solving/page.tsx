'use client';

import { useState } from 'react';
import {
    CheckCircleIcon,
    ClockIcon,
    FireIcon,
    MagnifyingGlassIcon,
    StarIcon,
    TrophyIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

export default function ProblemSolvingPage() {
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('difficulty');

    const difficulties = [
        { id: 'all', label: 'All', count: 156, color: 'from-gray-500 to-gray-600' },
        { id: 'easy', label: 'Easy', count: 45, color: 'from-green-500 to-emerald-600' },
        { id: 'medium', label: 'Medium', count: 67, color: 'from-yellow-500 to-amber-600' },
        { id: 'hard', label: 'Hard', count: 32, color: 'from-orange-500 to-red-600' },
        { id: 'expert', label: 'Expert', count: 12, color: 'from-purple-500 to-pink-600' },
    ];

    const categories = [
        { id: 'all', label: 'All Categories', count: 156, icon: '🧩' },
        { id: 'arrays', label: 'Arrays', count: 28, icon: '📊' },
        { id: 'strings', label: 'Strings', count: 25, icon: '🔤' },
        { id: 'linked-lists', label: 'Linked Lists', count: 18, icon: '⛓️' },
        { id: 'trees', label: 'Trees', count: 22, icon: '🌳' },
        { id: 'graphs', label: 'Graphs', count: 20, icon: '🕸️' },
        { id: 'dynamic-programming', label: 'Dynamic Programming', count: 15, icon: '⚡' },
        { id: 'greedy', label: 'Greedy', count: 8, icon: '🎯' },
    ];

    const problems = [
        {
            id: 1,
            title: 'Two Sum',
            difficulty: 'easy',
            category: 'arrays',
            acceptance: 89.5,
            submissions: 1250000,
            solved: true,
            timeSpent: '15 min',
            rating: 4.8,
            tags: ['Array', 'Hash Table', 'Two Pointers'],
            description:
                'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        },
        {
            id: 2,
            title: 'Valid Parentheses',
            difficulty: 'easy',
            category: 'strings',
            acceptance: 92.1,
            submissions: 980000,
            solved: true,
            timeSpent: '12 min',
            rating: 4.6,
            tags: ['String', 'Stack'],
            description:
                'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
        },
        {
            id: 3,
            title: 'Merge Sorted Arrays',
            difficulty: 'medium',
            category: 'arrays',
            acceptance: 78.3,
            submissions: 650000,
            solved: false,
            timeSpent: null,
            rating: 4.4,
            tags: ['Array', 'Two Pointers', 'Sorting'],
            description:
                'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n.',
        },
        {
            id: 4,
            title: 'Binary Tree Inorder Traversal',
            difficulty: 'medium',
            category: 'trees',
            acceptance: 75.8,
            submissions: 520000,
            solved: false,
            timeSpent: null,
            rating: 4.2,
            tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
            description:
                'Given the root of a binary tree, return the inorder traversal of its nodes values.',
        },
        {
            id: 5,
            title: 'Longest Substring Without Repeating Characters',
            difficulty: 'hard',
            category: 'strings',
            acceptance: 68.2,
            submissions: 380000,
            solved: false,
            timeSpent: null,
            rating: 4.7,
            tags: ['String', 'Sliding Window', 'Hash Table'],
            description:
                'Given a string s, find the length of the longest substring without repeating characters.',
        },
        {
            id: 6,
            title: 'Regular Expression Matching',
            difficulty: 'expert',
            category: 'dynamic-programming',
            acceptance: 45.1,
            submissions: 120000,
            solved: false,
            timeSpent: null,
            rating: 4.9,
            tags: ['String', 'Dynamic Programming', 'Recursion'],
            description:
                'Given an input string s and a pattern p, implement regular expression matching with support for "." and "*".',
        },
    ];

    const filteredProblems = problems.filter((problem) => {
        const matchesDifficulty =
            selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
        const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
        const matchesSearch =
            problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesDifficulty && matchesCategory && matchesSearch;
    });

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

    const getDifficultyIcon = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return <CheckCircleIcon className="h-4 w-4" />;
            case 'medium':
                return <ClockIcon className="h-4 w-4" />;
            case 'hard':
                return <FireIcon className="h-4 w-4" />;
            case 'expert':
                return <TrophyIcon className="h-4 w-4" />;
            default:
                return <XCircleIcon className="h-4 w-4" />;
        }
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
                        Problem Solving
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-2 text-gray-600"
                    >
                        Master algorithms and data structures through hands-on practice
                    </motion.p>
                </div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8 space-y-6"
                >
                    {/* Search Bar */}
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search problems by title, description, or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 shadow-sm transition-all duration-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-700">Difficulty Level</h3>
                        <div className="flex flex-wrap gap-3">
                            {difficulties.map((difficulty) => (
                                <button
                                    key={difficulty.id}
                                    onClick={() => setSelectedDifficulty(difficulty.id)}
                                    className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                        selectedDifficulty === difficulty.id
                                            ? 'bg-gradient-to-r text-white shadow-lg'
                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    } ${difficulty.color}`}
                                >
                                    <span>{difficulty.label}</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            selectedDifficulty === difficulty.id
                                                ? 'bg-white/20'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        {difficulty.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-700">
                            Problem Categories
                        </h3>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex flex-col items-center space-y-2 rounded-lg border p-3 transition-all duration-200 ${
                                        selectedCategory === category.id
                                            ? 'border-purple-300 bg-purple-50 text-purple-700'
                                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-2xl">{category.icon}</span>
                                    <span className="text-center text-xs font-medium">
                                        {category.label}
                                    </span>
                                    <span className="text-xs text-gray-500">{category.count}</span>
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
                                <option value="difficulty">Difficulty</option>
                                <option value="acceptance">Acceptance Rate</option>
                                <option value="rating">Rating</option>
                                <option value="submissions">Submissions</option>
                            </select>
                        </div>
                        <div className="text-sm text-gray-600">
                            {filteredProblems.length} problems found
                        </div>
                    </div>
                </motion.div>

                {/* Problems Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-2"
                >
                    {filteredProblems.map((problem, index) => (
                        <motion.div
                            key={problem.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                                problem.solved
                                    ? 'border-green-200 bg-white hover:border-green-300'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                        >
                            {/* Status Badge */}
                            <div className="absolute top-4 right-4">
                                {problem.solved ? (
                                    <span className="inline-flex items-center space-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        <CheckCircleIcon className="h-3 w-3" />
                                        <span>Solved</span>
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                        <ClockIcon className="h-3 w-3" />
                                        <span>Unsolved</span>
                                    </span>
                                )}
                            </div>

                            <div className="p-6">
                                {/* Header */}
                                <div className="mb-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
                                            {problem.title}
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <span
                                                className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}
                                            >
                                                {getDifficultyIcon(problem.difficulty)}
                                                <span className="capitalize">
                                                    {problem.difficulty}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <p className="line-clamp-2 text-sm text-gray-600">
                                        {problem.description}
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {problem.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Acceptance:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {problem.acceptance}%
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Submissions:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {(problem.submissions / 1000).toFixed(1)}k
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Rating:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {problem.rating}/5
                                        </span>
                                    </div>
                                    {problem.solved && (
                                        <div>
                                            <span className="text-gray-500">Time:</span>
                                            <span className="ml-2 font-medium text-gray-900">
                                                {problem.timeSpent}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between">
                                    <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                                        {problem.solved ? 'Review Solution' : 'Start Solving'}
                                    </button>
                                    <div className="flex items-center space-x-2">
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-yellow-50 hover:text-yellow-500">
                                            <StarIcon className="h-5 w-5" />
                                        </button>
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500">
                                            <ClockIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredProblems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-12 text-center"
                    >
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                            No problems found
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Try adjusting your search criteria or filters
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedDifficulty('all');
                                setSelectedCategory('all');
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
