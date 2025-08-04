import { Card, CardContent } from '@/components/ui/card';

export default function ProfileLoading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Left Panel Skeleton */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Profile Card Skeleton */}
                        <div>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-center">
                                        <div className="mx-auto mb-4 h-24 w-24 animate-pulse rounded-full bg-gray-200" />
                                        <div className="mx-auto mb-1 h-6 w-32 animate-pulse rounded bg-gray-200" />
                                        <div className="mx-auto mb-4 h-4 w-24 animate-pulse rounded bg-gray-200" />
                                        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Stats Skeleton */}
                        {[1, 2, 3].map((i) => (
                            <div key={i}>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                                            {[1, 2, 3, 4].map((j) => (
                                                <div
                                                    key={j}
                                                    className="flex items-center justify-between"
                                                >
                                                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                                                    <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Right Panel Skeleton */}
                    <div className="space-y-6 lg:col-span-3">
                        {/* Problem Stats Skeleton */}
                        <div>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />
                                    <div className="flex items-center gap-8">
                                        <div className="h-32 w-32 animate-pulse rounded-full bg-gray-200" />
                                        <div className="flex-1 space-y-4">
                                            <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                                            <div className="space-y-3">
                                                {[1, 2, 3].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                                                        <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Activity Skeleton */}
                        {[1, 2, 3].map((i) => (
                            <div key={i}>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200" />
                                        <div className="grid grid-cols-52 gap-1">
                                            {Array.from({ length: 366 }).map((_, j) => (
                                                <div
                                                    key={j}
                                                    className="h-3 w-3 animate-pulse rounded-sm bg-gray-200"
                                                />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
