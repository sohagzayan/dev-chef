import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    role: string;
    profile: any;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export function useAuthClient() {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });
    const router = useRouter();

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = useCallback(async () => {
        try {
            // Try to get user from localStorage first
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setAuthState({
                    user,
                    isAuthenticated: true,
                    isLoading: false,
                });
                return;
            }

            // If no stored user, try to refresh token
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.data) {
                    localStorage.setItem('user', JSON.stringify(result.data.user));
                    setAuthState({
                        user: result.data.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return;
                }
            }

            // No valid authentication
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        } catch (error) {
            console.error('Auth check error:', error);
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage and state regardless of API response
            localStorage.removeItem('user');
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
            router.push('/companies/login');
        }
    }, [router]);

    const refreshToken = useCallback(async () => {
        try {
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.data) {
                    localStorage.setItem('user', JSON.stringify(result.data.user));
                    setAuthState({
                        user: result.data.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return true;
                }
            }

            // Refresh failed, logout user
            await logout();
            return false;
        } catch (error) {
            console.error('Token refresh error:', error);
            await logout();
            return false;
        }
    }, [logout]);

    return {
        ...authState,
        logout,
        refreshToken,
        checkAuth,
    };
}
