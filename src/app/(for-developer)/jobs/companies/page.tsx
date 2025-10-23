'use client';

import { useState } from 'react';
import {
    BriefcaseIcon,
    BuildingOfficeIcon,
    ChartBarIcon,
    ClockIcon,
    CurrencyDollarIcon,
    EnvelopeIcon,
    ExternalLinkIcon,
    EyeIcon,
    GlobeAltIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    PhoneIcon,
    PlusIcon,
    StarIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Company {
    id: string;
    name: string;
    logo: string;
    industry: string;
    size: 'Startup' | 'Small' | 'Medium' | 'Large' | 'Enterprise';
    location: string;
    website: string;
    description: string;
    founded: number;
    employeeCount: string;
    rating: number;
    reviewCount: number;
    isFollowed: boolean;
    openPositions: number;
    avgSalary: string;
    benefits: string[];
    technologies: string[];
    companyType: 'Public' | 'Private' | 'Non-profit';
    funding?: string;
    lastUpdated: string;
}

interface CompanyReview {
    id: string;
    companyId: string;
    reviewerName: string;
    position: string;
    rating: number;
    reviewDate: string;
    pros: string[];
    cons: string[];
    summary: string;
    isVerified: boolean;
    helpfulCount: number;
}

export default function CompaniesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('browse');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedIndustry, setSelectedIndustry] = useState('all');
    const [selectedSize, setSelectedSize] = useState('all');

    const tabs = [
        { id: 'browse', label: 'Browse Companies', icon: BuildingOfficeIcon },
        { id: 'reviews', label: 'Company Reviews', icon: StarIcon },
        { id: 'followed', label: 'Followed Companies', icon: HeartIcon },
    ];

    const filters = [
        { id: 'all', label: 'All Companies' },
        { id: 'hiring', label: 'Currently Hiring' },
        { id: 'high-rated', label: 'High Rated' },
        { id: 'recent', label: 'Recently Updated' },
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
        'Transportation',
    ];

    const sizes = ['all', 'Startup', 'Small', 'Medium', 'Large', 'Enterprise'];

    const companies: Company[] = [
        {
            id: '1',
            name: 'TechCorp',
            logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
            industry: 'Technology',
            size: 'Large',
            location: 'San Francisco, CA',
            website: 'https://techcorp.com',
            description:
                'Leading technology company specializing in cloud computing and artificial intelligence solutions.',
            founded: 2010,
            employeeCount: '5,000-10,000',
            rating: 4.5,
            reviewCount: 1247,
            isFollowed: true,
            openPositions: 23,
            avgSalary: '$120,000',
            benefits: [
                'Health Insurance',
                'Remote Work',
                'Stock Options',
                'Professional Development',
            ],
            technologies: ['React', 'Python', 'AWS', 'Kubernetes', 'Machine Learning'],
            companyType: 'Public',
            funding: '$500M Series D',
            lastUpdated: '2024-01-20',
        },
        {
            id: '2',
            name: 'DataFlow',
            logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
            industry: 'Technology',
            size: 'Medium',
            location: 'Austin, TX',
            website: 'https://dataflow.io',
            description: 'Data analytics platform helping businesses make data-driven decisions.',
            founded: 2018,
            employeeCount: '100-500',
            rating: 4.3,
            reviewCount: 892,
            isFollowed: false,
            openPositions: 8,
            avgSalary: '$95,000',
            benefits: ['Flexible Hours', 'Health Benefits', 'Learning Budget', 'Team Events'],
            technologies: ['Python', 'JavaScript', 'PostgreSQL', 'Redis', 'Docker'],
            companyType: 'Private',
            funding: '$25M Series B',
            lastUpdated: '2024-01-18',
        },
        {
            id: '3',
            name: 'CloudScale',
            logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop',
            industry: 'Technology',
            size: 'Large',
            location: 'New York, NY',
            website: 'https://cloudscale.com',
            description: 'Enterprise cloud infrastructure and DevOps solutions provider.',
            founded: 2015,
            employeeCount: '1,000-5,000',
            rating: 4.7,
            reviewCount: 1567,
            isFollowed: true,
            openPositions: 15,
            avgSalary: '$130,000',
            benefits: [
                'Competitive Salary',
                'Health & Wellness',
                'Professional Growth',
                'Modern Office',
            ],
            technologies: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Go'],
            companyType: 'Public',
            funding: '$200M IPO',
            lastUpdated: '2024-01-15',
        },
        {
            id: '4',
            name: 'DesignHub',
            logo: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop',
            industry: 'Media',
            size: 'Small',
            location: 'London, UK',
            website: 'https://designhub.co.uk',
            description: 'Creative design agency specializing in digital products and branding.',
            founded: 2020,
            employeeCount: '10-50',
            rating: 4.4,
            reviewCount: 187,
            isFollowed: false,
            openPositions: 3,
            avgSalary: '£45,000',
            benefits: [
                'Creative Environment',
                'Flexible Working',
                'Professional Tools',
                'Team Outings',
            ],
            technologies: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Webflow', 'Framer'],
            companyType: 'Private',
            funding: 'Bootstrapped',
            lastUpdated: '2024-01-12',
        },
        {
            id: '5',
            name: 'AITech',
            logo: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=150&h=150&fit=crop',
            industry: 'Technology',
            size: 'Medium',
            location: 'Berlin, Germany',
            website: 'https://aitech.de',
            description: 'Artificial intelligence research and development company.',
            founded: 2019,
            employeeCount: '100-500',
            rating: 4.6,
            reviewCount: 223,
            isFollowed: true,
            openPositions: 12,
            avgSalary: '€75,000',
            benefits: [
                'Research Focus',
                'Conference Attendance',
                'Flexible Hours',
                'Modern Equipment',
            ],
            technologies: ['Python', 'TensorFlow', 'PyTorch', 'CUDA', 'Cloud Computing'],
            companyType: 'Private',
            funding: '$50M Series C',
            lastUpdated: '2024-01-10',
        },
        {
            id: '6',
            name: 'ProductLab',
            logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop',
            industry: 'Technology',
            size: 'Startup',
            location: 'Toronto, Canada',
            website: 'https://productlab.ca',
            description: 'Product management platform for agile teams.',
            founded: 2022,
            employeeCount: '10-50',
            rating: 4.2,
            reviewCount: 134,
            isFollowed: false,
            openPositions: 5,
            avgSalary: 'CAD 85,000',
            benefits: ['Equity', 'Remote First', 'Health Benefits', 'Learning Resources'],
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
            companyType: 'Private',
            funding: '$5M Seed',
            lastUpdated: '2024-01-08',
        },
    ];

    const companyReviews: CompanyReview[] = [
        {
            id: '1',
            companyId: '1',
            reviewerName: 'Sarah Johnson',
            position: 'Senior Software Engineer',
            rating: 5,
            reviewDate: '2024-01-15',
            pros: [
                'Great work-life balance',
                'Excellent benefits',
                'Smart colleagues',
                'Interesting projects',
            ],
            cons: ['Sometimes bureaucratic', 'Meetings can be long'],
            summary: 'Overall a great place to work with excellent opportunities for growth.',
            isVerified: true,
            helpfulCount: 23,
        },
        {
            id: '2',
            companyId: '2',
            reviewerName: 'Mike Chen',
            position: 'Data Scientist',
            rating: 4,
            reviewDate: '2024-01-12',
            pros: ['Flexible work environment', 'Good learning opportunities', 'Friendly team'],
            cons: ['Salary could be better', 'Limited career progression'],
            summary: 'Good company for learning and growth, especially early in career.',
            isVerified: true,
            helpfulCount: 15,
        },
        {
            id: '3',
            companyId: '3',
            reviewerName: 'Alex Rodriguez',
            position: 'DevOps Engineer',
            rating: 5,
            reviewDate: '2024-01-10',
            pros: [
                'Competitive compensation',
                'Modern tech stack',
                'Professional development',
                'Great culture',
            ],
            cons: ['Fast-paced environment', 'High expectations'],
            summary: 'Excellent company with great opportunities for experienced professionals.',
            isVerified: true,
            helpfulCount: 31,
        },
    ];

    const getFilteredCompanies = () => {
        let filteredCompanies = companies;

        // Filter by search query
        if (searchQuery) {
            filteredCompanies = filteredCompanies.filter(
                (company) =>
                    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    company.description.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }

        // Apply additional filters
        if (selectedFilter === 'hiring') {
            filteredCompanies = filteredCompanies.filter((company) => company.openPositions > 0);
        } else if (selectedFilter === 'high-rated') {
            filteredCompanies = filteredCompanies.filter((company) => company.rating >= 4.5);
        } else if (selectedFilter === 'recent') {
            filteredCompanies = filteredCompanies.filter((company) => {
                const updatedDate = new Date(company.lastUpdated);
                const now = new Date();
                const diffInDays = Math.floor(
                    (now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60 * 24),
                );
                return diffInDays <= 7;
            });
        }

        // Filter by industry
        if (selectedIndustry !== 'all') {
            filteredCompanies = filteredCompanies.filter(
                (company) => company.industry === selectedIndustry,
            );
        }

        // Filter by size
        if (selectedSize !== 'all') {
            filteredCompanies = filteredCompanies.filter(
                (company) => company.size === selectedSize,
            );
        }

        return filteredCompanies;
    };

    const getFilteredReviews = () => {
        let filteredReviews = companyReviews;

        // Filter by search query
        if (searchQuery) {
            filteredReviews = filteredReviews.filter(
                (review) =>
                    review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    review.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    review.summary.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }

        return filteredReviews;
    };

    const filteredCompanies = getFilteredCompanies();
    const filteredReviews = getFilteredReviews();

    const toggleFollow = (companyId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle follow for company:', companyId);
    };

    const getSizeColor = (size: string) => {
        switch (size) {
            case 'Startup':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Small':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Large':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Enterprise':
                return 'bg-orange-100 text-orange-800 border-orange-200';
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
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'E-commerce':
                return 'bg-pink-100 text-pink-800 border-pink-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
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

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon
                key={i}
                className={`h-4 w-4 ${
                    i < Math.floor(rating)
                        ? 'fill-current text-yellow-400'
                        : i < rating
                          ? 'fill-current text-yellow-400 opacity-50'
                          : 'text-gray-300'
                }`}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Companies</h1>
                <p className="text-gray-600">
                    Discover and research companies to find your next career opportunity
                </p>
            </div>

            {/* Tabs */}
            <div className="mb-6">
                <div className="flex space-x-1 rounded-xl bg-white p-1 shadow-sm">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`flex flex-1 items-center justify-center space-x-2 rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
                                    selectedTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{tab.label}</span>
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
                        placeholder={`Search ${selectedTab === 'browse' ? 'companies' : selectedTab === 'reviews' ? 'reviews' : 'followed companies'}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Filters */}
                {selectedTab === 'browse' && (
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

                        {/* Industry Filter */}
                        <select
                            value={selectedIndustry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            {industries.map((industry) => (
                                <option key={industry} value={industry}>
                                    {industry === 'all' ? 'All Industries' : industry}
                                </option>
                            ))}
                        </select>

                        {/* Size Filter */}
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            {sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size === 'all' ? 'All Sizes' : size}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Content */}
            {selectedTab === 'browse' ? (
                <>
                    {/* Company Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing{' '}
                            <span className="font-semibold text-gray-900">
                                {filteredCompanies.length}
                            </span>{' '}
                            companies
                        </p>
                    </div>

                    {/* Companies Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {filteredCompanies.map((company) => (
                            <motion.div
                                key={company.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                {/* Follow Button */}
                                <div className="absolute top-4 right-4 z-10">
                                    <button
                                        onClick={() => toggleFollow(company.id)}
                                        className={`rounded-full p-2 transition-colors duration-200 ${
                                            company.isFollowed
                                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                        title={company.isFollowed ? 'Unfollow' : 'Follow'}
                                    >
                                        <HeartIcon
                                            className={`h-5 w-5 ${company.isFollowed ? 'fill-current' : ''}`}
                                        />
                                    </button>
                                </div>

                                {/* Company Header */}
                                <div className="border-b border-gray-100 p-6">
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="mb-3 flex items-center space-x-3">
                                                <img
                                                    src={company.logo}
                                                    alt={company.name}
                                                    className="h-16 w-16 rounded-xl object-cover"
                                                />
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        {company.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                        <span>{company.industry}</span>
                                                        <span>•</span>
                                                        <span>{company.location}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div className="mb-3 flex items-center space-x-2">
                                                <div className="flex items-center space-x-1">
                                                    {renderStars(company.rating)}
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    {company.rating} ({company.reviewCount} reviews)
                                                </span>
                                            </div>

                                            {/* Tags */}
                                            <div className="mb-3 flex items-center space-x-2">
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getSizeColor(company.size)}`}
                                                >
                                                    {company.size}
                                                </span>
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getIndustryColor(company.industry)}`}
                                                >
                                                    {company.industry}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                        {company.description}
                                    </p>

                                    {/* Company Stats */}
                                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                                        <div className="text-center">
                                            <div className="font-semibold text-gray-900">
                                                {company.openPositions}
                                            </div>
                                            <div>Open Positions</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-gray-900">
                                                {company.avgSalary}
                                            </div>
                                            <div>Avg Salary</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-gray-900">
                                                {company.employeeCount}
                                            </div>
                                            <div>Employees</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Company Details */}
                                <div className="p-6">
                                    {/* Technologies */}
                                    <div className="mb-4">
                                        <h5 className="mb-2 text-sm font-medium text-gray-700">
                                            Technologies:
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                            {company.technologies.slice(0, 5).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {company.technologies.length > 5 && (
                                                <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600">
                                                    +{company.technologies.length - 5} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Benefits */}
                                    <div className="mb-4">
                                        <h5 className="mb-2 text-sm font-medium text-gray-700">
                                            Benefits:
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                            {company.benefits.slice(0, 3).map((benefit) => (
                                                <span
                                                    key={benefit}
                                                    className="rounded-md bg-green-50 px-2 py-1 text-xs text-green-700"
                                                >
                                                    {benefit}
                                                </span>
                                            ))}
                                            {company.benefits.length > 3 && (
                                                <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600">
                                                    +{company.benefits.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                            View Jobs
                                        </button>
                                        <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                            Company Profile
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredCompanies.length === 0 && (
                        <div className="py-12 text-center">
                            <BuildingOfficeIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No companies found
                            </h3>
                            <p className="text-gray-600">
                                Try adjusting your search or filter criteria.
                            </p>
                        </div>
                    )}
                </>
            ) : selectedTab === 'reviews' ? (
                <>
                    {/* Reviews Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing{' '}
                            <span className="font-semibold text-gray-900">
                                {filteredReviews.length}
                            </span>{' '}
                            reviews
                        </p>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                        {filteredReviews.map((review) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center space-x-3">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {review.reviewerName}
                                            </h3>
                                            {review.isVerified && (
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                    Verified
                                                </span>
                                            )}
                                        </div>

                                        <div className="mb-2 text-gray-600">
                                            <span className="font-medium">{review.position}</span>{' '}
                                            at{' '}
                                            {companies.find((c) => c.id === review.companyId)?.name}
                                        </div>

                                        <div className="mb-3 flex items-center space-x-2">
                                            <div className="flex items-center space-x-1">
                                                {renderStars(review.rating)}
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {getTimeAgo(review.reviewDate)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <HeartIcon className="h-4 w-4" />
                                            <span>{review.helpfulCount}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="text-gray-700">{review.summary}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {/* Pros */}
                                    <div>
                                        <h5 className="mb-2 text-sm font-medium text-green-700">
                                            Pros:
                                        </h5>
                                        <ul className="space-y-1">
                                            {review.pros.map((pro, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center text-sm text-gray-600"
                                                >
                                                    <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                                                    {pro}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Cons */}
                                    <div>
                                        <h5 className="mb-2 text-sm font-medium text-red-700">
                                            Cons:
                                        </h5>
                                        <ul className="space-y-1">
                                            {review.cons.map((con, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center text-sm text-gray-600"
                                                >
                                                    <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
                                                    {con}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredReviews.length === 0 && (
                        <div className="py-12 text-center">
                            <StarIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No reviews found
                            </h3>
                            <p className="text-gray-600">
                                No company reviews match your search criteria.
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* Followed Companies Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing{' '}
                            <span className="font-semibold text-gray-900">
                                {companies.filter((c) => c.isFollowed).length}
                            </span>{' '}
                            followed companies
                        </p>
                    </div>

                    {/* Followed Companies Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {companies
                            .filter((c) => c.isFollowed)
                            .map((company) => (
                                <motion.div
                                    key={company.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                                >
                                    {/* Followed Badge */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="inline-flex items-center rounded-full border border-red-200 bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                            <HeartIcon className="mr-1 h-3 w-3 fill-current" />
                                            Following
                                        </span>
                                    </div>

                                    {/* Company Header */}
                                    <div className="border-b border-gray-100 p-6">
                                        <div className="mb-3 flex items-center space-x-3">
                                            <img
                                                src={company.logo}
                                                alt={company.name}
                                                className="h-12 w-12 rounded-lg object-cover"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {company.name}
                                                </h3>
                                                <div className="text-sm text-gray-600">
                                                    {company.industry}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 flex items-center space-x-2">
                                            <span
                                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getSizeColor(company.size)}`}
                                            >
                                                {company.size}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {company.location}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                            <div>
                                                <span className="font-medium">Open Positions:</span>{' '}
                                                {company.openPositions}
                                            </div>
                                            <div>
                                                <span className="font-medium">Rating:</span>{' '}
                                                {company.rating}/5
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company Actions */}
                                    <div className="p-6">
                                        <div className="flex space-x-3">
                                            <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                                View Jobs
                                            </button>
                                            <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                                Company Profile
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>

                    {/* Empty State */}
                    {companies.filter((c) => c.isFollowed).length === 0 && (
                        <div className="py-12 text-center">
                            <HeartIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No followed companies
                            </h3>
                            <p className="text-gray-600">
                                Start following companies to see them here and get updates on new
                                opportunities.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
