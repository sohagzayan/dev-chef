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
    HeartIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    SparklesIcon,
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
    matchScore?: number;
    isTrending?: boolean;
    isRecommended?: boolean;
}

export default function JobFeedPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All Jobs', icon: BriefcaseIcon },
        { id: 'recommended', label: 'Recommended', icon: SparklesIcon },
        { id: 'trending', label: 'Trending', icon: FireIcon },
        { id: 'recent', label: 'Recent', icon: ClockIcon },
        { id: 'saved', label: 'Saved', icon: HeartIcon },
    ];

    const jobs: Job[] = [
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
            companyRating: 4.5,
            companyReviews: 234,
            matchScore: 95,
            isRecommended: true,
        },
        {
            id: '2',
            title: 'Backend Engineer',
            company: 'DataFlow',
            companyLogo:
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
            location: 'Remote',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 90000, max: 130000, currency: 'USD' },
            postedDate: '2024-01-12',
            isSaved: false,
            isApplied: true,
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
            matchScore: 87,
            isRecommended: true,
        },
        {
            id: '3',
            title: 'DevOps Engineer',
            company: 'CloudScale',
            companyLogo:
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop',
            location: 'New York',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 110000, max: 160000, currency: 'USD' },
            postedDate: '2024-01-08',
            isSaved: true,
            isApplied: false,
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
            matchScore: 78,
            isTrending: true,
        },
        {
            id: '4',
            title: 'UI/UX Designer',
            company: 'DesignHub',
            companyLogo:
                'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop',
            location: 'London',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 65000, max: 85000, currency: 'GBP' },
            postedDate: '2024-01-15',
            isSaved: false,
            isApplied: false,
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
            matchScore: 72,
        },
        {
            id: '5',
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
            companyRating: 4.6,
            companyReviews: 223,
            matchScore: 91,
            isRecommended: true,
            isTrending: true,
        },
        {
            id: '6',
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
            companyRating: 4.2,
            companyReviews: 134,
            matchScore: 68,
        },
    ];

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        if (selectedFilter === 'all') return matchesSearch;
        if (selectedFilter === 'recommended') return matchesSearch && job.isRecommended;
        if (selectedFilter === 'trending') return matchesSearch && job.isTrending;
        if (selectedFilter === 'recent')
            return (
                matchesSearch &&
                new Date().getTime() - new Date(job.postedDate).getTime() < 7 * 24 * 60 * 60 * 1000
            );
        if (selectedFilter === 'saved') return matchesSearch && job.isSaved;

        return matchesSearch;
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

    const toggleSaved = (jobId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle saved for job:', jobId);
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

    const getMatchScoreColor = (score: number) => {
        if (score >= 90) return 'bg-green-100 text-green-800 border-green-200';
        if (score >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
        if (score >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Your Job Feed</h1>
                <p className="text-gray-600">
                    Personalized job recommendations based on your profile and preferences
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search jobs, companies, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => {
                        const Icon = filter.icon;
                        return (
                            <button
                                key={filter.id}
                                onClick={() => setSelectedFilter(filter.id)}
                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                                    selectedFilter === filter.id
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{filter.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Job Count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing{' '}
                    <span className="font-semibold text-gray-900">{filteredJobs.length}</span> jobs
                </p>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredJobs.map((job) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Match Score Badge */}
                        {job.matchScore && (
                            <div className="absolute top-4 right-4 z-10">
                                <span
                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getMatchScoreColor(job.matchScore)}`}
                                >
                                    {job.matchScore}% Match
                                </span>
                            </div>
                        )}

                        {/* Trending Badge */}
                        {job.isTrending && (
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                                    <FireIcon className="mr-1 h-3 w-3" />
                                    Trending
                                </span>
                            </div>
                        )}

                        {/* Recommended Badge */}
                        {job.isRecommended && (
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                                    <SparklesIcon className="mr-1 h-3 w-3" />
                                    Recommended
                                </span>
                            </div>
                        )}

                        {/* Job Header */}
                        <div className="border-b border-gray-100 p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
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
                                                className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
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
                                <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                    {job.isApplied ? 'Applied' : 'Apply Now'}
                                </button>
                                <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
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
                    <BriefcaseIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No jobs found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
}
