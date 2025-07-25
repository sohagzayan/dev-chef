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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            className={`mx-auto w-full ${className}`}
        >
            <Card className="border border-gray-200 bg-white shadow-xl">
                <CardHeader className="pt-6 pb-6 text-center">
                    {Icon && (
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[rgb(148,242,127)] to-[rgb(148,242,127)]/80 shadow-md">
                            <Icon className="h-6 w-6 text-[rgba(14,15,12,1)]" />
                        </div>
                    )}
                    <h1 className="mb-2 text-xl font-bold text-gray-900">{title}</h1>
                    <p className="text-sm leading-relaxed text-gray-600">{subtitle}</p>
                </CardHeader>
                <CardContent className="px-6 pb-6">{children}</CardContent>
            </Card>
        </motion.div>
    );
}
