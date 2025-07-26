'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, Mail, X } from 'lucide-react';
import { FormField } from '@/components/client/common/form-field';
import { LoadingButton } from '@/components/client/common/loading-button';
import { PasswordInput } from '@/components/client/common/password-input';
import { SocialLogin } from '@/components/client/common/social-login';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useFormValidation } from '@/hooks/form/use-form-validation';
import { useUI } from '@/hooks/redux/useUI';
import { companyLoginSchema, type CompanyLoginForm } from '@/lib/validations';

export function LoginForm() {
    const [formData, setFormData] = useState<CompanyLoginForm>({
        email: '',
        password: '',
        rememberMe: false,
    });

    const { errors, validate, validateField } = useFormValidation(companyLoginSchema);
    const { login, isAuthenticated, isLoading } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { showNotification } = useUI();
    const [error, setError] = useState<string | null>(null);
    const [hasRedirected, setHasRedirected] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        console.log(
            'Company Login - isAuthenticated:',
            isAuthenticated,
            'hasRedirected:',
            hasRedirected,
            'isLoading:',
            isLoading,
        );

        if (isAuthenticated && !hasRedirected && !isLoading) {
            setHasRedirected(true);

            // Get redirect URL from search params
            const redirectUrl = searchParams.get('redirect') || searchParams.get('callbackUrl');

            // Determine where to redirect based on user role and redirect parameter
            let targetPath = '/';

            if (redirectUrl && redirectUrl.startsWith('/companies/')) {
                targetPath = redirectUrl;
            }

            console.log('Company Login - Redirecting authenticated user to:', targetPath);

            // Use setTimeout to ensure state updates are processed
            setTimeout(() => {
                router.replace(targetPath);
            }, 100);
        }
    }, [isAuthenticated, hasRedirected, isLoading, searchParams, router]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Clear any existing errors
        setError(null);

        if (!validate(formData)) return;

        const result = await login(
            formData.email,
            formData.password,
            formData.rememberMe || false,
            'company',
        );

        console.log('Company Login - Login result:', result);

        if (result.success) {
            // Show success notification
            showNotification({
                type: 'success',
                title: 'Login Successful',
                message: 'Welcome back! Redirecting to your dashboard...',
                duration: 3000,
            });

            // Handle redirect after successful login
            const redirectUrl = searchParams.get('redirect') || searchParams.get('callbackUrl');
            const targetPath =
                redirectUrl && redirectUrl.startsWith('/companies/') ? redirectUrl : '/';

            console.log('Company Login - Redirecting after successful login to:', targetPath);

            // Use setTimeout to allow the notification to show briefly
            setTimeout(() => {
                router.replace(targetPath);
            }, 1000);
        } else {
            // Handle different types of errors
            if (result.error?.includes('Invalid credentials')) {
                setError('Invalid email or password. Please try again.');
            } else if (result.error?.includes('Access denied')) {
                setError('Access denied. This login is only for company recruiters.');
            } else if (result.error?.includes('Too many requests')) {
                setError('Too many login attempts. Please try again later.');
            } else if (result.error?.includes('Account is deactivated')) {
                setError('Your account has been deactivated. Please contact support.');
            } else {
                setError(result.error || 'Login failed. Please try again.');
            }
        }
    };

    // Handle input changes
    const handleInputChange = (field: keyof CompanyLoginForm, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        validateField(field, value, formData);
        setError(null);
    };

    // Handle field blur
    const handleFieldBlur = (field: keyof CompanyLoginForm) => {
        validateField(field, formData[field], formData);
    };

    // If already authenticated and redirecting, show loading
    if (isAuthenticated && !hasRedirected) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-600"></div>
                    <p className="text-gray-600">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Display */}
            {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                    <button
                        type="button"
                        onClick={() => setError(null)}
                        className="ml-auto text-red-500 hover:text-red-700"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Email Field */}
            <FormField label="Email Address" htmlFor="email" error={errors.email} required>
                <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onBlur={() => handleFieldBlur('email')}
                        className="pl-10"
                        disabled={isLoading}
                    />
                </div>
            </FormField>

            {/* Password Field */}
            <FormField label="Password" htmlFor="password" error={errors.password} required>
                <PasswordInput
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(value) => handleInputChange('password', value)}
                />
            </FormField>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                            handleInputChange('rememberMe', checked as boolean)
                        }
                        disabled={isLoading}
                    />
                    <Label
                        htmlFor="rememberMe"
                        className="cursor-pointer text-sm font-medium text-gray-700"
                    >
                        Remember me
                    </Label>
                </div>
                <Link
                    href="/companies/forgot-password"
                    className="text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700"
                >
                    Forgot password?
                </Link>
            </div>

            {/* Submit Button */}
            <LoadingButton
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full"
            >
                Sign In
            </LoadingButton>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
            </div>

            {/* Social Login */}
            <SocialLogin disabled={isLoading} />

            {/* Sign Up Link */}
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/companies/trial"
                        className="font-medium text-emerald-600 transition-colors hover:text-emerald-700"
                    >
                        Start your free trial
                    </Link>
                </p>
            </div>
        </form>
    );
}
