'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, CheckCircle, Code2, Sparkles, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function RoleSelection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const AnimatedDiv = ({ children, className, onHoverStart, onHoverEnd, ...props }: any) => {
        return (
            <div
                className={`${className || ''} transition-all duration-300 ease-out`}
                onMouseEnter={mounted ? onHoverStart : undefined}
                onMouseLeave={mounted ? onHoverEnd : undefined}
                {...props}
            >
                {children}
            </div>
        );
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-green-50">
            {/* Optimized Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating particles - reduced count for performance */}
                <div className="absolute top-20 left-10 h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 opacity-40"></div>
                <div className="absolute top-40 right-20 h-1 w-1 animate-bounce rounded-full bg-green-300 opacity-30"></div>
                <div className="absolute bottom-32 left-1/4 h-1 w-1 animate-ping rounded-full bg-green-500 opacity-20"></div>

                {/* Gradient orbs - simplified for performance */}
                <div className="absolute -top-32 -right-32 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-green-200 to-emerald-200 opacity-15 blur-2xl"></div>
                <div className="absolute -bottom-32 -left-32 h-72 w-72 animate-pulse rounded-full bg-gradient-to-tr from-emerald-200 to-green-200 opacity-10 blur-2xl delay-1000"></div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
                <div className="mx-auto w-full max-w-4xl">
                    {/* Hero Section */}
                    <AnimatedDiv className="mb-10 text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                                <Sparkles className="mr-1.5 h-3 w-3" />
                                Welcome to DevChef
                            </div>
                        </div>

                        <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            Choose Your
                            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                Perfect Path
                            </span>
                        </h1>

                        <p className="mx-auto max-w-xl text-base text-gray-600 sm:text-lg">
                            Join thousands of developers and companies building the future together
                        </p>
                    </AnimatedDiv>

                    {/* Compact Role Cards Grid */}
                    <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
                        {/* Companies Card */}
                        <AnimatedDiv
                            onHoverStart={() => {}}
                            onHoverEnd={() => {}}
                            className="group relative"
                        >
                            <Card className="relative h-full overflow-hidden border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                <CardContent className="relative flex h-full flex-col p-6">
                                    {/* Icon with cool animation */}
                                    <div className="mb-4 flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 opacity-20 blur-md transition-all duration-300 group-hover:opacity-40 group-hover:blur-lg"></div>
                                            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                                                <Building2 className="h-6 w-6 text-white transition-transform duration-300 group-hover:rotate-12" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Badge */}
                                    <div className="mb-3 flex justify-center">
                                        <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                                            <Star className="mr-1 h-3 w-3" />
                                            ENTERPRISE
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="mb-3 text-center text-xl font-bold text-gray-900 sm:text-2xl">
                                        For Companies
                                    </h2>

                                    {/* Description */}
                                    <p className="mb-4 text-center text-sm leading-relaxed text-gray-600">
                                        Transform your hiring with AI-powered assessments and find
                                        exceptional talent
                                    </p>

                                    {/* Features - compact */}
                                    <div className="mb-4 space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 transition-colors duration-200 group-hover:bg-green-200">
                                                <CheckCircle className="h-3 w-3 text-green-600" />
                                            </div>
                                            <span className="text-xs text-gray-700">
                                                Advanced analytics
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 transition-colors duration-200 group-hover:bg-green-200">
                                                <CheckCircle className="h-3 w-3 text-green-600" />
                                            </div>
                                            <span className="text-xs text-gray-700">
                                                Custom assessments
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 transition-colors duration-200 group-hover:bg-green-200">
                                                <CheckCircle className="h-3 w-3 text-green-600" />
                                            </div>
                                            <span className="text-xs text-gray-700">
                                                Real-time collaboration
                                            </span>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-auto space-y-3">
                                        <Link href="/companies/login">
                                            <Button className="group/btn w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg">
                                                Get Started
                                                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                            </Button>
                                        </Link>

                                        <div className="text-center text-xs text-gray-500">
                                            New here?{' '}
                                            <Link
                                                href="/companies/contact-sales"
                                                className="font-medium text-green-600 hover:underline"
                                            >
                                                Contact Sales
                                            </Link>{' '}
                                            or{' '}
                                            <Link
                                                href="/companies/trial"
                                                className="font-medium text-green-600 hover:underline"
                                            >
                                                Start Free Trial
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>

                                {/* Decorative elements */}
                                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 opacity-20 transition-opacity duration-300 group-hover:opacity-40"></div>
                                <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-emerald-400 opacity-20 transition-opacity duration-300 group-hover:opacity-40"></div>
                            </Card>
                        </AnimatedDiv>

                        {/* Developers Card */}
                        <AnimatedDiv
                            onHoverStart={() => {}}
                            onHoverEnd={() => {}}
                            className="group relative"
                        >
                            <Card className="relative h-full overflow-hidden border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                <CardContent className="relative flex h-full flex-col p-6">
                                    {/* Icon with cool animation */}
                                    <div className="mb-4 flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 opacity-20 blur-md transition-all duration-300 group-hover:opacity-40 group-hover:blur-lg"></div>
                                            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                                                <Code2 className="h-6 w-6 text-white transition-transform duration-300 group-hover:rotate-12" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Badge */}
                                    <div className="mb-3 flex justify-center">
                                        <div className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                            <Users className="mr-1 h-3 w-3" />
                                            COMMUNITY
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="mb-3 text-center text-xl font-bold text-gray-900 sm:text-2xl">
                                        For Developers
                                    </h2>

                                    {/* Description */}
                                    <p className="mb-4 text-center text-sm leading-relaxed text-gray-600">
                                        Practice coding, prepare for interviews, and showcase your
                                        skills globally
                                    </p>

                                    {/* Features - compact */}
                                    <div className="mb-4 space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 transition-colors duration-200 group-hover:bg-emerald-200">
                                                <CheckCircle className="h-3 w-3 text-emerald-600" />
                                            </div>
                                            <span className="text-xs text-gray-700">
                                                Interactive challenges
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 transition-colors duration-200 group-hover:bg-emerald-200">
                                                <CheckCircle className="h-3 w-3 text-emerald-600" />
                                            </div>
                                            <span className="text-xs text-gray-700">
                                                Interview prep
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 transition-colors duration-200 group-hover:bg-emerald-200">
                                                <CheckCircle className="h-3 w-3 text-emerald-600" />
                                            </div>
                                            <span className="text-xs text-gray-700">
                                                Global community
                                            </span>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-auto space-y-3">
                                        <Link href="/developers/login">
                                            <Button className="group/btn w-full rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-emerald-600 hover:to-green-700 hover:shadow-lg">
                                                Join Community
                                                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                            </Button>
                                        </Link>

                                        <div className="text-center text-xs text-gray-500">
                                            New here?{' '}
                                            <Link
                                                href="/developers/signup"
                                                className="font-medium text-emerald-600 hover:underline"
                                            >
                                                Sign up for free
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>

                                {/* Decorative elements */}
                                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 opacity-20 transition-opacity duration-300 group-hover:opacity-40"></div>
                                <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-green-400 opacity-20 transition-opacity duration-300 group-hover:opacity-40"></div>
                            </Card>
                        </AnimatedDiv>
                    </div>

                    {/* Bottom CTA */}
                    <AnimatedDiv className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Need help choosing?{' '}
                            <Link
                                href="/support"
                                className="font-medium text-green-600 hover:underline"
                            >
                                Contact our team
                            </Link>
                        </p>
                    </AnimatedDiv>
                </div>
            </main>
        </div>
    );
}
