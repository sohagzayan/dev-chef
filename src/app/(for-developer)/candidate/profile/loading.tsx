import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileLoading() {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Sidebar Skeleton */}
            <div className="w-64 bg-blue-600 p-6">
                <div className="mb-8 flex items-center justify-center">
                    <Skeleton className="h-12 w-12 rounded-full" />
                </div>
                <nav className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2">
                            <Skeleton className="h-5 w-5 rounded" />
                            <Skeleton className="h-4 w-20 rounded" />
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1">
                <div className="flex">
                    <div className="w-80 border-r border-gray-100 bg-gray-50 p-6">
                        <div className="mb-6">
                            <Skeleton className="mb-4 h-6 w-32 rounded" />
                            <Skeleton className="h-4 w-24 rounded" />
                        </div>
                        <div className="space-y-2">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-10 w-full rounded" />
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 p-8">
                        <Skeleton className="mb-8 h-8 w-48 rounded" />
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Skeleton className="h-24 w-24 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-32 rounded" />
                                    <Skeleton className="h-4 w-24 rounded" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton className="h-4 w-20 rounded" />
                                        <Skeleton className="h-10 w-full rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
