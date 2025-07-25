'use client';

import type React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface AuthHeaderProps {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    backLink?: string;
    rightContent?: React.ReactNode;
}

export function AuthHeader({ title, icon: Icon, backLink = '/', rightContent }: AuthHeaderProps) {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 border-b border-gray-200 bg-white/95 px-6 py-4 shadow-sm backdrop-blur-sm"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link
                    href={backLink}
                    className="flex items-center space-x-2 font-medium text-gray-600 transition-colors hover:text-emerald-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>
                <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-100 to-teal-100">
                        <Icon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{title}</span>
                </div>
                {rightContent && <div>{rightContent}</div>}
            </div>
        </motion.header>
    );
}
