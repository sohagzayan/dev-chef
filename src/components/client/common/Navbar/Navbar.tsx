'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Building2, ShoppingCart, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SessionExpiryModal } from '@/components/ui/session-expiry-modal';
import { useAuth } from '@/context/AuthContext';
import { getNavItems } from '@/utils/client/common/navbar';
import Logo from '../Logo';
import MobileMenu from './components/MobileMenu';
import UserMenu from './components/UserMenu';
import '@/app/globals.css';

export default function Navbar() {
    const {
        user,
        isAuthenticated,
        notificationCount,
        logout,
        showSessionExpiryModal,
        setShowSessionExpiryModal,
    } = useAuth();

    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const [isEmployerMode, setIsEmployerMode] = useState(true);
    const router = useRouter();

    // Create auth state object for compatibility with existing components
    const authState = {
        isAuthenticated,
        user: user
            ? {
                  id: user.id,
                  name: user.name || user.email,
                  email: user.email,
                  role: user.role, // Use the actual role from the auth context
                  avatarUrl: '/placeholder.svg?height=32&width=32',
              }
            : null,
        notificationCount,
    };

    const navItems = getNavItems(authState);

    const handleSignIn = (userType: 'developer' | 'company') => {
        if (userType === 'company') {
            router.push('/companies/login');
        } else {
            router.push('/developers/login');
        }
    };

    const handleSignUp = () => {
        // Redirect to v2 candidate signup flow
        router.push('/enter/sign-up/candidate');
    };

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/90 backdrop-blur-xl transition-all duration-700"
            >
                <motion.div
                    className="flex h-16 items-center px-5"
                    layout
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex items-center gap-2"
                    >
                        <Logo authState={authState} />
                    </motion.div>

                    {/* Mobile Menu - Visible on lg and below */}
                    <div className="lg:hidden">
                        <MobileMenu
                            isOpen={isMobileMenuOpen}
                            setIsOpen={setIsMobileMenuOpen}
                            navItems={navItems}
                            authState={authState}
                            toggleAuth={() => {}} // Remove this as we're using context now
                            pathname={pathname}
                        />
                    </div>

                    {/* Desktop Menu - Hidden on mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden lg:ml-8 lg:flex lg:items-center lg:gap-6 lg:text-gray-900"
                        layout
                    >
                        <AnimatePresence mode="wait">
                            {isEmployerMode ? (
                                <motion.div
                                    key="employer-menu"
                                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="flex items-center gap-6"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="cursor-pointer font-medium transition-colors duration-200 hover:text-blue-600"
                                        onClick={() => router.push('/post-a-remote-job')}
                                    >
                                        Post a Job
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="cursor-pointer font-medium transition-colors duration-200 hover:text-blue-600"
                                        onClick={() => router.push('/how-to-find-remote-jobs')}
                                    >
                                        Remote Recruiting
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="candidate-menu"
                                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="flex items-center gap-6"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="cursor-pointer font-medium transition-colors duration-200 hover:text-blue-600"
                                        onClick={() => router.push('/remote-jobs')}
                                    >
                                        Remote Jobs
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="cursor-pointer font-medium transition-colors duration-200 hover:text-blue-600"
                                        onClick={() => router.push('/find-a-remote-job')}
                                    >
                                        Find a Remote Job
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="cursor-pointer font-medium transition-colors duration-200 hover:text-blue-600"
                                        onClick={() => router.push('/remote-resources')}
                                    >
                                        Remote Resources
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Right side - Auth buttons and menu */}
                    <div className="ml-auto flex items-center gap-2 sm:gap-4">
                        <AnimatePresence mode="wait">
                            {isAuthenticated ? (
                                <motion.div
                                    className="flex items-center gap-2"
                                    key="authenticated"
                                    initial={{ opacity: 0, x: 30, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 30, scale: 0.8 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                >
                                    {/* Notifications */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                whileTap={{ scale: 0.9 }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 400,
                                                    damping: 10,
                                                }}
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="relative rounded-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-sm"
                                                >
                                                    <Bell className="h-4 w-4 text-gray-600 transition-colors duration-300" />
                                                    {notificationCount > 0 && (
                                                        <motion.div
                                                            initial={{ scale: 0, rotate: -180 }}
                                                            animate={{ scale: 1, rotate: 0 }}
                                                            transition={{
                                                                type: 'spring',
                                                                stiffness: 500,
                                                                damping: 15,
                                                            }}
                                                        >
                                                            <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-xs shadow-lg">
                                                                {notificationCount}
                                                            </Badge>
                                                        </motion.div>
                                                    )}
                                                </Button>
                                            </motion.div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="w-80 border border-gray-200 bg-white/95 shadow-xl backdrop-blur-xl"
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="border-b border-gray-200 p-3 font-medium text-gray-900"
                                            >
                                                Notifications
                                            </motion.div>
                                            <AnimatePresence>
                                                {[...Array(notificationCount)].map((_, i) => (
                                                    <motion.div
                                                        key={`notification-${i}`}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{
                                                            delay: i * 0.1,
                                                            duration: 0.3,
                                                        }}
                                                    >
                                                        <DropdownMenuItem className="cursor-pointer p-3 transition-all duration-200 hover:bg-emerald-50">
                                                            <div className="flex items-start gap-3">
                                                                <motion.div
                                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100"
                                                                    whileHover={{
                                                                        scale: 1.1,
                                                                        rotate: 5,
                                                                    }}
                                                                >
                                                                    <Bell className="h-4 w-4 text-emerald-600" />
                                                                </motion.div>
                                                                <div>
                                                                    <p className="font-medium text-gray-900">
                                                                        New notification {i + 1}
                                                                    </p>
                                                                    <p className="text-sm text-gray-600">
                                                                        You have a new update to
                                                                        check
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </DropdownMenuItem>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-sm"
                                        >
                                            <ShoppingCart className="h-4 w-4 text-gray-600 transition-colors duration-300" />
                                        </Button>
                                    </motion.div>

                                    <UserMenu authState={authState} toggleAuth={logout} />

                                    {user?.role === 'RECRUITER' && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                            transition={{
                                                delay: 0.4,
                                                type: 'spring',
                                                stiffness: 500,
                                                damping: 15,
                                            }}
                                            whileHover={{ scale: 1.05, rotate: 2 }}
                                        >
                                            <span className="hidden items-center gap-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1 text-sm font-medium text-white shadow-lg sm:flex">
                                                <motion.span
                                                    className="h-2 w-2 rounded-full bg-white/80"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                                Company
                                            </span>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="flex items-center gap-4"
                                    key="unauthenticated"
                                    initial={{ opacity: 0, x: 30, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 30, scale: 0.8 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                >
                                    {/* Post a job here! text - Hidden on mobile */}
                                    <div
                                        className="hidden cursor-pointer items-center gap-1 lg:flex"
                                        onClick={() => {
                                            setIsEmployerMode(true);
                                            router.push('/post-a-remote-job');
                                        }}
                                    >
                                        <span className="font-medium text-yellow-500 underline">
                                            Post a job here!
                                        </span>
                                        <motion.div
                                            animate={{ x: [0, 3, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="text-yellow-500"
                                        >
                                            →
                                        </motion.div>
                                    </div>

                                    {/* Toggle button - Show text on md+ screens */}
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="cursor-pointer rounded-lg border border-gray-300 bg-white font-medium text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:shadow-sm"
                                            onClick={() => setIsEmployerMode(!isEmployerMode)}
                                        >
                                            <motion.span
                                                key={isEmployerMode ? 'employers' : 'candidates'}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="hidden md:inline"
                                            >
                                                {isEmployerMode
                                                    ? 'For Employers'
                                                    : 'For Candidates'}
                                            </motion.span>
                                            <span className="md:hidden">
                                                {isEmployerMode ? 'Employers' : 'Candidates'}
                                            </span>
                                        </Button>
                                    </motion.div>

                                    {/* Login dropdown - Hidden on mobile */}
                                    <div className="hidden lg:block">
                                        <DropdownMenu
                                            open={loginDropdownOpen}
                                            onOpenChange={setLoginDropdownOpen}
                                        >
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="cursor-pointer rounded-lg font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    Login
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-56 border border-gray-200 bg-white/95 shadow-xl backdrop-blur-xl"
                                            >
                                                <DropdownMenuItem
                                                    onClick={() => handleSignIn('developer')}
                                                    className="cursor-pointer p-3 transition-all duration-200 hover:bg-emerald-50"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                                                            <User className="h-4 w-4 text-emerald-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                Candidate Login
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                For developers & students
                                                            </p>
                                                        </div>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleSignIn('company')}
                                                    className="cursor-pointer p-3 transition-all duration-200 hover:bg-emerald-50"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                                            <Building2 className="h-4 w-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                Company Login
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                For recruiters & HR
                                                            </p>
                                                        </div>
                                                    </div>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Sign Up - Hidden on mobile */}
                                    <Button
                                        onClick={handleSignUp}
                                        size="sm"
                                        className="hidden cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl sm:block"
                                    >
                                        Sign up
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.header>

            {/* Session Expiry Modal */}
            <SessionExpiryModal
                isOpen={showSessionExpiryModal}
                onClose={() => setShowSessionExpiryModal(false)}
            />
        </>
    );
}
