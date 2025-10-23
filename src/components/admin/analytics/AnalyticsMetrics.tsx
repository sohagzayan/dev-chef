'use client';

import { motion } from 'framer-motion';
import { Globe, Monitor, Smartphone, Tablet } from 'lucide-react';

const deviceData = [
    {
        device: 'Desktop',
        icon: Monitor,
        percentage: 65,
        users: 15600,
        color: 'bg-blue-500',
    },
    {
        device: 'Mobile',
        icon: Smartphone,
        percentage: 28,
        users: 6720,
        color: 'bg-green-500',
    },
    {
        device: 'Tablet',
        icon: Tablet,
        percentage: 7,
        users: 1680,
        color: 'bg-purple-500',
    },
];

const sourceData = [
    { source: 'Direct', percentage: 35, color: 'bg-blue-500' },
    { source: 'Organic Search', percentage: 28, color: 'bg-green-500' },
    { source: 'Social Media', percentage: 22, color: 'bg-purple-500' },
    { source: 'Referral', percentage: 15, color: 'bg-orange-500' },
];

export function AnalyticsMetrics() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Device Usage */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
                <h3 className="mb-6 text-lg font-semibold text-gray-900">Device Usage</h3>

                <div className="space-y-4">
                    {deviceData.map((item, index) => (
                        <motion.div
                            key={item.device}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`rounded-lg p-2 ${item.color}`}>
                                    <item.icon className="h-4 w-4 text-white" />
                                </div>
                                <span className="font-medium text-gray-900">{item.device}</span>
                            </div>

                            <div className="text-right">
                                <div className="font-semibold text-gray-900">
                                    {item.percentage}%
                                </div>
                                <div className="text-sm text-gray-500">
                                    {item.users.toLocaleString()} users
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Traffic Sources */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
                <h3 className="mb-6 text-lg font-semibold text-gray-900">Traffic Sources</h3>

                <div className="space-y-4">
                    {sourceData.map((item, index) => (
                        <motion.div
                            key={item.source}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900">{item.source}</span>
                                <span className="font-semibold text-gray-900">
                                    {item.percentage}%
                                </span>
                            </div>

                            <div className="h-2 w-full rounded-full bg-gray-200">
                                <motion.div
                                    className={`h-2 rounded-full ${item.color}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.percentage}%` }}
                                    transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
