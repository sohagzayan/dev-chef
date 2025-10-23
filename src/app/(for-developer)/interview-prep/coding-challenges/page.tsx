'use client';

import { useState } from 'react';
import {
    BookmarkIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    CodeBracketIcon,
    EyeIcon,
    LightBulbIcon,
    PlayIcon,
    StarIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface CodingChallenge {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
    estimatedTime: string;
    tags: string[];
    isBookmarked: boolean;
    isCompleted: boolean;
    isAttempted: boolean;
    views: number;
    successRate: number;
    likes: number;
    dislikes: number;
    testCases: number;
    constraints?: string;
    examples?: Array<{
        input: string;
        output: string;
        explanation?: string;
    }>;
}

export default function CodingChallengesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [showCompleted, setShowCompleted] = useState(false);
    const [sortBy, setSortBy] = useState('difficulty');

    const categories = [
        'all',
        'Arrays & Strings',
        'Linked Lists',
        'Trees & Graphs',
        'Dynamic Programming',
        'Greedy Algorithms',
        'Binary Search',
        'Two Pointers',
        'Sliding Window',
        'Stack & Queue',
        'Heap & Priority Queue',
        'Backtracking',
        'Bit Manipulation',
        'Math & Logic',
    ];

    const difficulties = ['all', 'Easy', 'Medium', 'Hard', 'Expert'];

    const codingChallenges: CodingChallenge[] = [
        {
            id: '1',
            title: 'Two Sum',
            description:
                'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
            category: 'Arrays & Strings',
            difficulty: 'Easy',
            estimatedTime: '15 min',
            tags: ['Hash Table', 'Array', 'Two Pointers'],
            isBookmarked: true,
            isCompleted: true,
            isAttempted: true,
            views: 15420,
            successRate: 78.5,
            likes: 234,
            dislikes: 45,
            testCases: 5,
            examples: [
                {
                    input: 'nums = [2,7,11,15], target = 9',
                    output: '[0,1]',
                    explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
                },
            ],
        },
        {
            id: '2',
            title: 'Valid Parentheses',
            description:
                "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
            category: 'Stack & Queue',
            difficulty: 'Easy',
            estimatedTime: '20 min',
            tags: ['Stack', 'String', 'Parentheses'],
            isBookmarked: false,
            isCompleted: false,
            isAttempted: false,
            views: 12340,
            successRate: 82.3,
            likes: 189,
            dislikes: 32,
            testCases: 6,
            examples: [
                {
                    input: 's = "()"',
                    output: 'true',
                },
                {
                    input: 's = "([)]"',
                    output: 'false',
                },
            ],
        },
        {
            id: '3',
            title: 'Merge Two Sorted Lists',
            description:
                'Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.',
            category: 'Linked Lists',
            difficulty: 'Easy',
            estimatedTime: '25 min',
            tags: ['Linked List', 'Recursion', 'Merge Sort'],
            isBookmarked: true,
            isCompleted: false,
            isAttempted: true,
            views: 9876,
            successRate: 75.8,
            likes: 156,
            dislikes: 28,
            testCases: 4,
            examples: [
                {
                    input: 'l1 = [1,2,4], l2 = [1,3,4]',
                    output: '[1,1,2,3,4,4]',
                },
            ],
        },
        {
            id: '4',
            title: 'Maximum Subarray',
            description:
                'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
            category: 'Dynamic Programming',
            difficulty: 'Medium',
            estimatedTime: '30 min',
            tags: ['Dynamic Programming', 'Array', "Kadane's Algorithm"],
            isBookmarked: false,
            isCompleted: true,
            isAttempted: true,
            views: 8765,
            successRate: 68.2,
            likes: 198,
            dislikes: 67,
            testCases: 7,
            examples: [
                {
                    input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
                    output: '6',
                    explanation: 'The subarray [4,-1,2,1] has the largest sum 6.',
                },
            ],
        },
        {
            id: '5',
            title: 'Binary Tree Level Order Traversal',
            description:
                "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
            category: 'Trees & Graphs',
            difficulty: 'Medium',
            estimatedTime: '35 min',
            tags: ['Tree', 'Breadth-First Search', 'Queue'],
            isBookmarked: true,
            isCompleted: false,
            isAttempted: false,
            views: 6543,
            successRate: 71.5,
            likes: 145,
            dislikes: 43,
            testCases: 6,
            examples: [
                {
                    input: 'root = [3,9,20,null,null,15,7]',
                    output: '[[3],[9,20],[15,7]]',
                },
            ],
        },
        {
            id: '6',
            title: 'Longest Palindromic Substring',
            description: 'Given a string s, return the longest palindromic substring in s.',
            category: 'Dynamic Programming',
            difficulty: 'Medium',
            estimatedTime: '40 min',
            tags: ['String', 'Dynamic Programming', 'Palindrome'],
            isBookmarked: false,
            isCompleted: false,
            isAttempted: true,
            views: 5432,
            successRate: 65.8,
            likes: 167,
            dislikes: 89,
            testCases: 8,
            examples: [
                {
                    input: 's = "babad"',
                    output: '"bab"',
                    explanation: '"aba" is also a valid answer.',
                },
            ],
        },
        {
            id: '7',
            title: 'Trapping Rain Water',
            description:
                'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
            category: 'Arrays & Strings',
            difficulty: 'Hard',
            estimatedTime: '45 min',
            tags: ['Array', 'Two Pointers', 'Dynamic Programming'],
            isBookmarked: true,
            isCompleted: false,
            isAttempted: false,
            views: 4321,
            successRate: 58.3,
            likes: 234,
            dislikes: 156,
            testCases: 9,
            examples: [
                {
                    input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
                    output: '6',
                    explanation:
                        'The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.',
                },
            ],
        },
        {
            id: '8',
            title: 'Regular Expression Matching',
            description:
                "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
            category: 'Dynamic Programming',
            difficulty: 'Hard',
            estimatedTime: '50 min',
            tags: ['String', 'Dynamic Programming', 'Regular Expression'],
            isBookmarked: false,
            isCompleted: false,
            isAttempted: false,
            views: 3456,
            successRate: 52.1,
            likes: 189,
            dislikes: 234,
            testCases: 10,
            examples: [
                {
                    input: 's = "aa", p = "a*"',
                    output: 'true',
                    explanation:
                        "'*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes \"aa\".",
                },
            ],
        },
        {
            id: '9',
            title: 'Median of Two Sorted Arrays',
            description:
                'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
            category: 'Arrays & Strings',
            difficulty: 'Hard',
            estimatedTime: '55 min',
            tags: ['Array', 'Binary Search', 'Divide and Conquer'],
            isBookmarked: true,
            isCompleted: false,
            isAttempted: false,
            views: 2987,
            successRate: 48.7,
            likes: 267,
            dislikes: 345,
            testCases: 12,
            examples: [
                {
                    input: 'nums1 = [1,3], nums2 = [2]',
                    output: '2.00000',
                    explanation: 'merged array = [1,2,3] and median is 2.',
                },
            ],
        },
        {
            id: '10',
            title: 'Sliding Window Maximum',
            description:
                'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right.',
            category: 'Sliding Window',
            difficulty: 'Hard',
            estimatedTime: '45 min',
            tags: ['Array', 'Sliding Window', 'Queue', 'Monotonic Queue'],
            isBookmarked: false,
            isCompleted: false,
            isAttempted: false,
            views: 2345,
            successRate: 54.2,
            likes: 198,
            dislikes: 267,
            testCases: 8,
            examples: [
                {
                    input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
                    output: '[3,3,5,5,6,7]',
                    explanation: 'Window position: [1,3,-1] -3 5 3 6 7, Max: 3',
                },
            ],
        },
    ];

    const filteredChallenges = codingChallenges.filter((challenge) => {
        const matchesSearch =
            challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            challenge.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
            selectedCategory === 'all' || challenge.category === selectedCategory;
        const matchesDifficulty =
            selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
        const matchesCompleted = showCompleted ? true : !challenge.isCompleted;

        return matchesSearch && matchesCategory && matchesDifficulty && matchesCompleted;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Hard':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Expert':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getSuccessRateColor = (rate: number) => {
        if (rate >= 80) return 'text-green-600';
        if (rate >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const toggleBookmark = (challengeId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle bookmark for challenge:', challengeId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Coding Challenges</h1>
                <p className="text-gray-600">
                    Practice coding problems with varying difficulty levels
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search challenges, topics, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <CodeBracketIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>

                    {/* Difficulty Filter */}
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                    >
                        {difficulties.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty === 'all' ? 'All Difficulties' : difficulty}
                            </option>
                        ))}
                    </select>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="difficulty">Sort by Difficulty</option>
                        <option value="successRate">Sort by Success Rate</option>
                        <option value="views">Sort by Views</option>
                        <option value="time">Sort by Time</option>
                    </select>

                    {/* Show Completed Toggle */}
                    <label className="flex cursor-pointer items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={showCompleted}
                            onChange={(e) => setShowCompleted(e.target.checked)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-700">Show Completed</span>
                    </label>
                </div>
            </div>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredChallenges.map((challenge) => (
                    <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Challenge Header */}
                        <div className="border-b border-gray-100 p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                                        {challenge.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                                        {challenge.description}
                                    </p>

                                    {/* Tags and Metadata */}
                                    <div className="mb-3 flex items-center space-x-2">
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}
                                        >
                                            {challenge.difficulty}
                                        </span>
                                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                            {challenge.category}
                                        </span>
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {challenge.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md bg-indigo-50 px-2 py-1 text-xs text-indigo-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Stats and Actions */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <ClockIcon className="h-4 w-4" />
                                        <span>{challenge.estimatedTime}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <EyeIcon className="h-4 w-4" />
                                        <span>{challenge.views}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <ChartBarIcon className="h-4 w-4" />
                                        <span
                                            className={getSuccessRateColor(challenge.successRate)}
                                        >
                                            {challenge.successRate}%
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => toggleBookmark(challenge.id)}
                                        className={`rounded-lg p-2 transition-colors duration-200 ${
                                            challenge.isBookmarked
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'text-gray-400 hover:bg-yellow-50 hover:text-yellow-600'
                                        }`}
                                    >
                                        <BookmarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Challenge Content */}
                        <div className="p-6">
                            {/* Examples (if available) */}
                            {challenge.examples && challenge.examples.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                        <LightBulbIcon className="mr-2 h-4 w-4 text-yellow-500" />
                                        Examples
                                    </h5>
                                    <div className="space-y-2">
                                        {challenge.examples.slice(0, 2).map((example, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg bg-gray-50 p-3 text-sm"
                                            >
                                                <div className="mb-1 font-medium text-gray-700">
                                                    Example {index + 1}:
                                                </div>
                                                <div className="text-gray-600">
                                                    <div>
                                                        <strong>Input:</strong> {example.input}
                                                    </div>
                                                    <div>
                                                        <strong>Output:</strong> {example.output}
                                                    </div>
                                                    {example.explanation && (
                                                        <div>
                                                            <strong>Explanation:</strong>{' '}
                                                            {example.explanation}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Test Cases */}
                            <div className="mb-4">
                                <h5 className="mb-2 text-sm font-medium text-gray-700">
                                    Test Cases: {challenge.testCases}
                                </h5>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button className="flex flex-1 items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-indigo-700">
                                    <PlayIcon className="mr-2 h-4 w-4" />
                                    {challenge.isCompleted ? 'Review Solution' : 'Start Coding'}
                                </button>
                                <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                    View Discussion
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredChallenges.length === 0 && (
                <div className="py-12 text-center">
                    <CodeBracketIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No challenges found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
}
