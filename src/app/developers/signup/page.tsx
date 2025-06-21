'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Mail, Sparkles, User } from 'lucide-react';
import { FormField } from '@/components/client/common/form-field';
import { LoadingButton } from '@/components/client/common/loading-button';
import { PasswordInput } from '@/components/client/common/password-input';
import { SocialLogin } from '@/components/client/common/social-login';
import { FeatureList } from '@/components/client/features/feature-list';
import { AuthBackground } from '@/components/client/layout/auth-background';
import { AuthCard } from '@/components/client/layout/auth-card';
import { AuthHeader } from '@/components/client/layout/auth-header';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormValidation } from '@/hooks/form/use-form-validation';
import { developerSignupSchema, type DeveloperSignupForm } from '@/lib/validations';

export default function DeveloperSignup() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<DeveloperSignupForm>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        subscribeNewsletter: false,
    });

    const { errors, validate, validateField } = useFormValidation(developerSignupSchema);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate(formData)) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Signup successful');
        } catch (error) {
            console.error('Signup failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFieldChange = (field: keyof DeveloperSignupForm, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        validateField(field, value, newData);
    };

    const benefits = [
        { text: 'Access to 1000+ coding challenges' },
        { text: 'Real-time code execution environment' },
        { text: 'Interview preparation resources' },
        { text: 'Global leaderboards and competitions' },
        { text: 'Career opportunities from top companies' },
    ];

    return (
        <div className="from-dark-900 via-muted-700 to-dark-900 relative min-h-screen overflow-hidden bg-gradient-to-br">
            <AuthBackground variant="developer" />

            <AuthHeader
                title="Developer Hub"
                icon={Code2}
                rightContent={
                    <div className="flex items-center space-x-4">
                        <span className="text-muted-500">Already have an account?</span>
                        <Link
                            href="/developers/login"
                            className="text-success-100 font-medium hover:underline"
                        >
                            Sign in
                        </Link>
                    </div>
                }
            />

            <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-6">
                <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
                    {/* Left Side - Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden space-y-8 md:block"
                    >
                        <div>
                            <div className="mb-4 flex items-center space-x-2">
                                <Sparkles className="text-success-100 h-6 w-6" />
                                <span className="text-success-100 font-medium">
                                    Join the community
                                </span>
                            </div>
                            <h1 className="mb-4 text-4xl leading-tight font-bold text-white">
                                Start your
                                <br />
                                <span className="text-success-100">coding journey today</span>
                            </h1>
                            <p className="text-muted-500 text-lg leading-relaxed">
                                Join over 2 million developers worldwide. Practice coding, prepare
                                for interviews, and connect with the global developer community.
                            </p>
                        </div>

                        <FeatureList features={benefits} />

                        <div className="bg-success-100/10 border-success-100/20 rounded-lg border p-6">
                            <h3 className="text-success-100 mb-2 font-semibold">
                                🎉 Special Launch Offer
                            </h3>
                            <p className="text-muted-500 text-sm">
                                Sign up now and get premium features free for your first month!
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Side - Signup Form */}
                    <AuthCard
                        icon={Code2}
                        title="Join Us"
                        subtitle="Create your developer account"
                        delay={0.2}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FormField
                                label="Full Name"
                                htmlFor="fullName"
                                error={errors.fullName}
                                required
                            >
                                <div className="relative">
                                    <User className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={(e) =>
                                            handleFieldChange('fullName', e.target.value)
                                        }
                                        className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
                                        required
                                    />
                                </div>
                            </FormField>

                            <FormField label="Email" htmlFor="email" error={errors.email} required>
                                <div className="relative">
                                    <Mail className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => handleFieldChange('email', e.target.value)}
                                        className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
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
                                <div className="flex items-start space-x-2">
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
                                        I agree to the{' '}
                                        <Link href="#" className="text-success-100 hover:underline">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="#" className="text-success-100 hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </Label>
                                </div>
                                {errors.agreeToTerms && (
                                    <p className="text-destructive-100 animate-fade-in text-sm">
                                        {errors.agreeToTerms}
                                    </p>
                                )}

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="newsletter"
                                        checked={formData.subscribeNewsletter}
                                        onCheckedChange={(checked) =>
                                            handleFieldChange('subscribeNewsletter', checked)
                                        }
                                        className="data-[state=checked]:bg-success-100 data-[state=checked]:border-success-100 border-white/20"
                                    />
                                    <Label htmlFor="newsletter" className="text-muted-500 text-sm">
                                        Subscribe to our newsletter for coding tips and updates
                                    </Label>
                                </div>
                            </div>

                            <LoadingButton
                                type="submit"
                                isLoading={isLoading}
                                loadingText="Creating account..."
                                disabled={!formData.agreeToTerms}
                                className="transform hover:scale-105"
                            >
                                Create Account
                            </LoadingButton>
                        </form>

                        <SocialLogin disabled={isLoading} />
                    </AuthCard>
                </div>
            </div>
        </div>
    );
}
