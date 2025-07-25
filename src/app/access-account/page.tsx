'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, Code2, Rocket, Target, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function RoleSelection() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Simple div wrapper for server-side rendering
    const AnimatedDiv = ({ children, className, onHoverStart, onHoverEnd, ...props }: any) => {
        return (
            <div
                className={`${className || ''} transition-all duration-300`}
                onMouseEnter={mounted ? onHoverStart : undefined}
                onMouseLeave={mounted ? onHoverEnd : undefined}
                {...props}
            >
                {children}
            </div>
        );
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-white">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[rgb(148,242,127)] opacity-5 mix-blend-multiply blur-3xl filter"></div>
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[rgb(148,242,127)] opacity-5 mix-blend-multiply blur-3xl filter"></div>
                <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[rgb(148,242,127)] opacity-3 mix-blend-multiply blur-3xl filter"></div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
                <div className="mx-auto w-full max-w-6xl">
                    {/* Hero Section */}
                    <AnimatedDiv className="mb-16 text-center">
                        <h1 className="mt-2 text-3xl leading-none font-bold text-gray-900 md:text-5xl lg:text-6xl">
                            Choose Your
                            <span className="block bg-gradient-to-r from-[rgb(148,242,127)] to-[rgb(148,242,127)] bg-clip-text text-transparent">
                                Journey
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                            Whether you&apos;re building the next unicorn or crafting elegant code,
                            we&apos;ve got the perfect platform tailored for your needs.
                        </p>
                    </AnimatedDiv>

                    {/* Role Cards */}
                    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 lg:gap-12">
                        {/* Companies Card */}
                        <AnimatedDiv
                            onHoverStart={() => setHoveredCard('companies')}
                            onHoverEnd={() => setHoveredCard(null)}
                            className="group relative"
                        >
                            <Card className="relative h-full transform overflow-hidden border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-[rgb(148,242,127)]/30 hover:shadow-lg">
                                <CardContent className="flex h-full flex-col p-8">
                                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[rgb(148,242,127)] to-[rgb(148,242,127)]/80 shadow-md transition-transform duration-300 group-hover:scale-105">
                                        <Building2 className="h-7 w-7 text-[rgba(14,15,12,1)]" />
                                    </div>

                                    <div className="mb-8 flex-1 text-center">
                                        <div className="mb-4 inline-block rounded-full border border-[rgb(148,242,127)]/20 bg-[rgb(148,242,127)]/10 px-4 py-2">
                                            <span className="text-xs font-semibold text-[rgb(148,242,127)]">
                                                ENTERPRISE
                                            </span>
                                        </div>
                                        <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                                            For Companies
                                        </h2>
                                        <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                                            Transform your hiring process with AI-powered
                                            assessments. Find top talent faster and build
                                            exceptional development teams.
                                        </p>
                                    </div>

                                    <div className="mb-8 space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Users className="h-5 w-5 flex-shrink-0 text-[rgb(148,242,127)]" />
                                            <span className="text-sm text-gray-700 md:text-base">
                                                Advanced team analytics
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Target className="h-5 w-5 flex-shrink-0 text-[rgb(148,242,127)]" />
                                            <span className="text-sm text-gray-700 md:text-base">
                                                Custom skill assessments
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Zap className="h-5 w-5 flex-shrink-0 text-[rgb(148,242,127)]" />
                                            <span className="text-sm text-gray-700 md:text-base">
                                                Real-time collaboration
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-auto space-y-4">
                                        <Link href="/companies/login">
                                            <Button className="w-full rounded-lg bg-[rgb(148,242,127)] py-3 text-base font-semibold text-[rgba(14,15,12,1)] shadow-md transition-all duration-300 hover:bg-[rgb(148,242,127)]/90 hover:shadow-lg">
                                                Login
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                            </Button>
                                        </Link>
                                        <div className="text-center text-sm text-gray-600">
                                            Don&apos;t have an account?{' '}
                                            <Link
                                                href="/companies/contact-sales"
                                                className="font-medium text-[rgb(148,242,127)] hover:underline"
                                            >
                                                Contact Sales
                                            </Link>{' '}
                                            or{' '}
                                            <Link
                                                href="/companies/trial"
                                                className="font-medium text-[rgb(148,242,127)] hover:underline"
                                            >
                                                Start Free Trial
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>

                                {/* Hover Effect Overlay */}
                                <AnimatedDiv
                                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgb(148,242,127)]/5 to-transparent transition-opacity duration-200 ${
                                        mounted && hoveredCard === 'companies'
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }`}
                                />
                            </Card>
                        </AnimatedDiv>

                        {/* Developers Card */}
                        <AnimatedDiv
                            onHoverStart={() => setHoveredCard('developers')}
                            onHoverEnd={() => setHoveredCard(null)}
                            className="group relative"
                        >
                            <Card className="relative h-full transform overflow-hidden border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-[rgb(148,242,127)]/30 hover:shadow-lg">
                                <CardContent className="flex h-full flex-col p-8">
                                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[rgb(148,242,127)] to-[rgb(148,242,127)]/80 shadow-md transition-transform duration-300 group-hover:scale-105">
                                        <Code2 className="h-7 w-7 text-[rgba(14,15,12,1)]" />
                                    </div>

                                    <div className="mb-8 flex-1 text-center">
                                        <div className="mb-4 inline-block rounded-full border border-[rgb(148,242,127)]/20 bg-[rgb(148,242,127)]/10 px-4 py-2">
                                            <span className="text-xs font-semibold text-[rgb(148,242,127)]">
                                                COMMUNITY
                                            </span>
                                        </div>
                                        <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                                            For Developers
                                        </h2>
                                        <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                                            Join millions of developers worldwide. Practice coding,
                                            prepare for interviews, and showcase your skills to top
                                            companies.
                                        </p>
                                    </div>

                                    <div className="mb-8 space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Rocket className="h-5 w-5 flex-shrink-0 text-[rgb(148,242,127)]" />
                                            <span className="text-sm text-gray-700 md:text-base">
                                                Interactive coding challenges
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Target className="h-5 w-5 flex-shrink-0 text-[rgb(148,242,127)]" />
                                            <span className="text-sm text-gray-700 md:text-base">
                                                Interview preparation
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Users className="h-5 w-5 flex-shrink-0 text-[rgb(148,242,127)]" />
                                            <span className="text-sm text-gray-700 md:text-base">
                                                Global developer community
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-auto space-y-4">
                                        <Link href="/developers/login">
                                            <Button className="w-full rounded-lg border border-gray-200 bg-gray-100 py-3 text-base font-semibold text-gray-700 shadow-md transition-all duration-300 hover:border-[rgb(148,242,127)] hover:bg-[rgb(148,242,127)] hover:text-[rgba(14,15,12,1)] hover:shadow-lg">
                                                Login
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                            </Button>
                                        </Link>
                                        <div className="text-center text-sm text-gray-600">
                                            Don&apos;t have an account?{' '}
                                            <Link
                                                href="/developers/signup"
                                                className="font-medium text-[rgb(148,242,127)] hover:underline"
                                            >
                                                Sign up
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>

                                {/* Hover Effect Overlay */}
                                <AnimatedDiv
                                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgb(148,242,127)]/5 to-transparent transition-opacity duration-200 ${
                                        mounted && hoveredCard === 'developers'
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }`}
                                />
                            </Card>
                        </AnimatedDiv>
                    </div>
                </div>
            </main>
        </div>
    );
}
