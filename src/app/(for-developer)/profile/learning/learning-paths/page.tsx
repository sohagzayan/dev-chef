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
    FlagIcon,
    FunnelIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    MapIcon,
    PuzzlePieceIcon,
    SparklesIcon,
    StarIcon,
    TrophyIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface LearningPath {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedDuration: string;
    totalSteps: number;
    completedSteps: number;
    progress: number;
    image: string;
    isBookmarked: boolean;
    isLiked: boolean;
    likes: number;
    students: number;
    rating: number;
    lastUpdated: string;
    prerequisites: string[];
    skills: string[];
    outcomes: string[];
    status: 'not-started' | 'in-progress' | 'completed';
    steps: LearningStep[];
    tags: string[];
}

interface LearningStep {
    id: string;
    title: string;
    description: string;
    type: 'course' | 'tutorial' | 'project' | 'assessment' | 'certification';
    duration: string;
    isCompleted: boolean;
    isRequired: boolean;
    order: number;
}

export default function LearningPathsPage() {
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
        'Full-Stack Development',
        'Frontend Development',
        'Backend Development',
        'Game Development',
        'Blockchain Development',
        'AI & ML Engineering',
        'Data Engineering',
        'Site Reliability Engineering',
    ];

    const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];
    const statuses = ['all', 'not-started', 'in-progress', 'completed'];

    const learningPaths: LearningPath[] = [
        {
            id: '1',
            title: 'Full-Stack Web Developer',
            description:
                'Master both frontend and backend development to become a complete web developer.',
            category: 'Full-Stack Development',
            difficulty: 'Intermediate',
            estimatedDuration: '6 months',
            totalSteps: 24,
            completedSteps: 8,
            progress: 33,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
            isBookmarked: true,
            isLiked: true,
            likes: 3240,
            students: 15620,
            rating: 4.8,
            lastUpdated: '1 week ago',
            prerequisites: ['Basic programming concepts', 'HTML & CSS fundamentals'],
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js', 'Git'],
            outcomes: [
                'Build full-stack applications',
                'Deploy to cloud platforms',
                'Work with databases',
            ],
            status: 'in-progress',
            tags: ['Web Development', 'JavaScript', 'React', 'Node.js', 'Full-Stack'],
            steps: [
                {
                    id: '1-1',
                    title: 'HTML & CSS Fundamentals',
                    description: 'Learn the basics of web markup and styling',
                    type: 'course',
                    duration: '2 weeks',
                    isCompleted: true,
                    isRequired: true,
                    order: 1,
                },
                {
                    id: '1-2',
                    title: 'JavaScript Essentials',
                    description: 'Master JavaScript programming fundamentals',
                    type: 'course',
                    duration: '3 weeks',
                    isCompleted: true,
                    isRequired: true,
                    order: 2,
                },
                {
                    id: '1-3',
                    title: 'React Frontend Development',
                    description: 'Build interactive user interfaces with React',
                    type: 'course',
                    duration: '4 weeks',
                    isCompleted: true,
                    isRequired: true,
                    order: 3,
                },
                {
                    id: '1-4',
                    title: 'Node.js Backend Development',
                    description: 'Create server-side applications with Node.js',
                    type: 'course',
                    duration: '4 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 4,
                },
                {
                    id: '1-5',
                    title: 'Database Design & MongoDB',
                    description: 'Learn database design and MongoDB implementation',
                    type: 'course',
                    duration: '3 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 5,
                },
            ],
        },
        {
            id: '2',
            title: 'Data Science Professional',
            description: 'Master data analysis, machine learning, and statistical modeling.',
            category: 'Data Science',
            difficulty: 'Advanced',
            estimatedDuration: '8 months',
            totalSteps: 32,
            completedSteps: 0,
            progress: 0,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
            isBookmarked: false,
            isLiked: false,
            likes: 2890,
            students: 12450,
            rating: 4.9,
            lastUpdated: '2 weeks ago',
            prerequisites: ['Python programming', 'Mathematics & Statistics', 'Linear Algebra'],
            skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'SQL'],
            outcomes: ['Analyze complex datasets', 'Build ML models', 'Create data visualizations'],
            status: 'not-started',
            tags: ['Data Science', 'Machine Learning', 'Python', 'Statistics'],
            steps: [
                {
                    id: '2-1',
                    title: 'Python for Data Science',
                    description: 'Learn Python programming for data analysis',
                    type: 'course',
                    duration: '4 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 1,
                },
                {
                    id: '2-2',
                    title: 'Statistics & Probability',
                    description: 'Master statistical concepts and probability theory',
                    type: 'course',
                    duration: '3 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 2,
                },
                {
                    id: '2-3',
                    title: 'Data Manipulation with Pandas',
                    description: 'Learn data cleaning and manipulation techniques',
                    type: 'course',
                    duration: '3 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 3,
                },
            ],
        },
        {
            id: '3',
            title: 'DevOps Engineer',
            description: 'Learn infrastructure automation, CI/CD, and cloud deployment.',
            category: 'DevOps',
            difficulty: 'Advanced',
            estimatedDuration: '7 months',
            totalSteps: 28,
            completedSteps: 15,
            progress: 54,
            image: 'https://images.unsplash.com/photo-1667372393119-5d6c7379fbea?w=400&h=250&fit=crop',
            isBookmarked: true,
            isLiked: true,
            likes: 2100,
            students: 9870,
            rating: 4.7,
            lastUpdated: '3 days ago',
            prerequisites: ['Linux administration', 'Basic networking', 'Programming fundamentals'],
            skills: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'AWS', 'Linux'],
            outcomes: [
                'Automate deployments',
                'Manage cloud infrastructure',
                'Implement CI/CD pipelines',
            ],
            status: 'in-progress',
            tags: ['DevOps', 'Cloud Computing', 'Automation', 'CI/CD'],
            steps: [
                {
                    id: '3-1',
                    title: 'Linux System Administration',
                    description: 'Master Linux command line and system management',
                    type: 'course',
                    duration: '3 weeks',
                    isCompleted: true,
                    isRequired: true,
                    order: 1,
                },
                {
                    id: '3-2',
                    title: 'Docker Containerization',
                    description: 'Learn containerization with Docker',
                    type: 'course',
                    duration: '3 weeks',
                    isCompleted: true,
                    isRequired: true,
                    order: 2,
                },
                {
                    id: '3-3',
                    title: 'Kubernetes Orchestration',
                    description: 'Master container orchestration with Kubernetes',
                    type: 'course',
                    duration: '4 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 3,
                },
            ],
        },
        {
            id: '4',
            title: 'Mobile App Developer',
            description: 'Build native and cross-platform mobile applications.',
            category: 'Mobile Development',
            difficulty: 'Intermediate',
            estimatedDuration: '5 months',
            totalSteps: 20,
            completedSteps: 0,
            progress: 0,
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
            isBookmarked: false,
            isLiked: false,
            likes: 1780,
            students: 8560,
            rating: 4.6,
            lastUpdated: '1 week ago',
            prerequisites: ['Programming basics', 'UI/UX fundamentals'],
            skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile Design'],
            outcomes: ['Build iOS & Android apps', 'Deploy to app stores', 'Create responsive UIs'],
            status: 'not-started',
            tags: ['Mobile Development', 'React Native', 'Flutter', 'iOS', 'Android'],
            steps: [
                {
                    id: '4-1',
                    title: 'Mobile App Design Principles',
                    description: 'Learn mobile-first design and UX principles',
                    type: 'course',
                    duration: '2 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 1,
                },
                {
                    id: '4-2',
                    title: 'React Native Development',
                    description: 'Build cross-platform apps with React Native',
                    type: 'course',
                    duration: '4 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 2,
                },
                {
                    id: '4-3',
                    title: 'Flutter App Development',
                    description: 'Create beautiful apps with Flutter',
                    type: 'course',
                    duration: '4 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 3,
                },
            ],
        },
        {
            id: '5',
            title: 'Cybersecurity Specialist',
            description: 'Learn ethical hacking, network security, and incident response.',
            category: 'Cybersecurity',
            difficulty: 'Advanced',
            estimatedDuration: '9 months',
            totalSteps: 36,
            completedSteps: 0,
            progress: 0,
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
            isBookmarked: true,
            isLiked: false,
            likes: 3450,
            students: 11230,
            rating: 4.8,
            lastUpdated: '2 weeks ago',
            prerequisites: [
                'Networking fundamentals',
                'Linux administration',
                'Programming basics',
            ],
            skills: [
                'Ethical Hacking',
                'Network Security',
                'Penetration Testing',
                'Incident Response',
            ],
            outcomes: ['Conduct security audits', 'Protect systems', 'Respond to cyber threats'],
            status: 'not-started',
            tags: ['Cybersecurity', 'Ethical Hacking', 'Network Security', 'Penetration Testing'],
            steps: [
                {
                    id: '5-1',
                    title: 'Network Security Fundamentals',
                    description: 'Learn network protocols and security concepts',
                    type: 'course',
                    duration: '3 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 1,
                },
                {
                    id: '5-2',
                    title: 'Ethical Hacking Techniques',
                    description: 'Master penetration testing methodologies',
                    type: 'course',
                    duration: '4 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 2,
                },
                {
                    id: '5-3',
                    title: 'Incident Response & Forensics',
                    description: 'Learn to investigate and respond to security incidents',
                    type: 'course',
                    duration: '4 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 3,
                },
            ],
        },
        {
            id: '6',
            title: 'Cloud Solutions Architect',
            description: 'Design and implement scalable cloud infrastructure solutions.',
            category: 'Cloud Computing',
            difficulty: 'Advanced',
            estimatedDuration: '8 months',
            totalSteps: 30,
            completedSteps: 0,
            progress: 0,
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
            isBookmarked: false,
            isLiked: true,
            likes: 2670,
            students: 13450,
            rating: 4.7,
            lastUpdated: '1 week ago',
            prerequisites: [
                'Networking basics',
                'Linux administration',
                'Programming fundamentals',
            ],
            skills: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Docker', 'Kubernetes'],
            outcomes: [
                'Design cloud architectures',
                'Implement infrastructure as code',
                'Optimize cloud costs',
            ],
            status: 'not-started',
            tags: ['Cloud Computing', 'AWS', 'Azure', 'Infrastructure', 'DevOps'],
            steps: [
                {
                    id: '6-1',
                    title: 'Cloud Computing Fundamentals',
                    description: 'Learn cloud concepts and service models',
                    type: 'course',
                    duration: '2 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 1,
                },
                {
                    id: '6-2',
                    title: 'AWS Solutions Architecture',
                    description: 'Design solutions on Amazon Web Services',
                    type: 'course',
                    duration: '6 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 2,
                },
                {
                    id: '6-3',
                    title: 'Infrastructure as Code',
                    description: 'Automate infrastructure with Terraform',
                    type: 'course',
                    duration: '4 weeks',
                    isCompleted: false,
                    isRequired: true,
                    order: 3,
                },
            ],
        },
    ];

    const filteredPaths = learningPaths.filter((path) => {
        const matchesSearch =
            path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            path.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            path.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || path.category === selectedCategory;
        const matchesDifficulty =
            selectedDifficulty === 'all' || path.difficulty === selectedDifficulty;
        const matchesStatus = selectedStatus === 'all' || path.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    });

    const sortedPaths = [...filteredPaths].sort((a, b) => {
        switch (sortBy) {
            case 'popularity':
                return b.students - a.students;
            case 'rating':
                return b.rating - a.rating;
            case 'progress':
                return b.progress - a.progress;
            case 'duration':
                return (
                    parseInt(a.estimatedDuration.split(' ')[0]) -
                    parseInt(b.estimatedDuration.split(' ')[0])
                );
            case 'newest':
                return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
            default:
                return 0;
        }
    });

    const toggleBookmark = (pathId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle bookmark for learning path:', pathId);
    };

    const toggleLike = (pathId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle like for learning path:', pathId);
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
                            Learning Paths
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Structured learning journeys to master complete skill sets
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 rounded-xl bg-purple-600 px-4 py-2 text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                            <MapIcon className="h-5 w-5" />
                            <span>My Paths</span>
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
                        placeholder="Search learning paths, categories, or skills..."
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
                                        : 'Completed'}
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
                        <option value="progress">Progress (High to Low)</option>
                        <option value="duration">Duration (Low to High)</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing {filteredPaths.length} of {learningPaths.length} learning paths
                </p>
            </div>

            {/* Learning Paths Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedPaths.map((path, index) => (
                    <motion.div
                        key={path.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        {/* Path Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={path.image}
                                alt={path.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(path.status)}`}
                                >
                                    {getStatusText(path.status)}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute top-3 right-3 flex space-x-2">
                                <button
                                    onClick={() => toggleBookmark(path.id)}
                                    className={`rounded-full p-2 transition-all duration-200 ${
                                        path.isBookmarked
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                                    }`}
                                >
                                    <BookmarkIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => toggleLike(path.id)}
                                    className={`rounded-full p-2 transition-all duration-200 ${
                                        path.isLiked
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
                                    <span>{path.progress}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/20">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${getProgressColor(path.progress)}`}
                                        style={{ width: `${path.progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Path Content */}
                        <div className="p-6">
                            {/* Badges */}
                            <div className="mb-3 flex flex-wrap gap-2">
                                <span
                                    className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getDifficultyColor(path.difficulty)}`}
                                >
                                    {path.difficulty}
                                </span>
                                <span className="inline-flex rounded-full border border-purple-200 bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                                    {path.estimatedDuration}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-purple-600">
                                {path.title}
                            </h3>

                            {/* Description */}
                            <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                {path.description}
                            </p>

                            {/* Stats */}
                            <div className="mb-4 flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <StarIcon className="h-4 w-4 fill-current text-yellow-500" />
                                    <span className="font-medium text-gray-900">{path.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <UserGroupIcon className="h-4 w-4 text-gray-400" />
                                    <span>{path.students.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <ClockIcon className="h-4 w-4 text-gray-400" />
                                    <span>{path.totalSteps} steps</span>
                                </div>
                            </div>

                            {/* Progress Details */}
                            <div className="mb-4 space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Completed:</span>
                                    <span className="font-medium">
                                        {path.completedSteps}/{path.totalSteps}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Category:</span>
                                    <span className="font-medium">{path.category}</span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="mb-4">
                                <p className="mb-2 text-xs font-medium text-gray-700">
                                    Skills you'll learn:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {path.skills.slice(0, 3).map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {path.skills.length > 3 && (
                                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                            +{path.skills.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <HeartIcon className="h-4 w-4 text-red-400" />
                                    <span>{path.likes.toLocaleString()}</span>
                                </div>
                                <button className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                                    {path.status === 'completed'
                                        ? 'Review Path'
                                        : path.status === 'in-progress'
                                          ? 'Continue Path'
                                          : 'Start Path'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredPaths.length === 0 && (
                <div className="py-12 text-center">
                    <MapIcon className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                        No learning paths found
                    </h3>
                    <p className="mt-2 text-gray-600">
                        Try adjusting your search or filter criteria.
                    </p>
                </div>
            )}
        </div>
    );
}
