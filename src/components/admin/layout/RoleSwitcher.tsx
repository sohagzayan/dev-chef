'use client';

import { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { useAdmin } from '../providers/AdminProvider';

export function RoleSwitcher() {
    const { user, switchRole } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);

    const roles = [
        { value: 'RECRUITER', label: 'Recruiter', description: 'Standard recruiter dashboard' },
        { value: 'ADMIN', label: 'Admin', description: 'Advanced admin dashboard' },
        { value: 'CANDIDATE', label: 'Candidate', description: 'Candidate dashboard' },
    ];

    const currentRole = roles.find((role) => role.value === user?.role);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
                <User className="h-4 w-4" />
                <span>{currentRole?.label}</span>
                <ChevronDown className="h-4 w-4" />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="p-4">
                        <h3 className="mb-3 text-sm font-medium text-gray-900">Switch Role</h3>
                        <div className="space-y-2">
                            {roles.map((role) => (
                                <button
                                    key={role.value}
                                    onClick={() => {
                                        switchRole(role.value as any);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full rounded-lg p-3 text-left transition-colors ${
                                        user?.role === role.value
                                            ? 'border border-green-200 bg-green-50'
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {role.label}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {role.description}
                                            </div>
                                        </div>
                                        {user?.role === role.value && (
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                            This role switcher is for development/testing only. In production, roles
                            are fetched from the database based on your User.role field.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
