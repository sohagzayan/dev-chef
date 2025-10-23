'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
        label: string;
    };
    color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';
    children?: ReactNode;
}

const colorVariants = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    gray: 'bg-gray-50 text-gray-600 border-gray-200',
};

const trendColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
};

export function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    color = 'blue',
    children,
}: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-gray-300"
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="mb-4 flex items-center space-x-3">
                        <div className={`rounded-lg border p-3 ${colorVariants[color]}`}>
                            <Icon className="h-6 w-6" />
                        </div>
                        {trend && (
                            <div className="flex items-center space-x-1">
                                <span
                                    className={`text-sm font-medium ${trend.isPositive ? trendColors.positive : trendColors.negative}`}
                                >
                                    {trend.isPositive ? '+' : ''}
                                    {trend.value}%
                                </span>
                                <span className="text-xs text-gray-500">{trend.label}</span>
                            </div>
                        )}
                    </div>

                    <h3 className="mb-1 text-sm font-medium text-gray-600">{title}</h3>

                    <div className="flex items-baseline space-x-2">
                        <p className="text-3xl font-bold text-gray-900">{value}</p>
                        {description && <p className="text-sm text-gray-500">{description}</p>}
                    </div>
                </div>

                {children && <div className="ml-4">{children}</div>}
            </div>
        </motion.div>
    );
}
