'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, X } from 'lucide-react';
import useWindowSize from '@/hooks/useWindowSize';
import { useAdmin } from '../providers/AdminProvider';

export function SidebarToggle() {
    const { sidebarOpen, toggleSidebar, mobileSidebarOpen, toggleMobileSidebar } = useAdmin();
    const { width } = useWindowSize();
    const [isClient, setIsClient] = useState(false);

    // Ensure we're on the client before using window size
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Default to desktop behavior until we know the actual screen size
    const isMobile = isClient ? width < 1024 : false; // lg breakpoint

    // On mobile, show X icon to close, on desktop show chevron to toggle
    const isMobileOpen = isMobile && mobileSidebarOpen;
    const isDesktopCollapsed = !isMobile && !sidebarOpen;

    const handleClick = () => {
        if (isMobile) {
            toggleMobileSidebar();
        } else {
            toggleSidebar();
        }
    };

    // Don't render responsive behavior until we're on the client
    if (!isClient) {
        return (
            <motion.button
                onClick={toggleSidebar}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle sidebar"
            >
                <motion.div animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                </motion.div>
            </motion.button>
        );
    }

    return (
        <motion.button
            onClick={handleClick}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMobile ? 'Close mobile menu' : 'Toggle sidebar'}
        >
            {isMobile ? (
                // Mobile: show X icon when open
                <motion.div
                    animate={{ rotate: isMobileOpen ? 0 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <X className="h-5 w-5 text-gray-600" />
                </motion.div>
            ) : (
                // Desktop: show chevron that rotates based on state
                <motion.div
                    animate={{ rotate: isDesktopCollapsed ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                </motion.div>
            )}
        </motion.button>
    );
}
