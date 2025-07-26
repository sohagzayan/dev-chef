'use client';

import type React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface AuthCardProps {
    icon?: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle: string;
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function AuthCard({
    icon: Icon,
    title,
    subtitle,
    children,
    delay = 0,
    className,
}: AuthCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.6,
                delay,
                type: 'spring',
                stiffness: 100,
                damping: 15,
            }}
            className={`mx-auto w-full ${className}`}
        >
            <Card className="border-0 bg-white/90 shadow-lg ring-1 ring-gray-100/30 backdrop-blur-sm">
                <CardHeader className="pt-8 pb-6 text-center">
                    {Icon && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: delay + 0.2,
                                type: 'spring',
                                stiffness: 200,
                            }}
                            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md"
                        >
                            <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                    )}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: delay + 0.3 }}
                        className="mb-3 text-2xl font-bold text-gray-900"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: delay + 0.4 }}
                        className="text-sm leading-relaxed text-gray-600"
                    >
                        {subtitle}
                    </motion.p>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: delay + 0.5 }}
                    >
                        {children}
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
