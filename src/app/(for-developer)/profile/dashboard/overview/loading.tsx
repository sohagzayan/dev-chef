export default function OverviewLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
            <div className="p-6">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="mb-2 h-10 w-64 animate-pulse rounded-lg bg-gray-200"></div>
                    <div className="h-6 w-96 animate-pulse rounded-lg bg-gray-200"></div>
                </div>

                {/* Period Selector Skeleton */}
                <div className="mb-6">
                    <div className="h-12 w-80 animate-pulse rounded-lg bg-gray-200"></div>
                </div>

                {/* Stats Cards Skeleton */}
                <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="h-32 animate-pulse rounded-xl bg-gray-200"
                        ></div>
                    ))}
                </div>

                {/* Main Content Grid Skeleton */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Recent Activities Skeleton */}
                    <div className="h-96 animate-pulse rounded-xl bg-gray-200"></div>

                    {/* Upcoming Goals Skeleton */}
                    <div className="h-96 animate-pulse rounded-xl bg-gray-200"></div>
                </div>

                {/* Quick Actions Skeleton */}
                <div className="mt-8 h-32 animate-pulse rounded-xl bg-gray-200"></div>
            </div>
        </div>
    );
}
