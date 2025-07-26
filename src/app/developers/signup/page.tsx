'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Shield, Trophy, User, Users, Zap } from 'lucide-react';
import { FormField } from '@/components/client/common/form-field';
import { LoadingButton } from '@/components/client/common/loading-button';
import { PasswordInput } from '@/components/client/common/password-input';
import { SocialLogin } from '@/components/client/common/social-login';
import { AuthBackground } from '@/components/client/layout/auth-background';
import { AuthCard } from '@/components/client/layout/auth-card';
import { AuthHeader } from '@/components/client/layout/auth-header';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SuccessNotification } from '@/components/ui/success-notification';
import { useAuth } from '@/context/AuthContext';
import { useDeveloperRegistration } from '@/hooks/client/use-developer-registration';
import { useFormValidation } from '@/hooks/form/use-form-validation';
import { developerSignupSchema, type DeveloperSignupForm } from '@/lib/validations';

export default function DeveloperSignup() {
    const [formData, setFormData] = useState<DeveloperSignupForm>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        subscribeNewsletter: false,
    });

    const { errors, validate, validateField, clearErrors } =
        useFormValidation(developerSignupSchema);
    const { register, isLoading, error, success, clearError, clearSuccess } =
        useDeveloperRegistration();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [hasRedirected, setHasRedirected] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        console.log(
            'Developer Signup - isAuthenticated:',
            isAuthenticated,
            'hasRedirected:',
            hasRedirected,
            'authLoading:',
            authLoading,
        );

        if (isAuthenticated && !hasRedirected && !authLoading) {
            setHasRedirected(true);

            console.log('Developer Signup - Redirecting authenticated user to dashboard');

            // Use setTimeout to ensure state updates are processed
            setTimeout(() => {
                router.replace('/for-developer/dashboard');
            }, 100);
        }
    }, [isAuthenticated, hasRedirected, authLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear any existing API errors
        if (error) {
            clearError();
        }

        // Log form data for debugging
        console.log('Form data:', formData);

        // Validate the entire form
        if (!validate(formData)) {
            console.log('Validation errors:', errors);
            // If validation fails, don't proceed
            return;
        }

        console.log('Validation passed, proceeding with registration');
        await register(formData);
    };

    const handleFieldChange = (field: keyof DeveloperSignupForm, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);

        // Clear API errors when user starts typing
        if (error) {
            clearError();
        }

        // Clear field error immediately when user starts typing
        if (errors[field]) {
            // Clear all errors and re-validate to remove the specific field error
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

    // Auto-hide success notification after 5 seconds
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                clearSuccess();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, clearSuccess]);

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
        {
            icon: Trophy,
            text: 'Global leaderboards',
            description: 'Compete with developers worldwide',
        },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <SuccessNotification
                message="Account created successfully! Redirecting to home page..."
                isVisible={success}
                onClose={clearSuccess}
            />
            <AuthBackground variant="developer" />

            <AuthHeader
                rightContent={
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <span className="hidden text-sm text-gray-600 sm:inline">
                            Already have an account?
                        </span>
                        <span className="text-sm text-gray-600 sm:hidden">Have an account?</span>
                        <Link
                            href="/developers/login"
                            className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                            Sign in
                        </Link>
                    </div>
                }
            />

            <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
                <div className="mx-auto grid w-full max-w-5xl items-center gap-2 lg:grid-cols-2 lg:gap-4">
                    {/* Left Side - Welcome Message */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:block"
                    >
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl leading-tight font-bold text-gray-900 xl:text-5xl">
                                    Start your
                                    <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                        coding journey
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Join millions of developers worldwide.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-center space-x-3"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-100 to-teal-100">
                                            <feature.icon className="h-4 w-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {feature.text}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="rounded-lg border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
                                <p className="text-sm text-emerald-600">
                                    🎉 Get premium features free for your first month!
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Signup Form */}
                    <AuthCard
                        title="Create Account"
                        subtitle="Join our developer community"
                        delay={0.2}
                        className="mx-auto w-full max-w-4xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FormField
                                label="Full Name"
                                htmlFor="fullName"
                                error={errors.fullName}
                                required
                            >
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={(e) =>
                                            handleFieldChange('fullName', e.target.value)
                                        }
                                        className="border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                                        required
                                    />
                                </div>
                            </FormField>

                            <FormField label="Email" htmlFor="email" error={errors.email} required>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => handleFieldChange('email', e.target.value)}
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
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={(value) => handleFieldChange('password', value)}
                                    error={!!errors.password}
                                    required
                                />
                            </FormField>

                            <FormField
                                label="Confirm Password"
                                htmlFor="confirmPassword"
                                error={errors.confirmPassword}
                                required
                            >
                                <PasswordInput
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={(value) =>
                                        handleFieldChange('confirmPassword', value)
                                    }
                                    error={!!errors.confirmPassword}
                                    required
                                />
                            </FormField>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Checkbox
                                        id="terms"
                                        checked={formData.agreeToTerms}
                                        onCheckedChange={(checked) =>
                                            handleFieldChange('agreeToTerms', checked)
                                        }
                                        className="mt-1 border-gray-300 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
                                        required
                                    />
                                    <p className="max-w-md text-sm text-gray-700">
                                        I agree to the{' '}
                                        <Link
                                            href="#"
                                            className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
                                        >
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            href="#"
                                            className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </p>
                                </div>

                                {errors.agreeToTerms && (
                                    <p className="animate-fade-in text-sm text-red-600">
                                        {errors.agreeToTerms}
                                    </p>
                                )}

                                <div className="flex items-start space-x-3">
                                    <Checkbox
                                        id="newsletter"
                                        checked={formData.subscribeNewsletter}
                                        onCheckedChange={(checked) =>
                                            handleFieldChange('subscribeNewsletter', checked)
                                        }
                                        className="mt-0.5 border-gray-300 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
                                    />
                                    <Label
                                        htmlFor="newsletter"
                                        className="text-sm leading-relaxed text-gray-700"
                                    >
                                        Subscribe to our newsletter for coding tips and updates
                                    </Label>
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <LoadingButton
                                type="submit"
                                isLoading={isLoading}
                                loadingText="Creating account..."
                                disabled={!formData.agreeToTerms}
                                className="w-full min-w-full transform bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-emerald-700 hover:to-teal-700"
                            >
                                Create Account
                            </LoadingButton>
                        </form>

                        <div className="mt-6">
                            <SocialLogin disabled={isLoading} />
                        </div>
                    </AuthCard>
                </div>
            </div>
        </div>
    );
}
