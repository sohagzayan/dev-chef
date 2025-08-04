'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Problem, UserStats } from '@/lib/api/problems';
import { Topic, TopicStats } from '@/lib/api/topics';
import {
    useGetGeneralStatsQuery,
    useGetProblemsQuery,
    useGetTopicsQuery,
    useGetUserStatsQuery,
} from '@/store/api/problemsApi';
import { ProblemsetFilters } from './problemset-filters';
import { ProblemsetHeader } from './problemset-header';
import { ProblemsetList } from './problemset-list';
import { ProblemsetStats } from './problemset-stats';
import { ProblemsetTopicFilters } from './problemset-topic-filters';

interface ProblemsetClientProps {
    initialProblems: Problem[];
    initialStats: UserStats;
    initialTopics: Topic[];
    initialTopicStats: TopicStats | null;
    initialPagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    initialFilters: {
        difficulty: string;
        status: string;
        search: string;
        topic: string;
        tags: string[];
        companies: string[];
    };
    isAuthenticated: boolean;
}

export function ProblemsetClient({
    initialProblems,
    initialStats,
    initialTopics,
    initialTopicStats,
    initialPagination,
    initialFilters,
    isAuthenticated,
}: ProblemsetClientProps) {
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(initialPagination.page);
    const [filters, setFilters] = useState(initialFilters);
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');

    // Use Redux Toolkit queries for client-side data fetching
    const {
        data: problemsData,
        isLoading: problemsLoading,
        error: problemsError,
    } = useGetProblemsQuery(
        {
            page: currentPage,
            limit: 9,
            topicId: filters.topic || undefined,
            difficulty: filters.difficulty !== 'All difficulties' ? filters.difficulty : undefined,
            status: filters.status || undefined,
            search: filters.search || undefined,
            tags: filters.tags.length > 0 ? filters.tags.join(',') : undefined,
            companyTags: filters.companies.length > 0 ? filters.companies.join(',') : undefined,
        },
        {
            skip: false, // Always fetch to get latest data
        },
    );

    // Use appropriate stats query based on authentication status
    const { data: userStatsData, isLoading: userStatsLoading } = useGetUserStatsQuery(
        {
            topicId: filters.topic || undefined,
            difficulty: filters.difficulty !== 'All difficulties' ? filters.difficulty : undefined,
            tags: filters.tags.length > 0 ? filters.tags.join(',') : undefined,
            companies: filters.companies.length > 0 ? filters.companies.join(',') : undefined,
        },
        {
            skip: !isAuthenticated, // Only fetch if authenticated
        },
    );

    const { data: generalStatsData, isLoading: generalStatsLoading } = useGetGeneralStatsQuery(
        {
            topicId: filters.topic || undefined,
            difficulty: filters.difficulty !== 'All difficulties' ? filters.difficulty : undefined,
            tags: filters.tags.length > 0 ? filters.tags.join(',') : undefined,
            companies: filters.companies.length > 0 ? filters.companies.join(',') : undefined,
        },
        {
            skip: isAuthenticated, // Only fetch if not authenticated
        },
    );

    // Use appropriate stats data based on authentication status
    const statsData = isAuthenticated ? userStatsData : generalStatsData;
    const statsLoading = isAuthenticated ? userStatsLoading : generalStatsLoading;

    const { data: topicsData, isLoading: topicsLoading } = useGetTopicsQuery(
        {
            isActive: true,
        },
        {
            skip: false, // Always fetch topics
        },
    );

    // Use data from API or fallback to initial data
    const problems = problemsData?.data || initialProblems;
    const currentPagination = problemsData?.pagination || initialPagination;
    const stats = statsData?.data || initialStats;
    const topics = topicsData?.data || initialTopics;
    const topicStats = topicsData?.stats || initialTopicStats;
    const loading = problemsLoading || statsLoading || topicsLoading;
    const error = problemsError ? 'Failed to load problems' : null;

    // Update URL when filters change
    const updateURL = useCallback(
        (newFilters: typeof filters, page: number = 1) => {
            const params = new URLSearchParams();

            if (page > 1) params.set('page', page.toString());
            if (newFilters.difficulty !== 'All difficulties')
                params.set('difficulty', newFilters.difficulty);
            if (newFilters.status) params.set('status', newFilters.status);
            if (newFilters.search) params.set('search', newFilters.search);
            if (newFilters.topic) params.set('topicId', newFilters.topic);
            if (newFilters.tags.length > 0) params.set('tags', newFilters.tags.join(','));
            if (newFilters.companies.length > 0)
                params.set('companyTags', newFilters.companies.join(','));

            const newURL = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
            router.push(newURL);
        },
        [router],
    );

    // Handle filter changes
    const handleFiltersChange = useCallback(
        (newFilters: typeof filters) => {
            setFilters(newFilters);
            setCurrentPage(1);
            updateURL(newFilters, 1);
        },
        [updateURL],
    );

    // Handle page changes
    const handlePageChange = useCallback(
        (page: number) => {
            setCurrentPage(page);
            updateURL(filters, page);
        },
        [filters, updateURL],
    );

    // Handle topic changes
    const handleTopicChange = useCallback(
        (topicName: string) => {
            setSelectedTopic(topicName);
            const topic = topics.find((t) => t.name === topicName);
            const newFilters = {
                ...filters,
                topic: topic ? topic.id : '',
            };
            setFilters(newFilters);
            setCurrentPage(1);
            updateURL(newFilters, 1);
        },
        [topics, filters, updateURL],
    );

    // Handle category changes
    const handleCategoryChange = useCallback(
        (categoryName: string) => {
            setSelectedCategory(categoryName);
            const newFilters = { ...filters };

            if (categoryName === 'All Topics') {
                newFilters.topic = '';
            } else {
                const categoryType = categoryName.toUpperCase().replace(' ', '_');
                const categoryTopics = topics.filter((t) => t.type === categoryType);
                if (categoryTopics.length > 0) {
                    newFilters.topic = categoryTopics[0].id;
                }
            }

            setFilters(newFilters);
            setCurrentPage(1);
            updateURL(newFilters, 1);
        },
        [topics, filters, updateURL],
    );

    // Clear status filter when user logs out
    useEffect(() => {
        if (!isAuthenticated && filters.status) {
            const newFilters = { ...filters, status: '' };
            setFilters(newFilters);
            updateURL(newFilters, currentPage);
        }
    }, [isAuthenticated, filters.status, updateURL, currentPage]);

    if (error) {
        return (
            <div className="min-h-screen bg-black p-6">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-lg border border-red-500/30 bg-red-900/20 p-6 text-center">
                        <h2 className="text-xl font-semibold text-red-400">
                            Error Loading Problems
                        </h2>
                        <p className="mt-2 text-red-300">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-6 text-white">
            {/* Back Button */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:bg-gray-800/50 hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>

            <ProblemsetHeader />

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <ProblemsetFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        stats={stats}
                        loading={loading}
                    />
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <ProblemsetStats
                        stats={stats}
                        loading={loading}
                        isAuthenticated={isAuthenticated}
                        isFiltered={
                            !!selectedTopic ||
                            !!selectedCategory ||
                            selectedCategory !== 'All Topics'
                        }
                        filterInfo={
                            selectedTopic
                                ? `Topic: ${selectedTopic}`
                                : selectedCategory && selectedCategory !== 'All Topics'
                                  ? `Category: ${selectedCategory}`
                                  : undefined
                        }
                    />

                    {/* Topic Filters */}
                    <div className="mb-6 rounded-lg border border-gray-700 bg-gray-900/50 p-6">
                        <ProblemsetTopicFilters
                            topics={topics}
                            topicStats={topicStats}
                            loading={loading}
                            selectedTopic={selectedTopic}
                            selectedCategory={selectedCategory}
                            onTopicChange={handleTopicChange}
                            onCategoryChange={handleCategoryChange}
                        />
                    </div>

                    <ProblemsetList
                        problems={problems}
                        loading={loading}
                        currentPage={currentPage}
                        totalPages={currentPagination.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}
