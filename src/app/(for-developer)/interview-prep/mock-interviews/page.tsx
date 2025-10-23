'use client';

import { useState } from 'react';
import {
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    ClockIcon as ClockIconSolid,
    StarIcon,
    UserIcon,
    VideoCameraIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface MockInterview {
    id: string;
    title: string;
    interviewer: string;
    interviewerAvatar: string;
    interviewerRating: number;
    interviewerReviews: number;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    topics: string[];
    price: number;
    availableSlots: string[];
    isBooked: boolean;
    status: 'upcoming' | 'completed' | 'cancelled';
    feedback?: string;
    score?: number;
}

export default function MockInterviewsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState('all');
    const [sortBy, setSortBy] = useState('rating');

    const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];
    const allTopics = [
        'Data Structures',
        'Algorithms',
        'System Design',
        'Database Design',
        'API Design',
        'Frontend Development',
        'Backend Development',
        'DevOps',
        'Machine Learning',
        'Behavioral Questions',
    ];

    const mockInterviews: MockInterview[] = [
        {
            id: '1',
            title: 'Full-Stack Developer Mock Interview',
            interviewer: 'Sarah Chen',
            interviewerAvatar:
                'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            interviewerRating: 4.9,
            interviewerReviews: 127,
            duration: '60 min',
            difficulty: 'Intermediate',
            topics: ['Frontend Development', 'Backend Development', 'System Design'],
            price: 89.99,
            availableSlots: ['2024-01-15 10:00', '2024-01-15 14:00', '2024-01-16 09:00'],
            isBooked: false,
            status: 'upcoming',
        },
        {
            id: '2',
            title: 'Senior Software Engineer Interview',
            interviewer: 'Michael Rodriguez',
            interviewerAvatar:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            interviewerRating: 4.8,
            interviewerReviews: 89,
            duration: '90 min',
            difficulty: 'Advanced',
            topics: ['System Design', 'Algorithms', 'Leadership'],
            price: 129.99,
            availableSlots: ['2024-01-15 13:00', '2024-01-16 10:00'],
            isBooked: true,
            status: 'upcoming',
        },
        {
            id: '3',
            title: 'Frontend Developer Mock Interview',
            interviewer: 'Emily Johnson',
            interviewerAvatar:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            interviewerRating: 4.7,
            interviewerReviews: 156,
            duration: '45 min',
            difficulty: 'Beginner',
            topics: ['JavaScript', 'React', 'CSS'],
            price: 69.99,
            availableSlots: ['2024-01-15 11:00', '2024-01-15 15:00', '2024-01-16 11:00'],
            isBooked: false,
            status: 'upcoming',
        },
        {
            id: '4',
            title: 'Data Scientist Interview Prep',
            interviewer: 'David Kim',
            interviewerAvatar:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            interviewerRating: 4.9,
            interviewerReviews: 203,
            duration: '75 min',
            difficulty: 'Advanced',
            topics: ['Machine Learning', 'Statistics', 'Python'],
            price: 109.99,
            availableSlots: ['2024-01-16 14:00', '2024-01-17 09:00'],
            isBooked: false,
            status: 'upcoming',
        },
        {
            id: '5',
            title: 'DevOps Engineer Mock Interview',
            interviewer: 'Alex Thompson',
            interviewerAvatar:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            interviewerRating: 4.6,
            interviewerReviews: 78,
            duration: '60 min',
            difficulty: 'Intermediate',
            topics: ['Docker', 'Kubernetes', 'CI/CD'],
            price: 84.99,
            availableSlots: ['2024-01-15 16:00', '2024-01-16 13:00'],
            isBooked: false,
            status: 'upcoming',
        },
        {
            id: '6',
            title: 'Behavioral Interview Practice',
            interviewer: 'Lisa Wang',
            interviewerAvatar:
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            interviewerRating: 4.8,
            interviewerReviews: 142,
            duration: '45 min',
            difficulty: 'Beginner',
            topics: ['Leadership', 'Teamwork', 'Problem Solving'],
            price: 59.99,
            availableSlots: ['2024-01-15 09:00', '2024-01-16 15:00'],
            isBooked: false,
            status: 'upcoming',
        },
    ];

    const filteredInterviews = mockInterviews.filter((interview) => {
        const matchesSearch =
            interview.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            interview.interviewer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            interview.topics.some((topic) =>
                topic.toLowerCase().includes(searchQuery.toLowerCase()),
            );

        const matchesDifficulty =
            selectedDifficulty === 'all' || interview.difficulty === selectedDifficulty;

        const matchesTopics =
            selectedTopics.length === 0 ||
            selectedTopics.some((topic) => interview.topics.includes(topic));

        return matchesSearch && matchesDifficulty && matchesTopics;
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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'upcoming':
                return <ClockIconSolid className="h-4 w-4 text-blue-500" />;
            case 'completed':
                return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
            case 'cancelled':
                return <XCircleIcon className="h-4 w-4 text-red-500" />;
            default:
                return <ClockIcon className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'completed':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'cancelled':
                return 'bg-red-50 text-red-700 border-red-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Mock Interviews</h1>
                <p className="text-gray-600">
                    Practice with experienced interviewers and get real-time feedback
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search interviews, interviewers, or topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
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

                    {/* Topics Filter */}
                    <select
                        multiple
                        value={selectedTopics}
                        onChange={(e) => {
                            const selected = Array.from(
                                e.target.selectedOptions,
                                (option) => option.value,
                            );
                            setSelectedTopics(selected);
                        }}
                        className="min-w-[200px] rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                        {allTopics.map((topic) => (
                            <option key={topic} value={topic}>
                                {topic}
                            </option>
                        ))}
                    </select>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="rating">Sort by Rating</option>
                        <option value="price">Sort by Price</option>
                        <option value="duration">Sort by Duration</option>
                        <option value="reviews">Sort by Reviews</option>
                    </select>
                </div>
            </div>

            {/* Interview Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredInterviews.map((interview) => (
                    <motion.div
                        key={interview.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Header */}
                        <div className="border-b border-gray-100 p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                                        {interview.title}
                                    </h3>
                                    <div className="mb-3 flex items-center space-x-2">
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(interview.difficulty)}`}
                                        >
                                            {interview.difficulty}
                                        </span>
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(interview.status)}`}
                                        >
                                            {getStatusIcon(interview.status)}
                                            <span className="ml-1">{interview.status}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Interviewer Info */}
                            <div className="flex items-center space-x-3">
                                <img
                                    src={interview.interviewerAvatar}
                                    alt={interview.interviewer}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">
                                        {interview.interviewer}
                                    </h4>
                                    <div className="flex items-center space-x-1">
                                        <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                                        <span className="text-sm text-gray-600">
                                            {interview.interviewerRating} (
                                            {interview.interviewerReviews} reviews)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-6">
                            {/* Topics */}
                            <div className="mb-4">
                                <h5 className="mb-2 text-sm font-medium text-gray-700">
                                    Topics Covered:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {interview.topics.map((topic) => (
                                        <span
                                            key={topic}
                                            className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Duration and Price */}
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <ClockIcon className="h-4 w-4" />
                                    <span className="text-sm">{interview.duration}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-blue-600">
                                        ${interview.price}
                                    </span>
                                </div>
                            </div>

                            {/* Available Slots */}
                            <div className="mb-4">
                                <h5 className="mb-2 text-sm font-medium text-gray-700">
                                    Available Slots:
                                </h5>
                                <div className="space-y-1">
                                    {interview.availableSlots.slice(0, 3).map((slot, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2 text-sm text-gray-600"
                                        >
                                            <CalendarIcon className="h-3 w-3" />
                                            <span>{new Date(slot).toLocaleString()}</span>
                                        </div>
                                    ))}
                                    {interview.availableSlots.length > 3 && (
                                        <span className="text-xs text-gray-500">
                                            +{interview.availableSlots.length - 3} more slots
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                className={`w-full rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                                    interview.isBooked
                                        ? 'cursor-not-allowed bg-gray-100 text-gray-500'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                                }`}
                                disabled={interview.isBooked}
                            >
                                {interview.isBooked ? 'Already Booked' : 'Book Interview'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredInterviews.length === 0 && (
                <div className="py-12 text-center">
                    <VideoCameraIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No interviews found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
}
