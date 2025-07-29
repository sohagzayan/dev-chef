'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Shield, Users, Zap } from 'lucide-react';
import { FormField } from '@/components/client/common/form-field';
import { GitHubLoginPopup } from '@/components/client/common/GitHubLoginPopup';
import { GoogleLoginPopup } from '@/components/client/common/GoogleLoginPopup';
import { LoadingButton } from '@/components/client/common/loading-button';
import { PasswordInput } from '@/components/client/common/password-input';
import { SocialLogin } from '@/components/client/common/social-login';
import { AuthCard } from '@/components/client/layout/auth-card';
import { AuthHeader } from '@/components/client/layout/auth-header';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SuccessNotification } from '@/components/ui/success-notification';
import { useAuth } from '@/context/AuthContext';
import { useFormValidation } from '@/hooks/form/use-form-validation';
import { developerLoginSchema, type DeveloperLoginForm } from '@/lib/validations';

export default function DeveloperLogin() {
    const [formData, setFormData] = useState<DeveloperLoginForm>({
        email: '',
        password: '',
        rememberMe: false,
    });

    const { errors, validate, validateField, clearErrors } =
        useFormValidation(developerLoginSchema);
    const { login, handlePopupLoginSuccess, isAuthenticated, isLoading } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [hasRedirected, setHasRedirected] = useState(false);
    const [showGooglePopup, setShowGooglePopup] = useState(false);
    const [showGitHubPopup, setShowGitHubPopup] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        console.log(
            'Developer Login - isAuthenticated:',
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

            if (redirectUrl && !redirectUrl.startsWith('/companies/')) {
                targetPath = redirectUrl;
            }

            console.log('Developer Login - Redirecting authenticated user to:', targetPath);

            // Use setTimeout to ensure state updates are processed
            setTimeout(() => {
                router.replace(targetPath);
            }, 100);
        }
    }, [isAuthenticated, hasRedirected, isLoading, searchParams, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear any existing errors
        setError(null);

        // Log form data for debugging
        console.log('Login form data:', formData);

        // Validate the entire form
        if (!validate(formData)) {
            console.log('Validation errors:', errors);
            return;
        }

        console.log('Validation passed, proceeding with login');

        const result = await login(
            formData.email,
            formData.password,
            formData.rememberMe || false,
            'developer',
        );

        if (result.success) {
            setSuccess(true);

            // Handle redirect after successful login
            const redirectUrl = searchParams.get('redirect') || searchParams.get('callbackUrl');
            const targetPath =
                redirectUrl && !redirectUrl.startsWith('/companies/') ? redirectUrl : '/';

            console.log('Developer Login - Redirecting after successful login to:', targetPath);

            // Use setTimeout to allow the success notification to show briefly
            setTimeout(() => {
                router.replace(targetPath);
            }, 1500);
        } else {
            setError(result.error || 'Login failed');
        }
    };

    const handleFieldChange = (field: keyof DeveloperLoginForm, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);

        // Clear errors when user starts typing
        if (error) {
            setError(null);
        }

        // Clear field error immediately when user starts typing
        if (errors[field]) {
            clearErrors();
        }

        // Validate field after a short delay to avoid too frequent validation
        setTimeout(() => {
            // Only validate if the field has a value
            if (value && value.toString().trim() !== '') {
                validateField(field, value, newData);
            }
        }, 300);
    };

    const handleGoogleLogin = async () => {
        setError(null);
        setShowGooglePopup(true);
    };

    const handleGoogleLoginSuccess = async (userData: any) => {
        try {
            await handlePopupLoginSuccess(userData);
            setSuccess(true);

            // Handle redirect after successful login
            const redirectUrl = searchParams.get('redirect') || searchParams.get('callbackUrl');
            const targetPath =
                redirectUrl && !redirectUrl.startsWith('/companies/') ? redirectUrl : '/';

            console.log(
                'Developer Login - Redirecting after successful Google login to:',
                targetPath,
            );

            // Use setTimeout to allow the notification to show briefly
            setTimeout(() => {
                router.replace(targetPath);
            }, 300);
        } catch {
            setError('Failed to complete Google login. Please try again.');
        }
    };

    const handleGoogleLoginError = (errorMessage: string) => {
        setError(errorMessage);
    };

    const handleGitHubLogin = async () => {
        setError(null);
        setShowGitHubPopup(true);
    };

    const handleGitHubLoginSuccess = async (userData: any) => {
        try {
            await handlePopupLoginSuccess(userData);
            setSuccess(true);

            // Handle redirect after successful login
            const redirectUrl = searchParams.get('redirect') || searchParams.get('callbackUrl');
            const targetPath =
                redirectUrl && !redirectUrl.startsWith('/companies/') ? redirectUrl : '/';

            console.log(
                'Developer Login - Redirecting after successful GitHub login to:',
                targetPath,
            );

            // Use setTimeout to allow the notification to show briefly
            setTimeout(() => {
                router.replace(targetPath);
            }, 300);
        } catch {
            setError('Failed to complete GitHub login. Please try again.');
        }
    };

    const handleGitHubLoginError = (errorMessage: string) => {
        setError(errorMessage);
    };

    // Auto-hide success notification after 5 seconds
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    // If already authenticated and redirecting, show loading
    if (isAuthenticated && !hasRedirected) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-600"></div>
                    <p className="text-gray-600">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    const features = [
        {
            icon: Zap,
            text: '1000+ coding challenges',
            description: 'Practice with real-world problems',
        },
        {
            icon: Shield,
            text: 'Real-time code execution',
            description: 'Test your solutions instantly',
        },
        {
            icon: Users,
            text: 'Interview preparation',
            description: 'Ace your technical interviews',
        },
    ];

    return (
        <div className="min-h-screen bg-white pb-0">
            <SuccessNotification
                message="Login successful! Redirecting..."
                isVisible={success}
                onClose={() => setSuccess(false)}
            />
            <AuthHeader />

            <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid w-full max-w-5xl items-center gap-2 border-0 shadow-none lg:grid-cols-2 lg:gap-4">
                    {/* Left Side - Welcome Message */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="hidden lg:block"
                    >
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h1 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl">
                                    Ready to
                                    <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                        level up?
                                    </span>
                                </h1>
                                <p className="max-w-lg text-lg leading-relaxed text-gray-600 sm:text-xl">
                                    Join millions of developers worldwide. Practice coding
                                    challenges, prepare for interviews, and showcase your skills.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    What you&apos;ll get:
                                </h3>
                                <div className="space-y-4">
                                    {features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex items-start space-x-4"
                                        >
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100">
                                                <feature.icon className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-semibold text-gray-900">
                                                    {feature.text}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Login Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className="flex justify-center lg:justify-start"
                    >
                        <AuthCard
                            title="Welcome Back!"
                            subtitle="Continue your coding journey"
                            delay={0.2}
                            className="w-full max-w-md"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <FormField
                                    label="Email or Username"
                                    htmlFor="email"
                                    error={errors.email}
                                    required
                                >
                                    <div className="relative">
                                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        <Input
                                            id="email"
                                            type="text"
                                            placeholder="Enter your email or username"
                                            value={formData.email}
                                            onChange={(e) =>
                                                handleFieldChange('email', e.target.value)
                                            }
                                            className="border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                                            required
                                        />
                                    </div>
                                </FormField>

                                <FormField
                                    label="Password"
                                    htmlFor="password"
                                    error={errors.password}
                                    required
                                >
                                    <PasswordInput
                                        id="password"
                                        value={formData.password}
                                        onChange={(value) => handleFieldChange('password', value)}
                                        error={!!errors.password}
                                        required
                                    />
                                </FormField>

                                {error && (
                                    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                        <p className="text-sm text-red-600">{error}</p>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            checked={formData.rememberMe}
                                            onCheckedChange={(checked) =>
                                                handleFieldChange('rememberMe', checked)
                                            }
                                            className="border-gray-300 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
                                        />
                                        <Label
                                            htmlFor="remember"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Remember me
                                        </Label>
                                    </div>
                                    <Link
                                        href="/developers/forgot-password"
                                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <LoadingButton
                                    type="submit"
                                    isLoading={isLoading}
                                    loadingText="Signing in..."
                                    className="w-full transform bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-emerald-700 hover:to-teal-700"
                                >
                                    Start Coding
                                </LoadingButton>
                            </form>

                            <SocialLogin
                                onGoogleLogin={handleGoogleLogin}
                                onGithubLogin={handleGitHubLogin}
                                disabled={isLoading}
                            />

                            <div className="pt-6 text-center">
                                <p className="text-gray-600">
                                    Don&apos;t have an account?{' '}
                                    <Link
                                        href="/developers/signup"
                                        className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                                    >
                                        Sign up for free
                                    </Link>
                                </p>
                            </div>
                        </AuthCard>
                    </motion.div>
                </div>
            </div>

            {/* Google Login Popup */}
            <GoogleLoginPopup
                isOpen={showGooglePopup}
                onClose={() => setShowGooglePopup(false)}
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                userType="developer"
            />

            {/* GitHub Login Popup */}
            <GitHubLoginPopup
                isOpen={showGitHubPopup}
                onClose={() => setShowGitHubPopup(false)}
                onSuccess={handleGitHubLoginSuccess}
                onError={handleGitHubLoginError}
                userType="developer"
            />
        </div>
    );
}
