'use client';

import { useState } from 'react';
import {
    BoltIcon,
    CheckCircleIcon,
    ClockIcon,
    FireIcon,
    HeartIcon,
    RocketLaunchIcon,
    ShieldCheckIcon,
    StarIcon,
    TrophyIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function AchievementsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All Achievements', count: 24 },
        { id: 'problem-solving', label: 'Problem Solving', count: 8 },
        { id: 'streaks', label: 'Streaks', count: 6 },
        { id: 'speed', label: 'Speed', count: 4 },
        { id: 'accuracy', label: 'Accuracy', count: 3 },
        { id: 'learning', label: 'Learning', count: 3 },
    ];

    const achievements = [
        {
            id: 1,
            title: 'First Steps',
            description: 'Complete your first coding problem',
            category: 'problem-solving',
            icon: CheckCircleIcon,
            rarity: 'common',
            earned: true,
            date: '2024-01-15',
            points: 10,
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
        },
        {
            id: 2,
            title: 'Problem Solver',
            description: 'Solve 10 problems of any difficulty',
            category: 'problem-solving',
            icon: TrophyIcon,
            rarity: 'common',
            earned: true,
            date: '2024-02-01',
            points: 25,
            color: 'from-yellow-500 to-amber-600',
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-700',
        },
        {
            id: 3,
            title: 'Streak Master',
            description: 'Maintain a 7-day solving streak',
            category: 'streaks',
            icon: FireIcon,
            rarity: 'rare',
            earned: true,
            date: '2024-02-15',
            points: 50,
            color: 'from-orange-500 to-red-600',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-700',
        },
        {
            id: 4,
            title: 'Speed Demon',
            description: 'Solve 5 problems in one day',
            category: 'speed',
            icon: BoltIcon,
            rarity: 'rare',
            earned: true,
            date: '2024-02-20',
            points: 75,
            color: 'from-blue-500 to-cyan-600',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
        },
        {
            id: 5,
            title: 'Perfect Score',
            description: 'Get 100% on 10 problems',
            category: 'accuracy',
            icon: StarIcon,
            rarity: 'epic',
            earned: false,
            progress: 7,
            target: 10,
            points: 100,
            color: 'from-purple-500 to-pink-600',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-700',
        },
        {
            id: 6,
            title: 'Algorithm Expert',
            description: 'Master 5 different algorithms',
            category: 'learning',
            icon: StarIcon,
            rarity: 'epic',
            earned: false,
            progress: 3,
            target: 5,
            points: 150,
            color: 'from-indigo-500 to-purple-600',
            bgColor: 'bg-indigo-100',
            textColor: 'text-indigo-700',
        },
        {
            id: 7,
            title: 'Century Club',
            description: 'Solve 100 problems',
            category: 'problem-solving',
            icon: TrophyIcon,
            rarity: 'legendary',
            earned: false,
            progress: 87,
            target: 100,
            points: 500,
            color: 'from-yellow-500 to-orange-600',
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-700',
        },
        {
            id: 8,
            title: 'Marathon Runner',
            description: 'Maintain a 30-day streak',
            category: 'streaks',
            icon: HeartIcon,
            rarity: 'legendary',
            earned: false,
            progress: 12,
            target: 30,
            points: 750,
            color: 'from-red-500 to-pink-600',
            bgColor: 'bg-red-100',
            textColor: 'text-red-700',
        },
        {
            id: 9,
            title: 'Innovator',
            description: 'Submit 5 original solutions',
            category: 'learning',
            icon: BoltIcon,
            rarity: 'rare',
            earned: false,
            progress: 2,
            target: 5,
            points: 100,
            color: 'from-green-500 to-blue-600',
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
        },
        {
            id: 10,
            title: 'Puzzle Master',
            description: 'Solve 20 hard problems',
            category: 'problem-solving',
            icon: TrophyIcon,
            rarity: 'epic',
            earned: false,
            progress: 8,
            target: 20,
            points: 200,
            color: 'from-purple-500 to-indigo-600',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-700',
        },
        {
            id: 11,
            title: 'Guardian',
            description: 'Help 10 other users',
            category: 'learning',
            icon: ShieldCheckIcon,
            rarity: 'rare',
            earned: false,
            progress: 4,
            target: 10,
            points: 125,
            color: 'from-blue-500 to-green-600',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
        },
        {
            id: 12,
            title: 'Rocket Scientist',
            description: 'Solve 3 expert problems in one day',
            category: 'speed',
            icon: RocketLaunchIcon,
            rarity: 'legendary',
            earned: false,
            progress: 0,
            target: 3,
            points: 1000,
            color: 'from-purple-500 to-red-600',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-700',
        },
    ];

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common':
                return 'text-gray-600 bg-gray-100';
            case 'rare':
                return 'text-blue-600 bg-blue-100';
            case 'epic':
                return 'text-purple-600 bg-purple-100';
            case 'legendary':
                return 'text-orange-600 bg-orange-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getRarityIcon = (rarity: string) => {
        switch (rarity) {
            case 'common':
                return <CheckCircleIcon className="h-3 w-3" />;
            case 'rare':
                return <StarIcon className="h-3 w-3" />;
            case 'epic':
                return <TrophyIcon className="h-3 w-3" />;
            case 'legendary':
                return <StarIcon className="h-3 w-3" />;
            default:
                return <CheckCircleIcon className="h-3 w-3" />;
        }
    };

    const filteredAchievements =
        selectedCategory === 'all'
            ? achievements
            : achievements.filter((achievement) => achievement.category === selectedCategory);

    const earnedAchievements = achievements.filter((a) => a.earned);
    const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0);

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
                        Achievements
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-2 text-gray-600"
                    >
                        Unlock badges and celebrate your coding milestones
                    </motion.p>
                </div>

                {/* Stats Overview */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3"
                >
                    <div className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <TrophyIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">
                                    {earnedAchievements.length}
                                </div>
                                <div className="text-purple-100">Achievements Earned</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <StarIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">{totalPoints}</div>
                                <div className="text-green-100">Total Points</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                        <div className="flex items-center space-x-3">
                            <FireIcon className="h-8 w-8" />
                            <div>
                                <div className="text-2xl font-bold">
                                    {Math.round(
                                        (earnedAchievements.length / achievements.length) * 100,
                                    )}
                                    %
                                </div>
                                <div className="text-orange-100">Completion Rate</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8"
                >
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                    selectedCategory === category.id
                                        ? 'bg-purple-600 text-white shadow-lg'
                                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <span>{category.label}</span>
                                <span
                                    className={`rounded-full px-2 py-1 text-xs ${
                                        selectedCategory === category.id
                                            ? 'bg-white/20'
                                            : 'bg-gray-100'
                                    }`}
                                >
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Achievements Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {filteredAchievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                                achievement.earned
                                    ? 'border-green-200 bg-white hover:border-green-300'
                                    : 'border-gray-200 bg-gray-50'
                            }`}
                        >
                            {/* Background Pattern */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br opacity-5 transition-opacity duration-300 group-hover:opacity-10 ${achievement.color}`}
                            ></div>

                            <div className="relative p-6">
                                {/* Header */}
                                <div className="mb-4 flex items-start justify-between">
                                    <div className={`rounded-full p-3 ${achievement.bgColor}`}>
                                        <achievement.icon
                                            className={`h-6 w-6 ${achievement.textColor}`}
                                        />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-900">
                                            {achievement.points} pts
                                        </div>
                                        <span
                                            className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${getRarityColor(achievement.rarity)}`}
                                        >
                                            {getRarityIcon(achievement.rarity)}
                                            <span className="capitalize">{achievement.rarity}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3
                                    className={`mb-2 font-semibold ${
                                        achievement.earned ? 'text-gray-900' : 'text-gray-600'
                                    }`}
                                >
                                    {achievement.title}
                                </h3>
                                <p
                                    className={`mb-4 text-sm ${
                                        achievement.earned ? 'text-gray-700' : 'text-gray-500'
                                    }`}
                                >
                                    {achievement.description}
                                </p>

                                {/* Progress Bar for Unearned */}
                                {!achievement.earned &&
                                    achievement.progress !== undefined &&
                                    achievement.target && (
                                        <div className="mb-4 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Progress</span>
                                                <span className="font-medium text-gray-900">
                                                    {achievement.progress}/{achievement.target}
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-gray-200">
                                                <div
                                                    className={`h-full rounded-full bg-gradient-to-r ${achievement.color} transition-all duration-500`}
                                                    style={{
                                                        width: `${(achievement.progress / achievement.target) * 100}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                {/* Footer */}
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${
                                            achievement.earned
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {achievement.earned ? (
                                            <>
                                                <CheckCircleIcon className="h-3 w-3" />
                                                <span>Earned</span>
                                            </>
                                        ) : (
                                            <>
                                                <ClockIcon className="h-3 w-3" />
                                                <span>In Progress</span>
                                            </>
                                        )}
                                    </span>
                                    {achievement.earned && achievement.date && (
                                        <span className="text-xs text-gray-500">
                                            {achievement.date}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Motivation Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white"
                >
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">Keep Achieving!</h2>
                            <p className="text-purple-100">
                                Every problem you solve brings you closer to unlocking more
                                achievements. Stay motivated and keep coding!
                            </p>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <button className="rounded-lg bg-white/20 px-4 py-2 font-medium transition-colors hover:bg-white/30">
                                View All Problems
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
