'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function TestAuthPage() {
    const { user, isAuthenticated, isLoading, userType } = useAuth();
    const [serverAuth, setServerAuth] = useState<any>(null);

    useEffect(() => {
        // Test server-side authentication
        fetch('/api/v1/auth/me', {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setServerAuth(data);
            })
            .catch((error) => {
                console.error('Server auth test failed:', error);
                setServerAuth({ error: error.message });
            });
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="mb-4 text-2xl font-bold">Authentication Test Page</h1>

            <div className="space-y-4">
                <div className="rounded border p-4">
                    <h2 className="font-semibold">Client-Side Auth State:</h2>
                    <pre className="mt-2 rounded bg-gray-100 p-2 text-sm">
                        {JSON.stringify(
                            {
                                isAuthenticated,
                                isLoading,
                                userType,
                                user: user
                                    ? {
                                          id: user.id,
                                          email: user.email,
                                          role: user.role,
                                      }
                                    : null,
                            },
                            null,
                            2,
                        )}
                    </pre>
                </div>

                <div className="rounded border p-4">
                    <h2 className="font-semibold">Server-Side Auth Response:</h2>
                    <pre className="mt-2 rounded bg-gray-100 p-2 text-sm">
                        {JSON.stringify(serverAuth, null, 2)}
                    </pre>
                </div>

                <div className="rounded border p-4">
                    <h2 className="font-semibold">Cookies:</h2>
                    <pre className="mt-2 rounded bg-gray-100 p-2 text-sm">{document.cookie}</pre>
                </div>
            </div>
        </div>
    );
}
