'use client';

import { motion } from 'framer-motion';
import { Filter, Plus, Search } from 'lucide-react';
import { useAdmin } from '../providers/AdminProvider';

export function UsersHeader() {
    const { hasPermission } = useAdmin();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
                    <p className="mt-1 text-gray-600">Manage user accounts and permissions</p>
                </div>

                <div className="flex items-center space-x-3">
                    {hasPermission('users') && (
                        <motion.button
                            className="flex items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add User</span>
                        </motion.button>
                    )}

                    <motion.button
                        className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                    </motion.button>
                </div>
            </div>

            <div className="mt-6">
                <div className="relative max-w-md">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>
            </div>
        </motion.div>
    );
}
