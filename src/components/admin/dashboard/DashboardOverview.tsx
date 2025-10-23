'use client';

import { motion } from 'framer-motion';
import { Activity, DollarSign, TrendingUp, Users } from 'lucide-react';

const stats = [
    {
        title: 'Total Revenue',
        value: '$45,231',
        change: '+20.1%',
        changeType: 'positive',
        icon: DollarSign,
        color: 'bg-green-500',
    },
    {
        title: 'Active Users',
        value: '2,350',
        change: '+180.1%',
        changeType: 'positive',
        icon: Users,
        color: 'bg-blue-500',
    },
    {
        title: 'Sales',
        value: '12,234',
        change: '+19%',
        changeType: 'positive',
        icon: TrendingUp,
        color: 'bg-purple-500',
    },
    {
        title: 'Active Sessions',
        value: '573',
        change: '+201',
        changeType: 'positive',
        icon: Activity,
        color: 'bg-orange-500',
    },
];

export function DashboardOverview() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                            <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
                            <div className="mt-2 flex items-center">
                                <span
                                    className={`text-sm font-medium ${
                                        stat.changeType === 'positive'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {stat.change}
                                </span>
                                <span className="ml-1 text-sm text-gray-500">from last month</span>
                            </div>
                        </div>
                        <div className={`rounded-lg p-3 ${stat.color}`}>
                            <stat.icon className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
