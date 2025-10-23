'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    BookmarkIcon,
    CheckCircleIcon,
    ClockIcon,
    EyeIcon,
    FireIcon,
    FunnelIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    SparklesIcon,
    StarIcon,
    TrophyIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Certification {
    id: string;
    title: string;
    provider: string;
    rating: number;
    students: number;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    category: string;
    tags: string[];
    image: string;
    description: string;
    isBookmarked: boolean;
    isLiked: boolean;
    likes: number;
    lastUpdated: string;
    price: number;
    originalPrice?: number;
    validity: string;
    examType: 'Online' | 'Proctored' | 'Practical';
    passingScore: number;
    attempts: number;
    maxAttempts: number;
    status: 'not-started' | 'in-progress' | 'completed' | 'expired';
    progress?: number;
    expiryDate?: string;
    certificateUrl?: string;
}

export default function CertificationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');

    const categories = [
        'all',
        'Web Development',
        'Mobile Development',
        'Data Science',
        'Machine Learning',
        'DevOps',
        'Cybersecurity',
        'Cloud Computing',
        'Database',
        'UI/UX Design',
        'Game Development',
        'Blockchain',
        'Network Security',
        'Software Testing',
    ];

    const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];
    const statuses = ['all', 'not-started', 'in-progress', 'completed', 'expired'];

    const certifications: Certification[] = [
        {
            id: '1',
            title: 'AWS Certified Solutions Architect - Associate',
            provider: 'Amazon Web Services',
            rating: 4.9,
            students: 45620,
            duration: '40h 30m',
            difficulty: 'Intermediate',
            category: 'Cloud Computing',
            tags: ['AWS', 'Cloud Architecture', 'Solutions Design', 'Infrastructure'],
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
            description:
                'Validate your expertise in designing distributed systems on AWS with this industry-recognized certification.',
            isBookmarked: true,
            isLiked: true,
            likes: 2340,
            lastUpdated: '1 week ago',
            price: 150.0,
            originalPrice: 200.0,
            validity: '3 years',
            examType: 'Proctored',
            passingScore: 72,
            attempts: 0,
            maxAttempts: 3,
            status: 'not-started',
        },
        {
            id: '2',
            title: 'Microsoft Certified: Azure Developer Associate',
            provider: 'Microsoft',
            rating: 4.8,
            students: 38920,
            duration: '35h 15m',
            difficulty: 'Intermediate',
            category: 'Cloud Computing',
            tags: ['Azure', 'Cloud Development', 'Microsoft', 'DevOps'],
            image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=250&fit=crop',
            description:
                'Demonstrate your expertise in developing, testing, and maintaining cloud applications on Microsoft Azure.',
            isBookmarked: false,
            isLiked: false,
            likes: 1890,
            lastUpdated: '2 weeks ago',
            price: 165.0,
            validity: '2 years',
            examType: 'Proctored',
            passingScore: 70,
            attempts: 0,
            maxAttempts: 3,
            status: 'not-started',
        },
        {
            id: '3',
            title: 'Google Cloud Professional Data Engineer',
            provider: 'Google Cloud',
            rating: 4.7,
            students: 28740,
            duration: '45h 20m',
            difficulty: 'Advanced',
            category: 'Data Science',
            tags: ['Google Cloud', 'Data Engineering', 'Big Data', 'Machine Learning'],
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
            description:
                'Validate your ability to design and build data processing systems on Google Cloud Platform.',
            isBookmarked: true,
            isLiked: true,
            likes: 1560,
            lastUpdated: '3 days ago',
            price: 200.0,
            originalPrice: 250.0,
            validity: '2 years',
            examType: 'Proctored',
            passingScore: 75,
            attempts: 1,
            maxAttempts: 3,
            status: 'in-progress',
            progress: 65,
        },
        {
            id: '4',
            title: 'Certified Kubernetes Administrator (CKA)',
            provider: 'Cloud Native Computing Foundation',
            rating: 4.9,
            students: 32450,
            duration: '38h 45m',
            difficulty: 'Advanced',
            category: 'DevOps',
            tags: ['Kubernetes', 'Container Orchestration', 'DevOps', 'Cloud Native'],
            image: 'https://images.unsplash.com/photo-1667372393119-5d6c7379fbea?w=400&h=250&fit=crop',
            description:
                'Prove your expertise in Kubernetes administration with this hands-on certification exam.',
            isBookmarked: false,
            isLiked: false,
            likes: 2100,
            lastUpdated: '1 week ago',
            price: 300.0,
            validity: '3 years',
            examType: 'Practical',
            passingScore: 66,
            attempts: 0,
            maxAttempts: 2,
            status: 'not-started',
        },
        {
            id: '5',
            title: 'Cisco CCNA: Enterprise Networking',
            provider: 'Cisco',
            rating: 4.6,
            students: 41230,
            duration: '50h 15m',
            difficulty: 'Intermediate',
            category: 'Network Security',
            tags: ['Cisco', 'Networking', 'Enterprise', 'Security'],
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
            description:
                'Master enterprise networking fundamentals and prepare for the CCNA certification exam.',
            isBookmarked: true,
            isLiked: true,
            likes: 1780,
            lastUpdated: '5 days ago',
            price: 180.0,
            originalPrice: 220.0,
            validity: '3 years',
            examType: 'Proctored',
            passingScore: 80,
            attempts: 2,
            maxAttempts: 3,
            status: 'completed',
            progress: 100,
            expiryDate: '2026-12-15',
            certificateUrl: '/certificates/ccna-enterprise',
        },
        {
            id: '6',
            title: 'Certified Ethical Hacker (CEH)',
            provider: 'EC-Council',
            rating: 4.8,
            students: 29870,
            duration: '42h 30m',
            difficulty: 'Advanced',
            category: 'Cybersecurity',
            tags: ['Ethical Hacking', 'Cybersecurity', 'Penetration Testing', 'Security'],
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
            description:
                'Learn ethical hacking techniques and prepare for the CEH certification to advance your cybersecurity career.',
            isBookmarked: false,
            isLiked: false,
            likes: 2340,
            lastUpdated: '2 weeks ago',
            price: 250.0,
            validity: '3 years',
            examType: 'Proctored',
            passingScore: 70,
            attempts: 0,
            maxAttempts: 3,
            status: 'not-started',
        },
        {
            id: '7',
            title: 'Oracle Certified Professional: Java SE 11 Developer',
            provider: 'Oracle',
            rating: 4.7,
            students: 35680,
            duration: '55h 20m',
            difficulty: 'Advanced',
            category: 'Programming',
            tags: ['Java', 'Programming', 'Software Development', 'Oracle'],
            image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
            description:
                'Validate your Java programming skills and demonstrate expertise in Java SE 11 development.',
            isBookmarked: true,
            isLiked: true,
            likes: 1890,
            lastUpdated: '1 week ago',
            price: 245.0,
            validity: '2 years',
            examType: 'Proctored',
            passingScore: 65,
            attempts: 1,
            maxAttempts: 3,
            status: 'in-progress',
            progress: 45,
        },
        {
            id: '8',
            title: 'CompTIA Security+',
            provider: 'CompTIA',
            rating: 4.8,
            students: 52340,
            duration: '32h 45m',
            difficulty: 'Intermediate',
            category: 'Cybersecurity',
            tags: ['Security', 'CompTIA', 'Cybersecurity', 'IT Security'],
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
            description:
                'Build a solid foundation in cybersecurity with this vendor-neutral certification.',
            isBookmarked: false,
            isLiked: false,
            likes: 2670,
            lastUpdated: '3 weeks ago',
            price: 170.0,
            originalPrice: 200.0,
            validity: '3 years',
            examType: 'Proctored',
            passingScore: 75,
            attempts: 0,
            maxAttempts: 3,
            status: 'not-started',
        },
    ];

    const filteredCertifications = certifications.filter((cert) => {
        const matchesSearch =
            cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cert.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
        const matchesDifficulty =
            selectedDifficulty === 'all' || cert.difficulty === selectedDifficulty;
        const matchesStatus = selectedStatus === 'all' || cert.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    });

    const sortedCertifications = [...filteredCertifications].sort((a, b) => {
        switch (sortBy) {
            case 'popularity':
                return b.students - a.students;
            case 'rating':
                return b.rating - a.rating;
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'duration':
                return parseInt(a.duration.split('h')[0]) - parseInt(b.duration.split('h')[0]);
            case 'newest':
                return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
            default:
                return 0;
        }
    });

    const toggleBookmark = (certId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle bookmark for certification:', certId);
    };

    const toggleLike = (certId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle like for certification:', certId);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'not-started':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'expired':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Completed';
            case 'in-progress':
                return 'In Progress';
            case 'not-started':
                return 'Not Started';
            case 'expired':
                return 'Expired';
            default:
                return 'Not Started';
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Advanced':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getExamTypeColor = (examType: string) => {
        switch (examType) {
            case 'Online':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Proctored':
                return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Practical':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                            Certifications
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Advance your career with industry-recognized professional certifications
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 rounded-xl bg-purple-600 px-4 py-2 text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                            <TrophyIcon className="h-5 w-5" />
                            <span>My Certificates</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
                {/* Search Bar */}
                <div className="relative max-w-2xl">
                    <MagnifyingGlassIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search certifications, providers, or topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-2xl border border-white/20 bg-white/60 py-3 pr-4 pl-12 backdrop-blur-sm transition-all duration-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    {/* Category Filter */}
                    <div className="flex items-center space-x-2">
                        <FunnelIcon className="h-5 w-5 text-gray-500" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty Filter */}
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    >
                        {difficulties.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty === 'all' ? 'All Difficulties' : difficulty}
                            </option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    >
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status === 'all'
                                    ? 'All Status'
                                    : status === 'not-started'
                                      ? 'Not Started'
                                      : status === 'in-progress'
                                        ? 'In Progress'
                                        : status === 'completed'
                                          ? 'Completed'
                                          : 'Expired'}
                            </option>
                        ))}
                    </select>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    >
                        <option value="popularity">Most Popular</option>
                        <option value="rating">Highest Rated</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="duration">Shortest Duration</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing {filteredCertifications.length} of {certifications.length}{' '}
                    certifications
                </p>
            </div>

            {/* Certification Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedCertifications.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        {/* Certification Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={cert.image}
                                alt={cert.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(cert.status)}`}
                                >
                                    {getStatusText(cert.status)}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute top-3 right-3 flex space-x-2">
                                <button
                                    onClick={() => toggleBookmark(cert.id)}
                                    className={`rounded-full p-2 transition-all duration-200 ${
                                        cert.isBookmarked
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                                    }`}
                                >
                                    <BookmarkIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => toggleLike(cert.id)}
                                    className={`rounded-full p-2 transition-all duration-200 ${
                                        cert.isLiked
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                                    }`}
                                >
                                    <HeartIcon className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Progress Bar for In-Progress Certifications */}
                            {cert.status === 'in-progress' && cert.progress && (
                                <div className="absolute right-3 bottom-3 left-3">
                                    <div className="h-2 rounded-full bg-white/20">
                                        <div
                                            className="h-full rounded-full bg-green-500 transition-all duration-300"
                                            style={{ width: `${cert.progress}%` }}
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-white">
                                        {cert.progress}% Complete
                                    </p>
                                </div>
                            )}

                            {/* Certificate Icon for Completed */}
                            {cert.status === 'completed' && (
                                <div className="absolute right-3 bottom-3">
                                    <div className="rounded-full bg-green-500 p-2">
                                        <CheckCircleIcon className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Certification Content */}
                        <div className="p-6">
                            {/* Badges */}
                            <div className="mb-3 flex flex-wrap gap-2">
                                <span
                                    className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getDifficultyColor(cert.difficulty)}`}
                                >
                                    {cert.difficulty}
                                </span>
                                <span
                                    className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getExamTypeColor(cert.examType)}`}
                                >
                                    {cert.examType}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-purple-600">
                                {cert.title}
                            </h3>

                            {/* Provider */}
                            <p className="mb-3 text-sm text-gray-600">
                                by{' '}
                                <span className="font-medium text-gray-800">{cert.provider}</span>
                            </p>

                            {/* Stats */}
                            <div className="mb-4 flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <StarIcon className="h-4 w-4 fill-current text-yellow-500" />
                                    <span className="font-medium text-gray-900">{cert.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <UserGroupIcon className="h-4 w-4 text-gray-400" />
                                    <span>{cert.students.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <ClockIcon className="h-4 w-4 text-gray-400" />
                                    <span>{cert.duration}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                {cert.description}
                            </p>

                            {/* Certification Details */}
                            <div className="mb-4 space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Validity:</span>
                                    <span className="font-medium">{cert.validity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Passing Score:</span>
                                    <span className="font-medium">{cert.passingScore}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Attempts:</span>
                                    <span className="font-medium">
                                        {cert.attempts}/{cert.maxAttempts}
                                    </span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mb-4 flex flex-wrap gap-2">
                                {cert.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {cert.tags.length > 3 && (
                                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                        +{cert.tags.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {cert.originalPrice && (
                                        <span className="text-sm text-gray-500 line-through">
                                            ${cert.originalPrice}
                                        </span>
                                    )}
                                    <span className="text-xl font-bold text-purple-600">
                                        ${cert.price}
                                    </span>
                                </div>
                                <button className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                                    {cert.status === 'completed'
                                        ? 'View Certificate'
                                        : cert.status === 'in-progress'
                                          ? 'Continue'
                                          : 'Enroll Now'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredCertifications.length === 0 && (
                <div className="py-12 text-center">
                    <AcademicCapIcon className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                        No certifications found
                    </h3>
                    <p className="mt-2 text-gray-600">
                        Try adjusting your search or filter criteria.
                    </p>
                </div>
            )}
        </div>
    );
}
