'use client';

import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LoadingButtonProps {
    isLoading: boolean;
    loadingText?: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

export function LoadingButton({
    isLoading,
    loadingText = 'Loading...',
    children,
    className,
    disabled,
    type = 'button',
    onClick,
}: LoadingButtonProps) {
    return (
        <Button
            type={type}
            onClick={onClick}
            disabled={isLoading || disabled}
            className={cn(
                'w-full rounded-xl bg-[rgb(148,242,127)] py-3 font-semibold text-[rgba(14,15,12,1)] transition-all duration-300 hover:bg-[rgb(148,242,127)]/90',
                className,
            )}
        >
            {isLoading ? (
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[rgba(14,15,12,1)]/30 border-t-[rgba(14,15,12,1)]"></div>
                    <span>{loadingText}</span>
                </div>
            ) : (
                children
            )}
        </Button>
    );
}
