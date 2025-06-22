'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { topics } from '@/data/problem-data';

interface TopicsSectionProps {
    onTopicSelect: (topicId: string) => void;
}

export function TopicsSection({ onTopicSelect }: TopicsSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...Array.from(new Set(topics.map((topic) => topic.category)))];
    const filteredTopics =
        selectedCategory === 'All'
            ? topics
            : topics.filter((topic) => topic.category === selectedCategory);

    return (
        <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
        >
            <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Master Core Technologies</h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                    Dive deep into specialized topics with curated problem sets and progressive
                    difficulty levels
                </p>
            </div>

            {/* Category Filter */}
            <div className="mb-8 flex justify-center">
                <div className="flex items-center gap-2 rounded-xl border bg-gray-50 p-2">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded-lg transition-all duration-200 ${
                                selectedCategory === category
                                    ? 'bg-white text-gray-900 shadow-md'
                                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                            }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="wait">
                    {filteredTopics.map((topic, index) => (
                        <motion.div
                            key={topic.id}
                            initial={{ y: 30, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -30, opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Card
                                className="topic-card group h-full cursor-pointer"
                                onClick={() => onTopicSelect(topic.id)}
                            >
                                <CardContent className="flex h-full flex-col p-6">
                                    <div className="mb-4 flex items-start justify-between">
                                        <div
                                            className={`h-14 w-14 bg-gradient-to-br ${topic.color} flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-110`}
                                        >
                                            <topic.icon className="h-7 w-7 text-white" />
                                        </div>
                                        <Badge className="border-gray-200 bg-gray-50 text-xs text-gray-600">
                                            {topic.difficulty}
                                        </Badge>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                            {topic.name}
                                        </h3>
                                        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                            {topic.description}
                                        </p>

                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <BookOpen className="h-4 w-4" />
                                                <span>{topic.problems} problems</span>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className="bg-blue-50 text-xs text-blue-700"
                                            >
                                                {topic.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                                        <span className="text-sm font-medium text-gray-700">
                                            Start Learning
                                        </span>
                                        <ChevronRight className="h-5 w-5 text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-600" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.section>
    );
}
