'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function LearningPathsSection() {
    const learningPaths = [
        {
            title: 'Data Structures Mastery',
            progress: 75,
            totalLessons: 24,
            completedLessons: 18,
            estimatedTime: '6 weeks',
            difficulty: 'Intermediate',
            topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Hash Tables'],
            nextLesson: 'Binary Search Trees',
            color: 'from-blue-500 to-cyan-500',
            icon: '🏗️',
        },
        {
            title: 'Algorithm Design Patterns',
            progress: 45,
            totalLessons: 32,
            completedLessons: 14,
            estimatedTime: '8 weeks',
            difficulty: 'Advanced',
            topics: ['Dynamic Programming', 'Greedy', 'Divide & Conquer', 'Backtracking'],
            nextLesson: 'Knapsack Problem',
            color: 'from-purple-500 to-pink-500',
            icon: '🧠',
        },
        {
            title: 'System Design Fundamentals',
            progress: 20,
            totalLessons: 28,
            completedLessons: 6,
            estimatedTime: '10 weeks',
            difficulty: 'Expert',
            topics: ['Scalability', 'Load Balancing', 'Databases', 'Caching', 'Microservices'],
            nextLesson: 'Database Sharding',
            color: 'from-emerald-500 to-teal-500',
            icon: '🏛️',
        },
    ];

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-3 text-4xl font-bold text-[rgba(14,15,12,1)]">
                        Personalized Learning Paths
                    </h2>
                    <p className="text-lg text-[rgba(106,108,106,1)]">
                        AI-powered curriculum tailored to your goals and skill level
                    </p>
                </motion.div>

                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {learningPaths.map((path, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="group"
                            >
                                <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all hover:shadow-xl">
                                    {/* Header */}
                                    <div
                                        className={`bg-gradient-to-br ${path.color} relative overflow-hidden p-4 text-white`}
                                    >
                                        <motion.div
                                            className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/10"
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 20,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: 'linear',
                                            }}
                                        />
                                        <div className="relative z-10 flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="text-3xl">{path.icon}</div>
                                                <div>
                                                    <h3 className="text-lg leading-tight font-bold">
                                                        {path.title}
                                                    </h3>
                                                    <p className="text-xs text-white/80">
                                                        {path.completedLessons}/{path.totalLessons}{' '}
                                                        lessons
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge className="border-white/30 bg-white/20 text-xs text-white">
                                                {path.difficulty}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        {/* Progress Section */}
                                        <div className="mb-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-xs font-medium text-[rgba(14,15,12,1)]">
                                                    Progress
                                                </span>
                                                <span className="text-xs font-bold text-[rgba(14,15,12,1)]">
                                                    {path.progress}%
                                                </span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                                <motion.div
                                                    className={`bg-gradient-to-r ${path.color} relative h-2 rounded-full`}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${path.progress}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 1.5,
                                                        delay: index * 0.2,
                                                    }}
                                                >
                                                    <motion.div
                                                        className="absolute top-0 right-0 h-full w-3 rounded-full bg-white/30"
                                                        animate={{ x: [0, 6, 0] }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Number.POSITIVE_INFINITY,
                                                        }}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
                                            <div className="rounded-lg bg-gray-50 p-2">
                                                <div className="text-[rgba(106,108,106,1)]">
                                                    Duration
                                                </div>
                                                <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                    {path.estimatedTime}
                                                </div>
                                            </div>
                                            <div className="rounded-lg bg-gray-50 p-2">
                                                <div className="text-[rgba(106,108,106,1)]">
                                                    Lessons
                                                </div>
                                                <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                    {path.completedLessons}/{path.totalLessons}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Topics */}
                                        <div className="mb-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {path.topics
                                                    .slice(0, 3)
                                                    .map((topic, topicIndex) => (
                                                        <Badge
                                                            key={topicIndex}
                                                            variant="secondary"
                                                            className="bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                                                        >
                                                            {topic}
                                                        </Badge>
                                                    ))}
                                                {path.topics.length > 3 && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                                                    >
                                                        +{path.topics.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* Next Lesson */}
                                        <div className="mb-4 rounded-lg bg-gradient-to-r from-gray-50 to-white p-3">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`h-2 w-2 bg-gradient-to-r ${path.color} rounded-full`}
                                                />
                                                <div>
                                                    <div className="text-xs text-[rgba(106,108,106,1)]">
                                                        Next Lesson
                                                    </div>
                                                    <div className="text-xs font-semibold text-[rgba(14,15,12,1)]">
                                                        {path.nextLesson}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <Button className="w-full bg-[rgb(148,242,127)] text-sm text-[rgba(0,55,32,1)] hover:bg-[rgb(148,242,127)]/80">
                                            Continue Learning
                                            <ArrowRight className="ml-2 h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
