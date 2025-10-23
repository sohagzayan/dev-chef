'use client';

import { useState } from 'react';
import {
    BookmarkIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    ClockIcon,
    EyeIcon,
    LightBulbIcon,
    QuestionMarkCircleIcon,
    StarIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface InterviewQuestion {
    id: string;
    question: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    type: 'Technical' | 'Behavioral' | 'System Design' | 'Problem Solving';
    estimatedTime: string;
    tags: string[];
    isBookmarked: boolean;
    isAnswered: boolean;
    views: number;
    likes: number;
    dislikes: number;
    answer?: string;
    hints?: string[];
}

export default function InterviewQuestionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [showAnswered, setShowAnswered] = useState(false);
    const [sortBy, setSortBy] = useState('difficulty');

    const categories = [
        'all',
        'Data Structures',
        'Algorithms',
        'System Design',
        'Database',
        'Frontend',
        'Backend',
        'DevOps',
        'Machine Learning',
        'Behavioral',
        'Leadership',
    ];

    const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
    const types = ['all', 'Technical', 'Behavioral', 'System Design', 'Problem Solving'];

    const interviewQuestions: InterviewQuestion[] = [
        {
            id: '1',
            question:
                'Implement a function to find the longest common subsequence between two strings.',
            category: 'Algorithms',
            difficulty: 'Medium',
            type: 'Technical',
            estimatedTime: '15 min',
            tags: ['Dynamic Programming', 'Strings', 'LCS'],
            isBookmarked: true,
            isAnswered: false,
            views: 1247,
            likes: 89,
            dislikes: 12,
            hints: [
                'Think about using a 2D array to store intermediate results',
                "Consider the case when characters match vs when they don't match",
                'The solution has O(m*n) time complexity where m and n are string lengths',
            ],
        },
        {
            id: '2',
            question: 'Design a scalable chat application that can handle millions of users.',
            category: 'System Design',
            difficulty: 'Hard',
            type: 'System Design',
            estimatedTime: '45 min',
            tags: ['Scalability', 'Real-time', 'WebSockets', 'Load Balancing'],
            isBookmarked: false,
            isAnswered: true,
            views: 2156,
            likes: 156,
            dislikes: 23,
            answer: 'A scalable chat application requires several key components: 1) WebSocket connections for real-time communication, 2) Message queues (like Redis or RabbitMQ) for handling high message volumes, 3) Horizontal scaling with load balancers, 4) Database sharding for user data, 5) CDN for media content, 6) Caching layers for frequently accessed data.',
        },
        {
            id: '3',
            question: 'Tell me about a time when you had to work with a difficult team member.',
            category: 'Behavioral',
            difficulty: 'Medium',
            type: 'Behavioral',
            estimatedTime: '10 min',
            tags: ['Teamwork', 'Conflict Resolution', 'Communication'],
            isBookmarked: true,
            isAnswered: false,
            views: 892,
            likes: 67,
            dislikes: 8,
        },
        {
            id: '4',
            question: 'How would you optimize a slow database query?',
            category: 'Database',
            difficulty: 'Medium',
            type: 'Technical',
            estimatedTime: '20 min',
            tags: ['Database', 'Performance', 'Indexing', 'Query Optimization'],
            isBookmarked: false,
            isAnswered: true,
            views: 1432,
            likes: 98,
            dislikes: 15,
            answer: 'Database query optimization involves: 1) Adding appropriate indexes on frequently queried columns, 2) Analyzing query execution plans, 3) Rewriting queries to avoid table scans, 4) Using database-specific optimizations, 5) Implementing query result caching, 6) Normalizing/denormalizing tables based on usage patterns.',
        },
        {
            id: '5',
            question:
                'Implement a stack data structure with O(1) push, pop, and getMin operations.',
            category: 'Data Structures',
            difficulty: 'Hard',
            type: 'Technical',
            estimatedTime: '25 min',
            tags: ['Stack', 'Data Structures', 'Optimization'],
            isBookmarked: true,
            isAnswered: false,
            views: 987,
            likes: 76,
            dislikes: 9,
            hints: [
                "You'll need to use two stacks",
                'One stack stores the actual elements',
                'The other stack keeps track of minimum values',
            ],
        },
        {
            id: '6',
            question: 'How do you handle state management in a large React application?',
            category: 'Frontend',
            difficulty: 'Medium',
            type: 'Technical',
            estimatedTime: '20 min',
            tags: ['React', 'State Management', 'Redux', 'Context API'],
            isBookmarked: false,
            isAnswered: true,
            views: 1678,
            likes: 112,
            dislikes: 18,
            answer: 'For large React applications, I use a combination of: 1) Local component state for UI-specific state, 2) Context API for theme/auth state, 3) Redux Toolkit for complex application state, 4) React Query for server state management, 5) Local storage for persistence, 6) State normalization to avoid duplication.',
        },
        {
            id: '7',
            question: 'Explain the difference between horizontal and vertical scaling.',
            category: 'System Design',
            difficulty: 'Easy',
            type: 'Technical',
            estimatedTime: '10 min',
            tags: ['Scalability', 'Architecture', 'Infrastructure'],
            isBookmarked: false,
            isAnswered: false,
            views: 654,
            likes: 45,
            dislikes: 5,
        },
        {
            id: '8',
            question: 'How would you implement a rate limiter for an API?',
            category: 'Backend',
            difficulty: 'Hard',
            type: 'Technical',
            estimatedTime: '30 min',
            tags: ['API Design', 'Rate Limiting', 'Redis', 'Algorithms'],
            isBookmarked: true,
            isAnswered: false,
            views: 1123,
            likes: 89,
            dislikes: 14,
            hints: [
                'Consider using a sliding window approach',
                'Redis can help with distributed rate limiting',
                'Think about different rate limiting algorithms: fixed window, sliding window, token bucket',
            ],
        },
        {
            id: '9',
            question: 'Describe your approach to code review.',
            category: 'Behavioral',
            difficulty: 'Easy',
            type: 'Behavioral',
            estimatedTime: '15 min',
            tags: ['Code Review', 'Best Practices', 'Team Process'],
            isBookmarked: false,
            isAnswered: false,
            views: 456,
            likes: 34,
            dislikes: 3,
        },
        {
            id: '10',
            question: 'How do you ensure code quality in a team environment?',
            category: 'Leadership',
            difficulty: 'Medium',
            type: 'Behavioral',
            estimatedTime: '20 min',
            tags: ['Leadership', 'Code Quality', 'Team Management', 'Process'],
            isBookmarked: true,
            isAnswered: false,
            views: 789,
            likes: 56,
            dislikes: 7,
        },
    ];

    const filteredQuestions = interviewQuestions.filter((question) => {
        const matchesSearch =
            question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
            selectedCategory === 'all' || question.category === selectedCategory;
        const matchesDifficulty =
            selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
        const matchesType = selectedType === 'all' || question.type === selectedType;
        const matchesAnswered = showAnswered ? true : !question.isAnswered;

        return (
            matchesSearch && matchesCategory && matchesDifficulty && matchesType && matchesAnswered
        );
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Hard':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Technical':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Behavioral':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'System Design':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Problem Solving':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const toggleBookmark = (questionId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle bookmark for question:', questionId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Interview Questions</h1>
                <p className="text-gray-600">
                    Practice with curated questions from top tech companies
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search questions, topics, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>

                    {/* Difficulty Filter */}
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    >
                        {difficulties.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty === 'all' ? 'All Difficulties' : difficulty}
                            </option>
                        ))}
                    </select>

                    {/* Type Filter */}
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    >
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type === 'all' ? 'All Types' : type}
                            </option>
                        ))}
                    </select>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    >
                        <option value="difficulty">Sort by Difficulty</option>
                        <option value="views">Sort by Views</option>
                        <option value="likes">Sort by Likes</option>
                        <option value="time">Sort by Time</option>
                    </select>

                    {/* Show Answered Toggle */}
                    <label className="flex cursor-pointer items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={showAnswered}
                            onChange={(e) => setShowAnswered(e.target.checked)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">Show Answered</span>
                    </label>
                </div>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredQuestions.map((question) => (
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Question Header */}
                        <div className="border-b border-gray-100 p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-3 line-clamp-3 text-lg font-semibold text-gray-900">
                                        {question.question}
                                    </h3>

                                    {/* Tags and Metadata */}
                                    <div className="mb-3 flex items-center space-x-2">
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(question.difficulty)}`}
                                        >
                                            {question.difficulty}
                                        </span>
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getTypeColor(question.type)}`}
                                        >
                                            {question.type}
                                        </span>
                                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                            {question.category}
                                        </span>
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {question.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md bg-green-50 px-2 py-1 text-xs text-green-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Stats and Actions */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <ClockIcon className="h-4 w-4" />
                                        <span>{question.estimatedTime}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <EyeIcon className="h-4 w-4" />
                                        <span>{question.views}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                                        <span>{question.likes}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => toggleBookmark(question.id)}
                                        className={`rounded-lg p-2 transition-colors duration-200 ${
                                            question.isBookmarked
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'text-gray-400 hover:bg-yellow-50 hover:text-yellow-600'
                                        }`}
                                    >
                                        <BookmarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Question Content */}
                        <div className="p-6">
                            {/* Hints (if available) */}
                            {question.hints && question.hints.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                        <LightBulbIcon className="mr-2 h-4 w-4 text-yellow-500" />
                                        Hints
                                    </h5>
                                    <div className="space-y-2">
                                        {question.hints.map((hint, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg bg-yellow-50 p-3 text-sm text-gray-600"
                                            >
                                                {index + 1}. {hint}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Answer (if available) */}
                            {question.answer && (
                                <div className="mb-4">
                                    <h5 className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                        <CheckCircleIcon className="mr-2 h-4 w-4 text-green-500" />
                                        Answer
                                    </h5>
                                    <div className="rounded-lg bg-green-50 p-3 text-sm text-gray-700">
                                        {question.answer}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button className="flex-1 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-green-700">
                                    Practice Now
                                </button>
                                <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                    View Discussion
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredQuestions.length === 0 && (
                <div className="py-12 text-center">
                    <QuestionMarkCircleIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No questions found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
}
