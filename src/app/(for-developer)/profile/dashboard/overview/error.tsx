'use client';

import { useEffect } from 'react';
import { ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function OverviewError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
            <div className="p-6 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                </div>

                <h2 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong!</h2>

                <p className="mb-6 max-w-md text-gray-600">
                    We encountered an error while loading your dashboard overview. Please try again
                    or contact support if the problem persists.
                </p>

                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
                    >
                        <ArrowPathIcon className="mr-2 h-4 w-4" />
                        Try Again
                    </button>

                    <button
                        onClick={() => (window.location.href = '/profile')}
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                        Back to Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
