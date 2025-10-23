'use client';

import { useState } from 'react';
import {
    BuildingOfficeIcon,
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    EyeIcon,
    FlagIcon,
    FunnelIcon,
    HandThumbDownIcon,
    HandThumbUpIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    ShareIcon,
    StarIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface CompanyReview {
    id: string;
    companyId: string;
    companyName: string;
    companyLogo: string;
    reviewerName: string;
    reviewerRole: string;
    reviewerStatus: 'current' | 'former' | 'candidate' | 'anonymous';
    reviewDate: string;
    rating: number;
    pros: string[];
    cons: string[];
    summary: string;
    detailedReview: string;
    helpfulCount: number;
    notHelpfulCount: number;
    isVerified: boolean;
    isHelpful: boolean | null;
    tags: string[];
    salary?: string;
    workLifeBalance?: number;
    careerGrowth?: number;
    companyCulture?: number;
    management?: number;
    jobSecurity?: number;
}

export default function CompanyReviewsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCompany, setSelectedCompany] = useState<string>('all');
    const [ratingFilter, setRatingFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState('review-date');
    const [showFilters, setShowFilters] = useState(false);

    const companyReviews: CompanyReview[] = [
        {
            id: '1',
            companyId: 'company-1',
            companyName: 'TechCorp Inc.',
            companyLogo: 'TC',
            reviewerName: 'Sarah Johnson',
            reviewerRole: 'Senior Software Engineer',
            reviewerStatus: 'current',
            reviewDate: '2024-01-25',
            rating: 4,
            pros: [
                'Great work-life balance',
                'Competitive salary and benefits',
                'Excellent learning opportunities',
                'Supportive team culture',
            ],
            cons: [
                'Sometimes slow decision making',
                'Limited remote work options',
                'Office location could be better',
            ],
            summary: 'Overall a great place to work with good culture and growth opportunities.',
            detailedReview:
                "I've been working at TechCorp for over 2 years now and it's been a positive experience overall. The company truly values work-life balance and provides excellent benefits. The engineering team is very collaborative and there are plenty of opportunities to learn new technologies. The management is supportive and encourages professional development. However, the decision-making process can be slow at times, especially for larger projects. The office is located in a busy area which can make commuting challenging. Despite these minor issues, I would definitely recommend working here.",
            helpfulCount: 24,
            notHelpfulCount: 3,
            isVerified: true,
            isHelpful: null,
            tags: ['Work-Life Balance', 'Learning', 'Team Culture', 'Benefits'],
            salary: '$120,000 - $150,000',
            workLifeBalance: 4,
            careerGrowth: 4,
            companyCulture: 5,
            management: 3,
            jobSecurity: 4,
        },
        {
            id: '2',
            companyId: 'company-2',
            companyName: 'StartupXYZ',
            companyLogo: 'SX',
            reviewerName: 'Mike Chen',
            reviewerRole: 'Full Stack Developer',
            reviewerStatus: 'former',
            reviewDate: '2024-01-20',
            rating: 3,
            pros: [
                'Fast-paced environment',
                'Equity opportunities',
                'Flexible work arrangements',
                'Young and energetic team',
            ],
            cons: [
                'Long working hours',
                'High stress levels',
                'Limited job security',
                'Sometimes chaotic management',
            ],
            summary: 'Exciting startup environment but comes with typical startup challenges.',
            detailedReview:
                "Working at StartupXYZ was an exciting rollercoaster ride. The company is growing rapidly and there's never a dull moment. I learned a lot about scaling applications and working in a fast-paced environment. The equity package was attractive and the team was very energetic. However, the long hours and high stress levels eventually took their toll. Management was sometimes chaotic and decisions seemed to change frequently. The job security was always a concern given the startup nature. If you're looking for excitement and willing to work hard, this could be a good fit, but be prepared for the challenges.",
            helpfulCount: 18,
            notHelpfulCount: 7,
            isVerified: true,
            isHelpful: null,
            tags: ['Fast-Paced', 'Equity', 'Flexibility', 'Stress'],
            salary: '$90,000 - $130,000',
            workLifeBalance: 2,
            careerGrowth: 4,
            companyCulture: 3,
            management: 2,
            jobSecurity: 2,
        },
        {
            id: '3',
            companyId: 'company-3',
            companyName: 'Enterprise Solutions',
            companyLogo: 'ES',
            reviewerName: 'Lisa Rodriguez',
            reviewerRole: 'DevOps Engineer',
            reviewerStatus: 'current',
            reviewDate: '2024-01-18',
            rating: 4,
            pros: [
                'Stable company with good benefits',
                'Clear career progression',
                'Good work-life balance',
                'Professional environment',
            ],
            cons: [
                'Bureaucratic processes',
                'Slower pace of change',
                'Limited innovation opportunities',
                'Sometimes rigid policies',
            ],
            summary: 'Solid company for those seeking stability and clear career growth.',
            detailedReview:
                "Enterprise Solutions is a well-established company that offers stability and good benefits. The career progression is clear and well-defined, which I appreciate. The work-life balance is good, and the company respects personal time. The environment is very professional and there's a strong focus on processes and procedures. However, this can sometimes lead to bureaucratic delays and slower decision-making. The pace of change is slower compared to startups, and innovation opportunities can be limited. If you value stability and clear structure, this is a good place to work.",
            helpfulCount: 15,
            notHelpfulCount: 4,
            isVerified: true,
            isHelpful: null,
            tags: ['Stability', 'Career Growth', 'Benefits', 'Bureaucracy'],
            salary: '$130,000 - $180,000',
            workLifeBalance: 4,
            careerGrowth: 4,
            companyCulture: 3,
            management: 4,
            jobSecurity: 5,
        },
        {
            id: '4',
            companyId: 'company-4',
            companyName: 'AI Innovations',
            companyLogo: 'AI',
            reviewerName: 'David Kim',
            reviewerRole: 'Data Scientist',
            reviewerStatus: 'candidate',
            reviewDate: '2024-01-15',
            rating: 5,
            pros: [
                'Cutting-edge AI projects',
                'Brilliant team members',
                'Excellent research opportunities',
                'Competitive compensation',
            ],
            cons: [
                'High expectations',
                'Intense work environment',
                'Limited mentorship for juniors',
                'Sometimes unrealistic deadlines',
            ],
            summary:
                'Amazing company for AI enthusiasts who want to work on cutting-edge technology.',
            detailedReview:
                "AI Innovations is truly a remarkable place to work if you're passionate about artificial intelligence. The projects are cutting-edge and you get to work with some of the brightest minds in the field. The research opportunities are excellent and the company invests heavily in the latest technologies. The compensation is very competitive and reflects the high skill level required. However, the expectations are extremely high and the work environment can be intense. Junior team members might find it challenging without proper mentorship, and deadlines can sometimes be unrealistic. If you're experienced and passionate about AI, this is an incredible opportunity.",
            helpfulCount: 32,
            notHelpfulCount: 2,
            isVerified: false,
            isHelpful: null,
            tags: ['AI/ML', 'Research', 'Innovation', 'Intense'],
            salary: '$140,000 - $200,000',
            workLifeBalance: 3,
            careerGrowth: 5,
            companyCulture: 4,
            management: 3,
            jobSecurity: 4,
        },
    ];

    const companies = [
        { id: 'all', name: 'All Companies' },
        ...Array.from(
            new Set(
                companyReviews.map((review) => ({
                    id: review.companyId,
                    name: review.companyName,
                })),
            ),
        ),
    ];

    const ratingFilters = [
        { id: 'all', label: 'All Ratings' },
        { id: '5', label: '5 Stars' },
        { id: '4', label: '4+ Stars' },
        { id: '3', label: '3+ Stars' },
        { id: '2', label: '2+ Stars' },
    ];

    const statusFilters = [
        { id: 'all', label: 'All Statuses' },
        { id: 'current', label: 'Current Employees' },
        { id: 'former', label: 'Former Employees' },
        { id: 'candidate', label: 'Candidates' },
    ];

    const filteredReviews = companyReviews.filter((review) => {
        const matchesSearch =
            review.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.reviewerRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCompany = selectedCompany === 'all' || review.companyId === selectedCompany;
        const matchesRating = ratingFilter === 'all' || review.rating >= parseInt(ratingFilter);
        const matchesStatus = statusFilter === 'all' || review.reviewerStatus === statusFilter;

        return matchesSearch && matchesCompany && matchesRating && matchesStatus;
    });

    const sortedReviews = [...filteredReviews].sort((a, b) => {
        switch (sortBy) {
            case 'review-date':
                return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
            case 'rating':
                return b.rating - a.rating;
            case 'helpful':
                return b.helpfulCount - a.helpfulCount;
            case 'company':
                return a.companyName.localeCompare(b.companyName);
            default:
                return 0;
        }
    });

    const getRatingColor = (rating: number) => {
        if (rating >= 4) return 'text-green-600';
        if (rating >= 3) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'current':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'former':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'candidate':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'anonymous':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
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

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon
                key={i}
                className={`h-4 w-4 ${i < rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    const renderRatingBar = (rating: number, label: string) => {
        return (
            <div className="flex items-center space-x-2">
                <span className="w-20 text-sm text-gray-600">{label}</span>
                <div className="h-2 flex-1 rounded-full bg-gray-200">
                    <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${(rating / 5) * 100}%` }}
                    />
                </div>
                <span className="w-8 text-sm text-gray-600">{rating}/5</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Company Reviews</h1>
                </div>
                <p className="text-gray-600">
                    Read authentic reviews from employees and candidates about companies
                </p>
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Stats Overview */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {companyReviews.length}
                                </p>
                            </div>
                            <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Companies Reviewed
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {new Set(companyReviews.map((review) => review.companyId)).size}
                                </p>
                            </div>
                            <BuildingOfficeIcon className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {(
                                        companyReviews.reduce(
                                            (sum, review) => sum + review.rating,
                                            0,
                                        ) / companyReviews.length
                                    ).toFixed(1)}
                                </p>
                            </div>
                            <StarIcon className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Verified Reviews
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {companyReviews.filter((review) => review.isVerified).length}
                                </p>
                            </div>
                            <EyeIcon className="h-8 w-8 text-orange-500" />
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
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                {companies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="review-date">Review Date</option>
                                <option value="rating">Rating</option>
                                <option value="helpful">Most Helpful</option>
                                <option value="company">Company Name</option>
                            </select>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search reviews..."
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
                                        Rating Filter
                                    </label>
                                    <select
                                        value={ratingFilter}
                                        onChange={(e) => setRatingFilter(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    >
                                        {ratingFilters.map((filter) => (
                                            <option key={filter.id} value={filter.id}>
                                                {filter.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Reviewer Status
                                    </label>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    >
                                        {statusFilters.map((filter) => (
                                            <option key={filter.id} value={filter.id}>
                                                {filter.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                    {sortedReviews.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                            <ChatBubbleLeftRightIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No company reviews found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your filters or search terms
                            </p>
                        </div>
                    ) : (
                        sortedReviews.map((review) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-2xl bg-white p-6 shadow-lg"
                            >
                                <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                                    <div className="flex-1">
                                        <div className="mb-4 flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
                                                    {review.companyLogo}
                                                </div>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center space-x-2">
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        {review.companyName}
                                                    </h3>
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(review.reviewerStatus)}`}
                                                    >
                                                        {review.reviewerStatus
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            review.reviewerStatus.slice(1)}
                                                    </span>
                                                    {review.isVerified && (
                                                        <span className="inline-flex items-center rounded-full border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mb-2 flex items-center space-x-2">
                                                    <div className="flex items-center">
                                                        {renderStars(review.rating)}
                                                        <span
                                                            className={`ml-2 font-medium ${getRatingColor(review.rating)}`}
                                                        >
                                                            {review.rating}.0
                                                        </span>
                                                    </div>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-sm text-gray-600">
                                                        {review.reviewerRole}
                                                    </span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-sm text-gray-600">
                                                        {getTimeAgo(review.reviewDate)}
                                                    </span>
                                                </div>

                                                <p className="mb-3 text-gray-700">
                                                    {review.summary}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Pros
                                                </h4>
                                                <ul className="space-y-1">
                                                    {review.pros.map((pro, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start text-sm text-gray-600"
                                                        >
                                                            <span className="mr-2 text-green-600">
                                                                •
                                                            </span>
                                                            {pro}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Cons
                                                </h4>
                                                <ul className="space-y-1">
                                                    {review.cons.map((con, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start text-sm text-gray-600"
                                                        >
                                                            <span className="mr-2 text-red-600">
                                                                •
                                                            </span>
                                                            {con}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="mb-2 font-medium text-gray-900">
                                                Detailed Review
                                            </h4>
                                            <p className="text-sm leading-relaxed text-gray-600">
                                                {review.detailedReview}
                                            </p>
                                        </div>

                                        {review.salary && (
                                            <div className="mb-4">
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Salary Information
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {review.salary}
                                                </p>
                                            </div>
                                        )}

                                        <div className="mb-4">
                                            <h4 className="mb-3 font-medium text-gray-900">
                                                Rating Breakdown
                                            </h4>
                                            <div className="space-y-2">
                                                {review.workLifeBalance &&
                                                    renderRatingBar(
                                                        review.workLifeBalance,
                                                        'Work-Life Balance',
                                                    )}
                                                {review.careerGrowth &&
                                                    renderRatingBar(
                                                        review.careerGrowth,
                                                        'Career Growth',
                                                    )}
                                                {review.companyCulture &&
                                                    renderRatingBar(
                                                        review.companyCulture,
                                                        'Company Culture',
                                                    )}
                                                {review.management &&
                                                    renderRatingBar(
                                                        review.management,
                                                        'Management',
                                                    )}
                                                {review.jobSecurity &&
                                                    renderRatingBar(
                                                        review.jobSecurity,
                                                        'Job Security',
                                                    )}
                                            </div>
                                        </div>

                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {review.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Review Actions */}
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <div className="flex items-center space-x-4">
                                        <button className="flex items-center space-x-2 text-gray-600 transition-colors duration-200 hover:text-blue-600">
                                            <HandThumbUpIcon className="h-4 w-4" />
                                            <span>Helpful ({review.helpfulCount})</span>
                                        </button>
                                        <button className="flex items-center space-x-2 text-gray-600 transition-colors duration-200 hover:text-red-600">
                                            <HandThumbDownIcon className="h-4 w-4" />
                                            <span>Not Helpful ({review.notHelpfulCount})</span>
                                        </button>
                                        <button className="flex items-center space-x-2 text-gray-600 transition-colors duration-200 hover:text-gray-800">
                                            <FlagIcon className="h-4 w-4" />
                                            <span>Report</span>
                                        </button>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <button className="flex items-center space-x-2 text-gray-600 transition-colors duration-200 hover:text-red-600">
                                            <HeartIcon className="h-4 w-4" />
                                            <span>Save</span>
                                        </button>
                                        <button className="flex items-center space-x-2 text-gray-600 transition-colors duration-200 hover:text-blue-600">
                                            <ShareIcon className="h-4 w-4" />
                                            <span>Share</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
