'use client';

import { NotificationsHeader } from '@/components/admin/notifications/NotificationsHeader';
import { NotificationsList } from '@/components/admin/notifications/NotificationsList';

export default function NotificationsPage() {
    return (
        <div className="space-y-6">
            <NotificationsHeader />
            <NotificationsList />
        </div>
    );
}
