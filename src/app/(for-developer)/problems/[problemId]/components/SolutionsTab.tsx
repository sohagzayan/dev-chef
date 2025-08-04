'use client';

import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineLike, AiOutlineMessage, AiOutlineSearch } from 'react-icons/ai';
import { BiTrendingUp } from 'react-icons/bi';

interface Solution {
    id: string;
    title: string;
    author: string;
    isVerified: boolean;
    isPremium: boolean;
    tags: string[];
    upvotes: number;
    views: number;
    comments: number;
    description: string;
    languages: string[];
    approaches: string[];
}

interface SolutionsTabProps {
    problemId: string;
}

const SolutionsTab: React.FC<SolutionsTabProps> = ({ problemId }) => {
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popular');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [activeFilter, setActiveFilter] = useState('all');
    const [userPerformance] = useState({ runtime: 71, memory: 54 });

    // Mock data for solutions
    const mockSolutions: Solution[] = [
        {
            id: '1',
            title: 'Two Sum',
            author: 'LeetCode',
            isVerified: true,
            isPremium: false,
            tags: ['Editorial'],
            upvotes: 4500,
            views: 11100000,
            comments: 2600,
            description: 'Official editorial solution',
            languages: ['JavaScript', 'Python', 'Java', 'C++'],
            approaches: ['Hash Table', 'Array'],
        },
        {
            id: '2',
            title: '【Video】 Step by Step Easy Solution',
            author: 'niits',
            isVerified: false,
            isPremium: false,
            tags: ['Video'],
            upvotes: 1000,
            views: 81100,
            comments: 4,
            description: 'Step by step video explanation',
            languages: ['JavaScript'],
            approaches: ['Hash Table'],
        },
        {
            id: '3',
            title: "3 Method's || C++ || JAVA || PYTHON || Beginner Friendly 🔥🔥🔥",
            author: 'Rahul Varma',
            isVerified: true,
            isPremium: false,
            tags: ['Beginner Friendly'],
            upvotes: 10500,
            views: 2000000,
            comments: 263,
            description: 'Three different approaches explained',
            languages: ['C++', 'Java', 'Python'],
            approaches: ['Hash Table', 'Two Pointers', 'Math'],
        },
        {
            id: '4',
            title: 'ONE LINER (Visual Representation) || STEP BY STEP FLOW EXPLAINED || EASY TO UNDERSTAND',
            author: 'Sumit Yadav',
            isVerified: false,
            isPremium: false,
            tags: ['One Liner'],
            upvotes: 11000,
            views: 625,
            comments: 0,
            description: 'One line solution with visual explanation',
            languages: ['JavaScript'],
            approaches: ['Hash Table'],
        },
        {
            id: '5',
            title: '✔ Hash Table | Python | C++ | Java | JS | C# | Go | Rust | Swift | Kotlin | PHP | Dart',
            author: 'Otabek',
            isVerified: false,
            isPremium: false,
            tags: ['Multi Language'],
            upvotes: 1500,
            views: 160100,
            comments: 23,
            description: 'Hash table solution in multiple languages',
            languages: [
                'Python',
                'C++',
                'Java',
                'JavaScript',
                'C#',
                'Go',
                'Rust',
                'Swift',
                'Kotlin',
                'PHP',
                'Dart',
            ],
            approaches: ['Hash Table', 'Hash Function'],
        },
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setSolutions(mockSolutions);
            setLoading(false);
        }, 1000);
    }, [problemId]);

    const filterOptions = [
        { id: 'all', label: 'All' },
        { id: 'my', label: 'My Solution' },
        { id: 'javascript', label: 'JavaScript' },
        { id: 'java', label: 'Java' },
        { id: 'cpp', label: 'C++' },
        { id: 'array', label: 'Array' },
        { id: 'hash-table', label: 'Hash Table' },
        { id: 'two-pointers', label: 'Two Pointers' },
        { id: 'math', label: 'Math' },
        { id: 'sorting', label: 'Sorting' },
        { id: 'ordered-map', label: 'Ordered Map' },
        { id: 'hash-function', label: 'Hash Function' },
        { id: 'binary', label: 'Binary' },
    ];

    const filteredSolutions = solutions.filter((solution) => {
        if (activeFilter !== 'all') {
            return (
                solution.languages.some((lang) => lang.toLowerCase().includes(activeFilter)) ||
                solution.approaches.some((approach) =>
                    approach.toLowerCase().includes(activeFilter.replace('-', ' ')),
                )
            );
        }
        return true;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-gray-600">Loading solutions...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Search and Sort Bar */}
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-4">
                    <div className="relative max-w-md flex-1">
                        <AiOutlineSearch
                            className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                            size={16}
                        />
                        <input
                            type="text"
                            placeholder="Q Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="popular">Sort by</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="upvotes">Most Upvoted</option>
                    </select>
                    <button
                        onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                        className="rounded border border-gray-300 p-2 hover:bg-gray-50"
                    >
                        {viewMode === 'list' ? '⊞' : '☰'}
                    </button>
                </div>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2">
                {filterOptions.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                            activeFilter === filter.id
                                ? 'border border-blue-200 bg-blue-100 text-blue-800'
                                : 'border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* User Performance Banner */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <BiTrendingUp className="text-green-600" size={20} />
                        <span className="font-medium text-green-800">
                            Your last submission beat {userPerformance.runtime}% of other
                            submissions&apos; runtime.
                        </span>
                    </div>
                    <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                        Share my solution
                    </button>
                </div>
            </div>

            {/* Solutions List */}
            <div className="space-y-4">
                {filteredSolutions.map((solution) => (
                    <div
                        key={solution.id}
                        className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                    >
                        <div className="mb-3 flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                                    <span className="text-sm font-medium text-white">
                                        {solution.author.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-gray-900">
                                            {solution.author}
                                        </span>
                                        {solution.isVerified && (
                                            <span className="text-blue-600">✓</span>
                                        )}
                                        <span className="text-sm text-gray-500">Open</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            {solution.title}
                        </h3>

                        <div className="mb-3 flex flex-wrap gap-2">
                            {solution.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mb-4 flex flex-wrap gap-2">
                            {solution.languages.slice(0, 4).map((lang) => (
                                <span
                                    key={lang}
                                    className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                                >
                                    {lang}
                                </span>
                            ))}
                            {solution.languages.length > 4 && (
                                <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                                    {solution.languages.length - 4}+
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <AiOutlineLike size={16} />
                                    <span>
                                        {solution.upvotes > 1000
                                            ? `${(solution.upvotes / 1000).toFixed(1)}K`
                                            : solution.upvotes}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <AiOutlineEye size={16} />
                                    <span>
                                        {solution.views > 1000000
                                            ? `${(solution.views / 1000000).toFixed(1)}M`
                                            : solution.views > 1000
                                              ? `${(solution.views / 1000).toFixed(1)}K`
                                              : solution.views}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <AiOutlineMessage size={16} />
                                    <span>{solution.comments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Advertisement */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-orange-500">
                        <span className="text-lg font-bold text-white">G</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">GoDaddy</h4>
                        <p className="text-sm text-gray-600">Got an idea? Get it online.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionsTab;
