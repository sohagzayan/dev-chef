'use client';

import { motion } from 'framer-motion';
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useAdmin } from '../providers/AdminProvider';

const mockUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-01-15',
        avatar: '/api/placeholder/40/40',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'moderator',
        status: 'active',
        lastLogin: '2024-01-14',
        avatar: '/api/placeholder/40/40',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'analyst',
        status: 'inactive',
        lastLogin: '2024-01-10',
        avatar: '/api/placeholder/40/40',
    },
    {
        id: 4,
        name: 'Alice Brown',
        email: 'alice@example.com',
        role: 'user',
        status: 'active',
        lastLogin: '2024-01-13',
        avatar: '/api/placeholder/40/40',
    },
];

const roleColors = {
    super_admin: 'bg-red-100 text-red-800',
    admin: 'bg-purple-100 text-purple-800',
    moderator: 'bg-blue-100 text-blue-800',
    analyst: 'bg-green-100 text-green-800',
    user: 'bg-gray-100 text-gray-800',
};

const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
};

export function UsersTable() {
    const { hasPermission } = useAdmin();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
        >
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Last Login
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {mockUsers.map((user, index) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                                            <span className="text-sm font-medium text-gray-700">
                                                {user.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${roleColors[user.role as keyof typeof roleColors]}`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusColors[user.status as keyof typeof statusColors]}`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                    {user.lastLogin}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        {hasPermission('users') && (
                                            <>
                                                <motion.button
                                                    className="p-1 text-gray-400 transition-colors hover:text-blue-600"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </motion.button>
                                                <motion.button
                                                    className="p-1 text-gray-400 transition-colors hover:text-green-600"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </motion.button>
                                                <motion.button
                                                    className="p-1 text-gray-400 transition-colors hover:text-red-600"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </motion.button>
                                            </>
                                        )}
                                        <motion.button
                                            className="p-1 text-gray-400 transition-colors hover:text-gray-600"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </motion.button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
