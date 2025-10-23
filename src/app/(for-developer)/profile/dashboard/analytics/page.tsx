'use client';

import { useState } from 'react';
import {
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    FireIcon,
    StarIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
    const [selectedMetric, setSelectedMetric] = useState('problems');
    const [timeRange, setTimeRange] = useState('30d');

    const metrics = [
        {
            id: 'problems',
            label: 'Problems Solved',
            icon: CheckCircleIcon,
            color: 'from-green-500 to-emerald-600',
        },
        {
            id: 'streak',
            label: 'Current Streak',
            icon: FireIcon,
            color: 'from-orange-500 to-red-600',
        },
        {
            id: 'score',
            label: 'Average Score',
            icon: StarIcon,
            color: 'from-yellow-500 to-amber-600',
        },
        { id: 'time', label: 'Time Spent', icon: ClockIcon, color: 'from-blue-500 to-cyan-600' },
    ];

    const chartData = {
        problems: [
            12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 38, 45, 42, 50, 48, 55, 52, 60, 58, 65, 62, 70,
            68, 75, 72, 80, 78, 85, 82, 87,
        ],
        streak: [
            5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
            28, 29, 30, 31, 32, 33, 34,
        ],
        score: [
            75, 78, 80, 82, 85, 87, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 99, 98, 97, 96,
            95, 94, 93, 92, 91, 90, 89, 92,
        ],
        time: [
            2, 3, 2.5, 4, 3.5, 5, 4.5, 6, 5.5, 7, 6.5, 8, 7.5, 9, 8.5, 10, 9.5, 11, 10.5, 12, 11.5,
            13, 12.5, 14, 13.5, 15, 14.5, 16, 15.5, 24,
        ],
    };

    const performanceData = [
        { category: 'Easy Problems', solved: 45, total: 50, percentage: 90, color: 'bg-green-500' },
        {
            category: 'Medium Problems',
            solved: 32,
            total: 40,
            percentage: 80,
            color: 'bg-yellow-500',
        },
        { category: 'Hard Problems', solved: 10, total: 20, percentage: 50, color: 'bg-red-500' },
        {
            category: 'Expert Problems',
            solved: 5,
            total: 15,
            percentage: 33,
            color: 'bg-purple-500',
        },
    ];

    const topSkills = [
        { skill: 'Arrays', proficiency: 95, problems: 25, color: 'from-blue-500 to-cyan-500' },
        { skill: 'Strings', proficiency: 88, problems: 20, color: 'from-green-500 to-emerald-500' },
        {
            skill: 'Linked Lists',
            proficiency: 82,
            problems: 18,
            color: 'from-purple-500 to-pink-500',
        },
        { skill: 'Trees', proficiency: 75, problems: 15, color: 'from-orange-500 to-red-500' },
        {
            skill: 'Dynamic Programming',
            proficiency: 68,
            problems: 12,
            color: 'from-indigo-500 to-purple-500',
        },
    ];

    const trends = [
        { metric: 'Daily Problems', value: '+2.3', change: 'increase', period: 'vs last week' },
        { metric: 'Accuracy Rate', value: '+5.2%', change: 'increase', period: 'vs last month' },
        { metric: 'Study Time', value: '+1.5h', change: 'increase', period: 'vs last week' },
        { metric: 'Streak Length', value: '+3', change: 'increase', period: 'vs last month' },
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
                        Analytics Dashboard
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-2 text-gray-600"
                    >
                        Deep insights into your learning progress and performance
                    </motion.p>
                </div>

                {/* Metric Selector */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6"
                >
                    <div className="flex flex-wrap gap-3">
                        {metrics.map((metric) => (
                            <button
                                key={metric.id}
                                onClick={() => setSelectedMetric(metric.id)}
                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                    selectedMetric === metric.id
                                        ? 'bg-gradient-to-r text-white shadow-lg'
                                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                } ${metric.color}`}
                            >
                                <metric.icon className="h-5 w-5" />
                                <span>{metric.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Time Range Selector */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-6 flex flex-wrap items-center gap-4"
                >
                    <div className="flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                        {['7d', '30d', '90d', '1y'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                    timeRange === range
                                        ? 'bg-purple-600 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Chart Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-8 rounded-xl bg-white p-6 shadow-lg"
                >
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {metrics.find((m) => m.id === selectedMetric)?.label} Over Time
                        </h2>
                        <div className="text-sm text-gray-500">
                            Last{' '}
                            {timeRange === '7d'
                                ? '7 days'
                                : timeRange === '30d'
                                  ? '30 days'
                                  : timeRange === '90d'
                                    ? '90 days'
                                    : '1 year'}
                        </div>
                    </div>

                    {/* Simple Bar Chart */}
                    <div className="flex h-64 items-end justify-between space-x-1">
                        {chartData[selectedMetric as keyof typeof chartData]
                            .slice(-parseInt(timeRange.replace('d', '')))
                            .map((value, index) => (
                                <div
                                    key={index}
                                    className="flex-1 rounded-t bg-gradient-to-t from-purple-500 to-pink-500 transition-all duration-300 hover:opacity-80"
                                    style={{
                                        height: `${(value / Math.max(...chartData[selectedMetric as keyof typeof chartData])) * 100}%`,
                                    }}
                                    title={`${value}`}
                                ></div>
                            ))}
                    </div>
                </motion.div>

                {/* Performance Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Problem Difficulty Performance */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="rounded-xl bg-white p-6 shadow-lg"
                    >
                        <h2 className="mb-6 text-xl font-semibold text-gray-900">
                            Problem Difficulty Performance
                        </h2>
                        <div className="space-y-4">
                            {performanceData.map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-900">
                                            {item.category}
                                        </span>
                                        <span className="text-gray-600">
                                            {item.solved}/{item.total}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className={`h-full rounded-full ${item.color} transition-all duration-500`}
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        {item.percentage}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Top Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="rounded-xl bg-white p-6 shadow-lg"
                    >
                        <h2 className="mb-6 text-xl font-semibold text-gray-900">Top Skills</h2>
                        <div className="space-y-4">
                            {topSkills.map((skill, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`h-3 w-3 rounded-full bg-gradient-to-r ${skill.color}`}
                                        ></div>
                                        <span className="font-medium text-gray-900">
                                            {skill.skill}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-900">
                                            {skill.proficiency}%
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {skill.problems} problems
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Trends Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 rounded-xl bg-white p-6 shadow-lg"
                >
                    <h2 className="mb-6 text-xl font-semibold text-gray-900">Performance Trends</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {trends.map((trend, index) => (
                            <div key={index} className="rounded-lg bg-gray-50 p-4 text-center">
                                <div className="mb-1 text-2xl font-bold text-gray-900">
                                    {trend.metric}
                                </div>
                                <div
                                    className={`mb-1 text-lg font-semibold ${
                                        trend.change === 'increase'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {trend.value}
                                </div>
                                <div className="text-sm text-gray-500">{trend.period}</div>
                                <div
                                    className={`mt-2 inline-flex items-center ${
                                        trend.change === 'increase'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {trend.change === 'increase' ? (
                                        <ArrowTrendingUpIcon className="mr-1 h-4 w-4" />
                                    ) : (
                                        <ArrowTrendingDownIcon className="mr-1 h-4 w-4" />
                                    )}
                                    <span className="text-xs font-medium">{trend.change}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Insights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="mt-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white"
                >
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">Key Insights</h2>
                            <p className="text-purple-100">
                                Your problem-solving skills are improving steadily. Focus on Dynamic
                                Programming to boost your overall performance.
                            </p>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <button className="rounded-lg bg-white/20 px-4 py-2 font-medium transition-colors hover:bg-white/30">
                                View Detailed Report
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
