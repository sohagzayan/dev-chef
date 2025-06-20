'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Brain, Sparkles } from 'lucide-react';
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
        <section className="bg-white py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-5xl font-bold text-[rgba(14,15,12,1)]">
                        Personalized Learning Paths
                    </h2>
                    <p className="text-xl text-[rgba(106,108,106,1)]">
                        AI-powered curriculum tailored to your goals and skill level
                    </p>
                </motion.div>

                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-8 lg:grid-cols-3">
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
                                <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
                                    {/* Header */}
                                    <div
                                        className={`bg-gradient-to-br ${path.color} relative overflow-hidden p-6 text-white`}
                                    >
                                        <motion.div
                                            className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10"
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 20,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: 'linear',
                                            }}
                                        />
                                        <div className="relative z-10">
                                            <div className="mb-4 flex items-center justify-between">
                                                <div className="text-4xl">{path.icon}</div>
                                                <Badge className="border-white/30 bg-white/20 text-white">
                                                    {path.difficulty}
                                                </Badge>
                                            </div>
                                            <h3 className="mb-2 text-2xl font-bold">
                                                {path.title}
                                            </h3>
                                            <p className="text-sm text-white/80">
                                                {path.completedLessons} of {path.totalLessons}{' '}
                                                lessons completed
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Progress Section */}
                                        <div className="mb-6">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-sm font-medium text-[rgba(14,15,12,1)]">
                                                    Overall Progress
                                                </span>
                                                <span className="text-sm font-bold text-[rgba(14,15,12,1)]">
                                                    {path.progress}%
                                                </span>
                                            </div>
                                            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                                                <motion.div
                                                    className={`bg-gradient-to-r ${path.color} relative h-3 rounded-full`}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${path.progress}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 1.5,
                                                        delay: index * 0.2,
                                                    }}
                                                >
                                                    <motion.div
                                                        className="absolute top-0 right-0 h-full w-4 rounded-full bg-white/30"
                                                        animate={{ x: [0, 8, 0] }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Number.POSITIVE_INFINITY,
                                                        }}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
                                            <div className="rounded-lg bg-gray-50 p-3">
                                                <div className="text-[rgba(106,108,106,1)]">
                                                    Duration
                                                </div>
                                                <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                    {path.estimatedTime}
                                                </div>
                                            </div>
                                            <div className="rounded-lg bg-gray-50 p-3">
                                                <div className="text-[rgba(106,108,106,1)]">
                                                    Lessons
                                                </div>
                                                <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                    {path.completedLessons}/{path.totalLessons}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Topics */}
                                        <div className="mb-6">
                                            <h4 className="mb-3 font-semibold text-[rgba(14,15,12,1)]">
                                                Key Topics
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {path.topics
                                                    .slice(0, 3)
                                                    .map((topic, topicIndex) => (
                                                        <Badge
                                                            key={topicIndex}
                                                            variant="secondary"
                                                            className="bg-gray-100 text-xs text-gray-700"
                                                        >
                                                            {topic}
                                                        </Badge>
                                                    ))}
                                                {path.topics.length > 3 && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-gray-100 text-xs text-gray-700"
                                                    >
                                                        +{path.topics.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {/* Next Lesson */}
                                        <div className="mb-6 rounded-lg bg-gradient-to-r from-gray-50 to-white p-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-3 w-3 bg-gradient-to-r ${path.color} rounded-full`}
                                                />
                                                <div>
                                                    <div className="text-xs text-[rgba(106,108,106,1)]">
                                                        Next Lesson
                                                    </div>
                                                    <div className="text-sm font-semibold text-[rgba(14,15,12,1)]">
                                                        {path.nextLesson}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <Button className="w-full bg-[rgb(148,242,127)] text-[rgba(0,55,32,1)] hover:bg-[rgb(148,242,127)]/80">
                                            Continue Learning
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* AI Recommendation Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-12"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[rgb(148,242,127)] to-[rgba(0,55,32,1)] p-8 text-white">
                            <motion.div
                                className="absolute top-0 right-0 h-40 w-40 translate-x-20 -translate-y-20 rounded-full bg-white/10"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 30,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: 'linear',
                                }}
                            />
                            <div className="relative z-10 mx-auto max-w-4xl">
                                <div className="grid items-center gap-8 md:grid-cols-2">
                                    <div>
                                        <div className="mb-4 flex items-center gap-3">
                                            <Brain className="h-8 w-8" />
                                            <Badge className="border-white/30 bg-white/20 text-white">
                                                AI-Powered
                                            </Badge>
                                        </div>
                                        <h3 className="mb-4 text-3xl font-bold">
                                            Smart Learning Recommendations
                                        </h3>
                                        <p className="mb-6 leading-relaxed opacity-90">
                                            Our AI analyzes your progress, learning style, and
                                            career goals to create a personalized curriculum that
                                            adapts as you grow. Get recommendations for the next
                                            best topics to study.
                                        </p>
                                        <Button className="bg-white text-[rgba(0,55,32,1)] hover:bg-white/90">
                                            Get My Personalized Path
                                            <Sparkles className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { skill: 'Algorithm Analysis', match: 95 },
                                            { skill: 'System Design', match: 87 },
                                            { skill: 'Database Optimization', match: 73 },
                                        ].map((rec, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: 50 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                                className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
                                            >
                                                <div className="mb-2 flex items-center justify-between">
                                                    <span className="font-semibold">
                                                        {rec.skill}
                                                    </span>
                                                    <span className="text-sm">
                                                        {rec.match}% match
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full rounded-full bg-white/20">
                                                    <motion.div
                                                        className="h-2 rounded-full bg-white"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${rec.match}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{
                                                            duration: 1,
                                                            delay: 0.8 + index * 0.1,
                                                        }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
