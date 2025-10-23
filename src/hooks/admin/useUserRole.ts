'use client';

import { useEffect, useState } from 'react';

export interface UserData {
    id: string;
    email: string;
    role: 'ADMIN' | 'CANDIDATE' | 'RECRUITER';
    isActive: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export function useUserRole() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                setLoading(true);
                // Fetch current user role from database
                const response = await fetch('/api/admin/user/current');

                console.log('📡 Response status:', response.status);
                console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
                console.log('📡 Response URL:', response.url);

                if (!response.ok) {
                    console.error('❌ Response not OK. Status:', response.status);

                    // Try to get error details from response
                    let errorData = {};
                    try {
                        const errorText = await response.text();
                        console.log('📡 Error response text:', errorText);

                        if (errorText) {
                            errorData = JSON.parse(errorText);
                        }
                    } catch (parseError) {
                        console.log('📡 Could not parse error response as JSON');
                        errorData = { error: 'Response parsing failed' };
                    }

                    console.error('❌ API Error Response:', errorData);
                    throw new Error(
                        `API Error: ${response.status} - ${errorData.error || 'Unknown error'}`,
                    );
                }

                const data = await response.json();
                console.log('📡 API Response:', data);

                if (data.success && data.user) {
                    setUserData(data.user);
                    console.log('🔄 User role fetched from database:', data.user.role);
                    console.log('📧 User email:', data.user.email);
                } else {
                    console.error('❌ API returned error:', data.error);
                    setError(data.error || 'Failed to fetch user data');
                }
            } catch (err) {
                console.error('Error fetching user role:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');

                // In production, you might want to redirect to login or show error
                // For now, fallback to mock data for development
                setUserData({
                    id: '1',
                    email: 'james@admin.com',
                    role: 'RECRUITER',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            } finally {
                setLoading(false);
            }
        };

        // Initial fetch
        fetchUserRole();

        // Set up polling to check for role changes every 5 seconds
        const interval = setInterval(fetchUserRole, 5000);

        return () => clearInterval(interval);
    }, []);

    return {
        userData,
        loading,
        error,
        refetch: () => {
            setLoading(true);
            setError(null);
            // Re-fetch logic would go here
        },
    };
}
