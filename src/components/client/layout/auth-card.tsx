'use client';

import type React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface AuthCardProps {
    icon: React.ComponentType<{ className?: string }>;
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
            className={`mx-auto w-full max-w-md ${className}`}
        >
            <Card className="border border-gray-200 bg-white shadow-2xl">
                <CardHeader className="pb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(148,242,127)] to-[rgb(148,242,127)]/80 shadow-lg">
                        <Icon className="h-8 w-8 text-[rgba(14,15,12,1)]" />
                    </div>
                    <h1 className="mb-2 text-2xl font-bold text-gray-900">{title}</h1>
                    <p className="text-gray-600">{subtitle}</p>
                </CardHeader>
                <CardContent className="space-y-6">{children}</CardContent>
            </Card>
        </motion.div>
    );
}
