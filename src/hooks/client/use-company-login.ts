import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CompanyLoginForm } from '@/lib/validations';

interface LoginResponse {
    success: boolean;
    data?: {
        user: any;
        accessToken: string;
    };
    message?: string;
    error?: string;
    errors?: Record<string, string[]>;
}

// Error message mapping for better user experience
const ERROR_MESSAGES = {
    'Invalid credentials': 'The email or password you entered is incorrect. Please try again.',
    'Account is deactivated':
        'Your account has been deactivated. Please contact support for assistance.',
    'Access denied. Company login is for recruiters only.':
        "This login is only for company recruiters. If you're a developer, please use the developer login.",
    'Too many requests': 'Too many login attempts. Please wait a few minutes before trying again.',
    'User not found or inactive':
        'Account not found or inactive. Please check your credentials or contact support.',
    'Refresh token not found': 'Session expired. Please log in again.',
    'Invalid refresh token': 'Session expired. Please log in again.',
    'Refresh token expired or revoked': 'Session expired. Please log in again.',
    'Network error': 'Connection error. Please check your internet connection and try again.',
    'Validation failed': 'Please check your input and try again.',
    'Internal server error': 'Something went wrong on our end. Please try again later.',
} as const;

export function useCompanyLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const router = useRouter();

    const getErrorMessage = (errorKey: string): string => {
        return ERROR_MESSAGES[errorKey as keyof typeof ERROR_MESSAGES] || errorKey;
    };

    const login = async (formData: CompanyLoginForm): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        setErrors({});

        try {
            const response = await fetch('/api/auth/company/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result: LoginResponse = await response.json();

            if (!response.ok) {
                // Handle different HTTP status codes
                switch (response.status) {
                    case 400:
                        if (result.errors) {
                            setErrors(result.errors);
                        } else if (result.error) {
                            setError(getErrorMessage(result.error));
                        } else {
                            setError('Please check your input and try again.');
                        }
                        break;

                    case 401:
                        if (result.error) {
                            setError(getErrorMessage(result.error));
                        } else {
                            setError('Invalid email or password. Please try again.');
                        }
                        break;

                    case 403:
                        setError('Access denied. This login is only for company recruiters.');
                        break;

                    case 429:
                        setError(
                            'Too many login attempts. Please wait a few minutes before trying again.',
                        );
                        break;

                    case 500:
                        setError('Something went wrong on our end. Please try again later.');
                        break;

                    default:
                        if (result.error) {
                            setError(getErrorMessage(result.error));
                        } else {
                            setError('Login failed. Please try again.');
                        }
                }
                return false;
            }

            if (result.success && result.data) {
                // Store user data in localStorage for client-side access
                localStorage.setItem('user', JSON.stringify(result.data.user));

                // Redirect to company dashboard
                router.push('/companies/dashboard');
                return true;
            } else {
                setError(
                    result.error
                        ? getErrorMessage(result.error)
                        : 'Login failed. Please try again.',
                );
                return false;
            }
        } catch (err) {
            console.error('Login error:', err);

            // Handle specific network errors
            if (err instanceof TypeError && err.message.includes('fetch')) {
                setError('Network error. Please check your internet connection and try again.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const clearErrors = () => {
        setError(null);
        setErrors({});
    };

    return {
        login,
        isLoading,
        error,
        errors,
        clearErrors,
    };
}
