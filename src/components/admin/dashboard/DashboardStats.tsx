'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, Target } from 'lucide-react';

const progressData = [
    {
        label: 'Monthly Goal',
        value: 75,
        target: 100,
        unit: 'K',
        icon: Target,
        color: 'bg-blue-500',
    },
    {
        label: 'Tasks Completed',
        value: 42,
        target: 50,
        unit: '',
        icon: CheckCircle,
        color: 'bg-green-500',
    },
    {
        label: 'Pending Reviews',
        value: 8,
        target: 15,
        unit: '',
        icon: Clock,
        color: 'bg-yellow-500',
    },
    {
        label: 'Issues Found',
        value: 3,
        target: 10,
        unit: '',
        icon: AlertCircle,
        color: 'bg-red-500',
    },
];

export function DashboardStats() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Performance Overview</h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {progressData.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`rounded-lg p-2 ${item.color}`}>
                                <item.icon className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">{item.label}</p>
                                <p className="text-lg font-bold text-gray-900">
                                    {item.value}
                                    {item.unit} / {item.target}
                                    {item.unit}
                                </p>
                            </div>
                        </div>

                        <div className="h-2 w-full rounded-full bg-gray-200">
                            <motion.div
                                className={`h-2 rounded-full ${item.color.replace('bg-', 'bg-')}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.value / item.target) * 100}%` }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                            />
                        </div>

                        <p className="text-sm text-gray-500">
                            {Math.round((item.value / item.target) * 100)}% completed
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
