'use client';

import { ChevronDown } from 'lucide-react';

interface ProfileSetting {
    id: string;
    label: string;
    icon: any;
    active: boolean;
}

interface ProfileSidebarProps {
    profileSettings: ProfileSetting[];
    activeProfileTab: string;
    onTabChange: (tabId: string) => void;
}

export function ProfileSidebar({
    profileSettings,
    activeProfileTab,
    onTabChange,
}: ProfileSidebarProps) {
    return (
        <div className="w-80 border-r border-gray-100 bg-gray-50 p-6">
            <div className="mb-6">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Edit Profile</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Edit Profile</span>
                    <ChevronDown className="h-4 w-4" />
                </div>
            </div>

            <nav className="space-y-2">
                {profileSettings.map((setting) => (
                    <button
                        key={setting.id}
                        onClick={() => onTabChange(setting.id)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                            setting.active
                                ? 'border border-blue-200 bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <setting.icon className="h-4 w-4" />
                        {setting.label}
                    </button>
                ))}
            </nav>
        </div>
    );
}
