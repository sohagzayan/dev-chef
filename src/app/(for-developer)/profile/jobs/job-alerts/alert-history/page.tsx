'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    BellIcon,
    BriefcaseIcon,
    CalendarIcon,
    ClockIcon,
    CurrencyDollarIcon,
    EyeIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    StarIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface AlertHistory {
    id: string;
    alertName: string;
    alertId: string;
    triggeredAt: string;
    jobsFound: number;
    jobs: JobMatch[];
    keywords: string[];
    locations: string[];
    jobTypes: string[];
    experienceLevels: string[];
    salaryRange: { min: number; max: number; currency: string };
    industries: string[];
    remotePreference: string;
}

interface JobMatch {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    type: string;
    experience: string;
    salary: { min: number; max: number; currency: string };
    postedDate: string;
    matchScore: number;
    matchReasons: string[];
    isViewed: boolean;
    isApplied: boolean;
    companyRating: number;
    companyReviews: number;
    tags: string[];
}

export default function AlertHistoryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAlert, setSelectedAlert] = useState<string>('all');
    const [dateFilter, setDateFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState('triggered-date');
    const [showJobDetails, setShowJobDetails] = useState<string | null>(null);

    const alertHistory: AlertHistory[] = [
        {
            id: '1',
            alertName: 'Frontend Developer - Remote',
            alertId: 'alert-1',
            triggeredAt: '2024-01-30T10:30:00Z',
            jobsFound: 12,
            keywords: ['React', 'TypeScript', 'Frontend'],
            locations: ['Remote', 'San Francisco', 'New York'],
            jobTypes: ['Full-time', 'Remote'],
            experienceLevels: ['Mid', 'Senior'],
            salaryRange: { min: 80000, max: 150000, currency: 'USD' },
            industries: ['Technology', 'E-commerce'],
            remotePreference: 'remote-only',
            jobs: [
                {
                    id: 'job-1',
                    title: 'Senior Frontend Developer',
                    company: 'TechCorp Inc.',
                    companyLogo: 'TC',
                    location: 'Remote',
                    type: 'Full-time',
                    experience: 'Senior',
                    salary: { min: 120000, max: 150000, currency: 'USD' },
                    postedDate: '2024-01-29',
                    matchScore: 95,
                    matchReasons: [
                        'Perfect keyword match',
                        'Salary within range',
                        'Remote preference met',
                    ],
                    isViewed: true,
                    isApplied: false,
                    companyRating: 4.2,
                    companyReviews: 156,
                    tags: ['React', 'TypeScript', 'Next.js', 'UI/UX'],
                },
                {
                    id: 'job-2',
                    title: 'Frontend Engineer',
                    company: 'StartupXYZ',
                    companyLogo: 'SX',
                    location: 'San Francisco',
                    type: 'Full-time',
                    experience: 'Mid',
                    salary: { min: 90000, max: 130000, currency: 'USD' },
                    postedDate: '2024-01-28',
                    matchScore: 87,
                    matchReasons: [
                        'Good keyword match',
                        'Salary within range',
                        'Location preference met',
                    ],
                    isViewed: false,
                    isApplied: false,
                    companyRating: 4.5,
                    companyReviews: 89,
                    tags: ['React', 'JavaScript', 'CSS', 'UI/UX'],
                },
            ],
        },
        {
            id: '2',
            alertName: 'DevOps Engineer - Bay Area',
            alertId: 'alert-2',
            triggeredAt: '2024-01-28T14:15:00Z',
            jobsFound: 8,
            keywords: ['DevOps', 'AWS', 'Kubernetes'],
            locations: ['San Francisco', 'San Jose', 'Oakland'],
            jobTypes: ['Full-time', 'Contract'],
            experienceLevels: ['Senior', 'Lead'],
            salaryRange: { min: 120000, max: 200000, currency: 'USD' },
            industries: ['Technology', 'Finance'],
            remotePreference: 'hybrid',
            jobs: [
                {
                    id: 'job-3',
                    title: 'Senior DevOps Engineer',
                    company: 'Enterprise Solutions',
                    companyLogo: 'ES',
                    location: 'San Francisco',
                    type: 'Full-time',
                    experience: 'Senior',
                    salary: { min: 140000, max: 180000, currency: 'USD' },
                    postedDate: '2024-01-27',
                    matchScore: 92,
                    matchReasons: [
                        'Perfect keyword match',
                        'Salary within range',
                        'Location preference met',
                    ],
                    isViewed: true,
                    isApplied: true,
                    companyRating: 3.8,
                    companyReviews: 234,
                    tags: ['DevOps', 'AWS', 'Kubernetes', 'Docker'],
                },
            ],
        },
        {
            id: '3',
            alertName: 'Data Scientist - Startup',
            alertId: 'alert-3',
            triggeredAt: '2024-01-20T09:45:00Z',
            jobsFound: 5,
            keywords: ['Machine Learning', 'Python', 'Data Science'],
            locations: ['Remote', 'Austin', 'Seattle'],
            jobTypes: ['Full-time'],
            experienceLevels: ['Entry', 'Mid'],
            salaryRange: { min: 70000, max: 120000, currency: 'USD' },
            industries: ['Technology', 'Healthcare'],
            remotePreference: 'any',
            jobs: [
                {
                    id: 'job-4',
                    title: 'Data Scientist',
                    company: 'AI Innovations',
                    companyLogo: 'AI',
                    location: 'Seattle',
                    type: 'Full-time',
                    experience: 'Mid',
                    salary: { min: 90000, max: 120000, currency: 'USD' },
                    postedDate: '2024-01-19',
                    matchScore: 89,
                    matchReasons: [
                        'Good keyword match',
                        'Salary within range',
                        'Industry preference met',
                    ],
                    isViewed: false,
                    isApplied: false,
                    companyRating: 4.7,
                    companyReviews: 67,
                    tags: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
                },
            ],
        },
    ];

    const alerts = [
        { id: 'all', name: 'All Alerts' },
        ...alertHistory.map((history) => ({ id: history.alertId, name: history.alertName })),
    ];

    const dateFilters = [
        { id: 'all', label: 'All Time' },
        { id: 'today', label: 'Today' },
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' },
    ];

    const filteredHistory = alertHistory.filter((history) => {
        const matchesSearch =
            history.alertName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            history.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        const matchesAlert = selectedAlert === 'all' || history.alertId === selectedAlert;

        let matchesDate = true;
        if (dateFilter !== 'all') {
            const triggeredDate = new Date(history.triggeredAt);
            const now = new Date();

            switch (dateFilter) {
                case 'today':
                    matchesDate = triggeredDate.toDateString() === now.toDateString();
                    break;
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    matchesDate = triggeredDate >= weekAgo;
                    break;
                case 'month':
                    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    matchesDate = triggeredDate >= monthAgo;
                    break;
            }
        }

        return matchesSearch && matchesAlert && matchesDate;
    });

    const sortedHistory = [...filteredHistory].sort((a, b) => {
        switch (sortBy) {
            case 'triggered-date':
                return new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime();
            case 'jobs-found':
                return b.jobsFound - a.jobsFound;
            case 'alert-name':
                return a.alertName.localeCompare(b.alertName);
            default:
                return 0;
        }
    });

    const getMatchScoreColor = (score: number) => {
        if (score >= 90) return 'bg-green-100 text-green-800 border-green-200';
        if (score >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
        if (score >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200';
    };

    const formatSalary = (salary: { min: number; max: number; currency: string }) => {
        return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
        if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)} days ago`;
        return `${Math.floor(diffInMinutes / 10080)} weeks ago`;
    };

    const getDateFilterLabel = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();

        if (date.toDateString() === now.toDateString()) return 'Today';
        if (date >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)) return 'This Week';
        if (date >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)) return 'This Month';
        return date.toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <ClockIcon className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Alert History</h1>
                </div>
                <p className="text-gray-600">
                    Track when your job alerts were triggered and what jobs were found
                </p>
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Stats Overview */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Triggers</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {alertHistory.length}
                                </p>
                            </div>
                            <BellIcon className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Jobs Found
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {alertHistory.reduce(
                                        (sum, history) => sum + history.jobsFound,
                                        0,
                                    )}
                                </p>
                            </div>
                            <EyeIcon className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Avg. Jobs per Alert
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {Math.round(
                                        alertHistory.reduce(
                                            (sum, history) => sum + history.jobsFound,
                                            0,
                                        ) / alertHistory.length,
                                    )}
                                </p>
                            </div>
                            <UsersIcon className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Last Trigger</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {getTimeAgo(alertHistory[0]?.triggeredAt || '').split(' ')[0]}
                                </p>
                            </div>
                            <CalendarIcon className="h-8 w-8 text-orange-500" />
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <div className="flex items-center space-x-4">
                            <select
                                value={selectedAlert}
                                onChange={(e) => setSelectedAlert(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                {alerts.map((alert) => (
                                    <option key={alert.id} value={alert.id}>
                                        {alert.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                {dateFilters.map((filter) => (
                                    <option key={filter.id} value={filter.id}>
                                        {filter.label}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="triggered-date">Triggered Date</option>
                                <option value="jobs-found">Jobs Found</option>
                                <option value="alert-name">Alert Name</option>
                            </select>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search alerts or keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Alert History List */}
                <div className="space-y-4">
                    {sortedHistory.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                            <ClockIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No alert history found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your filters or search terms
                            </p>
                        </div>
                    ) : (
                        sortedHistory.map((history) => (
                            <motion.div
                                key={history.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-2xl bg-white p-6 shadow-lg"
                            >
                                <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                                    <div className="flex-1">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div>
                                                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                                    {history.alertName}
                                                </h3>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span className="flex items-center">
                                                        <ClockIcon className="mr-1 h-4 w-4" />
                                                        {getTimeAgo(history.triggeredAt)}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <BellIcon className="mr-1 h-4 w-4" />
                                                        {history.jobsFound} jobs found
                                                    </span>
                                                    <span className="flex items-center">
                                                        <CalendarIcon className="mr-1 h-4 w-4" />
                                                        {getDateFilterLabel(history.triggeredAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Keywords
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {history.keywords.map((keyword, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                                                        >
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Locations
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {history.locations.map((location, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                                                        >
                                                            <MapPinIcon className="mr-1 h-3 w-3" />
                                                            {location}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Job Types
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {history.jobTypes.map((type, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800"
                                                        >
                                                            <BriefcaseIcon className="mr-1 h-3 w-3" />
                                                            {type}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Experience Levels
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {history.experienceLevels.map(
                                                        (level, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800"
                                                            >
                                                                <AcademicCapIcon className="mr-1 h-3 w-3" />
                                                                {level}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Salary Range
                                                </h4>
                                                <div className="text-sm text-gray-600">
                                                    {formatSalary(history.salaryRange)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="mb-2 font-medium text-gray-900">
                                                Industries
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {history.industries.map((industry, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800"
                                                    >
                                                        {industry}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Job Matches */}
                                <div className="mt-6 border-t border-gray-200 pt-6">
                                    <h4 className="mb-4 font-medium text-gray-900">
                                        Job Matches ({history.jobs.length})
                                    </h4>
                                    <div className="space-y-3">
                                        {history.jobs.map((job) => (
                                            <div
                                                key={job.id}
                                                className="rounded-lg border border-gray-200 p-4"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="mb-2 flex items-center space-x-2">
                                                            <h5 className="font-medium text-gray-900">
                                                                {job.title}
                                                            </h5>
                                                            <span
                                                                className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getMatchScoreColor(job.matchScore)}`}
                                                            >
                                                                {job.matchScore}% match
                                                            </span>
                                                        </div>

                                                        <p className="mb-2 text-gray-600">
                                                            {job.company}
                                                        </p>

                                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                                                <MapPinIcon className="mr-1 h-3 w-3" />
                                                                {job.location}
                                                            </span>
                                                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                                                <BriefcaseIcon className="mr-1 h-3 w-3" />
                                                                {job.type}
                                                            </span>
                                                            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                                                <AcademicCapIcon className="mr-1 h-3 w-3" />
                                                                {job.experience}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                            <span>{formatSalary(job.salary)}</span>
                                                            <span className="flex items-center">
                                                                <StarIcon className="mr-1 h-4 w-4" />
                                                                {job.companyRating} (
                                                                {job.companyReviews} reviews)
                                                            </span>
                                                            <span>
                                                                Posted: {getTimeAgo(job.postedDate)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-end space-y-2">
                                                        <button
                                                            onClick={() =>
                                                                setShowJobDetails(
                                                                    showJobDetails === job.id
                                                                        ? null
                                                                        : job.id,
                                                                )
                                                            }
                                                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                        >
                                                            {showJobDetails === job.id
                                                                ? 'Hide Details'
                                                                : 'Show Details'}
                                                        </button>
                                                    </div>
                                                </div>

                                                {showJobDetails === job.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="mt-4 border-t border-gray-200 pt-4"
                                                    >
                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            <div>
                                                                <h6 className="mb-2 font-medium text-gray-900">
                                                                    Match Reasons
                                                                </h6>
                                                                <ul className="space-y-1">
                                                                    {job.matchReasons.map(
                                                                        (reason, index) => (
                                                                            <li
                                                                                key={index}
                                                                                className="flex items-start text-sm text-gray-600"
                                                                            >
                                                                                <span className="mr-2 text-green-600">
                                                                                    •
                                                                                </span>
                                                                                {reason}
                                                                            </li>
                                                                        ),
                                                                    )}
                                                                </ul>
                                                            </div>

                                                            <div>
                                                                <h6 className="mb-2 font-medium text-gray-900">
                                                                    Skills & Tags
                                                                </h6>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {job.tags.map((tag, index) => (
                                                                        <span
                                                                            key={index}
                                                                            className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                                                                        >
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 flex items-center space-x-4">
                                                            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                                                View Job
                                                            </button>
                                                            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50">
                                                                Apply Now
                                                            </button>
                                                            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50">
                                                                Save Job
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        ))}
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
