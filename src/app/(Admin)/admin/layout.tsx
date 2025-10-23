'use client';

import { ReactNode } from 'react';
import { AdminHeader, AdminSidebar } from '@/components/admin/layout';
import { AdminProvider } from '@/components/admin/providers/AdminProvider';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    console.log('AdminLayout rendering');

    return (
        <AdminProvider>
            <div className="flex h-screen bg-gray-50">
                <AdminSidebar />
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                    <AdminHeader />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </AdminProvider>
    );
}
