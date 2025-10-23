'use client';

import { SettingsForm } from '@/components/admin/settings/SettingsForm';
import { SettingsHeader } from '@/components/admin/settings/SettingsHeader';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <SettingsHeader />
            <SettingsForm />
        </div>
    );
}
