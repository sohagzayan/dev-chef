'use client';

import { useState } from 'react';
import {
    BookmarkIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    EyeIcon,
    FireIcon,
    InformationCircleIcon,
    MapPinIcon,
    SparklesIcon,
    StarIcon,
    UsersIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface JobRecommendation {
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
    matchScore: number;
    isTrending: boolean;
    isRecommended: boolean;
    views: number;
    applications: number;
    tags: string[];
    description: string;
    requirements: string[];
    benefits: string[];
    companyRating: number;
    companyReviews: number;
    whyRecommended: string[];
    skillsMatch: {
        skill: string;
        match: 'excellent' | 'good' | 'partial' | 'missing';
    }[];
}

export default function JobRecommendationsPage() {
    const [selectedTab, setSelectedTab] = useState<'recommended' | 'trending' | 'perfect-match'>(
        'recommended',
    );
    const [showFilters, setShowFilters] = useState(false);

    const jobRecommendations: JobRecommendation[] = [
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
            matchScore: 95,
            isTrending: true,
            isRecommended: true,
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
            whyRecommended: [
                'Perfect match for your React and TypeScript skills',
                'Company culture aligns with your preferences',
                'Salary range matches your expectations',
                'Location fits your preferred cities',
            ],
            skillsMatch: [
                { skill: 'React', match: 'excellent' },
                { skill: 'TypeScript', match: 'excellent' },
                { skill: 'Next.js', match: 'good' },
                { skill: 'CSS', match: 'excellent' },
                { skill: 'Node.js', match: 'partial' },
            ],
        },
        {
            id: '2',
            title: 'Full Stack Developer',
            company: 'InnovateTech',
            companyLogo:
                'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
            location: 'Remote',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 90000, max: 130000, currency: 'USD' },
            postedDate: '2024-01-12',
            isSaved: false,
            isApplied: false,
            matchScore: 88,
            isTrending: false,
            isRecommended: true,
            views: 892,
            applications: 67,
            tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
            description:
                'Join our team to build scalable web applications using modern technologies.',
            requirements: [
                '3+ years of full-stack development experience',
                'Proficiency in React and Node.js',
                'Experience with MongoDB and cloud platforms',
                'Strong problem-solving skills',
            ],
            benefits: [
                '100% remote work',
                'Competitive compensation',
                'Flexible working hours',
                'Learning and development opportunities',
            ],
            companyRating: 4.3,
            companyReviews: 156,
            whyRecommended: [
                'Strong match for your full-stack skills',
                'Remote work aligns with your preferences',
                'Company size fits your experience level',
                'Tech stack matches your expertise',
            ],
            skillsMatch: [
                { skill: 'React', match: 'excellent' },
                { skill: 'Node.js', match: 'good' },
                { skill: 'MongoDB', match: 'partial' },
                { skill: 'AWS', match: 'partial' },
                { skill: 'TypeScript', match: 'excellent' },
            ],
        },
        {
            id: '3',
            title: 'UI/UX Developer',
            company: 'DesignFlow',
            companyLogo:
                'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop',
            location: 'New York',
            type: 'Full-time',
            experience: 'Mid',
            salary: { min: 85000, max: 120000, currency: 'USD' },
            postedDate: '2024-01-15',
            isSaved: false,
            isApplied: false,
            matchScore: 82,
            isTrending: true,
            isRecommended: true,
            views: 734,
            applications: 45,
            tags: ['React', 'CSS', 'Figma', 'Design Systems'],
            description: 'Create beautiful and intuitive user interfaces for our digital products.',
            requirements: [
                '3+ years of frontend development experience',
                'Strong CSS and design skills',
                'Experience with design tools like Figma',
                'Understanding of user-centered design',
            ],
            benefits: [
                'Creative and collaborative environment',
                'Professional development opportunities',
                'Modern office in Manhattan',
                'Health and wellness benefits',
            ],
            companyRating: 4.4,
            companyReviews: 187,
            whyRecommended: [
                'Good match for your frontend skills',
                'Design focus aligns with your interests',
                'Location in your preferred city',
                'Company culture matches your style',
            ],
            skillsMatch: [
                { skill: 'React', match: 'excellent' },
                { skill: 'CSS', match: 'excellent' },
                { skill: 'Figma', match: 'partial' },
                { skill: 'TypeScript', match: 'good' },
                { skill: 'Design Systems', match: 'partial' },
            ],
        },
        {
            id: '4',
            title: 'Frontend Team Lead',
            company: 'ScaleUp',
            companyLogo:
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop',
            location: 'Austin',
            type: 'Full-time',
            experience: 'Lead',
            salary: { min: 140000, max: 200000, currency: 'USD' },
            postedDate: '2024-01-08',
            isSaved: true,
            isApplied: false,
            matchScore: 78,
            isTrending: false,
            isRecommended: false,
            views: 1567,
            applications: 123,
            tags: ['React', 'Leadership', 'Team Management', 'Architecture'],
            description:
                'Lead our frontend team and drive technical excellence across our products.',
            requirements: [
                '5+ years of frontend development experience',
                '2+ years of team leadership experience',
                'Strong technical architecture skills',
                'Excellent communication and mentoring abilities',
            ],
            benefits: [
                'Competitive salary and equity',
                'Leadership development programs',
                'Health and wellness benefits',
                'Modern office in Austin',
            ],
            companyRating: 4.7,
            companyReviews: 298,
            whyRecommended: [
                'Matches your technical skills',
                'Leadership opportunity for growth',
                'Company in your preferred location',
                'High compensation package',
            ],
            skillsMatch: [
                { skill: 'React', match: 'excellent' },
                { skill: 'Leadership', match: 'partial' },
                { skill: 'Team Management', match: 'partial' },
                { skill: 'Architecture', match: 'good' },
                { skill: 'TypeScript', match: 'excellent' },
            ],
        },
        {
            id: '5',
            title: 'React Native Developer',
            company: 'MobileFirst',
            companyLogo:
                'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=150&h=150&fit=crop',
            location: 'Remote',
            type: 'Contract',
            experience: 'Mid',
            salary: { min: 70, max: 90, currency: 'USD' },
            postedDate: '2024-01-13',
            isSaved: false,
            isApplied: false,
            matchScore: 75,
            isTrending: true,
            isRecommended: false,
            views: 654,
            applications: 78,
            tags: ['React Native', 'Mobile Development', 'JavaScript', 'iOS/Android'],
            description: 'Build cross-platform mobile applications using React Native.',
            requirements: [
                '3+ years of React Native development',
                'Experience with iOS and Android platforms',
                'Strong JavaScript skills',
                'Understanding of mobile app development',
            ],
            benefits: [
                'Contract flexibility',
                'Remote work options',
                'Competitive hourly rates',
                'Project variety',
            ],
            companyRating: 4.2,
            companyReviews: 134,
            whyRecommended: [
                'Good match for your React skills',
                'Mobile development opportunity',
                'Contract work flexibility',
                'Remote work option',
            ],
            skillsMatch: [
                { skill: 'React', match: 'excellent' },
                { skill: 'React Native', match: 'partial' },
                { skill: 'JavaScript', match: 'excellent' },
                { skill: 'Mobile Development', match: 'partial' },
                { skill: 'TypeScript', match: 'good' },
            ],
        },
        {
            id: '6',
            title: 'Frontend Performance Engineer',
            company: 'SpeedTech',
            companyLogo:
                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop',
            location: 'Seattle',
            type: 'Full-time',
            experience: 'Senior',
            salary: { min: 130000, max: 180000, currency: 'USD' },
            postedDate: '2024-01-11',
            isSaved: false,
            isApplied: false,
            matchScore: 72,
            isTrending: false,
            isRecommended: false,
            views: 987,
            applications: 89,
            tags: ['Performance', 'React', 'Web Vitals', 'Optimization'],
            description:
                'Optimize frontend performance and user experience across our applications.',
            requirements: [
                '5+ years of frontend development experience',
                'Expertise in performance optimization',
                'Experience with React and modern web technologies',
                'Knowledge of Web Vitals and Core Web Vitals',
            ],
            benefits: [
                'Competitive salary and benefits',
                'Performance-focused culture',
                'Professional development opportunities',
                'Modern office in Seattle',
            ],
            companyRating: 4.5,
            companyReviews: 223,
            whyRecommended: [
                'Matches your React expertise',
                'Performance focus opportunity',
                'Senior level position',
                'Good company culture',
            ],
            skillsMatch: [
                { skill: 'React', match: 'excellent' },
                { skill: 'Performance', match: 'partial' },
                { skill: 'Web Vitals', match: 'partial' },
                { skill: 'Optimization', match: 'good' },
                { skill: 'TypeScript', match: 'excellent' },
            ],
        },
    ];

    const getMatchScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600 bg-green-100 border-green-200';
        if (score >= 80) return 'text-blue-600 bg-blue-100 border-blue-200';
        if (score >= 70) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
        return 'text-gray-600 bg-gray-100 border-gray-200';
    };

    const getSkillMatchColor = (match: string) => {
        switch (match) {
            case 'excellent':
                return 'text-green-600 bg-green-100 border-green-200';
            case 'good':
                return 'text-blue-600 bg-blue-100 border-blue-200';
            case 'partial':
                return 'text-yellow-600 bg-yellow-100 border-yellow-200';
            case 'missing':
                return 'text-red-600 bg-red-100 border-red-200';
            default:
                return 'text-gray-600 bg-gray-100 border-gray-200';
        }
    };

    const getSkillMatchIcon = (match: string) => {
        switch (match) {
            case 'excellent':
                return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
            case 'good':
                return <CheckCircleIcon className="h-4 w-4 text-blue-600" />;
            case 'partial':
                return <InformationCircleIcon className="h-4 w-4 text-yellow-600" />;
            case 'missing':
                return <XCircleIcon className="h-4 w-4 text-red-600" />;
            default:
                return null;
        }
    };

    const formatSalary = (salary: { min: number; max: number; currency: string }) => {
        if (salary.currency === 'USD' && salary.max < 1000) {
            // Hourly rate
            return `${salary.currency} ${salary.min}-${salary.max}/hr`;
        }
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

    const toggleSaved = (jobId: string) => {
        console.log('Toggle saved for job:', jobId);
    };

    const filteredJobs = jobRecommendations.filter((job) => {
        switch (selectedTab) {
            case 'recommended':
                return job.isRecommended;
            case 'trending':
                return job.isTrending;
            case 'perfect-match':
                return job.matchScore >= 90;
            default:
                return true;
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <SparklesIcon className="h-8 w-8 text-purple-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Job Recommendations</h1>
                </div>
                <p className="text-gray-600">
                    AI-powered job suggestions based on your skills, preferences, and career goals
                </p>
            </div>

            {/* Stats Overview */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <StarIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Perfect Matches</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {jobRecommendations.filter((job) => job.matchScore >= 90).length}
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
                            <p className="text-sm text-gray-600">Recommended</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {jobRecommendations.filter((job) => job.isRecommended).length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-orange-100 p-2">
                            <FireIcon className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Trending</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {jobRecommendations.filter((job) => job.isTrending).length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-purple-100 p-2">
                            <ChartBarIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Avg. Match</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {Math.round(
                                    jobRecommendations.reduce(
                                        (acc, job) => acc + job.matchScore,
                                        0,
                                    ) / jobRecommendations.length,
                                )}
                                %
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 rounded-2xl bg-white p-2 shadow-lg">
                <div className="flex space-x-1">
                    {[
                        {
                            id: 'recommended',
                            label: 'Recommended',
                            count: jobRecommendations.filter((job) => job.isRecommended).length,
                        },
                        {
                            id: 'trending',
                            label: 'Trending',
                            count: jobRecommendations.filter((job) => job.isTrending).length,
                        },
                        {
                            id: 'perfect-match',
                            label: 'Perfect Match',
                            count: jobRecommendations.filter((job) => job.matchScore >= 90).length,
                        },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id as any)}
                            className={`flex-1 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                                selectedTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <span className="flex items-center justify-center space-x-2">
                                <span>{tab.label}</span>
                                <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-bold text-white">
                                    {tab.count}
                                </span>
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredJobs.map((job) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Job Header */}
                        <div className="border-b border-gray-100 p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="mb-2 flex items-center space-x-2">
                                        <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
                                            {job.title}
                                        </h3>
                                        {job.isTrending && (
                                            <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">
                                                <FireIcon className="mr-1 h-3 w-3" />
                                                Trending
                                            </span>
                                        )}
                                        {job.isRecommended && (
                                            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                <StarIcon className="mr-1 h-3 w-3" />
                                                Recommended
                                            </span>
                                        )}
                                    </div>

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

                                    {/* Match Score */}
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${getMatchScoreColor(job.matchScore)}`}
                                            >
                                                {job.matchScore}% Match
                                            </span>
                                        </div>
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
                                <p className="line-clamp-2 text-sm text-gray-600">
                                    {job.description}
                                </p>
                            </div>

                            {/* Why Recommended */}
                            <div className="mb-4">
                                <h5 className="mb-2 text-sm font-medium text-gray-700">
                                    Why Recommended:
                                </h5>
                                <div className="space-y-1">
                                    {job.whyRecommended.slice(0, 2).map((reason, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start space-x-2 text-sm text-gray-600"
                                        >
                                            <span className="mt-1 text-blue-500">•</span>
                                            <span>{reason}</span>
                                        </div>
                                    ))}
                                    {job.whyRecommended.length > 2 && (
                                        <span className="text-xs text-gray-500">
                                            +{job.whyRecommended.length - 2} more reasons
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Skills Match */}
                            <div className="mb-4">
                                <h5 className="mb-2 text-sm font-medium text-gray-700">
                                    Skills Match:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {job.skillsMatch.slice(0, 5).map((skill, index) => (
                                        <div
                                            key={index}
                                            className={`inline-flex items-center space-x-1 rounded-md border px-2 py-1 text-xs font-medium ${getSkillMatchColor(skill.match)}`}
                                        >
                                            {getSkillMatchIcon(skill.match)}
                                            <span>{skill.skill}</span>
                                        </div>
                                    ))}
                                    {job.skillsMatch.length > 5 && (
                                        <span className="text-xs text-gray-500">
                                            +{job.skillsMatch.length - 5} more skills
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Stats and Actions */}
                            <div className="mb-4 flex items-center justify-between">
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

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
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
                    <SparklesIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                        No recommendations found
                    </h3>
                    <p className="text-gray-600">
                        Try adjusting your preferences or check back later for new recommendations.
                    </p>
                </div>
            )}
        </div>
    );
}
