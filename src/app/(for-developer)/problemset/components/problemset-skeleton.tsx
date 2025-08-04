import { Skeleton } from '@/components/ui/skeleton';

export function ProblemsetSkeleton() {
    return (
        <div className="mx-auto max-w-7xl p-6 text-white">
            {/* Back Button Skeleton */}
            <div className="mb-6">
                <Skeleton className="h-10 w-20" />
            </div>

            {/* Header Skeleton */}
            <div className="mb-8">
                <Skeleton className="mb-4 h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Filters Sidebar Skeleton */}
                <div className="lg:col-span-1">
                    <div className="space-y-6">
                        <Skeleton className="h-6 w-32" />
                        <div className="space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <div className="space-y-1">
                                        {[...Array(3)].map((_, j) => (
                                            <Skeleton key={j} className="h-3 w-full" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="lg:col-span-3">
                    {/* Stats Skeleton */}
                    <div className="mb-6 grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-lg border border-gray-700 bg-gray-900/50 p-4"
                            >
                                <Skeleton className="mb-2 h-4 w-16" />
                                <Skeleton className="h-6 w-12" />
                            </div>
                        ))}
                    </div>

                    {/* Topic Filters Skeleton */}
                    <div className="mb-6 rounded-lg border border-gray-700 bg-gray-900/50 p-6">
                        <Skeleton className="mb-4 h-5 w-32" />
                        <div className="flex flex-wrap gap-2">
                            {[...Array(6)].map((_, i) => (
                                <Skeleton key={i} className="h-8 w-20" />
                            ))}
                        </div>
                    </div>

                    {/* Problems List Skeleton */}
                    <div className="space-y-2">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-lg border border-gray-700 bg-gray-900/50 p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-5 w-8" />
                                        <div className="flex-1">
                                            <Skeleton className="mb-1 h-5 w-48" />
                                            <Skeleton className="h-3 w-32" />
                                        </div>
                                        <Skeleton className="h-4 w-12" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <Skeleton className="h-4 w-4" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="mt-6 flex justify-center">
                        <div className="flex gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-10 w-10" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
