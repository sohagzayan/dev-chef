'use client';

import { useState } from 'react';
import {
    CalendarIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    FireIcon,
    StarIcon,
    TrophyIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function OverviewPage() {
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    const statsCards = [
        {
            title: 'Problems Solved',
            value: '87',
            change: '+12%',
            changeType: 'increase',
            icon: <CheckCircleIcon className="h-6 w-6" />,
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-700',
        },
        {
            title: 'Current Streak',
            value: '12 days',
            change: '+3 days',
            changeType: 'increase',
            icon: <FireIcon className="h-6 w-6" />,
            color: 'from-orange-500 to-red-600',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-700',
        },
        {
            title: 'Average Score',
            value: '92%',
            change: '+5%',
            changeType: 'increase',
            icon: <StarIcon className="h-6 w-6" />,
            color: 'from-yellow-500 to-amber-600',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-700',
        },
        {
            title: 'Time Spent',
            value: '24h',
            change: '+2h',
            changeType: 'increase',
            icon: <ClockIcon className="h-6 w-6" />,
            color: 'from-blue-500 to-cyan-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700',
        },
    ];

    const recentActivities = [
        {
            type: 'problem-solved',
            title: 'Two Sum',
            difficulty: 'Easy',
            time: '2 hours ago',
            score: '100%',
            icon: <CheckCircleIcon className="h-5 w-5" />,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            type: 'streak-extended',
            title: 'Daily Streak Extended',
            difficulty: 'N/A',
            time: '1 day ago',
            score: '12 days',
            icon: <FireIcon className="h-5 w-5" />,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
        {
            type: 'achievement',
            title: 'First Perfect Score',
            difficulty: 'N/A',
            time: '3 days ago',
            score: 'Achievement',
            icon: <TrophyIcon className="h-5 w-5" />,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
        },
        {
            type: 'problem-attempted',
            title: 'Valid Parentheses',
            difficulty: 'Medium',
            time: '5 days ago',
            score: '85%',
            icon: <ChartBarIcon className="h-5 w-5" />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
    ];

    const upcomingGoals = [
        {
            title: 'Complete 100 Problems',
            progress: 87,
            target: 100,
            deadline: '2 weeks',
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Maintain 15-day Streak',
            progress: 12,
            target: 15,
            deadline: '3 days',
            color: 'from-orange-500 to-red-500',
        },
        {
            title: 'Achieve 95% Average Score',
            progress: 92,
            target: 95,
            deadline: '1 week',
            color: 'from-green-500 to-emerald-500',
        },
    ];

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
                        Dashboard Overview
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-2 text-gray-600"
                    >
                        Track your progress and achievements in one place
                    </motion.p>
                </div>

                {/* Period Selector */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6 flex flex-wrap items-center gap-2 sm:gap-4"
                >
                    <div className="flex w-full rounded-lg border border-gray-200 bg-white p-1 shadow-sm sm:w-auto">
                        {['week', 'month', 'quarter', 'year'].map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`flex-1 rounded-md px-2 py-2 text-xs font-medium transition-all duration-200 sm:flex-none sm:px-4 sm:text-sm ${
                                    selectedPeriod === period
                                        ? 'bg-purple-600 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {period.charAt(0).toUpperCase() + period.slice(1)}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                    {statsCards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <div className="${card.color} absolute inset-0 bg-gradient-to-r opacity-5 transition-opacity duration-300 group-hover:opacity-10"></div>
                            <div className="relative">
                                <div className={`mb-4 inline-flex rounded-lg p-3 ${card.bgColor}`}>
                                    <div className={card.textColor}>{card.icon}</div>
                                </div>
                                <h3 className="mb-2 text-sm font-medium text-gray-600">
                                    {card.title}
                                </h3>
                                <div className="mb-2 flex items-baseline space-x-2">
                                    <span className="text-2xl font-bold text-gray-900">
                                        {card.value}
                                    </span>
                                    <span
                                        className={`text-sm font-medium ${
                                            card.changeType === 'increase'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        {card.change}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
                    {/* Recent Activities */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="rounded-xl bg-white p-6 shadow-lg"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Recent Activities
                            </h2>
                            <button className="text-sm font-medium text-purple-600 hover:text-purple-700">
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                                    className="flex items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-gray-50"
                                >
                                    <div className={`rounded-full p-2 ${activity.bgColor}`}>
                                        <div className={activity.color}>{activity.icon}</div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            {activity.title}
                                        </h3>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <span>{activity.difficulty}</span>
                                            <span>•</span>
                                            <span>{activity.time}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-medium text-gray-900">
                                            {activity.score}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Upcoming Goals */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="rounded-xl bg-white p-6 shadow-lg"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Upcoming Goals</h2>
                            <button className="text-sm font-medium text-purple-600 hover:text-purple-700">
                                Manage Goals
                            </button>
                        </div>
                        <div className="space-y-6">
                            {upcomingGoals.map((goal, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-gray-900">{goal.title}</h3>
                                        <span className="text-sm text-gray-500">
                                            Due in {goal.deadline}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Progress</span>
                                            <span className="font-medium text-gray-900">
                                                {goal.progress}/{goal.target}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div
                                                className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                                                style={{
                                                    width: `${(goal.progress / goal.target) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white sm:p-6"
                >
                    <div className="flex flex-col items-center space-y-4 text-center lg:flex-row lg:justify-between lg:space-y-0">
                        <div>
                            <h2 className="text-lg font-semibold sm:text-xl">
                                Ready to solve more problems?
                            </h2>
                            <p className="mt-2 text-purple-100">
                                Keep your streak alive and improve your skills with daily practice
                            </p>
                        </div>
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                            <button className="rounded-lg bg-white/20 px-3 py-2 text-sm font-medium transition-colors hover:bg-white/30 sm:px-4 sm:text-base">
                                Practice Now
                            </button>
                            <button className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-purple-600 transition-colors hover:bg-gray-100 sm:px-4 sm:text-base">
                                View Problems
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
