'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fetchProblems, Problem } from '@/lib/api/problems';
import { fetchTopic, Topic } from '@/lib/api/topics';
import { FiltersSidebar } from './components/filters-sidebar';
import { ProblemsList } from './components/problems-list';
import { TopicDetailHeader } from './components/topic-detail-header';

export default function TopicPage() {
    const params = useParams();
    const router = useRouter();
    const topicId = params.topicId as string;

    const [problems, setProblems] = useState<Problem[]>([]);
    const [topic, setTopic] = useState<Topic | null>(null);
    const [loading, setLoading] = useState(false);
    const [topicLoading, setTopicLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState({
        difficulty: 'All difficulties',
        status: '',
        search: '',
    });

    const observer = useRef<IntersectionObserver>(null);
    const lastProblemElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMoreProblems();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore],
    );

    // Load topic details
    useEffect(() => {
        const loadTopic = async () => {
            if (!topicId) return;

            try {
                setTopicLoading(true);
                const response = await fetchTopic(topicId);
                setTopic(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load topic');
            } finally {
                setTopicLoading(false);
            }
        };

        loadTopic();
    }, [topicId]);

    // Load initial problems
    useEffect(() => {
        const loadInitialProblems = async () => {
            if (!topicId) return;

            try {
                setLoading(true);
                const response = await fetchProblems({
                    topicId,
                    page: 1,
                    limit: 10,
                });
                setProblems(response.data);
                setHasMore(response.pagination.hasNext);
                setPage(2);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load problems');
            } finally {
                setLoading(false);
            }
        };

        loadInitialProblems();
    }, [topicId]);

    const loadMoreProblems = useCallback(async () => {
        if (!topicId || loading || !hasMore) return;

        try {
            setLoading(true);
            const response = await fetchProblems({
                topicId,
                page,
                limit: 10,
            });
            setProblems((prev) => [...prev, ...response.data]);
            setHasMore(response.pagination.hasNext);
            setPage((prev) => prev + 1);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load more problems');
        } finally {
            setLoading(false);
        }
    }, [topicId, page, loading, hasMore]);

    // Filter problems based on current filters
    const filteredProblems = problems.filter((problem) => {
        if (filters.difficulty !== 'All difficulties' && problem.difficulty !== filters.difficulty)
            return false;
        if (filters.status && problem.status !== filters.status) return false;
        if (filters.search && !problem.title.toLowerCase().includes(filters.search.toLowerCase()))
            return false;
        return true;
    });

    if (topicLoading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <div className="flex justify-center">
                        <div className="text-lg text-gray-600">Loading topic...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !topic) {
        return (
            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <div className="flex justify-center">
                        <div className="text-lg text-red-600">{error || 'Topic not found'}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <TopicDetailHeader topicName={topic.name} onBack={() => router.push('/')} />

            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="lg:col-span-1"
                    >
                        <FiltersSidebar filters={filters} onFiltersChange={setFilters} />
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="lg:col-span-3"
                    >
                        <ProblemsList
                            problems={filteredProblems}
                            loading={loading}
                            hasMore={hasMore}
                            lastProblemElementRef={lastProblemElementRef}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
