'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    BellIcon,
    BriefcaseIcon,
    CheckIcon,
    CogIcon,
    CurrencyDollarIcon,
    EyeIcon,
    EyeSlashIcon,
    MapPinIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface JobAlert {
    id: string;
    name: string;
    keywords: string[];
    locations: string[];
    jobTypes: string[];
    experienceLevels: string[];
    salaryRange: { min: number; max: number; currency: string };
    industries: string[];
    remotePreference: 'any' | 'remote-only' | 'onsite-only' | 'hybrid';
    frequency: 'daily' | 'weekly' | 'monthly';
    isActive: boolean;
    createdAt: string;
    lastTriggered?: string;
    totalMatches: number;
    lastMatchCount: number;
}

export default function ManageJobAlertsPage() {
    const [alerts, setAlerts] = useState<JobAlert[]>([
        {
            id: '1',
            name: 'Frontend Developer - Remote',
            keywords: ['React', 'TypeScript', 'Frontend'],
            locations: ['Remote', 'San Francisco', 'New York'],
            jobTypes: ['Full-time', 'Remote'],
            experienceLevels: ['Mid', 'Senior'],
            salaryRange: { min: 80000, max: 150000, currency: 'USD' },
            industries: ['Technology', 'E-commerce'],
            remotePreference: 'remote-only',
            frequency: 'daily',
            isActive: true,
            createdAt: '2024-01-15',
            lastTriggered: '2024-01-30',
            totalMatches: 45,
            lastMatchCount: 12,
        },
        {
            id: '2',
            name: 'DevOps Engineer - Bay Area',
            keywords: ['DevOps', 'AWS', 'Kubernetes'],
            locations: ['San Francisco', 'San Jose', 'Oakland'],
            jobTypes: ['Full-time', 'Contract'],
            experienceLevels: ['Senior', 'Lead'],
            salaryRange: { min: 120000, max: 200000, currency: 'USD' },
            industries: ['Technology', 'Finance'],
            remotePreference: 'hybrid',
            frequency: 'weekly',
            isActive: true,
            createdAt: '2024-01-10',
            lastTriggered: '2024-01-28',
            totalMatches: 23,
            lastMatchCount: 5,
        },
        {
            id: '3',
            name: 'Data Scientist - Startup',
            keywords: ['Machine Learning', 'Python', 'Data Science'],
            locations: ['Remote', 'Austin', 'Seattle'],
            jobTypes: ['Full-time'],
            experienceLevels: ['Entry', 'Mid'],
            salaryRange: { min: 70000, max: 120000, currency: 'USD' },
            industries: ['Technology', 'Healthcare'],
            remotePreference: 'any',
            frequency: 'weekly',
            isActive: false,
            createdAt: '2024-01-05',
            lastTriggered: '2024-01-20',
            totalMatches: 18,
            lastMatchCount: 3,
        },
    ]);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingAlert, setEditingAlert] = useState<JobAlert | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

    const locations = [
        'Remote',
        'San Francisco',
        'New York',
        'Seattle',
        'Austin',
        'Boston',
        'Denver',
        'Chicago',
        'Los Angeles',
        'San Jose',
        'Oakland',
    ];
    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
    const experienceLevels = ['Entry', 'Mid', 'Senior', 'Lead'];
    const industries = [
        'Technology',
        'Finance',
        'Healthcare',
        'E-commerce',
        'Education',
        'Consulting',
        'Media',
        'Manufacturing',
    ];
    const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SGD'];

    const filteredAlerts = alerts.filter((alert) => {
        const matchesSearch =
            alert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            alert.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'active' && alert.isActive) ||
            (statusFilter === 'inactive' && !alert.isActive);

        return matchesSearch && matchesStatus;
    });

    const toggleAlertStatus = (alertId: string) => {
        setAlerts((prev) =>
            prev.map((alert) =>
                alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert,
            ),
        );
    };

    const deleteAlert = (alertId: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
    };

    const editAlert = (alert: JobAlert) => {
        setEditingAlert(alert);
        setShowCreateForm(true);
    };

    const handleSaveAlert = (
        alertData: Omit<JobAlert, 'id' | 'createdAt' | 'totalMatches' | 'lastMatchCount'>,
    ) => {
        if (editingAlert) {
            // Update existing alert
            setAlerts((prev) =>
                prev.map((alert) =>
                    alert.id === editingAlert.id
                        ? { ...alert, ...alertData, lastTriggered: undefined }
                        : alert,
                ),
            );
            setEditingAlert(null);
        } else {
            // Create new alert
            const newAlert: JobAlert = {
                ...alertData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString().split('T')[0],
                totalMatches: 0,
                lastMatchCount: 0,
            };
            setAlerts((prev) => [...prev, newAlert]);
        }
        setShowCreateForm(false);
    };

    const getFrequencyColor = (frequency: string) => {
        switch (frequency) {
            case 'daily':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'weekly':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'monthly':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getRemotePreferenceColor = (preference: string) => {
        switch (preference) {
            case 'remote-only':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'onsite-only':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'hybrid':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatSalary = (salary: { min: number; max: number; currency: string }) => {
        return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        return `${Math.floor(diffInDays / 30)} months ago`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <BellIcon className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Manage Job Alerts</h1>
                </div>
                <p className="text-gray-600">Create and manage your personalized job alerts</p>
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Stats Overview */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                                <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
                            </div>
                            <BellIcon className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {alerts.filter((alert) => alert.isActive).length}
                                </p>
                            </div>
                            <CheckIcon className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Matches</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {alerts.reduce((sum, alert) => sum + alert.totalMatches, 0)}
                                </p>
                            </div>
                            <EyeIcon className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Recent Matches</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {alerts.reduce((sum, alert) => sum + alert.lastMatchCount, 0)}
                                </p>
                            </div>
                            <CogIcon className="h-8 w-8 text-orange-500" />
                        </div>
                    </div>
                </div>

                {/* Actions and Filters */}
                <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => {
                                    setEditingAlert(null);
                                    setShowCreateForm(true);
                                }}
                                className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                            >
                                <PlusIcon className="h-5 w-5" />
                                <span>Create New Alert</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')
                                }
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Alerts</option>
                                <option value="active">Active Only</option>
                                <option value="inactive">Inactive Only</option>
                            </select>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search alerts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                />
                                <BellIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alerts List */}
                <div className="space-y-4">
                    {filteredAlerts.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                            <BellIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No job alerts found
                            </h3>
                            <p className="text-gray-500">
                                Create your first job alert to get started
                            </p>
                        </div>
                    ) : (
                        filteredAlerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-2xl bg-white p-6 shadow-lg"
                            >
                                <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                                    <div className="flex-1">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div>
                                                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                                    {alert.name}
                                                </h3>
                                                <div className="mb-3 flex items-center space-x-2">
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getFrequencyColor(alert.frequency)}`}
                                                    >
                                                        {alert.frequency.charAt(0).toUpperCase() +
                                                            alert.frequency.slice(1)}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getRemotePreferenceColor(alert.remotePreference)}`}
                                                    >
                                                        {alert.remotePreference
                                                            .replace('-', ' ')
                                                            .replace(/\b\w/g, (l) =>
                                                                l.toUpperCase(),
                                                            )}
                                                    </span>
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
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Keywords
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {alert.keywords.map((keyword, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                                                        >
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Locations
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {alert.locations.map((location, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                                                        >
                                                            <MapPinIcon className="mr-1 h-3 w-3" />
                                                            {location}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Job Types
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {alert.jobTypes.map((type, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800"
                                                        >
                                                            <BriefcaseIcon className="mr-1 h-3 w-3" />
                                                            {type}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Experience Levels
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {alert.experienceLevels.map((level, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800"
                                                        >
                                                            <AcademicCapIcon className="mr-1 h-3 w-3" />
                                                            {level}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 font-medium text-gray-900">
                                                    Salary Range
                                                </h4>
                                                <div className="text-sm text-gray-600">
                                                    {formatSalary(alert.salaryRange)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <h4 className="mb-2 font-medium text-gray-900">
                                                Industries
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {alert.industries.map((industry, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800"
                                                    >
                                                        {industry}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                                            <span>Created: {getTimeAgo(alert.createdAt)}</span>
                                            {alert.lastTriggered && (
                                                <span>
                                                    Last triggered:{' '}
                                                    {getTimeAgo(alert.lastTriggered)}
                                                </span>
                                            )}
                                            <span>Total matches: {alert.totalMatches}</span>
                                            <span>Recent matches: {alert.lastMatchCount}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => editAlert(alert)}
                                                className="flex items-center space-x-2 rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition-colors duration-200 hover:bg-blue-200"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => toggleAlertStatus(alert.id)}
                                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition-colors duration-200 ${
                                                    alert.isActive
                                                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                            >
                                                {alert.isActive ? (
                                                    <EyeSlashIcon className="h-4 w-4" />
                                                ) : (
                                                    <EyeIcon className="h-4 w-4" />
                                                )}
                                                <span>
                                                    {alert.isActive ? 'Deactivate' : 'Activate'}
                                                </span>
                                            </button>
                                            <button
                                                onClick={() => deleteAlert(alert.id)}
                                                className="flex items-center space-x-2 rounded-lg bg-red-100 px-4 py-2 text-red-700 transition-colors duration-200 hover:bg-red-200"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Create/Edit Form Modal */}
            {showCreateForm && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl"
                    >
                        <div className="p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingAlert ? 'Edit Job Alert' : 'Create New Job Alert'}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowCreateForm(false);
                                        setEditingAlert(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <JobAlertForm
                                alert={editingAlert}
                                onSave={handleSaveAlert}
                                onCancel={() => {
                                    setShowCreateForm(false);
                                    setEditingAlert(null);
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

// Job Alert Form Component
interface JobAlertFormProps {
    alert?: JobAlert | null;
    onSave: (
        alertData: Omit<JobAlert, 'id' | 'createdAt' | 'totalMatches' | 'lastMatchCount'>,
    ) => void;
    onCancel: () => void;
}

function JobAlertForm({ alert, onSave, onCancel }: JobAlertFormProps) {
    const [formData, setFormData] = useState({
        name: alert?.name || '',
        keywords: alert?.keywords.join(', ') || '',
        locations: alert?.locations || [],
        jobTypes: alert?.jobTypes || [],
        experienceLevels: alert?.experienceLevels || [],
        salaryMin: alert?.salaryRange.min.toString() || '',
        salaryMax: alert?.salaryRange.max.toString() || '',
        currency: alert?.salaryRange.currency || 'USD',
        industries: alert?.industries || [],
        remotePreference: alert?.remotePreference || 'any',
        frequency: alert?.frequency || 'weekly',
        isActive: alert?.isActive ?? true,
    });

    const locations = [
        'Remote',
        'San Francisco',
        'New York',
        'Seattle',
        'Austin',
        'Boston',
        'Denver',
        'Chicago',
        'Los Angeles',
        'San Jose',
        'Oakland',
    ];
    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
    const experienceLevels = ['Entry', 'Mid', 'Senior', 'Lead'];
    const industries = [
        'Technology',
        'Finance',
        'Healthcare',
        'E-commerce',
        'Education',
        'Consulting',
        'Media',
        'Manufacturing',
    ];
    const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SGD'];

    const handleLocationToggle = (location: string) => {
        setFormData((prev) => ({
            ...prev,
            locations: prev.locations.includes(location)
                ? prev.locations.filter((l) => l !== location)
                : [...prev.locations, location],
        }));
    };

    const handleJobTypeToggle = (type: string) => {
        setFormData((prev) => ({
            ...prev,
            jobTypes: prev.jobTypes.includes(type)
                ? prev.jobTypes.filter((t) => t !== type)
                : [...prev.jobTypes, type],
        }));
    };

    const handleExperienceToggle = (level: string) => {
        setFormData((prev) => ({
            ...prev,
            experienceLevels: prev.experienceLevels.includes(level)
                ? prev.experienceLevels.filter((e) => e !== level)
                : [...prev.experienceLevels, level],
        }));
    };

    const handleIndustryToggle = (industry: string) => {
        setFormData((prev) => ({
            ...prev,
            industries: prev.industries.includes(industry)
                ? prev.industries.filter((i) => i !== industry)
                : [...prev.industries, industry],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const alertData = {
            name: formData.name,
            keywords: formData.keywords
                .split(',')
                .map((k) => k.trim())
                .filter((k) => k),
            locations: formData.locations,
            jobTypes: formData.jobTypes,
            experienceLevels: formData.experienceLevels,
            salaryRange: {
                min: parseInt(formData.salaryMin) || 0,
                max: parseInt(formData.salaryMax) || 0,
                currency: formData.currency,
            },
            industries: formData.industries,
            remotePreference: formData.remotePreference as
                | 'any'
                | 'remote-only'
                | 'onsite-only'
                | 'hybrid',
            frequency: formData.frequency as 'daily' | 'weekly' | 'monthly',
            isActive: formData.isActive,
        };

        onSave(alertData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Alert Name *
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Frontend Developer - Remote"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Keywords</label>
                    <input
                        type="text"
                        value={formData.keywords}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, keywords: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="React, TypeScript, Frontend (comma separated)"
                    />
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Locations</label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {locations.map((location) => (
                        <label key={location} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.locations.includes(location)}
                                onChange={() => handleLocationToggle(location)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{location}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Job Types
                    </label>
                    <div className="space-y-2">
                        {jobTypes.map((type) => (
                            <label key={type} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.jobTypes.includes(type)}
                                    onChange={() => handleJobTypeToggle(type)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Experience Levels
                    </label>
                    <div className="space-y-2">
                        {experienceLevels.map((level) => (
                            <label key={level} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.experienceLevels.includes(level)}
                                    onChange={() => handleExperienceToggle(level)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{level}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Minimum Salary
                    </label>
                    <input
                        type="number"
                        value={formData.salaryMin}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, salaryMin: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="50000"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Maximum Salary
                    </label>
                    <input
                        type="number"
                        value={formData.salaryMax}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, salaryMax: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="150000"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Currency</label>
                    <select
                        value={formData.currency}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, currency: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Industries</label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {industries.map((industry) => (
                        <label key={industry} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.industries.includes(industry)}
                                onChange={() => handleIndustryToggle(industry)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{industry}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Remote Preference
                    </label>
                    <select
                        value={formData.remotePreference}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, remotePreference: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="any">Any</option>
                        <option value="remote-only">Remote Only</option>
                        <option value="onsite-only">On-site Only</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Notification Frequency
                    </label>
                    <select
                        value={formData.frequency}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, frequency: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Active alert</span>
            </div>

            <div className="flex items-center justify-end space-x-4 border-t border-gray-200 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                >
                    {alert ? 'Update Alert' : 'Create Alert'}
                </button>
            </div>
        </form>
    );
}
