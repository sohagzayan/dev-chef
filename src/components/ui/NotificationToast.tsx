'use client';

import { useEffect } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useUI } from '@/hooks/redux/useUI';
import { cn } from '@/lib/utils';
import type { Notification } from '@/types/redux';

const notificationIcons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const notificationStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
};

export function NotificationToast() {
    const { notifications, hideNotification } = useUI();

    useEffect(() => {
        notifications.forEach((notification: Notification) => {
            if (notification.duration) {
                const timer = setTimeout(() => {
                    hideNotification(notification.id);
                }, notification.duration);

                return () => clearTimeout(timer);
            }
        });
    }, [notifications, hideNotification]);

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map((notification: Notification) => {
                const Icon = notificationIcons[notification.type];
                const styles = notificationStyles[notification.type];

                return (
                    <div
                        key={notification.id}
                        className={cn(
                            'flex max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300',
                            styles,
                        )}
                    >
                        <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            {notification.message && (
                                <p className="mt-1 text-sm opacity-90">{notification.message}</p>
                            )}
                        </div>
                        <button
                            onClick={() => hideNotification(notification.id)}
                            className="flex-shrink-0 rounded p-1 transition-colors hover:bg-black/10"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
