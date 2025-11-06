'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Building2,
    Calendar,
    Clock,
    Filter,
    MapPin,
    Minus,
    Plus,
    Search,
    Wifi,
    X,
} from 'lucide-react';
import { DualRangeSlider } from '@/shared/components/ui/DualRangeSlider';

interface SearchParams {
    'search[keywords]'?: string;
    page?: string;
    'search[type]'?: string;
    'search[last_slider]'?: string;
    'search[newer_than]'?: string;
    'search[payrate_start]'?: string;
    'search[payrate_end]'?: string;
    'search[payrate_null]'?: string;
    'search[budget_start]'?: string;
    'search[budget_end]'?: string;
    'search[budget_null]'?: string;
    'search[experience_level]'?: string;
    'search[countries][]'?: string | string[];
    'search[languages][]'?: string | string[];
}

interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'hourly' | 'full time' | 'fixed price';
    payRate?: string;
    postedTime: string;
    description: string;
    tags: string[];
    remote: boolean;
}

export default function JobSearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Filter states
    const [keywords, setKeywords] = useState('');
    const [skills, setSkills] = useState('');
    const [jobType, setJobType] = useState<{
        fullTime: boolean;
        hourly: boolean;
        fixedPrice: boolean;
    }>({
        fullTime: false,
        hourly: false,
        fixedPrice: false,
    });
    const [newerThan, setNewerThan] = useState('');
    const [payRateStart, setPayRateStart] = useState(1);
    const [payRateEnd, setPayRateEnd] = useState(100);
    const [includePayRateNull, setIncludePayRateNull] = useState(true);
    const [budgetStart, setBudgetStart] = useState(1);
    const [budgetEnd, setBudgetEnd] = useState(100000);
    const [includeBudgetNull, setIncludeBudgetNull] = useState(true);
    const [experienceLevel, setExperienceLevel] = useState('-1');
    const [countries, setCountries] = useState('');
    const [languages, setLanguages] = useState('');

    // Results
    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [totalResults, setTotalResults] = useState(795);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('relevance');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Initialize from URL params
    useEffect(() => {
        const params: SearchParams = {};
        searchParams.forEach((value, key) => {
            if (key.includes('[]')) {
                // Handle array params
                const baseKey = key.replace('[]', '');
                if (!params[baseKey as keyof SearchParams]) {
                    params[baseKey as keyof SearchParams] = [];
                }
                (params[baseKey as keyof SearchParams] as string[]).push(value);
            } else {
                params[key as keyof SearchParams] = value;
            }
        });

        setKeywords(params['search[keywords]'] || '');
        setSkills('');
        setNewerThan(params['search[newer_than]'] || '');
        setPayRateStart(Number(params['search[payrate_start]']) || 1);
        setPayRateEnd(Number(params['search[payrate_end]']) || 100);
        setIncludePayRateNull(
            params['search[payrate_null]'] === '1' || !params['search[payrate_null]'],
        );
        setBudgetStart(Number(params['search[budget_start]']) || 1);
        setBudgetEnd(Number(params['search[budget_end]']) || 100000);
        setIncludeBudgetNull(
            params['search[budget_null]'] === '1' || !params['search[budget_null]'],
        );
        setExperienceLevel(params['search[experience_level]'] || '-1');
        setCurrentPage(Number(params.page) || 1);
    }, [searchParams]);

    // Mock job data
    useEffect(() => {
        const mockJobs: JobListing[] = [
            {
                id: '1',
                title: 'youtube automation and video editing',
                company: 'De Juvis Multilink LTD',
                location: 'Nnewi, Anambra, Nigeria',
                type: 'hourly',
                payRate: '$5/hr',
                postedTime: '1 hour ago',
                description: 'Looking for a skilled YouTube automation and video editing expert...',
                tags: ['Video Production & Editing'],
                remote: true,
            },
            {
                id: '2',
                title: 'Full Stack Developer (Remote - from the Philippines) Canadian',
                company: "L'EVATE Inc.",
                location: 'Canada, Canada, Canada',
                type: 'full time',
                payRate: '$12/hr',
                postedTime: '2 hours ago',
                description: 'We are a Canadian fintech company looking for...',
                tags: ['C#', 'API Development', 'Full Stack'],
                remote: true,
            },
            {
                id: '3',
                title: 'Appointment Setter (Commission-Only)',
                company: 'DeWit-Agency',
                location: 'Amsterdam, Noord-Brabant, Netherlands',
                type: 'full time',
                payRate: '$20/hr',
                postedTime: '2 hours ago',
                description: 'We are looking for an experienced appointment setter...',
                tags: [
                    'Advertising',
                    'Instagram',
                    'Appointment Setting',
                    'Digital Marketing',
                    'Google Ads',
                    'Sales',
                    'Facebook Advertising',
                ],
                remote: true,
            },
            {
                id: '4',
                title: 'WordPress Elementor Trainer - Short-Term',
                company: 'The Entertainment Agency',
                location: 'London, London, United Kingdom',
                type: 'hourly',
                payRate: '$8/hr',
                postedTime: '4 hours ago',
                description: 'We need a WordPress Elementor expert to provide training...',
                tags: [
                    'Elementor',
                    'WordPress Administration',
                    'Training',
                    'Website Management',
                    'SEO (Search Engine Optimization)',
                ],
                remote: true,
            },
            {
                id: '5',
                title: 'Senior React Developer',
                company: 'TechCorp Solutions',
                location: 'San Francisco, CA, USA',
                type: 'full time',
                payRate: '$45/hr',
                postedTime: '5 hours ago',
                description: 'Join our dynamic team building cutting-edge web applications...',
                tags: ['React', 'TypeScript', 'Next.js', 'JavaScript'],
                remote: true,
            },
            {
                id: '6',
                title: 'UI/UX Designer',
                company: 'Design Studio Pro',
                location: 'New York, NY, USA',
                type: 'hourly',
                payRate: '$35/hr',
                postedTime: '6 hours ago',
                description: 'Create beautiful and intuitive user experiences...',
                tags: ['Figma', 'UI Design', 'UX Design', 'Prototyping'],
                remote: true,
            },
            {
                id: '7',
                title: 'DevOps Engineer',
                company: 'CloudTech Inc',
                location: 'Austin, TX, USA',
                type: 'full time',
                payRate: '$55/hr',
                postedTime: '7 hours ago',
                description: 'Manage and optimize cloud infrastructure...',
                tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
                remote: true,
            },
            {
                id: '8',
                title: 'Content Writer',
                company: 'Content Creators LLC',
                location: 'Portland, OR, USA',
                type: 'hourly',
                payRate: '$25/hr',
                postedTime: '8 hours ago',
                description: 'Write engaging content for blogs and marketing materials...',
                tags: ['Content Writing', 'SEO', 'Copywriting', 'Blog Writing'],
                remote: true,
            },
            {
                id: '9',
                title: 'Python Backend Developer',
                company: 'DataSphere Analytics',
                location: 'Seattle, WA, USA',
                type: 'full time',
                payRate: '$50/hr',
                postedTime: '9 hours ago',
                description: 'Build scalable backend systems using Python...',
                tags: ['Python', 'Django', 'PostgreSQL', 'REST API'],
                remote: true,
            },
            {
                id: '10',
                title: 'Social Media Manager',
                company: 'Digital Marketing Co',
                location: 'Los Angeles, CA, USA',
                type: 'hourly',
                payRate: '$30/hr',
                postedTime: '10 hours ago',
                description: 'Manage social media accounts and create engaging content...',
                tags: ['Social Media', 'Content Creation', 'Analytics', 'Instagram', 'Facebook'],
                remote: true,
            },
            {
                id: '11',
                title: 'Mobile App Developer (Flutter)',
                company: 'AppMakers Studio',
                location: 'Chicago, IL, USA',
                type: 'full time',
                payRate: '$48/hr',
                postedTime: '11 hours ago',
                description: 'Develop cross-platform mobile applications...',
                tags: ['Flutter', 'Dart', 'Mobile Development', 'iOS', 'Android'],
                remote: true,
            },
            {
                id: '12',
                title: 'Graphic Designer',
                company: 'Creative Designs Ltd',
                location: 'Miami, FL, USA',
                type: 'hourly',
                payRate: '$28/hr',
                postedTime: '12 hours ago',
                description: 'Create stunning visual designs for brands and products...',
                tags: ['Adobe Illustrator', 'Photoshop', 'Branding', 'Logo Design'],
                remote: true,
            },
            {
                id: '13',
                title: 'Data Analyst',
                company: 'Analytics Pro',
                location: 'Boston, MA, USA',
                type: 'full time',
                payRate: '$42/hr',
                postedTime: '1 day ago',
                description: 'Analyze data and provide actionable insights...',
                tags: ['SQL', 'Python', 'Data Analysis', 'Excel', 'Tableau'],
                remote: true,
            },
            {
                id: '14',
                title: 'Email Marketing Specialist',
                company: 'EmailExperts Inc',
                location: 'Denver, CO, USA',
                type: 'hourly',
                payRate: '$22/hr',
                postedTime: '1 day ago',
                description: 'Create and execute email marketing campaigns...',
                tags: [
                    'Email Marketing',
                    'Mailchimp',
                    'Campaign Management',
                    'Marketing Automation',
                ],
                remote: true,
            },
            {
                id: '15',
                title: 'Node.js Backend Developer',
                company: 'Backend Solutions',
                location: 'San Diego, CA, USA',
                type: 'full time',
                payRate: '$52/hr',
                postedTime: '1 day ago',
                description: 'Build robust backend APIs using Node.js...',
                tags: ['Node.js', 'Express', 'MongoDB', 'REST API', 'GraphQL'],
                remote: true,
            },
            {
                id: '16',
                title: 'Virtual Assistant',
                company: 'Admin Support Services',
                location: 'Phoenix, AZ, USA',
                type: 'hourly',
                payRate: '$18/hr',
                postedTime: '1 day ago',
                description: 'Provide administrative support and manage daily tasks...',
                tags: [
                    'Administrative Support',
                    'Data Entry',
                    'Customer Service',
                    'Office Management',
                ],
                remote: true,
            },
            {
                id: '17',
                title: 'Angular Frontend Developer',
                company: 'Frontend Masters',
                location: 'Atlanta, GA, USA',
                type: 'full time',
                payRate: '$46/hr',
                postedTime: '2 days ago',
                description: 'Develop modern web applications with Angular...',
                tags: ['Angular', 'TypeScript', 'RxJS', 'Material Design'],
                remote: true,
            },
            {
                id: '18',
                title: 'Video Editor',
                company: 'Video Productions Co',
                location: 'Nashville, TN, USA',
                type: 'hourly',
                payRate: '$32/hr',
                postedTime: '2 days ago',
                description: 'Edit and produce high-quality video content...',
                tags: ['Premiere Pro', 'After Effects', 'Video Editing', 'Motion Graphics'],
                remote: true,
            },
            {
                id: '19',
                title: 'QA Tester',
                company: 'Quality Assurance Labs',
                location: 'Indianapolis, IN, USA',
                type: 'full time',
                payRate: '$38/hr',
                postedTime: '2 days ago',
                description: 'Test software applications and report bugs...',
                tags: ['QA Testing', 'Manual Testing', 'Bug Tracking', 'Test Cases'],
                remote: true,
            },
            {
                id: '20',
                title: 'Project Manager',
                company: 'Project Management Pro',
                location: 'Columbus, OH, USA',
                type: 'full time',
                payRate: '$40/hr',
                postedTime: '2 days ago',
                description: 'Manage projects and coordinate team efforts...',
                tags: ['Project Management', 'Agile', 'Scrum', 'Team Leadership'],
                remote: true,
            },
        ];
        setJobs(mockJobs);
    }, []);

    const updateURL = useCallback(() => {
        const params = new URLSearchParams();
        if (keywords) params.set('search[keywords]', keywords);
        params.set('page', currentPage.toString());
        if (jobType.fullTime || jobType.hourly || jobType.fixedPrice) {
            params.set('search[type]', '');
        }
        params.set('search[last_slider]', '');
        if (newerThan) params.set('search[newer_than]', newerThan);
        params.set('search[payrate_start]', payRateStart.toString());
        params.set('search[payrate_end]', payRateEnd.toString());
        params.set('search[payrate_null]', includePayRateNull ? '1' : '0');
        params.set('search[budget_start]', budgetStart.toString());
        params.set('search[budget_end]', budgetEnd.toString());
        params.set('search[budget_null]', includeBudgetNull ? '1' : '0');
        params.set('search[experience_level]', experienceLevel);
        if (countries) {
            params.append('search[countries][]', countries);
        }
        if (languages) {
            params.append('search[languages][]', languages);
        }

        router.push(`/search/jobs?${params.toString()}`);
    }, [
        keywords,
        currentPage,
        jobType,
        newerThan,
        payRateStart,
        payRateEnd,
        includePayRateNull,
        budgetStart,
        budgetEnd,
        includeBudgetNull,
        experienceLevel,
        countries,
        languages,
        router,
    ]);

    const clearAllFilters = () => {
        setKeywords('');
        setSkills('');
        setJobType({ fullTime: false, hourly: false, fixedPrice: false });
        setNewerThan('');
        setPayRateStart(1);
        setPayRateEnd(100);
        setIncludePayRateNull(true);
        setBudgetStart(1);
        setBudgetEnd(100000);
        setIncludeBudgetNull(true);
        setExperienceLevel('-1');
        setCountries('');
        setLanguages('');
        setCurrentPage(1);
        router.push('/search/jobs?page=1');
    };

    const handleApplyFilters = () => {
        updateURL();
    };

    const getJobTypeLabel = (type: string) => {
        if (type === 'hourly') return 'hourly';
        if (type === 'full time') return 'FINTECH full time';
        return type;
    };

    const getJobTypeColor = (type: string) => {
        if (type === 'hourly') return 'bg-green-500 text-white';
        return 'bg-blue-500 text-white';
    };

    const startRange = (currentPage - 1) * 20 + 1;
    const endRange = Math.min(currentPage * 20, totalResults);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 pt-2 pb-6 lg:px-8">
                {/* Search Section Bar */}
                <div className="animate-fadeIn">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        updateURL();
                                    }
                                }}
                                placeholder="Search jobs by title or keywords"
                                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm transition-all duration-300 ease-in-out hover:border-gray-400 focus:border-blue-500 focus:shadow-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <button
                            onClick={() => {
                                updateURL();
                            }}
                            className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95"
                        >
                            Search jobs
                        </button>
                    </div>
                </div>

                {/* Mobile Layout Container */}
                <div className="relative flex overflow-hidden lg:block">
                    {/* Mobile Filter Sidebar */}
                    <aside
                        className={`absolute top-0 left-0 z-40 h-screen w-[60%] transform overflow-y-auto bg-white transition-transform duration-300 ease-in-out lg:hidden ${
                            isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="px-6 py-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-bold tracking-wide text-gray-900 uppercase">
                                    FILTERS
                                </h3>
                                <button
                                    onClick={() => {
                                        clearAllFilters();
                                    }}
                                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                                >
                                    Clear all
                                </button>
                            </div>

                            {/* Skills Filter */}
                            <div className="mb-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-700">
                                        Skills
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    placeholder="Search skills"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Job Type Filter */}
                            <div className="mb-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-700">
                                        Job type
                                    </label>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { key: 'fullTime', label: 'Full-time (40 hrs/wk)' },
                                        { key: 'hourly', label: 'Hourly contract' },
                                        { key: 'fixedPrice', label: 'Fixed price' },
                                    ].map((option) => (
                                        <label
                                            key={option.key}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={
                                                    jobType[option.key as keyof typeof jobType]
                                                }
                                                onChange={(e) =>
                                                    setJobType({
                                                        ...jobType,
                                                        [option.key]: e.target.checked,
                                                    })
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Newer Than Filter */}
                            <div className="mb-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-700">
                                        Newer than
                                    </label>
                                </div>
                                <div className="relative">
                                    <Calendar className="pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        value={newerThan}
                                        onChange={(e) => setNewerThan(e.target.value)}
                                        placeholder="Select date"
                                        className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Pay Rate Filter */}
                            <div className="mb-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-700">
                                        Pay rate ($/hr)
                                    </label>
                                </div>

                                {/* Price Input Fields */}
                                <div className="mb-6 flex items-center gap-2">
                                    {/* Min Price Control */}
                                    <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
                                        <button
                                            onClick={() => {
                                                if (payRateStart > 1) {
                                                    setPayRateStart(Math.max(1, payRateStart - 1));
                                                }
                                            }}
                                            className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <input
                                            type="number"
                                            value={payRateStart}
                                            onChange={(e) => {
                                                const val = Math.min(
                                                    Math.max(Number(e.target.value) || 1, 1),
                                                    payRateEnd,
                                                );
                                                setPayRateStart(val);
                                            }}
                                            className="w-20 border-0 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none"
                                        />
                                        <button
                                            onClick={() => {
                                                if (payRateStart < payRateEnd) {
                                                    setPayRateStart(
                                                        Math.min(payRateEnd, payRateStart + 1),
                                                    );
                                                }
                                            }}
                                            className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <span className="font-semibold text-gray-400">–</span>

                                    {/* Max Price Control */}
                                    <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
                                        <button
                                            onClick={() => {
                                                if (payRateEnd > payRateStart) {
                                                    setPayRateEnd(
                                                        Math.max(payRateStart, payRateEnd - 1),
                                                    );
                                                }
                                            }}
                                            className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <input
                                            type="number"
                                            value={payRateEnd === 100 ? '100+' : payRateEnd}
                                            onChange={(e) => {
                                                const val = e.target.value.replace('+', '');
                                                const numVal = Math.max(
                                                    Number(val) || 100,
                                                    payRateStart,
                                                );
                                                setPayRateEnd(Math.min(100, numVal));
                                            }}
                                            className="w-20 border-0 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none"
                                        />
                                        <button
                                            onClick={() => {
                                                if (payRateEnd < 100) {
                                                    setPayRateEnd(Math.min(100, payRateEnd + 1));
                                                }
                                            }}
                                            className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <span className="text-sm font-semibold text-gray-600">USD</span>
                                </div>

                                {/* Dual Range Slider */}
                                <div className="mb-6">
                                    {/* Slider Track Container */}
                                    <div className="dual-range-container">
                                        {/* Slider track with gradient */}
                                        <div
                                            className="dual-range-track"
                                            style={{
                                                background: `linear-gradient(to right, #dadae5 ${((payRateStart - 1) / 99) * 100}%, #22c55e ${((payRateStart - 1) / 99) * 100}%, #22c55e ${((payRateEnd - 1) / 99) * 100}%, #dadae5 ${((payRateEnd - 1) / 99) * 100}%)`,
                                            }}
                                        />

                                        {/* Min slider input */}
                                        <input
                                            type="range"
                                            min={1}
                                            max={100}
                                            value={payRateStart}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                const minGap = 0;
                                                if (payRateEnd - val <= minGap) {
                                                    setPayRateStart(payRateEnd - minGap);
                                                } else {
                                                    setPayRateStart(Math.max(1, val));
                                                }
                                            }}
                                            className="dual-range-input"
                                            id="mobile-payrate-slider-1"
                                        />

                                        {/* Max slider input */}
                                        <input
                                            type="range"
                                            min={1}
                                            max={100}
                                            value={payRateEnd}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                const minGap = 0;
                                                if (val - payRateStart <= minGap) {
                                                    setPayRateEnd(payRateStart + minGap);
                                                } else {
                                                    setPayRateEnd(Math.min(100, val));
                                                }
                                            }}
                                            className="dual-range-input"
                                            id="mobile-payrate-slider-2"
                                        />
                                    </div>

                                    {/* Min/Max Labels */}
                                    <div className="flex justify-between px-1 text-sm font-semibold text-gray-700">
                                        <span>{payRateStart}</span>
                                        <span>{payRateEnd === 100 ? '100+' : payRateEnd}</span>
                                    </div>
                                </div>

                                {/* Checkbox */}
                                <label className="flex cursor-pointer items-center gap-3">
                                    <div
                                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm shadow-sm transition-colors ${
                                            includePayRateNull
                                                ? 'bg-emerald-500'
                                                : 'border-2 border-gray-300 bg-white'
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIncludePayRateNull(!includePayRateNull);
                                        }}
                                    >
                                        {includePayRateNull && (
                                            <svg
                                                className="h-3 w-3 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">
                                        Include jobs without pay rates
                                    </span>
                                </label>
                            </div>

                            {/* Budget Filter */}
                            <div className="mb-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-700">
                                        Budget
                                    </label>
                                </div>

                                {/* Price Input Fields */}
                                <div className="mb-6 flex items-center gap-2">
                                    {/* Min Budget Control */}
                                    <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
                                        <button
                                            onClick={() => {
                                                if (budgetStart > 1) {
                                                    setBudgetStart(Math.max(1, budgetStart - 1000));
                                                }
                                            }}
                                            className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <input
                                            type="number"
                                            value={budgetStart}
                                            onChange={(e) => {
                                                const val = Math.min(
                                                    Math.max(Number(e.target.value) || 1, 1),
                                                    budgetEnd,
                                                );
                                                setBudgetStart(val);
                                            }}
                                            className="w-20 border-0 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none"
                                        />
                                        <button
                                            onClick={() => {
                                                if (budgetStart < budgetEnd) {
                                                    setBudgetStart(
                                                        Math.min(budgetEnd, budgetStart + 1000),
                                                    );
                                                }
                                            }}
                                            className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <span className="font-semibold text-gray-400">–</span>

                                    {/* Max Budget Control */}
                                    <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
                                        <button
                                            onClick={() => {
                                                if (budgetEnd > budgetStart) {
                                                    setBudgetEnd(
                                                        Math.max(budgetStart, budgetEnd - 1000),
                                                    );
                                                }
                                            }}
                                            className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <input
                                            type="number"
                                            value={budgetEnd === 100000 ? '100000+' : budgetEnd}
                                            onChange={(e) => {
                                                const val = e.target.value.replace('+', '');
                                                const numVal = Math.max(
                                                    Number(val) || 100000,
                                                    budgetStart,
                                                );
                                                setBudgetEnd(Math.min(100000, numVal));
                                            }}
                                            className="w-20 border-0 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none"
                                        />
                                        <button
                                            onClick={() => {
                                                if (budgetEnd < 100000) {
                                                    setBudgetEnd(
                                                        Math.min(100000, budgetEnd + 1000),
                                                    );
                                                }
                                            }}
                                            className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <span className="text-sm font-semibold text-gray-600">USD</span>
                                </div>

                                {/* Dual Range Slider */}
                                <div className="mb-6">
                                    {/* Slider Track Container */}
                                    <div className="dual-range-container">
                                        {/* Slider track with gradient */}
                                        <div
                                            className="dual-range-track"
                                            style={{
                                                background: `linear-gradient(to right, #dadae5 ${((budgetStart - 1) / 99999) * 100}%, #22c55e ${((budgetStart - 1) / 99999) * 100}%, #22c55e ${((budgetEnd - 1) / 99999) * 100}%, #dadae5 ${((budgetEnd - 1) / 99999) * 100}%)`,
                                            }}
                                        />

                                        {/* Min slider input */}
                                        <input
                                            type="range"
                                            min={1}
                                            max={100000}
                                            step={1000}
                                            value={budgetStart}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                const minGap = 0;
                                                if (budgetEnd - val <= minGap) {
                                                    setBudgetStart(budgetEnd - minGap);
                                                } else {
                                                    setBudgetStart(Math.max(1, val));
                                                }
                                            }}
                                            className="dual-range-input"
                                            id="mobile-budget-slider-1"
                                        />

                                        {/* Max slider input */}
                                        <input
                                            type="range"
                                            min={1}
                                            max={100000}
                                            step={1000}
                                            value={budgetEnd}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                const minGap = 0;
                                                if (val - budgetStart <= minGap) {
                                                    setBudgetEnd(budgetStart + minGap);
                                                } else {
                                                    setBudgetEnd(Math.min(100000, val));
                                                }
                                            }}
                                            className="dual-range-input"
                                            id="mobile-budget-slider-2"
                                        />
                                    </div>

                                    {/* Min/Max Labels */}
                                    <div className="flex justify-between px-1 text-sm font-semibold text-gray-700">
                                        <span>{budgetStart}</span>
                                        <span>{budgetEnd === 100000 ? '100000+' : budgetEnd}</span>
                                    </div>
                                </div>

                                {/* Checkbox */}
                                <label className="flex cursor-pointer items-center gap-3">
                                    <div
                                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm shadow-sm transition-colors ${
                                            includeBudgetNull
                                                ? 'bg-emerald-500'
                                                : 'border-2 border-gray-300 bg-white'
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIncludeBudgetNull(!includeBudgetNull);
                                        }}
                                    >
                                        {includeBudgetNull && (
                                            <svg
                                                className="h-3 w-3 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">
                                        Include jobs without budgets
                                    </span>
                                </label>
                            </div>

                            {/* Experience Level Filter */}
                            <div className="mb-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-700">
                                        Experience level
                                    </label>
                                </div>
                                <select
                                    value={experienceLevel}
                                    onChange={(e) => setExperienceLevel(e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="-1">Any experience level</option>
                                    <option value="0">Entry Level</option>
                                    <option value="1">Intermediate</option>
                                    <option value="2">Expert</option>
                                </select>
                            </div>

                            {/* Countries Filter */}
                            <div className="mb-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-700">
                                        Countries
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    value={countries}
                                    onChange={(e) => setCountries(e.target.value)}
                                    placeholder="Search countries"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Languages Filter */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-700">
                                        Languages
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    value={languages}
                                    onChange={(e) => setLanguages(e.target.value)}
                                    placeholder="Search languages"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Content Area - shifts right when filter is open */}
                    <div
                        className={`w-full flex-shrink-0 transition-transform duration-300 ease-in-out lg:w-auto ${
                            isMobileFilterOpen ? 'translate-x-[60%]' : 'translate-x-0'
                        }`}
                    >
                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="mb-4 flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 lg:hidden"
                        >
                            <Filter className="h-4 w-4" />
                            Filters
                        </button>

                        {/* Grid Container for Desktop */}
                        <div className="grid grid-cols-1 gap-6 lg:mt-0 lg:grid-cols-12 lg:gap-x-4 lg:gap-y-0">
                            {/* Left Sidebar - Filters (Desktop) */}
                            <aside className="hidden lg:col-span-3 lg:block">
                                <div className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto rounded-lg px-6 pt-0 pb-4">
                                    <div className="mb-4 flex items-center justify-between lg:mb-0">
                                        <h2 className="text-sm font-bold tracking-wide text-gray-900 uppercase">
                                            FILTERS
                                        </h2>
                                        <button
                                            onClick={clearAllFilters}
                                            className="text-xs font-medium text-blue-600 hover:text-blue-700"
                                        >
                                            Clear all
                                        </button>
                                    </div>

                                    {/* Skills Filter */}
                                    <div className="mb-6 lg:mt-0">
                                        <div className="mb-2 flex items-center justify-between">
                                            <label className="text-xs font-semibold text-gray-700">
                                                Skills
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            value={skills}
                                            onChange={(e) => setSkills(e.target.value)}
                                            placeholder="Search skills"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    {/* Job Type Filter */}
                                    <div className="mb-6">
                                        <div className="mb-2 flex items-center justify-between">
                                            <label className="text-xs font-semibold text-gray-700">
                                                Job type
                                            </label>
                                        </div>
                                        <div className="space-y-2">
                                            {[
                                                { key: 'fullTime', label: 'Full-time (40 hrs/wk)' },
                                                { key: 'hourly', label: 'Hourly contract' },
                                                { key: 'fixedPrice', label: 'Fixed price' },
                                            ].map((option) => (
                                                <label
                                                    key={option.key}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            jobType[
                                                                option.key as keyof typeof jobType
                                                            ]
                                                        }
                                                        onChange={(e) =>
                                                            setJobType({
                                                                ...jobType,
                                                                [option.key]: e.target.checked,
                                                            })
                                                        }
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        {option.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Newer Than Filter */}
                                    <div className="mb-6">
                                        <div className="mb-2 flex items-center justify-between">
                                            <label className="text-xs font-semibold text-gray-700">
                                                Newer than
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <Calendar className="pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="date"
                                                value={newerThan}
                                                onChange={(e) => setNewerThan(e.target.value)}
                                                placeholder="Select date"
                                                className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Pay Rate Filter */}
                                    <div className="mb-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <label className="text-xs font-semibold text-gray-700">
                                                Pay rate ($/hr)
                                            </label>
                                        </div>

                                        {/* Price Input Fields */}
                                        <div className="mb-6 flex items-center gap-2">
                                            {/* Min Price Control */}
                                            <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
                                                <button
                                                    onClick={() => {
                                                        if (payRateStart > 1) {
                                                            setPayRateStart(
                                                                Math.max(1, payRateStart - 1),
                                                            );
                                                        }
                                                    }}
                                                    className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <input
                                                    type="number"
                                                    value={payRateStart}
                                                    onChange={(e) => {
                                                        const val = Math.min(
                                                            Math.max(
                                                                Number(e.target.value) || 1,
                                                                1,
                                                            ),
                                                            payRateEnd,
                                                        );
                                                        setPayRateStart(val);
                                                    }}
                                                    className="w-20 border-0 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none"
                                                />
                                                <button
                                                    onClick={() => {
                                                        if (payRateStart < payRateEnd) {
                                                            setPayRateStart(
                                                                Math.min(
                                                                    payRateEnd,
                                                                    payRateStart + 1,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                    className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <span className="font-semibold text-gray-400">–</span>

                                            {/* Max Price Control */}
                                            <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
                                                <button
                                                    onClick={() => {
                                                        if (payRateEnd > payRateStart) {
                                                            setPayRateEnd(
                                                                Math.max(
                                                                    payRateStart,
                                                                    payRateEnd - 1,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                    className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <input
                                                    type="number"
                                                    value={payRateEnd === 100 ? '100+' : payRateEnd}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace('+', '');
                                                        const numVal = Math.max(
                                                            Number(val) || 100,
                                                            payRateStart,
                                                        );
                                                        setPayRateEnd(Math.min(100, numVal));
                                                    }}
                                                    className="w-20 border-0 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none"
                                                />
                                                <button
                                                    onClick={() => {
                                                        if (payRateEnd < 100) {
                                                            setPayRateEnd(
                                                                Math.min(100, payRateEnd + 1),
                                                            );
                                                        }
                                                    }}
                                                    className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <span className="text-sm font-semibold text-gray-600">
                                                USD
                                            </span>
                                        </div>

                                        {/* Dual Range Slider */}
                                        <div className="mb-6">
                                            {/* Slider Track Container */}
                                            <div className="dual-range-container">
                                                {/* Slider track with gradient */}
                                                <div
                                                    className="dual-range-track"
                                                    style={{
                                                        background: `linear-gradient(to right, #dadae5 ${((payRateStart - 1) / 99) * 100}%, #22c55e ${((payRateStart - 1) / 99) * 100}%, #22c55e ${((payRateEnd - 1) / 99) * 100}%, #dadae5 ${((payRateEnd - 1) / 99) * 100}%)`,
                                                    }}
                                                />

                                                {/* Min slider input */}
                                                <input
                                                    type="range"
                                                    min={1}
                                                    max={100}
                                                    value={payRateStart}
                                                    onChange={(e) => {
                                                        const val = Number(e.target.value);
                                                        const minGap = 0;
                                                        if (payRateEnd - val <= minGap) {
                                                            setPayRateStart(payRateEnd - minGap);
                                                        } else {
                                                            setPayRateStart(Math.max(1, val));
                                                        }
                                                    }}
                                                    className="dual-range-input"
                                                    id="payrate-slider-1"
                                                />

                                                {/* Max slider input */}
                                                <input
                                                    type="range"
                                                    min={1}
                                                    max={100}
                                                    value={payRateEnd}
                                                    onChange={(e) => {
                                                        const val = Number(e.target.value);
                                                        const minGap = 0;
                                                        if (val - payRateStart <= minGap) {
                                                            setPayRateEnd(payRateStart + minGap);
                                                        } else {
                                                            setPayRateEnd(Math.min(100, val));
                                                        }
                                                    }}
                                                    className="dual-range-input"
                                                    id="payrate-slider-2"
                                                />
                                            </div>

                                            {/* Min/Max Labels */}
                                            <div className="flex justify-between px-1 text-sm font-semibold text-gray-700">
                                                <span>{payRateStart}</span>
                                                <span>
                                                    {payRateEnd === 100 ? '100+' : payRateEnd}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Checkbox */}
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <div
                                                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm shadow-sm transition-colors ${
                                                    includePayRateNull
                                                        ? 'bg-emerald-500'
                                                        : 'border-2 border-gray-300 bg-white'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIncludePayRateNull(!includePayRateNull);
                                                }}
                                            >
                                                {includePayRateNull && (
                                                    <svg
                                                        className="h-3 w-3 text-white"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">
                                                Include jobs without pay rates
                                            </span>
                                        </label>
                                    </div>

                                    {/* Budget Filter */}
                                    <div className="mb-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <label className="text-xs font-semibold text-gray-700">
                                                Budget
                                            </label>
                                        </div>

                                        {/* Price Input Fields */}
                                        <div className="mb-6 flex items-center gap-2">
                                            {/* Min Budget Control */}
                                            <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
                                                <button
                                                    onClick={() => {
                                                        if (budgetStart > 1) {
                                                            setBudgetStart(
                                                                Math.max(1, budgetStart - 1000),
                                                            );
                                                        }
                                                    }}
                                                    className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <input
                                                    type="number"
                                                    value={budgetStart}
                                                    onChange={(e) => {
                                                        const val = Math.min(
                                                            Math.max(
                                                                Number(e.target.value) || 1,
                                                                1,
                                                            ),
                                                            budgetEnd,
                                                        );
                                                        setBudgetStart(val);
                                                    }}
                                                    className="w-20 border-0 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none"
                                                />
                                                <button
                                                    onClick={() => {
                                                        if (budgetStart < budgetEnd) {
                                                            setBudgetStart(
                                                                Math.min(
                                                                    budgetEnd,
                                                                    budgetStart + 1000,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                    className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <span className="font-semibold text-gray-400">–</span>

                                            {/* Max Budget Control */}
                                            <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
                                                <button
                                                    onClick={() => {
                                                        if (budgetEnd > budgetStart) {
                                                            setBudgetEnd(
                                                                Math.max(
                                                                    budgetStart,
                                                                    budgetEnd - 1000,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                    className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <input
                                                    type="number"
                                                    value={
                                                        budgetEnd === 100000 ? '100000+' : budgetEnd
                                                    }
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace('+', '');
                                                        const numVal = Math.max(
                                                            Number(val) || 100000,
                                                            budgetStart,
                                                        );
                                                        setBudgetEnd(Math.min(100000, numVal));
                                                    }}
                                                    className="w-20 border-0 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none"
                                                />
                                                <button
                                                    onClick={() => {
                                                        if (budgetEnd < 100000) {
                                                            setBudgetEnd(
                                                                Math.min(100000, budgetEnd + 1000),
                                                            );
                                                        }
                                                    }}
                                                    className="p-2 text-gray-400 transition-colors hover:bg-gray-100"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <span className="text-sm font-semibold text-gray-600">
                                                USD
                                            </span>
                                        </div>

                                        {/* Dual Range Slider */}
                                        <div className="mb-6">
                                            {/* Slider Track Container */}
                                            <div className="dual-range-container">
                                                {/* Slider track with gradient */}
                                                <div
                                                    className="dual-range-track"
                                                    style={{
                                                        background: `linear-gradient(to right, #dadae5 ${((budgetStart - 1) / 99999) * 100}%, #22c55e ${((budgetStart - 1) / 99999) * 100}%, #22c55e ${((budgetEnd - 1) / 99999) * 100}%, #dadae5 ${((budgetEnd - 1) / 99999) * 100}%)`,
                                                    }}
                                                />

                                                {/* Min slider input */}
                                                <input
                                                    type="range"
                                                    min={1}
                                                    max={100000}
                                                    step={1000}
                                                    value={budgetStart}
                                                    onChange={(e) => {
                                                        const val = Number(e.target.value);
                                                        const minGap = 0;
                                                        if (budgetEnd - val <= minGap) {
                                                            setBudgetStart(budgetEnd - minGap);
                                                        } else {
                                                            setBudgetStart(Math.max(1, val));
                                                        }
                                                    }}
                                                    className="dual-range-input"
                                                    id="budget-slider-1"
                                                />

                                                {/* Max slider input */}
                                                <input
                                                    type="range"
                                                    min={1}
                                                    max={100000}
                                                    step={1000}
                                                    value={budgetEnd}
                                                    onChange={(e) => {
                                                        const val = Number(e.target.value);
                                                        const minGap = 0;
                                                        if (val - budgetStart <= minGap) {
                                                            setBudgetEnd(budgetStart + minGap);
                                                        } else {
                                                            setBudgetEnd(Math.min(100000, val));
                                                        }
                                                    }}
                                                    className="dual-range-input"
                                                    id="budget-slider-2"
                                                />
                                            </div>

                                            {/* Min/Max Labels */}
                                            <div className="flex justify-between px-1 text-sm font-semibold text-gray-700">
                                                <span>{budgetStart}</span>
                                                <span>
                                                    {budgetEnd === 100000 ? '100000+' : budgetEnd}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Checkbox */}
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <div
                                                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm shadow-sm transition-colors ${
                                                    includeBudgetNull
                                                        ? 'bg-emerald-500'
                                                        : 'border-2 border-gray-300 bg-white'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIncludeBudgetNull(!includeBudgetNull);
                                                }}
                                            >
                                                {includeBudgetNull && (
                                                    <svg
                                                        className="h-3 w-3 text-white"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">
                                                Include jobs without budgets
                                            </span>
                                        </label>
                                    </div>

                                    {/* Experience Level Filter */}
                                    <div className="mb-6">
                                        <div className="mb-2 flex items-center justify-between">
                                            <label className="text-xs font-semibold text-gray-700">
                                                Experience level
                                            </label>
                                        </div>
                                        <select
                                            value={experienceLevel}
                                            onChange={(e) => setExperienceLevel(e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="-1">Any experience level</option>
                                            <option value="0">Entry Level</option>
                                            <option value="1">Intermediate</option>
                                            <option value="2">Expert</option>
                                        </select>
                                    </div>

                                    {/* Countries Filter */}
                                    <div className="mb-6">
                                        <div className="mb-2 flex items-center justify-between">
                                            <label className="text-xs font-semibold text-gray-700">
                                                Countries
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            value={countries}
                                            onChange={(e) => setCountries(e.target.value)}
                                            placeholder="Search countries"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    {/* Languages Filter */}
                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <label className="text-xs font-semibold text-gray-700">
                                                Languages
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            value={languages}
                                            onChange={(e) => setLanguages(e.target.value)}
                                            placeholder="Search languages"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </aside>

                            {/* Main Content - Job Listings */}
                            <main className="lg:col-span-6">
                                <div className="mb-4 flex items-center justify-between lg:mb-0">
                                    <p className="text-sm font-medium text-gray-700">
                                        DISPLAYING ({startRange}-{endRange}) OF {totalResults}{' '}
                                        RESULTS
                                    </p>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="relevance">Sort by Relevance</option>
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="payrate">Highest Pay Rate</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    {jobs
                                        .slice((currentPage - 1) * 20, currentPage * 20)
                                        .map((job) => (
                                            <div key={job.id} className="rounded-lg bg-white p-6">
                                                {/* Top Section: Title, Badge, Pay Rate */}
                                                <div className="mb-4 flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <span
                                                                className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold ${getJobTypeColor(job.type)}`}
                                                            >
                                                                {getJobTypeLabel(job.type)}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {job.title}
                                                        </h3>
                                                    </div>
                                                    {job.payRate && (
                                                        <span className="shrink-0 text-base font-bold text-gray-900">
                                                            {job.payRate}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Middle Section: Company, Location, Remote, Time with Icons */}
                                                <div className="mb-3 space-y-1.5">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Building2 className="h-4 w-4 text-gray-400" />
                                                        <span className="font-medium">
                                                            {job.company}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <MapPin className="h-4 w-4 text-gray-400" />
                                                        <span>HQ: {job.location}</span>
                                                    </div>
                                                    {job.remote && (
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Wifi className="h-4 w-4 text-gray-400" />
                                                            <span>Remote job</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Clock className="h-4 w-4 text-gray-400" />
                                                        <span>{job.postedTime}</span>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="mb-4 line-clamp-2 text-sm text-gray-900">
                                                    {job.description}
                                                </p>

                                                {/* Bottom Section: Skill Tags */}
                                                <div className="flex flex-wrap gap-2">
                                                    {job.tags.map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                {/* Pagination */}
                                <div className="mt-6 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="px-4 text-sm text-gray-700">
                                        Page {currentPage} of {Math.ceil(totalResults / 20)}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setCurrentPage((p) =>
                                                Math.min(Math.ceil(totalResults / 20), p + 1),
                                            )
                                        }
                                        disabled={currentPage >= Math.ceil(totalResults / 20)}
                                        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </main>

                            {/* Right Sidebar */}
                            <aside className="lg:col-span-3">
                                <div className="space-y-6">
                                    {/* Promotional Box */}
                                    <div className="rounded-lg bg-blue-600 p-6 text-white">
                                        <h3 className="mb-3 text-lg font-bold">
                                            Get your freelancer profile up and running
                                        </h3>
                                        <p className="mb-4 text-sm text-blue-50">
                                            Learn how to create a standout profile that attracts
                                            clients and wins jobs.
                                        </p>
                                        <Link
                                            href="/resources"
                                            className="inline-block rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                                        >
                                            Check it out
                                        </Link>
                                    </div>

                                    {/* Top Jobs */}
                                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                                        <h3 className="mb-4 text-sm font-bold tracking-wide text-gray-900 uppercase">
                                            TOP JOBS
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                <h4 className="mb-1 text-sm font-semibold text-gray-900">
                                                    Urgent Hiring: Licensed CPA (Remote)
                                                </h4>
                                                <p className="text-xs text-gray-600">
                                                    Looking for a licensed CPA with extensive
                                                    experience in tax preparation and financial
                                                    analysis...
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Most Viewed */}
                                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                                        <h3 className="mb-4 text-sm font-bold tracking-wide text-gray-900 uppercase">
                                            MOST VIEWED THIS WEEK
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                <h4 className="mb-1 text-sm font-semibold text-gray-900">
                                                    Urgent Hiring: Licensed CPA (Remote)
                                                </h4>
                                                <p className="text-xs text-gray-600">
                                                    Looking for a licensed CPA with extensive
                                                    experience in tax preparation and financial
                                                    analysis...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
