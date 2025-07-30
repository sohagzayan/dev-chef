'use client';

import { useEffect, useState } from 'react';
import { Building2, Shield, Sparkles, Users, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { LoginForm } from './components/login-form';

export default function CompanyLogin() {
    const [mounted, setMounted] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);

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
                default:
                    return animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4';
            }
        };

        return (
            <div
                className={`${className || ''} transition-all duration-1000 ease-out ${getAnimationClasses()}`}
                style={{ transitionDelay: `${delay}ms` }}
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
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Subtle gradient overlay */}
                <AnimatedDiv
                    className="absolute inset-0 bg-gradient-to-br from-green-100/10 via-transparent to-emerald-100/10"
                    animationType="fadeIn"
                    delay={0}
                ></AnimatedDiv>

                {/* Animated floating particles */}
                <AnimatedDiv
                    className="absolute top-20 left-10 h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 opacity-30"
                    animationType="bounceIn"
                    delay={500}
                ></AnimatedDiv>
                <AnimatedDiv
                    className="absolute right-20 bottom-32 h-1 w-1 animate-bounce rounded-full bg-green-300 opacity-20"
                    animationType="bounceIn"
                    delay={800}
                ></AnimatedDiv>
                <AnimatedDiv
                    className="absolute top-1/2 left-1/4 h-1 w-1 animate-ping rounded-full bg-emerald-400 opacity-25"
                    animationType="bounceIn"
                    delay={1100}
                ></AnimatedDiv>

                {/* Animated gradient orbs */}
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

            {/* Main Content */}
            <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
                <div className="mx-auto w-full max-w-5xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* Left Side - Login Form */}
                        <AnimatedDiv
                            className="order-2 lg:order-1"
                            delay={300}
                            animationType="slideInLeft"
                        >
                            <Card className="group relative overflow-hidden border-0 bg-white/90 shadow-xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                                <CardContent className="relative p-8">
                                    <div className="mb-6 text-center">
                                        <AnimatedDiv delay={600} animationType="bounceIn">
                                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                                                <Building2 className="h-8 w-8 text-white transition-transform duration-300 group-hover:rotate-12" />
                                            </div>
                                        </AnimatedDiv>
                                        <AnimatedDiv delay={700} animationType="fadeUp">
                                            <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-700">
                                                Welcome Back!
                                            </h2>
                                        </AnimatedDiv>
                                        <AnimatedDiv delay={800} animationType="fadeUp">
                                            <p className="mt-2 text-gray-600">
                                                Sign in to your company account
                                            </p>
                                        </AnimatedDiv>
                                    </div>

                                    <AnimatedDiv delay={900} animationType="fadeUp">
                                        <LoginForm />
                                    </AnimatedDiv>
                                </CardContent>
                            </Card>
                        </AnimatedDiv>

                        {/* Right Side - Simple & Clean */}
                        <div className="order-1 lg:order-2">
                            <AnimatedDiv
                                className="text-center lg:text-left"
                                delay={400}
                                animationType="slideInRight"
                            >
                                <AnimatedDiv delay={500} animationType="fadeUp">
                                    <div className="mb-6 flex justify-center lg:justify-start">
                                        <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition-all duration-300 hover:scale-105 hover:border-green-300 hover:bg-green-100">
                                            <Sparkles className="mr-1.5 h-3 w-3 animate-pulse" />
                                            Enterprise Platform
                                        </div>
                                    </div>
                                </AnimatedDiv>

                                <AnimatedDiv delay={600} animationType="fadeUp">
                                    <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                                        Enterprise
                                        <span className="block animate-pulse bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                            Solutions
                                        </span>
                                    </h1>
                                </AnimatedDiv>

                                <AnimatedDiv delay={700} animationType="fadeUp">
                                    <p className="mb-8 text-lg text-gray-600">
                                        Streamline your hiring process with our comprehensive
                                        enterprise platform
                                    </p>
                                </AnimatedDiv>

                                {/* Animated Feature List */}
                                <div className="space-y-4">
                                    <AnimatedDiv
                                        delay={800}
                                        animationType="fadeUp"
                                        className="group"
                                    >
                                        <div className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200 group-hover:shadow-md">
                                                <Shield className="h-4 w-4 text-green-600 transition-transform duration-300 group-hover:rotate-12" />
                                            </div>
                                            <span className="text-gray-700 transition-colors duration-300 group-hover:font-medium group-hover:text-green-700">
                                                Enterprise Security
                                            </span>
                                        </div>
                                    </AnimatedDiv>

                                    <AnimatedDiv
                                        delay={900}
                                        animationType="fadeUp"
                                        className="group"
                                    >
                                        <div className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-200 group-hover:shadow-md">
                                                <Users className="h-4 w-4 text-emerald-600 transition-transform duration-300 group-hover:rotate-12" />
                                            </div>
                                            <span className="text-gray-700 transition-colors duration-300 group-hover:font-medium group-hover:text-emerald-700">
                                                Team Collaboration
                                            </span>
                                        </div>
                                    </AnimatedDiv>

                                    <AnimatedDiv
                                        delay={1000}
                                        animationType="fadeUp"
                                        className="group"
                                    >
                                        <div className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200 group-hover:shadow-md">
                                                <Zap className="h-4 w-4 text-green-600 transition-transform duration-300 group-hover:rotate-12" />
                                            </div>
                                            <span className="text-gray-700 transition-colors duration-300 group-hover:font-medium group-hover:text-green-700">
                                                Advanced Analytics
                                            </span>
                                        </div>
                                    </AnimatedDiv>
                                </div>
                            </AnimatedDiv>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
