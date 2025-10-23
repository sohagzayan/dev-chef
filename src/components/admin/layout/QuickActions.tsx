'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BarChart3,
    Bell,
    FileText,
    Mail,
    Plus,
    Search,
    Settings,
    Shield,
    Users,
    Zap,
} from 'lucide-react';

interface QuickAction {
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    color: string;
    permission: string;
}

interface QuickActionsProps {
    hasPermission: (permission: string) => boolean;
}

export function QuickActions({ hasPermission }: QuickActionsProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded]);

    // Close dropdown when pressing Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsExpanded(false);
            }
        };

        if (isExpanded) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isExpanded]);

    const toggleDropdown = () => {
        setIsExpanded(!isExpanded);
    };

    const quickActions: QuickAction[] = [
        {
            label: 'Add User',
            description: 'Create a new user account',
            icon: Users,
            href: '/admin/users',
            color: 'bg-blue-500 hover:bg-blue-600',
            permission: 'users',
        },
        {
            label: 'View Reports',
            description: 'Access system reports and analytics',
            icon: BarChart3,
            href: '/admin/reports',
            color: 'bg-green-500 hover:bg-green-600',
            permission: 'analytics',
        },
        {
            label: 'System Settings',
            description: 'Configure system preferences',
            icon: Settings,
            href: '/admin/settings',
            color: 'bg-purple-500 hover:bg-purple-600',
            permission: 'settings',
        },
        {
            label: 'Notifications',
            description: 'Manage system notifications',
            icon: Bell,
            href: '/admin/notifications',
            color: 'bg-orange-500 hover:bg-orange-600',
            permission: 'dashboard',
        },
        {
            label: 'System Logs',
            description: 'View system activity logs',
            icon: FileText,
            href: '/admin/logs',
            color: 'bg-gray-500 hover:bg-gray-600',
            permission: 'dashboard',
        },
        {
            label: 'Backup System',
            description: 'Create system backups',
            icon: Zap,
            href: '/admin/backup',
            color: 'bg-red-500 hover:bg-red-600',
            permission: 'settings',
        },
    ];

    const filteredActions = quickActions.filter((action) => hasPermission(action.permission));

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Quick Actions Button */}
            <motion.button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Toggle quick actions"
                aria-expanded={isExpanded}
            >
                <Zap className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Quick Actions</span>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Search className="h-4 w-4 text-gray-400" />
                </motion.div>
            </motion.button>

            {/* Quick Actions Dropdown */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg"
                    >
                        <div className="p-4">
                            <h3 className="mb-3 text-sm font-semibold text-gray-900">
                                Quick Access
                            </h3>

                            <div className="grid grid-cols-2 gap-3">
                                {filteredActions.map((action, index) => (
                                    <motion.div
                                        key={action.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={action.href}
                                            onClick={() => setIsExpanded(false)}
                                            className="block rounded-lg border border-gray-100 p-3 transition-all duration-200 hover:border-gray-200 hover:shadow-sm"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`rounded-lg p-2 ${action.color}`}>
                                                    <action.icon className="h-4 w-4 text-white" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900">
                                                        {action.label}
                                                    </p>
                                                    <p className="truncate text-xs text-gray-500">
                                                        {action.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {filteredActions.length === 0 && (
                                <div className="py-4 text-center text-sm text-gray-500">
                                    No quick actions available
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
