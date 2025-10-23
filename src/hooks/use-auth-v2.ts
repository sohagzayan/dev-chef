'use client';

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import type { AuthenticatedUser, LoginRequest, RegisterRequest } from '@/types/api/api';

interface AuthContextType {
    user: AuthenticatedUser | null;
    accessToken: string | null;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthenticatedUser | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const verifyToken = useCallback(async (token: string) => {
        try {
            const response = await fetch('/api/v1/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setAccessToken(token);
                setLoading(false);
            } else {
                // Token is invalid, try to refresh
                refreshToken();
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            refreshToken();
        }
    }, []);

    const refreshToken = useCallback(async () => {
        try {
            const refreshTokenValue = localStorage.getItem('refreshToken');
            if (!refreshTokenValue) {
                setLoading(false);
                return;
            }

            const response = await fetch('/api/v1/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken: refreshTokenValue }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setAccessToken(data.accessToken);
                verifyToken(data.accessToken);
            } else {
                // Refresh failed, clear tokens and redirect to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setAccessToken(null);
                setUser(null);
                setLoading(false);
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setAccessToken(null);
            setUser(null);
            setLoading(false);
        }
    }, [verifyToken]);

    // Initialize auth state
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setAccessToken(token);
            verifyToken(token);
        } else {
            refreshToken();
        }
    }, [verifyToken, refreshToken]);

    const login = async (data: LoginRequest) => {
        try {
            setError(null);
            setLoading(true);

            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Login failed');
            }

            setUser(result.data.user);
            setAccessToken(result.data.accessToken);
            localStorage.setItem('accessToken', result.data.accessToken);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Login failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterRequest) => {
        try {
            setError(null);
            setLoading(true);

            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Registration failed');
            }

            setUser(result.data.user);
            setAccessToken(result.data.accessToken);
            localStorage.setItem('accessToken', result.data.accessToken);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Registration failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/v1/auth/logout', {
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}` },
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setAccessToken(null);
            localStorage.removeItem('accessToken');
        }
    };

    const contextValue: AuthContextType = {
        user,
        accessToken,
        login,
        register,
        logout,
        refreshToken,
        loading,
        error,
    };

    return React.createElement(AuthContext.Provider, { value: contextValue }, children);
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
