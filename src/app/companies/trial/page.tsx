'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, Building2, Mail, Sparkles, User, Users } from 'lucide-react';
import { FormField } from '@/components/client/common/form-field';
import { LoadingButton } from '@/components/client/common/loading-button';
import { SocialLogin } from '@/components/client/common/social-login';
import { FeatureList } from '@/components/client/features/feature-list';
import { AuthBackground } from '@/components/client/layout/auth-background';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useFormValidation } from '@/hooks/form/use-form-validation';
import { companyTrialSchema, type CompanyTrialForm } from '@/lib/validations';

export default function CompanyTrial() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<CompanyTrialForm>({
        firstName: '',
        lastName: '',
        workEmail: '',
        companyName: '',
        jobTitle: '',
        companySize: '',
        agreeToTerms: false,
    });

    const { errors, validate, validateField } = useFormValidation(companyTrialSchema);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate(formData)) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // Handle success - redirect to onboarding or dashboard
            console.log('Trial started successfully');
        } catch (error) {
            console.error('Trial signup failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFieldChange = (field: keyof CompanyTrialForm, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        validateField(field, value, newData);
    };

    const trialFeatures = [
        { text: '14-day free trial, no credit card required' },
        { text: 'Access to complete skills assessment library' },
        { text: 'Real-time candidate evaluation tools' },
        { text: 'Advanced analytics and reporting' },
        { text: 'Team collaboration features' },
        { text: 'Priority customer support' },
    ];

    const companySizes = [
        { value: '1-10', label: '1-10 employees' },
        { value: '11-50', label: '11-50 employees' },
        { value: '51-200', label: '51-200 employees' },
        { value: '201-1000', label: '201-1000 employees' },
        { value: '1000+', label: '1000+ employees' },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <AuthBackground variant="company" />

            {/* Header Section */}
            <div className="relative z-20 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center space-x-2">
                                <Building2 className="h-8 w-8 text-green-600" />
                                <span className="text-xl font-bold text-gray-900">DevChef</span>
                            </Link>
                        </div>
                        <Link
                            href="/companies/login"
                            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                        >
                            Already have an account? Sign in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left Side - Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="space-y-8">
                            <div>
                                <div className="mb-6 flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                        <Sparkles className="h-5 w-5 text-green-600" />
                                    </div>
                                    <span className="text-sm font-semibold tracking-wide text-green-600 uppercase">
                                        Start your free trial
                                    </span>
                                </div>
                                <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 lg:text-5xl">
                                    Transform your hiring
                                    <span className="block text-green-600">in 14 days</span>
                                </h1>
                                <p className="text-xl leading-relaxed text-gray-600">
                                    No credit card required. Get full access to our enterprise
                                    platform with advanced hiring tools and analytics.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    What{"'"}s included in your trial:
                                </h3>
                                <FeatureList features={trialFeatures} />
                            </div>

                            <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                                <h3 className="mb-4 flex items-center text-lg font-semibold text-green-800">
                                    <span className="mr-2">🚀</span>
                                    What happens next?
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-center">
                                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                        Instant access to your trial account
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                        Personalized onboarding session
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                        Dedicated customer success manager
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="mx-auto w-full max-w-lg">
                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl sm:p-10">
                                <div className="mb-8 text-center">
                                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                        Start Your Free Trial
                                    </h2>
                                    <p className="mt-3 text-gray-600">
                                        No credit card required. Sign up with your work email.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
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
                                                    handleFieldChange('workEmail', e.target.value)
                                                }
                                                className="border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500"
                                                required
                                            />
                                        </div>
                                    </FormField>

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
                                                    handleFieldChange('companySize', value)
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

                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <Checkbox
                                                id="terms"
                                                checked={formData.agreeToTerms}
                                                onCheckedChange={(checked) =>
                                                    handleFieldChange('agreeToTerms', checked)
                                                }
                                                className="mt-1 border-gray-300 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
                                                required
                                            />
                                            <Label
                                                htmlFor="terms"
                                                className="text-sm leading-relaxed text-gray-700"
                                            >
                                                By signing up, you agree to our{' '}
                                                <Link
                                                    href="#"
                                                    className="font-medium text-green-600 hover:underline"
                                                >
                                                    master subscription agreement
                                                </Link>{' '}
                                                and{' '}
                                                <Link
                                                    href="#"
                                                    className="font-medium text-green-600 hover:underline"
                                                >
                                                    privacy policy
                                                </Link>
                                            </Label>
                                        </div>
                                        {errors.agreeToTerms && (
                                            <p className="text-sm text-red-600">
                                                {errors.agreeToTerms}
                                            </p>
                                        )}
                                    </div>

                                    <LoadingButton
                                        type="submit"
                                        isLoading={isLoading}
                                        loadingText="Starting your trial..."
                                        disabled={!formData.agreeToTerms}
                                        className="w-full"
                                    >
                                        Start Free Trial
                                    </LoadingButton>
                                </form>

                                <div className="mt-8">
                                    <SocialLogin disabled={isLoading} />
                                </div>

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
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-20 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
                        <p className="text-sm text-gray-500">
                            © 2024 DevChef. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Terms of Service
                            </Link>
                            <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
