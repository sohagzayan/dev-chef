'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/components/admin/providers/AdminProvider';

export default function AdminPage() {
    const router = useRouter();
    const { user } = useAdmin();

    useEffect(() => {
        // Redirect to role-specific dashboard
        if (user?.role) {
            console.log('🔄 Redirecting to dashboard for role:', user.role);
            router.push('/admin/dashboard');
        }
    }, [user?.role, router]);

    // Show loading while redirecting
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="mb-4 text-2xl">🔄</div>
                <h2 className="text-xl font-semibold text-gray-900">Redirecting to Dashboard...</h2>
                <p className="text-gray-600">
                    Please wait while we take you to your personalized dashboard.
                </p>
            </div>
        </div>
    );
}
