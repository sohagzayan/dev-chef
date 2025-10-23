'use client';

import { useEffect, useRef, useState } from 'react';
import { HelpCircle, LogOut, Settings, Shield, User } from 'lucide-react';
import { useAdmin } from '../providers/AdminProvider';

export function ProfileDropdown() {
    const { user } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Close dropdown when pressing Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            // TODO: Implement logout logic
            console.log('🔄 Logging out user:', user?.email);

            // For now, just close the dropdown
            setIsOpen(false);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleProfileAction = (action: string) => {
        console.log(`🔧 ${action} action clicked`);
        setIsOpen(false);
        // TODO: Add navigation logic here
        // switch(action) {
        //     case 'profile':
        //         router.push('/admin/profile');
        //         break;
        //     case 'settings':
        //         router.push('/admin/settings');
        //         break;
        //     case 'privacy':
        //         router.push('/admin/privacy');
        //         break;
        //     case 'help':
        //         router.push('/admin/help');
        //         break;
        // }
    };

    const getRoleDisplayName = (role: string) => {
        switch (role) {
            case 'ADMIN':
                return 'Administrator';
            case 'RECRUITER':
                return 'Recruiter';
            case 'CANDIDATE':
                return 'Candidate';
            default:
                return role;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'ADMIN':
                return 'bg-red-100 text-red-800';
            case 'RECRUITER':
                return 'bg-blue-100 text-blue-800';
            case 'CANDIDATE':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300 transition-colors hover:bg-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                aria-label="Toggle profile menu"
                aria-expanded={isOpen}
            >
                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                ) : (
                    <User className="h-5 w-5 text-gray-600" />
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="p-4">
                        {/* User Info Header */}
                        <div className="mb-4 border-b border-gray-200 pb-4">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-6 w-6 text-gray-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">
                                        {user?.name || 'User'}
                                    </h3>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                    <div className="mt-1">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleColor(user?.role || '')}`}
                                        >
                                            {getRoleDisplayName(user?.role || '')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mb-4 space-y-1">
                            <button
                                onClick={() => handleProfileAction('profile')}
                                className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <User className="h-4 w-4 text-gray-400" />
                                <span>View Profile</span>
                            </button>
                            <button
                                onClick={() => handleProfileAction('settings')}
                                className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <Settings className="h-4 w-4 text-gray-400" />
                                <span>Settings</span>
                            </button>
                            <button
                                onClick={() => handleProfileAction('privacy')}
                                className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <Shield className="h-4 w-4 text-gray-400" />
                                <span>Privacy & Security</span>
                            </button>
                            <button
                                onClick={() => handleProfileAction('help')}
                                className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <HelpCircle className="h-4 w-4 text-gray-400" />
                                <span>Help & Support</span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 pt-4">
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <div className="text-xs text-gray-500">
                                <p>User ID: {user?.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
