'use client';

import Link from 'next/link';
import { m } from 'framer-motion';

export interface SocialButtonProps {
    label: string; // accessible label
    children: React.ReactNode; // icon or letters
    href?: string; // if provided, renders Link
    onClick?: () => void;
    className?: string;
}

export default function SocialButton({
    label,
    children,
    href,
    onClick,
    className = '',
}: SocialButtonProps) {
    const base = (
        <m.span
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={
                `inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-base font-bold text-gray-900 shadow-sm transition-[box-shadow,transform] ` +
                `hover:shadow-md active:shadow-sm` +
                className
            }
            aria-label={label}
        >
            {children}
        </m.span>
    );

    if (href) {
        return (
            <Link href={href} aria-label={label} className="inline-block">
                {base}
            </Link>
        );
    }
    return (
        <button type="button" onClick={onClick} aria-label={label} className="inline-block">
            {base}
        </button>
    );
}
