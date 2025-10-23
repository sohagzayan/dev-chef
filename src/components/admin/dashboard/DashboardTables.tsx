'use client';

import { motion } from 'framer-motion';
import { Chrome, Edge, Globe, Opera } from 'lucide-react';

const browserData = [
    {
        browser: 'Chrome',
        icon: Chrome,
        sessions: 10853,
        percentage: 52,
        bounceRate: 52.8,
        transactions: 566,
        transactionPercentage: 92,
    },
    {
        browser: 'Microsoft Edge',
        icon: Edge,
        sessions: 4567,
        percentage: 22,
        bounceRate: 48.2,
        transactions: 234,
        transactionPercentage: 78,
    },
    {
        browser: 'Internet Explorer',
        icon: Globe,
        sessions: 3456,
        percentage: 17,
        bounceRate: 61.4,
        transactions: 123,
        transactionPercentage: 45,
    },
    {
        browser: 'Opera',
        icon: Opera,
        sessions: 2345,
        percentage: 9,
        bounceRate: 38.9,
        transactions: 89,
        transactionPercentage: 67,
    },
];

const trafficData = [
    {
        channel: 'Organic search',
        sessions: 45678,
        prevPeriod: 42345,
        change: 52.8,
        changeType: 'positive',
    },
    {
        channel: 'Direct',
        sessions: 23456,
        prevPeriod: 28345,
        change: -17.2,
        changeType: 'negative',
    },
    {
        channel: 'Referral',
        sessions: 12345,
        prevPeriod: 11234,
        change: 9.9,
        changeType: 'positive',
    },
    {
        channel: 'Email',
        sessions: 8901,
        prevPeriod: 8234,
        change: 8.1,
        changeType: 'positive',
    },
    {
        channel: 'Social',
        sessions: 5678,
        prevPeriod: 6234,
        change: -8.9,
        changeType: 'negative',
    },
];

export function DashboardTables() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
        >
            {/* Browser Usage Table */}
            <motion.div
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <h3 className="mb-6 text-lg font-semibold text-gray-900">
                    Browser Used & Traffic Reports
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-600">
                                    Browser
                                </th>
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-600">
                                    Sessions
                                </th>
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-600">
                                    Bounce Rate
                                </th>
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-600">
                                    Transactions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {browserData.map((row, index) => (
                                <motion.tr
                                    key={row.browser}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-2 py-3">
                                        <div className="flex items-center space-x-3">
                                            <row.icon className="h-5 w-5 text-gray-600" />
                                            <span className="font-medium text-gray-900">
                                                {row.browser}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-2 py-3">
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {row.sessions.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {row.percentage}%
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-2 py-3 text-gray-900">{row.bounceRate}%</td>
                                    <td className="px-2 py-3">
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {row.transactions}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {row.transactionPercentage}%
                                            </div>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Traffic Sources Table */}
            <motion.div
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <h3 className="mb-6 text-lg font-semibold text-gray-900">Total Visits</h3>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-600">
                                    Channel
                                </th>
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-600">
                                    Sessions
                                </th>
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-600">
                                    Prev. Period
                                </th>
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-600">
                                    % Change
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {trafficData.map((row, index) => (
                                <motion.tr
                                    key={row.channel}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-2 py-3 font-medium text-gray-900">
                                        {row.channel}
                                    </td>
                                    <td className="px-2 py-3 text-gray-900">
                                        {row.sessions.toLocaleString()}
                                    </td>
                                    <td className="px-2 py-3 text-gray-900">
                                        {row.prevPeriod.toLocaleString()}
                                    </td>
                                    <td className="px-2 py-3">
                                        <span
                                            className={`flex items-center space-x-1 ${
                                                row.changeType === 'positive'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            <span className="text-sm font-medium">
                                                {row.changeType === 'positive' ? '↗' : '↘'}
                                            </span>
                                            <span className="text-sm font-medium">
                                                {Math.abs(row.change)}%
                                            </span>
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>Last data updated - 13min ago</span>
                    <motion.button
                        className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}
