'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AuthDebug() {
    const { isAuthenticated, user, isLoading, userType } = useAuth();
    const [serverAuthStatus, setServerAuthStatus] = useState<string>('checking');

    useEffect(() => {
        const checkServerAuth = async () => {
            try {
                const response = await fetch('/api/v1/auth/me', {
                    credentials: 'include',
                });
                setServerAuthStatus(response.ok ? 'success' : `failed-${response.status}`);
            } catch {
                setServerAuthStatus('error');
            }
        };

        checkServerAuth();
    }, []);

    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <div className="fixed right-4 bottom-4 z-50 rounded-lg bg-black/80 p-4 text-xs text-white">
            <div className="space-y-1">
                <div>Auth Debug:</div>
                <div>Client Auth: {isAuthenticated ? '✅' : '❌'}</div>
                <div>Server Auth: {serverAuthStatus}</div>
                <div>Loading: {isLoading ? '✅' : '❌'}</div>
                <div>User Type: {userType || 'none'}</div>
                <div>User ID: {user?.id || 'none'}</div>
            </div>
        </div>
    );
}
