'use client';

import { motion } from 'framer-motion';
import {
    Briefcase,
    Edit,
    Eye,
    Filter,
    GraduationCap,
    Mail,
    MapPin,
    MoreHorizontal,
    Phone,
    Search,
    Star,
    Trash2,
    User,
} from 'lucide-react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { useAdmin } from '@/components/admin/providers/AdminProvider';

export default function CandidatesPage() {
    const { hasPermission } = useAdmin();

    const mockCandidates = [
        {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            experience: '5 years',
            education: 'BS Computer Science',
            skills: ['React', 'TypeScript', 'Node.js', 'Python'],
            status: 'Shortlisted',
            rating: 4.8,
            lastContact: '2 days ago',
            avatar: '/api/placeholder/40/40',
        },
        {
            id: 2,
            name: 'Michael Chen',
            email: 'michael.chen@email.com',
            phone: '+1 (555) 234-5678',
            location: 'New York, NY',
            experience: '3 years',
            education: 'MS Data Science',
            skills: ['Python', 'Machine Learning', 'SQL', 'AWS'],
            status: 'Interview Scheduled',
            rating: 4.5,
            lastContact: '1 day ago',
            avatar: '/api/placeholder/40/40',
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            email: 'emily.rodriguez@email.com',
            phone: '+1 (555) 345-6789',
            location: 'Austin, TX',
            experience: '7 years',
            education: 'MBA',
            skills: ['Product Management', 'Agile', 'User Research', 'Analytics'],
            status: 'Offered',
            rating: 4.9,
            lastContact: '3 hours ago',
            avatar: '/api/placeholder/40/40',
        },
        {
            id: 4,
            name: 'David Kim',
            email: 'david.kim@email.com',
            phone: '+1 (555) 456-7890',
            location: 'Seattle, WA',
            experience: '4 years',
            education: 'BS Engineering',
            skills: ['Java', 'Spring Boot', 'Docker', 'Kubernetes'],
            status: 'Hired',
            rating: 4.7,
            lastContact: '1 week ago',
            avatar: '/api/placeholder/40/40',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Shortlisted':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Interview Scheduled':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Offered':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Hired':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 4.5) return 'text-green-600';
        if (rating >= 4.0) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Candidate Management"
                description="Manage all candidates, track their progress, and schedule interviews."
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                >
                    <User className="h-4 w-4" />
                    <span>Add Candidate</span>
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
                                placeholder="Search candidates..."
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
                        <span className="text-sm text-gray-600">
                            Total Candidates: {mockCandidates.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {mockCandidates.map((candidate, index) => (
                    <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="rounded-lg border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-gray-300"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="mb-3 flex items-center space-x-2">
                                    <span
                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(candidate.status)}`}
                                    >
                                        {candidate.status}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                        <Star
                                            className={`h-4 w-4 ${getRatingColor(candidate.rating)}`}
                                        />
                                        <span
                                            className={`text-sm font-medium ${getRatingColor(candidate.rating)}`}
                                        >
                                            {candidate.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4 flex items-center space-x-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                        <User className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {candidate.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">{candidate.email}</p>
                                    </div>
                                </div>

                                <div className="mb-4 space-y-2">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Phone className="h-4 w-4" />
                                        <span>{candidate.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4" />
                                        <span>{candidate.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Briefcase className="h-4 w-4" />
                                        <span>{candidate.experience}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <GraduationCap className="h-4 w-4" />
                                        <span>{candidate.education}</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <p className="mb-2 text-sm font-medium text-gray-700">
                                        Skills:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {candidate.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>Last contact: {candidate.lastContact}</span>
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
                                className="flex items-center space-x-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-blue-700 transition-colors hover:bg-blue-50"
                            >
                                <Mail className="h-4 w-4" />
                                <span>Contact</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center space-x-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-700 transition-colors hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Archive</span>
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
