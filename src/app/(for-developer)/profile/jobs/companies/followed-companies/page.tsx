'use client';

import { useState } from 'react';
import {
    BellIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    ChatBubbleLeftRightIcon,
    CurrencyDollarIcon,
    EyeIcon,
    FunnelIcon,
    GlobeAltIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    MinusIcon,
    PlusIcon,
    StarIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface FollowedCompany {
    id: string;
    name: string;
    logo: string;
    description: string;
    industry: string;
    size: '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
    founded: number;
    location: string;
    headquarters: string;
    website: string;
    rating: number;
    reviewCount: number;
    openPositions: number;
    isFollowed: boolean;
    followedDate: string;
    lastActivity: string;
    employeeBenefits: string[];
    technologies: string[];
    funding?: { stage: string; amount: string; investors: string[] };
    socialMedia: { linkedin?: string; twitter?: string; facebook?: string };
    companyType: 'Public' | 'Private' | 'Startup' | 'Non-profit' | 'Government';
    recentUpdates: CompanyUpdate[];
}

interface CompanyUpdate {
    id: string;
    type: 'job-posted' | 'funding' | 'news' | 'review' | 'hiring';
    title: string;
    description: string;
    date: string;
    isRead: boolean;
}

export default function FollowedCompaniesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
    const [selectedSize, setSelectedSize] = useState<string>('all');
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [sortBy, setSortBy] = useState('followed-date');
    const [showFilters, setShowFilters] = useState(false);
    const [showUpdates, setShowUpdates] = useState<string | null>(null);

    const followedCompanies: FollowedCompany[] = [
        {
            id: '1',
            name: 'TechCorp Inc.',
            logo: 'TC',
            description:
                'Leading technology company specializing in cloud solutions and enterprise software.',
            industry: 'Technology',
            size: '1000+',
            founded: 2010,
            location: 'San Francisco, CA',
            headquarters: 'San Francisco, CA',
            website: 'techcorp.com',
            rating: 4.2,
            reviewCount: 156,
            openPositions: 23,
            isFollowed: true,
            followedDate: '2024-01-15',
            lastActivity: '2024-01-30',
            employeeBenefits: ['Health Insurance', '401k', 'Remote Work', 'Stock Options'],
            technologies: ['AWS', 'React', 'Node.js', 'Python', 'Kubernetes'],
            funding: { stage: 'Public', amount: 'IPO', investors: ['Public Markets'] },
            socialMedia: { linkedin: 'linkedin.com/company/techcorp', twitter: '@techcorp' },
            companyType: 'Public',
            recentUpdates: [
                {
                    id: '1',
                    type: 'job-posted',
                    title: 'Senior Software Engineer - Backend',
                    description: 'New position opened for backend development team',
                    date: '2024-01-30',
                    isRead: false,
                },
                {
                    id: '2',
                    type: 'news',
                    title: 'Q4 Earnings Report Released',
                    description: 'Company reports strong Q4 performance with 25% revenue growth',
                    date: '2024-01-28',
                    isRead: true,
                },
            ],
        },
        {
            id: '2',
            name: 'StartupXYZ',
            logo: 'SX',
            description: 'Innovative startup focused on AI-powered customer analytics.',
            industry: 'Technology',
            size: '51-200',
            founded: 2020,
            location: 'Austin, TX',
            headquarters: 'Austin, TX',
            website: 'startupxyz.com',
            rating: 4.5,
            reviewCount: 89,
            openPositions: 12,
            isFollowed: true,
            followedDate: '2024-01-10',
            lastActivity: '2024-01-29',
            employeeBenefits: ['Health Insurance', 'Equity', 'Flexible Hours', 'Learning Budget'],
            technologies: ['Python', 'TensorFlow', 'React', 'AWS', 'Docker'],
            funding: { stage: 'Series B', amount: '$25M', investors: ['Sequoia', 'Andreessen'] },
            socialMedia: { linkedin: 'linkedin.com/company/startupxyz' },
            companyType: 'Startup',
            recentUpdates: [
                {
                    id: '3',
                    type: 'funding',
                    title: 'Series B Funding Round',
                    description: 'Company raises $25M in Series B funding led by Sequoia',
                    date: '2024-01-29',
                    isRead: false,
                },
                {
                    id: '4',
                    type: 'hiring',
                    title: 'Expanding Engineering Team',
                    description: 'Multiple engineering positions opened across teams',
                    date: '2024-01-25',
                    isRead: true,
                },
            ],
        },
        {
            id: '3',
            name: 'Enterprise Solutions',
            logo: 'ES',
            description:
                'Enterprise software company providing business solutions for large corporations.',
            industry: 'Technology',
            size: '1000+',
            founded: 2005,
            location: 'New York, NY',
            headquarters: 'New York, NY',
            website: 'enterprisesolutions.com',
            rating: 3.8,
            reviewCount: 234,
            openPositions: 18,
            isFollowed: true,
            followedDate: '2024-01-05',
            lastActivity: '2024-01-27',
            employeeBenefits: ['Health Insurance', '401k', 'PTO', 'Professional Development'],
            technologies: ['Java', 'Spring', 'Oracle', 'Angular', 'Docker'],
            funding: { stage: 'Public', amount: 'IPO', investors: ['Public Markets'] },
            socialMedia: { linkedin: 'linkedin.com/company/enterprisesolutions' },
            companyType: 'Public',
            recentUpdates: [
                {
                    id: '5',
                    type: 'job-posted',
                    title: 'DevOps Engineer',
                    description: 'New DevOps position in infrastructure team',
                    date: '2024-01-27',
                    isRead: false,
                },
            ],
        },
        {
            id: '4',
            name: 'AI Innovations',
            logo: 'AI',
            description:
                'Cutting-edge AI research company developing next-generation machine learning solutions.',
            industry: 'Technology',
            size: '201-500',
            founded: 2018,
            location: 'Seattle, WA',
            headquarters: 'Seattle, WA',
            website: 'aiinnovations.com',
            rating: 4.7,
            reviewCount: 67,
            openPositions: 8,
            isFollowed: true,
            followedDate: '2024-01-20',
            lastActivity: '2024-01-26',
            employeeBenefits: [
                'Health Insurance',
                'Equity',
                'Research Budget',
                'Conference Attendance',
            ],
            technologies: ['Python', 'PyTorch', 'TensorFlow', 'CUDA', 'Kubernetes'],
            funding: { stage: 'Series C', amount: '$50M', investors: ['OpenAI', 'Microsoft'] },
            socialMedia: {
                linkedin: 'linkedin.com/company/aiinnovations',
                twitter: '@aiinnovations',
            },
            companyType: 'Private',
            recentUpdates: [
                {
                    id: '6',
                    type: 'news',
                    title: 'Breakthrough in NLP Research',
                    description:
                        'Company announces major breakthrough in natural language processing',
                    date: '2024-01-26',
                    isRead: false,
                },
                {
                    id: '7',
                    type: 'job-posted',
                    title: 'Research Scientist - NLP',
                    description: 'New research position in natural language processing team',
                    date: '2024-01-24',
                    isRead: true,
                },
            ],
        },
    ];

    const industries = [
        'all',
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'E-commerce',
        'Manufacturing',
        'Consulting',
        'Media',
    ];
    const sizes = ['all', '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
    const locations = [
        'all',
        'San Francisco',
        'New York',
        'Seattle',
        'Austin',
        'Boston',
        'Denver',
        'Chicago',
        'Remote',
    ];

    const filteredCompanies = followedCompanies.filter((company) => {
        const matchesSearch =
            company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            company.technologies.some((tech) =>
                tech.toLowerCase().includes(searchQuery.toLowerCase()),
            );

        const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
        const matchesSize = selectedSize === 'all' || company.size === selectedSize;
        const matchesLocation =
            selectedLocation === 'all' || company.location.includes(selectedLocation);

        return matchesSearch && matchesIndustry && matchesSize && matchesLocation;
    });

    const sortedCompanies = [...filteredCompanies].sort((a, b) => {
        switch (sortBy) {
            case 'followed-date':
                return new Date(b.followedDate).getTime() - new Date(a.followedDate).getTime();
            case 'last-activity':
                return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
            case 'rating':
                return b.rating - a.rating;
            case 'open-positions':
                return b.openPositions - a.openPositions;
            case 'company-name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    const getSizeColor = (size: string) => {
        switch (size) {
            case '1-10':
                return 'bg-green-100 text-green-800 border-green-200';
            case '11-50':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case '51-200':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case '201-500':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case '501-1000':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case '1000+':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getIndustryColor = (industry: string) => {
        switch (industry) {
            case 'Technology':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Healthcare':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Finance':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Education':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getUpdateTypeColor = (type: string) => {
        switch (type) {
            case 'job-posted':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'funding':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'news':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'review':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'hiring':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getUpdateTypeIcon = (type: string) => {
        switch (type) {
            case 'job-posted':
                return <BriefcaseIcon className="h-4 w-4" />;
            case 'funding':
                return <CurrencyDollarIcon className="h-4 w-4" />;
            case 'news':
                return <GlobeAltIcon className="h-4 w-4" />;
            case 'review':
                return <ChatBubbleLeftRightIcon className="h-4 w-4" />;
            case 'hiring':
                return <UsersIcon className="h-4 w-4" />;
            default:
                return <BellIcon className="h-4 w-4" />;
        }
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

    const unfollowCompany = (companyId: string) => {
        // In a real app, this would update the backend
        console.log('Unfollowing company:', companyId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <HeartIcon className="h-8 w-8 text-red-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Followed Companies</h1>
                </div>
                <p className="text-gray-600">Manage and track companies you're following</p>
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Stats Overview */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Followed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {followedCompanies.length}
                                </p>
                            </div>
                            <HeartIcon className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Open Positions</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {followedCompanies.reduce(
                                        (sum, company) => sum + company.openPositions,
                                        0,
                                    )}
                                </p>
                            </div>
                            <BriefcaseIcon className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {(
                                        followedCompanies.reduce(
                                            (sum, company) => sum + company.rating,
                                            0,
                                        ) / followedCompanies.length
                                    ).toFixed(1)}
                                </p>
                            </div>
                            <StarIcon className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Unread Updates</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {followedCompanies.reduce(
                                        (sum, company) =>
                                            sum +
                                            company.recentUpdates.filter((update) => !update.isRead)
                                                .length,
                                        0,
                                    )}
                                </p>
                            </div>
                            <BellIcon className="h-8 w-8 text-orange-500" />
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200"
                            >
                                <FunnelIcon className="h-4 w-4" />
                                <span>Filters</span>
                            </button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="followed-date">Followed Date</option>
                                <option value="last-activity">Last Activity</option>
                                <option value="rating">Rating</option>
                                <option value="open-positions">Open Positions</option>
                                <option value="company-name">Company Name</option>
                            </select>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search companies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 border-t border-gray-200 pt-4"
                        >
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Industry
                                    </label>
                                    <select
                                        value={selectedIndustry}
                                        onChange={(e) => setSelectedIndustry(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    >
                                        {industries.map((industry) => (
                                            <option key={industry} value={industry}>
                                                {industry === 'all' ? 'All Industries' : industry}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Company Size
                                    </label>
                                    <select
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    >
                                        {sizes.map((size) => (
                                            <option key={size} value={size}>
                                                {size === 'all' ? 'All Sizes' : size}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Location
                                    </label>
                                    <select
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    >
                                        {locations.map((location) => (
                                            <option key={location} value={location}>
                                                {location === 'all' ? 'All Locations' : location}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Companies List */}
                <div className="space-y-4">
                    {sortedCompanies.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                            <HeartIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No followed companies found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your filters or search terms
                            </p>
                        </div>
                    ) : (
                        sortedCompanies.map((company) => (
                            <motion.div
                                key={company.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-2xl bg-white p-6 shadow-lg"
                            >
                                <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                                    <div className="flex-1">
                                        <div className="mb-4 flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white">
                                                    {company.logo}
                                                </div>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center space-x-2">
                                                    <h3 className="text-2xl font-semibold text-gray-900">
                                                        {company.name}
                                                    </h3>
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getIndustryColor(company.industry)}`}
                                                    >
                                                        {company.industry}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getSizeColor(company.size)}`}
                                                    >
                                                        {company.size}
                                                    </span>
                                                </div>

                                                <p className="mb-3 text-gray-600">
                                                    {company.description}
                                                </p>

                                                <div className="mb-3 flex items-center space-x-4 text-sm text-gray-500">
                                                    <span className="flex items-center">
                                                        <MapPinIcon className="mr-1 h-4 w-4" />
                                                        {company.location}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <BuildingOfficeIcon className="mr-1 h-4 w-4" />
                                                        Founded {company.founded}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <StarIcon className="mr-1 h-4 w-4" />
                                                        {company.rating} ({company.reviewCount}{' '}
                                                        reviews)
                                                    </span>
                                                    <span className="flex items-center">
                                                        <BriefcaseIcon className="mr-1 h-4 w-4" />
                                                        {company.openPositions} open positions
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Technologies
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {company.technologies.map((tech, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Employee Benefits
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {company.employeeBenefits.map(
                                                        (benefit, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                                                            >
                                                                {benefit}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {company.funding && (
                                            <div className="mb-4">
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Funding
                                                </h4>
                                                <div className="flex items-center space-x-2">
                                                    <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                                                        {company.funding.stage}
                                                    </span>
                                                    {company.funding.amount !== 'IPO' && (
                                                        <span className="text-sm text-gray-600">
                                                            {company.funding.amount}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                                            <span>
                                                Following since: {getTimeAgo(company.followedDate)}
                                            </span>
                                            <span>
                                                Last activity: {getTimeAgo(company.lastActivity)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <button className="flex items-center space-x-2 rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition-colors duration-200 hover:bg-blue-200">
                                                <EyeIcon className="h-4 w-4" />
                                                <span>View Company</span>
                                            </button>
                                            <button className="flex items-center space-x-2 rounded-lg bg-red-100 px-4 py-2 text-red-700 transition-colors duration-200 hover:bg-red-200">
                                                <MinusIcon className="h-4 w-4" />
                                                <span>Unfollow</span>
                                            </button>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                                <GlobeAltIcon className="h-4 w-4" />
                                                <span>Website</span>
                                            </button>
                                            <button className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                                <ChatBubbleLeftRightIcon className="h-4 w-4" />
                                                <span>Reviews</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Updates */}
                                <div className="mt-6 border-t border-gray-200 pt-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h4 className="font-medium text-gray-900">
                                            Recent Updates ({company.recentUpdates.length})
                                        </h4>
                                        <button
                                            onClick={() =>
                                                setShowUpdates(
                                                    showUpdates === company.id ? null : company.id,
                                                )
                                            }
                                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            {showUpdates === company.id
                                                ? 'Hide Updates'
                                                : 'Show Updates'}
                                        </button>
                                    </div>

                                    {showUpdates === company.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-3"
                                        >
                                            {company.recentUpdates.map((update) => (
                                                <div
                                                    key={update.id}
                                                    className={`rounded-lg border p-3 ${update.isRead ? 'bg-gray-50' : 'bg-blue-50'}`}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-start space-x-3">
                                                            <span
                                                                className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getUpdateTypeColor(update.type)}`}
                                                            >
                                                                {getUpdateTypeIcon(update.type)}
                                                                <span className="ml-1">
                                                                    {update.type
                                                                        .replace('-', ' ')
                                                                        .replace(/\b\w/g, (l) =>
                                                                            l.toUpperCase(),
                                                                        )}
                                                                </span>
                                                            </span>
                                                            <div>
                                                                <h5 className="font-medium text-gray-900">
                                                                    {update.title}
                                                                </h5>
                                                                <p className="text-sm text-gray-600">
                                                                    {update.description}
                                                                </p>
                                                                <span className="text-xs text-gray-500">
                                                                    {getTimeAgo(update.date)}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {!update.isRead && (
                                                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
