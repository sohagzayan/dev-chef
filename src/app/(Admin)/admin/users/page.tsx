'use client';

import { UsersHeader } from '@/components/admin/users/UsersHeader';
import { UsersTable } from '@/components/admin/users/UsersTable';

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <UsersHeader />
            <UsersTable />
        </div>
    );
}
