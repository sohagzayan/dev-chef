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
import { AuthCard } from '@/components/client/layout/auth-card';
import { AuthHeader } from '@/components/client/layout/auth-header';
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <div className="from-dark-900 via-muted-700 to-dark-900 relative min-h-screen overflow-hidden bg-gradient-to-br">
            <AuthBackground variant="company" />

            <AuthHeader
                title="Enterprise Trial"
                icon={Building2}
                rightContent={
                    <Link
                        href="/companies/login"
                        className="text-muted-500 transition-colors hover:text-white"
                    >
                        Already have an account? Sign in
                    </Link>
                }
            />

            <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-6">
                <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
                    {/* Left Side - Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden space-y-8 lg:block"
                    >
                        <div>
                            <div className="mb-4 flex items-center space-x-2">
                                <Sparkles className="text-success-100 h-6 w-6" />
                                <span className="text-success-100 font-medium">
                                    Start your free trial
                                </span>
                            </div>
                            <h1 className="mb-4 text-4xl leading-tight font-bold text-white">
                                Transform your hiring
                                <span className="text-success-100 block">in 14 days</span>
                            </h1>
                            <p className="text-muted-500 text-xl leading-relaxed">
                                No credit card required. Get full access to our enterprise platform
                                and see how we can revolutionize your technical hiring process.
                            </p>
                        </div>

                        <FeatureList features={trialFeatures} />

                        <div className="bg-success-100/10 border-success-100/20 rounded-lg border p-6">
                            <h3 className="text-success-100 mb-2 font-semibold">
                                🚀 What happens next?
                            </h3>
                            <ul className="text-muted-500 space-y-1 text-sm">
                                <li>• Instant access to your trial account</li>
                                <li>• Personalized onboarding session</li>
                                <li>• Dedicated customer success manager</li>
                                <li>• Custom integration support</li>
                            </ul>
                        </div>

                        <div className="text-muted-500 flex items-center space-x-4 text-sm">
                            <span>Trusted by 50,000+ companies worldwide</span>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <AuthCard
                        icon={Building2}
                        title="Start Your Free Trial"
                        subtitle="No credit card required. Sign up with your work email."
                        delay={0.2}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    label="First Name"
                                    htmlFor="firstName"
                                    error={errors.firstName}
                                    required
                                >
                                    <div className="relative">
                                        <User className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={(e) =>
                                                handleFieldChange('firstName', e.target.value)
                                            }
                                            className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
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
                                        <User className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={(e) =>
                                                handleFieldChange('lastName', e.target.value)
                                            }
                                            className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
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
                                    <Mail className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                    <Input
                                        id="workEmail"
                                        type="email"
                                        placeholder="your.email@company.com"
                                        value={formData.workEmail}
                                        onChange={(e) =>
                                            handleFieldChange('workEmail', e.target.value)
                                        }
                                        className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
                                        required
                                    />
                                </div>
                            </FormField>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    label="Company Name"
                                    htmlFor="companyName"
                                    error={errors.companyName}
                                    required
                                >
                                    <div className="relative">
                                        <Building2 className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                        <Input
                                            id="companyName"
                                            placeholder="Acme Corp"
                                            value={formData.companyName}
                                            onChange={(e) =>
                                                handleFieldChange('companyName', e.target.value)
                                            }
                                            className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
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
                                        <Briefcase className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                        <Input
                                            id="jobTitle"
                                            placeholder="Engineering Manager"
                                            value={formData.jobTitle}
                                            onChange={(e) =>
                                                handleFieldChange('jobTitle', e.target.value)
                                            }
                                            className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
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
                                    <Users className="text-muted-500 absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 transform" />
                                    <Select
                                        value={formData.companySize}
                                        onValueChange={(value) =>
                                            handleFieldChange('companySize', value)
                                        }
                                    >
                                        <SelectTrigger className="border-white/20 bg-white/5 pl-10 text-white">
                                            <SelectValue placeholder="Select company size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {companySizes.map((size) => (
                                                <SelectItem key={size.value} value={size.value}>
                                                    {size.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormField>

                            <div className="flex items-start space-x-2 pt-2">
                                <Checkbox
                                    id="terms"
                                    checked={formData.agreeToTerms}
                                    onCheckedChange={(checked) =>
                                        handleFieldChange('agreeToTerms', checked)
                                    }
                                    className="data-[state=checked]:bg-success-100 data-[state=checked]:border-success-100 mt-1 border-white/20"
                                    required
                                />
                                <Label
                                    htmlFor="terms"
                                    className="text-muted-500 text-sm leading-relaxed"
                                >
                                    By signing up, you agree to our{' '}
                                    <Link href="#" className="text-success-100 hover:underline">
                                        master subscription agreement
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="#" className="text-success-100 hover:underline">
                                        privacy policy
                                    </Link>
                                </Label>
                            </div>
                            {errors.agreeToTerms && (
                                <p className="text-destructive-100 animate-fade-in text-sm">
                                    {errors.agreeToTerms}
                                </p>
                            )}

                            <LoadingButton
                                type="submit"
                                isLoading={isLoading}
                                loadingText="Starting your trial..."
                                disabled={!formData.agreeToTerms}
                            >
                                Start Free Trial
                            </LoadingButton>
                        </form>

                        <SocialLogin disabled={isLoading} />

                        <div className="text-muted-500 text-center">
                            Need a demo first?{' '}
                            <Link
                                href="/companies/demo"
                                className="text-success-100 font-medium hover:underline"
                            >
                                Schedule a demo
                            </Link>
                        </div>
                    </AuthCard>
                </div>
            </div>
        </div>
    );
}
