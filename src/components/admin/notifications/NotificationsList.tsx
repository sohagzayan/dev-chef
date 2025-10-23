import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, Info, XCircle } from 'lucide-react';

export function NotificationsList() {
    const notifications = [
        {
            id: 1,
            title: 'New User Registration',
            message: 'John Doe has registered for a new account',
            type: 'info',
            status: 'unread',
            timestamp: '2 minutes ago',
            priority: 'low',
        },
        {
            id: 2,
            title: 'System Update Available',
            message: 'Version 2.1.0 is ready for deployment',
            type: 'success',
            status: 'read',
            timestamp: '1 hour ago',
            priority: 'medium',
        },
        {
            id: 3,
            title: 'High CPU Usage Alert',
            message: 'Server CPU usage has exceeded 90% threshold',
            type: 'warning',
            status: 'unread',
            timestamp: '3 hours ago',
            priority: 'high',
        },
        {
            id: 4,
            title: 'Database Backup Complete',
            message: 'Daily backup completed successfully',
            type: 'success',
            status: 'read',
            timestamp: '6 hours ago',
            priority: 'low',
        },
        {
            id: 5,
            title: 'Failed Login Attempts',
            message: 'Multiple failed login attempts detected from IP 192.168.1.100',
            type: 'error',
            status: 'unread',
            timestamp: '1 day ago',
            priority: 'high',
        },
        {
            id: 6,
            title: 'New Feature Released',
            message: 'Advanced analytics dashboard is now available',
            type: 'info',
            status: 'read',
            timestamp: '2 days ago',
            priority: 'medium',
        },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return CheckCircle;
            case 'warning':
                return AlertTriangle;
            case 'error':
                return XCircle;
            case 'info':
            default:
                return Info;
        }
    };

    const getIconColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'text-green-600 bg-green-100';
            case 'warning':
                return 'text-yellow-600 bg-yellow-100';
            case 'error':
                return 'text-red-600 bg-red-100';
            case 'info':
            default:
                return 'text-blue-600 bg-blue-100';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-4">
            {notifications.map((notification, index) => {
                const IconComponent = getIcon(notification.type);
                return (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`rounded-lg border bg-white p-4 transition-shadow hover:shadow-md ${
                            notification.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''
                        }`}
                    >
                        <div className="flex items-start space-x-3">
                            <div className={`rounded-lg p-2 ${getIconColor(notification.type)}`}>
                                <IconComponent className="h-5 w-5" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {notification.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            {notification.message}
                                        </p>
                                    </div>

                                    <div className="ml-4 flex items-center space-x-2">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(
                                                notification.priority,
                                            )}`}
                                        >
                                            {notification.priority}
                                        </span>
                                        <span className="flex items-center text-xs text-gray-500">
                                            <Clock className="mr-1 h-3 w-3" />
                                            {notification.timestamp}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center space-x-2">
                                    {notification.status === 'unread' && (
                                        <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
                                            Mark as Read
                                        </button>
                                    )}
                                    <button className="text-xs text-gray-500 hover:text-gray-700">
                                        Dismiss
                                    </button>
                                    <button className="text-xs text-gray-500 hover:text-gray-700">
                                        Archive
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
