'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Search, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAuth from '@/hooks/client/common/navbar';
import { cn } from '@/lib/utils';
import { getNavItems } from '@/utils/client/common/navbar';
import Logo from '../Logo';
import DesktopMenu from './components/DesktopMenu';
import MobileMenu from './components/MobileMenu';
import UserMenu from './components/UserMenu';

export default function Navbar() {
    const [authState, setAuthState] = useAuth();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [searchFocused, setSearchFocused] = useState(false);

    const toggleAuth = () => {
        if (authState.isAuthenticated) {
            setAuthState({
                isAuthenticated: false,
                user: null,
                notificationCount: 0,
            });
        } else {
            setAuthState({
                isAuthenticated: true,
                user: {
                    id: 'user-1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'premium',
                    avatarUrl: '/placeholder.svg?height=32&width=32',
                },
                notificationCount: 3,
            });
        }
    };

    const navItems = getNavItems(authState);

    return (
        <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                'sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-500',
                authState.isAuthenticated ? 'bg-white/90 shadow-sm' : '',
            )}
        >
            <div className="container mx-auto flex h-20 items-center">
                <Logo authState={authState} />

                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    setIsOpen={setIsMobileMenuOpen}
                    navItems={navItems}
                    authState={authState}
                    toggleAuth={toggleAuth}
                    pathname={pathname}
                />

                <DesktopMenu
                    navItems={navItems}
                    authState={authState}
                    pathname={pathname}
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                />

                <div className="ml-auto flex items-center gap-2">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden sm:block"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                'rounded-full transition-all duration-300',
                                searchFocused ? 'bg-amber-500/20' : 'hover:bg-amber-500/10',
                            )}
                            onMouseEnter={() => setSearchFocused(true)}
                            onMouseLeave={() => setSearchFocused(false)}
                        >
                            <Search
                                className={cn(
                                    'h-5 w-5 transition-transform duration-300',
                                    searchFocused ? 'scale-110' : '',
                                )}
                            />
                            <span className="sr-only">Search</span>
                        </Button>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {authState.isAuthenticated ? (
                            <motion.div
                                className="flex items-center gap-2"
                                key="authenticated"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Notifications */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="relative"
                                            >
                                                <Bell className="h-5 w-5" />
                                                {authState.notificationCount > 0 && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{
                                                            type: 'spring',
                                                            stiffness: 500,
                                                            damping: 15,
                                                        }}
                                                    >
                                                        <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-xs">
                                                            {authState.notificationCount}
                                                        </Badge>
                                                    </motion.div>
                                                )}
                                            </Button>
                                        </motion.div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-80 bg-white/90 backdrop-blur-md"
                                    >
                                        <div className="border-b p-2 font-medium">
                                            Notifications
                                        </div>
                                        <AnimatePresence>
                                            {[...Array(authState.notificationCount)].map((_, i) => (
                                                <motion.div
                                                    key={`notification-${i}`}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    <DropdownMenuItem className="cursor-pointer p-3">
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                                                                <Bell className="h-4 w-4 text-amber-600" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">
                                                                    New notification {i + 1}
                                                                </p>
                                                                <p className="text-muted-foreground text-sm">
                                                                    You have a new update to check
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </DropdownMenuItem>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="ghost" size="icon">
                                        <ShoppingCart className="h-5 w-5" />
                                    </Button>
                                </motion.div>

                                <UserMenu authState={authState} toggleAuth={toggleAuth} />

                                {authState.user?.role === 'premium' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 0.2,
                                            type: 'spring',
                                            stiffness: 500,
                                            damping: 15,
                                        }}
                                    >
                                        <span className="hidden items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-sm font-medium text-amber-500 sm:flex">
                                            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                                            Premium
                                        </span>
                                    </motion.div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                className="flex items-center gap-2"
                                key="unauthenticated"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hidden sm:block"
                                >
                                    <Button
                                        variant="ghost"
                                        onClick={toggleAuth}
                                        className="text-gray-300 transition-colors duration-300 hover:text-white"
                                    >
                                        Sign in
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        onClick={toggleAuth}
                                        className="bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 hover:from-amber-600 hover:to-amber-700"
                                    >
                                        Sign up
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.header>
    );
}
