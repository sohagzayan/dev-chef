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
    HandRaisedIcon,
    InformationCircleIcon,
    MapPinIcon,
    StarIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface WithdrawnApplication {
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
    withdrawnDate: string;
    applicationId: string;
    views: number;
    applications: number;
    tags: string[];
    description: string;
    companyRating: number;
    companyReviews: number;
    withdrawalReason?: string;
    notes?: string;
    canReapply?: boolean;
    reapplyDate?: string;
    lessonsLearned?: string[];
}

export default function WithdrawnApplicationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('withdrawn-date');
    const [showNotes, setShowNotes] = useState<string | null>(null);
    const [showLessons, setShowLessons] = useState<string | null>(null);

    const withdrawnApplications: WithdrawnApplication[] = [
        {
            id: '1',
            title: 'Senior Frontend Developer',
            company: 'TechCorp Inc.',
            companyLogo: 'TC',
            location: 'San Francisco, CA',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 130000, max: 190000, currency: 'USD' },
            postedDate: '2024-01-10',
            appliedDate: '2024-01-15',
            withdrawnDate: '2024-01-25',
            applicationId: 'APP-001',
            views: 52,
            applications: 95,
            tags: ['React', 'TypeScript', 'Next.js', 'UI/UX'],
            description:
                'Senior frontend role requiring 5+ years of experience in modern web technologies.',
            companyRating: 4.2,
            companyReviews: 156,
            withdrawalReason: 'Accepted another offer',
            notes: 'Received a better offer from a different company with more interesting projects and better work-life balance.',
            canReapply: true,
            reapplyDate: '2024-04-25',
            lessonsLearned: [
                'Always consider the full package, not just salary',
                'Company culture and project scope matter',
                'Timing is important in job search',
            ],
        },
        {
            id: '2',
            title: 'DevOps Engineer',
            company: 'StartupXYZ',
            companyLogo: 'SX',
            location: 'Austin, TX',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 90000, max: 140000, currency: 'USD' },
            postedDate: '2024-01-05',
            appliedDate: '2024-01-12',
            withdrawnDate: '2024-01-20',
            applicationId: 'APP-002',
            views: 38,
            applications: 67,
            tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
            description:
                'Mid-level DevOps role focusing on infrastructure automation and cloud management.',
            companyRating: 4.5,
            companyReviews: 89,
            withdrawalReason: 'Location not suitable',
            notes: 'After further research, realized the location and commute would not work well with my current situation.',
            canReapply: false,
            lessonsLearned: [
                'Research location and commute thoroughly',
                'Consider personal circumstances before applying',
                'Company reputation vs. practical logistics',
            ],
        },
        {
            id: '3',
            title: 'Product Manager',
            company: 'Enterprise Solutions',
            companyLogo: 'ES',
            location: 'New York, NY',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 140000, max: 200000, currency: 'USD' },
            postedDate: '2024-01-08',
            appliedDate: '2024-01-18',
            withdrawnDate: '2024-01-30',
            applicationId: 'APP-003',
            views: 45,
            applications: 78,
            tags: ['Product Strategy', 'Agile', 'User Research', 'Data Analysis'],
            description: 'Senior product manager role requiring experience in B2B SaaS products.',
            companyRating: 3.8,
            companyReviews: 234,
            withdrawalReason: 'Role scope changed',
            notes: 'During the interview process, the role scope changed significantly from what was initially advertised. No longer aligned with my career goals.',
            canReapply: true,
            reapplyDate: '2024-05-30',
            lessonsLearned: [
                'Ask detailed questions about role scope during interviews',
                'Be prepared for role changes during hiring process',
                'Trust your instincts about role alignment',
            ],
        },
        {
            id: '4',
            title: 'Data Scientist',
            company: 'AI Innovations',
            companyLogo: 'AI',
            location: 'Seattle, WA',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 110000, max: 160000, currency: 'USD' },
            postedDate: '2024-01-12',
            appliedDate: '2024-01-20',
            withdrawnDate: '2024-01-28',
            applicationId: 'APP-004',
            views: 41,
            applications: 72,
            tags: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
            description:
                'Mid-level data scientist role focusing on ML model development and data analysis.',
            companyRating: 4.7,
            companyReviews: 67,
            withdrawalReason: 'Personal circumstances',
            notes: 'Personal circumstances changed and I need to stay in my current location for the foreseeable future.',
            canReapply: true,
            reapplyDate: '2024-06-28',
            lessonsLearned: [
                'Personal circumstances can change quickly',
                'Be honest about your situation',
                'Maintain professional relationships for future opportunities',
            ],
        },
    ];

    const filteredApplications = withdrawnApplications.filter((app) => {
        const matchesSearch =
            app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearch;
    });

    const sortedApplications = [...filteredApplications].sort((a, b) => {
        switch (sortBy) {
            case 'withdrawn-date':
                return new Date(b.withdrawnDate).getTime() - new Date(a.withdrawnDate).getTime();
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

    const getWithdrawalReasonColor = (reason: string) => {
        switch (reason) {
            case 'Accepted another offer':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Location not suitable':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Role scope changed':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Personal circumstances':
                return 'bg-blue-100 text-blue-800 border-blue-200';
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <HandRaisedIcon className="h-8 w-8 text-orange-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Withdrawn Applications</h1>
                </div>
                <p className="text-gray-600">Track and learn from applications you've withdrawn</p>
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Stats Overview */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Withdrawn</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {withdrawnApplications.length}
                                </p>
                            </div>
                            <HandRaisedIcon className="h-8 w-8 text-orange-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Can Reapply</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {withdrawnApplications.filter((app) => app.canReapply).length}
                                </p>
                            </div>
                            <ArrowPathIcon className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">With Notes</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {withdrawnApplications.filter((app) => app.notes).length}
                                </p>
                            </div>
                            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Avg. Time to Withdraw
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {Math.round(
                                        withdrawnApplications.reduce((sum, app) => {
                                            const applied = new Date(app.appliedDate);
                                            const withdrawn = new Date(app.withdrawnDate);
                                            return (
                                                sum +
                                                (withdrawn.getTime() - applied.getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                            );
                                        }, 0) / withdrawnApplications.length,
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
                                <option value="withdrawn-date">Withdrawn Date</option>
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
                            <InformationCircleIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                    {sortedApplications.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                            <HandRaisedIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No withdrawn applications found
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
                                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-xl font-bold text-white">
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
                                                        <HandRaisedIcon className="mr-1 h-4 w-4" />
                                                        Withdrawn{' '}
                                                        {getTimeAgo(application.withdrawnDate)}
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

                                        {/* Withdrawal Details */}
                                        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Withdrawal Details
                                                </h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <span
                                                            className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getWithdrawalReasonColor(application.withdrawalReason || '')}`}
                                                        >
                                                            {application.withdrawalReason}
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

                                        {/* Notes */}
                                        {application.notes && (
                                            <div className="mb-4">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <h4 className="font-medium text-gray-900">
                                                        Notes
                                                    </h4>
                                                    <button
                                                        onClick={() =>
                                                            setShowNotes(
                                                                showNotes === application.id
                                                                    ? null
                                                                    : application.id,
                                                            )
                                                        }
                                                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                    >
                                                        {showNotes === application.id
                                                            ? 'Hide Notes'
                                                            : 'Show Notes'}
                                                    </button>
                                                </div>

                                                {showNotes === application.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="rounded-lg border border-blue-200 bg-blue-50 p-4"
                                                    >
                                                        <p className="text-gray-700">
                                                            {application.notes}
                                                        </p>
                                                    </motion.div>
                                                )}
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
                                                                            <ChatBubbleLeftRightIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
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
