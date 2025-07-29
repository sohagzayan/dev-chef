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
    googleLogin: (
        userType: 'developer' | 'company',
    ) => Promise<{ success: boolean; error?: string }>;
    handlePopupLoginSuccess: (userData: any) => Promise<void>;
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
                // Check for Google login callback
                const urlParams = new URLSearchParams(window.location.search);
                const googleLoginSuccess = urlParams.get('googleLogin');
                const success = urlParams.get('success');

                if (googleLoginSuccess === 'true' && success === 'true') {
                    console.log('Google login callback detected, fetching user data...');

                    // Get user data using the access token from cookies
                    try {
                        const response = await fetch('/api/v1/auth/me', {
                            credentials: 'include',
                        });

                        if (response.ok) {
                            const result = await response.json();
                            if (result.success && result.data) {
                                const userData = result.data.user;

                                console.log('Google login successful, user data:', userData);

                                // Store user data in client-side cookie
                                ClientCookies.setUserData(userData);

                                // Update auth state
                                const userType =
                                    userData.role === 'RECRUITER' ? 'company' : 'developer';
                                setAuthState({
                                    user: userData,
                                    isAuthenticated: true,
                                    isLoading: false,
                                    userType,
                                    notificationCount: 0,
                                });

                                // Clean up URL parameters
                                window.history.replaceState(
                                    {},
                                    document.title,
                                    window.location.pathname,
                                );

                                // Redirect based on user type
                                const targetPath =
                                    userType === 'company' ? '/companies/dashboard' : '/';
                                router.replace(targetPath);

                                return;
                            }
                        } else {
                            console.error('Failed to get user data after Google login');
                        }
                    } catch (error) {
                        console.error('Error fetching user data after Google login:', error);
                    }
                }

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
    }, [checkServerAuth, router]);

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

    // Google login function - now returns a promise that resolves when popup is opened
    const googleLogin = useCallback(
        async (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _userType: 'developer' | 'company',
        ): Promise<{ success: boolean; error?: string }> => {
            return new Promise((resolve) => {
                // This function now just returns success immediately
                // The actual login will be handled by the popup component
                resolve({ success: true });
            });
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
            console.log('Refreshing session...');
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

                    console.log('Session refreshed successfully:', userData);

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

            console.log('Session refresh failed');
            return false;
        } catch (error) {
            console.error('Error refreshing session:', error);
            return false;
        }
    }, []);

    // Handle popup login success
    const handlePopupLoginSuccess = useCallback(async (userData: any) => {
        try {
            setAuthState((prev) => ({ ...prev, isLoading: true }));

            // Store user data in client-side cookie
            ClientCookies.setUserData(userData.user);

            // Update auth state
            setAuthState({
                user: userData.user,
                isAuthenticated: true,
                isLoading: false,
                userType: userData.user.role === 'RECRUITER' ? 'company' : 'developer',
                notificationCount: 0,
            });

            // Store access token in localStorage for API calls
            if (userData.accessToken) {
                localStorage.setItem('accessToken', userData.accessToken);
            }

            console.log('Popup login successful:', userData.user);
        } catch (error) {
            console.error('Error handling popup login success:', error);
            setAuthState((prev) => ({ ...prev, isLoading: false }));
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
        googleLogin,
        handlePopupLoginSuccess,
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
