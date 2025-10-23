'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Bell, Check, Info, MessageSquare, X } from 'lucide-react';

interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
}

export function NotificationsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            type: 'success',
            title: 'Profile Updated',
            message: 'Your profile has been successfully updated.',
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            isRead: false,
        },
        {
            id: '2',
            type: 'info',
            title: 'New Feature Available',
            message: 'Advanced analytics dashboard is now available.',
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            isRead: false,
        },
        {
            id: '3',
            type: 'warning',
            title: 'System Maintenance',
            message: 'Scheduled maintenance in 2 hours.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            isRead: true,
        },
    ]);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

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

    const markAsRead = (id: string) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const viewAllNotifications = () => {
        // TODO: Navigate to full notifications page
        console.log('🔔 Navigating to all notifications page');
        setIsOpen(false);
        // You can add navigation logic here
        // router.push('/admin/notifications');
    };

    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return <Check className="h-4 w-4 text-green-500" />;
            case 'warning':
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            case 'error':
                return <X className="h-4 w-4 text-red-500" />;
            default:
                return <Info className="h-4 w-4 text-blue-500" />;
        }
    };

    const getNotificationColor = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return 'border-l-green-500 bg-green-50';
            case 'warning':
                return 'border-l-yellow-500 bg-yellow-50';
            case 'error':
                return 'border-l-red-500 bg-red-50';
            default:
                return 'border-l-blue-500 bg-blue-50';
        }
    };

    const formatTimeAgo = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="relative rounded-lg p-2 transition-colors hover:bg-gray-100"
                aria-label="Toggle notifications"
                aria-expanded={isOpen}
            >
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        <div className="max-h-64 space-y-2 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="py-8 text-center text-gray-500">
                                    <MessageSquare className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                                    <p>No notifications</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`rounded-lg border-l-4 p-3 transition-colors ${
                                            notification.isRead
                                                ? 'border-l-gray-300 bg-gray-50'
                                                : getNotificationColor(notification.type)
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3">
                                                {getNotificationIcon(notification.type)}
                                                <div className="flex-1">
                                                    <h4
                                                        className={`text-sm font-medium ${
                                                            notification.isRead
                                                                ? 'text-gray-600'
                                                                : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {notification.title}
                                                    </h4>
                                                    <p
                                                        className={`text-sm ${
                                                            notification.isRead
                                                                ? 'text-gray-500'
                                                                : 'text-gray-700'
                                                        }`}
                                                    >
                                                        {notification.message}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {formatTimeAgo(notification.timestamp)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-1">
                                                {!notification.isRead && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-gray-400 hover:text-gray-600"
                                                        title="Mark as read"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() =>
                                                        removeNotification(notification.id)
                                                    }
                                                    className="text-gray-400 hover:text-red-600"
                                                    title="Remove notification"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div className="mt-4 border-t border-gray-200 pt-3">
                                <button
                                    onClick={viewAllNotifications}
                                    className="w-full rounded-lg py-2 text-center text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                                >
                                    View all notifications
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
