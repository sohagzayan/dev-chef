'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    BoltIcon,
    BookmarkIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    EyeIcon,
    FireIcon,
    FunnelIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    PuzzlePieceIcon,
    SparklesIcon,
    StarIcon,
    TrophyIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Skill {
    id: string;
    name: string;
    category: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    currentLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    progress: number;
    targetLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    description: string;
    icon: string;
    isBookmarked: boolean;
    isLiked: boolean;
    likes: number;
    lastUpdated: string;
    estimatedTime: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    prerequisites: string[];
    relatedSkills: string[];
    learningResources: number;
    practiceExercises: number;
    assessments: number;
    status: 'not-started' | 'in-progress' | 'completed' | 'maintenance';
}

export default function SkillsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortBy, setSortBy] = useState('progress');

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
        'Network Security',
        'Software Testing',
        'System Design',
    ];

    const levels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
    const statuses = ['all', 'not-started', 'in-progress', 'completed', 'maintenance'];

    const skills: Skill[] = [
        {
            id: '1',
            name: 'JavaScript',
            category: 'Programming Languages',
            level: 'Intermediate',
            currentLevel: 'Intermediate',
            progress: 75,
            targetLevel: 'Advanced',
            description:
                'Master modern JavaScript including ES6+, async programming, and advanced concepts.',
            icon: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
            isBookmarked: true,
            isLiked: true,
            likes: 2340,
            lastUpdated: '2 days ago',
            estimatedTime: '40h',
            difficulty: 'Medium',
            prerequisites: ['Basic programming concepts'],
            relatedSkills: ['TypeScript', 'Node.js', 'React', 'Vue.js'],
            learningResources: 45,
            practiceExercises: 120,
            assessments: 8,
            status: 'in-progress',
        },
        {
            id: '2',
            name: 'Python',
            category: 'Programming Languages',
            level: 'Advanced',
            currentLevel: 'Advanced',
            progress: 90,
            targetLevel: 'Expert',
            description:
                'Advanced Python programming including data structures, algorithms, and optimization.',
            icon: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
            isBookmarked: true,
            isLiked: true,
            likes: 1890,
            lastUpdated: '1 week ago',
            estimatedTime: '25h',
            difficulty: 'Hard',
            prerequisites: ['Intermediate Python', 'Data Structures'],
            relatedSkills: ['Data Science', 'Machine Learning', 'Django', 'Flask'],
            learningResources: 38,
            practiceExercises: 95,
            assessments: 6,
            status: 'in-progress',
        },
        {
            id: '3',
            name: 'React',
            category: 'Web Development',
            level: 'Beginner',
            currentLevel: 'Beginner',
            progress: 30,
            targetLevel: 'Intermediate',
            description:
                'Learn React fundamentals including components, hooks, and state management.',
            icon: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
            isBookmarked: false,
            isLiked: false,
            likes: 1560,
            lastUpdated: '3 days ago',
            estimatedTime: '35h',
            difficulty: 'Medium',
            prerequisites: ['JavaScript', 'HTML', 'CSS'],
            relatedSkills: ['TypeScript', 'Next.js', 'Redux', 'React Native'],
            learningResources: 52,
            practiceExercises: 140,
            assessments: 10,
            status: 'in-progress',
        },
        {
            id: '4',
            name: 'Docker',
            category: 'DevOps',
            level: 'Intermediate',
            currentLevel: 'Intermediate',
            progress: 100,
            targetLevel: 'Advanced',
            description:
                'Master Docker containerization and orchestration for modern application deployment.',
            icon: 'https://images.unsplash.com/photo-1667372393119-5d6c7379fbea?w=400&h=250&fit=crop',
            isBookmarked: true,
            isLiked: true,
            likes: 980,
            lastUpdated: '1 week ago',
            estimatedTime: '20h',
            difficulty: 'Medium',
            prerequisites: ['Linux basics', 'Command line'],
            relatedSkills: ['Kubernetes', 'CI/CD', 'Microservices', 'Cloud Platforms'],
            learningResources: 28,
            practiceExercises: 75,
            assessments: 5,
            status: 'completed',
        },
        {
            id: '5',
            name: 'Machine Learning',
            category: 'Machine Learning',
            level: 'Beginner',
            currentLevel: 'Beginner',
            progress: 15,
            targetLevel: 'Intermediate',
            description: 'Introduction to machine learning algorithms and practical applications.',
            icon: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
            isBookmarked: false,
            isLiked: false,
            likes: 2100,
            lastUpdated: '5 days ago',
            estimatedTime: '60h',
            difficulty: 'Hard',
            prerequisites: ['Python', 'Mathematics', 'Statistics'],
            relatedSkills: ['Deep Learning', 'Data Science', 'TensorFlow', 'PyTorch'],
            learningResources: 65,
            practiceExercises: 180,
            assessments: 12,
            status: 'not-started',
        },
        {
            id: '6',
            name: 'UI/UX Design',
            category: 'UI/UX Design',
            level: 'Beginner',
            currentLevel: 'Beginner',
            progress: 45,
            targetLevel: 'Intermediate',
            description: 'Learn fundamental design principles and create user-friendly interfaces.',
            icon: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
            isBookmarked: true,
            isLiked: false,
            likes: 890,
            lastUpdated: '2 weeks ago',
            estimatedTime: '45h',
            difficulty: 'Medium',
            prerequisites: ['Basic design sense', 'Creativity'],
            relatedSkills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
            learningResources: 42,
            practiceExercises: 110,
            assessments: 7,
            status: 'in-progress',
        },
        {
            id: '7',
            name: 'Kubernetes',
            category: 'DevOps',
            level: 'Advanced',
            currentLevel: 'Advanced',
            progress: 85,
            targetLevel: 'Expert',
            description: 'Advanced Kubernetes administration and orchestration techniques.',
            icon: 'https://images.unsplash.com/photo-1667372393119-5d6c7379fbea?w=400&h=250&fit=crop',
            isBookmarked: true,
            isLiked: true,
            likes: 1200,
            lastUpdated: '4 days ago',
            estimatedTime: '30h',
            difficulty: 'Hard',
            prerequisites: ['Docker', 'Linux administration', 'Networking'],
            relatedSkills: ['Microservices', 'Service Mesh', 'Cloud Native', 'DevOps'],
            learningResources: 35,
            practiceExercises: 90,
            assessments: 6,
            status: 'in-progress',
        },
        {
            id: '8',
            name: 'Cybersecurity',
            category: 'Cybersecurity',
            level: 'Intermediate',
            currentLevel: 'Intermediate',
            progress: 60,
            targetLevel: 'Advanced',
            description:
                'Advanced cybersecurity concepts including penetration testing and security analysis.',
            icon: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
            isBookmarked: false,
            isLiked: true,
            likes: 1670,
            lastUpdated: '1 week ago',
            estimatedTime: '50h',
            difficulty: 'Hard',
            prerequisites: ['Networking', 'Linux', 'Programming basics'],
            relatedSkills: [
                'Ethical Hacking',
                'Network Security',
                'Incident Response',
                'Forensics',
            ],
            learningResources: 48,
            practiceExercises: 130,
            assessments: 9,
            status: 'in-progress',
        },
    ];

    const filteredSkills = skills.filter((skill) => {
        const matchesSearch =
            skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
        const matchesLevel = selectedLevel === 'all' || skill.level === selectedLevel;
        const matchesStatus = selectedStatus === 'all' || skill.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });

    const sortedSkills = [...filteredSkills].sort((a, b) => {
        switch (sortBy) {
            case 'progress':
                return b.progress - a.progress;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'difficulty':
                return a.difficulty.localeCompare(b.difficulty);
            case 'estimatedTime':
                return (
                    parseInt(a.estimatedTime.split('h')[0]) -
                    parseInt(b.estimatedTime.split('h')[0])
                );
            case 'popularity':
                return b.likes - a.likes;
            default:
                return 0;
        }
    });

    const toggleBookmark = (skillId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle bookmark for skill:', skillId);
    };

    const toggleLike = (skillId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle like for skill:', skillId);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'not-started':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'maintenance':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
            case 'maintenance':
                return 'Maintenance';
            default:
                return 'Not Started';
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Beginner':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Advanced':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Expert':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Hard':
                return 'bg-red-100 text-red-700 border-red-200';
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
                            Skills Development
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Track your progress and develop new skills to advance your career
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 rounded-xl bg-purple-600 px-4 py-2 text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                            <ChartBarIcon className="h-5 w-5" />
                            <span>Skill Analytics</span>
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
                        placeholder="Search skills, categories, or descriptions..."
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

                    {/* Level Filter */}
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    >
                        {levels.map((level) => (
                            <option key={level} value={level}>
                                {level === 'all' ? 'All Levels' : level}
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
                                          : 'Maintenance'}
                            </option>
                        ))}
                    </select>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    >
                        <option value="progress">Progress (High to Low)</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="difficulty">Difficulty (Easy to Hard)</option>
                        <option value="estimatedTime">Time (Low to High)</option>
                        <option value="popularity">Most Popular</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing {filteredSkills.length} of {skills.length} skills
                </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedSkills.map((skill, index) => (
                    <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        {/* Skill Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(skill.status)}`}
                                >
                                    {getStatusText(skill.status)}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute top-3 right-3 flex space-x-2">
                                <button
                                    onClick={() => toggleBookmark(skill.id)}
                                    className={`rounded-full p-2 transition-all duration-200 ${
                                        skill.isBookmarked
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                                    }`}
                                >
                                    <BookmarkIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => toggleLike(skill.id)}
                                    className={`rounded-full p-2 transition-all duration-200 ${
                                        skill.isLiked
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                                    }`}
                                >
                                    <HeartIcon className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="absolute right-3 bottom-3 left-3">
                                <div className="mb-2 flex items-center justify-between text-xs text-white">
                                    <span>Progress</span>
                                    <span>{skill.progress}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/20">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${getProgressColor(skill.progress)}`}
                                        style={{ width: `${skill.progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Skill Content */}
                        <div className="p-6">
                            {/* Badges */}
                            <div className="mb-3 flex flex-wrap gap-2">
                                <span
                                    className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getLevelColor(skill.level)}`}
                                >
                                    {skill.level}
                                </span>
                                <span
                                    className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getDifficultyColor(skill.difficulty)}`}
                                >
                                    {skill.difficulty}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-purple-600">
                                {skill.name}
                            </h3>

                            {/* Category */}
                            <p className="mb-3 text-sm text-gray-600">
                                <span className="font-medium text-gray-800">{skill.category}</span>
                            </p>

                            {/* Description */}
                            <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                {skill.description}
                            </p>

                            {/* Skill Details */}
                            <div className="mb-4 space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Current Level:</span>
                                    <span className="font-medium">{skill.currentLevel}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Target Level:</span>
                                    <span className="font-medium">{skill.targetLevel}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Time:</span>
                                    <span className="font-medium">{skill.estimatedTime}</span>
                                </div>
                            </div>

                            {/* Learning Resources */}
                            <div className="mb-4 grid grid-cols-3 gap-4 text-center text-sm">
                                <div className="rounded-lg bg-purple-50 p-2">
                                    <div className="font-bold text-purple-600">
                                        {skill.learningResources}
                                    </div>
                                    <div className="text-gray-600">Resources</div>
                                </div>
                                <div className="rounded-lg bg-blue-50 p-2">
                                    <div className="font-bold text-blue-600">
                                        {skill.practiceExercises}
                                    </div>
                                    <div className="text-gray-600">Exercises</div>
                                </div>
                                <div className="rounded-lg bg-green-50 p-2">
                                    <div className="font-bold text-green-600">
                                        {skill.assessments}
                                    </div>
                                    <div className="text-gray-600">Assessments</div>
                                </div>
                            </div>

                            {/* Prerequisites */}
                            {skill.prerequisites.length > 0 && (
                                <div className="mb-4">
                                    <p className="mb-2 text-xs font-medium text-gray-700">
                                        Prerequisites:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {skill.prerequisites.map((prereq) => (
                                            <span
                                                key={prereq}
                                                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                                            >
                                                {prereq}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <HeartIcon className="h-4 w-4 text-red-400" />
                                    <span>{skill.likes.toLocaleString()}</span>
                                </div>
                                <button className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                                    {skill.status === 'completed'
                                        ? 'Review'
                                        : skill.status === 'in-progress'
                                          ? 'Continue'
                                          : 'Start Learning'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredSkills.length === 0 && (
                <div className="py-12 text-center">
                    <PuzzlePieceIcon className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No skills found</h3>
                    <p className="mt-2 text-gray-600">
                        Try adjusting your search or filter criteria.
                    </p>
                </div>
            )}
        </div>
    );
}
