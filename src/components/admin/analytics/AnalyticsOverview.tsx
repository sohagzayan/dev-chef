'use client';

import { motion } from 'framer-motion';
import { Eye, MousePointer, TrendingUp, Users } from 'lucide-react';

const analyticsData = [
    {
        title: 'Total Views',
        value: '2.4M',
        change: '+12.5%',
        changeType: 'positive',
        icon: Eye,
        color: 'bg-blue-500',
    },
    {
        title: 'Unique Visitors',
        value: '890K',
        change: '+8.2%',
        changeType: 'positive',
        icon: Users,
        color: 'bg-green-500',
    },
    {
        title: 'Conversion Rate',
        value: '3.2%',
        change: '+0.8%',
        changeType: 'positive',
        icon: TrendingUp,
        color: 'bg-purple-500',
    },
    {
        title: 'Click Through Rate',
        value: '5.7%',
        change: '-1.2%',
        changeType: 'negative',
        icon: MousePointer,
        color: 'bg-orange-500',
    },
];

export function AnalyticsOverview() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
            {analyticsData.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">{item.title}</p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{item.value}</p>
                            <div className="mt-2 flex items-center">
                                <span
                                    className={`text-sm font-medium ${
                                        item.changeType === 'positive'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {item.change}
                                </span>
                                <span className="ml-1 text-sm text-gray-500">vs last month</span>
                            </div>
                        </div>
                        <div className={`rounded-lg p-3 ${item.color}`}>
                            <item.icon className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
