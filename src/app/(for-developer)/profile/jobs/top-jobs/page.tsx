'use client';

import { useState } from 'react';
import {
    BookmarkIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    ClockIcon,
    CurrencyDollarIcon,
    EyeIcon,
    FireIcon,
    MapPinIcon,
    StarIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Job {
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
    isSaved: boolean;
    isApplied: boolean;
    views: number;
    applications: number;
    tags: string[];
    description: string;
    requirements: string[];
    benefits: string[];
    companyRating: number;
    companyReviews: number;
    isTopJob?: boolean;
    priority?: 'high' | 'medium' | 'low';
}

export default function TopJobsPage() {
    const [selectedPriority, setSelectedPriority] = useState('all');
    const [selectedExperience, setSelectedExperience] = useState('all');

    const topJobs: Job[] = [
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
            isSaved: true,
            isApplied: false,
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
            companyRating: 4.8,
            companyReviews: 234,
            isTopJob: true,
            priority: 'high',
        },
        {
            id: '2',
            title: 'Machine Learning Engineer',
            company: 'AITech',
            companyLogo:
                'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=150&h=150&fit=crop',
            location: 'Berlin',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 80000, max: 120000, currency: 'EUR' },
            postedDate: '2024-01-11',
            isSaved: true,
            isApplied: false,
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
            companyRating: 4.9,
            companyReviews: 223,
            isTopJob: true,
            priority: 'high',
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
            isSaved: false,
            isApplied: false,
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
            companyRating: 4.6,
            companyReviews: 134,
            isTopJob: true,
            priority: 'medium',
        },
        {
            id: '4',
            title: 'DevOps Engineer',
            company: 'CloudTech',
            companyLogo:
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
            location: 'Remote',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 90000, max: 130000, currency: 'USD' },
            postedDate: '2024-01-12',
            isSaved: false,
            isApplied: false,
            views: 892,
            applications: 67,
            tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
            description:
                'Build and maintain scalable infrastructure for our cloud-native applications.',
            requirements: [
                '3+ years of DevOps experience',
                'Strong knowledge of AWS services',
                'Experience with containerization and orchestration',
                'Knowledge of CI/CD pipelines',
            ],
            benefits: [
                '100% remote work',
                'Competitive salary',
                'Health insurance',
                'Professional development budget',
            ],
            companyRating: 4.7,
            companyReviews: 189,
            isTopJob: true,
            priority: 'medium',
        },
        {
            id: '5',
            title: 'Data Scientist',
            company: 'DataCorp',
            companyLogo:
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop',
            location: 'New York',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 130000, max: 180000, currency: 'USD' },
            postedDate: '2024-01-14',
            isSaved: true,
            isApplied: false,
            views: 1123,
            applications: 94,
            tags: ['Python', 'R', 'SQL', 'Machine Learning'],
            description: 'Transform data into actionable insights that drive business decisions.',
            requirements: [
                '5+ years of data science experience',
                'Strong programming skills in Python and R',
                'Experience with machine learning algorithms',
                'Excellent statistical analysis skills',
            ],
            benefits: [
                'Competitive NYC salary',
                'Comprehensive benefits',
                'Professional development',
                'Modern office in Manhattan',
            ],
            companyRating: 4.8,
            companyReviews: 267,
            isTopJob: true,
            priority: 'high',
        },
    ];

    const filteredJobs = topJobs.filter((job) => {
        const matchesPriority = selectedPriority === 'all' || job.priority === selectedPriority;
        const matchesExperience =
            selectedExperience === 'all' || job.experience === selectedExperience;
        return matchesPriority && matchesExperience;
    });

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
            case 'Internship':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
        return `${salary.currency} ${formatNumber(salary.min)}-${formatNumber(salary.max)}`;
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return '1 day ago';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        return `${Math.floor(diffInDays / 30)} months ago`;
    };

    const toggleSaved = (jobId: string) => {
        // Implementation for toggling saved state
        console.log('Toggle saved for job:', jobId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-gradient-to-r from-orange-400 to-red-500 p-3">
                        <FireIcon className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">🔥 Top Jobs</h1>
                <p className="text-gray-600">
                    Discover the most exciting and high-priority opportunities from top companies
                </p>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap justify-center gap-3">
                {/* Priority Filter */}
                <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                >
                    <option value="all">All Priorities</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                </select>

                {/* Experience Filter */}
                <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                >
                    <option value="all">All Experience Levels</option>
                    <option value="Entry">Entry Level</option>
                    <option value="Mid">Mid Level</option>
                    <option value="Senior">Senior Level</option>
                    <option value="Lead">Lead Level</option>
                </select>
            </div>

            {/* Job Count */}
            <div className="mb-6 text-center">
                <p className="text-gray-600">
                    Showing{' '}
                    <span className="font-semibold text-gray-900">{filteredJobs.length}</span> top
                    jobs
                </p>
            </div>

            {/* Top Jobs Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredJobs.map((job) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Top Job Badge */}
                        <div className="absolute -top-2 -right-2 z-10 rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-3 py-1 text-xs font-medium text-white shadow-lg">
                            Top Job
                        </div>

                        {/* Priority Badge */}
                        <div className="absolute top-8 -right-2 z-10 rounded-full border px-3 py-1 text-xs font-medium shadow-lg">
                            <span className={`${getPriorityColor(job.priority || 'medium')}`}>
                                {job.priority === 'high'
                                    ? '🔥 High Priority'
                                    : job.priority === 'medium'
                                      ? '⚡ Medium Priority'
                                      : '💡 Low Priority'}
                            </span>
                        </div>

                        {/* Job Header */}
                        <div className="border-b border-gray-100 p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-orange-600">
                                        {job.title}
                                    </h3>

                                    {/* Company Info */}
                                    <div className="mb-3 flex items-center space-x-3">
                                        <img
                                            src={job.companyLogo}
                                            alt={job.company}
                                            className="h-10 w-10 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {job.company}
                                            </h4>
                                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                                                <span>{job.companyRating}</span>
                                                <span>({job.companyReviews} reviews)</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags and Metadata */}
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
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {job.tags.slice(0, 4).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md bg-orange-50 px-2 py-1 text-xs text-orange-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {job.tags.length > 4 && (
                                            <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600">
                                                +{job.tags.length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Job Details */}
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <MapPinIcon className="h-4 w-4" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CurrencyDollarIcon className="h-4 w-4" />
                                    <span>{formatSalary(job.salary)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ClockIcon className="h-4 w-4" />
                                    <span>{getTimeAgo(job.postedDate)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <UsersIcon className="h-4 w-4" />
                                    <span>{job.applications} applications</span>
                                </div>
                            </div>
                        </div>

                        {/* Job Content */}
                        <div className="p-6">
                            {/* Description */}
                            <div className="mb-4">
                                <p className="line-clamp-3 text-sm text-gray-600">
                                    {job.description}
                                </p>
                            </div>

                            {/* Requirements Preview */}
                            <div className="mb-4">
                                <h5 className="mb-2 text-sm font-medium text-gray-700">
                                    Key Requirements:
                                </h5>
                                <div className="space-y-1">
                                    {job.requirements.slice(0, 2).map((req, index) => (
                                        <div key={index} className="text-sm text-gray-600">
                                            • {req}
                                        </div>
                                    ))}
                                    {job.requirements.length > 2 && (
                                        <span className="text-xs text-gray-500">
                                            +{job.requirements.length - 2} more requirements
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Stats and Actions */}
                            <div className="flex items-center justify-between">
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

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => toggleSaved(job.id)}
                                        className={`rounded-lg p-2 transition-colors duration-200 ${
                                            job.isSaved
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : 'text-gray-400 hover:bg-yellow-50 hover:text-yellow-600'
                                        }`}
                                    >
                                        <BookmarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex space-x-3">
                                <button className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 font-medium text-white transition-all duration-200 hover:from-orange-600 hover:to-red-600">
                                    {job.isApplied ? 'Applied' : 'Apply Now'}
                                </button>
                                <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
                <div className="py-12 text-center">
                    <FireIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No top jobs found</h3>
                    <p className="text-gray-600">Try adjusting your filter criteria.</p>
                </div>
            )}
        </div>
    );
}
