'use client';

import { useState } from 'react';
import {
    BriefcaseIcon,
    BuildingOfficeIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    ClockIcon,
    ClockIcon as ClockIconSolid,
    CurrencyDollarIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    StarIcon,
    UsersIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Application {
    id: string;
    jobTitle: string;
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
    appliedDate: string;
    status: 'active' | 'pending' | 'completed' | 'rejected';
    lastUpdate: string;
    views: number;
    applications: number;
    tags: string[];
    description: string;
    requirements: string[];
    benefits: string[];
    companyRating: number;
    companyReviews: number;
    applicationNotes?: string;
    nextStep?: string;
    interviewDate?: string;
    rejectionReason?: string;
}

export default function ApplicationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const statuses = [
        { id: 'all', label: 'All Applications', icon: BriefcaseIcon, count: 0 },
        { id: 'active', label: 'Active', icon: ClockIconSolid, count: 0 },
        { id: 'pending', label: 'Pending', icon: ExclamationTriangleIcon, count: 0 },
        { id: 'completed', icon: CheckCircleIcon, label: 'Completed', count: 0 },
    ];

    const filters = [
        { id: 'all', label: 'All Jobs' },
        { id: 'recent', label: 'Recently Applied' },
        { id: 'high-priority', label: 'High Priority' },
        { id: 'remote', label: 'Remote Only' },
    ];

    const applications: Application[] = [
        {
            id: '1',
            jobTitle: 'Senior Frontend Developer',
            company: 'TechCorp',
            companyLogo:
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
            location: 'San Francisco',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 120000, max: 180000, currency: 'USD' },
            appliedDate: '2024-01-10',
            status: 'active',
            lastUpdate: '2024-01-15',
            views: 1247,
            applications: 89,
            tags: ['React', 'TypeScript', 'Next.js', 'CSS'],
            description:
                'We are looking for a Senior Frontend Developer to join our growing team and help build amazing user experiences.',
            requirements: [
                '5+ years of experience with React and modern JavaScript',
                'Strong understanding of TypeScript and modern CSS',
                'Experience with Next.js and server-side rendering',
                'Knowledge of performance optimization and accessibility',
            ],
            benefits: [
                'Competitive salary and equity',
                'Flexible remote work options',
                'Health, dental, and vision insurance',
                'Professional development budget',
            ],
            companyRating: 4.5,
            companyReviews: 234,
            applicationNotes: 'Great company culture, excited about the role!',
            nextStep: 'Technical interview scheduled for next week',
            interviewDate: '2024-01-22',
        },
        {
            id: '2',
            jobTitle: 'Backend Engineer',
            company: 'DataFlow',
            companyLogo:
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
            location: 'Remote',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 90000, max: 130000, currency: 'USD' },
            appliedDate: '2024-01-12',
            status: 'pending',
            lastUpdate: '2024-01-14',
            views: 892,
            applications: 67,
            tags: ['Python', 'Django', 'PostgreSQL', 'AWS'],
            description:
                'Join our backend team to build scalable APIs and data processing systems.',
            requirements: [
                '3+ years of Python development experience',
                'Experience with Django or similar frameworks',
                'Knowledge of database design and optimization',
                'Familiarity with cloud platforms (AWS, GCP)',
            ],
            benefits: [
                'Remote-first culture',
                'Competitive compensation',
                'Flexible working hours',
                'Learning and development opportunities',
            ],
            companyRating: 4.3,
            companyReviews: 156,
            applicationNotes: 'Remote position, good tech stack',
            nextStep: 'Waiting for initial response',
        },
        {
            id: '3',
            jobTitle: 'DevOps Engineer',
            company: 'CloudScale',
            companyLogo:
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop',
            location: 'New York',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 110000, max: 160000, currency: 'USD' },
            appliedDate: '2024-01-08',
            status: 'completed',
            lastUpdate: '2024-01-20',
            views: 1567,
            applications: 123,
            tags: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
            description:
                'Help us build and maintain our cloud infrastructure and deployment pipelines.',
            requirements: [
                '5+ years of DevOps experience',
                'Expertise in Docker and Kubernetes',
                'Strong AWS knowledge',
                'Experience with infrastructure as code',
            ],
            benefits: [
                'Competitive salary package',
                'Health and wellness benefits',
                'Professional certification support',
                'Modern office in Manhattan',
            ],
            companyRating: 4.7,
            companyReviews: 298,
            applicationNotes: 'Great opportunity, but decided to pursue other options',
            nextStep: 'Application withdrawn',
        },
        {
            id: '4',
            jobTitle: 'UI/UX Designer',
            company: 'DesignHub',
            companyLogo:
                'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop',
            location: 'London',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 65000, max: 85000, currency: 'GBP' },
            appliedDate: '2024-01-15',
            status: 'completed',
            lastUpdate: '2024-01-18',
            views: 734,
            applications: 45,
            tags: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping'],
            description: 'Create beautiful and intuitive user interfaces for our digital products.',
            requirements: [
                '3+ years of UI/UX design experience',
                'Proficiency in Figma and design tools',
                'Strong portfolio showcasing web and mobile designs',
                'Understanding of user-centered design principles',
            ],
            benefits: [
                'Creative and collaborative environment',
                'Flexible working arrangements',
                'Professional development opportunities',
                'Modern design studio in Shoreditch',
            ],
            companyRating: 4.4,
            companyReviews: 187,
            applicationNotes: 'Position filled internally',
            nextStep: 'Application rejected',
            rejectionReason: 'Position filled internally',
        },
        {
            id: '5',
            jobTitle: 'Machine Learning Engineer',
            company: 'AITech',
            companyLogo:
                'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=150&h=150&fit=crop',
            location: 'Berlin',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 80000, max: 120000, currency: 'EUR' },
            appliedDate: '2024-01-11',
            status: 'active',
            lastUpdate: '2024-01-16',
            views: 1987,
            applications: 156,
            tags: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
            description: 'Build and deploy machine learning models that solve real-world problems.',
            requirements: [
                '5+ years of ML engineering experience',
                'Strong Python programming skills',
                'Experience with TensorFlow or PyTorch',
                'Knowledge of MLOps and model deployment',
            ],
            benefits: [
                'Competitive European salary',
                '30 days annual leave',
                'Professional development budget',
                'Modern office in Berlin Mitte',
            ],
            companyRating: 4.6,
            companyReviews: 223,
            applicationNotes: 'Exciting ML role, good company reputation',
            nextStep: 'Technical assessment in progress',
        },
        {
            id: '6',
            jobTitle: 'Product Manager',
            company: 'ProductLab',
            companyLogo:
                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop',
            location: 'Toronto',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 85000, max: 110000, currency: 'CAD' },
            appliedDate: '2024-01-13',
            status: 'pending',
            lastUpdate: '2024-01-15',
            views: 654,
            applications: 78,
            tags: ['Product Strategy', 'User Research', 'Agile', 'Analytics'],
            description: 'Lead product development from ideation to launch and beyond.',
            requirements: [
                '3+ years of product management experience',
                'Strong analytical and strategic thinking',
                'Experience with agile methodologies',
                'Excellent communication and leadership skills',
            ],
            benefits: [
                'Competitive Canadian salary',
                'Comprehensive benefits package',
                'Professional development opportunities',
                'Downtown Toronto office location',
            ],
            companyRating: 4.2,
            companyReviews: 134,
            applicationNotes: 'Good product role, interesting challenges',
            nextStep: 'Application under review',
        },
    ];

    // Update status counts
    statuses.forEach((status) => {
        if (status.id === 'all') {
            status.count = applications.length;
        } else {
            status.count = applications.filter((app) => app.status === status.id).length;
        }
    });

    const getFilteredApplications = () => {
        let filteredApplications = applications;

        // Filter by status
        if (selectedStatus !== 'all') {
            filteredApplications = applications.filter((app) => app.status === selectedStatus);
        }

        // Filter by search query
        if (searchQuery) {
            filteredApplications = filteredApplications.filter(
                (app) =>
                    app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    app.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
            );
        }

        // Apply additional filters
        if (selectedFilter === 'recent') {
            filteredApplications = filteredApplications.filter((app) => {
                const appliedDate = new Date(app.appliedDate);
                const now = new Date();
                const diffInDays = Math.floor(
                    (now.getTime() - appliedDate.getTime()) / (1000 * 60 * 60 * 24),
                );
                return diffInDays <= 7;
            });
        } else if (selectedFilter === 'high-priority') {
            filteredApplications = filteredApplications.filter((app) => app.status === 'active');
        } else if (selectedFilter === 'remote') {
            filteredApplications = filteredApplications.filter((app) => app.location === 'Remote');
        }

        return filteredApplications;
    };

    const filteredApplications = getFilteredApplications();

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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <ClockIconSolid className="h-4 w-4" />;
            case 'pending':
                return <ExclamationTriangleIcon className="h-4 w-4" />;
            case 'completed':
                return <CheckCircleIcon className="h-4 w-4" />;
            case 'rejected':
                return <XCircleIcon className="h-4 w-4" />;
            default:
                return <ClockIcon className="h-4 w-4" />;
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">My Applications</h1>
                <p className="text-gray-600">
                    Track the status of your job applications and next steps
                </p>
            </div>

            {/* Status Tabs */}
            <div className="mb-6">
                <div className="flex space-x-1 rounded-xl bg-white p-1 shadow-sm">
                    {statuses.map((status) => {
                        const Icon = status.icon;
                        return (
                            <button
                                key={status.id}
                                onClick={() => setSelectedStatus(status.id)}
                                className={`flex flex-1 items-center justify-center space-x-2 rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
                                    selectedStatus === status.id
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{status.label}</span>
                                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                                    {status.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search applications, companies, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setSelectedFilter(filter.id)}
                            className={`rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                                selectedFilter === filter.id
                                    ? 'bg-blue-600 text-white'
                                    : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Application Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing{' '}
                    <span className="font-semibold text-gray-900">
                        {filteredApplications.length}
                    </span>{' '}
                    applications
                </p>
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredApplications.map((app) => (
                    <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <span
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(app.status)}`}
                            >
                                {getStatusIcon(app.status)}
                                <span className="ml-1 capitalize">{app.status}</span>
                            </span>
                        </div>

                        {/* Application Header */}
                        <div className="border-b border-gray-100 p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                                        {app.jobTitle}
                                    </h3>

                                    {/* Company Info */}
                                    <div className="mb-3 flex items-center space-x-3">
                                        <img
                                            src={app.companyLogo}
                                            alt={app.company}
                                            className="h-10 w-10 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {app.company}
                                            </h4>
                                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                                                <span>{app.companyRating}</span>
                                                <span>({app.companyReviews} reviews)</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags and Metadata */}
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
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {app.tags.slice(0, 4).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {app.tags.length > 4 && (
                                            <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600">
                                                +{app.tags.length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Application Details */}
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <MapPinIcon className="h-4 w-4" />
                                    <span>{app.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CurrencyDollarIcon className="h-4 w-4" />
                                    <span>{formatSalary(app.salary)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ClockIcon className="h-4 w-4" />
                                    <span>Applied {getTimeAgo(app.appliedDate)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <UsersIcon className="h-4 w-4" />
                                    <span>{app.applications} applications</span>
                                </div>
                            </div>

                            {/* Application Notes */}
                            {app.applicationNotes && (
                                <div className="mt-3 rounded-lg bg-blue-50 p-3">
                                    <div className="text-sm text-blue-700">
                                        <strong>Notes:</strong> {app.applicationNotes}
                                    </div>
                                </div>
                            )}

                            {/* Next Step */}
                            {app.nextStep && (
                                <div className="mt-3 rounded-lg bg-green-50 p-3">
                                    <div className="text-sm text-green-700">
                                        <strong>Next Step:</strong> {app.nextStep}
                                    </div>
                                </div>
                            )}

                            {/* Interview Date */}
                            {app.interviewDate && (
                                <div className="mt-3 rounded-lg bg-purple-50 p-3">
                                    <div className="text-sm text-purple-700">
                                        <strong>Interview:</strong> {getTimeAgo(app.interviewDate)}
                                    </div>
                                </div>
                            )}

                            {/* Rejection Reason */}
                            {app.rejectionReason && (
                                <div className="mt-3 rounded-lg bg-red-50 p-3">
                                    <div className="text-sm text-red-700">
                                        <strong>Reason:</strong> {app.rejectionReason}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Application Content */}
                        <div className="p-6">
                            {/* Description */}
                            <div className="mb-4">
                                <p className="line-clamp-3 text-sm text-gray-600">
                                    {app.description}
                                </p>
                            </div>

                            {/* Requirements Preview */}
                            <div className="mb-4">
                                <h5 className="mb-2 text-sm font-medium text-gray-700">
                                    Key Requirements:
                                </h5>
                                <div className="space-y-1">
                                    {app.requirements.slice(0, 2).map((req, index) => (
                                        <div key={index} className="text-sm text-gray-600">
                                            • {req}
                                        </div>
                                    ))}
                                    {app.requirements.length > 2 && (
                                        <span className="text-xs text-gray-500">
                                            +{app.requirements.length - 2} more requirements
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Stats and Actions */}
                            <div className="flex items-center justify-between">
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

                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">
                                        Updated {getTimeAgo(app.lastUpdate)}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex space-x-3">
                                <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                    View Details
                                </button>
                                <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                    <ChatBubbleLeftRightIcon className="mr-2 inline h-4 w-4" />
                                    Contact
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredApplications.length === 0 && (
                <div className="py-12 text-center">
                    <BriefcaseIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                        No applications found
                    </h3>
                    <p className="text-gray-600">
                        {selectedStatus === 'all' && "You haven't applied to any jobs yet."}
                        {selectedStatus === 'active' && 'No active applications found.'}
                        {selectedStatus === 'pending' && 'No pending applications found.'}
                        {selectedStatus === 'completed' && 'No completed applications found.'}
                    </p>
                </div>
            )}
        </div>
    );
}
