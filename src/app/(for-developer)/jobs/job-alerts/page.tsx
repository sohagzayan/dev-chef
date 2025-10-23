'use client';

import { useState } from 'react';
import {
    BellIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    PencilIcon,
    PlusIcon,
    StarIcon,
    TrashIcon,
    UsersIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface JobAlert {
    id: string;
    name: string;
    keywords: string[];
    location: string;
    jobType: 'All' | 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
    experience: 'All' | 'Entry' | 'Mid' | 'Senior' | 'Lead';
    salary: {
        min: number;
        max: number;
        currency: string;
    };
    isActive: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    lastSent: string;
    nextSend: string;
    totalMatches: number;
    createdAt: string;
    notifications: number;
}

interface AlertHistory {
    id: string;
    alertName: string;
    jobTitle: string;
    company: string;
    location: string;
    salary: string;
    sentDate: string;
    isRead: boolean;
    isApplied: boolean;
}

export default function JobAlertsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('manage');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const tabs = [
        { id: 'manage', label: 'Manage Alerts', icon: BellIcon },
        { id: 'history', label: 'Alert History', icon: ClockIcon },
    ];

    const filters = [
        { id: 'all', label: 'All Alerts' },
        { id: 'active', label: 'Active Only' },
        { id: 'recent', label: 'Recently Created' },
        { id: 'high-matches', label: 'High Matches' },
    ];

    const jobAlerts: JobAlert[] = [
        {
            id: '1',
            name: 'Frontend Developer Roles',
            keywords: ['React', 'TypeScript', 'Frontend'],
            location: 'San Francisco',
            jobType: 'Full-time',
            experience: 'Senior',
            salary: { min: 100000, max: 200000, currency: 'USD' },
            isActive: true,
            frequency: 'daily',
            lastSent: '2024-01-20',
            nextSend: '2024-01-21',
            totalMatches: 15,
            createdAt: '2024-01-10',
            notifications: 3,
        },
        {
            id: '2',
            name: 'Remote Python Jobs',
            keywords: ['Python', 'Django', 'Backend'],
            location: 'Remote',
            jobType: 'Remote',
            experience: 'Mid',
            salary: { min: 80000, max: 150000, currency: 'USD' },
            isActive: true,
            frequency: 'weekly',
            lastSent: '2024-01-18',
            nextSend: '2024-01-25',
            totalMatches: 8,
            createdAt: '2024-01-05',
            notifications: 1,
        },
        {
            id: '3',
            name: 'DevOps Opportunities',
            keywords: ['DevOps', 'AWS', 'Kubernetes'],
            location: 'New York',
            jobType: 'Full-time',
            experience: 'Senior',
            salary: { min: 120000, max: 180000, currency: 'USD' },
            isActive: false,
            frequency: 'daily',
            lastSent: '2024-01-15',
            nextSend: '2024-01-16',
            totalMatches: 12,
            createdAt: '2024-01-01',
            notifications: 0,
        },
        {
            id: '4',
            name: 'UI/UX Design Roles',
            keywords: ['UI/UX', 'Figma', 'Design'],
            location: 'London',
            jobType: 'Full-time',
            experience: 'Mid',
            salary: { min: 60000, max: 90000, currency: 'GBP' },
            isActive: true,
            frequency: 'weekly',
            lastSent: '2024-01-19',
            nextSend: '2024-01-26',
            totalMatches: 6,
            createdAt: '2024-01-08',
            notifications: 2,
        },
        {
            id: '5',
            name: 'Machine Learning Jobs',
            keywords: ['ML', 'Python', 'TensorFlow'],
            location: 'Berlin',
            jobType: 'Full-time',
            experience: 'Senior',
            salary: { min: 70000, max: 120000, currency: 'EUR' },
            isActive: true,
            frequency: 'monthly',
            lastSent: '2024-01-01',
            nextSend: '2024-02-01',
            totalMatches: 4,
            createdAt: '2024-01-12',
            notifications: 0,
        },
    ];

    const alertHistory: AlertHistory[] = [
        {
            id: '1',
            alertName: 'Frontend Developer Roles',
            jobTitle: 'Senior React Developer',
            company: 'TechCorp',
            location: 'San Francisco',
            salary: 'USD 120k - 180k',
            sentDate: '2024-01-20',
            isRead: false,
            isApplied: false,
        },
        {
            id: '2',
            alertName: 'Remote Python Jobs',
            jobTitle: 'Backend Engineer',
            company: 'DataFlow',
            location: 'Remote',
            salary: 'USD 90k - 130k',
            sentDate: '2024-01-18',
            isRead: true,
            isApplied: true,
        },
        {
            id: '3',
            alertName: 'Frontend Developer Roles',
            jobTitle: 'Frontend Developer',
            company: 'WebTech',
            location: 'San Francisco',
            salary: 'USD 100k - 150k',
            sentDate: '2024-01-20',
            isRead: false,
            isApplied: false,
        },
        {
            id: '4',
            alertName: 'UI/UX Design Roles',
            jobTitle: 'UI/UX Designer',
            company: 'DesignHub',
            location: 'London',
            salary: 'GBP 65k - 85k',
            sentDate: '2024-01-19',
            isRead: true,
            isApplied: false,
        },
        {
            id: '5',
            alertName: 'DevOps Opportunities',
            jobTitle: 'DevOps Engineer',
            company: 'CloudScale',
            location: 'New York',
            salary: 'USD 110k - 160k',
            sentDate: '2024-01-15',
            isRead: true,
            isApplied: false,
        },
    ];

    const getFilteredAlerts = () => {
        let filteredAlerts = jobAlerts;

        // Filter by search query
        if (searchQuery) {
            filteredAlerts = filteredAlerts.filter(
                (alert) =>
                    alert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    alert.keywords.some((keyword) =>
                        keyword.toLowerCase().includes(searchQuery.toLowerCase()),
                    ) ||
                    alert.location.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }

        // Apply additional filters
        if (selectedFilter === 'active') {
            filteredAlerts = filteredAlerts.filter((alert) => alert.isActive);
        } else if (selectedFilter === 'recent') {
            filteredAlerts = filteredAlerts.filter((alert) => {
                const createdDate = new Date(alert.createdAt);
                const now = new Date();
                const diffInDays = Math.floor(
                    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24),
                );
                return diffInDays <= 7;
            });
        } else if (selectedFilter === 'high-matches') {
            filteredAlerts = filteredAlerts.filter((alert) => alert.totalMatches >= 10);
        }

        return filteredAlerts;
    };

    const getFilteredHistory = () => {
        let filteredHistory = alertHistory;

        // Filter by search query
        if (searchQuery) {
            filteredHistory = filteredHistory.filter(
                (history) =>
                    history.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    history.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    history.alertName.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }

        return filteredHistory;
    };

    const filteredAlerts = getFilteredAlerts();
    const filteredHistory = getFilteredHistory();

    const toggleAlertStatus = (alertId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle alert status:', alertId);
    };

    const deleteAlert = (alertId: string) => {
        // In a real app, this would update the backend
        console.log('Delete alert:', alertId);
    };

    const editAlert = (alertId: string) => {
        // In a real app, this would open an edit form
        console.log('Edit alert:', alertId);
    };

    const markAsRead = (historyId: string) => {
        // In a real app, this would update the backend
        console.log('Mark as read:', historyId);
    };

    const getFrequencyColor = (frequency: string) => {
        switch (frequency) {
            case 'daily':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'weekly':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'monthly':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getExperienceColor = (experience: string) => {
        switch (experience) {
            case 'Entry':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Mid':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Senior':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Lead':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Full-time':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Part-time':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Contract':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Internship':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Remote':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatSalary = (salary: { min: number; max: number; currency: string }) => {
        const formatNumber = (num: number) => {
            if (num >= 1000) {
                return `${(num / 1000).toFixed(0)}k`;
            }
            return num.toString();
        };
        return `${salary.currency} ${formatNumber(salary.min)} - ${formatNumber(salary.max)}`;
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return '1 day ago';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        return `${Math.floor(diffInDays / 30)} months ago`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Job Alerts</h1>
                <p className="text-gray-600">
                    Stay updated with the latest job opportunities that match your preferences
                </p>
            </div>

            {/* Tabs */}
            <div className="mb-6">
                <div className="flex space-x-1 rounded-xl bg-white p-1 shadow-sm">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`flex flex-1 items-center justify-center space-x-2 rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
                                    selectedTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Create Alert Button */}
            {selectedTab === 'manage' && (
                <div className="mb-6">
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                    >
                        <PlusIcon className="h-5 w-5" />
                        <span>Create New Alert</span>
                    </button>
                </div>
            )}

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder={`Search ${selectedTab === 'manage' ? 'alerts' : 'alert history'}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Filters */}
                {selectedTab === 'manage' && (
                    <div className="flex flex-wrap gap-3">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setSelectedFilter(filter.id)}
                                className={`rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                                    selectedFilter === filter.id
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            {selectedTab === 'manage' ? (
                <>
                    {/* Alert Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing{' '}
                            <span className="font-semibold text-gray-900">
                                {filteredAlerts.length}
                            </span>{' '}
                            alerts
                        </p>
                    </div>

                    {/* Alerts Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {filteredAlerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                {/* Status Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span
                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                                            alert.isActive
                                                ? 'border-green-200 bg-green-100 text-green-800'
                                                : 'border-gray-200 bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {alert.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                {/* Alert Header */}
                                <div className="border-b border-gray-100 p-6">
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                                {alert.name}
                                            </h3>

                                            {/* Keywords */}
                                            <div className="mb-3 flex flex-wrap gap-2">
                                                {alert.keywords.map((keyword) => (
                                                    <span
                                                        key={keyword}
                                                        className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
                                                    >
                                                        {keyword}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Metadata */}
                                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                                <div className="flex items-center space-x-2">
                                                    <MapPinIcon className="h-4 w-4" />
                                                    <span>{alert.location}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <CurrencyDollarIcon className="h-4 w-4" />
                                                    <span>{formatSalary(alert.salary)}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <BriefcaseIcon className="h-4 w-4" />
                                                    <span>{alert.jobType}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <UsersIcon className="h-4 w-4" />
                                                    <span>{alert.experience}</span>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="mt-3 flex items-center space-x-2">
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getExperienceColor(alert.experience)}`}
                                                >
                                                    {alert.experience}
                                                </span>
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getTypeColor(alert.jobType)}`}
                                                >
                                                    {alert.jobType}
                                                </span>
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getFrequencyColor(alert.frequency)}`}
                                                >
                                                    {alert.frequency}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alert Stats */}
                                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                                        <div className="text-center">
                                            <div className="font-semibold text-gray-900">
                                                {alert.totalMatches}
                                            </div>
                                            <div>Total Matches</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-gray-900">
                                                {alert.notifications}
                                            </div>
                                            <div>New Alerts</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-gray-900">
                                                {getTimeAgo(alert.lastSent)}
                                            </div>
                                            <div>Last Sent</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Alert Actions */}
                                <div className="p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="text-sm text-gray-600">
                                            <span>Next alert: {getTimeAgo(alert.nextSend)}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => toggleAlertStatus(alert.id)}
                                                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                                                    alert.isActive
                                                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                                                }`}
                                            >
                                                {alert.isActive ? 'Pause' : 'Activate'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => editAlert(alert.id)}
                                            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                                        >
                                            <PencilIcon className="mr-2 inline h-4 w-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteAlert(alert.id)}
                                            className="flex-1 rounded-lg bg-red-100 px-4 py-2 font-medium text-red-700 transition-colors duration-200 hover:bg-red-200"
                                        >
                                            <TrashIcon className="mr-2 inline h-4 w-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredAlerts.length === 0 && (
                        <div className="py-12 text-center">
                            <BellIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No job alerts found
                            </h3>
                            <p className="text-gray-600">
                                Create your first job alert to get notified about new opportunities.
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* History Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing{' '}
                            <span className="font-semibold text-gray-900">
                                {filteredHistory.length}
                            </span>{' '}
                            alert notifications
                        </p>
                    </div>

                    {/* Alert History */}
                    <div className="space-y-4">
                        {filteredHistory.map((history) => (
                            <motion.div
                                key={history.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg ${
                                    !history.isRead ? 'border-l-4 border-blue-500' : ''
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center space-x-3">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {history.jobTitle}
                                            </h3>
                                            {!history.isRead && (
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                    New
                                                </span>
                                            )}
                                            {history.isApplied && (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                    Applied
                                                </span>
                                            )}
                                        </div>

                                        <div className="mb-2 text-gray-600">
                                            <span className="font-medium">{history.company}</span> •{' '}
                                            {history.location} • {history.salary}
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            Alert:{' '}
                                            <span className="font-medium">{history.alertName}</span>{' '}
                                            • Sent {getTimeAgo(history.sentDate)}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {!history.isRead && (
                                            <button
                                                onClick={() => markAsRead(history.id)}
                                                className="rounded-lg p-2 text-blue-600 transition-colors duration-200 hover:bg-blue-50"
                                                title="Mark as read"
                                            >
                                                <CheckCircleIcon className="h-5 w-5" />
                                            </button>
                                        )}
                                        <button className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-600">
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredHistory.length === 0 && (
                        <div className="py-12 text-center">
                            <ClockIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No alert history found
                            </h3>
                            <p className="text-gray-600">
                                You'll see job notifications here once you create and activate job
                                alerts.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
