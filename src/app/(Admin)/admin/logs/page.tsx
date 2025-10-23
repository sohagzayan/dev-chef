'use client';

import { LogsHeader } from '@/components/admin/logs/LogsHeader';
import { LogsList } from '@/components/admin/logs/LogsList';

export default function LogsPage() {
    return (
        <div className="space-y-6">
            <LogsHeader />
            <LogsList />
        </div>
    );
}
