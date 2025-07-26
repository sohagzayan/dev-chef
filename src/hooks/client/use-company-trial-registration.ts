import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClientCookies } from '@/lib/utils/cookies';
import type { CompanyTrialForm } from '@/lib/validations';
import type { ApiResponse } from '@/types/api/api';

interface RegistrationResponse {
    user: any;
    accessToken: string;
    refreshToken: string;
}

interface UseCompanyTrialRegistrationReturn {
    register: (data: CompanyTrialForm) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    success: boolean;
    clearError: () => void;
    clearSuccess: () => void;
}

export function useCompanyTrialRegistration(): UseCompanyTrialRegistrationReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const register = async (data: CompanyTrialForm): Promise<void> => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Transform the trial form data to match the registration API format
            const registrationData = {
                email: data.workEmail,
                password: data.password, // Use the actual password from form
                role: 'RECRUITER' as const,
                profile: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    companyName: data.companyName,
                    jobTitle: data.jobTitle,
                    // Add company size to profile if needed
                },
            };

            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            const result: ApiResponse<RegistrationResponse> = await response.json();

            if (!response.ok) {
                if (result.errors) {
                    // Handle validation errors
                    const errorMessages = Object.values(result.errors).flat();
                    setError(errorMessages.join(', '));
                } else if (result.error) {
                    setError(result.error);
                } else {
                    setError(result.message || 'Registration failed');
                }
                return;
            }

            if (result.success && result.data) {
                // Store user data in client-side cookie (non-sensitive info)
                ClientCookies.setUserData(result.data.user);

                setSuccess(true);

                // Redirect to company login page after successful registration
                setTimeout(() => {
                    router.push('/companies/login');
                }, 1500);
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError(null);
    const clearSuccess = () => setSuccess(false);

    return {
        register,
        isLoading,
        error,
        success,
        clearError,
        clearSuccess,
    };
}
