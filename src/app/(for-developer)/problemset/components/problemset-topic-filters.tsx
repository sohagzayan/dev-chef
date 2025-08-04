'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronsRight, Database, GitBranch, Loader2, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Topic, TopicStats } from '@/lib/api/topics';

interface ProblemsetTopicFiltersProps {
    topics: Topic[];
    topicStats: TopicStats | null;
    loading: boolean;
    selectedTopic?: string;
    selectedCategory?: string;
    onTopicChange: (topic: string) => void;
    onCategoryChange: (category: string) => void;
}

export function ProblemsetTopicFilters({
    topics,
    topicStats,
    loading,
    selectedTopic,
    selectedCategory = 'All Topics',
    onTopicChange,
    onCategoryChange,
}: ProblemsetTopicFiltersProps) {
    const [showAllTopics, setShowAllTopics] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);

    const getCategoryIcon = (type: string) => {
        switch (type) {
            case 'CORE_CS':
                return '⚙️';
            case 'SPECIALIZED':
                return Database;
            case 'LANGUAGE':
                return Terminal;
            case 'FRAMEWORK':
                return GitBranch;
            case 'TOOL':
                return '🔧';
            default:
                return '📁';
        }
    };

    // Convert topics to the format expected by the component
    const specificTopics = topics.map((topic) => ({
        name: topic.name,
        count: topic.problemCount,
    }));

    // Create categories from topic types
    const categories = [
        { name: 'All Topics', icon: '📁', color: 'bg-white text-gray-900' },
        ...(topicStats?.topicTypes.map((stat) => ({
            name: stat.type.replace('_', ' '),
            icon: getCategoryIcon(stat.type),
            color: 'bg-gray-800 text-white border border-gray-600',
        })) || []),
    ];

    const visibleTopics = showAllTopics ? specificTopics : specificTopics.slice(0, 7);
    const visibleCategories = showAllCategories ? categories : categories.slice(0, 6);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
                <span className="ml-2 text-white">Loading topics...</span>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Specific Topics Row */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap items-center gap-2"
            >
                {visibleTopics.map((topic) => (
                    <Badge
                        key={topic.name}
                        variant={selectedTopic === topic.name ? 'default' : 'secondary'}
                        className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                            selectedTopic === topic.name
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                        onClick={() => onTopicChange(topic.name)}
                    >
                        <span className="font-medium">{topic.name}</span>
                        <span className="ml-2 rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                            {topic.count.toLocaleString()}
                        </span>
                    </Badge>
                ))}

                {!showAllTopics && specificTopics.length > 7 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllTopics(true)}
                        className="flex items-center gap-1 text-gray-400 hover:text-white"
                    >
                        <span>Expand</span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                )}
            </motion.div>

            {/* Categories Row */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 overflow-x-auto pb-2"
            >
                {visibleCategories.map((category) => (
                    <Button
                        key={category.name}
                        variant="ghost"
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 hover:scale-105 ${
                            selectedCategory === category.name
                                ? 'bg-white text-gray-900 shadow-md'
                                : 'border border-gray-600 bg-gray-800/50 text-white hover:bg-gray-800'
                        }`}
                        onClick={() => onCategoryChange(category.name)}
                    >
                        {typeof category.icon === 'string' ? (
                            <span className="text-lg">{category.icon}</span>
                        ) : (
                            <category.icon className="h-4 w-4" />
                        )}
                        <span className="font-medium">{category.name}</span>
                    </Button>
                ))}

                {!showAllCategories && categories.length > 6 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllCategories(true)}
                        className="text-gray-400 hover:text-white"
                    >
                        <ChevronsRight className="h-5 w-5" />
                    </Button>
                )}
            </motion.div>
        </div>
    );
}
