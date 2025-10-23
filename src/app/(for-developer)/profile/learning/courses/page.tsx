'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    ClockIcon,
    FunnelIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    StarIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Course {
    id: string;
    title: string;
    instructor: string;
    rating: number;
    students: number;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    description: string;
    lessons: number;
    isFavorite: boolean;
    progress?: number;
    status: 'not-started' | 'in-progress' | 'completed';
}

export default function CoursesPage() {
    console.log('CoursesPage component loaded');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
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
    ];

    const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];
    const statuses = ['all', 'not-started', 'in-progress', 'completed'];

    const courses: Course[] = [
        {
            id: '1',
            title: 'Complete React Developer Course 2024',
            instructor: 'Sarah Johnson',
            rating: 4.8,
            students: 15420,
            duration: '24h 30m',
            level: 'Beginner',
            category: 'Web Development',
            price: 89.99,
            originalPrice: 129.99,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
            description:
                'Learn React from scratch with hands-on projects and real-world applications.',
            lessons: 156,
            isFavorite: true,
            progress: 65,
            status: 'in-progress',
        },
        {
            id: '2',
            title: 'Advanced Python for Data Science',
            instructor: 'Michael Chen',
            rating: 4.9,
            students: 8920,
            duration: '18h 45m',
            level: 'Advanced',
            category: 'Data Science',
            price: 119.99,
            image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
            description:
                'Master advanced Python techniques for data analysis and machine learning.',
            lessons: 98,
            isFavorite: false,
            status: 'not-started',
        },
        {
            id: '3',
            title: 'DevOps Fundamentals & CI/CD',
            instructor: 'Alex Rodriguez',
            rating: 4.7,
            students: 6730,
            duration: '16h 20m',
            level: 'Intermediate',
            category: 'DevOps',
            price: 99.99,
            originalPrice: 149.99,
            image: 'https://images.unsplash.com/photo-1667372393119-5d6c7379fbea?w=400&h=250&fit=crop',
            description: 'Learn DevOps principles and implement CI/CD pipelines.',
            lessons: 87,
            isFavorite: true,
            progress: 100,
            status: 'completed',
        },
        {
            id: '4',
            title: 'Mobile App Development with Flutter',
            instructor: 'Emily Davis',
            rating: 4.6,
            students: 12450,
            duration: '22h 15m',
            level: 'Intermediate',
            category: 'Mobile Development',
            price: 109.99,
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
            description: 'Build cross-platform mobile apps with Flutter and Dart.',
            lessons: 134,
            isFavorite: false,
            status: 'not-started',
        },
        {
            id: '5',
            title: 'Machine Learning with TensorFlow',
            instructor: 'David Kim',
            rating: 4.9,
            students: 7890,
            duration: '28h 40m',
            level: 'Advanced',
            category: 'Machine Learning',
            price: 139.99,
            originalPrice: 199.99,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
            description:
                'Deep dive into machine learning algorithms and TensorFlow implementation.',
            lessons: 178,
            isFavorite: true,
            progress: 25,
            status: 'in-progress',
        },
        {
            id: '6',
            title: 'UI/UX Design Masterclass',
            instructor: 'Lisa Wang',
            rating: 4.8,
            students: 9560,
            duration: '20h 30m',
            level: 'Beginner',
            category: 'UI/UX Design',
            price: 94.99,
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
            description: 'Master the fundamentals of user interface and user experience design.',
            lessons: 112,
            isFavorite: false,
            status: 'not-started',
        },
    ];

    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
        const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });

    const sortedCourses = [...filteredCourses].sort((a, b) => {
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
            default:
                return 0;
        }
    });

    const toggleFavorite = (courseId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle favorite for course:', courseId);
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

    const getLevelColor = (level: string) => {
        switch (level) {
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                            Courses
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Explore our comprehensive collection of programming courses
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 rounded-xl bg-purple-600 px-4 py-2 text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                            <AcademicCapIcon className="h-5 w-5" />
                            <span>My Learning</span>
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
                        placeholder="Search courses, instructors, or topics..."
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
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="duration">Shortest Duration</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing {filteredCourses.length} of {courses.length} courses
                </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedCourses.map((course, index) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        {/* Course Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(course.status)}`}
                                >
                                    {getStatusText(course.status)}
                                </span>
                            </div>

                            {/* Favorite Button */}
                            <button
                                onClick={() => toggleFavorite(course.id)}
                                className={`absolute top-3 right-3 rounded-full p-2 transition-all duration-200 ${
                                    course.isFavorite
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                                }`}
                            >
                                <HeartIcon className="h-5 w-5" />
                            </button>

                            {/* Progress Bar for In-Progress Courses */}
                            {course.status === 'in-progress' && course.progress && (
                                <div className="absolute right-3 bottom-3 left-3">
                                    <div className="h-2 rounded-full bg-white/20">
                                        <div
                                            className="h-full rounded-full bg-green-500 transition-all duration-300"
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-white">
                                        {course.progress}% Complete
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Course Content */}
                        <div className="p-6">
                            {/* Level Badge */}
                            <div className="mb-3">
                                <span
                                    className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getLevelColor(course.level)}`}
                                >
                                    {course.level}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-purple-600">
                                {course.title}
                            </h3>

                            {/* Instructor */}
                            <p className="mb-3 text-sm text-gray-600">
                                by{' '}
                                <span className="font-medium text-gray-800">
                                    {course.instructor}
                                </span>
                            </p>

                            {/* Rating and Students */}
                            <div className="mb-4 flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <StarIcon className="h-4 w-4 fill-current text-yellow-500" />
                                    <span className="text-sm font-medium text-gray-900">
                                        {course.rating}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <UserGroupIcon className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">
                                        {course.students.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <ClockIcon className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">{course.duration}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                {course.description}
                            </p>

                            {/* Course Stats */}
                            <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
                                <span>{course.lessons} lessons</span>
                                <span className="font-medium text-purple-600">
                                    {course.category}
                                </span>
                            </div>

                            {/* Price and Action */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {course.originalPrice && (
                                        <span className="text-sm text-gray-500 line-through">
                                            ${course.originalPrice}
                                        </span>
                                    )}
                                    <span className="text-xl font-bold text-purple-600">
                                        ${course.price}
                                    </span>
                                </div>
                                <button className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
                                    {course.status === 'completed'
                                        ? 'Review'
                                        : course.status === 'in-progress'
                                          ? 'Continue'
                                          : 'Enroll'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
                <div className="py-12 text-center">
                    <AcademicCapIcon className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No courses found</h3>
                    <p className="mt-2 text-gray-600">
                        Try adjusting your search or filter criteria.
                    </p>
                </div>
            )}
        </div>
    );
}
