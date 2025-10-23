'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, ChevronDown, LogOut, Settings, Shield, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/client/use-auth';

export function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            setIsOpen(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!user) {
        return (
            <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="border-blue-200 bg-blue-50 text-blue-700">
                    <Shield className="mr-1 h-3 w-3" />
                    Admin Access
                </Badge>
            </div>
        );
    }

    return (
        <div className="relative">
            <Button
                variant="ghost"
                className="flex h-auto items-center space-x-2 px-3 py-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Avatar className="h-8 w-8">
                    <AvatarImage
                        src={user.profile?.image || ''}
                        alt={user.profile?.name || 'Admin'}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                        {user.profile?.name?.charAt(0) || user.email?.charAt(0) || 'A'}
                    </AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                    <div className="text-sm font-medium text-gray-900">
                        {user.profile?.name || user.email || 'Admin User'}
                    </div>
                    <div className="text-xs text-gray-500">{user.email || 'admin@example.com'}</div>
                </div>
                <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
                    >
                        {/* User Info */}
                        <div className="border-b border-gray-100 px-4 py-3">
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src={user.profile?.image || ''}
                                        alt={user.profile?.name || 'Admin'}
                                    />
                                    <AvatarFallback className="bg-blue-100 text-blue-700">
                                        {user.profile?.name?.charAt(0) ||
                                            user.email?.charAt(0) ||
                                            'A'}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {user.profile?.name || user.email || 'Admin User'}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {user.email || 'admin@example.com'}
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className="mt-1 border-green-200 bg-green-50 text-green-700"
                                    >
                                        <Shield className="mr-1 h-3 w-3" />
                                        Administrator
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                            <button className="flex w-full items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50">
                                <User className="h-4 w-4" />
                                <span>Profile</span>
                            </button>
                            <button className="flex w-full items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50">
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </button>
                            <button className="flex w-full items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50">
                                <Bell className="h-4 w-4" />
                                <span>Notifications</span>
                            </button>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-gray-100 pt-1">
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center space-x-3 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
        </div>
    );
}
