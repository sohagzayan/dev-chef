'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    BookOpenIcon,
    ChartBarIcon,
    FunnelIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    PlayCircleIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Tutorial {
    id: string;
    title: string;
    author: string;
    rating: number;
    views: number;
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
    language: string;
}

export default function TutorialsPage() {
    console.log('TutorialsPage component loaded');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedLanguage, setSelectedLanguage] = useState('all');
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
    ];

    const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];
    const languages = [
        'all',
        'JavaScript',
        'Python',
        'Java',
        'C++',
        'Go',
        'Rust',
        'TypeScript',
        'PHP',
        'Ruby',
        'Swift',
    ];

    const tutorials: Tutorial[] = [
        {
            id: '1',
            title: 'Build a Full-Stack React App with Node.js',
            author: 'Sarah Johnson',
            rating: 4.8,
            views: 25430,
            duration: '2h 15m',
            difficulty: 'Intermediate',
            category: 'Web Development',
            tags: ['React', 'Node.js', 'MongoDB', 'Full-Stack'],
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
            description:
                'Learn how to build a complete full-stack application using React for the frontend and Node.js with Express for the backend.',
            isBookmarked: true,
            isLiked: true,
            likes: 1240,
            lastUpdated: '2 days ago',
            language: 'JavaScript',
        },
        {
            id: '2',
            title: 'Python Data Analysis with Pandas',
            author: 'Michael Chen',
            rating: 4.9,
            views: 18920,
            duration: '1h 45m',
            difficulty: 'Beginner',
            category: 'Data Science',
            tags: ['Python', 'Pandas', 'Data Analysis', 'Jupyter'],
            image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
            description:
                'Master data manipulation and analysis using Python Pandas library with real-world datasets.',
            isBookmarked: false,
            isLiked: false,
            likes: 890,
            lastUpdated: '1 week ago',
            language: 'Python',
        },
        {
            id: '3',
            title: 'Docker Containerization for Beginners',
            author: 'Alex Rodriguez',
            rating: 4.7,
            views: 15670,
            duration: '1h 30m',
            difficulty: 'Beginner',
            category: 'DevOps',
            tags: ['Docker', 'Containers', 'DevOps', 'Deployment'],
            image: 'https://images.unsplash.com/photo-1667372393119-5d6c7379fbea?w=400&h=250&fit=crop',
            description:
                'Learn the fundamentals of Docker containerization and how to deploy applications using containers.',
            isBookmarked: true,
            isLiked: true,
            likes: 756,
            lastUpdated: '3 days ago',
            language: 'Go',
        },
        {
            id: '4',
            title: 'Flutter App Development Tutorial',
            author: 'Emily Davis',
            rating: 4.6,
            views: 20340,
            duration: '3h 20m',
            difficulty: 'Intermediate',
            category: 'Mobile Development',
            tags: ['Flutter', 'Dart', 'Mobile', 'Cross-Platform'],
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
            description:
                'Build beautiful cross-platform mobile applications using Flutter framework and Dart programming language.',
            isBookmarked: false,
            isLiked: false,
            likes: 1120,
            lastUpdated: '5 days ago',
            language: 'Dart',
        },
        {
            id: '5',
            title: 'Machine Learning with Scikit-learn',
            author: 'David Kim',
            rating: 4.9,
            views: 14230,
            duration: '2h 45m',
            difficulty: 'Advanced',
            category: 'Machine Learning',
            tags: ['Machine Learning', 'Scikit-learn', 'Python', 'AI'],
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
            description:
                'Implement machine learning algorithms using Python Scikit-learn library with practical examples.',
            isBookmarked: true,
            isLiked: true,
            likes: 980,
            lastUpdated: '1 day ago',
            language: 'Python',
        },
        {
            id: '6',
            title: 'UI/UX Design Principles',
            author: 'Lisa Wang',
            rating: 4.8,
            views: 17890,
            duration: '1h 55m',
            difficulty: 'Beginner',
            category: 'UI/UX Design',
            tags: ['UI/UX', 'Design', 'User Experience', 'Prototyping'],
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
            description:
                'Learn fundamental UI/UX design principles and create user-friendly interfaces.',
            isBookmarked: false,
            isLiked: false,
            likes: 650,
            lastUpdated: '4 days ago',
            language: 'TypeScript',
        },
        {
            id: '7',
            title: 'Rust Programming Fundamentals',
            author: 'Robert Wilson',
            rating: 4.7,
            views: 9870,
            duration: '2h 10m',
            difficulty: 'Intermediate',
            category: 'Programming',
            tags: ['Rust', 'Systems Programming', 'Memory Safety', 'Performance'],
            image: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=400&h=250&fit=crop',
            description:
                'Master Rust programming language fundamentals with focus on memory safety and performance.',
            isBookmarked: true,
            isLiked: true,
            likes: 445,
            lastUpdated: '6 days ago',
            language: 'Rust',
        },
        {
            id: '8',
            title: 'AWS Cloud Computing Basics',
            author: 'Jennifer Lee',
            rating: 4.6,
            views: 13450,
            duration: '2h 30m',
            difficulty: 'Beginner',
            category: 'Cloud Computing',
            tags: ['AWS', 'Cloud', 'Infrastructure', 'Deployment'],
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
            description:
                'Learn AWS cloud computing fundamentals and deploy your first application to the cloud.',
            isBookmarked: false,
            isLiked: false,
            likes: 720,
            lastUpdated: '1 week ago',
            language: 'Python',
        },
    ];

    const filteredTutorials = tutorials.filter((tutorial) => {
        const matchesSearch =
            tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutorial.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutorial.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory =
            selectedCategory === 'all' || tutorial.category === selectedCategory;
        const matchesDifficulty =
            selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
        const matchesLanguage =
            selectedLanguage === 'all' || tutorial.language === selectedLanguage;

        return matchesSearch && matchesCategory && matchesDifficulty && matchesLanguage;
    });

    const sortedTutorials = [...filteredTutorials].sort((a, b) => {
        switch (sortBy) {
            case 'popularity':
                return b.views - a.views;
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
            case 'duration':
                return parseInt(a.duration.split('h')[0]) - parseInt(b.duration.split('h')[0]);
            case 'likes':
                return b.likes - a.likes;
            default:
                return 0;
        }
    });

    const toggleBookmark = (tutorialId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle bookmark for tutorial:', tutorialId);
    };

    const toggleLike = (tutorialId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle like for tutorial:', tutorialId);
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

    const getLanguageColor = (language: string) => {
        const colors = {
            JavaScript: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            Python: 'bg-blue-100 text-blue-700 border-blue-200',
            Java: 'bg-orange-100 text-orange-700 border-orange-200',
            'C++': 'bg-blue-100 text-blue-700 border-blue-200',
            Go: 'bg-cyan-100 text-cyan-700 border-cyan-200',
            Rust: 'bg-orange-100 text-orange-700 border-orange-200',
            TypeScript: 'bg-blue-100 text-blue-700 border-blue-200',
            PHP: 'bg-purple-100 text-purple-700 border-purple-200',
            Ruby: 'bg-red-100 text-red-700 border-red-200',
            Swift: 'bg-orange-100 text-orange-700 border-orange-200',
            Dart: 'bg-blue-100 text-blue-700 border-blue-200',
        };
        return (
            colors[language as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200'
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                            Tutorials
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Step-by-step guides to master programming concepts and technologies
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 rounded-xl bg-purple-600 px-4 py-2 text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                            <BookOpenIcon className="h-5 w-5" />
                            <span>My Bookmarks</span>
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
                        placeholder="Search tutorials, authors, or topics..."
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

                    {/* Language Filter */}
                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    >
                        {languages.map((language) => (
                            <option key={language} value={language}>
                                {language === 'all' ? 'All Languages' : language}
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
                        <option value="duration">Shortest Duration</option>
                        <option value="likes">Most Liked</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing {filteredTutorials.length} of {tutorials.length} tutorials
                </p>
            </div>

            {/* Tutorial Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedTutorials.map((tutorial, index) => (
                    <motion.div
                        key={tutorial.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        {/* Tutorial Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={tutorial.image}
                                alt={tutorial.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition-all duration-200 group-hover:bg-white/30">
                                    <PlayCircleIcon className="h-12 w-12 text-white" />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute top-3 right-3 flex space-x-2">
                                <button
                                    onClick={() => toggleBookmark(tutorial.id)}
                                    className={`rounded-full p-2 transition-all duration-200 ${
                                        tutorial.isBookmarked
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                                    }`}
                                >
                                    <AcademicCapIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => toggleLike(tutorial.id)}
                                    className={`rounded-full p-2 transition-all duration-200 ${
                                        tutorial.isLiked
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                                    }`}
                                >
                                    <HeartIcon className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Duration Badge */}
                            <div className="absolute bottom-3 left-3">
                                <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                    {tutorial.duration}
                                </span>
                            </div>
                        </div>

                        {/* Tutorial Content */}
                        <div className="p-6">
                            {/* Difficulty and Language Badges */}
                            <div className="mb-3 flex flex-wrap gap-2">
                                <span
                                    className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}
                                >
                                    {tutorial.difficulty}
                                </span>
                                <span
                                    className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getLanguageColor(tutorial.language)}`}
                                >
                                    {tutorial.language}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-purple-600">
                                {tutorial.title}
                            </h3>

                            {/* Author */}
                            <p className="mb-3 text-sm text-gray-600">
                                by{' '}
                                <span className="font-medium text-gray-800">{tutorial.author}</span>
                            </p>

                            {/* Stats */}
                            <div className="mb-4 flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <StarIcon className="h-4 w-4 fill-current text-yellow-500" />
                                    <span className="font-medium text-gray-900">
                                        {tutorial.rating}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <ChartBarIcon className="h-4 w-4 text-gray-400" />
                                    <span>{tutorial.views.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <HeartIcon className="h-4 w-4 text-red-400" />
                                    <span>{tutorial.likes.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                {tutorial.description}
                            </p>

                            {/* Tags */}
                            <div className="mb-4 flex flex-wrap gap-2">
                                {tutorial.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {tutorial.tags.length > 3 && (
                                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                        +{tutorial.tags.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                    Updated {tutorial.lastUpdated}
                                </span>
                                <button className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                                    Watch Tutorial
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredTutorials.length === 0 && (
                <div className="py-12 text-center">
                    <PlayCircleIcon className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No tutorials found</h3>
                    <p className="mt-2 text-gray-600">
                        Try adjusting your search or filter criteria.
                    </p>
                </div>
            )}
        </div>
    );
}
