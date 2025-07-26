import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClientCookies } from '@/lib/utils/cookies';
import type { DeveloperLoginForm } from '@/lib/validations';
import type { ApiResponse } from '@/types/api/api';

interface LoginResponse {
    user: any;
    accessToken: string;
    refreshToken: string;
    rememberMe: boolean;
}

interface UseDeveloperLoginReturn {
    login: (data: DeveloperLoginForm) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    success: boolean;
    clearError: () => void;
    clearSuccess: () => void;
}

export function useDeveloperLogin(): UseDeveloperLoginReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const login = async (data: DeveloperLoginForm): Promise<void> => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/v1/auth/developer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result: ApiResponse<LoginResponse> = await response.json();

            if (!response.ok) {
                if (result.errors) {
                    // Handle validation errors
                    const errorMessages = Object.values(result.errors).flat();
                    setError(errorMessages.join(', '));
                } else if (result.error) {
                    setError(result.error);
                } else {
                    setError(result.message || 'Login failed');
                }
                return;
            }

            if (result.success && result.data) {
                // Store user data in client-side cookie (non-sensitive info)
                ClientCookies.setUserData(result.data.user);

                setSuccess(true);

                // Redirect to home page after successful login
                setTimeout(() => {
                    router.push('/');
                }, 1500);
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError(null);
    const clearSuccess = () => setSuccess(false);

    return {
        login,
        isLoading,
        error,
        success,
        clearError,
        clearSuccess,
    };
}
