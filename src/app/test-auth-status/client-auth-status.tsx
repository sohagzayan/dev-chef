'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

function AuthStatusContent() {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <p className="text-gray-400">Checking authentication...</p>;
    }

    return (
        <div className="space-y-2">
            <p>
                <span className="font-medium">Is Authenticated:</span>{' '}
                {isAuthenticated ? '✅ Yes' : '❌ No'}
            </p>
            {user && (
                <>
                    <p>
                        <span className="font-medium">User ID:</span> {user.id}
                    </p>
                    <p>
                        <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p>
                        <span className="font-medium">Role:</span> {user.role}
                    </p>
                    <p>
                        <span className="font-medium">User Type:</span>{' '}
                        {user.role === 'RECRUITER' ? 'Company' : 'Developer'}
                    </p>
                </>
            )}
            {!user && <p className="text-gray-400">No user data available</p>}
        </div>
    );
}

export function ClientAuthStatus() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Show loading during SSR
    if (!mounted) {
        return <p className="text-gray-400">Loading...</p>;
    }

    // Only render the auth content after client-side hydration
    return <AuthStatusContent />;
}
