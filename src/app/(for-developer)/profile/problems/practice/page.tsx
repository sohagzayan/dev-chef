'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    BookOpenIcon,
    CheckCircleIcon,
    ClockIcon,
    FireIcon,
    PlayIcon,
    StarIcon,
    TrophyIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function PracticeProblemsPage() {
    const [selectedPracticeType, setSelectedPracticeType] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');

    const practiceTypes = [
        { id: 'all', label: 'All Practice', count: 24, icon: '🧩' },
        { id: 'daily', label: 'Daily Practice', count: 1, icon: '📅' },
        { id: 'weekly', label: 'Weekly Sets', count: 4, icon: '📊' },
        { id: 'learning-paths', label: 'Learning Paths', count: 8, icon: '🛤️' },
        { id: 'mock-tests', label: 'Mock Tests', count: 6, icon: '📝' },
        { id: 'challenges', label: 'Challenges', count: 5, icon: '🏆' },
    ];

    const practiceSets = [
        {
            id: 1,
            title: 'Daily Practice - Arrays & Strings',
            type: 'daily',
            level: 'beginner',
            problems: 5,
            timeEstimate: '45 min',
            difficulty: 'easy',
            progress: 100,
            completed: true,
            streak: 7,
            description: 'Practice fundamental array and string manipulation techniques',
            topics: ['Arrays', 'Strings', 'Two Pointers'],
            rewards: { points: 50, badge: 'Daily Streak' },
        },
        {
            id: 2,
            title: 'Weekly Challenge - Tree Traversal',
            type: 'weekly',
            level: 'intermediate',
            problems: 8,
            timeEstimate: '2 hours',
            difficulty: 'medium',
            progress: 75,
            completed: false,
            streak: 0,
            description: 'Master different tree traversal algorithms and their applications',
            topics: ['Trees', 'Depth-First Search', 'Breadth-First Search'],
            rewards: { points: 200, badge: 'Tree Master' },
        },
        {
            id: 3,
            title: 'Learning Path - Dynamic Programming',
            type: 'learning-paths',
            level: 'advanced',
            problems: 15,
            timeEstimate: '4 hours',
            difficulty: 'hard',
            progress: 40,
            completed: false,
            streak: 0,
            description: 'Complete journey from basic DP concepts to advanced optimization',
            topics: ['Dynamic Programming', 'Memoization', 'Optimization'],
            rewards: { points: 500, badge: 'DP Expert' },
        },
        {
            id: 4,
            title: 'Mock Interview - Google Style',
            type: 'mock-tests',
            level: 'expert',
            problems: 3,
            timeEstimate: '1 hour',
            difficulty: 'expert',
            progress: 0,
            completed: false,
            streak: 0,
            description: 'Simulate real interview conditions with Google-style problems',
            topics: ['System Design', 'Algorithms', 'Problem Solving'],
            rewards: { points: 300, badge: 'Interview Ready' },
        },
        {
            id: 5,
            title: 'Speed Challenge - Quick Solutions',
            type: 'challenges',
            level: 'intermediate',
            problems: 10,
            timeEstimate: '1.5 hours',
            difficulty: 'medium',
            progress: 60,
            completed: false,
            streak: 0,
            description: 'Focus on solving problems quickly while maintaining accuracy',
            topics: ['Speed', 'Accuracy', 'Problem Recognition'],
            rewards: { points: 250, badge: 'Speed Demon' },
        },
        {
            id: 6,
            title: 'Fundamentals Review - Data Structures',
            type: 'learning-paths',
            level: 'beginner',
            problems: 12,
            timeEstimate: '3 hours',
            difficulty: 'easy',
            progress: 100,
            completed: true,
            streak: 0,
            description: 'Comprehensive review of essential data structures',
            topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues'],
            rewards: { points: 150, badge: 'Data Structure Master' },
        },
    ];

    const filteredPracticeSets = practiceSets.filter((set) => {
        const matchesType = selectedPracticeType === 'all' || set.type === selectedPracticeType;
        const matchesLevel = selectedLevel === 'all' || set.level === selectedLevel;
        return matchesType && matchesLevel;
    });

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner':
                return 'text-green-600 bg-green-100';
            case 'intermediate':
                return 'text-yellow-600 bg-yellow-100';
            case 'advanced':
                return 'text-orange-600 bg-orange-100';
            case 'expert':
                return 'text-purple-600 bg-purple-100';
            default:
                return 'text-gray-600 bg-gray-100';
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

    const getProgressColor = (progress: number) => {
        if (progress === 100) return 'bg-green-500';
        if (progress >= 75) return 'bg-blue-500';
        if (progress >= 50) return 'bg-yellow-500';
        if (progress >= 25) return 'bg-orange-500';
        return 'bg-gray-300';
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
                        Practice Problems
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-2 text-gray-600"
                    >
                        Structured practice sessions to improve your problem-solving skills
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
                            <TrophyIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">24</div>
                                <div className="text-purple-100">Practice Sets</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <CheckCircleIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">8</div>
                                <div className="text-green-100">Completed</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <FireIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">7</div>
                                <div className="text-orange-100">Day Streak</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <StarIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">1,250</div>
                                <div className="text-blue-100">Points Earned</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8 space-y-6"
                >
                    {/* Practice Type Filter */}
                    <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-700">Practice Type</h3>
                        <div className="flex flex-wrap gap-3">
                            {practiceTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedPracticeType(type.id)}
                                    className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                        selectedPracticeType === type.id
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-lg">{type.icon}</span>
                                    <span>{type.label}</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            selectedPracticeType === type.id
                                                ? 'bg-white/20'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        {type.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Level Filter */}
                    <div>
                        <h3 className="mb-3 text-sm font-medium text-gray-700">Skill Level</h3>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { id: 'all', label: 'All Levels', count: 24 },
                                { id: 'beginner', label: 'Beginner', count: 8 },
                                { id: 'intermediate', label: 'Intermediate', count: 10 },
                                { id: 'advanced', label: 'Advanced', count: 4 },
                                { id: 'expert', label: 'Expert', count: 2 },
                            ].map((level) => (
                                <button
                                    key={level.id}
                                    onClick={() => setSelectedLevel(level.id)}
                                    className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                        selectedLevel === level.id
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span>{level.label}</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            selectedLevel === level.id
                                                ? 'bg-white/20'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        {level.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Practice Sets Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-2"
                >
                    {filteredPracticeSets.map((set, index) => (
                        <motion.div
                            key={set.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                                set.completed
                                    ? 'border-green-200 bg-white hover:border-green-300'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                        >
                            {/* Progress Bar */}
                            <div className="absolute top-0 right-0 left-0 h-1 bg-gray-200">
                                <div
                                    className={`h-full transition-all duration-500 ${getProgressColor(set.progress)}`}
                                    style={{ width: `${set.progress}%` }}
                                ></div>
                            </div>

                            {/* Status Badge */}
                            <div className="absolute top-4 right-4">
                                {set.completed ? (
                                    <span className="inline-flex items-center space-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        <CheckCircleIcon className="h-3 w-3" />
                                        <span>Completed</span>
                                    </span>
                                ) : set.progress > 0 ? (
                                    <span className="inline-flex items-center space-x-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                        <ClockIcon className="h-3 w-3" />
                                        <span>{set.progress}%</span>
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                        <PlayIcon className="h-3 w-3" />
                                        <span>Not Started</span>
                                    </span>
                                )}
                            </div>

                            <div className="p-6 pt-8">
                                {/* Header */}
                                <div className="mb-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
                                            {set.title}
                                        </h3>
                                    </div>
                                    <p className="mb-3 text-sm text-gray-600">{set.description}</p>

                                    {/* Tags */}
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        <span
                                            className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${getLevelColor(set.level)}`}
                                        >
                                            <span className="capitalize">{set.level}</span>
                                        </span>
                                        <span
                                            className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(set.difficulty)}`}
                                        >
                                            <span className="capitalize">{set.difficulty}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Topics */}
                                <div className="mb-4">
                                    <h4 className="mb-2 text-xs font-medium text-gray-500">
                                        Topics Covered
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {set.topics.map((topic, topicIndex) => (
                                            <span
                                                key={topicIndex}
                                                className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Problems:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {set.problems}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Time:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {set.timeEstimate}
                                        </span>
                                    </div>
                                    {set.streak > 0 && (
                                        <div>
                                            <span className="text-gray-500">Streak:</span>
                                            <span className="ml-2 font-medium text-gray-900">
                                                {set.streak} days
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-gray-500">Rewards:</span>
                                        <span className="ml-2 font-medium text-gray-900">
                                            {set.rewards.points} pts
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between">
                                    <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                                        {set.completed
                                            ? 'Review'
                                            : set.progress > 0
                                              ? 'Continue'
                                              : 'Start Practice'}
                                    </button>
                                    <div className="flex items-center space-x-2">
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-yellow-50 hover:text-yellow-500">
                                            <StarIcon className="h-5 w-5" />
                                        </button>
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500">
                                            <BookOpenIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredPracticeSets.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-12 text-center"
                    >
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                            <AcademicCapIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                            No practice sets found
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Try adjusting your filters or check back later for new content
                        </p>
                        <button
                            onClick={() => {
                                setSelectedPracticeType('all');
                                setSelectedLevel('all');
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
