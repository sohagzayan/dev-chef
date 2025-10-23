'use client';

import { ReportsHeader } from '@/components/admin/reports/ReportsHeader';
import { ReportsList } from '@/components/admin/reports/ReportsList';

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <ReportsHeader />
            <ReportsList />
        </div>
    );
}
