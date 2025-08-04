'use client';

import { motion } from 'framer-motion';
import { Crown, Edit3, Star, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

interface ProfileHeaderProps {
    rank: string;
    badges: number;
    reputation: number;
}

export default function ProfileHeader({ rank, badges, reputation }: ProfileHeaderProps) {
    const { user } = useAuth();

    // Truncate email if too long
    const truncateEmail = (email: string) => {
        if (email.length > 20) {
            return email.substring(0, 17) + '...';
        }
        return email;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <Card className="overflow-hidden border-0 bg-white shadow-lg">
                <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col items-center text-center">
                        {/* Avatar with enhanced styling */}
                        <div className="relative mb-6">
                            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#94f27f] to-[#79d65e] opacity-20 blur-sm"></div>
                            <Avatar className="relative h-24 w-24 border-4 border-white shadow-xl sm:h-28 sm:w-28">
                                <AvatarImage
                                    src="/placeholder.svg"
                                    alt={user?.name || 'User'}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-gradient-to-br from-[#94f27f] to-[#79d65e] text-2xl font-bold text-white sm:text-3xl">
                                    {user?.name?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 sm:-right-2 sm:-bottom-2 sm:h-8 sm:w-8">
                                <Crown className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="mb-6 w-full">
                            <h1 className="mb-3 text-xl font-bold break-words text-[rgba(14,15,12,1)] sm:text-2xl lg:text-3xl">
                                {user?.name || truncateEmail(user?.email || '')}
                            </h1>
                            <div className="flex flex-col items-center justify-center gap-2 text-sm text-[rgba(106,108,106,1)] sm:flex-row sm:gap-4">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    <span className="whitespace-nowrap">Rank ~{rank}</span>
                                </div>
                                <div className="hidden h-4 w-px bg-gray-300 sm:block"></div>
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="h-4 w-4 text-[#94f27f]" />
                                    <span className="whitespace-nowrap">
                                        {reputation} Reputation
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="mb-6 grid w-full max-w-xs grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-xl font-bold text-blue-600 sm:text-2xl">
                                    {badges}
                                </div>
                                <div className="text-xs text-[rgba(106,108,106,1)]">Badges</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-[#94f27f] sm:text-2xl">
                                    1
                                </div>
                                <div className="text-xs text-[rgba(106,108,106,1)]">Problems</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-purple-600 sm:text-2xl">
                                    2
                                </div>
                                <div className="text-xs text-[rgba(106,108,106,1)]">
                                    Days Active
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex w-full max-w-xs flex-col gap-3 sm:flex-row">
                            <Button className="bg-gradient-to-r from-[#94f27f] to-[#79d65e] text-sm text-white shadow-lg transition-all duration-200 hover:from-[#79d65e] hover:to-[#6ac54d] hover:shadow-xl">
                                <Edit3 className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                            <Button
                                variant="outline"
                                className="border-gray-300 text-sm hover:bg-gray-50"
                            >
                                <Star className="mr-2 h-4 w-4" />
                                View Badges
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
