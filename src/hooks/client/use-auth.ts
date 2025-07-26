import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClientCookies } from '@/lib/utils/cookies';

interface User {
    id: string;
    email: string;
    role: string;
    isActive: boolean;
    profile: any;
}

interface UseAuthReturn {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    refreshTokens: () => Promise<boolean>;
    clearUser: () => void;
}

export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    // Initialize auth state
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Get user data from client-side cookie
                const userData = ClientCookies.getUserData();

                if (userData) {
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                clearUser();
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Refresh tokens function
    const refreshTokens = useCallback(async (): Promise<boolean> => {
        try {
            const response = await fetch('/api/v1/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies
            });

            if (response.ok) {
                const result = await response.json();

                if (result.success && result.data) {
                    // Update user data
                    setUser(result.data.user);
                    setIsAuthenticated(true);

                    // Update client-side user cookie
                    ClientCookies.setUserData(result.data.user);

                    return true;
                }
            }

            return false;
        } catch (error) {
            console.error('Error refreshing tokens:', error);
            return false;
        }
    }, []);

    // Logout function
    const logout = useCallback(async (): Promise<void> => {
        try {
            // Call logout API to revoke refresh token
            await fetch('/api/v1/auth/refresh', {
                method: 'DELETE',
                credentials: 'include', // Include cookies
            });
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            // Clear local state regardless of API call success
            clearUser();

            // Redirect to home page
            router.push('/');
        }
    }, [router]);

    // Clear user data
    const clearUser = useCallback(() => {
        setUser(null);
        setIsAuthenticated(false);
        ClientCookies.clearUserData();
    }, []);

    // Auto-refresh tokens when they're about to expire
    useEffect(() => {
        if (!isAuthenticated) return;

        const refreshInterval = setInterval(
            async () => {
                const success = await refreshTokens();
                if (!success) {
                    // If refresh fails, logout user
                    await logout();
                }
            },
            14 * 60 * 1000,
        ); // Refresh every 14 minutes (tokens expire in 15 minutes)

        return () => clearInterval(refreshInterval);
    }, [isAuthenticated, refreshTokens, logout]);

    return {
        user,
        isLoading,
        isAuthenticated,
        logout,
        refreshTokens,
        clearUser,
    };
}

// Hook for making authenticated API calls
export function useAuthenticatedFetch() {
    const { refreshTokens, logout } = useAuth();

    const authenticatedFetch = useCallback(
        async (url: string, options: RequestInit = {}): Promise<Response> => {
            // Add credentials to include cookies
            const fetchOptions: RequestInit = {
                ...options,
                credentials: 'include',
            };

            let response = await fetch(url, fetchOptions);

            // If we get a 401, try to refresh tokens
            if (response.status === 401) {
                const refreshSuccess = await refreshTokens();

                if (refreshSuccess) {
                    // Retry the original request
                    response = await fetch(url, fetchOptions);
                } else {
                    // If refresh fails, logout
                    await logout();
                    throw new Error('Authentication failed');
                }
            }

            return response;
        },
        [refreshTokens, logout],
    );

    return authenticatedFetch;
}
