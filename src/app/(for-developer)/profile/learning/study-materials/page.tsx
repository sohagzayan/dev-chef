'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    BoltIcon,
    BookmarkIcon,
    BookOpenIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    DocumentIcon,
    DocumentTextIcon,
    EyeIcon,
    FireIcon,
    FunnelIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    PlayCircleIcon,
    PuzzlePieceIcon,
    SparklesIcon,
    StarIcon,
    TrophyIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface StudyMaterial {
    id: string;
    title: string;
    description: string;
    type:
        | 'document'
        | 'ebook'
        | 'video'
        | 'cheatsheet'
        | 'template'
        | 'worksheet'
        | 'quiz'
        | 'project';
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    fileSize: string;
    duration?: string;
    pages?: number;
    downloads: number;
    rating: number;
    isBookmarked: boolean;
    isLiked: boolean;
    likes: number;
    lastUpdated: string;
    author: string;
    tags: string[];
    image: string;
    status: 'not-started' | 'in-progress' | 'completed';
    progress?: number;
    isDownloaded: boolean;
    fileUrl?: string;
}

export default function StudyMaterialsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');

    const categories = [
        'all',
        'Programming Languages',
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
        'System Design',
        'Software Testing',
        'Computer Science',
    ];

    const types = [
        'all',
        'document',
        'ebook',
        'video',
        'cheatsheet',
        'template',
        'worksheet',
        'quiz',
        'project',
    ];

    const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

    const studyMaterials: StudyMaterial[] = [
        {
            id: '1',
            title: 'JavaScript ES6+ Complete Guide',
            description:
                'Comprehensive guide covering all modern JavaScript features from ES6 to the latest versions.',
            type: 'ebook',
            category: 'Programming Languages',
            difficulty: 'Intermediate',
            fileSize: '15.2 MB',
            pages: 245,
            downloads: 23450,
            rating: 4.8,
            isBookmarked: true,
            isLiked: true,
            likes: 1890,
            lastUpdated: '2 weeks ago',
            author: 'Sarah Johnson',
            tags: ['JavaScript', 'ES6', 'Modern JS', 'Programming'],
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
            status: 'in-progress',
            progress: 65,
            isDownloaded: true,
        },
        {
            id: '2',
            title: 'React Component Patterns',
            description:
                'Advanced React patterns and best practices for building scalable components.',
            type: 'document',
            category: 'Web Development',
            difficulty: 'Advanced',
            fileSize: '8.7 MB',
            pages: 89,
            downloads: 15670,
            rating: 4.9,
            isBookmarked: false,
            isLiked: false,
            likes: 1240,
            lastUpdated: '1 week ago',
            author: 'Michael Chen',
            tags: ['React', 'Components', 'Patterns', 'Best Practices'],
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
            status: 'not-started',
            isDownloaded: false,
        },
        {
            id: '3',
            title: 'Python Data Science Cheatsheet',
            description:
                'Quick reference guide for Python data science libraries and common operations.',
            type: 'cheatsheet',
            category: 'Data Science',
            difficulty: 'Intermediate',
            fileSize: '2.1 MB',
            pages: 12,
            downloads: 32450,
            rating: 4.7,
            isBookmarked: true,
            isLiked: true,
            likes: 2100,
            lastUpdated: '3 days ago',
            author: 'David Kim',
            tags: ['Python', 'Data Science', 'Pandas', 'NumPy', 'Cheatsheet'],
            image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
            status: 'completed',
            progress: 100,
            isDownloaded: true,
        },
        {
            id: '4',
            title: 'Docker & Kubernetes Tutorial',
            description: 'Step-by-step tutorial for containerization and orchestration.',
            type: 'video',
            category: 'DevOps',
            difficulty: 'Intermediate',
            fileSize: '156.8 MB',
            duration: '2h 15m',
            downloads: 9870,
            rating: 4.6,
            isBookmarked: true,
            isLiked: false,
            likes: 890,
            lastUpdated: '1 week ago',
            author: 'Alex Rodriguez',
            tags: ['Docker', 'Kubernetes', 'Containers', 'DevOps'],
            image: 'https://images.unsplash.com/photo-1667372393119-5d6c7379fbea?w=400&h=250&fit=crop',
            status: 'in-progress',
            progress: 35,
            isDownloaded: true,
        },
        {
            id: '5',
            title: 'UI/UX Design Templates',
            description: 'Collection of professional UI/UX design templates and wireframes.',
            type: 'template',
            category: 'UI/UX Design',
            difficulty: 'Beginner',
            fileSize: '45.3 MB',
            pages: 156,
            downloads: 18760,
            rating: 4.8,
            isBookmarked: false,
            isLiked: true,
            likes: 1560,
            lastUpdated: '5 days ago',
            author: 'Lisa Wang',
            tags: ['UI/UX', 'Design', 'Templates', 'Wireframes'],
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
            status: 'not-started',
            isDownloaded: false,
        },
        {
            id: '6',
            title: 'Machine Learning Project Template',
            description: 'Complete template for building and deploying machine learning projects.',
            type: 'project',
            category: 'Machine Learning',
            difficulty: 'Advanced',
            fileSize: '23.4 MB',
            pages: 78,
            downloads: 6540,
            rating: 4.9,
            isBookmarked: true,
            isLiked: true,
            likes: 980,
            lastUpdated: '2 weeks ago',
            author: 'Emily Davis',
            tags: ['Machine Learning', 'Project', 'Template', 'Deployment'],
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
            status: 'not-started',
            isDownloaded: false,
        },
        {
            id: '7',
            title: 'Cybersecurity Assessment Quiz',
            description:
                'Comprehensive quiz covering cybersecurity fundamentals and best practices.',
            type: 'quiz',
            category: 'Cybersecurity',
            difficulty: 'Intermediate',
            fileSize: '1.8 MB',
            pages: 45,
            downloads: 12340,
            rating: 4.7,
            isBookmarked: false,
            isLiked: false,
            likes: 720,
            lastUpdated: '1 week ago',
            author: 'Robert Wilson',
            tags: ['Cybersecurity', 'Quiz', 'Assessment', 'Security'],
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
            status: 'not-started',
            isDownloaded: false,
        },
        {
            id: '8',
            title: 'AWS Architecture Worksheets',
            description: 'Interactive worksheets for designing AWS cloud architectures.',
            type: 'worksheet',
            category: 'Cloud Computing',
            difficulty: 'Advanced',
            fileSize: '12.6 MB',
            pages: 34,
            downloads: 8760,
            rating: 4.6,
            isBookmarked: true,
            isLiked: true,
            likes: 650,
            lastUpdated: '3 days ago',
            author: 'Jennifer Lee',
            tags: ['AWS', 'Cloud', 'Architecture', 'Worksheets'],
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
            status: 'in-progress',
            progress: 45,
            isDownloaded: true,
        },
    ];

    const filteredMaterials = studyMaterials.filter((material) => {
        const matchesSearch =
            material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            material.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            material.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory =
            selectedCategory === 'all' || material.category === selectedCategory;
        const matchesType = selectedType === 'all' || material.type === selectedType;
        const matchesDifficulty =
            selectedDifficulty === 'all' || material.difficulty === selectedDifficulty;

        return matchesSearch && matchesCategory && matchesType && matchesDifficulty;
    });

    const sortedMaterials = [...filteredMaterials].sort((a, b) => {
        switch (sortBy) {
            case 'popularity':
                return b.downloads - a.downloads;
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
            case 'size':
                return parseFloat(a.fileSize.split(' ')[0]) - parseFloat(b.fileSize.split(' ')[0]);
            case 'downloads':
                return b.downloads - a.downloads;
            default:
                return 0;
        }
    });

    const toggleBookmark = (materialId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle bookmark for study material:', materialId);
    };

    const toggleLike = (materialId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle like for study material:', materialId);
    };

    const downloadMaterial = (materialId: string) => {
        // In a real app, this would trigger a download
        console.log('Downloading study material:', materialId);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'not-started':
                return 'bg-gray-100 text-gray-800 border-gray-200';
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

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'document':
                return <DocumentTextIcon className="h-5 w-5" />;
            case 'ebook':
                return <BookOpenIcon className="h-5 w-5" />;
            case 'video':
                return <PlayCircleIcon className="h-5 w-5" />;
            case 'cheatsheet':
                return <DocumentIcon className="h-5 w-5" />;
            case 'template':
                return <PuzzlePieceIcon className="h-5 w-5" />;
            case 'worksheet':
                return <DocumentTextIcon className="h-5 w-5" />;
            case 'quiz':
                return <AcademicCapIcon className="h-5 w-5" />;
            case 'project':
                return <TrophyIcon className="h-5 w-5" />;
            default:
                return <DocumentTextIcon className="h-5 w-5" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'document':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'ebook':
                return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'video':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'cheatsheet':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'template':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'worksheet':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'quiz':
                return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'project':
                return 'bg-pink-100 text-pink-700 border-pink-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return 'bg-green-500';
        if (progress >= 60) return 'bg-blue-500';
        if (progress >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                            Study Materials
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Access comprehensive learning resources, documents, and study materials
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 rounded-xl bg-purple-600 px-4 py-2 text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                            <DocumentTextIcon className="h-5 w-5" />
                            <span>My Library</span>
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
                        placeholder="Search study materials, authors, or topics..."
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

                    {/* Type Filter */}
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    >
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type === 'all'
                                    ? 'All Types'
                                    : type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>

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

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    >
                        <option value="popularity">Most Popular</option>
                        <option value="rating">Highest Rated</option>
                        <option value="newest">Newest First</option>
                        <option value="size">File Size (Low to High)</option>
                        <option value="downloads">Most Downloaded</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing {filteredMaterials.length} of {studyMaterials.length} study materials
                </p>
            </div>

            {/* Study Materials Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedMaterials.map((material, index) => (
                    <motion.div
                        key={material.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        {/* Material Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={material.image}
                                alt={material.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(material.status)}`}
                                >
                                    {getStatusText(material.status)}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute top-3 right-3 flex space-x-2">
                                <button
                                    onClick={() => toggleBookmark(material.id)}
                                    className={`rounded-full p-2 transition-all duration-200 ${
                                        material.isBookmarked
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                                    }`}
                                >
                                    <BookmarkIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => toggleLike(material.id)}
                                    className={`rounded-full p-2 transition-all duration-200 ${
                                        material.isLiked
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                                    }`}
                                >
                                    <HeartIcon className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Progress Bar for In-Progress Materials */}
                            {material.status === 'in-progress' && material.progress && (
                                <div className="absolute right-3 bottom-3 left-3">
                                    <div className="h-2 rounded-full bg-white/20">
                                        <div
                                            className={`h-full rounded-full transition-all duration-300 ${getProgressColor(material.progress)}`}
                                            style={{ width: `${material.progress}%` }}
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-white">
                                        {material.progress}% Complete
                                    </p>
                                </div>
                            )}

                            {/* Download Status */}
                            {material.isDownloaded && (
                                <div className="absolute right-3 bottom-3">
                                    <div className="rounded-full bg-green-500 p-2">
                                        <CheckCircleIcon className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Material Content */}
                        <div className="p-6">
                            {/* Badges */}
                            <div className="mb-3 flex flex-wrap gap-2">
                                <span
                                    className={`inline-flex items-center space-x-1 rounded-full border px-2 py-1 text-xs font-medium ${getTypeColor(material.type)}`}
                                >
                                    {getTypeIcon(material.type)}
                                    <span>
                                        {material.type.charAt(0).toUpperCase() +
                                            material.type.slice(1)}
                                    </span>
                                </span>
                                <span
                                    className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getDifficultyColor(material.difficulty)}`}
                                >
                                    {material.difficulty}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-purple-600">
                                {material.title}
                            </h3>

                            {/* Author */}
                            <p className="mb-3 text-sm text-gray-600">
                                by{' '}
                                <span className="font-medium text-gray-800">{material.author}</span>
                            </p>

                            {/* Description */}
                            <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                {material.description}
                            </p>

                            {/* Stats */}
                            <div className="mb-4 flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <StarIcon className="h-4 w-4 fill-current text-yellow-500" />
                                    <span className="font-medium text-gray-900">
                                        {material.rating}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <EyeIcon className="h-4 w-4 text-gray-400" />
                                    <span>{material.downloads.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <HeartIcon className="h-4 w-4 text-red-400" />
                                    <span>{material.likes.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* File Details */}
                            <div className="mb-4 space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>File Size:</span>
                                    <span className="font-medium">{material.fileSize}</span>
                                </div>
                                {material.pages && (
                                    <div className="flex justify-between">
                                        <span>Pages:</span>
                                        <span className="font-medium">{material.pages}</span>
                                    </div>
                                )}
                                {material.duration && (
                                    <div className="flex justify-between">
                                        <span>Duration:</span>
                                        <span className="font-medium">{material.duration}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Category:</span>
                                    <span className="font-medium">{material.category}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mb-4 flex flex-wrap gap-1">
                                {material.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {material.tags.length > 3 && (
                                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                        +{material.tags.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                    Updated {material.lastUpdated}
                                </span>
                                <button
                                    onClick={() => downloadMaterial(material.id)}
                                    className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                        material.isDownloaded
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-purple-600 text-white hover:bg-purple-700'
                                    }`}
                                >
                                    {material.isDownloaded ? 'Open' : 'Download'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredMaterials.length === 0 && (
                <div className="py-12 text-center">
                    <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                        No study materials found
                    </h3>
                    <p className="mt-2 text-gray-600">
                        Try adjusting your search or filter criteria.
                    </p>
                </div>
            )}
        </div>
    );
}
