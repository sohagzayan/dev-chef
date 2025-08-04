import { Suspense } from 'react';
import {
    fetchProblemsServer,
    fetchTopicsServer,
    fetchUserStatsServer,
} from '@/lib/api/server-problems';
import { getServerAuth } from '@/lib/server-auth';
import { ProblemsetClient } from './components/problemset-client';
import { ProblemsetSkeleton } from './components/problemset-skeleton';

interface ProblemsetPageProps {
    searchParams: {
        page?: string;
        difficulty?: string;
        status?: string;
        search?: string;
        topicId?: string;
        tags?: string;
        companyTags?: string;
    };
}

export default async function ProblemsetPage({ searchParams }: ProblemsetPageProps) {
    const { isAuthenticated } = await getServerAuth();

    // Parse search parameters
    const page = parseInt(searchParams.page || '1');
    const limit = 9; // Show 9 problems per page

    // Prepare API parameters
    const problemsParams = {
        page,
        limit,
        topicId: searchParams.topicId,
        difficulty:
            searchParams.difficulty !== 'All difficulties' ? searchParams.difficulty : undefined,
        status: searchParams.status,
        search: searchParams.search,
        tags: searchParams.tags,
        companyTags: searchParams.companyTags,
    };

    const statsParams = {
        topicId: searchParams.topicId,
        difficulty:
            searchParams.difficulty !== 'All difficulties' ? searchParams.difficulty : undefined,
        tags: searchParams.tags,
        companies: searchParams.companyTags,
    };

    const topicsParams = {
        isActive: true,
    };

    try {
        // Fetch data using API endpoints in parallel
        const [problemsResponse, statsResponse, topicsResponse] = await Promise.all([
            fetchProblemsServer(problemsParams),
            fetchUserStatsServer(statsParams),
            fetchTopicsServer(topicsParams),
        ]);

        // Extract data from responses
        const problems = problemsResponse.data || [];
        const pagination = problemsResponse.pagination || {
            page,
            limit,
            total: 0,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
        };
        const userStats = statsResponse.data || {
            total: 0,
            solved: 0,
            attempted: 0,
            unsolved: 0,
            completionRate: 0,
        };
        const topics = topicsResponse.data || [];
        const topicStats = topicsResponse.stats || {
            totalTopics: 0,
            totalProblems: 0,
            topicTypes: [],
            difficulties: [],
        };

        const initialFilters = {
            difficulty: searchParams.difficulty || 'All difficulties',
            status: searchParams.status || '',
            search: searchParams.search || '',
            topic: searchParams.topicId || '',
            tags: searchParams.tags ? searchParams.tags.split(',').filter(Boolean) : [],
            companies: searchParams.companyTags
                ? searchParams.companyTags.split(',').filter(Boolean)
                : [],
        };

        return (
            <Suspense fallback={<ProblemsetSkeleton />}>
                <ProblemsetClient
                    initialProblems={problems}
                    initialStats={userStats}
                    initialTopics={topics}
                    initialTopicStats={topicStats}
                    initialPagination={pagination}
                    initialFilters={initialFilters}
                    isAuthenticated={isAuthenticated}
                />
            </Suspense>
        );
    } catch (error) {
        console.error('Error fetching problemset data:', error);

        // Return empty state on error
        return (
            <Suspense fallback={<ProblemsetSkeleton />}>
                <ProblemsetClient
                    initialProblems={[]}
                    initialStats={{
                        total: 0,
                        solved: 0,
                        attempted: 0,
                        unsolved: 0,
                        completionRate: 0,
                    }}
                    initialTopics={[]}
                    initialTopicStats={{
                        totalTopics: 0,
                        totalProblems: 0,
                        topicTypes: [],
                        difficulties: [],
                    }}
                    initialPagination={{
                        page,
                        limit,
                        total: 0,
                        totalPages: 0,
                        hasNext: false,
                        hasPrev: false,
                    }}
                    initialFilters={{
                        difficulty: searchParams.difficulty || 'All difficulties',
                        status: searchParams.status || '',
                        search: searchParams.search || '',
                        topic: searchParams.topicId || '',
                        tags: searchParams.tags ? searchParams.tags.split(',').filter(Boolean) : [],
                        companies: searchParams.companyTags
                            ? searchParams.companyTags.split(',').filter(Boolean)
                            : [],
                    }}
                    isAuthenticated={isAuthenticated}
                />
            </Suspense>
        );
    }
}
