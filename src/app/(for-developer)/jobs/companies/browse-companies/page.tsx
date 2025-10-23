'use client';

import { useState } from 'react';
import {
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
    StarIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Company {
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
    employeeBenefits: string[];
    technologies: string[];
    funding?: {
        stage: string;
        amount: string;
        investors: string[];
    };
    socialMedia: {
        linkedin?: string;
        twitter?: string;
        facebook?: string;
    };
    companyType: 'Public' | 'Private' | 'Startup' | 'Non-profit' | 'Government';
}

export default function BrowseCompaniesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('all');
    const [selectedSize, setSelectedSize] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedCompanyType, setSelectedCompanyType] = useState('all');
    const [sortBy, setSortBy] = useState('rating');
    const [showFilters, setShowFilters] = useState(false);

    const companies: Company[] = [
        {
            id: '1',
            name: 'TechCorp',
            logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
            description:
                'Leading technology company specializing in cloud computing and AI solutions. We help businesses transform their digital infrastructure.',
            industry: 'Technology',
            size: '1000+',
            founded: 2010,
            location: 'San Francisco, CA',
            headquarters: 'San Francisco, CA',
            website: 'https://techcorp.com',
            rating: 4.5,
            reviewCount: 1247,
            openPositions: 89,
            isFollowed: true,
            employeeBenefits: [
                'Health insurance',
                '401(k) matching',
                'Flexible PTO',
                'Remote work options',
                'Professional development',
            ],
            technologies: ['React', 'Python', 'AWS', 'Machine Learning', 'Docker'],
            funding: {
                stage: 'Series D',
                amount: '$150M',
                investors: ['Sequoia Capital', 'Andreessen Horowitz', 'Tiger Global'],
            },
            socialMedia: {
                linkedin: 'https://linkedin.com/company/techcorp',
                twitter: 'https://twitter.com/techcorp',
            },
            companyType: 'Private',
        },
        {
            id: '2',
            name: 'CloudScale',
            logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop',
            description:
                'Enterprise cloud infrastructure provider helping companies scale their operations globally with reliable and secure solutions.',
            industry: 'Technology',
            size: '501-1000',
            founded: 2015,
            location: 'New York, NY',
            headquarters: 'New York, NY',
            website: 'https://cloudscale.com',
            rating: 4.7,
            reviewCount: 892,
            openPositions: 67,
            isFollowed: false,
            employeeBenefits: [
                'Competitive salary',
                'Stock options',
                'Health benefits',
                'Learning budget',
                'Team events',
            ],
            technologies: ['Kubernetes', 'Terraform', 'Go', 'Python', 'AWS'],
            funding: {
                stage: 'Series C',
                amount: '$75M',
                investors: ['Accel', 'Bessemer Venture Partners'],
            },
            socialMedia: {
                linkedin: 'https://linkedin.com/company/cloudscale',
            },
            companyType: 'Private',
        },
        {
            id: '3',
            name: 'AITech',
            logo: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=150&h=150&fit=crop',
            description:
                'Pioneering artificial intelligence research and development company creating cutting-edge ML solutions for various industries.',
            industry: 'Technology',
            size: '201-500',
            founded: 2018,
            location: 'Berlin, Germany',
            headquarters: 'Berlin, Germany',
            website: 'https://aitech.de',
            rating: 4.6,
            reviewCount: 456,
            openPositions: 34,
            isFollowed: true,
            employeeBenefits: [
                '30 days vacation',
                'Health insurance',
                'Professional development',
                'Flexible hours',
                'Modern office',
            ],
            technologies: ['Python', 'TensorFlow', 'PyTorch', 'CUDA', 'Docker'],
            funding: {
                stage: 'Series B',
                amount: '€45M',
                investors: ['Balderton Capital', 'Index Ventures'],
            },
            socialMedia: {
                linkedin: 'https://linkedin.com/company/aitech',
                twitter: 'https://twitter.com/aitech',
            },
            companyType: 'Startup',
        },
        {
            id: '4',
            name: 'DesignHub',
            logo: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop',
            description:
                'Creative design agency specializing in user experience design, branding, and digital product development for innovative companies.',
            industry: 'Media',
            size: '51-200',
            founded: 2012,
            location: 'London, UK',
            headquarters: 'London, UK',
            website: 'https://designhub.co.uk',
            rating: 4.4,
            reviewCount: 234,
            openPositions: 23,
            isFollowed: false,
            employeeBenefits: [
                'Creative environment',
                'Flexible working',
                'Health benefits',
                'Professional tools',
                'Team outings',
            ],
            technologies: ['Figma', 'Sketch', 'Adobe Creative Suite', 'React', 'Framer'],
            socialMedia: {
                linkedin: 'https://linkedin.com/company/designhub',
                instagram: 'https://instagram.com/designhub',
            },
            companyType: 'Private',
        },
        {
            id: '5',
            name: 'ProductLab',
            logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop',
            description:
                'Product development company focused on building innovative digital products and helping startups bring their ideas to market.',
            industry: 'Technology',
            size: '11-50',
            founded: 2020,
            location: 'Toronto, Canada',
            headquarters: 'Toronto, Canada',
            website: 'https://productlab.ca',
            rating: 4.2,
            reviewCount: 156,
            openPositions: 12,
            isFollowed: false,
            employeeBenefits: [
                'Equity options',
                'Flexible hours',
                'Remote work',
                'Learning budget',
                'Team lunches',
            ],
            technologies: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL'],
            funding: {
                stage: 'Seed',
                amount: '$2.5M',
                investors: ['Local Angels', 'Startup Accelerator'],
            },
            socialMedia: {
                linkedin: 'https://linkedin.com/company/productlab',
            },
            companyType: 'Startup',
        },
        {
            id: '6',
            name: 'DataFlow',
            logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&h=150&fit=crop',
            description:
                'Data analytics and business intelligence company helping organizations make data-driven decisions with advanced analytics tools.',
            industry: 'Technology',
            size: '201-500',
            founded: 2016,
            location: 'Remote',
            headquarters: 'Austin, TX',
            website: 'https://dataflow.com',
            rating: 4.3,
            reviewCount: 345,
            openPositions: 45,
            isFollowed: true,
            employeeBenefits: [
                '100% remote',
                'Competitive pay',
                'Health insurance',
                'Unlimited PTO',
                'Home office setup',
            ],
            technologies: ['Python', 'SQL', 'Tableau', 'Power BI', 'AWS'],
            funding: {
                stage: 'Series A',
                amount: '$15M',
                investors: ['Local VC', 'Angel Investors'],
            },
            socialMedia: {
                linkedin: 'https://linkedin.com/company/dataflow',
            },
            companyType: 'Private',
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
        'London',
        'Berlin',
        'Toronto',
        'Remote',
        'Austin',
    ];
    const companyTypes = ['all', 'Public', 'Private', 'Startup', 'Non-profit', 'Government'];

    const filteredCompanies = companies.filter((company) => {
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
        const matchesType =
            selectedCompanyType === 'all' || company.companyType === selectedCompanyType;

        return matchesSearch && matchesIndustry && matchesSize && matchesLocation && matchesType;
    });

    const sortedCompanies = [...filteredCompanies].sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'review-count':
                return b.reviewCount - a.reviewCount;
            case 'open-positions':
                return b.openPositions - a.openPositions;
            case 'founded':
                return a.founded - b.founded;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    const toggleFollow = (companyId: string) => {
        console.log('Toggle follow for company:', companyId);
    };

    const getSizeColor = (size: string) => {
        switch (size) {
            case '1-10':
                return 'bg-green-100 text-green-800 border-green-200';
            case '11-50':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case '51-200':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case '201-500':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case '501-1000':
                return 'bg-red-100 text-red-800 border-red-200';
            case '1000+':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getIndustryColor = (industry: string) => {
        const colors = {
            Technology: 'bg-blue-100 text-blue-800 border-blue-200',
            Healthcare: 'bg-green-100 text-green-800 border-green-200',
            Finance: 'bg-purple-100 text-purple-800 border-purple-200',
            Education: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'E-commerce': 'bg-pink-100 text-pink-800 border-pink-200',
            Manufacturing: 'bg-indigo-100 text-indigo-800 border-indigo-200',
            Consulting: 'bg-gray-100 text-gray-800 border-gray-200',
            Media: 'bg-red-100 text-red-800 border-red-200',
        };
        return (
            colors[industry as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Browse Companies</h1>
                </div>
                <p className="text-gray-600">
                    Discover and research companies to find your next career opportunity
                </p>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Companies</p>
                            <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-green-100 p-2">
                            <BriefcaseIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Open Positions</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {companies.reduce((acc, company) => acc + company.openPositions, 0)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-purple-100 p-2">
                            <StarIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Avg. Rating</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {(
                                    companies.reduce((acc, company) => acc + company.rating, 0) /
                                    companies.length
                                ).toFixed(1)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-orange-100 p-2">
                            <HeartIcon className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Following</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {companies.filter((company) => company.isFollowed).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                    <div className="max-w-md flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search companies, industries, or technologies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 transition-colors duration-200 hover:bg-gray-50"
                        >
                            <FunnelIcon className="h-4 w-4" />
                            <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
                        </button>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="rating">Sort by Rating</option>
                            <option value="review-count">Sort by Reviews</option>
                            <option value="open-positions">Sort by Open Positions</option>
                            <option value="founded">Sort by Founded Year</option>
                            <option value="name">Sort by Name</option>
                        </select>
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
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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

                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                {locations.map((location) => (
                                    <option key={location} value={location}>
                                        {location === 'all' ? 'All Locations' : location}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedCompanyType}
                                onChange={(e) => setSelectedCompanyType(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                {companyTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type === 'all' ? 'All Types' : type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {sortedCompanies.map((company) => (
                    <motion.div
                        key={company.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
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
                                        <div className="flex-1">
                                            <h3 className="mb-1 text-xl font-semibold text-gray-900">
                                                {company.name}
                                            </h3>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
                                                <span>{company.rating}</span>
                                                <span>({company.reviewCount} reviews)</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-3 flex items-center space-x-2">
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getIndustryColor(company.industry)}`}
                                        >
                                            {company.industry}
                                        </span>
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getSizeColor(company.size)}`}
                                        >
                                            {company.size} employees
                                        </span>
                                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                            {company.companyType}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="line-clamp-2 text-sm text-gray-600">
                                        {company.description}
                                    </p>
                                </div>

                                {/* Follow Button */}
                                <button
                                    onClick={() => toggleFollow(company.id)}
                                    className={`rounded-lg p-2 transition-colors duration-200 ${
                                        company.isFollowed
                                            ? 'bg-red-100 text-red-600'
                                            : 'text-gray-400 hover:bg-red-50 hover:text-red-600'
                                    }`}
                                >
                                    <HeartIcon className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Company Info Grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <MapPinIcon className="h-4 w-4" />
                                    <span>{company.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <UsersIcon className="h-4 w-4" />
                                    <span>{company.openPositions} open positions</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <BriefcaseIcon className="h-4 w-4" />
                                    <span>Founded {company.founded}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <GlobeAltIcon className="h-4 w-4" />
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Website
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Company Content */}
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
                                            className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
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
                            {company.employeeBenefits && (
                                <div className="mb-4">
                                    <h5 className="mb-2 text-sm font-medium text-gray-700">
                                        Employee Benefits:
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {company.employeeBenefits.slice(0, 3).map((benefit) => (
                                            <span
                                                key={benefit}
                                                className="rounded-md bg-green-100 px-2 py-1 text-xs text-green-700"
                                            >
                                                {benefit}
                                            </span>
                                        ))}
                                        {company.employeeBenefits.length > 3 && (
                                            <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600">
                                                +{company.employeeBenefits.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Funding Info */}
                            {company.funding && (
                                <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                                    <h5 className="mb-1 text-sm font-medium text-blue-800">
                                        Funding:
                                    </h5>
                                    <div className="text-sm text-blue-700">
                                        <span className="font-medium">{company.funding.stage}</span>{' '}
                                        - {company.funding.amount}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between">
                                <div className="flex space-x-3">
                                    <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                        View Company
                                    </button>
                                    <button className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                        View Jobs
                                    </button>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <EyeIcon className="h-4 w-4" />
                                        <span>{company.reviewCount}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                                        <span>{company.openPositions}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {sortedCompanies.length === 0 && (
                <div className="py-12 text-center">
                    <BuildingOfficeIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No companies found</h3>
                    <p className="text-gray-600">
                        Try adjusting your search criteria or filters to find more companies.
                    </p>
                </div>
            )}
        </div>
    );
}
