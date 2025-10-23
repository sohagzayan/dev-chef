'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href: string;
    isCurrent?: boolean;
}

export function BreadcrumbNav() {
    const pathname = usePathname();

    // Generate breadcrumb items based on current path
    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        const segments = pathname.split('/').filter(Boolean);
        const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/admin' }];

        let currentPath = '/admin';

        segments.forEach((segment, index) => {
            if (segment === 'admin') return; // Skip the admin segment

            currentPath += `/${segment}`;

            // Convert segment to readable label
            const label = segment
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            breadcrumbs.push({
                label,
                href: currentPath,
                isCurrent: index === segments.length - 1,
            });
        });

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    if (breadcrumbs.length <= 1) {
        return null; // Don't show breadcrumbs on the main admin page
    }

    return (
        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((item, index) => (
                <div key={item.href} className="flex items-center space-x-2">
                    {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}

                    {item.isCurrent ? (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-medium text-gray-900"
                        >
                            {item.label}
                        </motion.span>
                    ) : (
                        <Link
                            href={item.href}
                            className="transition-colors hover:text-gray-900 hover:underline"
                        >
                            {index === 0 ? (
                                <div className="flex items-center space-x-1">
                                    <Home className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </div>
                            ) : (
                                item.label
                            )}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
