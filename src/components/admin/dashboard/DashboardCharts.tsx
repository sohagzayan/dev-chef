'use client';

import { motion } from 'framer-motion';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const monthlyData = [
    { month: 'Jan', revenue: 65, profit: 28, expenses: 37 },
    { month: 'Feb', revenue: 59, profit: 48, expenses: 11 },
    { month: 'Mar', revenue: 80, profit: 40, expenses: 40 },
    { month: 'Apr', revenue: 81, profit: 19, expenses: 62 },
    { month: 'May', revenue: 56, profit: 96, expenses: -40 },
    { month: 'Jun', revenue: 55, profit: 27, expenses: 28 },
    { month: 'Jul', revenue: 40, profit: 39, expenses: 1 },
    { month: 'Aug', revenue: 45, profit: 48, expenses: -3 },
    { month: 'Sep', revenue: 32, profit: 38, expenses: -6 },
    { month: 'Oct', revenue: 35, profit: 23, expenses: 12 },
    { month: 'Nov', revenue: 30, profit: 34, expenses: -4 },
    { month: 'Dec', revenue: 25, profit: 29, expenses: -4 },
];

const weeklyData = [
    { day: 'Sun', activity: 400 },
    { day: 'Mon', activity: 300 },
    { day: 'Tue', activity: 200 },
    { day: 'Wed', activity: 278 },
    { day: 'Thu', activity: 189 },
    { day: 'Fri', activity: 239 },
    { day: 'Sat', activity: 349 },
];

export function DashboardCharts() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
        >
            {/* Revenue Chart */}
            <motion.div
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-gray-600">Revenue</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-gray-600">Profit</span>
                        </div>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
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
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stackId="1"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.3}
                        />
                        <Area
                            type="monotone"
                            dataKey="profit"
                            stackId="1"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Weekly Activity Chart */}
            <motion.div
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Weekly Activity</h3>
                    <motion.button
                        className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        More Detail →
                    </motion.button>
                </div>

                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                            }}
                        />
                        <Bar dataKey="activity" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </motion.div>
    );
}
