'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, Search } from 'lucide-react';
import { useAdmin } from '../providers/AdminProvider';
import { NotificationsDropdown } from './NotificationsDropdown';
import { ProfileDropdown } from './ProfileDropdown';
import { QuickActions } from './QuickActions';

export function AdminHeader() {
    const { user, toggleSidebar, toggleMobileSidebar } = useAdmin();
    const { scrollY } = useScroll();

    // Transform values for smooth animations
    const headerHeight = useTransform(scrollY, [0, 100], [88, 72]); // 88px to 72px
    const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.95]);
    const headerBlur = useTransform(scrollY, [0, 100], [0, 10]);
    const headerShadow = useTransform(scrollY, [0, 50], [0, 1]);
    const headerY = useTransform(scrollY, [0, 100], [0, -8]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <motion.header
            style={{
                height: headerHeight,
                opacity: headerOpacity,
                backdropFilter: `blur(${headerBlur}px)`,
                y: headerY,
            }}
            className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-out"
        >
            <motion.div
                className="flex h-full items-center justify-between px-6"
                style={{
                    boxShadow: useTransform(
                        headerShadow,
                        [0, 1],
                        [
                            'none',
                            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        ],
                    ),
                }}
            >
                <div className="flex items-center space-x-4">
                    {/* Mobile menu button - always visible on mobile */}
                    <motion.button
                        onClick={toggleMobileSidebar}
                        className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle mobile menu"
                    >
                        <Menu className="h-5 w-5 text-gray-600" />
                    </motion.button>

                    {/* Desktop sidebar toggle - only visible on desktop */}
                    <motion.button
                        onClick={toggleSidebar}
                        className="hidden rounded-lg p-2 transition-colors hover:bg-gray-100 lg:block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="h-5 w-5 text-gray-600" />
                    </motion.button>

                    <div className="hidden lg:block">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl font-semibold text-gray-800"
                        >
                            {getGreeting()}, {user?.name?.split(' ')[0]}!
                        </motion.h1>
                        <div className="mt-1 text-sm text-gray-500">
                            Role: <span className="font-medium capitalize">{user?.role}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Quick Actions */}
                    <QuickActions hasPermission={useAdmin().hasPermission} />

                    {/* Search Bar */}
                    <motion.div
                        className="relative hidden md:block"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                    >
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 transition-all duration-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                        />
                    </motion.div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-3">
                        {/* Dynamic Notifications */}
                        <NotificationsDropdown />

                        {/* Dynamic Profile */}
                        <ProfileDropdown />
                    </div>
                </div>
            </motion.div>
        </motion.header>
    );
}
