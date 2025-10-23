'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    BarChart3,
    Briefcase,
    Building,
    Calendar,
    ChevronDown,
    ClipboardCheck,
    Code,
    CreditCard,
    Database,
    File,
    FileText,
    HardDrive,
    Headphones,
    LayoutDashboard,
    Lock,
    Mail,
    MessageSquare,
    Palette,
    Search,
    Settings,
    Shield,
    User,
    UserCheck,
    Users,
    Users2,
    Zap,
} from 'lucide-react';

interface MenuItemChild {
    label: string;
    href: string;
    permission: string;
}

interface MenuItemProps {
    item: {
        label: string;
        icon: string;
        href?: string;
        permission: string;
        children?: MenuItemChild[];
    };
    collapsed: boolean;
    isExpanded: boolean;
    onToggle: () => void;
}

const iconMap = {
    LayoutDashboard,
    Briefcase,
    UserCheck,
    Calendar,
    MessageSquare,
    Search,
    BarChart3,
    FileText,
    Users2,
    Users,
    Settings,
    Building,
    PieChart: BarChart3,
    Mail,
    File,
    Zap,
    // Admin menu icons
    Activity,
    ClipboardCheck,
    Code,
    CreditCard,
    Database,
    HardDrive,
    Headphones,
    Lock,
    Palette,
    Shield,
    User,
};

export function MenuItem({ item, collapsed, isExpanded, onToggle }: MenuItemProps) {
    const pathname = usePathname();
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.href ? pathname === item.href : false;

    const IconComponent = iconMap[item.icon as keyof typeof iconMap] || LayoutDashboard;

    const handleClick = useCallback(() => {
        if (hasChildren) {
            onToggle();
        }
    }, [hasChildren, onToggle]);

    // If it's a simple link without children
    if (!hasChildren && item.href) {
        return (
            <Link href={item.href} className="block">
                <div
                    className={`mx-2 mb-1 flex cursor-pointer items-center rounded-lg px-3 py-2.5 transition-all duration-200 ${
                        collapsed ? 'justify-center' : 'pr-4'
                    } ${
                        isActive
                            ? 'bg-gray-100 font-medium text-gray-900'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    } `}
                >
                    <div className="flex min-w-0 flex-1 items-center">
                        <IconComponent className="h-5 w-5 flex-shrink-0" />
                        <AnimatePresence mode="wait">
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -8 }}
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                    className="ml-3 overflow-hidden text-sm font-medium whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Link>
        );
    }

    // If it has children (expandable menu)
    return (
        <div>
            <button
                onClick={handleClick}
                className={`mx-2 mb-1 flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 transition-all duration-200 ${
                    collapsed ? 'justify-center' : 'justify-between pr-4'
                } ${
                    isExpanded
                        ? 'bg-gray-100 font-medium text-gray-900'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                } `}
            >
                <div className="flex min-w-0 flex-1 items-center">
                    <IconComponent className="h-5 w-5 flex-shrink-0" />
                    <AnimatePresence mode="wait">
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="ml-3 overflow-hidden text-sm font-medium whitespace-nowrap"
                            >
                                {item.label}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                    {!collapsed && hasChildren && (
                        <motion.div
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="ml-2"
                        >
                            <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <ChevronDown className="h-4 w-4" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            {/* Submenu items */}
            <AnimatePresence mode="wait">
                {hasChildren && !collapsed && isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="mt-1 ml-6 space-y-1 border-l border-gray-200 pl-4">
                            {item.children?.map((child, index) => {
                                const isChildActive = pathname === child.href;

                                return (
                                    <motion.div
                                        key={child.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link href={child.href}>
                                            <div
                                                className={`cursor-pointer rounded-lg px-3 py-2 pr-4 text-sm transition-all duration-200 ${
                                                    isChildActive
                                                        ? 'bg-gray-100 font-medium text-gray-900'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                } `}
                                            >
                                                {child.label}
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
