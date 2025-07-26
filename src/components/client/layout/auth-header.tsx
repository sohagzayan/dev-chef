'use client';

import type React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface AuthHeaderProps {
    backLink?: string;
    rightContent?: React.ReactNode;
}

export function AuthHeader({ backLink = '/', rightContent }: AuthHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 px-6 py-4"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        href={backLink}
                        className="inline-flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Link>
                </motion.div>
                {rightContent && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {rightContent}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
