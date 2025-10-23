'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ProfileError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Profile page error:', error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <Card className="w-full max-w-md border-red-100 bg-white shadow-lg">
                <CardContent className="p-8 text-center">
                    <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-10 w-10 text-red-600" />
                    </div>
                    <h1 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong!</h1>
                    <p className="mb-6 text-gray-600">
                        We encountered an error while loading your profile. Please try again.
                    </p>
                    <div className="flex gap-3">
                        <Button
                            onClick={reset}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Try again
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => (window.location.href = '/dashboard')}
                        >
                            Go to Dashboard
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
