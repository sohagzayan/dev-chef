'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, MessageSquare, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RecentActivityProps {
    activities: Array<{
        id: string;
        type: 'accepted' | 'attempted' | 'discussion' | 'solution';
        title: string;
        timestamp: string;
        difficulty?: 'easy' | 'medium' | 'hard';
        language?: string;
    }>;
}

export default function RecentActivity({ activities }: RecentActivityProps) {
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'accepted':
                return CheckCircle;
            case 'attempted':
                return Clock;
            case 'discussion':
                return MessageSquare;
            case 'solution':
                return Star;
            default:
                return CheckCircle;
        }
    };

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'accepted':
                return 'text-[#94f27f] bg-green-100';
            case 'attempted':
                return 'text-yellow-600 bg-yellow-100';
            case 'discussion':
                return 'text-blue-600 bg-blue-100';
            case 'solution':
                return 'text-purple-600 bg-purple-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getDifficultyColor = (difficulty?: string) => {
        switch (difficulty) {
            case 'easy':
                return 'text-[#94f27f] bg-green-50 border-green-200';
            case 'medium':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'hard':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const formatTimeAgo = (timestamp: string) => {
        const now = new Date();
        const activityTime = new Date(timestamp);
        const diffInHours = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;

        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;

        return activityTime.toLocaleDateString();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <Card className="border-0 bg-white shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
                                <Star className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold text-[rgba(14,15,12,1)] sm:text-xl">
                                    Recent Activity
                                </CardTitle>
                                <p className="text-sm text-[rgba(106,108,106,1)]">
                                    Your latest submissions and contributions
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-sm hover:bg-gray-100">
                            View all submissions
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <Tabs defaultValue="recent" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                            <TabsTrigger
                                value="recent"
                                className="text-xs data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm sm:text-sm"
                            >
                                Recent AC
                            </TabsTrigger>
                            <TabsTrigger
                                value="list"
                                className="text-xs data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm sm:text-sm"
                            >
                                List
                            </TabsTrigger>
                            <TabsTrigger
                                value="solutions"
                                className="text-xs data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm sm:text-sm"
                            >
                                Solutions
                            </TabsTrigger>
                            <TabsTrigger
                                value="discuss"
                                className="text-xs data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm sm:text-sm"
                            >
                                Discuss
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="recent" className="mt-4 sm:mt-6">
                            <div className="space-y-3 sm:space-y-4">
                                {activities
                                    .filter((activity) => activity.type === 'accepted')
                                    .slice(0, 5)
                                    .map((activity, index) => {
                                        const IconComponent = getActivityIcon(activity.type);
                                        return (
                                            <motion.div
                                                key={activity.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: 0.1 * index }}
                                                className="group rounded-lg border border-gray-200 bg-white p-3 transition-all duration-200 hover:border-indigo-200 hover:shadow-md sm:p-4"
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="flex min-w-0 flex-1 items-center gap-3">
                                                        <div
                                                            className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-10 sm:w-10 ${getActivityColor(activity.type)} flex-shrink-0`}
                                                        >
                                                            <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="mb-1 flex items-center gap-2">
                                                                <h4 className="truncate font-semibold text-[rgba(14,15,12,1)] transition-colors group-hover:text-indigo-600">
                                                                    {activity.title}
                                                                </h4>
                                                                {activity.difficulty && (
                                                                    <Badge
                                                                        variant="outline"
                                                                        className={`text-xs ${getDifficultyColor(activity.difficulty)} flex-shrink-0`}
                                                                    >
                                                                        {activity.difficulty}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-3 text-sm text-[rgba(106,108,106,1)]">
                                                                {activity.language && (
                                                                    <span className="flex items-center gap-1">
                                                                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                                                        <span className="truncate">
                                                                            {activity.language}
                                                                        </span>
                                                                    </span>
                                                                )}
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="h-3 w-3" />
                                                                    <span className="truncate">
                                                                        {formatTimeAgo(
                                                                            activity.timestamp,
                                                                        )}
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-shrink-0 items-center gap-2">
                                                        <Badge className="bg-[#94f27f] text-xs text-white hover:bg-[#79d65e]">
                                                            Accepted
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}

                                {activities.filter((activity) => activity.type === 'accepted')
                                    .length === 0 && (
                                    <div className="py-8 text-center">
                                        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                            <CheckCircle className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold text-[rgba(14,15,12,1)]">
                                            No Recent Submissions
                                        </h3>
                                        <p className="text-[rgba(106,108,106,1)]">
                                            Start solving problems to see your recent activity here!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="list" className="mt-4 sm:mt-6">
                            <div className="py-8 text-center text-[rgba(106,108,106,1)]">
                                <p>Problem list view coming soon...</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="solutions" className="mt-4 sm:mt-6">
                            <div className="py-8 text-center text-[rgba(106,108,106,1)]">
                                <p>Solutions view coming soon...</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="discuss" className="mt-4 sm:mt-6">
                            <div className="py-8 text-center text-[rgba(106,108,106,1)]">
                                <p>Discussion view coming soon...</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </motion.div>
    );
}
