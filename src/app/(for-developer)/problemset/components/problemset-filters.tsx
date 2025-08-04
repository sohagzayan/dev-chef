'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, Filter, LogIn, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { UserStats } from '@/lib/api/problems';

interface ProblemsetFiltersProps {
    filters: {
        difficulty: string;
        status: string;
        search: string;
        topic: string;
        tags: string[];
        companies: string[];
    };
    onFiltersChange: (filters: any) => void;
    stats: UserStats;
    loading?: boolean;
}

const difficultyOptions = [
    { value: 'All difficulties', label: 'All Difficulties', icon: '🎯' },
    { value: 'EASY', label: 'Easy', icon: '🟢', color: 'text-green-400' },
    { value: 'MEDIUM', label: 'Medium', icon: '🟡', color: 'text-yellow-400' },
    { value: 'HARD', label: 'Hard', icon: '🔴', color: 'text-red-400' },
];

const statusOptions = [
    { value: 'SOLVED', label: 'Solved', icon: CheckCircle, color: 'text-green-400' },
    { value: 'ATTEMPTED', label: 'Attempted', icon: Clock, color: 'text-orange-400' },
    { value: 'UNSOLVED', label: 'Unsolved', icon: Circle, color: 'text-gray-400' },
];

const popularTags = [
    'Array',
    'String',
    'Hash Table',
    'Dynamic Programming',
    'Math',
    'Sorting',
    'Greedy',
    'Depth-First Search',
    'Binary Search',
    'Tree',
    'Graph',
    'Two Pointers',
];

const popularCompanies = [
    'Google',
    'Microsoft',
    'Amazon',
    'Meta',
    'Apple',
    'Netflix',
    'Uber',
    'Airbnb',
];

export function ProblemsetFilters({
    filters,
    onFiltersChange,
    stats,
    loading = false,
}: ProblemsetFiltersProps) {
    const { isAuthenticated } = useAuth();
    const [isExpanded, setIsExpanded] = useState(false);

    const updateFilters = (updates: any) => {
        onFiltersChange({ ...filters, ...updates });
    };

    const toggleTag = (tag: string) => {
        const newTags = filters.tags.includes(tag)
            ? filters.tags.filter((t) => t !== tag)
            : [...filters.tags, tag];
        updateFilters({ tags: newTags });
    };

    const toggleCompany = (company: string) => {
        const newCompanies = filters.companies.includes(company)
            ? filters.companies.filter((c) => c !== company)
            : [...filters.companies, company];
        updateFilters({ companies: newCompanies });
    };

    const clearAllFilters = () => {
        onFiltersChange({
            difficulty: 'All difficulties',
            status: '',
            search: '',
            topic: '',
            tags: [],
            companies: [],
        });
    };

    const hasActiveFilters =
        filters.difficulty !== 'All difficulties' ||
        filters.status ||
        filters.search ||
        filters.topic ||
        filters.tags.length > 0 ||
        filters.companies.length > 0;

    return (
        <div className="space-y-6">
            {/* Stats Card */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="border border-gray-700 bg-gray-900/50 shadow-lg">
                    <CardContent className="p-6">
                        {!isAuthenticated && !loading ? (
                            // Show login prompt for unauthenticated users
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-900/30">
                                    <LogIn className="h-6 w-6 text-blue-400" />
                                </div>
                                <h3 className="mb-2 font-semibold text-white">
                                    Track Your Progress
                                </h3>
                                <p className="mb-4 text-sm text-gray-300">
                                    Sign in to see your solved problems and track your progress.
                                </p>
                                <div className="flex flex-col gap-2">
                                    <Link href="/developers/login">
                                        <Button
                                            size="sm"
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                        >
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/developers/signup">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="w-full border-blue-500 text-blue-400 hover:bg-blue-900/20"
                                        >
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            // Show progress for authenticated users
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-white">Your Progress</h3>
                                    {loading ? (
                                        <div className="h-6 w-16 animate-pulse rounded bg-gray-700"></div>
                                    ) : (
                                        <Badge
                                            variant="secondary"
                                            className="border border-blue-500/30 bg-blue-900/30 text-blue-300"
                                        >
                                            {stats.total} Total
                                        </Badge>
                                    )}
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="text-center">
                                        {loading ? (
                                            <div className="mx-auto h-8 w-8 animate-pulse rounded bg-gray-700"></div>
                                        ) : (
                                            <div className="text-2xl font-bold text-green-400">
                                                {stats.solved}
                                            </div>
                                        )}
                                        <div className="text-xs text-gray-400">Solved</div>
                                    </div>
                                    <div className="text-center">
                                        {loading ? (
                                            <div className="mx-auto h-8 w-8 animate-pulse rounded bg-gray-700"></div>
                                        ) : (
                                            <div className="text-2xl font-bold text-orange-400">
                                                {stats.attempted}
                                            </div>
                                        )}
                                        <div className="text-xs text-gray-400">Attempted</div>
                                    </div>
                                    <div className="text-center">
                                        {loading ? (
                                            <div className="mx-auto h-8 w-8 animate-pulse rounded bg-gray-700"></div>
                                        ) : (
                                            <div className="text-2xl font-bold text-gray-400">
                                                {stats.unsolved}
                                            </div>
                                        )}
                                        <div className="text-xs text-gray-400">Unsolved</div>
                                    </div>
                                </div>
                                {!loading && stats.total > 0 && (
                                    <div className="h-2 w-full rounded-full bg-gray-700">
                                        <div
                                            className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
                                            style={{
                                                width: `${(stats.solved / stats.total) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Filters Card */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="sticky top-28 border border-gray-700 bg-gray-900/50 shadow-lg">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-lg text-white">
                                <Filter className="h-5 w-5 text-purple-400" />
                                Filters
                            </CardTitle>
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearAllFilters}
                                    className="h-6 px-2 text-xs text-gray-400 hover:text-gray-200"
                                >
                                    <X className="mr-1 h-3 w-3" />
                                    Clear
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Search */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Search Problems
                            </label>
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    placeholder="Search by title or tag..."
                                    value={filters.search}
                                    onChange={(e) => updateFilters({ search: e.target.value })}
                                    className="border-gray-600 bg-gray-800 pl-10 text-white placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Difficulty Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Difficulty</label>
                            <Select
                                value={filters.difficulty}
                                onValueChange={(value) => updateFilters({ difficulty: value })}
                            >
                                <SelectTrigger className="border-gray-600 bg-gray-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border-gray-600 bg-gray-800">
                                    {difficultyOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                            className="text-white hover:bg-gray-700"
                                        >
                                            <span className="flex items-center gap-2">
                                                <span>{option.icon}</span>
                                                <span className={option.color}>{option.label}</span>
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Status Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Status</label>
                            {!isAuthenticated ? (
                                <div className="rounded-lg border border-gray-600 bg-gray-800/50 p-3 text-center">
                                    <p className="text-xs text-gray-400">
                                        Sign in to filter by problem status
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {statusOptions.map((option) => {
                                        const Icon = option.icon;
                                        const count =
                                            option.value === 'SOLVED'
                                                ? stats.solved
                                                : option.value === 'ATTEMPTED'
                                                  ? stats.attempted
                                                  : stats.unsolved;

                                        return (
                                            <div
                                                key={option.value}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={option.value}
                                                        checked={filters.status === option.value}
                                                        onCheckedChange={(checked) =>
                                                            updateFilters({
                                                                status: checked ? option.value : '',
                                                            })
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={option.value}
                                                        className="flex items-center gap-2 text-sm leading-none font-medium text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        <Icon
                                                            className={`h-4 w-4 ${option.color}`}
                                                        />
                                                        {option.label}
                                                    </label>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="border border-gray-600 bg-gray-800 text-xs text-gray-300"
                                                >
                                                    {loading ? '...' : count}
                                                </Badge>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Popular Tags */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Popular Tags
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {popularTags
                                    .slice(0, isExpanded ? popularTags.length : 6)
                                    .map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant={
                                                filters.tags.includes(tag) ? 'default' : 'outline'
                                            }
                                            className={`cursor-pointer transition-colors ${
                                                filters.tags.includes(tag)
                                                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                                                    : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                                            }`}
                                            onClick={() => toggleTag(tag)}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                {popularTags.length > 6 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="h-6 px-2 text-xs text-gray-400 hover:text-gray-200"
                                    >
                                        {isExpanded ? 'Show Less' : 'Show More'}
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Popular Companies */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Popular Companies
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {popularCompanies.map((company) => (
                                    <Badge
                                        key={company}
                                        variant={
                                            filters.companies.includes(company)
                                                ? 'default'
                                                : 'outline'
                                        }
                                        className={`cursor-pointer transition-colors ${
                                            filters.companies.includes(company)
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                                        }`}
                                        onClick={() => toggleCompany(company)}
                                    >
                                        {company}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
