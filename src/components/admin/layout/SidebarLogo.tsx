'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface SidebarLogoProps {
    collapsed: boolean;
}

export function SidebarLogo({ collapsed }: SidebarLogoProps) {
    return (
        <motion.div
            className={`flex items-center ${collapsed ? 'w-full justify-center' : 'min-w-0'}`}
            animate={{ opacity: collapsed ? 0.7 : 1 }}
        >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-600">
                <span className="text-sm font-bold text-white">CR</span>
            </div>

            <AnimatePresence mode="wait">
                {!collapsed && (
                    <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="ml-3 flex-shrink-0 overflow-hidden text-xl font-bold whitespace-nowrap text-gray-800"
                    >
                        Rizz
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
