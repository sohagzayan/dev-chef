'use client';

import { useState } from 'react';
import {
    ArrowPathIcon,
    CalendarIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    HandThumbDownIcon,
    HandThumbUpIcon,
    MapPinIcon,
    StarIcon,
    UsersIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface CompletedApplication {
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
    completedDate: string;
    status: 'accepted' | 'rejected' | 'withdrawn' | 'expired';
    applicationId: string;
    views: number;
    applications: number;
    tags: string[];
    description: string;
    companyRating: number;
    companyReviews: number;
    outcome: 'positive' | 'negative' | 'neutral';
    feedback?: string;
    lessonsLearned?: string[];
    notes?: string;
    recruiterContact?: { name: string; email: string; phone?: string };
}

export default function CompletedApplicationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortBy, setSortBy] = useState('completed-date');
    const [outcomeFilter, setOutcomeFilter] = useState<string>('all');

    const completedApplications: CompletedApplication[] = [
        {
            id: '1',
            title: 'Senior Software Engineer',
            company: 'TechCorp Inc.',
            companyLogo: 'TC',
            location: 'San Francisco, CA',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 130000, max: 190000, currency: 'USD' },
            postedDate: '2024-01-10',
            appliedDate: '2024-01-15',
            completedDate: '2024-01-30',
            status: 'accepted',
            applicationId: 'APP-001',
            views: 78,
            applications: 45,
            tags: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
            description: 'We are looking for a Senior Software Engineer to join our team...',
            companyRating: 4.3,
            companyReviews: 234,
            outcome: 'positive',
            feedback:
                'Excellent technical skills and cultural fit. Strong problem-solving abilities.',
            lessonsLearned: [
                'Preparation for system design questions paid off',
                'Company research helped in cultural fit assessment',
            ],
            notes: 'Great opportunity, excited to start!',
            recruiterContact: {
                name: 'Sarah Johnson',
                email: 'sarah.j@techcorp.com',
                phone: '+1 (555) 123-4567',
            },
        },
        {
            id: '2',
            title: 'Frontend Developer',
            company: 'StartupXYZ',
            companyLogo: 'SX',
            location: 'Remote',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 85000, max: 120000, currency: 'USD' },
            postedDate: '2024-01-12',
            appliedDate: '2024-01-18',
            completedDate: '2024-01-28',
            status: 'rejected',
            applicationId: 'APP-002',
            views: 45,
            applications: 28,
            tags: ['React', 'TypeScript', 'CSS', 'UI/UX'],
            description: 'Join our fast-growing startup as a Frontend Developer...',
            companyRating: 4.1,
            companyReviews: 89,
            outcome: 'negative',
            feedback: 'Good technical skills but lacked experience with our specific tech stack.',
            lessonsLearned: [
                'Need to practice more with TypeScript',
                'Should research company tech stack better',
            ],
            notes: 'Good learning experience, will apply lessons to future applications',
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
            salary: { min: 140000, max: 200000, currency: 'USD' },
            postedDate: '2024-01-08',
            appliedDate: '2024-01-14',
            completedDate: '2024-01-25',
            status: 'withdrawn',
            applicationId: 'APP-003',
            views: 67,
            applications: 38,
            tags: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
            description: 'We are seeking a DevOps Engineer to help scale our infrastructure...',
            companyRating: 3.7,
            companyReviews: 156,
            outcome: 'neutral',
            feedback: 'Application was strong but position was put on hold.',
            lessonsLearned: [
                'Sometimes external factors affect hiring decisions',
                'Keep applications active until final decision',
            ],
            notes: 'Position put on hold, will reconsider if it reopens',
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
            salary: { min: 120000, max: 170000, currency: 'USD' },
            postedDate: '2024-01-15',
            appliedDate: '2024-01-22',
            completedDate: '2024-02-01',
            status: 'rejected',
            applicationId: 'APP-004',
            views: 52,
            applications: 31,
            tags: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
            description: 'Join our AI team to develop cutting-edge machine learning models...',
            companyRating: 4.6,
            companyReviews: 78,
            outcome: 'negative',
            feedback: 'Strong ML background but needed more experience with production systems.',
            lessonsLearned: [
                'Focus on production ML experience',
                'Practice system design for ML applications',
            ],
            notes: 'Great company, will reapply when I have more production experience',
            recruiterContact: { name: 'David Kim', email: 'david.kim@aiinnovations.com' },
        },
        {
            id: '5',
            title: 'Product Manager',
            company: 'Innovation Labs',
            companyLogo: 'IL',
            location: 'Austin, TX',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 110000, max: 150000, currency: 'USD' },
            postedDate: '2024-01-05',
            appliedDate: '2024-01-12',
            completedDate: '2024-01-20',
            status: 'expired',
            applicationId: 'APP-005',
            views: 34,
            applications: 22,
            tags: ['Product Strategy', 'User Research', 'Agile', 'Data Analysis'],
            description: 'We are looking for a Product Manager to drive product strategy...',
            companyRating: 4.0,
            companyReviews: 112,
            outcome: 'neutral',
            feedback: 'Position was filled internally before external applications were reviewed.',
            lessonsLearned: [
                'Apply early to avoid position being filled',
                'Network with company employees',
            ],
            notes: 'Timing issue, will keep an eye on future openings',
            recruiterContact: { name: 'Alex Thompson', email: 'alex.thompson@innovationlabs.com' },
        },
    ];

    const statusFilters = [
        { id: 'all', label: 'All Statuses', count: completedApplications.length },
        {
            id: 'accepted',
            label: 'Accepted',
            count: completedApplications.filter((app) => app.status === 'accepted').length,
        },
        {
            id: 'rejected',
            label: 'Rejected',
            count: completedApplications.filter((app) => app.status === 'rejected').length,
        },
        {
            id: 'withdrawn',
            label: 'Withdrawn',
            count: completedApplications.filter((app) => app.status === 'withdrawn').length,
        },
        {
            id: 'expired',
            label: 'Expired',
            count: completedApplications.filter((app) => app.status === 'expired').length,
        },
    ];

    const outcomeFilters = [
        { id: 'all', label: 'All Outcomes', count: completedApplications.length },
        {
            id: 'positive',
            label: 'Positive',
            count: completedApplications.filter((app) => app.outcome === 'positive').length,
        },
        {
            id: 'negative',
            label: 'Negative',
            count: completedApplications.filter((app) => app.outcome === 'negative').length,
        },
        {
            id: 'neutral',
            label: 'Neutral',
            count: completedApplications.filter(
                (app) => app.status === 'withdrawn' || app.status === 'expired',
            ).length,
        },
    ];

    const filteredApplications = completedApplications.filter((app) => {
        const matchesSearch =
            app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
        const matchesOutcome = outcomeFilter === 'all' || app.outcome === outcomeFilter;

        return matchesSearch && matchesStatus && matchesOutcome;
    });

    const sortedApplications = [...filteredApplications].sort((a, b) => {
        switch (sortBy) {
            case 'completed-date':
                return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
            case 'applied-date':
                return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
            case 'company-rating':
                return b.companyRating - a.companyRating;
            case 'salary':
                return b.salary.max - a.salary.max;
            default:
                return 0;
        }
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'accepted':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'withdrawn':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'expired':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'accepted':
                return <CheckCircleIcon className="h-4 w-4" />;
            case 'rejected':
                return <XCircleIcon className="h-4 w-4" />;
            case 'withdrawn':
                return <ArrowPathIcon className="h-4 w-4" />;
            case 'expired':
                return <CalendarIcon className="h-4 w-4" />;
            default:
                return <CheckCircleIcon className="h-4 w-4" />;
        }
    };

    const getOutcomeIcon = (outcome: string) => {
        switch (outcome) {
            case 'positive':
                return <HandThumbUpIcon className="h-4 w-4 text-green-600" />;
            case 'negative':
                return <HandThumbDownIcon className="h-4 w-4 text-red-600" />;
            case 'neutral':
                return <ArrowPathIcon className="h-4 w-4 text-yellow-600" />;
            default:
                return <ArrowPathIcon className="h-4 w-4 text-gray-600" />;
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
                    <CheckCircleIcon className="h-8 w-8 text-green-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Completed Applications</h1>
                </div>
                <p className="text-gray-600">
                    Review your completed job applications and learn from the outcomes
                </p>
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Stats Overview */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Completed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {completedApplications.length}
                                </p>
                            </div>
                            <CheckCircleIcon className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Accepted</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {
                                        completedApplications.filter(
                                            (app) => app.status === 'accepted',
                                        ).length
                                    }
                                </p>
                            </div>
                            <HandThumbUpIcon className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Rejected</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {
                                        completedApplications.filter(
                                            (app) => app.status === 'rejected',
                                        ).length
                                    }
                                </p>
                            </div>
                            <HandThumbDownIcon className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {Math.round(
                                        (completedApplications.filter(
                                            (app) => app.status === 'accepted',
                                        ).length /
                                            completedApplications.length) *
                                            100,
                                    )}
                                    %
                                </p>
                            </div>
                            <ArrowPathIcon className="h-8 w-8 text-blue-500" />
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
                                value={outcomeFilter}
                                onChange={(e) => setOutcomeFilter(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                {outcomeFilters.map((filter) => (
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
                                <option value="completed-date">Completed Date</option>
                                <option value="applied-date">Applied Date</option>
                                <option value="company-rating">Company Rating</option>
                                <option value="salary">Salary</option>
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
                            <CheckCircleIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                    {sortedApplications.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                            <CheckCircleIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No completed applications found
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
                                                    <div className="flex items-center space-x-2">
                                                        {getOutcomeIcon(application.outcome)}
                                                        <span
                                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(application.status)}`}
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
                                                        Completed:{' '}
                                                        {getTimeAgo(application.completedDate)}
                                                    </span>
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

                                {application.feedback && (
                                    <div className="mt-4 border-t border-gray-200 pt-4">
                                        <h4 className="mb-2 font-medium text-gray-900">Feedback</h4>
                                        <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                                            {application.feedback}
                                        </p>
                                    </div>
                                )}

                                {application.lessonsLearned &&
                                    application.lessonsLearned.length > 0 && (
                                        <div className="mt-4 border-t border-gray-200 pt-4">
                                            <h4 className="mb-2 font-medium text-gray-900">
                                                Lessons Learned
                                            </h4>
                                            <ul className="space-y-1">
                                                {application.lessonsLearned.map((lesson, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-start text-sm text-gray-600"
                                                    >
                                                        <span className="mr-2 text-blue-600">
                                                            •
                                                        </span>
                                                        {lesson}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                {application.notes && (
                                    <div className="mt-4 border-t border-gray-200 pt-4">
                                        <h4 className="mb-2 font-medium text-gray-900">Notes</h4>
                                        <p className="text-sm text-gray-600">{application.notes}</p>
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
