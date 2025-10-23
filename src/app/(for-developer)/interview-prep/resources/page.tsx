'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    BookmarkIcon,
    BookOpenIcon,
    ClockIcon,
    DocumentTextIcon,
    DownloadIcon,
    ExternalLinkIcon,
    EyeIcon,
    GlobeAltIcon,
    HeartIcon,
    PlayIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Resource {
    id: string;
    title: string;
    description: string;
    type: 'Book' | 'Website' | 'Video' | 'Document' | 'Course' | 'Tool';
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    rating: number;
    reviews: number;
    isBookmarked: boolean;
    isFree: boolean;
    price?: number;
    url?: string;
    author?: string;
    publisher?: string;
    duration?: string;
    tags: string[];
    features: string[];
}

export default function ResourcesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [showFreeOnly, setShowFreeOnly] = useState(false);
    const [sortBy, setSortBy] = useState('rating');

    const types = ['all', 'Book', 'Website', 'Video', 'Document', 'Course', 'Tool'];
    const categories = [
        'all',
        'Technical Skills',
        'System Design',
        'Behavioral',
        'Data Structures',
        'Algorithms',
        'Interview Practice',
        'Career Development',
        'Resume Building',
        'Networking',
    ];
    const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

    const resources: Resource[] = [
        {
            id: '1',
            title: 'Cracking the Coding Interview',
            description:
                'The definitive guide to technical interviews with 189 programming questions and solutions.',
            type: 'Book',
            category: 'Interview Practice',
            difficulty: 'Intermediate',
            rating: 4.8,
            reviews: 15420,
            isBookmarked: true,
            isFree: false,
            price: 29.99,
            author: 'Gayle Laakmann McDowell',
            publisher: 'CareerCup',
            tags: ['Coding Interview', 'Programming', 'Problem Solving', 'Technical Skills'],
            features: [
                '189 programming questions',
                'Step-by-step solutions',
                'Interview tips',
                'Company-specific advice',
            ],
        },
        {
            id: '2',
            title: 'System Design Interview',
            description:
                "An insider's guide to system design interviews with real-world examples and case studies.",
            type: 'Book',
            category: 'System Design',
            difficulty: 'Advanced',
            rating: 4.7,
            reviews: 8920,
            isBookmarked: false,
            isFree: false,
            price: 39.99,
            author: 'Alex Xu',
            publisher: 'System Design Interview',
            tags: ['System Design', 'Architecture', 'Scalability', 'Distributed Systems'],
            features: [
                'Real-world case studies',
                'Step-by-step design process',
                'Scalability patterns',
                'Interview questions',
            ],
        },
        {
            id: '3',
            title: 'LeetCode',
            description:
                "The world's leading platform for technical interview preparation with 2000+ coding problems.",
            type: 'Website',
            category: 'Interview Practice',
            difficulty: 'Intermediate',
            rating: 4.6,
            reviews: 45600,
            isBookmarked: true,
            isFree: false,
            price: 35.0,
            url: 'https://leetcode.com',
            tags: ['Coding Problems', 'Practice', 'Competitions', 'Company Questions'],
            features: [
                '2000+ coding problems',
                'Company-specific questions',
                'Discussion forums',
                'Progress tracking',
            ],
        },
        {
            id: '4',
            title: 'HackerRank',
            description:
                'Practice coding skills with challenges, tutorials, and interview preparation resources.',
            type: 'Website',
            category: 'Technical Skills',
            difficulty: 'Beginner',
            rating: 4.5,
            reviews: 23400,
            isBookmarked: false,
            isFree: true,
            tags: ['Coding Challenges', 'Tutorials', 'Skill Assessment', 'Practice'],
            features: [
                'Free coding challenges',
                'Skill assessments',
                'Tutorials',
                'Company challenges',
            ],
        },
        {
            id: '5',
            title: 'Grokking the System Design Interview',
            description:
                'Comprehensive course covering system design concepts with hands-on practice.',
            type: 'Course',
            category: 'System Design',
            difficulty: 'Advanced',
            rating: 4.9,
            reviews: 12340,
            isBookmarked: true,
            isFree: false,
            price: 79.0,
            duration: '16 hours',
            tags: ['System Design', 'Course', 'Hands-on Practice', 'Interview Prep'],
            features: [
                '16 hours of content',
                'Hands-on exercises',
                'Real-world examples',
                'Interview practice',
            ],
        },
        {
            id: '6',
            title: 'Behavioral Interview Questions Guide',
            description:
                'Comprehensive guide to behavioral interview questions with STAR method examples.',
            type: 'Document',
            category: 'Behavioral',
            difficulty: 'Beginner',
            rating: 4.4,
            reviews: 5670,
            isBookmarked: false,
            isFree: true,
            tags: ['Behavioral Questions', 'STAR Method', 'Interview Prep', 'Soft Skills'],
            features: [
                '100+ questions',
                'STAR method examples',
                'Answer templates',
                'Common mistakes',
            ],
        },
        {
            id: '7',
            title: 'Introduction to Algorithms',
            description:
                'The classic textbook on algorithms and data structures used in computer science education.',
            type: 'Book',
            category: 'Algorithms',
            difficulty: 'Advanced',
            rating: 4.8,
            reviews: 18760,
            isBookmarked: true,
            isFree: false,
            price: 89.99,
            author: 'Thomas H. Cormen',
            publisher: 'MIT Press',
            tags: ['Algorithms', 'Data Structures', 'Computer Science', 'Textbook'],
            features: [
                'Comprehensive coverage',
                'Mathematical rigor',
                'Pseudocode examples',
                'Exercises',
            ],
        },
        {
            id: '8',
            title: 'System Design Primer',
            description: 'Open-source collection of resources for learning system design concepts.',
            type: 'Website',
            category: 'System Design',
            difficulty: 'Intermediate',
            rating: 4.7,
            reviews: 15600,
            isBookmarked: false,
            isFree: true,
            url: 'https://github.com/donnemartin/system-design-primer',
            tags: ['System Design', 'Open Source', 'GitHub', 'Learning Resources'],
            features: [
                'Free access',
                'Comprehensive content',
                'Community contributions',
                'Regular updates',
            ],
        },
        {
            id: '9',
            title: 'InterviewBit',
            description:
                'Platform for interview preparation with company-specific questions and solutions.',
            type: 'Website',
            category: 'Interview Practice',
            difficulty: 'Intermediate',
            rating: 4.5,
            reviews: 8900,
            isBookmarked: true,
            isFree: false,
            price: 25.0,
            url: 'https://interviewbit.com',
            tags: ['Interview Prep', 'Company Questions', 'Practice Problems', 'Solutions'],
            features: [
                'Company-specific questions',
                'Video solutions',
                'Practice problems',
                'Progress tracking',
            ],
        },
        {
            id: '10',
            title: 'Resume Builder Tool',
            description: 'Professional resume builder with ATS-friendly templates and expert tips.',
            type: 'Tool',
            category: 'Resume Building',
            difficulty: 'Beginner',
            rating: 4.6,
            reviews: 12300,
            isBookmarked: false,
            isFree: false,
            price: 15.0,
            tags: ['Resume Builder', 'ATS Friendly', 'Templates', 'Career Tools'],
            features: [
                'ATS-friendly templates',
                'Expert tips',
                'Multiple formats',
                'Export options',
            ],
        },
        {
            id: '11',
            title: 'Data Structures and Algorithms in Python',
            description:
                'Comprehensive course covering fundamental data structures and algorithms.',
            type: 'Course',
            category: 'Data Structures',
            difficulty: 'Intermediate',
            rating: 4.8,
            reviews: 9870,
            isBookmarked: true,
            isFree: false,
            price: 49.0,
            duration: '12 hours',
            tags: ['Data Structures', 'Algorithms', 'Python', 'Course'],
            features: [
                '12 hours of content',
                'Python implementation',
                'Practice exercises',
                'Certificate',
            ],
        },
        {
            id: '12',
            title: 'Mock Interview Platform',
            description: 'Practice interviews with AI-powered feedback and real-time scoring.',
            type: 'Tool',
            category: 'Interview Practice',
            difficulty: 'Beginner',
            rating: 4.4,
            reviews: 6540,
            isBookmarked: false,
            isFree: false,
            price: 19.99,
            tags: ['Mock Interviews', 'AI Feedback', 'Practice', 'Scoring'],
            features: [
                'AI-powered feedback',
                'Real-time scoring',
                'Interview scenarios',
                'Progress tracking',
            ],
        },
    ];

    const filteredResources = resources.filter((resource) => {
        const matchesSearch =
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesType = selectedType === 'all' || resource.type === selectedType;
        const matchesCategory =
            selectedCategory === 'all' || resource.category === selectedCategory;
        const matchesDifficulty =
            selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
        const matchesFree = showFreeOnly ? resource.isFree : true;

        return matchesSearch && matchesType && matchesCategory && matchesDifficulty && matchesFree;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Advanced':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Book':
                return <BookOpenIcon className="h-5 w-5" />;
            case 'Website':
                return <GlobeAltIcon className="h-5 w-5" />;
            case 'Video':
                return <PlayIcon className="h-5 w-5" />;
            case 'Document':
                return <DocumentTextIcon className="h-5 w-5" />;
            case 'Course':
                return <AcademicCapIcon className="h-5 w-5" />;
            case 'Tool':
                return <DownloadIcon className="h-5 w-5" />;
            default:
                return <DocumentTextIcon className="h-5 w-5" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Book':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Website':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Video':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Document':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'Course':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Tool':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const toggleBookmark = (resourceId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle bookmark for resource:', resourceId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Interview Prep Resources</h1>
                <p className="text-gray-600">
                    Curated collection of books, courses, tools, and websites to ace your interviews
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search resources, topics, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <BookOpenIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    {/* Type Filter */}
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                    >
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type === 'all' ? 'All Types' : type}
                            </option>
                        ))}
                    </select>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
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
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
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
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="rating">Sort by Rating</option>
                        <option value="reviews">Sort by Reviews</option>
                        <option value="price">Sort by Price</option>
                        <option value="title">Sort by Title</option>
                    </select>

                    {/* Free Only Toggle */}
                    <label className="flex cursor-pointer items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={showFreeOnly}
                            onChange={(e) => setShowFreeOnly(e.target.checked)}
                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700">Free Only</span>
                    </label>
                </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredResources.map((resource) => (
                    <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Resource Header */}
                        <div className="border-b border-gray-100 p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                                        {resource.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                                        {resource.description}
                                    </p>

                                    {/* Tags and Metadata */}
                                    <div className="mb-3 flex items-center space-x-2">
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getTypeColor(resource.type)}`}
                                        >
                                            {getTypeIcon(resource.type)}
                                            <span className="ml-1">{resource.type}</span>
                                        </span>
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}
                                        >
                                            {resource.difficulty}
                                        </span>
                                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                            {resource.category}
                                        </span>
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {resource.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-700"
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
                                        <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                                        <span>
                                            {resource.rating} ({resource.reviews})
                                        </span>
                                    </div>
                                    {resource.duration && (
                                        <div className="flex items-center space-x-1">
                                            <ClockIcon className="h-4 w-4" />
                                            <span>{resource.duration}</span>
                                        </div>
                                    )}
                                    {resource.author && (
                                        <div className="flex items-center space-x-1">
                                            <EyeIcon className="h-4 w-4" />
                                            <span>{resource.author}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => toggleBookmark(resource.id)}
                                        className={`rounded-lg p-2 transition-colors duration-200 ${
                                            resource.isBookmarked
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'text-gray-400 hover:bg-yellow-50 hover:text-yellow-600'
                                        }`}
                                    >
                                        <BookmarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Resource Content */}
                        <div className="p-6">
                            {/* Features */}
                            <div className="mb-4">
                                <h5 className="mb-2 text-sm font-medium text-gray-700">
                                    Key Features:
                                </h5>
                                <div className="space-y-1">
                                    {resource.features.map((feature, index) => (
                                        <div key={index} className="text-sm text-gray-600">
                                            • {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="mb-4 space-y-2">
                                {resource.publisher && (
                                    <div className="text-sm text-gray-600">
                                        <strong>Publisher:</strong> {resource.publisher}
                                    </div>
                                )}
                                {resource.url && (
                                    <div className="text-sm text-gray-600">
                                        <strong>URL:</strong>
                                        <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-1 flex items-center text-emerald-600 hover:text-emerald-700"
                                        >
                                            Visit Site <ExternalLinkIcon className="ml-1 h-3 w-3" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                {resource.isFree ? (
                                    <button className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-emerald-700">
                                        Access Free
                                    </button>
                                ) : (
                                    <button className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-emerald-700">
                                        ${resource.price} - Get Access
                                    </button>
                                )}
                                <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredResources.length === 0 && (
                <div className="py-12 text-center">
                    <BookOpenIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No resources found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
}
