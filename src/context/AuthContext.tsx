'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ClientCookies } from '@/lib/utils/cookies';

// Types
interface User {
    id: string;
    email: string;
    role: 'CANDIDATE' | 'RECRUITER' | 'ADMIN';
    name?: string;
    isActive: boolean;
    profile?: any;
    lastLoginAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    userType: 'developer' | 'company' | null;
    notificationCount: number;
}

interface AuthContextType extends AuthState {
    login: (
        email: string,
        password: string,
        rememberMe: boolean,
        userType: 'developer' | 'company',
    ) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    refreshSession: () => Promise<boolean>;
    clearUser: () => void;
    showSessionExpiryModal: boolean;
    setShowSessionExpiryModal: (show: boolean) => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        userType: null,
        notificationCount: 0,
    });

    const [showSessionExpiryModal, setShowSessionExpiryModal] = useState(false);
    const router = useRouter();

    // Check server-side authentication state
    const checkServerAuth = useCallback(async (): Promise<boolean> => {
        try {
            const response = await fetch('/api/v1/auth/me', {
                method: 'GET',
                credentials: 'include', // This will send the HTTP-only cookies
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.data) {
                    const userData = result.data.user;

                    console.log('AuthContext - Server auth check successful, userData:', userData);

                    // Store user data in client-side cookie
                    ClientCookies.setUserData(userData);

                    // Update auth state
                    setAuthState({
                        user: userData,
                        isAuthenticated: true,
                        isLoading: false,
                        userType: userData.role === 'RECRUITER' ? 'company' : 'developer',
                        notificationCount: 0,
                    });

                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Error checking server auth:', error);
            return false;
        }
    }, []);

    // Initialize auth state
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // First check server-side authentication state
                const serverAuth = await checkServerAuth();

                if (!serverAuth) {
                    // Fall back to client-side cookie check
                    const userData = ClientCookies.getUserData();

                    console.log('AuthContext - Initializing auth, userData:', userData);

                    if (userData) {
                        // Determine user type based on role
                        const userType = userData.role === 'RECRUITER' ? 'company' : 'developer';

                        console.log(
                            'AuthContext - User found, role:',
                            userData.role,
                            'userType:',
                            userType,
                        );

                        setAuthState({
                            user: userData,
                            isAuthenticated: true,
                            isLoading: false,
                            userType,
                            notificationCount: 0, // You can fetch this from API if needed
                        });
                    } else {
                        console.log('AuthContext - No user data found');
                        setAuthState((prev) => ({ ...prev, isLoading: false }));
                    }
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                clearUser();
            }
        };

        initializeAuth();
    }, [checkServerAuth]);

    // Auto-refresh session
    useEffect(() => {
        if (!authState.isAuthenticated) return;

        const refreshInterval = setInterval(
            async () => {
                const success = await refreshSession();
                if (!success) {
                    setShowSessionExpiryModal(true);
                }
            },
            14 * 60 * 1000,
        ); // Refresh every 14 minutes

        return () => clearInterval(refreshInterval);
    }, [authState.isAuthenticated]);

    // Login function
    const login = useCallback(
        async (
            email: string,
            password: string,
            rememberMe: boolean,
            userType: 'developer' | 'company',
        ): Promise<{ success: boolean; error?: string }> => {
            try {
                setAuthState((prev) => ({ ...prev, isLoading: true }));

                // Determine API endpoint based on user type
                const endpoint =
                    userType === 'company'
                        ? '/api/auth/company/login'
                        : '/api/v1/auth/developer/login';

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        rememberMe,
                    }),
                    credentials: 'include',
                });

                const result = await response.json();

                if (!response.ok) {
                    const errorMessage = result.error || result.message || 'Login failed';
                    return { success: false, error: errorMessage };
                }

                if (result.success && result.data) {
                    const userData = result.data.user;

                    console.log('AuthContext - Login successful, userData:', userData);

                    // Store user data in client-side cookie
                    ClientCookies.setUserData(userData);

                    // Update auth state
                    setAuthState({
                        user: userData,
                        isAuthenticated: true,
                        isLoading: false,
                        userType: userData.role === 'RECRUITER' ? 'company' : 'developer',
                        notificationCount: 0,
                    });

                    console.log('AuthContext - Auth state updated, isAuthenticated: true');

                    // Don't redirect here - let the login forms handle redirects
                    return { success: true };
                } else {
                    return { success: false, error: 'Login failed' };
                }
            } catch (error) {
                console.error('Login error:', error);
                return { success: false, error: 'Network error. Please try again.' };
            } finally {
                setAuthState((prev) => ({ ...prev, isLoading: false }));
            }
        },
        [],
    );

    // Logout function
    const logout = useCallback(async (): Promise<void> => {
        try {
            // Call logout API
            await fetch('/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            clearUser();
            router.push('/');
        }
    }, [router]);

    // Refresh session
    const refreshSession = useCallback(async (): Promise<boolean> => {
        try {
            const response = await fetch('/api/v1/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.json();

                if (result.success && result.data) {
                    const userData = result.data.user;

                    // Update client-side user cookie
                    ClientCookies.setUserData(userData);

                    // Update auth state
                    const userType = userData.role === 'RECRUITER' ? 'company' : 'developer';
                    setAuthState((prev) => ({
                        ...prev,
                        user: userData,
                        userType,
                    }));

                    return true;
                }
            }

            return false;
        } catch (error) {
            console.error('Error refreshing session:', error);
            return false;
        }
    }, []);

    // Clear user data
    const clearUser = useCallback(() => {
        setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            userType: null,
            notificationCount: 0,
        });
        ClientCookies.clearUserData();
    }, []);

    const contextValue: AuthContextType = {
        ...authState,
        login,
        logout,
        refreshSession,
        clearUser,
        showSessionExpiryModal,
        setShowSessionExpiryModal,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// Hook to use auth context
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
