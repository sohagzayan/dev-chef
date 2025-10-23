'use client';

import { motion } from 'framer-motion';
import {
    Briefcase,
    Clock,
    DollarSign,
    Edit,
    Eye,
    Filter,
    MapPin,
    MoreHorizontal,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { useAdmin } from '@/components/admin/providers/AdminProvider';

export default function JobsPage() {
    const { hasPermission } = useAdmin();

    const mockJobs = [
        {
            id: 1,
            title: 'Senior Frontend Developer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: '$120k - $150k',
            status: 'Active',
            applications: 24,
            posted: '2 days ago',
            category: 'Engineering',
        },
        {
            id: 2,
            title: 'Product Manager',
            company: 'StartupXYZ',
            location: 'New York, NY',
            type: 'Full-time',
            salary: '$100k - $130k',
            status: 'Active',
            applications: 18,
            posted: '1 week ago',
            category: 'Product',
        },
        {
            id: 3,
            title: 'UX Designer',
            company: 'Design Studio',
            location: 'Remote',
            type: 'Contract',
            salary: '$80k - $100k',
            status: 'Active',
            applications: 31,
            posted: '3 days ago',
            category: 'Design',
        },
        {
            id: 4,
            title: 'Data Scientist',
            company: 'Analytics Co.',
            location: 'Boston, MA',
            type: 'Full-time',
            salary: '$110k - $140k',
            status: 'Draft',
            applications: 0,
            posted: 'Not posted',
            category: 'Data',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Draft':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'Closed':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Engineering':
                return 'bg-blue-100 text-blue-800';
            case 'Product':
                return 'bg-purple-100 text-purple-800';
            case 'Design':
                return 'bg-pink-100 text-pink-800';
            case 'Data':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Job Management"
                description="Manage all job postings, create new positions, and track applications."
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                >
                    <Plus className="h-4 w-4" />
                    <span>Post New Job</span>
                </motion.button>
            </PageHeader>

            {/* Filters and Search */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-1 items-center space-x-4">
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 transition-all duration-200 focus:border-green-500 focus:bg-white focus:outline-none"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            <Filter className="h-4 w-4" />
                            <span>Filters</span>
                        </motion.button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Total Jobs: {mockJobs.length}</span>
                    </div>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {mockJobs.map((job, index) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="rounded-lg border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-gray-300"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="mb-3 flex items-center space-x-2">
                                    <span
                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(job.status)}`}
                                    >
                                        {job.status}
                                    </span>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(job.category)}`}
                                    >
                                        {job.category}
                                    </span>
                                </div>

                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    {job.title}
                                </h3>

                                <div className="mb-4 space-y-2">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Briefcase className="h-4 w-4" />
                                        <span>{job.company}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        <span>{job.type}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <DollarSign className="h-4 w-4" />
                                        <span>{job.salary}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>{job.applications} applications</span>
                                    <span>{job.posted}</span>
                                </div>
                            </div>

                            <div className="ml-4">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </motion.button>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center space-x-2 border-t border-gray-100 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <Eye className="h-4 w-4" />
                                <span>View</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <Edit className="h-4 w-4" />
                                <span>Edit</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center space-x-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-700 transition-colors hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
