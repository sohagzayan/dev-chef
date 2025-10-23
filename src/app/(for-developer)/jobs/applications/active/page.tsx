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
    EnvelopeIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    MapPinIcon,
    PhoneIcon,
    StarIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ActiveApplication {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
    experience: 'Entry' | 'Mid' | 'Senior' | 'Lead';
    salary: {
        min: number;
        max: number;
        currency: string;
    };
    postedDate: string;
    appliedDate: string;
    lastUpdated: string;
    status: 'applied' | 'reviewing' | 'interviewing' | 'offer' | 'rejected' | 'withdrawn';
    applicationId: string;
    views: number;
    applications: number;
    tags: string[];
    description: string;
    companyRating: number;
    companyReviews: number;
    nextSteps?: string;
    notes?: string;
    recruiterContact?: {
        name: string;
        email: string;
        phone?: string;
    };
    interviewScheduled?: {
        date: string;
        time: string;
        type: 'phone' | 'video' | 'onsite';
        interviewer: string;
    };
    expectedResponseDate?: string;
    priority: 'high' | 'medium' | 'low';
}

export default function ActiveApplicationsPage() {
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('applied-date');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');

    const activeApplications: ActiveApplication[] = [
        {
            id: '1',
            title: 'Senior Frontend Developer',
            company: 'TechCorp',
            companyLogo:
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
            location: 'San Francisco',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 120000, max: 180000, currency: 'USD' },
            postedDate: '2024-01-10',
            appliedDate: '2024-01-12',
            lastUpdated: '2024-01-15',
            status: 'interviewing',
            applicationId: 'APP-001',
            views: 1247,
            applications: 89,
            tags: ['React', 'TypeScript', 'Next.js', 'CSS'],
            description:
                'We are looking for a Senior Frontend Developer to join our growing team and help build amazing user experiences.',
            companyRating: 4.5,
            companyReviews: 234,
            nextSteps: 'Technical interview scheduled for next week',
            notes: 'Great company culture, good tech stack, high salary range',
            recruiterContact: {
                name: 'Sarah Johnson',
                email: 'sarah.johnson@techcorp.com',
                phone: '+1-555-0123',
            },
            interviewScheduled: {
                date: '2024-01-22',
                time: '10:00 AM PST',
                type: 'video',
                interviewer: 'Mike Chen (Engineering Manager)',
            },
            expectedResponseDate: '2024-01-25',
            priority: 'high',
        },
        {
            id: '2',
            title: 'DevOps Engineer',
            company: 'CloudScale',
            companyLogo:
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop',
            location: 'New York',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 110000, max: 160000, currency: 'USD' },
            postedDate: '2024-01-08',
            appliedDate: '2024-01-11',
            lastUpdated: '2024-01-14',
            status: 'reviewing',
            applicationId: 'APP-002',
            views: 1567,
            applications: 123,
            tags: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
            description:
                'Help us build and maintain our cloud infrastructure and deployment pipelines.',
            companyRating: 4.7,
            companyReviews: 298,
            nextSteps: 'Application under review, expect response within 1-2 weeks',
            notes: 'Interesting infrastructure work, good location, competitive pay',
            expectedResponseDate: '2024-01-25',
            priority: 'medium',
        },
        {
            id: '3',
            title: 'Machine Learning Engineer',
            company: 'AITech',
            companyLogo:
                'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=150&h=150&fit=crop',
            location: 'Berlin',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 80000, max: 120000, currency: 'EUR' },
            postedDate: '2024-01-11',
            appliedDate: '2024-01-13',
            lastUpdated: '2024-01-16',
            status: 'offer',
            applicationId: 'APP-003',
            views: 1987,
            applications: 156,
            tags: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
            description: 'Build and deploy machine learning models that solve real-world problems.',
            companyRating: 4.6,
            companyReviews: 223,
            nextSteps: 'Offer received! Review and respond by end of week',
            notes: 'Exciting ML work, international opportunity, good work-life balance',
            recruiterContact: {
                name: 'Hans Mueller',
                email: 'hans.mueller@aitech.de',
            },
            expectedResponseDate: '2024-01-19',
            priority: 'high',
        },
        {
            id: '4',
            title: 'Product Manager',
            company: 'ProductLab',
            companyLogo:
                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop',
            location: 'Toronto',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 85000, max: 110000, currency: 'CAD' },
            postedDate: '2024-01-13',
            appliedDate: '2024-01-14',
            lastUpdated: '2024-01-18',
            status: 'applied',
            applicationId: 'APP-005',
            views: 654,
            applications: 78,
            tags: ['Product Strategy', 'User Research', 'Agile', 'Analytics'],
            description: 'Lead product development from ideation to launch and beyond.',
            companyRating: 4.2,
            companyReviews: 134,
            nextSteps: 'Application submitted, waiting for initial review',
            notes: 'Leadership opportunity, good salary for Toronto, growing company',
            expectedResponseDate: '2024-01-28',
            priority: 'medium',
        },
        {
            id: '5',
            title: 'Full Stack Developer',
            company: 'InnovateTech',
            companyLogo:
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
            location: 'Remote',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 90000, max: 130000, currency: 'USD' },
            postedDate: '2024-01-12',
            appliedDate: '2024-01-13',
            lastUpdated: '2024-01-17',
            status: 'reviewing',
            applicationId: 'APP-006',
            views: 892,
            applications: 67,
            tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
            description:
                'Join our team to build scalable web applications using modern technologies.',
            companyRating: 4.3,
            companyReviews: 156,
            nextSteps: 'Technical assessment scheduled for this week',
            notes: 'Strong match for your full-stack skills, remote work aligns with preferences',
            expectedResponseDate: '2024-01-26',
            priority: 'low',
        },
    ];

    const statusFilters = [
        { value: 'all', label: 'All Active', count: activeApplications.length },
        {
            value: 'applied',
            label: 'Applied',
            count: activeApplications.filter((app) => app.status === 'applied').length,
        },
        {
            value: 'reviewing',
            label: 'Under Review',
            count: activeApplications.filter((app) => app.status === 'reviewing').length,
        },
        {
            value: 'interviewing',
            label: 'Interviewing',
            count: activeApplications.filter((app) => app.status === 'interviewing').length,
        },
        {
            value: 'offer',
            label: 'Offer Received',
            count: activeApplications.filter((app) => app.status === 'offer').length,
        },
    ];

    const priorityFilters = [
        { value: 'all', label: 'All Priorities' },
        { value: 'high', label: 'High Priority' },
        { value: 'medium', label: 'Medium Priority' },
        { value: 'low', label: 'Low Priority' },
    ];

    const filteredApplications = activeApplications.filter(
        (app) =>
            (selectedStatus === 'all' || app.status === selectedStatus) &&
            (priorityFilter === 'all' || app.priority === priorityFilter) &&
            (app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
    );

    const sortedApplications = [...filteredApplications].sort((a, b) => {
        switch (sortBy) {
            case 'applied-date':
                return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
            case 'last-updated':
                return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
            case 'posted-date':
                return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
            case 'salary':
                return b.salary.min - a.salary.min;
            case 'company-rating':
                return b.companyRating - a.companyRating;
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            default:
                return 0;
        }
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'applied':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'reviewing':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'interviewing':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'offer':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'applied':
                return <DocumentTextIcon className="h-4 w-4" />;
            case 'reviewing':
                return <ClockIcon className="h-4 w-4" />;
            case 'interviewing':
                return <ChatBubbleLeftRightIcon className="h-4 w-4" />;
            case 'offer':
                return <CheckCircleIcon className="h-4 w-4" />;
            default:
                return <DocumentTextIcon className="h-4 w-4" />;
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
        const formatNumber = (num: number) => {
            if (num >= 1000) {
                return `${(num / 1000).toFixed(0)}k`;
            }
            return num.toString();
        };
        return `${salary.currency} ${formatNumber(salary.min)} - ${formatNumber(salary.max)}`;
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return '1 day ago';
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
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Internship':
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
                    <ClockIcon className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Active Applications</h1>
                </div>
                <p className="text-gray-600">
                    Track your ongoing job applications and their current status
                </p>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Active</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {activeApplications.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-purple-100 p-2">
                            <ChatBubbleLeftRightIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Interviewing</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {
                                    activeApplications.filter(
                                        (app) => app.status === 'interviewing',
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-green-100 p-2">
                            <CheckCircleIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Offers</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {activeApplications.filter((app) => app.status === 'offer').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-yellow-100 p-2">
                            <ClockIcon className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Under Review</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {
                                    activeApplications.filter((app) => app.status === 'reviewing')
                                        .length
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Filters */}
            <div className="mb-6 rounded-2xl bg-white p-4 shadow-lg">
                <div className="flex flex-wrap gap-2">
                    {statusFilters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setSelectedStatus(filter.value)}
                            className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                                selectedStatus === filter.value
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <span className="flex items-center space-x-2">
                                <span>{filter.label}</span>
                                <span
                                    className={`rounded-full px-2 py-1 text-xs font-bold ${
                                        selectedStatus === filter.value
                                            ? 'bg-white/20 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {filter.count}
                                </span>
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Search, Sort, and Priority Filters */}
            <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                    <div className="max-w-md flex-1">
                        <input
                            type="text"
                            placeholder="Search active applications..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            {priorityFilters.map((filter) => (
                                <option key={filter.value} value={filter.value}>
                                    {filter.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="applied-date">Sort by Applied Date</option>
                            <option value="last-updated">Sort by Last Updated</option>
                            <option value="posted-date">Sort by Posted Date</option>
                            <option value="salary">Sort by Salary</option>
                            <option value="company-rating">Sort by Company Rating</option>
                            <option value="priority">Sort by Priority</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {sortedApplications.map((app) => (
                    <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="p-6">
                            <div className="flex items-start space-x-4">
                                {/* Company Logo */}
                                <img
                                    src={app.companyLogo}
                                    alt={app.company}
                                    className="h-16 w-16 rounded-xl object-cover"
                                />

                                {/* Application Details */}
                                <div className="flex-1">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center space-x-3">
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {app.title}
                                                </h3>
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${getStatusColor(app.status)}`}
                                                >
                                                    {getStatusIcon(app.status)}
                                                    <span className="ml-1 capitalize">
                                                        {app.status}
                                                    </span>
                                                </span>
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getPriorityColor(app.priority)}`}
                                                >
                                                    {app.priority} Priority
                                                </span>
                                            </div>

                                            <div className="mb-3 flex items-center space-x-4">
                                                <h4 className="font-medium text-gray-900">
                                                    {app.company}
                                                </h4>
                                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                    <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                                                    <span>{app.companyRating}</span>
                                                    <span>({app.companyReviews} reviews)</span>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="mb-3 flex items-center space-x-2">
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getExperienceColor(app.experience)}`}
                                                >
                                                    {app.experience}
                                                </span>
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getTypeColor(app.type)}`}
                                                >
                                                    {app.type}
                                                </span>
                                                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    {app.location}
                                                </span>
                                            </div>

                                            {/* Skills Tags */}
                                            <div className="mb-3 flex flex-wrap gap-2">
                                                {app.tags.slice(0, 5).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {app.tags.length > 5 && (
                                                    <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600">
                                                        +{app.tags.length - 5} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Application Info */}
                                    <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                                            <div className="flex items-center space-x-2">
                                                <DocumentTextIcon className="h-4 w-4 text-blue-600" />
                                                <span className="font-medium text-blue-800">
                                                    ID: {app.applicationId}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <CalendarIcon className="h-4 w-4 text-blue-600" />
                                                <span className="text-blue-800">
                                                    Applied {getTimeAgo(app.appliedDate)}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <ArrowPathIcon className="h-4 w-4 text-blue-600" />
                                                <span className="text-blue-800">
                                                    Updated {getTimeAgo(app.lastUpdated)}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <CurrencyDollarIcon className="h-4 w-4 text-blue-600" />
                                                <span className="text-blue-800">
                                                    {formatSalary(app.salary)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Next Steps */}
                                    {app.nextSteps && (
                                        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
                                            <h5 className="mb-1 text-sm font-medium text-green-800">
                                                Next Steps:
                                            </h5>
                                            <p className="text-sm text-green-700">
                                                {app.nextSteps}
                                            </p>
                                        </div>
                                    )}

                                    {/* Interview Details */}
                                    {app.interviewScheduled && (
                                        <div className="mb-4 rounded-lg border border-purple-200 bg-purple-50 p-3">
                                            <h5 className="mb-2 text-sm font-medium text-purple-800">
                                                Interview Scheduled:
                                            </h5>
                                            <div className="grid grid-cols-2 gap-4 text-sm text-purple-700">
                                                <div>
                                                    <span className="font-medium">Date:</span>{' '}
                                                    {app.interviewScheduled.date}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Time:</span>{' '}
                                                    {app.interviewScheduled.time}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Type:</span>{' '}
                                                    {app.interviewScheduled.type}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        Interviewer:
                                                    </span>{' '}
                                                    {app.interviewScheduled.interviewer}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Expected Response */}
                                    {app.expectedResponseDate && (
                                        <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                                            <h5 className="mb-1 text-sm font-medium text-yellow-800">
                                                Expected Response:
                                            </h5>
                                            <p className="text-sm text-yellow-700">
                                                Response expected by{' '}
                                                <span className="font-medium">
                                                    {app.expectedResponseDate}
                                                </span>
                                            </p>
                                        </div>
                                    )}

                                    {/* Recruiter Contact */}
                                    {app.recruiterContact && (
                                        <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
                                            <h5 className="mb-2 text-sm font-medium text-gray-800">
                                                Recruiter Contact:
                                            </h5>
                                            <div className="flex items-center space-x-4 text-sm text-gray-700">
                                                <div className="flex items-center space-x-2">
                                                    <EnvelopeIcon className="h-4 w-4" />
                                                    <span>{app.recruiterContact.email}</span>
                                                </div>
                                                {app.recruiterContact.phone && (
                                                    <div className="flex items-center space-x-2">
                                                        <PhoneIcon className="h-4 w-4" />
                                                        <span>{app.recruiterContact.phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Notes */}
                                    {app.notes && (
                                        <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                                            <h5 className="mb-1 text-sm font-medium text-yellow-800">
                                                Your Notes:
                                            </h5>
                                            <p className="text-sm text-yellow-700">{app.notes}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-3">
                                            <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                                View Details
                                            </button>
                                            <button className="rounded-lg bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                                Update Status
                                            </button>
                                            {app.status === 'interviewing' && (
                                                <button className="rounded-lg bg-green-600 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-green-700">
                                                    Schedule Interview
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-1">
                                                <EyeIcon className="h-4 w-4" />
                                                <span>{app.views}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <UsersIcon className="h-4 w-4" />
                                                <span>{app.applications}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {sortedApplications.length === 0 && (
                <div className="py-12 text-center">
                    <ClockIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                        No active applications found
                    </h3>
                    <p className="text-gray-600">
                        {searchQuery || selectedStatus !== 'all' || priorityFilter !== 'all'
                            ? 'Try adjusting your search criteria or filters.'
                            : 'Start applying to jobs to track your applications here.'}
                    </p>
                </div>
            )}
        </div>
    );
}
