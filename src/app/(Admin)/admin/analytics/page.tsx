'use client';

import { AnalyticsCharts } from '@/components/admin/analytics/AnalyticsCharts';
import { AnalyticsMetrics } from '@/components/admin/analytics/AnalyticsMetrics';
import { AnalyticsOverview } from '@/components/admin/analytics/AnalyticsOverview';

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="mt-1 text-gray-600">Comprehensive analytics and insights</p>
            </div>

            <AnalyticsOverview />
            <AnalyticsCharts />
            <AnalyticsMetrics />
        </div>
    );
}
