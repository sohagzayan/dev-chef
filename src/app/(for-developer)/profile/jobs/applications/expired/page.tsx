'use client';

import { useState } from 'react';
import {
    ArrowPathIcon,
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    InformationCircleIcon,
    MapPinIcon,
    StarIcon,
    UsersIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ExpiredApplication {
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
    expiredDate: string;
    applicationId: string;
    views: number;
    applications: number;
    tags: string[];
    description: string;
    companyRating: number;
    companyReviews: number;
    expirationReason?: string;
    notes?: string;
    canReapply?: boolean;
    reapplyDate?: string;
    lessonsLearned?: string[];
    status: 'expired' | 'filled' | 'cancelled' | 'on-hold';
}

export default function ExpiredApplicationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('expired-date');
    const [showNotes, setShowNotes] = useState<string | null>(null);
    const [showLessons, setShowLessons] = useState<string | null>(null);

    const expiredApplications: ExpiredApplication[] = [
        {
            id: '1',
            title: 'Senior Backend Developer',
            company: 'TechCorp Inc.',
            companyLogo: 'TC',
            location: 'San Francisco, CA',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 140000, max: 200000, currency: 'USD' },
            postedDate: '2024-01-05',
            appliedDate: '2024-01-12',
            expiredDate: '2024-01-30',
            applicationId: 'APP-001',
            views: 67,
            applications: 120,
            tags: ['Node.js', 'Python', 'AWS', 'Microservices'],
            description:
                'Senior backend role requiring 5+ years of experience in scalable systems.',
            companyRating: 4.2,
            companyReviews: 156,
            expirationReason: 'Position filled',
            notes: 'The position was filled by another candidate. The hiring manager mentioned they were impressed with my background and would consider me for future openings.',
            canReapply: true,
            reapplyDate: '2024-04-30',
            lessonsLearned: [
                'Network with hiring managers for future opportunities',
                'Follow up after rejections to stay on their radar',
                "Keep in touch with companies you're interested in",
            ],
            status: 'filled',
        },
        {
            id: '2',
            title: 'UX Designer',
            company: 'StartupXYZ',
            companyLogo: 'SX',
            location: 'Austin, TX',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 80000, max: 120000, currency: 'USD' },
            postedDate: '2024-01-08',
            appliedDate: '2024-01-15',
            expiredDate: '2024-01-25',
            applicationId: 'APP-002',
            views: 45,
            applications: 78,
            tags: ['Figma', 'User Research', 'Prototyping', 'UI/UX'],
            description:
                'Mid-level UX designer role focusing on user research and interface design.',
            companyRating: 4.5,
            companyReviews: 89,
            expirationReason: 'Position cancelled',
            notes: 'The company decided to restructure and cancelled this position. They mentioned they might reopen similar roles in the future.',
            canReapply: true,
            reapplyDate: '2024-04-25',
            lessonsLearned: [
                'Company restructuring can affect hiring plans',
                'Stay updated on company news and changes',
                'Be flexible with timing in job search',
            ],
            status: 'cancelled',
        },
        {
            id: '3',
            title: 'DevOps Engineer',
            company: 'Enterprise Solutions',
            companyLogo: 'ES',
            location: 'New York, NY',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 120000, max: 180000, currency: 'USD' },
            postedDate: '2024-01-03',
            appliedDate: '2024-01-10',
            expiredDate: '2024-01-28',
            applicationId: 'APP-003',
            views: 52,
            applications: 95,
            tags: ['Docker', 'Kubernetes', 'Azure', 'CI/CD'],
            description:
                'Senior DevOps engineer role focusing on cloud infrastructure and automation.',
            companyRating: 3.8,
            companyReviews: 234,
            expirationReason: 'Position on hold',
            notes: 'The company put the hiring process on hold due to budget constraints. They expect to resume hiring in Q2.',
            canReapply: true,
            reapplyDate: '2024-04-01',
            lessonsLearned: [
                'Budget cycles can affect hiring timelines',
                'Ask about hiring timeline during interviews',
                'Be patient with companies facing constraints',
            ],
            status: 'on-hold',
        },
        {
            id: '4',
            title: 'Data Analyst',
            company: 'AI Innovations',
            companyLogo: 'AI',
            location: 'Seattle, WA',
            type: 'Full-time',
            experience: 'Entry',
            salary: { min: 70000, max: 100000, currency: 'USD' },
            postedDate: '2024-01-10',
            appliedDate: '2024-01-18',
            expiredDate: '2024-01-26',
            applicationId: 'APP-004',
            views: 38,
            applications: 65,
            tags: ['SQL', 'Python', 'Excel', 'Data Visualization'],
            description:
                'Entry-level data analyst role requiring strong analytical skills and attention to detail.',
            companyRating: 4.7,
            companyReviews: 67,
            expirationReason: 'Position expired',
            notes: 'The job posting expired without being filled. The company may repost the position with updated requirements.',
            canReapply: true,
            reapplyDate: '2024-02-26',
            lessonsLearned: [
                'Job postings can expire without being filled',
                'Monitor company career pages for reposted positions',
                'Apply early in the posting cycle',
            ],
            status: 'expired',
        },
    ];

    const filteredApplications = expiredApplications.filter((app) => {
        const matchesSearch =
            app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearch;
    });

    const sortedApplications = [...filteredApplications].sort((a, b) => {
        switch (sortBy) {
            case 'expired-date':
                return new Date(b.expiredDate).getTime() - new Date(a.expiredDate).getTime();
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'filled':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'cancelled':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'on-hold':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'expired':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'filled':
                return <CheckCircleIcon className="h-4 w-4" />;
            case 'cancelled':
                return <XCircleIcon className="h-4 w-4" />;
            case 'on-hold':
                return <ClockIcon className="h-4 w-4" />;
            case 'expired':
                return <ExclamationTriangleIcon className="h-4 w-4" />;
            default:
                return <InformationCircleIcon className="h-4 w-4" />;
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
                    <ClockIcon className="h-8 w-8 text-gray-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Expired Applications</h1>
                </div>
                <p className="text-gray-600">
                    Track applications that have expired or are no longer active
                </p>
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Stats Overview */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Expired</p>
                                <p className="text-2xl font-bold text-gray-600">
                                    {expiredApplications.length}
                                </p>
                            </div>
                            <ClockIcon className="h-8 w-8 text-gray-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Can Reapply</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {expiredApplications.filter((app) => app.canReapply).length}
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
                                    {expiredApplications.filter((app) => app.notes).length}
                                </p>
                            </div>
                            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Avg. Time to Expire
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {Math.round(
                                        expiredApplications.reduce((sum, app) => {
                                            const applied = new Date(app.appliedDate);
                                            const expired = new Date(app.expiredDate);
                                            return (
                                                sum +
                                                (expired.getTime() - applied.getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                            );
                                        }, 0) / expiredApplications.length,
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
                                <option value="expired-date">Expired Date</option>
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
                            <ClockIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No expired applications found
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
                                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 text-xl font-bold text-white">
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
                                                        <ClockIcon className="mr-1 h-4 w-4" />
                                                        Expired{' '}
                                                        {getTimeAgo(application.expiredDate)}
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

                                        {/* Status and Expiration Details */}
                                        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Application Status
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="flex items-center space-x-2">
                                                        <span
                                                            className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getStatusColor(application.status)}`}
                                                        >
                                                            {getStatusIcon(application.status)}
                                                            <span className="ml-1">
                                                                {application.status
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    application.status.slice(1)}
                                                            </span>
                                                        </span>
                                                    </div>

                                                    {application.expirationReason && (
                                                        <div className="text-sm text-gray-600">
                                                            <strong>Reason:</strong>{' '}
                                                            {application.expirationReason}
                                                        </div>
                                                    )}

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
