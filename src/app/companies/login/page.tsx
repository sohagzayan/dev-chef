'use client';

import { Building2, Shield, Users, Zap } from 'lucide-react';
import { AuthCard } from '@/components/client/layout/auth-card';
import { AuthLayout } from '@/components/client/layout/auth-layout';
import { LoginForm } from './components/login-form';

export default function CompanyLogin() {
    return (
        <AuthLayout title="Enterprise Portal" icon={Building2} variant="company">
            <div className="flex w-full max-w-6xl items-center justify-center gap-12 px-6 py-12">
                {/* Left Side - Login Form */}
                <div className="max-w-sm flex-1">
                    <AuthCard
                        title="Welcome Back!"
                        subtitle="Sign in to your company account to access enterprise features"
                        className="w-full"
                    >
                        <LoginForm />
                    </AuthCard>
                </div>

                {/* Right Side - Enterprise Features */}
                <div className="hidden max-w-md flex-1 lg:block">
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="text-center lg:text-left">
                            <h2 className="mb-3 text-3xl font-bold text-gray-900">
                                Enterprise Solutions
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                Streamline your hiring process with our comprehensive enterprise
                                platform
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                        Enterprise Security
                                    </h3>
                                    <p className="leading-relaxed text-gray-600">
                                        SOC 2 compliant with advanced encryption and role-based
                                        access controls
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                        Team Collaboration
                                    </h3>
                                    <p className="leading-relaxed text-gray-600">
                                        Multi-user accounts with advanced team management and
                                        reporting
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                                        <Zap className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                                        Advanced Analytics
                                    </h3>
                                    <p className="leading-relaxed text-gray-600">
                                        Comprehensive insights and performance metrics for
                                        data-driven decisions
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="border-t border-gray-200 pt-6">
                            <div className="text-center lg:text-left">
                                <p className="mb-3 text-sm text-gray-500">
                                    Trusted by leading companies
                                </p>
                                <div className="flex items-center justify-center space-x-6 opacity-60 lg:justify-start">
                                    <div className="h-8 w-20 animate-pulse rounded bg-gray-300"></div>
                                    <div className="h-8 w-16 animate-pulse rounded bg-gray-300"></div>
                                    <div className="h-8 w-24 animate-pulse rounded bg-gray-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
