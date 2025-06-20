'use client';

import { motion } from 'framer-motion';
import { Shield, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function AchievementsSection() {
    const achievements = [
        {
            title: 'First Steps',
            description: 'Completed your first algorithm',
            icon: '🚀',
            progress: 100,
            level: 'Beginner',
            points: 50,
            gradient: 'from-blue-400 to-blue-600',
            unlocked: true,
        },
        {
            title: 'Problem Solver',
            description: 'Solved 25 coding challenges',
            icon: '🧩',
            progress: 68,
            level: 'Intermediate',
            points: 150,
            gradient: 'from-purple-400 to-purple-600',
            unlocked: true,
        },
        {
            title: 'Speed Demon',
            description: 'Achieved top 10% in contest speed',
            icon: '⚡',
            progress: 92,
            level: 'Advanced',
            points: 300,
            gradient: 'from-yellow-400 to-orange-500',
            unlocked: true,
        },
        {
            title: 'Mentor',
            description: 'Helped 10+ community members',
            icon: '🎓',
            progress: 45,
            level: 'Expert',
            points: 500,
            gradient: 'from-green-400 to-emerald-600',
            unlocked: false,
        },
    ];

    return (
        <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-5xl font-bold text-[rgba(14,15,12,1)]">
                        Your Coding Journey
                    </h2>
                    <p className="text-xl text-[rgba(106,108,106,1)]">
                        Level up your skills and unlock achievements
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative"
                        >
                            <div
                                className={`bg-gradient-to-br ${achievement.gradient} rounded-2xl p-[1px] ${
                                    !achievement.unlocked ? 'opacity-60' : ''
                                }`}
                            >
                                <div className="relative h-full overflow-hidden rounded-2xl bg-white p-6">
                                    {/* Background Pattern */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-current" />
                                    </div>

                                    {/* Lock Overlay for Locked Achievements */}
                                    {!achievement.unlocked && (
                                        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
                                            <div className="text-center">
                                                <Shield className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                                <p className="text-sm font-medium text-gray-500">
                                                    Locked
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative z-10">
                                        {/* Achievement Icon */}
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="text-4xl">{achievement.icon}</div>
                                            <Badge
                                                className={`bg-gradient-to-r ${achievement.gradient} border-0 text-white`}
                                                variant="secondary"
                                            >
                                                {achievement.level}
                                            </Badge>
                                        </div>

                                        {/* Achievement Info */}
                                        <h3 className="mb-2 text-lg font-bold text-[rgba(14,15,12,1)]">
                                            {achievement.title}
                                        </h3>
                                        <p className="mb-4 text-sm text-[rgba(106,108,106,1)]">
                                            {achievement.description}
                                        </p>

                                        {/* Progress Section */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-[rgba(14,15,12,1)]">
                                                    Progress
                                                </span>
                                                <span className="text-sm font-bold text-[rgba(14,15,12,1)]">
                                                    {achievement.progress}%
                                                </span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                                <motion.div
                                                    className={`bg-gradient-to-r ${achievement.gradient} relative h-2 rounded-full`}
                                                    initial={{ width: 0 }}
                                                    whileInView={{
                                                        width: `${achievement.progress}%`,
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 1.5,
                                                        delay: index * 0.2,
                                                    }}
                                                >
                                                    {achievement.progress > 50 && (
                                                        <motion.div
                                                            className="absolute top-0 right-0 h-full w-4 rounded-full bg-white/30"
                                                            animate={{ x: [0, 8, 0] }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Number.POSITIVE_INFINITY,
                                                            }}
                                                        />
                                                    )}
                                                </motion.div>
                                            </div>

                                            {/* Points */}
                                            <div className="flex items-center justify-between pt-2">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                                                    <span className="text-sm font-medium text-[rgba(14,15,12,1)]">
                                                        {achievement.points} pts
                                                    </span>
                                                </div>
                                                {achievement.unlocked &&
                                                    achievement.progress === 100 && (
                                                        <Badge className="bg-green-100 text-xs text-green-800">
                                                            Completed
                                                        </Badge>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
