'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Mail, Shield, Users, Zap } from 'lucide-react';
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
import { useFormValidation } from '@/hooks/form/use-form-validation';
import { developerLoginSchema, type DeveloperLoginForm } from '@/lib/validations';

export default function DeveloperLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<DeveloperLoginForm>({
        email: '',
        password: '',
        rememberMe: false,
    });

    const { errors, validate, validateField } = useFormValidation(developerLoginSchema);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate(formData)) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Login successful');
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFieldChange = (field: keyof DeveloperLoginForm, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        validateField(field, value, newData);
    };

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
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <AuthBackground variant="developer" />
            <AuthHeader title="Developer Hub" icon={Code2} />

            <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-6 py-12">
                <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
                    {/* Left Side - Welcome Message */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:block"
                    >
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl leading-tight font-bold text-gray-900">
                                    Ready to
                                    <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                        level up?
                                    </span>
                                </h1>
                                <p className="max-w-lg text-xl leading-relaxed text-gray-600">
                                    Join millions of developers worldwide. Practice coding
                                    challenges, prepare for interviews, and showcase your skills.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    What you&apos;ll get:
                                </h3>
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
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Login Form */}
                    <AuthCard
                        title="Welcome Back!"
                        subtitle="Continue your coding journey"
                        delay={0.2}
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
                                    value={formData.password}
                                    onChange={(value) => handleFieldChange('password', value)}
                                    error={!!errors.password}
                                    required
                                />
                            </FormField>

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

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-4 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <SocialLogin disabled={isLoading} />

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
                </div>
            </div>
        </div>
    );
}
