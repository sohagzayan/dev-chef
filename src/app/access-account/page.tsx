'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Code2, Rocket, Target, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function RoleSelection() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
        <div className="relative min-h-screen overflow-hidden bg-white">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[rgb(148,242,127)] opacity-5 mix-blend-multiply blur-3xl filter"></div>
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[rgb(148,242,127)] opacity-5 mix-blend-multiply blur-3xl filter"></div>
                <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[rgb(148,242,127)] opacity-3 mix-blend-multiply blur-3xl filter"></div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-6">
                <div className="mx-auto max-w-6xl">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-16 text-center"
                    >
                        <h1 className="mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-7xl">
                            Choose Your
                            <span className="block bg-gradient-to-r from-[rgb(148,242,127)] to-[rgb(148,242,127)] bg-clip-text text-transparent">
                                Journey
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
                            Whether youre building the next unicorn or crafting elegant code, weve
                            got the perfect platform tailored for your needs.
                        </p>
                    </motion.div>

                    {/* Role Cards */}
                    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
                        {/* Companies Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            onHoverStart={() => setHoveredCard('companies')}
                            onHoverEnd={() => setHoveredCard(null)}
                            className="group relative"
                        >
                            <Card className="relative transform overflow-hidden border border-gray-200 bg-white shadow-lg transition-all duration-500 hover:scale-105 hover:border-[rgb(148,242,127)]/30 hover:shadow-2xl">
                                <CardContent className="p-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(148,242,127)] to-[rgb(148,242,127)]/80 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                        <Building2 className="h-8 w-8 text-[rgba(14,15,12,1)]" />
                                    </div>

                                    <div className="mb-8 text-center">
                                        <div className="mb-4 inline-block rounded-full border border-[rgb(148,242,127)]/20 bg-[rgb(148,242,127)]/10 px-4 py-1">
                                            <span className="text-sm font-medium text-[rgb(148,242,127)]">
                                                ENTERPRISE
                                            </span>
                                        </div>
                                        <h2 className="mb-4 text-3xl font-bold text-gray-900">
                                            For Companies
                                        </h2>
                                        <p className="leading-relaxed text-gray-600">
                                            Transform your hiring process with AI-powered
                                            assessments. Find top talent faster and build
                                            exceptional development teams.
                                        </p>
                                    </div>

                                    <div className="mb-8 space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Users className="h-5 w-5 text-[rgb(148,242,127)]" />
                                            <span className="text-gray-700">
                                                Advanced team analytics
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Target className="h-5 w-5 text-[rgb(148,242,127)]" />
                                            <span className="text-gray-700">
                                                Custom skill assessments
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Zap className="h-5 w-5 text-[rgb(148,242,127)]" />
                                            <span className="text-gray-700">
                                                Real-time collaboration
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Link href="/companies/login">
                                            <Button className="w-full rounded-xl bg-[rgb(148,242,127)] py-3 font-semibold text-[rgba(14,15,12,1)] shadow-lg transition-all duration-300 hover:bg-[rgb(148,242,127)]/90 hover:shadow-xl">
                                                Login
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </Link>
                                        <div className="text-center text-gray-600">
                                            Dont have an account?{' '}
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
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredCard === 'companies' ? 1 : 0 }}
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgb(148,242,127)]/5 to-transparent"
                                />
                            </Card>
                        </motion.div>

                        {/* Developers Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            onHoverStart={() => setHoveredCard('developers')}
                            onHoverEnd={() => setHoveredCard(null)}
                            className="group relative"
                        >
                            <Card className="relative transform overflow-hidden border border-gray-200 bg-white shadow-lg transition-all duration-500 hover:scale-105 hover:border-[rgb(148,242,127)]/30 hover:shadow-2xl">
                                <CardContent className="p-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(148,242,127)] to-[rgb(148,242,127)]/80 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                        <Code2 className="h-8 w-8 text-[rgba(14,15,12,1)]" />
                                    </div>

                                    <div className="mb-8 text-center">
                                        <div className="mb-4 inline-block rounded-full border border-[rgb(148,242,127)]/20 bg-[rgb(148,242,127)]/10 px-4 py-1">
                                            <span className="text-sm font-medium text-[rgb(148,242,127)]">
                                                COMMUNITY
                                            </span>
                                        </div>
                                        <h2 className="mb-4 text-3xl font-bold text-gray-900">
                                            For Developers
                                        </h2>
                                        <p className="leading-relaxed text-gray-600">
                                            Join millions of developers worldwide. Practice coding,
                                            prepare for interviews, and showcase your skills to top
                                            companies.
                                        </p>
                                    </div>

                                    <div className="mb-8 space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Rocket className="h-5 w-5 text-[rgb(148,242,127)]" />
                                            <span className="text-gray-700">
                                                Interactive coding challenges
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Target className="h-5 w-5 text-[rgb(148,242,127)]" />
                                            <span className="text-gray-700">
                                                Interview preparation
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Users className="h-5 w-5 text-[rgb(148,242,127)]" />
                                            <span className="text-gray-700">
                                                Global developer community
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Link href="/developers/login">
                                            <Button className="w-full rounded-xl border border-gray-200 bg-gray-100 py-3 font-semibold text-gray-700 shadow-lg transition-all duration-300 hover:border-[rgb(148,242,127)] hover:bg-[rgb(148,242,127)] hover:text-[rgba(14,15,12,1)] hover:shadow-xl">
                                                Login
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </Link>
                                        <div className="text-center text-gray-600">
                                            Dont have an account?{' '}
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
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredCard === 'developers' ? 1 : 0 }}
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgb(148,242,127)]/5 to-transparent"
                                />
                            </Card>
                        </motion.div>
                    </div>

                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-16 text-center"
                    >
                        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-8 md:grid-cols-4">
                            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-md">
                                <div className="text-2xl font-bold text-[rgb(148,242,127)]">
                                    2M+
                                </div>
                                <div className="text-sm text-gray-600">Developers</div>
                            </div>
                            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-md">
                                <div className="text-2xl font-bold text-[rgb(148,242,127)]">
                                    50K+
                                </div>
                                <div className="text-sm text-gray-600">Companies</div>
                            </div>
                            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-md">
                                <div className="text-2xl font-bold text-[rgb(148,242,127)]">
                                    1M+
                                </div>
                                <div className="text-sm text-gray-600">Challenges</div>
                            </div>
                            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-md">
                                <div className="text-2xl font-bold text-[rgb(148,242,127)]">
                                    99%
                                </div>
                                <div className="text-sm text-gray-600">Satisfaction</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
