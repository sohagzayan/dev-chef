'use client';

import { useState } from 'react';
import {
    ArrowPathIcon,
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    LightBulbIcon,
    MapPinIcon,
    StarIcon,
    UsersIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface RejectedApplication {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
    experience: 'Entry' | 'Mid' | 'Senior' | 'Lead';
    salary: { min: number; max: number; currency: string };
    postedDate: string;
    appliedDate: string;
    rejectedDate: string;
    applicationId: string;
    views: number;
    applications: number;
    tags: string[];
    description: string;
    companyRating: number;
    companyReviews: number;
    rejectionReason?: string;
    feedback?: string;
    improvementAreas?: string[];
    canReapply?: boolean;
    reapplyDate?: string;
    notes?: string;
    lessonsLearned?: string[];
}

export default function RejectedApplicationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rejected-date');
    const [showFeedback, setShowFeedback] = useState<string | null>(null);
    const [showLessons, setShowLessons] = useState<string | null>(null);

    const rejectedApplications: RejectedApplication[] = [
        {
            id: '1',
            title: 'Senior Software Engineer',
            company: 'TechCorp Inc.',
            companyLogo: 'TC',
            location: 'San Francisco, CA',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 120000, max: 180000, currency: 'USD' },
            postedDate: '2024-01-15',
            appliedDate: '2024-01-20',
            rejectedDate: '2024-01-28',
            applicationId: 'APP-001',
            views: 45,
            applications: 89,
            tags: ['React', 'Node.js', 'AWS', 'Microservices'],
            description: 'Senior role requiring 5+ years of experience in full-stack development.',
            companyRating: 4.2,
            companyReviews: 156,
            rejectionReason: 'Experience mismatch',
            feedback:
                'While your technical skills are strong, we were looking for someone with more experience in microservices architecture and team leadership.',
            improvementAreas: ['Microservices Architecture', 'Team Leadership', 'System Design'],
            canReapply: true,
            reapplyDate: '2024-04-28',
            notes: 'Focus on gaining microservices experience and leadership skills',
            lessonsLearned: [
                'Need more hands-on microservices experience',
                'Leadership skills are crucial for senior roles',
                'Research company tech stack before applying',
            ],
        },
        {
            id: '2',
            title: 'Frontend Developer',
            company: 'StartupXYZ',
            companyLogo: 'SX',
            location: 'Austin, TX',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 80000, max: 120000, currency: 'USD' },
            postedDate: '2024-01-10',
            appliedDate: '2024-01-15',
            rejectedDate: '2024-01-25',
            applicationId: 'APP-002',
            views: 32,
            applications: 67,
            tags: ['React', 'TypeScript', 'CSS', 'UI/UX'],
            description:
                'Mid-level frontend developer role with focus on React and modern web technologies.',
            companyRating: 4.5,
            companyReviews: 89,
            rejectionReason: 'Technical assessment',
            feedback:
                'Your coding challenge showed good understanding of React fundamentals, but the solution could have been more optimized and production-ready.',
            improvementAreas: ['Code Optimization', 'Production Readiness', 'Performance'],
            canReapply: true,
            reapplyDate: '2024-04-25',
            notes: 'Practice coding challenges with focus on optimization',
            lessonsLearned: [
                'Always optimize code for production',
                'Consider edge cases in technical assessments',
                'Practice time management during coding challenges',
            ],
        },
        {
            id: '3',
            title: 'DevOps Engineer',
            company: 'Enterprise Solutions',
            companyLogo: 'ES',
            location: 'New York, NY',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 90000, max: 140000, currency: 'USD' },
            postedDate: '2024-01-05',
            appliedDate: '2024-01-12',
            rejectedDate: '2024-01-22',
            applicationId: 'APP-003',
            views: 28,
            applications: 45,
            tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
            description:
                'DevOps engineer role focusing on infrastructure automation and cloud management.',
            companyRating: 3.8,
            companyReviews: 234,
            rejectionReason: 'Cultural fit',
            feedback:
                'Your technical background is excellent, but we felt there might be a mismatch in work style and communication preferences.',
            improvementAreas: [
                'Communication Style',
                'Work Culture Adaptation',
                'Team Collaboration',
            ],
            canReapply: false,
            notes: 'Research company culture more thoroughly in future applications',
            lessonsLearned: [
                'Company culture research is as important as technical fit',
                'Communication style matters in interviews',
                'Ask more questions about team dynamics',
            ],
        },
        {
            id: '4',
            title: 'Data Scientist',
            company: 'AI Innovations',
            companyLogo: 'AI',
            location: 'Seattle, WA',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 130000, max: 190000, currency: 'USD' },
            postedDate: '2024-01-08',
            appliedDate: '2024-01-18',
            rejectedDate: '2024-01-30',
            applicationId: 'APP-004',
            views: 38,
            applications: 72,
            tags: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
            description:
                'Senior data scientist role requiring expertise in ML algorithms and statistical analysis.',
            companyRating: 4.7,
            companyReviews: 67,
            rejectionReason: 'Technical skills gap',
            feedback:
                'Your statistical background is strong, but we need someone with more experience in deep learning and production ML systems.',
            improvementAreas: ['Deep Learning', 'Production ML Systems', 'MLOps'],
            canReapply: true,
            reapplyDate: '2024-05-30',
            notes: 'Focus on deep learning and MLOps skills',
            lessonsLearned: [
                'Deep learning is essential for senior ML roles',
                'Production experience is highly valued',
                'MLOps skills are becoming standard requirements',
            ],
        },
    ];

    const filteredApplications = rejectedApplications.filter((app) => {
        const matchesSearch =
            app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearch;
    });

    const sortedApplications = [...filteredApplications].sort((a, b) => {
        switch (sortBy) {
            case 'rejected-date':
                return new Date(b.rejectedDate).getTime() - new Date(a.rejectedDate).getTime();
            case 'applied-date':
                return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
            case 'company-name':
                return a.company.localeCompare(b.company);
            case 'salary':
                return b.salary.max - a.salary.max;
            default:
                return 0;
        }
    });

    const getExperienceColor = (experience: string) => {
        switch (experience) {
            case 'Entry':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Mid':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Senior':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Lead':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Full-time':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Part-time':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Contract':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Remote':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatSalary = (salary: { min: number; max: number; currency: string }) => {
        return `${salary.currency}${salary.min.toLocaleString()}-${salary.max.toLocaleString()}`;
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        return `${Math.floor(diffInDays / 30)} months ago`;
    };

    const getRejectionReasonColor = (reason: string) => {
        switch (reason) {
            case 'Experience mismatch':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Technical assessment':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Cultural fit':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Technical skills gap':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <XCircleIcon className="h-8 w-8 text-red-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Rejected Applications</h1>
                </div>
                <p className="text-gray-600">
                    Learn from rejections and improve your future applications
                </p>
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Stats Overview */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Rejections
                                </p>
                                <p className="text-2xl font-bold text-red-600">
                                    {rejectedApplications.length}
                                </p>
                            </div>
                            <XCircleIcon className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Can Reapply</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {rejectedApplications.filter((app) => app.canReapply).length}
                                </p>
                            </div>
                            <ArrowPathIcon className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">With Feedback</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {rejectedApplications.filter((app) => app.feedback).length}
                                </p>
                            </div>
                            <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Avg. Response Time
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {Math.round(
                                        rejectedApplications.reduce((sum, app) => {
                                            const applied = new Date(app.appliedDate);
                                            const rejected = new Date(app.rejectedDate);
                                            return (
                                                sum +
                                                (rejected.getTime() - applied.getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                            );
                                        }, 0) / rejectedApplications.length,
                                    )}{' '}
                                    days
                                </p>
                            </div>
                            <CalendarIcon className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Search and Sort */}
                <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <div className="flex items-center space-x-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="rejected-date">Rejection Date</option>
                                <option value="applied-date">Applied Date</option>
                                <option value="company-name">Company Name</option>
                                <option value="salary">Salary</option>
                            </select>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search applications..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <ExclamationTriangleIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                    {sortedApplications.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                            <XCircleIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No rejected applications found
                            </h3>
                            <p className="text-gray-500">Try adjusting your search terms</p>
                        </div>
                    ) : (
                        sortedApplications.map((application) => (
                            <motion.div
                                key={application.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-2xl bg-white p-6 shadow-lg"
                            >
                                <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                                    <div className="flex-1">
                                        <div className="mb-4 flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-pink-600 text-xl font-bold text-white">
                                                    {application.companyLogo}
                                                </div>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center space-x-2">
                                                    <h3 className="text-2xl font-semibold text-gray-900">
                                                        {application.title}
                                                    </h3>
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getExperienceColor(application.experience)}`}
                                                    >
                                                        {application.experience}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getTypeColor(application.type)}`}
                                                    >
                                                        {application.type}
                                                    </span>
                                                </div>

                                                <h4 className="mb-2 text-lg font-medium text-gray-700">
                                                    {application.company}
                                                </h4>

                                                <div className="mb-3 flex items-center space-x-4 text-sm text-gray-500">
                                                    <span className="flex items-center">
                                                        <MapPinIcon className="mr-1 h-4 w-4" />
                                                        {application.location}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <CurrencyDollarIcon className="mr-1 h-4 w-4" />
                                                        {formatSalary(application.salary)}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <CalendarIcon className="mr-1 h-4 w-4" />
                                                        Applied{' '}
                                                        {getTimeAgo(application.appliedDate)}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <XCircleIcon className="mr-1 h-4 w-4" />
                                                        Rejected{' '}
                                                        {getTimeAgo(application.rejectedDate)}
                                                    </span>
                                                </div>

                                                <div className="mb-3 flex flex-wrap gap-2">
                                                    {application.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rejection Details */}
                                        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Rejection Details
                                                </h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <span
                                                            className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getRejectionReasonColor(application.rejectionReason || '')}`}
                                                        >
                                                            {application.rejectionReason}
                                                        </span>
                                                    </div>

                                                    {application.canReapply && (
                                                        <div className="flex items-center space-x-2 text-sm text-green-600">
                                                            <CheckCircleIcon className="h-4 w-4" />
                                                            <span>
                                                                Can reapply after{' '}
                                                                {getTimeAgo(
                                                                    application.reapplyDate || '',
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Application Info
                                                </h4>
                                                <div className="space-y-2 text-sm text-gray-600">
                                                    <div>
                                                        Application ID: {application.applicationId}
                                                    </div>
                                                    <div>Views: {application.views}</div>
                                                    <div>
                                                        Total Applications:{' '}
                                                        {application.applications}
                                                    </div>
                                                    <div>
                                                        Company Rating: {application.companyRating}
                                                        /5 ({application.companyReviews} reviews)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Feedback and Lessons */}
                                        {application.feedback && (
                                            <div className="mb-4">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <h4 className="font-medium text-gray-900">
                                                        Feedback
                                                    </h4>
                                                    <button
                                                        onClick={() =>
                                                            setShowFeedback(
                                                                showFeedback === application.id
                                                                    ? null
                                                                    : application.id,
                                                            )
                                                        }
                                                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                    >
                                                        {showFeedback === application.id
                                                            ? 'Hide Feedback'
                                                            : 'Show Feedback'}
                                                    </button>
                                                </div>

                                                {showFeedback === application.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="rounded-lg border border-blue-200 bg-blue-50 p-4"
                                                    >
                                                        <p className="text-gray-700">
                                                            {application.feedback}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </div>
                                        )}

                                        {/* Improvement Areas */}
                                        {application.improvementAreas &&
                                            application.improvementAreas.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className="mb-2 font-medium text-gray-900">
                                                        Areas for Improvement
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {application.improvementAreas.map(
                                                            (area, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800"
                                                                >
                                                                    {area}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        {/* Lessons Learned */}
                                        {application.lessonsLearned &&
                                            application.lessonsLearned.length > 0 && (
                                                <div className="mb-4">
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <h4 className="font-medium text-gray-900">
                                                            Lessons Learned
                                                        </h4>
                                                        <button
                                                            onClick={() =>
                                                                setShowLessons(
                                                                    showLessons === application.id
                                                                        ? null
                                                                        : application.id,
                                                                )
                                                            }
                                                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                        >
                                                            {showLessons === application.id
                                                                ? 'Hide Lessons'
                                                                : 'Show Lessons'}
                                                        </button>
                                                    </div>

                                                    {showLessons === application.id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="rounded-lg border border-green-200 bg-green-50 p-4"
                                                        >
                                                            <ul className="space-y-2">
                                                                {application.lessonsLearned.map(
                                                                    (lesson, index) => (
                                                                        <li
                                                                            key={index}
                                                                            className="flex items-start space-x-2"
                                                                        >
                                                                            <LightBulbIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                                                            <span className="text-gray-700">
                                                                                {lesson}
                                                                            </span>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            )}

                                        {/* Notes */}
                                        {application.notes && (
                                            <div className="mb-4">
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Notes
                                                </h4>
                                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                                                    <p className="text-gray-700">
                                                        {application.notes}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-end space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <button className="flex items-center space-x-2 rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition-colors duration-200 hover:bg-blue-200">
                                                <EyeIcon className="h-4 w-4" />
                                                <span>View Job</span>
                                            </button>
                                            <button className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                                <DocumentTextIcon className="h-4 w-4" />
                                                <span>Application Details</span>
                                            </button>
                                        </div>

                                        {application.canReapply && (
                                            <button className="flex items-center space-x-2 rounded-lg bg-green-100 px-4 py-2 text-green-700 transition-colors duration-200 hover:bg-green-200">
                                                <ArrowPathIcon className="h-4 w-4" />
                                                <span>Reapply Later</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
