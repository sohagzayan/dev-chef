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
    LightBulbIcon,
    MapPinIcon,
    StarIcon,
    UsersIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface RejectedJob {
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

export default function RejectedJobsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rejected-date');
    const [showFeedback, setShowFeedback] = useState<string | null>(null);
    const [showLessons, setShowLessons] = useState<string | null>(null);

    const rejectedJobs: RejectedJob[] = [
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
            rejectedDate: '2024-01-18',
            applicationId: 'APP-001',
            views: 1247,
            applications: 89,
            tags: ['React', 'TypeScript', 'Next.js', 'CSS'],
            description:
                'We are looking for a Senior Frontend Developer to join our growing team and help build amazing user experiences.',
            companyRating: 4.5,
            companyReviews: 234,
            rejectionReason: 'Experience level mismatch',
            feedback:
                'Strong technical skills but looking for someone with more team leadership experience. Your React skills are excellent, but we need someone who can mentor junior developers.',
            improvementAreas: ['Team leadership', 'Mentoring skills', 'Project management'],
            canReapply: true,
            reapplyDate: '2024-04-18',
            notes: 'Great company culture, good tech stack, high salary range',
            lessonsLearned: [
                'Need to highlight leadership experience more prominently',
                'Should prepare examples of mentoring junior developers',
                'Consider taking on more team lead responsibilities in current role',
            ],
        },
        {
            id: '2',
            title: 'UI/UX Designer',
            company: 'DesignHub',
            companyLogo:
                'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop',
            location: 'London',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 65000, max: 85000, currency: 'GBP' },
            postedDate: '2024-01-15',
            appliedDate: '2024-01-16',
            rejectedDate: '2024-01-20',
            applicationId: 'APP-004',
            views: 734,
            applications: 45,
            tags: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping'],
            description: 'Create beautiful and intuitive user interfaces for our digital products.',
            companyRating: 4.4,
            companyReviews: 187,
            rejectionReason: 'Portfolio not aligned with company style',
            feedback:
                "Your portfolio shows strong technical skills, but the design aesthetic doesn't match our brand. We're looking for someone with more experience in enterprise software design.",
            improvementAreas: ['Enterprise design patterns', 'Brand consistency', 'User research'],
            canReapply: false,
            notes: 'Creative role, good location, design-focused company',
            lessonsLearned: [
                'Need to diversify portfolio with enterprise software examples',
                'Should research company design style before applying',
                'Consider taking courses in enterprise UX design',
            ],
        },
        {
            id: '3',
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
            rejectedDate: '2024-01-19',
            applicationId: 'APP-005',
            views: 654,
            applications: 78,
            tags: ['Product Strategy', 'User Research', 'Agile', 'Analytics'],
            description: 'Lead product development from ideation to launch and beyond.',
            companyRating: 4.2,
            companyReviews: 134,
            rejectionReason: 'Missing key experience areas',
            feedback:
                'Good understanding of product principles, but we need someone with more experience in B2B SaaS products and data analytics. Your consumer app experience is valuable but not directly applicable.',
            improvementAreas: ['B2B SaaS experience', 'Data analytics', 'Enterprise sales process'],
            canReapply: true,
            reapplyDate: '2024-07-14',
            notes: 'Leadership opportunity, good salary for Toronto, growing company',
            lessonsLearned: [
                'Need to gain B2B SaaS product experience',
                'Should strengthen data analytics skills',
                'Consider transitioning to B2B products in current role',
            ],
        },
        {
            id: '4',
            title: 'Backend Engineer',
            company: 'DataFlow',
            companyLogo:
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
            location: 'Remote',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 90000, max: 130000, currency: 'USD' },
            postedDate: '2024-01-12',
            appliedDate: '2024-01-13',
            rejectedDate: '2024-01-17',
            applicationId: 'APP-002',
            views: 892,
            applications: 67,
            tags: ['Python', 'Django', 'PostgreSQL', 'AWS'],
            description:
                'Join our backend team to build scalable APIs and data processing systems.',
            companyRating: 4.3,
            companyReviews: 156,
            rejectionReason: 'Technical assessment not passed',
            feedback:
                'Good understanding of Python and web frameworks, but the coding challenge revealed gaps in system design and scalability knowledge. We need someone who can think about large-scale systems.',
            improvementAreas: ['System design', 'Scalability patterns', 'Distributed systems'],
            canReapply: true,
            reapplyDate: '2024-06-13',
            notes: 'Remote-first culture, competitive compensation, flexible working hours',
            lessonsLearned: [
                'Need to study system design principles',
                'Should practice coding challenges more',
                'Consider taking courses in distributed systems',
            ],
        },
        {
            id: '5',
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
            rejectedDate: '2024-01-16',
            applicationId: 'APP-002',
            views: 1567,
            applications: 123,
            tags: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
            description:
                'Help us build and maintain our cloud infrastructure and deployment pipelines.',
            companyRating: 4.7,
            companyReviews: 298,
            rejectionReason: 'Cultural fit concerns',
            feedback:
                "Strong technical skills and experience, but during the interview, we had concerns about communication style and team collaboration. We're looking for someone who can work effectively in our fast-paced, collaborative environment.",
            improvementAreas: ['Communication skills', 'Team collaboration', 'Cultural alignment'],
            canReapply: true,
            reapplyDate: '2024-10-11',
            notes: 'Interesting infrastructure work, good location, competitive pay',
            lessonsLearned: [
                'Need to improve communication and presentation skills',
                'Should research company culture before interviews',
                'Consider taking communication workshops',
            ],
        },
    ];

    const filteredJobs = rejectedJobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        switch (sortBy) {
            case 'rejected-date':
                return new Date(b.rejectedDate).getTime() - new Date(a.rejectedDate).getTime();
            case 'applied-date':
                return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
            case 'posted-date':
                return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
            case 'salary':
                return b.salary.min - a.salary.min;
            case 'company-rating':
                return b.companyRating - a.companyRating;
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

    const getRejectionReasonColor = (reason: string) => {
        if (reason.includes('Experience')) return 'bg-blue-100 text-blue-800 border-blue-200';
        if (reason.includes('Technical')) return 'bg-purple-100 text-purple-800 border-purple-200';
        if (reason.includes('Cultural')) return 'bg-orange-100 text-orange-800 border-orange-200';
        if (reason.includes('Portfolio')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-red-100 p-2">
                            <XCircleIcon className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Rejections</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {rejectedJobs.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-green-100 p-2">
                            <ArrowPathIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Can Reapply</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {rejectedJobs.filter((job) => job.canReapply).length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <LightBulbIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Improvement Areas</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {rejectedJobs.reduce(
                                    (acc, job) => acc + (job.improvementAreas?.length || 0),
                                    0,
                                )}
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
                            <p className="text-sm text-gray-600">With Feedback</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {rejectedJobs.filter((job) => job.feedback).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Sort */}
            <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                    <div className="max-w-md flex-1">
                        <input
                            type="text"
                            placeholder="Search rejected applications..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="rejected-date">Sort by Rejection Date</option>
                            <option value="applied-date">Sort by Applied Date</option>
                            <option value="posted-date">Sort by Posted Date</option>
                            <option value="salary">Sort by Salary</option>
                            <option value="company-rating">Sort by Company Rating</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
                {sortedJobs.map((job) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="p-6">
                            <div className="flex items-start space-x-4">
                                {/* Company Logo */}
                                <img
                                    src={job.companyLogo}
                                    alt={job.company}
                                    className="h-16 w-16 rounded-xl object-cover"
                                />

                                {/* Job Details */}
                                <div className="flex-1">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center space-x-3">
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {job.title}
                                                </h3>
                                                <span className="inline-flex items-center rounded-full border border-red-200 bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                                                    <XCircleIcon className="mr-1 h-4 w-4" />
                                                    Rejected
                                                </span>
                                                {job.canReapply && (
                                                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                                        <ArrowPathIcon className="mr-1 h-4 w-4" />
                                                        Can Reapply
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mb-3 flex items-center space-x-4">
                                                <h4 className="font-medium text-gray-900">
                                                    {job.company}
                                                </h4>
                                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                    <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                                                    <span>{job.companyRating}</span>
                                                    <span>({job.companyReviews} reviews)</span>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="mb-3 flex items-center space-x-2">
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getExperienceColor(job.experience)}`}
                                                >
                                                    {job.experience}
                                                </span>
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getTypeColor(job.type)}`}
                                                >
                                                    {job.type}
                                                </span>
                                                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    {job.location}
                                                </span>
                                            </div>

                                            {/* Skills Tags */}
                                            <div className="mb-3 flex flex-wrap gap-2">
                                                {job.tags.slice(0, 5).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {job.tags.length > 5 && (
                                                    <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600">
                                                        +{job.tags.length - 5} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rejection Info */}
                                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                                            <div className="flex items-center space-x-2">
                                                <DocumentTextIcon className="h-4 w-4 text-red-600" />
                                                <span className="font-medium text-red-800">
                                                    ID: {job.applicationId}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <CalendarIcon className="h-4 w-4 text-red-600" />
                                                <span className="text-red-800">
                                                    Applied {getTimeAgo(job.appliedDate)}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <XCircleIcon className="h-4 w-4 text-red-600" />
                                                <span className="text-red-800">
                                                    Rejected {getTimeAgo(job.rejectedDate)}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <CurrencyDollarIcon className="h-4 w-4 text-red-600" />
                                                <span className="text-red-800">
                                                    {formatSalary(job.salary)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rejection Reason */}
                                    {job.rejectionReason && (
                                        <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-3">
                                            <h5 className="mb-1 text-sm font-medium text-orange-800">
                                                Rejection Reason:
                                            </h5>
                                            <span
                                                className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getRejectionReasonColor(job.rejectionReason)}`}
                                            >
                                                {job.rejectionReason}
                                            </span>
                                        </div>
                                    )}

                                    {/* Feedback */}
                                    {job.feedback && (
                                        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                                            <div className="flex items-center justify-between">
                                                <h5 className="mb-1 text-sm font-medium text-blue-800">
                                                    Feedback:
                                                </h5>
                                                <button
                                                    onClick={() =>
                                                        setShowFeedback(
                                                            showFeedback === job.id ? null : job.id,
                                                        )
                                                    }
                                                    className="text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    {showFeedback === job.id ? 'Hide' : 'Show'}
                                                </button>
                                            </div>
                                            {showFeedback === job.id && (
                                                <p className="text-sm text-blue-700">
                                                    {job.feedback}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Improvement Areas */}
                                    {job.improvementAreas && job.improvementAreas.length > 0 && (
                                        <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                                            <h5 className="mb-2 text-sm font-medium text-yellow-800">
                                                Areas for Improvement:
                                            </h5>
                                            <div className="flex flex-wrap gap-2">
                                                {job.improvementAreas.map((area, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-md border border-yellow-200 bg-yellow-100 px-2 py-1 text-xs text-yellow-800"
                                                    >
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Lessons Learned */}
                                    {job.lessonsLearned && job.lessonsLearned.length > 0 && (
                                        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
                                            <div className="flex items-center justify-between">
                                                <h5 className="mb-2 text-sm font-medium text-green-800">
                                                    Lessons Learned:
                                                </h5>
                                                <button
                                                    onClick={() =>
                                                        setShowLessons(
                                                            showLessons === job.id ? null : job.id,
                                                        )
                                                    }
                                                    className="text-sm text-green-600 hover:text-green-800"
                                                >
                                                    {showLessons === job.id ? 'Hide' : 'Show'}
                                                </button>
                                            </div>
                                            {showLessons === job.id && (
                                                <div className="space-y-1">
                                                    {job.lessonsLearned.map((lesson, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-start space-x-2 text-sm text-green-700"
                                                        >
                                                            <span className="mt-1 text-green-500">
                                                                •
                                                            </span>
                                                            <span>{lesson}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Reapply Info */}
                                    {job.canReapply && job.reapplyDate && (
                                        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
                                            <h5 className="mb-1 text-sm font-medium text-green-800">
                                                Reapplication:
                                            </h5>
                                            <p className="text-sm text-green-700">
                                                You can reapply after{' '}
                                                <span className="font-medium">
                                                    {getTimeAgo(job.reapplyDate)}
                                                </span>
                                            </p>
                                        </div>
                                    )}

                                    {/* Notes */}
                                    {job.notes && (
                                        <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
                                            <h5 className="mb-1 text-sm font-medium text-gray-800">
                                                Your Notes:
                                            </h5>
                                            <p className="text-sm text-gray-700">{job.notes}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-3">
                                            <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                                View Details
                                            </button>
                                            {job.canReapply && (
                                                <button className="rounded-lg bg-green-600 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-green-700">
                                                    Reapply Later
                                                </button>
                                            )}
                                            <button className="rounded-lg bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                                Update Notes
                                            </button>
                                        </div>

                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-1">
                                                <EyeIcon className="h-4 w-4" />
                                                <span>{job.views}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <UsersIcon className="h-4 w-4" />
                                                <span>{job.applications}</span>
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
            {sortedJobs.length === 0 && (
                <div className="py-12 text-center">
                    <XCircleIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                        No rejected applications found
                    </h3>
                    <p className="text-gray-600">
                        {searchQuery
                            ? 'Try adjusting your search criteria.'
                            : "This is good news! No rejections means you're doing well in your job search."}
                    </p>
                </div>
            )}
        </div>
    );
}
