'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthClient } from '@/hooks/client/use-auth-client';

interface ProtectedCompanyRouteProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function ProtectedCompanyRoute({ children, fallback }: ProtectedCompanyRouteProps) {
    const { user, isAuthenticated, isLoading } = useAuthClient();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/companies/login');
        }
    }, [isLoading, isAuthenticated, router]);

    useEffect(() => {
        if (!isLoading && isAuthenticated && user && user.role !== 'RECRUITER') {
            // User is authenticated but not a recruiter
            router.push('/companies/login?error=access_denied');
        }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading) {
        return (
            fallback || (
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[rgb(148,242,127)]"></div>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </div>
            )
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect to login
    }

    if (user && user.role !== 'RECRUITER') {
        return null; // Will redirect to login with error
    }

    return <>{children}</>;
}
