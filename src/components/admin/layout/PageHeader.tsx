'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BreadcrumbNav } from './BreadcrumbNav';

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: ReactNode;
    showBreadcrumbs?: boolean;
}

export function PageHeader({
    title,
    description,
    children,
    showBreadcrumbs = true,
}: PageHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
        >
            {showBreadcrumbs && <BreadcrumbNav />}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="text-3xl font-bold text-gray-900"
                    >
                        {title}
                    </motion.h1>

                    {description && (
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="mt-2 text-lg text-gray-600"
                        >
                            {description}
                        </motion.p>
                    )}
                </div>

                {children && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="flex items-center space-x-3"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
