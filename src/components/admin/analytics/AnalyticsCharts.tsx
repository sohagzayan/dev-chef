'use client';

import { motion } from 'framer-motion';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const chartData = [
    { month: 'Jan', views: 4000, visitors: 2400, conversions: 240 },
    { month: 'Feb', views: 3000, visitors: 1398, conversions: 221 },
    { month: 'Mar', views: 2000, visitors: 9800, conversions: 229 },
    { month: 'Apr', views: 2780, visitors: 3908, conversions: 200 },
    { month: 'May', views: 1890, visitors: 4800, conversions: 218 },
    { month: 'Jun', views: 2390, visitors: 3800, conversions: 250 },
    { month: 'Jul', views: 3490, visitors: 4300, conversions: 210 },
];

export function AnalyticsCharts() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Traffic Trends</h3>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="visitors"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="conversions"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600">Page Views</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">Unique Visitors</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-gray-600">Conversions</span>
                </div>
            </div>
        </motion.div>
    );
}
