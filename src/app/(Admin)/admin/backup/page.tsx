'use client';

import { BackupHeader } from '@/components/admin/backup/BackupHeader';
import { BackupStatus } from '@/components/admin/backup/BackupStatus';

export default function BackupPage() {
    return (
        <div className="space-y-6">
            <BackupHeader />
            <BackupStatus />
        </div>
    );
}
