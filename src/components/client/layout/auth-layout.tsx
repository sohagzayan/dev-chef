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
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Enhanced Background with Animations */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Base background elements */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.05, 0.08, 0.05],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-20 left-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mix-blend-multiply blur-3xl filter"
                />
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.05, 0.08, 0.05],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2,
                    }}
                    className="absolute right-20 bottom-20 h-80 w-80 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 mix-blend-multiply blur-3xl filter"
                />

                {/* Developer-specific decorations */}
                {variant === 'developer' && (
                    <>
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.03, 0.06, 0.03],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mix-blend-multiply blur-3xl filter"
                        />
                        <motion.div
                            animate={{
                                y: [0, 20, 0],
                                opacity: [0.03, 0.06, 0.03],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1,
                            }}
                            className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 mix-blend-multiply blur-3xl filter"
                        />
                        <motion.div
                            animate={{ opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-20 right-20 font-mono text-sm text-green-500"
                        >
                            <div>{'{ "welcome": "back" }'}</div>
                        </motion.div>
                        <motion.div
                            animate={{ opacity: [0.1, 0.2, 0.1] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 2,
                            }}
                            className="absolute bottom-20 left-20 font-mono text-sm text-green-500"
                        >
                            <div>{'console.log("Hello, Developer!");'}</div>
                        </motion.div>
                    </>
                )}

                {/* Company-specific decorations */}
                {variant === 'company' && (
                    <>
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.03, 0.06, 0.03],
                            }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute top-1/3 right-1/3 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mix-blend-multiply blur-3xl filter"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.03, 0.06, 0.03],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 3,
                            }}
                            className="absolute bottom-1/3 left-1/3 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mix-blend-multiply blur-3xl filter"
                        />
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                opacity: [0.02, 0.04, 0.02],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1,
                            }}
                            className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mix-blend-multiply blur-3xl filter"
                        />
                        <motion.div
                            animate={{
                                y: [0, 15, 0],
                                opacity: [0.02, 0.04, 0.02],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 2,
                            }}
                            className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 mix-blend-multiply blur-3xl filter"
                        />
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
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        <Link
                            href={backLink}
                            className="inline-flex items-center space-x-2 rounded-full border border-gray-200/50 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-gray-900 hover:shadow-lg md:text-base"
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
