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
    );
}
