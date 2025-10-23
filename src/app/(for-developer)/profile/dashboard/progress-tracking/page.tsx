'use client';

import { useState } from 'react';
import {
    CalendarIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    FireIcon,
    FlagIcon,
    RocketLaunchIcon,
    StarIcon,
    TrophyIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ProgressTrackingPage() {
    const [selectedGoal, setSelectedGoal] = useState('all');

    const goals = [
        { id: 'all', label: 'All Goals', count: 8 },
        { id: 'daily', label: 'Daily Goals', count: 3 },
        { id: 'weekly', label: 'Weekly Goals', count: 2 },
        { id: 'monthly', label: 'Monthly Goals', count: 2 },
        { id: 'long-term', label: 'Long Term', count: 1 },
    ];

    const milestones = [
        {
            id: 1,
            title: 'First Problem Solved',
            description: 'Complete your first coding problem',
            status: 'completed',
            date: '2024-01-15',
            icon: CheckCircleIcon,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            id: 2,
            title: '10 Problems Milestone',
            description: 'Solve 10 problems of any difficulty',
            status: 'completed',
            date: '2024-02-01',
            icon: TrophyIcon,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
        },
        {
            id: 3,
            title: '7-Day Streak',
            description: 'Maintain a 7-day solving streak',
            status: 'completed',
            date: '2024-02-15',
            icon: FireIcon,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
        {
            id: 4,
            title: '50 Problems Solved',
            description: 'Complete 50 problems',
            status: 'in-progress',
            progress: 87,
            target: 50,
            icon: ChartBarIcon,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            id: 5,
            title: 'Perfect Score Achievement',
            description: 'Get 100% on 5 problems',
            status: 'in-progress',
            progress: 3,
            target: 5,
            icon: StarIcon,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
        {
            id: 6,
            title: '100 Problems Master',
            description: 'Solve 100 problems',
            status: 'upcoming',
            icon: FlagIcon,
            color: 'text-gray-600',
            bgColor: 'bg-gray-100',
        },
    ];

    const dailyGoals = [
        { title: 'Solve 2 Problems', completed: 2, target: 2, status: 'completed' },
        { title: 'Practice for 1 Hour', completed: 45, target: 60, status: 'in-progress' },
        { title: "Review Yesterday's Solutions", completed: 1, target: 1, status: 'completed' },
    ];

    const weeklyGoals = [
        { title: 'Complete 10 Problems', completed: 8, target: 10, status: 'in-progress' },
        { title: 'Learn New Algorithm', completed: 1, target: 1, status: 'completed' },
    ];

    const monthlyGoals = [
        { title: 'Solve 50 Problems', completed: 42, target: 50, status: 'in-progress' },
        { title: 'Improve Average Score to 95%', completed: 92, target: 95, status: 'in-progress' },
    ];

    const achievements = [
        {
            title: 'Problem Solver',
            description: 'Solved your first problem',
            icon: CheckCircleIcon,
            earned: true,
            date: '2024-01-15',
        },
        {
            title: 'Streak Master',
            description: 'Maintained a 7-day streak',
            icon: FireIcon,
            earned: true,
            date: '2024-02-15',
        },
        {
            title: 'Speed Demon',
            description: 'Solved 5 problems in one day',
            icon: RocketLaunchIcon,
            earned: true,
            date: '2024-02-20',
        },
        {
            title: 'Perfect Score',
            description: 'Get 100% on 10 problems',
            icon: StarIcon,
            earned: false,
            progress: 7,
            target: 10,
        },
        {
            title: 'Algorithm Expert',
            description: 'Master 5 different algorithms',
            icon: ChartBarIcon,
            earned: false,
            progress: 3,
            target: 5,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-600 bg-green-100';
            case 'in-progress':
                return 'text-blue-600 bg-blue-100';
            case 'upcoming':
                return 'text-gray-600 bg-gray-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircleIcon className="h-5 w-5" />;
            case 'in-progress':
                return <ClockIcon className="h-5 w-5" />;
            case 'upcoming':
                return <FlagIcon className="h-5 w-5" />;
            default:
                return <FlagIcon className="h-5 w-5" />;
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
                        Progress Tracking
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-2 text-gray-600"
                    >
                        Monitor your learning journey and celebrate achievements
                    </motion.p>
                </div>

                {/* Goal Categories */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="flex flex-wrap gap-3">
                        {goals.map((goal) => (
                            <button
                                key={goal.id}
                                onClick={() => setSelectedGoal(goal.id)}
                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                    selectedGoal === goal.id
                                        ? 'bg-purple-600 text-white shadow-lg'
                                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <span>{goal.label}</span>
                                <span
                                    className={`rounded-full px-2 py-1 text-xs ${
                                        selectedGoal === goal.id ? 'bg-white/20' : 'bg-gray-100'
                                    }`}
                                >
                                    {goal.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Progress Overview */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Daily Goals */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="rounded-xl bg-white p-6 shadow-lg"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Daily Goals</h2>
                            <CalendarIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {dailyGoals.map((goal, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-900">
                                            {goal.title}
                                        </span>
                                        <span className="text-gray-600">
                                            {goal.completed}/{goal.target}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${
                                                goal.status === 'completed'
                                                    ? 'bg-green-500'
                                                    : 'bg-blue-500'
                                            }`}
                                            style={{
                                                width: `${(goal.completed / goal.target) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        {goal.status === 'completed'
                                            ? 'Completed'
                                            : `${Math.round((goal.completed / goal.target) * 100)}%`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Weekly Goals */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="rounded-xl bg-white p-6 shadow-lg"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Weekly Goals</h2>
                            <ChartBarIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {weeklyGoals.map((goal, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-900">
                                            {goal.title}
                                        </span>
                                        <span className="text-gray-600">
                                            {goal.completed}/{goal.target}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${
                                                goal.status === 'completed'
                                                    ? 'bg-green-500'
                                                    : 'bg-blue-500'
                                            }`}
                                            style={{
                                                width: `${(goal.completed / goal.target) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        {goal.status === 'completed'
                                            ? 'Completed'
                                            : `${Math.round((goal.completed / goal.target) * 100)}%`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Monthly Goals */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="rounded-xl bg-white p-6 shadow-lg"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Monthly Goals</h2>
                            <FlagIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {monthlyGoals.map((goal, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-900">
                                            {goal.title}
                                        </span>
                                        <span className="text-gray-600">
                                            {goal.completed}/{goal.target}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className="h-full rounded-full bg-blue-500 transition-all duration-500"
                                            style={{
                                                width: `${(goal.completed / goal.target) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        {Math.round((goal.completed / goal.target) * 100)}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Milestones */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 rounded-xl bg-white p-6 shadow-lg"
                >
                    <h2 className="mb-6 text-xl font-semibold text-gray-900">Milestones</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {milestones.map((milestone) => (
                            <div
                                key={milestone.id}
                                className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
                            >
                                <div className="flex items-start space-x-3">
                                    <div className={`rounded-full p-2 ${milestone.bgColor}`}>
                                        <milestone.icon className={`h-5 w-5 ${milestone.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-1 font-medium text-gray-900">
                                            {milestone.title}
                                        </h3>
                                        <p className="mb-3 text-sm text-gray-600">
                                            {milestone.description}
                                        </p>

                                        {milestone.status === 'in-progress' &&
                                            milestone.progress &&
                                            milestone.target && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">
                                                            Progress
                                                        </span>
                                                        <span className="font-medium text-gray-900">
                                                            {milestone.progress}/{milestone.target}
                                                        </span>
                                                    </div>
                                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                                        <div
                                                            className="h-full rounded-full bg-blue-500 transition-all duration-500"
                                                            style={{
                                                                width: `${(milestone.progress / milestone.target) * 100}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}

                                        <div className="mt-3 flex items-center justify-between">
                                            <span
                                                className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(milestone.status)}`}
                                            >
                                                {getStatusIcon(milestone.status)}
                                                <span className="capitalize">
                                                    {milestone.status}
                                                </span>
                                            </span>
                                            {milestone.date && (
                                                <span className="text-xs text-gray-500">
                                                    {milestone.date}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="mt-8 rounded-xl bg-white p-6 shadow-lg"
                >
                    <h2 className="mb-6 text-xl font-semibold text-gray-900">Achievements</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className={`rounded-lg border-2 p-4 transition-all duration-300 ${
                                    achievement.earned
                                        ? 'border-green-200 bg-green-50 hover:shadow-md'
                                        : 'border-gray-200 bg-gray-50'
                                }`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div
                                        className={`rounded-full p-2 ${
                                            achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                                        }`}
                                    >
                                        <achievement.icon
                                            className={`h-5 w-5 ${
                                                achievement.earned
                                                    ? 'text-green-600'
                                                    : 'text-gray-400'
                                            }`}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3
                                            className={`mb-1 font-medium ${
                                                achievement.earned
                                                    ? 'text-green-900'
                                                    : 'text-gray-600'
                                            }`}
                                        >
                                            {achievement.title}
                                        </h3>
                                        <p
                                            className={`mb-3 text-sm ${
                                                achievement.earned
                                                    ? 'text-green-700'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {achievement.description}
                                        </p>

                                        {!achievement.earned &&
                                            achievement.progress &&
                                            achievement.target && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">
                                                            Progress
                                                        </span>
                                                        <span className="font-medium text-gray-900">
                                                            {achievement.progress}/
                                                            {achievement.target}
                                                        </span>
                                                    </div>
                                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                                        <div
                                                            className="h-full rounded-full bg-gray-400 transition-all duration-500"
                                                            style={{
                                                                width: `${(achievement.progress / achievement.target) * 100}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}

                                        <div className="mt-3">
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
                                                <span className="ml-2 text-xs text-gray-500">
                                                    {achievement.date}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Motivation Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white"
                >
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">Keep Going!</h2>
                            <p className="text-purple-100">
                                You're making excellent progress. Stay consistent and you'll reach
                                your goals faster than expected.
                            </p>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <button className="rounded-lg bg-white/20 px-4 py-2 font-medium transition-colors hover:bg-white/30">
                                Set New Goals
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
