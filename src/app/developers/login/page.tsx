'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Mail, Sparkles } from 'lucide-react';
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFieldChange = (field: keyof DeveloperLoginForm, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        validateField(field, value, newData);
    };

    const features = [
        { text: 'Access to 1000+ coding challenges' },
        { text: 'Real-time code execution' },
        { text: 'Interview preparation tools' },
    ];

    return (
        <div className="from-dark-900 via-muted-700 to-dark-900 relative min-h-screen overflow-hidden bg-gradient-to-br">
            <AuthBackground variant="developer" />
            <AuthHeader title="Developer Hub" icon={Code2} />

            <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-6">
                <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
                    {/* Left Side - Welcome Message */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block"
                    >
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <Sparkles className="text-success-100 h-6 w-6" />
                                <span className="text-success-100 font-medium">Welcome back!</span>
                            </div>
                            <h1 className="text-4xl leading-tight font-bold text-white">
                                Ready to code?
                                <br />
                                <span className="text-success-100">
                                    Lets build something amazing.
                                </span>
                            </h1>
                            <p className="text-muted-500 text-lg leading-relaxed">
                                Join millions of developers worldwide. Practice coding challenges,
                                prepare for interviews, and showcase your skills to top companies.
                            </p>

                            <FeatureList features={features} />
                        </div>
                    </motion.div>

                    {/* Right Side - Login Form */}
                    <AuthCard
                        icon={Code2}
                        title="Welcome Back!"
                        subtitle="Continue your coding journey"
                        delay={0.2}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FormField
                                label="Email or Username"
                                htmlFor="email"
                                error={errors.email}
                                required
                            >
                                <div className="relative">
                                    <Mail className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                                    <Input
                                        id="email"
                                        type="text"
                                        placeholder="Enter your email or username"
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
                                        className="data-[state=checked]:bg-success-100 data-[state=checked]:border-success-100 border-white/20"
                                    />
                                    <Label htmlFor="remember" className="text-muted-500 text-sm">
                                        Remember me
                                    </Label>
                                </div>
                                <Link
                                    href="/developers/forgot-password"
                                    className="text-success-100 text-sm hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <LoadingButton
                                type="submit"
                                isLoading={isLoading}
                                loadingText="Signing in..."
                                className="transform hover:scale-105"
                            >
                                Start Coding
                            </LoadingButton>
                        </form>

                        <SocialLogin disabled={isLoading} />

                        <div className="text-muted-500 text-center">
                            Dont have an account?{' '}
                            <Link
                                href="/developers/signup"
                                className="text-success-100 font-medium hover:underline"
                            >
                                Sign up for free
                            </Link>
                        </div>
                    </AuthCard>
                </div>
            </div>
        </div>
    );
}
