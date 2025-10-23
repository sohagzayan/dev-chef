'use client';

import { useState } from 'react';
import {
    ArrowPathIcon,
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    MapPinIcon,
    StarIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface PendingApplication {
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
    lastUpdated: string;
    status: 'pending' | 'under-review' | 'screening' | 'assessment';
    applicationId: string;
    views: number;
    applications: number;
    tags: string[];
    description: string;
    companyRating: number;
    companyReviews: number;
    expectedResponseDate?: string;
    priority: 'high' | 'medium' | 'low';
    notes?: string;
    recruiterContact?: { name: string; email: string; phone?: string };
}

export default function PendingApplicationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortBy, setSortBy] = useState('applied-date');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');

    const pendingApplications: PendingApplication[] = [
        {
            id: '1',
            title: 'Senior Frontend Developer',
            company: 'TechCorp Inc.',
            companyLogo: 'TC',
            location: 'San Francisco, CA',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 120000, max: 180000, currency: 'USD' },
            postedDate: '2024-01-15',
            appliedDate: '2024-01-20',
            lastUpdated: '2024-01-25',
            status: 'under-review',
            applicationId: 'APP-001',
            views: 45,
            applications: 23,
            tags: ['React', 'TypeScript', 'Next.js', 'UI/UX'],
            description: 'We are looking for a Senior Frontend Developer to join our team...',
            companyRating: 4.2,
            companyReviews: 156,
            expectedResponseDate: '2024-02-05',
            priority: 'high',
            notes: 'Great company culture, good tech stack match',
            recruiterContact: {
                name: 'Sarah Johnson',
                email: 'sarah.j@techcorp.com',
                phone: '+1 (555) 123-4567',
            },
        },
        {
            id: '2',
            title: 'Full Stack Engineer',
            company: 'StartupXYZ',
            companyLogo: 'SX',
            location: 'Remote',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 90000, max: 130000, currency: 'USD' },
            postedDate: '2024-01-18',
            appliedDate: '2024-01-22',
            lastUpdated: '2024-01-24',
            status: 'screening',
            applicationId: 'APP-002',
            views: 32,
            applications: 18,
            tags: ['Node.js', 'React', 'MongoDB', 'AWS'],
            description: 'Join our fast-growing startup as a Full Stack Engineer...',
            companyRating: 4.5,
            companyReviews: 89,
            expectedResponseDate: '2024-02-01',
            priority: 'medium',
            notes: 'Exciting startup, equity opportunity',
            recruiterContact: { name: 'Mike Chen', email: 'mike.chen@startupxyz.com' },
        },
        {
            id: '3',
            title: 'DevOps Engineer',
            company: 'Enterprise Solutions',
            companyLogo: 'ES',
            location: 'New York, NY',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 130000, max: 190000, currency: 'USD' },
            postedDate: '2024-01-12',
            appliedDate: '2024-01-19',
            lastUpdated: '2024-01-26',
            status: 'pending',
            applicationId: 'APP-003',
            views: 67,
            applications: 34,
            tags: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
            description: 'We are seeking a DevOps Engineer to help scale our infrastructure...',
            companyRating: 3.8,
            companyReviews: 234,
            expectedResponseDate: '2024-02-10',
            priority: 'low',
            notes: 'Large company, stable position',
            recruiterContact: {
                name: 'Lisa Rodriguez',
                email: 'lisa.rodriguez@enterprisesolutions.com',
            },
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
            postedDate: '2024-01-20',
            appliedDate: '2024-01-25',
            lastUpdated: '2024-01-27',
            status: 'assessment',
            applicationId: 'APP-004',
            views: 28,
            applications: 15,
            tags: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
            description: 'Join our AI team to develop cutting-edge machine learning models...',
            companyRating: 4.7,
            companyReviews: 67,
            expectedResponseDate: '2024-02-03',
            priority: 'high',
            notes: 'Perfect role for my ML background',
            recruiterContact: { name: 'David Kim', email: 'david.kim@aiinnovations.com' },
        },
    ];

    const statusFilters = [
        { id: 'all', label: 'All Statuses', count: pendingApplications.length },
        {
            id: 'pending',
            label: 'Pending',
            count: pendingApplications.filter((app) => app.status === 'pending').length,
        },
        {
            id: 'under-review',
            label: 'Under Review',
            count: pendingApplications.filter((app) => app.status === 'under-review').length,
        },
        {
            id: 'screening',
            label: 'Screening',
            count: pendingApplications.filter((app) => app.status === 'screening').length,
        },
        {
            id: 'assessment',
            label: 'Assessment',
            count: pendingApplications.filter((app) => app.status === 'assessment').length,
        },
    ];

    const priorityFilters = [
        { id: 'all', label: 'All Priorities', count: pendingApplications.length },
        {
            id: 'high',
            label: 'High Priority',
            count: pendingApplications.filter((app) => app.priority === 'high').length,
        },
        {
            id: 'medium',
            label: 'Medium Priority',
            count: pendingApplications.filter((app) => app.priority === 'medium').length,
        },
        {
            id: 'low',
            label: 'Low Priority',
            count: pendingApplications.filter((app) => app.priority === 'low').length,
        },
    ];

    const filteredApplications = pendingApplications.filter((app) => {
        const matchesSearch =
            app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
        const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const sortedApplications = [...filteredApplications].sort((a, b) => {
        switch (sortBy) {
            case 'applied-date':
                return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
            case 'expected-response':
                if (!a.expectedResponseDate || !b.expectedResponseDate) return 0;
                return (
                    new Date(a.expectedResponseDate).getTime() -
                    new Date(b.expectedResponseDate).getTime()
                );
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            case 'company-rating':
                return b.companyRating - a.companyRating;
            default:
                return 0;
        }
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'under-review':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'screening':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'assessment':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <ClockIcon className="h-4 w-4" />;
            case 'under-review':
                return <DocumentTextIcon className="h-4 w-4" />;
            case 'screening':
                return <EyeIcon className="h-4 w-4" />;
            case 'assessment':
                return <CheckCircleIcon className="h-4 w-4" />;
            default:
                return <ClockIcon className="h-4 w-4" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatSalary = (salary: { min: number; max: number; currency: string }) => {
        return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
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

    const getExperienceColor = (experience: string) => {
        switch (experience) {
            case 'Entry':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Mid':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Senior':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Lead':
                return 'bg-orange-100 text-orange-800 border-orange-200';
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
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <ClockIcon className="h-8 w-8 text-yellow-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Pending Applications</h1>
                </div>
                <p className="text-gray-600">
                    Track your applications that are under review or waiting for response
                </p>
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Stats Overview */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Pending</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {pendingApplications.length}
                                </p>
                            </div>
                            <ClockIcon className="h-8 w-8 text-yellow-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Under Review</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {
                                        pendingApplications.filter(
                                            (app) => app.status === 'under-review',
                                        ).length
                                    }
                                </p>
                            </div>
                            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">High Priority</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {
                                        pendingApplications.filter((app) => app.priority === 'high')
                                            .length
                                    }
                                </p>
                            </div>
                            <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Avg. Response Time
                                </p>
                                <p className="text-2xl font-bold text-green-600">5-7 days</p>
                            </div>
                            <ArrowPathIcon className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <div className="flex flex-wrap gap-3">
                            {/* Status Filters */}
                            {statusFilters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setSelectedStatus(filter.id)}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                        selectedStatus === filter.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {filter.label} ({filter.count})
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-3">
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                {priorityFilters.map((filter) => (
                                    <option key={filter.id} value={filter.id}>
                                        {filter.label} ({filter.count})
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="applied-date">Applied Date</option>
                                <option value="expected-response">Expected Response</option>
                                <option value="priority">Priority</option>
                                <option value="company-rating">Company Rating</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search applications..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <ClockIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                    {sortedApplications.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                            <ClockIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No pending applications found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your filters or search terms
                            </p>
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
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
                                                    {application.companyLogo}
                                                </div>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center space-x-2">
                                                    <h3 className="truncate text-lg font-semibold text-gray-900">
                                                        {application.title}
                                                    </h3>
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(application.priority)}`}
                                                    >
                                                        {application.priority
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            application.priority.slice(1)}{' '}
                                                        Priority
                                                    </span>
                                                </div>

                                                <p className="mb-3 text-gray-600">
                                                    {application.company}
                                                </p>

                                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                                        <MapPinIcon className="mr-1 h-3 w-3" />
                                                        {application.location}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${getTypeColor(application.type)}`}
                                                    >
                                                        {application.type}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${getExperienceColor(application.experience)}`}
                                                    >
                                                        {application.experience}
                                                    </span>
                                                </div>

                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>
                                                        Applied:{' '}
                                                        {getTimeAgo(application.appliedDate)}
                                                    </span>
                                                    <span>
                                                        Last updated:{' '}
                                                        {getTimeAgo(application.lastUpdated)}
                                                    </span>
                                                    {application.expectedResponseDate && (
                                                        <span className="font-medium text-orange-600">
                                                            Expected response:{' '}
                                                            {new Date(
                                                                application.expectedResponseDate,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end space-y-3">
                                        <div className="text-right">
                                            <p className="text-lg font-semibold text-gray-900">
                                                {formatSalary(application.salary)}
                                            </p>
                                            <div className="mt-1 flex items-center space-x-1">
                                                <StarIcon className="h-4 w-4 text-yellow-400" />
                                                <span className="text-sm text-gray-600">
                                                    {application.companyRating}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({application.companyReviews} reviews)
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${getStatusColor(application.status)}`}
                                            >
                                                {getStatusIcon(application.status)}
                                                <span className="ml-1">
                                                    {application.status
                                                        .replace('-', ' ')
                                                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                                                </span>
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <span className="flex items-center">
                                                <EyeIcon className="mr-1 h-4 w-4" />
                                                {application.views}
                                            </span>
                                            <span className="flex items-center">
                                                <UsersIcon className="mr-1 h-4 w-4" />
                                                {application.applications} applied
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {application.notes && (
                                    <div className="mt-4 border-t border-gray-200 pt-4">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Notes:</span>{' '}
                                            {application.notes}
                                        </p>
                                    </div>
                                )}

                                {application.recruiterContact && (
                                    <div className="mt-4 border-t border-gray-200 pt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium">Recruiter:</span>{' '}
                                                {application.recruiterContact.name}
                                                {application.recruiterContact.email && (
                                                    <span className="ml-2">
                                                        • {application.recruiterContact.email}
                                                    </span>
                                                )}
                                                {application.recruiterContact.phone && (
                                                    <span className="ml-2">
                                                        • {application.recruiterContact.phone}
                                                    </span>
                                                )}
                                            </div>
                                            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                                Contact Recruiter
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
