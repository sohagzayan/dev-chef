'use client';

import { motion } from 'framer-motion';
import { Award, Calendar, Lock, Star, Trophy, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BadgesSectionProps {
    badges: Array<{
        id: string;
        name: string;
        description: string;
        icon: string;
        color: string;
        isLocked: boolean;
        progress?: number;
    }>;
    totalBadges: number;
}

export default function BadgesSection({ badges, totalBadges }: BadgesSectionProps) {
    const getIconComponent = (iconName: string) => {
        switch (iconName) {
            case 'trophy':
                return Trophy;
            case 'star':
                return Star;
            case 'award':
                return Award;
            case 'zap':
                return Zap;
            case 'calendar':
                return Calendar;
            default:
                return Trophy;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <Card className="border-0 bg-white shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-orange-600">
                                <Trophy className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold text-[rgba(14,15,12,1)] sm:text-xl">
                                    Badges & Achievements
                                </CardTitle>
                                <p className="text-sm text-[rgba(106,108,106,1)]">
                                    Your accomplishments
                                </p>
                            </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-xs text-white">
                            {totalBadges} Badges
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    {badges.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                            {badges.map((badge, index) => {
                                const IconComponent = getIconComponent(badge.icon);
                                return (
                                    <motion.div
                                        key={badge.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: 0.1 * index }}
                                        className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
                                            badge.isLocked
                                                ? 'border-gray-200 bg-gray-50'
                                                : 'border-transparent bg-white shadow-md'
                                        }`}
                                    >
                                        <div className="p-3 sm:p-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full shadow-lg sm:h-12 sm:w-12 ${
                                                        badge.isLocked
                                                            ? 'bg-gray-300'
                                                            : `bg-gradient-to-r ${badge.color}`
                                                    }`}
                                                >
                                                    {badge.isLocked ? (
                                                        <Lock className="h-5 w-5 text-gray-500 sm:h-6 sm:w-6" />
                                                    ) : (
                                                        <IconComponent className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h4
                                                        className={`truncate font-semibold ${
                                                            badge.isLocked
                                                                ? 'text-gray-500'
                                                                : 'text-[rgba(14,15,12,1)]'
                                                        }`}
                                                    >
                                                        {badge.name}
                                                    </h4>
                                                    <p
                                                        className={`truncate text-sm ${
                                                            badge.isLocked
                                                                ? 'text-gray-400'
                                                                : 'text-[rgba(106,108,106,1)]'
                                                        }`}
                                                    >
                                                        {badge.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {badge.progress !== undefined && (
                                                <div className="mt-3">
                                                    <div className="mb-1 flex items-center justify-between text-xs">
                                                        <span className="text-[rgba(106,108,106,1)]">
                                                            Progress
                                                        </span>
                                                        <span className="font-medium text-[rgba(14,15,12,1)]">
                                                            {badge.progress}%
                                                        </span>
                                                    </div>
                                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-[#94f27f] to-[#79d65e] transition-all duration-300"
                                                            style={{ width: `${badge.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {badge.isLocked && (
                                            <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-8 text-center sm:py-12">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gray-100 to-gray-200 sm:h-20 sm:w-20">
                                <Trophy className="h-8 w-8 text-gray-400 sm:h-10 sm:w-10" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-[rgba(14,15,12,1)]">
                                No Badges Yet
                            </h3>
                            <p className="mb-4 text-[rgba(106,108,106,1)]">
                                Start solving problems to earn your first badge!
                            </p>
                            <Button className="bg-gradient-to-r from-[#94f27f] to-[#79d65e] text-sm text-white hover:from-[#79d65e] hover:to-[#6ac54d]">
                                <Zap className="mr-2 h-4 w-4" />
                                Start Solving
                            </Button>
                        </div>
                    )}

                    {/* Featured Badge */}
                    <div className="mt-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:mt-6 sm:p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 sm:h-10 sm:w-10">
                                <Calendar className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="truncate font-semibold text-purple-700">
                                    Aug LeetCoding Challenge
                                </h4>
                                <p className="truncate text-sm text-purple-600">
                                    Complete daily challenges to unlock this badge
                                </p>
                            </div>
                            <Badge className="flex-shrink-0 bg-purple-100 text-xs text-purple-800">
                                <Lock className="mr-1 h-3 w-3" />
                                Locked
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
