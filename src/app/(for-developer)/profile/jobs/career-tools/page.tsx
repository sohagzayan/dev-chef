'use client';

import { useState } from 'react';
import {
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    DownloadIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    LightBulbIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    PlusIcon,
    ShareIcon,
    StarIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Resume {
    id: string;
    name: string;
    template: string;
    lastModified: string;
    isDefault: boolean;
    sections: string[];
    wordCount: number;
    status: 'draft' | 'completed' | 'archived';
}

interface CoverLetter {
    id: string;
    title: string;
    company: string;
    position: string;
    lastModified: string;
    isDefault: boolean;
    wordCount: number;
    status: 'draft' | 'completed' | 'archived';
}

interface SalaryData {
    position: string;
    location: string;
    experience: string;
    avgSalary: number;
    minSalary: number;
    maxSalary: number;
    currency: string;
    dataPoints: number;
    lastUpdated: string;
}

export default function CareerToolsPage() {
    const [selectedTab, setSelectedTab] = useState('resume');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);

    const tabs = [
        { id: 'resume', label: 'Resume Builder', icon: DocumentTextIcon },
        { id: 'cover-letter', label: 'Cover Letter', icon: EnvelopeIcon },
        { id: 'salary', label: 'Salary Negotiation', icon: CurrencyDollarIcon },
    ];

    const resumes: Resume[] = [
        {
            id: '1',
            name: 'Software Engineer Resume',
            template: 'Modern Professional',
            lastModified: '2024-01-20',
            isDefault: true,
            sections: ['Contact', 'Summary', 'Experience', 'Education', 'Skills', 'Projects'],
            wordCount: 450,
            status: 'completed',
        },
        {
            id: '2',
            name: 'Product Manager Resume',
            template: 'Creative Minimal',
            lastModified: '2024-01-18',
            isDefault: false,
            sections: ['Contact', 'Summary', 'Experience', 'Education', 'Skills'],
            wordCount: 380,
            status: 'draft',
        },
        {
            id: '3',
            name: 'Data Scientist Resume',
            template: 'Academic Professional',
            lastModified: '2024-01-15',
            isDefault: false,
            sections: ['Contact', 'Summary', 'Experience', 'Education', 'Skills', 'Publications'],
            wordCount: 520,
            status: 'completed',
        },
    ];

    const coverLetters: CoverLetter[] = [
        {
            id: '1',
            title: 'Frontend Developer - TechCorp',
            company: 'TechCorp',
            position: 'Senior Frontend Developer',
            lastModified: '2024-01-19',
            isDefault: true,
            wordCount: 320,
            status: 'completed',
        },
        {
            id: '2',
            title: 'Backend Engineer - DataFlow',
            company: 'DataFlow',
            position: 'Backend Engineer',
            lastModified: '2024-01-17',
            isDefault: false,
            wordCount: 280,
            status: 'draft',
        },
        {
            id: '3',
            title: 'DevOps Engineer - CloudScale',
            company: 'CloudScale',
            position: 'DevOps Engineer',
            lastModified: '2024-01-14',
            isDefault: false,
            wordCount: 350,
            status: 'completed',
        },
    ];

    const salaryData: SalaryData[] = [
        {
            position: 'Software Engineer',
            location: 'San Francisco, CA',
            experience: '3-5 years',
            avgSalary: 130000,
            minSalary: 100000,
            maxSalary: 160000,
            currency: 'USD',
            dataPoints: 1247,
            lastUpdated: '2024-01-20',
        },
        {
            position: 'Product Manager',
            location: 'New York, NY',
            experience: '5-7 years',
            avgSalary: 140000,
            minSalary: 110000,
            maxSalary: 180000,
            currency: 'USD',
            dataPoints: 892,
            lastUpdated: '2024-01-18',
        },
        {
            position: 'Data Scientist',
            location: 'Seattle, WA',
            experience: '2-4 years',
            avgSalary: 120000,
            minSalary: 90000,
            maxSalary: 150000,
            currency: 'USD',
            dataPoints: 654,
            lastUpdated: '2024-01-15',
        },
        {
            position: 'DevOps Engineer',
            location: 'Austin, TX',
            experience: '4-6 years',
            avgSalary: 125000,
            minSalary: 95000,
            maxSalary: 155000,
            currency: 'USD',
            dataPoints: 456,
            lastUpdated: '2024-01-12',
        },
    ];

    const getFilteredResumes = () => {
        if (!searchQuery) return resumes;
        return resumes.filter(
            (resume) =>
                resume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                resume.template.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    };

    const getFilteredCoverLetters = () => {
        if (!searchQuery) return coverLetters;
        return coverLetters.filter(
            (letter) =>
                letter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                letter.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                letter.position.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    };

    const getFilteredSalaryData = () => {
        if (!searchQuery) return salaryData;
        return salaryData.filter(
            (data) =>
                data.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                data.location.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    };

    const filteredResumes = getFilteredResumes();
    const filteredCoverLetters = getFilteredCoverLetters();
    const filteredSalaryData = getFilteredSalaryData();

    const createNew = (type: string) => {
        console.log('Create new', type);
        setShowCreateForm(false);
    };

    const editItem = (type: string, id: string) => {
        console.log('Edit', type, id);
    };

    const deleteItem = (type: string, id: string) => {
        console.log('Delete', type, id);
    };

    const duplicateItem = (type: string, id: string) => {
        console.log('Duplicate', type, id);
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'archived':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatSalary = (salary: number) => {
        if (salary >= 1000) {
            return `$${(salary / 1000).toFixed(0)}k`;
        }
        return `$${salary}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Career Tools</h1>
                <p className="text-gray-600">
                    Build your professional documents and research salary information
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

            {/* Create Button */}
            <div className="mb-6">
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                >
                    <PlusIcon className="h-5 w-5" />
                    <span>
                        Create New{' '}
                        {selectedTab === 'resume'
                            ? 'Resume'
                            : selectedTab === 'cover-letter'
                              ? 'Cover Letter'
                              : 'Salary Research'}
                    </span>
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={`Search ${selectedTab === 'resume' ? 'resumes' : selectedTab === 'cover-letter' ? 'cover letters' : 'salary data'}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Content */}
            {selectedTab === 'resume' ? (
                <>
                    {/* Resume Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing{' '}
                            <span className="font-semibold text-gray-900">
                                {filteredResumes.length}
                            </span>{' '}
                            resumes
                        </p>
                    </div>

                    {/* Resumes Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {filteredResumes.map((resume) => (
                            <motion.div
                                key={resume.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                {/* Default Badge */}
                                {resume.isDefault && (
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                            Default
                                        </span>
                                    </div>
                                )}

                                {/* Resume Header */}
                                <div className="border-b border-gray-100 p-6">
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                                {resume.name}
                                            </h3>

                                            <div className="mb-3 text-sm text-gray-600">
                                                Template:{' '}
                                                <span className="font-medium">
                                                    {resume.template}
                                                </span>
                                            </div>

                                            {/* Sections */}
                                            <div className="mb-3">
                                                <h5 className="mb-2 text-sm font-medium text-gray-700">
                                                    Sections:
                                                </h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {resume.sections.map((section) => (
                                                        <span
                                                            key={section}
                                                            className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700"
                                                        >
                                                            {section}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                                <div>
                                                    <span className="font-medium">Words:</span>{' '}
                                                    {resume.wordCount}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Modified:</span>{' '}
                                                    {getTimeAgo(resume.lastModified)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(resume.status)}`}
                                        >
                                            {resume.status.charAt(0).toUpperCase() +
                                                resume.status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {/* Resume Actions */}
                                <div className="p-6">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => editItem('resume', resume.id)}
                                            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                                        >
                                            <PencilIcon className="mr-2 inline h-4 w-4" />
                                            Edit
                                        </button>
                                        <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                            <EyeIcon className="mr-2 inline h-4 w-4" />
                                            Preview
                                        </button>
                                        <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                            <DownloadIcon className="mr-2 inline h-4 w-4" />
                                            Export
                                        </button>
                                    </div>

                                    <div className="mt-3 flex space-x-3">
                                        <button
                                            onClick={() => duplicateItem('resume', resume.id)}
                                            className="flex-1 rounded-lg bg-green-100 px-4 py-2 font-medium text-green-700 transition-colors duration-200 hover:bg-green-200"
                                        >
                                            Duplicate
                                        </button>
                                        <button
                                            onClick={() => deleteItem('resume', resume.id)}
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
                    {filteredResumes.length === 0 && (
                        <div className="py-12 text-center">
                            <DocumentTextIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No resumes found
                            </h3>
                            <p className="text-gray-600">
                                Create your first resume to get started.
                            </p>
                        </div>
                    )}
                </>
            ) : selectedTab === 'cover-letter' ? (
                <>
                    {/* Cover Letter Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing{' '}
                            <span className="font-semibold text-gray-900">
                                {filteredCoverLetters.length}
                            </span>{' '}
                            cover letters
                        </p>
                    </div>

                    {/* Cover Letters Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {filteredCoverLetters.map((letter) => (
                            <motion.div
                                key={letter.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                {/* Default Badge */}
                                {letter.isDefault && (
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                            Default
                                        </span>
                                    </div>
                                )}

                                {/* Cover Letter Header */}
                                <div className="border-b border-gray-100 p-6">
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                                {letter.title}
                                            </h3>

                                            <div className="mb-3 text-sm text-gray-600">
                                                <div>
                                                    Company:{' '}
                                                    <span className="font-medium">
                                                        {letter.company}
                                                    </span>
                                                </div>
                                                <div>
                                                    Position:{' '}
                                                    <span className="font-medium">
                                                        {letter.position}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                                <div>
                                                    <span className="font-medium">Words:</span>{' '}
                                                    {letter.wordCount}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Modified:</span>{' '}
                                                    {getTimeAgo(letter.lastModified)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(letter.status)}`}
                                        >
                                            {letter.status.charAt(0).toUpperCase() +
                                                letter.status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {/* Cover Letter Actions */}
                                <div className="p-6">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => editItem('cover-letter', letter.id)}
                                            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                                        >
                                            <PencilIcon className="mr-2 inline h-4 w-4" />
                                            Edit
                                        </button>
                                        <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                            <EyeIcon className="mr-2 inline h-4 w-4" />
                                            Preview
                                        </button>
                                        <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                            <DownloadIcon className="mr-2 inline h-4 w-4" />
                                            Export
                                        </button>
                                    </div>

                                    <div className="mt-3 flex space-x-3">
                                        <button
                                            onClick={() => duplicateItem('cover-letter', letter.id)}
                                            className="flex-1 rounded-lg bg-green-100 px-4 py-2 font-medium text-green-700 transition-colors duration-200 hover:bg-green-200"
                                        >
                                            Duplicate
                                        </button>
                                        <button
                                            onClick={() => deleteItem('cover-letter', letter.id)}
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
                    {filteredCoverLetters.length === 0 && (
                        <div className="py-12 text-center">
                            <EnvelopeIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No cover letters found
                            </h3>
                            <p className="text-gray-600">
                                Create your first cover letter to get started.
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* Salary Data Count */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Showing{' '}
                            <span className="font-semibold text-gray-900">
                                {filteredSalaryData.length}
                            </span>{' '}
                            salary data points
                        </p>
                    </div>

                    {/* Salary Data Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {filteredSalaryData.map((data) => (
                            <motion.div
                                key={`${data.position}-${data.location}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                {/* Salary Header */}
                                <div className="border-b border-gray-100 p-6">
                                    <div className="mb-4">
                                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                            {data.position}
                                        </h3>

                                        <div className="mb-3 text-sm text-gray-600">
                                            <div>
                                                Location:{' '}
                                                <span className="font-medium">{data.location}</span>
                                            </div>
                                            <div>
                                                Experience:{' '}
                                                <span className="font-medium">
                                                    {data.experience}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Salary Range */}
                                        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                                            <div className="text-center">
                                                <div className="mb-1 text-2xl font-bold text-gray-900">
                                                    {formatSalary(data.avgSalary)}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Average Salary
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Salary Stats */}
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div className="text-center">
                                            <div className="font-semibold text-gray-900">
                                                {formatSalary(data.minSalary)}
                                            </div>
                                            <div>Min</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-gray-900">
                                                {formatSalary(data.maxSalary)}
                                            </div>
                                            <div>Max</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Salary Details */}
                                <div className="p-6">
                                    {/* Data Quality */}
                                    <div className="mb-4">
                                        <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                                            <span>Data Quality</span>
                                            <span>{data.dataPoints} data points</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div
                                                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                                                style={{
                                                    width: `${Math.min((data.dataPoints / 1000) * 100, 100)}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Last Updated */}
                                    <div className="mb-4 text-xs text-gray-500">
                                        Last updated: {getTimeAgo(data.lastUpdated)}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                            <ChartBarIcon className="mr-2 inline h-4 w-4" />
                                            View Details
                                        </button>
                                        <button className="flex-1 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                                            <ShareIcon className="mr-2 inline h-4 w-4" />
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredSalaryData.length === 0 && (
                        <div className="py-12 text-center">
                            <CurrencyDollarIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No salary data found
                            </h3>
                            <p className="text-gray-600">
                                No salary information matches your search criteria.
                            </p>
                        </div>
                    )}

                    {/* Salary Tips */}
                    <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
                        <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                            <LightBulbIcon className="mr-2 h-5 w-5 text-yellow-500" />
                            Salary Negotiation Tips
                        </h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-3">
                                <div className="flex items-start space-x-2">
                                    <CheckCircleIcon className="mt-0.5 h-5 w-5 text-green-500" />
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Research Market Rates
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Use salary data to understand your market value
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircleIcon className="mt-0.5 h-5 w-5 text-green-500" />
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Highlight Your Value
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Focus on achievements and contributions
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-2">
                                    <CheckCircleIcon className="mt-0.5 h-5 w-5 text-green-500" />
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Practice Your Pitch
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Rehearse your negotiation points
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircleIcon className="mt-0.5 h-5 w-5 text-green-500" />
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            Consider Total Package
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Look beyond base salary to benefits and equity
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
