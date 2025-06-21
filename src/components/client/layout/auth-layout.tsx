'use client';

import type React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    backLink?: string;
    rightContent?: React.ReactNode;
    variant?: 'default' | 'developer' | 'company';
}

export function AuthLayout({
    children,
    title,
    icon: Icon,
    backLink = '/',
    rightContent,
    variant = 'default',
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gray-50">
            {/* Subtle Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-[rgb(148,242,127)] opacity-5 mix-blend-multiply blur-3xl filter"></div>
                <div className="absolute right-20 bottom-20 h-80 w-80 rounded-full bg-[rgb(148,242,127)] opacity-5 mix-blend-multiply blur-3xl filter"></div>

                {/* Developer-specific decorations */}
                {variant === 'developer' && (
                    <>
                        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-[rgb(148,242,127)] opacity-3 mix-blend-multiply blur-3xl filter"></div>
                        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-[rgb(148,242,127)] opacity-3 mix-blend-multiply blur-3xl filter"></div>
                        <div className="absolute top-20 right-20 font-mono text-sm text-[rgb(148,242,127)]/10">
                            <div>{'{ "welcome": "back" }'}</div>
                        </div>
                        <div className="absolute bottom-20 left-20 font-mono text-sm text-[rgb(148,242,127)]/10">
                            <div>{'console.log("Hello, Developer!");'}</div>
                        </div>
                    </>
                )}

                {/* Company-specific decorations */}
                {variant === 'company' && (
                    <>
                        <div className="absolute top-1/3 right-1/3 h-48 w-48 rounded-full bg-[rgb(148,242,127)] opacity-3 mix-blend-multiply blur-3xl filter"></div>
                        <div className="absolute bottom-1/3 left-1/3 h-56 w-56 rounded-full bg-[rgb(148,242,127)] opacity-3 mix-blend-multiply blur-3xl filter"></div>
                    </>
                )}
            </div>

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 border-b border-gray-100 bg-white p-6 shadow-sm"
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link
                        href={backLink}
                        className="flex items-center space-x-2 text-gray-700 transition-colors hover:text-[rgb(148,242,127)]"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Home</span>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <Icon className="h-6 w-6 text-[rgb(148,242,127)]" />
                        <span className="text-xl font-bold text-gray-900">{title}</span>
                    </div>
                    {rightContent && <div>{rightContent}</div>}
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-6">
                {children}
            </div>
        </div>
    );
}
