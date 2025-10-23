'use client';

import { useState } from 'react';
import {
    BookmarkIcon,
    ChartBarIcon,
    ClockIcon,
    CloudIcon,
    CogIcon,
    CpuChipIcon,
    DatabaseIcon,
    EyeIcon,
    GlobeAltIcon,
    LightBulbIcon,
    ServerIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface SystemDesign {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    estimatedTime: string;
    tags: string[];
    isBookmarked: boolean;
    isCompleted: boolean;
    views: number;
    likes: number;
    dislikes: number;
    components: string[];
    considerations: string[];
    examples?: Array<{
        company: string;
        scale: string;
        approach: string;
    }>;
}

export default function SystemDesignPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [showCompleted, setShowCompleted] = useState(false);
    const [sortBy, setSortBy] = useState('difficulty');

    const categories = [
        'all',
        'Scalability',
        'Distributed Systems',
        'Data Storage',
        'Caching',
        'Load Balancing',
        'Message Queues',
        'Microservices',
        'Security',
        'Monitoring',
        'API Design',
        'Real-time Systems',
    ];

    const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

    const systemDesigns: SystemDesign[] = [
        {
            id: '1',
            title: 'Design a URL Shortener Service',
            description:
                'Design a service that takes long URLs and converts them into short URLs that redirect to the original URL when accessed.',
            category: 'Scalability',
            difficulty: 'Beginner',
            estimatedTime: '45 min',
            tags: ['URL Shortening', 'Hash Functions', 'Database Design', 'Caching'],
            isBookmarked: true,
            isCompleted: false,
            views: 8765,
            likes: 234,
            dislikes: 45,
            components: ['URL Generation Service', 'Database', 'Cache Layer', 'Redirect Service'],
            considerations: [
                'Hash collision handling',
                'URL validation',
                'Rate limiting',
                'Analytics tracking',
            ],
            examples: [
                {
                    company: 'Bitly',
                    scale: 'Millions of URLs per day',
                    approach: 'Custom hash algorithm with distributed database',
                },
            ],
        },
        {
            id: '2',
            title: 'Design a Chat Application',
            description:
                'Design a real-time chat application that can handle millions of users with features like group chats, file sharing, and message history.',
            category: 'Real-time Systems',
            difficulty: 'Intermediate',
            estimatedTime: '60 min',
            tags: ['WebSockets', 'Message Queues', 'Real-time', 'Scalability'],
            isBookmarked: false,
            isCompleted: true,
            views: 12340,
            likes: 456,
            dislikes: 67,
            components: [
                'WebSocket Server',
                'Message Queue',
                'Database',
                'File Storage',
                'Load Balancer',
            ],
            considerations: [
                'Message ordering',
                'Offline message handling',
                'File upload limits',
                'User presence',
            ],
            examples: [
                {
                    company: 'Slack',
                    scale: 'Millions of concurrent users',
                    approach: 'WebSocket clusters with Redis pub/sub',
                },
                {
                    company: 'Discord',
                    scale: 'Tens of millions of users',
                    approach: 'Voice channels with WebRTC and message persistence',
                },
            ],
        },
        {
            id: '3',
            title: 'Design a Social Media Feed',
            description:
                'Design a social media feed system that shows personalized content to users based on their connections and interests.',
            category: 'Scalability',
            difficulty: 'Intermediate',
            estimatedTime: '75 min',
            tags: ['Feed Generation', 'Recommendation Engine', 'Caching', 'Personalization'],
            isBookmarked: true,
            isCompleted: false,
            views: 9876,
            likes: 345,
            dislikes: 78,
            components: [
                'Feed Service',
                'Recommendation Engine',
                'Content Cache',
                'User Graph',
                'Analytics',
            ],
            considerations: [
                'Feed freshness',
                'Content ranking',
                'User engagement',
                'Ad insertion',
            ],
            examples: [
                {
                    company: 'Facebook',
                    scale: 'Billions of posts per day',
                    approach: 'EdgeRank algorithm with distributed feed generation',
                },
            ],
        },
        {
            id: '4',
            title: 'Design a Video Streaming Service',
            description:
                'Design a video streaming service like YouTube that can handle video uploads, processing, and streaming to millions of users.',
            category: 'Distributed Systems',
            difficulty: 'Advanced',
            estimatedTime: '90 min',
            tags: ['Video Processing', 'CDN', 'Load Balancing', 'Storage', 'Encoding'],
            isBookmarked: false,
            isCompleted: false,
            views: 6543,
            likes: 234,
            dislikes: 89,
            components: [
                'Upload Service',
                'Video Processor',
                'CDN',
                'Metadata Store',
                'Recommendation Engine',
            ],
            considerations: [
                'Video quality adaptation',
                'Bandwidth optimization',
                'Geographic distribution',
                'Content moderation',
            ],
            examples: [
                {
                    company: 'YouTube',
                    scale: '500+ hours uploaded per minute',
                    approach: 'Google Cloud infrastructure with adaptive bitrate streaming',
                },
            ],
        },
        {
            id: '5',
            title: 'Design a Ride-Sharing Service',
            description:
                'Design a ride-sharing service that matches drivers with passengers in real-time, handling location tracking and payment processing.',
            category: 'Real-time Systems',
            difficulty: 'Advanced',
            estimatedTime: '80 min',
            tags: ['Location Services', 'Real-time Matching', 'Payment Processing', 'GPS Tracking'],
            isBookmarked: true,
            isCompleted: false,
            views: 5432,
            likes: 198,
            dislikes: 67,
            components: [
                'Matching Service',
                'Location Service',
                'Payment Gateway',
                'Driver App',
                'Passenger App',
            ],
            considerations: [
                'Real-time location updates',
                'Driver availability',
                'Surge pricing',
                'Safety features',
            ],
            examples: [
                {
                    company: 'Uber',
                    scale: 'Millions of rides per day',
                    approach: 'Real-time matching with surge pricing algorithms',
                },
            ],
        },
        {
            id: '6',
            title: 'Design a Search Engine',
            description:
                'Design a search engine that can index billions of web pages and provide relevant search results in milliseconds.',
            category: 'Distributed Systems',
            difficulty: 'Expert',
            estimatedTime: '120 min',
            tags: [
                'Search Indexing',
                'Ranking Algorithm',
                'Distributed Storage',
                'Query Processing',
            ],
            isBookmarked: false,
            isCompleted: false,
            views: 4321,
            likes: 156,
            dislikes: 123,
            components: [
                'Web Crawler',
                'Indexer',
                'Search Service',
                'Ranking Engine',
                'Query Parser',
            ],
            considerations: [
                'Index freshness',
                'Search relevance',
                'Query performance',
                'Spam detection',
            ],
            examples: [
                {
                    company: 'Google',
                    scale: 'Billions of pages indexed',
                    approach: 'PageRank algorithm with distributed indexing',
                },
            ],
        },
        {
            id: '7',
            title: 'Design a Payment System',
            description:
                'Design a payment processing system that can handle millions of transactions securely with features like fraud detection and dispute resolution.',
            category: 'Security',
            difficulty: 'Advanced',
            estimatedTime: '100 min',
            tags: [
                'Payment Processing',
                'Fraud Detection',
                'Security',
                'Compliance',
                'Audit Logging',
            ],
            isBookmarked: true,
            isCompleted: false,
            views: 3456,
            likes: 234,
            dislikes: 89,
            components: [
                'Payment Gateway',
                'Fraud Detection Engine',
                'Compliance Service',
                'Audit Logger',
                'Dispute Handler',
            ],
            considerations: [
                'PCI compliance',
                'Fraud prevention',
                'Transaction atomicity',
                'Audit trails',
            ],
            examples: [
                {
                    company: 'Stripe',
                    scale: 'Billions of transactions',
                    approach: 'Multi-layer fraud detection with machine learning',
                },
            ],
        },
        {
            id: '8',
            title: 'Design a Distributed Cache',
            description:
                'Design a distributed caching system that can handle high read/write loads with features like consistency, eviction policies, and failover.',
            category: 'Caching',
            difficulty: 'Intermediate',
            estimatedTime: '70 min',
            tags: ['Distributed Cache', 'Consistency', 'Eviction Policies', 'Failover', 'Sharding'],
            isBookmarked: false,
            isCompleted: true,
            views: 5678,
            likes: 189,
            dislikes: 45,
            components: [
                'Cache Nodes',
                'Consistency Manager',
                'Eviction Manager',
                'Load Balancer',
                'Health Monitor',
            ],
            considerations: [
                'Cache consistency',
                'Eviction strategies',
                'Node failure handling',
                'Data distribution',
            ],
            examples: [
                {
                    company: 'Redis Cluster',
                    scale: 'Millions of operations per second',
                    approach: 'Master-slave replication with automatic failover',
                },
            ],
        },
        {
            id: '9',
            title: 'Design a Microservices Architecture',
            description:
                'Design a microservices architecture for an e-commerce platform with services for user management, product catalog, and order processing.',
            category: 'Microservices',
            difficulty: 'Advanced',
            estimatedTime: '85 min',
            tags: [
                'Service Decomposition',
                'API Gateway',
                'Service Discovery',
                'Data Consistency',
                'Monitoring',
            ],
            isBookmarked: true,
            isCompleted: false,
            views: 4567,
            likes: 267,
            dislikes: 78,
            components: [
                'API Gateway',
                'Service Registry',
                'Load Balancer',
                'Message Queue',
                'Monitoring Service',
            ],
            considerations: [
                'Service boundaries',
                'Data consistency',
                'Service communication',
                'Deployment strategies',
            ],
            examples: [
                {
                    company: 'Netflix',
                    scale: 'Hundreds of microservices',
                    approach: 'Service mesh with circuit breakers and fallbacks',
                },
            ],
        },
        {
            id: '10',
            title: 'Design a Content Delivery Network',
            description:
                'Design a CDN that can efficiently distribute content globally while minimizing latency and maximizing availability.',
            category: 'Distributed Systems',
            difficulty: 'Intermediate',
            estimatedTime: '65 min',
            tags: ['CDN', 'Edge Computing', 'Load Balancing', 'Caching', 'Geographic Distribution'],
            isBookmarked: false,
            isCompleted: false,
            views: 3987,
            likes: 145,
            dislikes: 56,
            components: [
                'Edge Servers',
                'Origin Server',
                'Load Balancer',
                'Cache Manager',
                'Analytics Service',
            ],
            considerations: [
                'Geographic distribution',
                'Cache invalidation',
                'Origin protection',
                'Traffic routing',
            ],
            examples: [
                {
                    company: 'Cloudflare',
                    scale: 'Global edge network',
                    approach: '200+ data centers with intelligent routing',
                },
            ],
        },
    ];

    const filteredDesigns = systemDesigns.filter((design) => {
        const matchesSearch =
            design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            design.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            design.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || design.category === selectedCategory;
        const matchesDifficulty =
            selectedDifficulty === 'all' || design.difficulty === selectedDifficulty;
        const matchesCompleted = showCompleted ? true : !design.isCompleted;

        return matchesSearch && matchesCategory && matchesDifficulty && matchesCompleted;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Advanced':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Expert':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const toggleBookmark = (designId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle bookmark for design:', designId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">System Design</h1>
                <p className="text-gray-600">
                    Master the art of designing scalable and reliable systems
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search system designs, topics, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <CpuChipIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
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
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                        {difficulties.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty === 'all' ? 'All Difficulties' : difficulty}
                            </option>
                        ))}
                    </select>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="difficulty">Sort by Difficulty</option>
                        <option value="views">Sort by Views</option>
                        <option value="likes">Sort by Likes</option>
                        <option value="time">Sort by Time</option>
                    </select>

                    {/* Show Completed Toggle */}
                    <label className="flex cursor-pointer items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={showCompleted}
                            onChange={(e) => setShowCompleted(e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Show Completed</span>
                    </label>
                </div>
            </div>

            {/* System Designs Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredDesigns.map((design) => (
                    <motion.div
                        key={design.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Design Header */}
                        <div className="border-b border-gray-100 p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                                        {design.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mb-3 line-clamp-3 text-sm text-gray-600">
                                        {design.description}
                                    </p>

                                    {/* Tags and Metadata */}
                                    <div className="mb-3 flex items-center space-x-2">
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(design.difficulty)}`}
                                        >
                                            {design.difficulty}
                                        </span>
                                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                            {design.category}
                                        </span>
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {design.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
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
                                        <span>{design.estimatedTime}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <EyeIcon className="h-4 w-4" />
                                        <span>{design.views}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                                        <span>{design.likes}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => toggleBookmark(design.id)}
                                        className={`rounded-lg p-2 transition-colors duration-200 ${
                                            design.isBookmarked
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'text-gray-400 hover:bg-yellow-50 hover:text-yellow-600'
                                        }`}
                                    >
                                        <BookmarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Design Content */}
                        <div className="p-6">
                            {/* Key Components */}
                            <div className="mb-4">
                                <h5 className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                    <ServerIcon className="mr-2 h-4 w-4 text-blue-500" />
                                    Key Components
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {design.components.map((component) => (
                                        <span
                                            key={component}
                                            className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                        >
                                            {component}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Key Considerations */}
                            <div className="mb-4">
                                <h5 className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                    <LightBulbIcon className="mr-2 h-4 w-4 text-yellow-500" />
                                    Key Considerations
                                </h5>
                                <div className="space-y-1">
                                    {design.considerations.map((consideration, index) => (
                                        <div key={index} className="text-sm text-gray-600">
                                            • {consideration}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Real-world Examples */}
                            {design.examples && design.examples.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                        <GlobeAltIcon className="mr-2 h-4 w-4 text-green-500" />
                                        Real-world Examples
                                    </h5>
                                    <div className="space-y-2">
                                        {design.examples.map((example, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg bg-green-50 p-3 text-sm"
                                            >
                                                <div className="mb-1 font-medium text-green-800">
                                                    {example.company}
                                                </div>
                                                <div className="text-xs text-green-700">
                                                    <div>
                                                        <strong>Scale:</strong> {example.scale}
                                                    </div>
                                                    <div>
                                                        <strong>Approach:</strong>{' '}
                                                        {example.approach}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                    Start Design
                                </button>
                                <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                    View Solution
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredDesigns.length === 0 && (
                <div className="py-12 text-center">
                    <CpuChipIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                        No system designs found
                    </h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
}
