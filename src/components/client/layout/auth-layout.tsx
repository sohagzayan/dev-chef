'use client';

import type React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    backLink?: string;
    rightContent?: React.ReactNode;
    variant?: 'default' | 'developer' | 'company';
}

export function AuthLayout({
    children,
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
                        <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-blue-500 opacity-2 mix-blend-multiply blur-3xl filter"></div>
                        <div className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-purple-500 opacity-2 mix-blend-multiply blur-3xl filter"></div>
                    </>
                )}
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 px-6 py-4"
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href={backLink}
                            className="inline-flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 md:text-base"
                        >
                            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                            <span>Back</span>
                        </Link>
                    </motion.div>
                    {rightContent && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="hidden md:block"
                        >
                            {rightContent}
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-8 md:px-6 md:py-12">
                {children}
            </div>
        </div>
    );
}
