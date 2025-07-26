'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CompanyForgotPassword() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/forgot-password');
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
                <p className="mt-2 text-sm text-gray-600">Redirecting to forgot password...</p>
            </div>
        </div>
    );
}
