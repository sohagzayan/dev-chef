'use client';

import { motion } from 'framer-motion';
import { Eye, MessageSquare, Star, TrendingUp, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CommunityStatsProps {
    stats: {
        views: { total: number; lastWeek: number };
        solutions: { total: number; lastWeek: number };
        discussions: { total: number; lastWeek: number };
        reputation: { total: number; lastWeek: number };
    };
}

export default function CommunityStats({ stats }: CommunityStatsProps) {
    const statItems = [
        {
            label: 'Views',
            total: stats.views.total,
            lastWeek: stats.views.lastWeek,
            icon: Eye,
            color: 'blue',
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50',
            textColor: 'text-blue-700',
            bgColor: 'bg-blue-500',
        },
        {
            label: 'Solutions',
            total: stats.solutions.total,
            lastWeek: stats.solutions.lastWeek,
            icon: Star,
            color: 'yellow',
            gradient: 'from-yellow-500 to-orange-500',
            bgGradient: 'from-yellow-50 to-orange-50',
            textColor: 'text-yellow-700',
            bgColor: 'bg-yellow-500',
        },
        {
            label: 'Discussions',
            total: stats.discussions.total,
            lastWeek: stats.discussions.lastWeek,
            icon: MessageSquare,
            color: 'green',
            gradient: 'from-[#94f27f] to-[#79d65e]',
            bgGradient: 'from-green-50 to-emerald-50',
            textColor: 'text-green-700',
            bgColor: 'bg-[#94f27f]',
        },
        {
            label: 'Reputation',
            total: stats.reputation.total,
            lastWeek: stats.reputation.lastWeek,
            icon: TrendingUp,
            color: 'purple',
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
            textColor: 'text-purple-700',
            bgColor: 'bg-purple-500',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <Card className="border-0 bg-white shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-[rgba(14,15,12,1)] sm:text-xl">
                                Community Stats
                            </CardTitle>
                            <p className="text-sm text-[rgba(106,108,106,1)]">
                                Your community engagement
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                    {statItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                                className={`rounded-lg bg-gradient-to-r ${item.bgGradient} p-3 transition-all duration-200 hover:shadow-md sm:p-4`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r sm:h-10 sm:w-10 ${item.gradient} shadow-lg`}
                                        >
                                            <IconComponent className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div
                                                className={`font-semibold ${item.textColor} truncate`}
                                            >
                                                {item.label}
                                            </div>
                                            <div className="text-sm text-[rgba(106,108,106,1)]">
                                                Last week: {item.lastWeek}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 text-right">
                                        <div className="text-xl font-bold text-[rgba(14,15,12,1)] sm:text-2xl">
                                            {item.total.toLocaleString()}
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className={`${item.bgColor} text-white hover:${item.bgColor} text-xs`}
                                        >
                                            Total
                                        </Badge>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </CardContent>
            </Card>
        </motion.div>
    );
}
