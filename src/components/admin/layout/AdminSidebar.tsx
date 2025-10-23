'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useWindowSize from '@/hooks/useWindowSize';
import { useAdmin } from '../providers/AdminProvider';
import { SidebarLogo } from './SidebarLogo';
import { SidebarMenu } from './SidebarMenu';
import { SidebarToggle } from './SidebarToggle';

export function AdminSidebar() {
    const { sidebarOpen, mobileSidebarOpen, setMobileSidebarOpen } = useAdmin();
    const { width } = useWindowSize();
    const [isHovered, setIsHovered] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);

    // Ensure we're on the client before using responsive logic
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Default to desktop behavior until we know the actual screen size
    const isMobile = isClient ? width < 1024 : false; // lg breakpoint
    const isTablet = isClient ? width >= 768 && width < 1024 : false; // md to lg breakpoint
    const isDesktop = isClient ? width >= 1024 : true;

    // Determine if sidebar should be visible
    const shouldShow = isMobile ? mobileSidebarOpen : sidebarOpen;

    // Determine sidebar width based on state and device
    const getSidebarWidth = () => {
        if (isMobile) {
            return shouldShow ? 280 : 0;
        }
        if (isTablet) {
            return shouldShow ? 280 : 80;
        }
        // Desktop: support hover expansion
        if (isHovered && !sidebarOpen) {
            return 280; // Expand on hover
        }
        return sidebarOpen ? 280 : 80;
    };

    // Auto-hide sidebar on mobile when clicking outside
    useEffect(() => {
        if (isMobile && mobileSidebarOpen) {
            const handleClickOutside = (event: MouseEvent) => {
                const target = event.target as Element;
                if (!target.closest('[data-sidebar]')) {
                    setMobileSidebarOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isMobile, mobileSidebarOpen, setMobileSidebarOpen]);

    // Prevent body scroll when mobile sidebar is open
    useEffect(() => {
        if (isMobile && mobileSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobile, mobileSidebarOpen]);

    // Touch gesture support for mobile
    useEffect(() => {
        if (!isMobile || !sidebarRef.current) return;

        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        const handleTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            if (!isDragging) return;
            isDragging = false;

            const diffX = startX - currentX;
            const threshold = 50; // Minimum swipe distance

            if (diffX > threshold && mobileSidebarOpen) {
                // Swipe left to close
                setMobileSidebarOpen(false);
            }
        };

        const sidebar = sidebarRef.current;
        sidebar.addEventListener('touchstart', handleTouchStart, { passive: true });
        sidebar.addEventListener('touchmove', handleTouchMove, { passive: true });
        sidebar.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            sidebar.removeEventListener('touchstart', handleTouchStart);
            sidebar.removeEventListener('touchmove', handleTouchMove);
            sidebar.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMobile, mobileSidebarOpen, setMobileSidebarOpen]);

    // Don't render responsive behavior until we're on the client
    if (!isClient) {
        return (
            <aside
                data-sidebar
                className="relative z-[60] flex h-full flex-col border-r border-gray-200 bg-white"
                style={{ width: '280px' }}
            >
                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                    <SidebarLogo collapsed={false} />
                    <SidebarToggle />
                </div>
                <SidebarMenu collapsed={false} />
            </aside>
        );
    }

    return (
        <>
            {/* Mobile overlay */}
            {isMobile && mobileSidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[55] bg-black/50 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <AnimatePresence mode="wait">
                <motion.aside
                    ref={sidebarRef}
                    data-sidebar
                    initial={{
                        width: isMobile ? 0 : sidebarOpen ? 280 : 80,
                        opacity: isMobile ? 0 : 1,
                        x: isMobile ? -280 : 0,
                    }}
                    animate={{
                        width: getSidebarWidth(),
                        opacity: shouldShow ? 1 : isMobile ? 0 : 1,
                        x: isMobile ? (shouldShow ? 0 : -280) : 0,
                    }}
                    exit={{
                        width: isMobile ? 0 : sidebarOpen ? 280 : 80,
                        opacity: isMobile ? 0 : 1,
                        x: isMobile ? -280 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className={`${
                        isMobile ? 'fixed top-0 left-0 z-[60] h-full shadow-2xl' : 'relative z-[60]'
                    } flex h-full flex-col border-r border-gray-200 bg-white transition-colors duration-300 ${
                        isDesktop && isHovered && !sidebarOpen ? 'bg-gray-50' : ''
                    }`}
                    onMouseEnter={() => isDesktop && setIsHovered(true)}
                    onMouseLeave={() => isDesktop && setIsHovered(false)}
                >
                    <div
                        className={`flex items-center justify-between border-b border-gray-200 ${
                            isMobile
                                ? !shouldShow
                                : !sidebarOpen && !isHovered
                                  ? 'px-3 py-4'
                                  : 'p-4'
                        }`}
                    >
                        <div className="flex-1">
                            <SidebarLogo
                                collapsed={isMobile ? !shouldShow : !sidebarOpen && !isHovered}
                            />
                        </div>
                        <SidebarToggle />
                    </div>

                    <SidebarMenu collapsed={isMobile ? !shouldShow : !sidebarOpen && !isHovered} />
                </motion.aside>
            </AnimatePresence>
        </>
    );
}
