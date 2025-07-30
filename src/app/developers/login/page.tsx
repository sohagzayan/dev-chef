'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Mail, Shield, Users } from 'lucide-react';
import { FormField } from '@/components/client/common/form-field';
import { GitHubLoginPopup } from '@/components/client/common/GitHubLoginPopup';
import { GoogleLoginPopup } from '@/components/client/common/GoogleLoginPopup';
import { LoadingButton } from '@/components/client/common/loading-button';
import { PasswordInput } from '@/components/client/common/password-input';
import { SocialLogin } from '@/components/client/common/social-login';
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
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></div>
                    <p className="font-medium text-slate-600">Redirecting to dashboard...</p>
                </motion.div>
            </div>
        );
    }

    const features = [
        {
            icon: Code,
            text: '1000+ Coding Challenges',
            description: 'Practice with real-world problems',
        },
        {
            icon: Shield,
            text: 'Real-time Code Execution',
            description: 'Test your solutions instantly',
        },
        {
            icon: Users,
            text: 'Interview Preparation',
            description: 'Ace your technical interviews',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <SuccessNotification
                message="Login successful! Redirecting..."
                isVisible={success}
                onClose={() => setSuccess(false)}
            />
            <AuthHeader />

            <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2">
                    {/* Left Side - Welcome Message */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="hidden lg:block"
                    >
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700"
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Join 100,000+ developers
                                    </motion.div>

                                    <h1 className="text-4xl leading-tight font-bold text-slate-900 sm:text-5xl lg:text-6xl">
                                        Ready to
                                        <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                            level up?
                                        </span>
                                    </h1>

                                    <p className="max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl">
                                        Master coding challenges, prepare for interviews, and
                                        showcase your skills to the world.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-6"
                            >
                                <h3 className="text-lg font-semibold text-slate-800">
                                    What you&apos;ll get:
                                </h3>
                                <div className="space-y-3">
                                    {features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className="flex items-center space-x-3"
                                        >
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                                                <feature.icon className="h-4 w-4 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">
                                                    {feature.text}
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Login Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 60, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className="flex justify-center lg:justify-start"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="w-full max-w-md"
                        >
                            <div className="rounded-2xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-200/50 backdrop-blur-sm">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="mb-8 text-center"
                                >
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Welcome Back!
                                    </h2>
                                    <p className="mt-2 text-slate-600">
                                        Continue your coding journey
                                    </p>
                                </motion.div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.8 }}
                                    >
                                        <FormField
                                            label="Email or Username"
                                            htmlFor="email"
                                            error={errors.email}
                                            required
                                        >
                                            <div className="relative">
                                                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                                                <Input
                                                    id="email"
                                                    type="text"
                                                    placeholder="Enter your email or username"
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        handleFieldChange('email', e.target.value)
                                                    }
                                                    className="border-slate-300 bg-white/50 pl-10 text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
                                                    required
                                                />
                                            </div>
                                        </FormField>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.9 }}
                                    >
                                        <FormField
                                            label="Password"
                                            htmlFor="password"
                                            error={errors.password}
                                            required
                                        >
                                            <PasswordInput
                                                id="password"
                                                value={formData.password}
                                                onChange={(value) =>
                                                    handleFieldChange('password', value)
                                                }
                                                error={!!errors.password}
                                                required
                                            />
                                        </FormField>
                                    </motion.div>

                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                className="rounded-lg border border-red-200 bg-red-50 p-4"
                                            >
                                                <p className="text-sm text-red-600">{error}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1.0 }}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="remember"
                                                checked={formData.rememberMe}
                                                onCheckedChange={(checked) =>
                                                    handleFieldChange('rememberMe', checked)
                                                }
                                                className="border-slate-300 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
                                            />
                                            <Label
                                                htmlFor="remember"
                                                className="text-sm font-medium text-slate-700"
                                            >
                                                Remember me
                                            </Label>
                                        </div>
                                        <Link
                                            href="/developers/forgot-password"
                                            className="text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1.1 }}
                                    >
                                        <LoadingButton
                                            type="submit"
                                            isLoading={isLoading}
                                            loadingText="Signing in..."
                                            className="group w-full transform bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                                        >
                                            <span className="flex items-center justify-center">
                                                Start Coding
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </LoadingButton>
                                    </motion.div>
                                </form>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                >
                                    <SocialLogin
                                        onGoogleLogin={handleGoogleLogin}
                                        onGithubLogin={handleGitHubLogin}
                                        disabled={isLoading}
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.3 }}
                                    className="pt-6 text-center"
                                >
                                    <p className="text-slate-600">
                                        Don&apos;t have an account?{' '}
                                        <Link
                                            href="/developers/signup"
                                            className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
                                        >
                                            Sign up for free
                                        </Link>
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
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
