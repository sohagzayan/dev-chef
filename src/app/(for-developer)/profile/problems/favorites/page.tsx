'use client';

import { useState } from 'react';
import {
    BookmarkIcon,
    CheckCircleIcon,
    ClockIcon,
    FireIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    StarIcon,
    TrashIcon,
    TrophyIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function FavoriteProblemsPage() {
    const [selectedCollection, setSelectedCollection] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');

    const collections = [
        { id: 'all', label: 'All Favorites', count: 24, icon: '❤️' },
        { id: 'arrays', label: 'Array Problems', count: 8, icon: '📊' },
        { id: 'strings', label: 'String Problems', count: 6, icon: '🔤' },
        { id: 'trees', label: 'Tree Problems', count: 4, icon: '🌳' },
        { id: 'graphs', label: 'Graph Problems', count: 3, icon: '🕸️' },
        { id: 'dp', label: 'DP Problems', count: 3, icon: '⚡' },
    ];

    const difficulties = [
        { id: 'all', label: 'All Difficulties', count: 24, color: 'from-gray-500 to-gray-600' },
        { id: 'easy', label: 'Easy', count: 8, color: 'from-green-500 to-emerald-600' },
        { id: 'medium', label: 'Medium', count: 12, color: 'from-yellow-500 to-amber-600' },
        { id: 'hard', label: 'Hard', count: 3, color: 'from-orange-500 to-red-600' },
        { id: 'expert', label: 'Expert', count: 1, color: 'from-purple-500 to-pink-600' },
    ];

    const favoriteProblems = [
        {
            id: 1,
            title: 'Two Sum',
            difficulty: 'easy',
            category: 'arrays',
            collection: 'arrays',
            addedAt: '2024-01-15T10:30:00Z',
            lastAttempted: '2024-01-20T14:15:00Z',
            attempts: 3,
            solved: true,
            rating: 4.8,
            notes: 'Great problem for learning hash tables. Easy to understand but teaches important concepts.',
            tags: ['Hash Table', 'Two Pointers', 'Array'],
            isBookmarked: true,
            isInCollection: true,
        },
        {
            id: 2,
            title: 'Valid Parentheses',
            difficulty: 'easy',
            category: 'strings',
            collection: 'strings',
            addedAt: '2024-01-14T15:45:00Z',
            lastAttempted: '2024-01-19T09:30:00Z',
            attempts: 2,
            solved: true,
            rating: 4.6,
            notes: 'Perfect stack problem. Good for understanding LIFO data structure.',
            tags: ['Stack', 'String', 'Early Termination'],
            isBookmarked: true,
            isInCollection: true,
        },
        {
            id: 3,
            title: 'Merge Sorted Arrays',
            difficulty: 'medium',
            category: 'arrays',
            collection: 'arrays',
            addedAt: '2024-01-13T09:15:00Z',
            lastAttempted: '2024-01-18T16:45:00Z',
            attempts: 5,
            solved: false,
            rating: 4.4,
            notes: 'Challenging but rewarding. Teaches in-place algorithms and two-pointer technique.',
            tags: ['Two Pointers', 'In-place', 'Merge'],
            isBookmarked: true,
            isInCollection: true,
        },
        {
            id: 4,
            title: 'Binary Tree Inorder Traversal',
            difficulty: 'medium',
            category: 'trees',
            collection: 'trees',
            addedAt: '2024-01-12T14:20:00Z',
            lastAttempted: '2024-01-17T11:20:00Z',
            attempts: 4,
            solved: false,
            rating: 4.2,
            notes: 'Essential tree traversal problem. Good for understanding recursion vs iteration.',
            tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
            isBookmarked: true,
            isInCollection: true,
        },
        {
            id: 5,
            title: 'Longest Substring Without Repeating Characters',
            difficulty: 'hard',
            category: 'strings',
            collection: 'strings',
            addedAt: '2024-01-11T11:10:00Z',
            lastAttempted: '2024-01-16T13:10:00Z',
            attempts: 7,
            solved: true,
            rating: 4.7,
            notes: 'Excellent sliding window problem. Teaches optimization techniques.',
            tags: ['Sliding Window', 'Hash Table', 'Optimization'],
            isBookmarked: true,
            isInCollection: true,
        },
        {
            id: 6,
            title: 'Regular Expression Matching',
            difficulty: 'expert',
            category: 'dp',
            collection: 'dp',
            addedAt: '2024-01-10T16:30:00Z',
            lastAttempted: '2024-01-15T10:45:00Z',
            attempts: 12,
            solved: false,
            rating: 4.9,
            notes: 'Ultimate DP challenge. Requires deep understanding of state transitions.',
            tags: ['Dynamic Programming', 'Regex', '2D DP'],
            isBookmarked: true,
            isInCollection: true,
        },
    ];

    const filteredProblems = favoriteProblems.filter((problem) => {
        const matchesCollection =
            selectedCollection === 'all' || problem.collection === selectedCollection;
        const matchesDifficulty =
            selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
        const matchesSearch =
            problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCollection && matchesDifficulty && matchesSearch;
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getCollectionIcon = (collection: string) => {
        const coll = collections.find((c) => c.id === collection);
        return coll ? coll.icon : '📁';
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
                        Favorite Problems
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-2 text-gray-600"
                    >
                        Your curated collection of problems to practice and master
                    </motion.p>
                </div>

                {/* Stats Overview */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    <div className="rounded-xl bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <HeartIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">24</div>
                                <div className="text-red-100">Total Favorites</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">18</div>
                                <div className="text-green-100">Solved</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <FireIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">75%</div>
                                <div className="text-orange-100">Success Rate</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <StarIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">4.6</div>
                                <div className="text-blue-100">Avg Rating</div>
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
                            placeholder="Search favorite problems by title, notes, or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 shadow-sm transition-all duration-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                        />
                    </div>

                    {/* Collection Filter */}
                    <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-700">Collections</h3>
                        <div className="flex flex-wrap gap-3">
                            {collections.map((collection) => (
                                <button
                                    key={collection.id}
                                    onClick={() => setSelectedCollection(collection.id)}
                                    className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                        selectedCollection === collection.id
                                            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-lg">{collection.icon}</span>
                                    <span>{collection.label}</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            selectedCollection === collection.id
                                                ? 'bg-white/20'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        {collection.count}
                                    </span>
                                </button>
                            ))}
                        </div>
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

                    {/* Sort Options */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                            >
                                <option value="date">Added Date</option>
                                <option value="last-attempted">Last Attempted</option>
                                <option value="difficulty">Difficulty</option>
                                <option value="rating">Rating</option>
                                <option value="attempts">Attempts</option>
                            </select>
                        </div>
                        <div className="text-sm text-gray-600">
                            {filteredProblems.length} problems found
                        </div>
                    </div>
                </motion.div>

                {/* Favorite Problems Grid */}
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
                            className="group relative overflow-hidden rounded-xl border-2 border-red-200 bg-white transition-all duration-300 hover:scale-[1.02] hover:border-red-300 hover:shadow-xl"
                        >
                            {/* Favorite Badge */}
                            <div className="absolute top-4 right-4">
                                <span className="inline-flex items-center space-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                                    <HeartIcon className="h-3 w-3" />
                                    <span>Favorite</span>
                                </span>
                            </div>

                            {/* Collection Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center space-x-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                    <span className="text-sm">
                                        {getCollectionIcon(problem.collection)}
                                    </span>
                                    <span className="capitalize">{problem.collection}</span>
                                </span>
                            </div>

                            <div className="p-6 pt-16">
                                {/* Header */}
                                <div className="mb-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-red-600">
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
                                    <p className="mb-3 text-sm text-gray-600">{problem.notes}</p>

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

                                {/* Stats */}
                                <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Attempts:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {problem.attempts}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Status:</span>
                                        <span
                                            className={`ml-2 font-medium ${problem.solved ? 'text-green-600' : 'text-orange-600'}`}
                                        >
                                            {problem.solved ? 'Solved' : 'Unsolved'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Rating:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {problem.rating}/5
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Added:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {formatDate(problem.addedAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Last Attempted */}
                                {problem.lastAttempted && (
                                    <div className="mb-4 rounded-lg bg-gray-50 p-3">
                                        <div className="mb-1 text-xs text-gray-500">
                                            Last Attempted
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {formatDate(problem.lastAttempted)}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between">
                                    <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-700 hover:shadow-lg">
                                        {problem.solved ? 'Review Solution' : 'Start Solving'}
                                    </button>
                                    <div className="flex items-center space-x-2">
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500">
                                            <BookmarkIcon className="h-5 w-5" />
                                        </button>
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500">
                                            <StarIcon className="h-5 w-5" />
                                        </button>
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500">
                                            <TrashIcon className="h-5 w-5" />
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
                            <HeartIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                            No favorite problems found
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Try adjusting your search criteria or filters
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCollection('all');
                                setSelectedDifficulty('all');
                            }}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-700"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white"
                >
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">Build Your Collection</h2>
                            <p className="text-red-100">
                                Start adding problems to your favorites to create a personalized
                                practice collection
                            </p>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <button className="rounded-lg bg-white/20 px-4 py-2 font-medium transition-colors hover:bg-white/30">
                                Browse Problems
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
