'use client';

import { useCallback, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { generateProblems, topics } from '@/data/problem-data';
import { FiltersSidebar } from './components/filters-sidebar';
import { ProblemsList } from './components/problems-list';
import { TopicDetailHeader } from './components/topic-detail-header';

export default function TopicPage() {
    const params = useParams();
    const router = useRouter();
    const topicId = params.topicId as string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [problems, setProblems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
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

    const loadMoreProblems = useCallback(() => {
        if (!topicId || loading) return;

        setLoading(true);
        setTimeout(() => {
            const newProblems = generateProblems(topicId, page);
            setProblems((prev) => [...prev, ...newProblems]);
            setPage((prev) => prev + 1);
            setLoading(false);

            if (page >= 4) {
                setHasMore(false);
            }
        }, 1000);
    }, [topicId, page, loading]);

    // Load initial problems
    useState(() => {
        if (topicId) {
            const initialProblems = generateProblems(topicId, 0);
            setProblems(initialProblems);
            setPage(1);
        }
    });

    const filteredProblems = problems.filter((problem) => {
        if (filters.difficulty !== 'All difficulties' && problem.difficulty !== filters.difficulty)
            return false;
        if (filters.status && problem.status !== filters.status) return false;
        if (filters.search && !problem.title.toLowerCase().includes(filters.search.toLowerCase()))
            return false;
        return true;
    });

    const topic = topics.find((t) => t.id === topicId);

    if (!topic) {
        return <div>Topic not found</div>;
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
