'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineLogout,
    AiOutlineReload,
    AiOutlineSetting,
    AiOutlineUser,
} from 'react-icons/ai';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';

interface DynamicNavbarProps {
    onNavigate: (direction: 'prev' | 'next') => void;
    navigationLoading: boolean;
    onRefresh: () => void;
    problemTitle?: string;
}

const DynamicNavbar: React.FC<DynamicNavbarProps> = ({
    onNavigate,
    navigationLoading,
    onRefresh,
    problemTitle,
}) => {
    const { isAuthenticated, user, logout } = useAuth();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            setCurrentDate(now);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format time as HH:MM:SS
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    // Format date as Day, Month DD, YYYY
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!user?.name) return user?.email?.charAt(0).toUpperCase() || 'U';
        const names = user.name.split(' ');
        if (names.length >= 2) {
            return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
        }
        return names[0].charAt(0).toUpperCase();
    };

    // Get user display name
    const getUserDisplayName = () => {
        if (!user) return 'Guest';
        return user.name || user.email?.split('@')[0] || 'User';
    };

    // Get user role display
    const getUserRoleDisplay = () => {
        if (!user) return '';
        switch (user.role) {
            case 'CANDIDATE':
                return 'Developer';
            case 'RECRUITER':
                return 'Company';
            case 'ADMIN':
                return 'Admin';
            default:
                return '';
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="sticky z-50 flex flex-shrink-0 items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-3">
            {/* Left side - Navigation */}
            <div className="flex items-center space-x-4">
                <Link
                    href="/problemset"
                    className="flex items-center space-x-1 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                    <AiOutlineArrowLeft size={14} />
                    <span>Problem List</span>
                </Link>

                {/* Problem Title */}
                {problemTitle && (
                    <div className="hidden md:block">
                        <span className="text-sm text-gray-400">|</span>
                        <span className="ml-2 text-sm font-medium text-gray-300">
                            {problemTitle}
                        </span>
                    </div>
                )}

                <div className="flex items-center space-x-2">
                    <button
                        className="rounded p-1 text-gray-400 transition-colors hover:text-white disabled:opacity-50"
                        onClick={() => onNavigate('prev')}
                        disabled={navigationLoading}
                        title="Previous Problem"
                    >
                        {navigationLoading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></div>
                        ) : (
                            <AiOutlineArrowLeft size={16} />
                        )}
                    </button>
                    <button
                        className="rounded p-1 text-gray-400 transition-colors hover:text-white disabled:opacity-50"
                        onClick={() => onNavigate('next')}
                        disabled={navigationLoading}
                        title="Next Problem"
                    >
                        {navigationLoading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></div>
                        ) : (
                            <AiOutlineArrowRight size={16} />
                        )}
                    </button>
                    <button
                        className="rounded p-1 text-gray-400 transition-colors hover:text-white"
                        onClick={onRefresh}
                        title="Refresh Page"
                    >
                        <AiOutlineReload size={16} />
                    </button>
                </div>
            </div>

            {/* Center - Dynamic Information */}
            <div className="hidden items-center space-x-4 md:flex">
                {/* Current Date */}
                <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <span>{formatDate(currentDate)}</span>
                </div>

                {/* Current Time */}
                <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <span className="font-mono">{formatTime(currentTime)}</span>
                </div>

                {/* User Status */}
                {isAuthenticated && (
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <span>•</span>
                        <span className="text-green-400">{getUserRoleDisplay()}</span>
                    </div>
                )}
            </div>

            {/* Right side - User Profile */}
            <div className="flex items-center space-x-3">
                {/* User Avatar with Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex cursor-pointer items-center space-x-2">
                            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-600 transition-colors hover:bg-gray-500">
                                <span className="text-sm font-medium text-white">
                                    {getUserInitials()}
                                </span>
                            </div>

                            {/* User Info (hidden on mobile) */}
                            <div className="hidden md:block">
                                <div className="text-sm font-medium text-gray-300">
                                    {getUserDisplayName()}
                                </div>
                                {isAuthenticated && user?.email && (
                                    <div className="text-xs text-gray-500">{user.email}</div>
                                )}
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 border-gray-700 bg-gray-800">
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                            <AiOutlineUser className="mr-2 h-4 w-4" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                            <AiOutlineSetting className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                        {isAuthenticated && (
                            <DropdownMenuItem
                                className="text-gray-300 hover:bg-gray-700 hover:text-white"
                                onClick={handleLogout}
                            >
                                <AiOutlineLogout className="mr-2 h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Premium Badge - Only show if user is authenticated and not admin */}
                {isAuthenticated && user?.role !== 'ADMIN' && (
                    <button className="rounded-lg bg-orange-500 px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-orange-600">
                        Premium
                    </button>
                )}
            </div>
        </div>
    );
};

export default DynamicNavbar;
