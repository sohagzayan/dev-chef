'use client';

import type { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
    className?: string;
}

export function FormField({
    label,
    htmlFor,
    error,
    required,
    children,
    className,
}: FormFieldProps) {
    return (
        <div className={cn('space-y-2', className)}>
            <Label htmlFor={htmlFor} className="flex items-center gap-1 font-medium text-gray-700">
                {label}
                {required && <span className="text-[#f75353]">*</span>}
            </Label>
            {children}
            {error && (
                <p className="animate-fade-in text-sm text-[#f75353]" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
