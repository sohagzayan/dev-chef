'use client';

import { useState } from 'react';
import {
    BookmarkIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    EllipsisHorizontalIcon,
    EyeIcon,
    MapPinIcon,
    ShareIcon,
    StarIcon,
    TrashIcon,
    UsersIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface SavedJob {
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
    savedDate: string;
    isSaved: boolean;
    isApplied: boolean;
    views: number;
    applications: number;
    tags: string[];
    description: string;
    companyRating: number;
    companyReviews: number;
    notes?: string;
}

export default function BookmarkedJobsPage() {
    const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
    const [showNotes, setShowNotes] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('saved-date');

    const savedJobs: SavedJob[] = [
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
            savedDate: '2024-01-12',
            isSaved: true,
            isApplied: false,
            views: 1247,
            applications: 89,
            tags: ['React', 'TypeScript', 'Next.js', 'CSS'],
            description:
                'We are looking for a Senior Frontend Developer to join our growing team and help build amazing user experiences.',
            companyRating: 4.5,
            companyReviews: 234,
            notes: 'Great company culture, good tech stack, high salary range',
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
            savedDate: '2024-01-11',
            isSaved: true,
            isApplied: false,
            views: 1567,
            applications: 123,
            tags: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
            description:
                'Help us build and maintain our cloud infrastructure and deployment pipelines.',
            companyRating: 4.7,
            companyReviews: 298,
            notes: 'Interesting infrastructure work, good location, competitive pay',
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
            savedDate: '2024-01-13',
            isSaved: true,
            isApplied: false,
            views: 1987,
            applications: 156,
            tags: ['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
            description: 'Build and deploy machine learning models that solve real-world problems.',
            companyRating: 4.6,
            companyReviews: 223,
            notes: 'Exciting ML work, international opportunity, good work-life balance',
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
            savedDate: '2024-01-16',
            isSaved: true,
            isApplied: false,
            views: 734,
            applications: 45,
            tags: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping'],
            description: 'Create beautiful and intuitive user interfaces for our digital products.',
            companyRating: 4.4,
            companyReviews: 187,
            notes: 'Creative role, good location, design-focused company',
        },
        {
            id: '5',
            title: 'Product Manager',
            company: 'ProductLab',
            companyLogo:
                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop',
            location: 'Toronto',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 85000, max: 110000, currency: 'CAD' },
            postedDate: '2024-01-13',
            savedDate: '2024-01-14',
            isSaved: true,
            isApplied: false,
            views: 654,
            applications: 78,
            tags: ['Product Strategy', 'User Research', 'Agile', 'Analytics'],
            description: 'Lead product development from ideation to launch and beyond.',
            companyRating: 4.2,
            companyReviews: 134,
            notes: 'Leadership opportunity, good salary for Toronto, growing company',
        },
    ];

    const filteredJobs = savedJobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        switch (sortBy) {
            case 'saved-date':
                return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime();
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

    const toggleJobSelection = (jobId: string) => {
        setSelectedJobs((prev) =>
            prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId],
        );
    };

    const toggleAllJobs = () => {
        if (selectedJobs.length === sortedJobs.length) {
            setSelectedJobs([]);
        } else {
            setSelectedJobs(sortedJobs.map((job) => job.id));
        }
    };

    const removeSelectedJobs = () => {
        console.log('Removing jobs:', selectedJobs);
        setSelectedJobs([]);
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
                    <BookmarkIcon className="h-8 w-8 text-yellow-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Bookmarked Jobs</h1>
                </div>
                <p className="text-gray-600">
                    Manage your saved job opportunities and track your favorites
                </p>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-yellow-100 p-2">
                            <BookmarkIcon className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Saved</p>
                            <p className="text-2xl font-bold text-gray-900">{savedJobs.length}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Applied</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {savedJobs.filter((job) => job.isApplied).length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-green-100 p-2">
                            <StarIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">High Rated</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {savedJobs.filter((job) => job.companyRating >= 4.5).length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-purple-100 p-2">
                            <MapPinIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Locations</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {new Set(savedJobs.map((job) => job.location)).size}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Actions */}
            <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                    <div className="max-w-md flex-1">
                        <input
                            type="text"
                            placeholder="Search saved jobs..."
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
                            <option value="saved-date">Sort by Saved Date</option>
                            <option value="posted-date">Sort by Posted Date</option>
                            <option value="salary">Sort by Salary</option>
                            <option value="company-rating">Sort by Company Rating</option>
                        </select>

                        {selectedJobs.length > 0 && (
                            <button
                                onClick={removeSelectedJobs}
                                className="flex items-center space-x-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700"
                            >
                                <TrashIcon className="h-4 w-4" />
                                <span>Remove ({selectedJobs.length})</span>
                            </button>
                        )}
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
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={selectedJobs.includes(job.id)}
                                    onChange={() => toggleJobSelection(job.id)}
                                    className="mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />

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
                                            <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                                {job.title}
                                            </h3>

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

                                        {/* Actions */}
                                        <div className="flex items-center space-x-2">
                                            <button className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600">
                                                <ShareIcon className="h-5 w-5" />
                                            </button>
                                            <button className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600">
                                                <EllipsisHorizontalIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Job Info Grid */}
                                    <div className="mb-4 grid grid-cols-2 gap-4 text-sm text-gray-600 md:grid-cols-4">
                                        <div className="flex items-center space-x-2">
                                            <CurrencyDollarIcon className="h-4 w-4" />
                                            <span>{formatSalary(job.salary)}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <ClockIcon className="h-4 w-4" />
                                            <span>Posted {getTimeAgo(job.postedDate)}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <BookmarkIcon className="h-4 w-4" />
                                            <span>Saved {getTimeAgo(job.savedDate)}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <UsersIcon className="h-4 w-4" />
                                            <span>{job.applications} applications</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-4">
                                        <p className="line-clamp-2 text-sm text-gray-600">
                                            {job.description}
                                        </p>
                                    </div>

                                    {/* Notes */}
                                    {job.notes && (
                                        <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                                            <div className="flex items-center justify-between">
                                                <h5 className="mb-1 text-sm font-medium text-yellow-800">
                                                    Your Notes:
                                                </h5>
                                                <button
                                                    onClick={() =>
                                                        setShowNotes(
                                                            showNotes === job.id ? null : job.id,
                                                        )
                                                    }
                                                    className="text-sm text-yellow-600 hover:text-yellow-800"
                                                >
                                                    {showNotes === job.id ? 'Hide' : 'Show'}
                                                </button>
                                            </div>
                                            {showNotes === job.id && (
                                                <p className="text-sm text-yellow-700">
                                                    {job.notes}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-3">
                                            <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                                {job.isApplied ? 'Applied' : 'Apply Now'}
                                            </button>
                                            <button className="rounded-lg bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                                View Details
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
                    <BookmarkIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                        No bookmarked jobs found
                    </h3>
                    <p className="text-gray-600">
                        {searchQuery
                            ? 'Try adjusting your search criteria.'
                            : "Start saving jobs you're interested in to see them here."}
                    </p>
                </div>
            )}

            {/* Bulk Actions Footer */}
            {selectedJobs.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 transform rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            {selectedJobs.length} job{selectedJobs.length !== 1 ? 's' : ''} selected
                        </span>
                        <button
                            onClick={removeSelectedJobs}
                            className="flex items-center space-x-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700"
                        >
                            <TrashIcon className="h-4 w-4" />
                            <span>Remove Selected</span>
                        </button>
                        <button
                            onClick={() => setSelectedJobs([])}
                            className="px-4 py-2 text-gray-600 transition-colors duration-200 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
