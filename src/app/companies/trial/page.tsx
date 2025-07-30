'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowRight,
    Briefcase,
    Building2,
    CheckCircle,
    Mail,
    Sparkles,
    User,
    Users,
} from 'lucide-react';
import { FormField } from '@/components/client/common/form-field';
import { LoadingButton } from '@/components/client/common/loading-button';
import { PasswordInput } from '@/components/client/common/password-input';
import { SocialLogin } from '@/components/client/common/social-login';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { SuccessNotification } from '@/components/ui/success-notification';
import { useAuth } from '@/context/AuthContext';
import { useCompanyTrialRegistration } from '@/hooks/client/use-company-trial-registration';
import { useFormValidation } from '@/hooks/form/use-form-validation';
import { companyTrialSchema, type CompanyTrialForm } from '@/lib/validations';

export default function CompanyTrial() {
    const [formData, setFormData] = useState<CompanyTrialForm>({
        firstName: '',
        lastName: '',
        workEmail: '',
        companyName: '',
        jobTitle: '',
        companySize: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const [mounted, setMounted] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);

    const { errors, validate, validateField, clearErrors } = useFormValidation(companyTrialSchema);
    const { register, isLoading, error, success, clearError, clearSuccess } =
        useCompanyTrialRegistration();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [hasRedirected, setHasRedirected] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setAnimateIn(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const AnimatedDiv = ({
        children,
        className,
        onHoverStart,
        onHoverEnd,
        delay = 0,
        animationType = 'fadeUp',
        ...props
    }: any) => {
        const getAnimationClasses = () => {
            switch (animationType) {
                case 'fadeUp':
                    return animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
                case 'fadeIn':
                    return animateIn ? 'opacity-100' : 'opacity-0';
                case 'scaleIn':
                    return animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
                case 'slideInLeft':
                    return animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8';
                case 'slideInRight':
                    return animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8';
                case 'bounceIn':
                    return animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-75';
                case 'slideUp':
                    return animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12';
                default:
                    return animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4';
            }
        };

        return (
            <div
                className={`${className || ''} transition-all duration-700 ease-out ${getAnimationClasses()}`}
                style={{ transitionDelay: `${delay}ms` }}
                onMouseEnter={mounted ? onHoverStart : undefined}
                onMouseLeave={mounted ? onHoverEnd : undefined}
                {...props}
            >
                {children}
            </div>
        );
    };

    // Redirect if already authenticated
    useEffect(() => {
        console.log(
            'Company Trial - isAuthenticated:',
            isAuthenticated,
            'hasRedirected:',
            hasRedirected,
            'authLoading:',
            authLoading,
        );

        if (isAuthenticated && !hasRedirected && !authLoading) {
            setHasRedirected(true);

            console.log('Company Trial - Redirecting authenticated user to dashboard');

            setTimeout(() => {
                router.replace('/companies/dashboard');
            }, 100);
        }
    }, [isAuthenticated, hasRedirected, authLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (error) {
            clearError();
        }

        console.log('Form data:', formData);

        if (!validate(formData)) {
            console.log('Validation errors:', errors);
            return;
        }

        console.log('Validation passed, proceeding with registration');
        await register(formData);
    };

    const handleFieldChange = (field: keyof CompanyTrialForm, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);

        if (error) {
            clearError();
        }

        if (errors[field]) {
            clearErrors();
        }

        setTimeout(() => {
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
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-green-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-green-600"></div>
                    <p className="text-gray-600">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    const keyFeatures = [
        '14-day free trial, no credit card required',
        'Access to complete skills assessment library',
        'Real-time candidate evaluation tools',
        'Advanced analytics and reporting',
        'Team collaboration features',
        'Priority customer support',
    ];

    const companySizes = [
        { value: '1-10', label: '1-10 employees' },
        { value: '11-50', label: '11-50 employees' },
        { value: '51-200', label: '51-200 employees' },
        { value: '201-1000', label: '201-1000 employees' },
        { value: '1000+', label: '1000+ employees' },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-green-50">
            <SuccessNotification
                message="Trial account created successfully! You can now log in with your email and password."
                isVisible={success}
                onClose={clearSuccess}
            />

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Subtle gradient overlay */}
                <AnimatedDiv
                    className="absolute inset-0 bg-gradient-to-br from-green-100/10 via-transparent to-emerald-100/10"
                    animationType="fadeIn"
                    delay={0}
                ></AnimatedDiv>

                {/* Animated floating elements */}
                <AnimatedDiv
                    className="absolute top-20 left-10 h-2 w-2 animate-pulse rounded-full bg-green-400 opacity-30"
                    animationType="bounceIn"
                    delay={500}
                ></AnimatedDiv>
                <AnimatedDiv
                    className="absolute right-20 bottom-32 h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-300 opacity-20"
                    animationType="bounceIn"
                    delay={800}
                ></AnimatedDiv>
                <AnimatedDiv
                    className="absolute top-1/2 left-1/4 h-1.5 w-1.5 animate-ping rounded-full bg-green-400 opacity-25"
                    animationType="bounceIn"
                    delay={1100}
                ></AnimatedDiv>

                {/* Gradient orbs */}
                <AnimatedDiv
                    className="absolute -top-32 -right-32 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-green-200 to-emerald-200 opacity-10 blur-2xl"
                    animationType="scaleIn"
                    delay={200}
                ></AnimatedDiv>
                <AnimatedDiv
                    className="absolute -bottom-32 -left-32 h-72 w-72 animate-pulse rounded-full bg-gradient-to-tr from-emerald-200 to-green-200 opacity-8 blur-2xl delay-1000"
                    animationType="scaleIn"
                    delay={400}
                ></AnimatedDiv>
                <AnimatedDiv
                    className="absolute top-1/3 right-1/3 h-48 w-48 animate-pulse rounded-full bg-gradient-to-r from-green-100 to-emerald-100 opacity-5 blur-2xl delay-500"
                    animationType="scaleIn"
                    delay={600}
                ></AnimatedDiv>
            </div>

            {/* Header */}
            <AnimatedDiv
                className="relative z-20 border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-md"
                delay={100}
                animationType="fadeIn"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="group flex items-center space-x-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                    <Building2 className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">DevChef</span>
                            </Link>
                        </div>
                        <Link
                            href="/companies/login"
                            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 hover:underline"
                        >
                            Already have an account? Sign in
                        </Link>
                    </div>
                </div>
            </AnimatedDiv>

            {/* Main Content */}
            <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
                <div className="mx-auto w-full max-w-7xl">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        {/* Left Side - Clean & Minimal */}
                        <AnimatedDiv
                            className="order-2 lg:order-1"
                            delay={300}
                            animationType="slideInLeft"
                        >
                            <div className="space-y-8">
                                {/* Hero Section */}
                                <div className="space-y-6">
                                    <AnimatedDiv delay={400} animationType="fadeUp">
                                        <div className="mb-6 flex items-center space-x-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                                                <Sparkles className="h-6 w-6 text-white" />
                                            </div>
                                            <span className="text-sm font-semibold tracking-wide text-green-600 uppercase">
                                                Start your free trial
                                            </span>
                                        </div>
                                    </AnimatedDiv>

                                    <AnimatedDiv delay={500} animationType="fadeUp">
                                        <h1 className="text-4xl leading-tight font-bold text-gray-900 lg:text-5xl">
                                            Transform your hiring
                                            <span className="block text-green-600">in 14 days</span>
                                        </h1>
                                    </AnimatedDiv>

                                    <AnimatedDiv delay={600} animationType="fadeUp">
                                        <p className="text-xl leading-relaxed text-gray-600">
                                            No credit card required. Get full access to our
                                            enterprise platform with advanced hiring tools and
                                            analytics.
                                        </p>
                                    </AnimatedDiv>
                                </div>

                                {/* Key Features - Clean List */}
                                <AnimatedDiv delay={700} animationType="fadeUp">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            What&apos;s included:
                                        </h3>
                                        <div className="space-y-3">
                                            {keyFeatures.map((feature, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                    </div>
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </AnimatedDiv>

                                {/* Trust Indicators */}
                                <AnimatedDiv delay={800} animationType="fadeUp">
                                    <div className="rounded-xl border border-gray-200 bg-white/50 p-6 backdrop-blur-sm">
                                        <div className="text-center">
                                            <div className="mb-4 text-2xl font-bold text-green-600">
                                                10,000+ companies trust DevChef
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Join leading companies in hiring better developers
                                                faster
                                            </p>
                                        </div>
                                    </div>
                                </AnimatedDiv>
                            </div>
                        </AnimatedDiv>

                        {/* Right Side - Form */}
                        <AnimatedDiv
                            className="order-1 lg:order-2"
                            delay={400}
                            animationType="slideInRight"
                        >
                            <div className="mx-auto w-full max-w-lg">
                                <Card className="group relative overflow-hidden border-0 bg-white/95 shadow-2xl backdrop-blur-sm">
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                                    <CardContent className="relative p-8">
                                        <AnimatedDiv delay={500} animationType="fadeUp">
                                            <div className="mb-8 text-center">
                                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                                                    <Building2 className="h-8 w-8 text-white" />
                                                </div>
                                                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                                    Start Your Free Trial
                                                </h2>
                                                <p className="mt-3 text-gray-600">
                                                    No credit card required. Create your account and
                                                    start your free trial today.
                                                </p>
                                            </div>
                                        </AnimatedDiv>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <AnimatedDiv delay={600} animationType="fadeUp">
                                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                    <FormField
                                                        label="First Name"
                                                        htmlFor="firstName"
                                                        error={errors.firstName}
                                                        required
                                                    >
                                                        <div className="relative">
                                                            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                                            <Input
                                                                id="firstName"
                                                                placeholder="John"
                                                                value={formData.firstName}
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        'firstName',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className="border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500"
                                                                required
                                                            />
                                                        </div>
                                                    </FormField>

                                                    <FormField
                                                        label="Last Name"
                                                        htmlFor="lastName"
                                                        error={errors.lastName}
                                                        required
                                                    >
                                                        <div className="relative">
                                                            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                                            <Input
                                                                id="lastName"
                                                                placeholder="Doe"
                                                                value={formData.lastName}
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        'lastName',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className="border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500"
                                                                required
                                                            />
                                                        </div>
                                                    </FormField>
                                                </div>
                                            </AnimatedDiv>

                                            <AnimatedDiv delay={700} animationType="fadeUp">
                                                <FormField
                                                    label="Work Email Address"
                                                    htmlFor="workEmail"
                                                    error={errors.workEmail}
                                                    required
                                                >
                                                    <div className="relative">
                                                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                                        <Input
                                                            id="workEmail"
                                                            type="email"
                                                            placeholder="your.email@company.com"
                                                            value={formData.workEmail}
                                                            onChange={(e) =>
                                                                handleFieldChange(
                                                                    'workEmail',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            className="border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500"
                                                            required
                                                        />
                                                    </div>
                                                </FormField>
                                            </AnimatedDiv>

                                            <AnimatedDiv delay={800} animationType="fadeUp">
                                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                    <FormField
                                                        label="Company Name"
                                                        htmlFor="companyName"
                                                        error={errors.companyName}
                                                        required
                                                    >
                                                        <div className="relative">
                                                            <Building2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                                            <Input
                                                                id="companyName"
                                                                placeholder="Acme Corp"
                                                                value={formData.companyName}
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        'companyName',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className="border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500"
                                                                required
                                                            />
                                                        </div>
                                                    </FormField>

                                                    <FormField
                                                        label="Job Title"
                                                        htmlFor="jobTitle"
                                                        error={errors.jobTitle}
                                                        required
                                                    >
                                                        <div className="relative">
                                                            <Briefcase className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                                            <Input
                                                                id="jobTitle"
                                                                placeholder="Engineering Manager"
                                                                value={formData.jobTitle}
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        'jobTitle',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className="border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500"
                                                                required
                                                            />
                                                        </div>
                                                    </FormField>
                                                </div>
                                            </AnimatedDiv>

                                            <AnimatedDiv delay={900} animationType="fadeUp">
                                                <FormField
                                                    label="Company Size"
                                                    htmlFor="companySize"
                                                    error={errors.companySize}
                                                    required
                                                >
                                                    <div className="relative">
                                                        <Users className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                                        <Select
                                                            value={formData.companySize}
                                                            onValueChange={(value) =>
                                                                handleFieldChange(
                                                                    'companySize',
                                                                    value,
                                                                )
                                                            }
                                                        >
                                                            <SelectTrigger className="border-gray-300 bg-white pl-10 text-gray-900">
                                                                <SelectValue placeholder="Select company size" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {companySizes.map((size) => (
                                                                    <SelectItem
                                                                        key={size.value}
                                                                        value={size.value}
                                                                    >
                                                                        {size.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </FormField>
                                            </AnimatedDiv>

                                            <AnimatedDiv delay={1000} animationType="fadeUp">
                                                <div className="space-y-4">
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
                                                            onChange={(value) =>
                                                                handleFieldChange('password', value)
                                                            }
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
                                                                handleFieldChange(
                                                                    'confirmPassword',
                                                                    value,
                                                                )
                                                            }
                                                            error={!!errors.confirmPassword}
                                                            required
                                                        />
                                                    </FormField>
                                                </div>
                                            </AnimatedDiv>

                                            <AnimatedDiv delay={1100} animationType="fadeUp">
                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-3">
                                                        <Checkbox
                                                            id="terms"
                                                            checked={formData.agreeToTerms}
                                                            onCheckedChange={(checked) =>
                                                                handleFieldChange(
                                                                    'agreeToTerms',
                                                                    checked,
                                                                )
                                                            }
                                                            className="mt-1 border-gray-300 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
                                                            required
                                                        />
                                                        <p className="max-w-md text-sm text-gray-700">
                                                            By signing up, you agree to our{' '}
                                                            <Link
                                                                href="#"
                                                                className="font-medium text-green-600 hover:text-green-700 hover:underline"
                                                            >
                                                                master subscription agreement
                                                            </Link>{' '}
                                                            and{' '}
                                                            <Link
                                                                href="#"
                                                                className="font-medium text-green-600 hover:text-green-700 hover:underline"
                                                            >
                                                                privacy policy
                                                            </Link>
                                                            .
                                                        </p>
                                                    </div>

                                                    {errors.agreeToTerms && (
                                                        <p className="text-sm text-red-600">
                                                            {errors.agreeToTerms}
                                                        </p>
                                                    )}
                                                </div>
                                            </AnimatedDiv>

                                            {error && (
                                                <AnimatedDiv delay={1200} animationType="fadeUp">
                                                    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                                        <p className="text-sm text-red-600">
                                                            {error}
                                                        </p>
                                                    </div>
                                                </AnimatedDiv>
                                            )}

                                            <AnimatedDiv delay={1200} animationType="fadeUp">
                                                <LoadingButton
                                                    type="submit"
                                                    isLoading={isLoading}
                                                    loadingText="Creating your trial account..."
                                                    disabled={!formData.agreeToTerms}
                                                    className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-green-600 hover:to-emerald-700 hover:shadow-xl"
                                                >
                                                    Start Free Trial
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </LoadingButton>
                                            </AnimatedDiv>
                                        </form>

                                        <AnimatedDiv delay={1300} animationType="fadeUp">
                                            <div className="mt-8">
                                                <SocialLogin disabled={isLoading} />
                                            </div>
                                        </AnimatedDiv>

                                        <AnimatedDiv delay={1400} animationType="fadeUp">
                                            <div className="mt-6 text-center">
                                                <p className="text-sm text-gray-600">
                                                    Need a demo first?{' '}
                                                    <Link
                                                        href="/companies/demo"
                                                        className="font-medium text-green-600 hover:underline"
                                                    >
                                                        Schedule a demo
                                                    </Link>
                                                </p>
                                            </div>
                                        </AnimatedDiv>
                                    </CardContent>
                                </Card>
                            </div>
                        </AnimatedDiv>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <AnimatedDiv
                className="relative z-20 border-t border-gray-200 bg-white/90 backdrop-blur-md"
                delay={1500}
                animationType="fadeIn"
            >
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
                        <p className="text-sm text-gray-500">
                            © 2024 DevChef. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link
                                href="#"
                                className="text-sm text-gray-500 transition-colors hover:text-gray-700"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-gray-500 transition-colors hover:text-gray-700"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-gray-500 transition-colors hover:text-gray-700"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </AnimatedDiv>
        </div>
    );
}
