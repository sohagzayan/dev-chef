'use client';

import { useState } from 'react';
import {
    AcademicCapIcon,
    BellIcon,
    BriefcaseIcon,
    CheckIcon,
    CogIcon,
    CurrencyDollarIcon,
    MapPinIcon,
    PlusIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface JobAlert {
    id: string;
    name: string;
    keywords: string[];
    locations: string[];
    jobTypes: string[];
    experienceLevels: string[];
    salaryRange: {
        min: number;
        max: number;
        currency: string;
    };
    industries: string[];
    remotePreference: 'any' | 'remote-only' | 'onsite-only' | 'hybrid';
    frequency: 'daily' | 'weekly' | 'monthly';
    isActive: boolean;
    createdAt: string;
    lastTriggered?: string;
    totalMatches: number;
}

export default function CreateJobAlertPage() {
    const [alertName, setAlertName] = useState('');
    const [keywords, setKeywords] = useState('');
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
    const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
    const [salaryMin, setSalaryMin] = useState('');
    const [salaryMax, setSalaryMax] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [remotePreference, setRemotePreference] = useState<string>('any');
    const [frequency, setFrequency] = useState<string>('weekly');
    const [isActive, setIsActive] = useState(true);

    const locations = [
        'Remote',
        'New York',
        'San Francisco',
        'London',
        'Berlin',
        'Toronto',
        'Singapore',
        'Austin',
        'Seattle',
        'Boston',
        'Chicago',
        'Los Angeles',
        'Amsterdam',
        'Paris',
        'Tokyo',
        'Sydney',
        'Dubai',
        'Mumbai',
    ];

    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance', 'Temporary'];

    const experienceLevels = ['Entry', 'Junior', 'Mid', 'Senior', 'Lead', 'Principal', 'Executive'];

    const industries = [
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'E-commerce',
        'Manufacturing',
        'Consulting',
        'Media',
        'Real Estate',
        'Transportation',
        'Energy',
        'Retail',
        'Entertainment',
        'Non-profit',
        'Government',
    ];

    const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SGD'];

    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    const handleLocationToggle = (location: string) => {
        setSelectedLocations((prev) =>
            prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location],
        );
    };

    const handleJobTypeToggle = (type: string) => {
        setSelectedJobTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
        );
    };

    const handleExperienceToggle = (level: string) => {
        setSelectedExperienceLevels((prev) =>
            prev.includes(level) ? prev.filter((e) => e !== level) : [...prev, level],
        );
    };

    const handleIndustryToggle = (industry: string) => {
        setSelectedIndustries((prev) =>
            prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry],
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newAlert: JobAlert = {
            id: Date.now().toString(),
            name: alertName,
            keywords: keywords
                .split(',')
                .map((k) => k.trim())
                .filter((k) => k),
            locations: selectedLocations,
            jobTypes: selectedJobTypes,
            experienceLevels: selectedExperienceLevels,
            salaryRange: {
                min: parseInt(salaryMin) || 0,
                max: parseInt(salaryMax) || 0,
                currency: selectedCurrency,
            },
            industries: selectedIndustries,
            remotePreference: remotePreference as any,
            frequency: frequency as any,
            isActive,
            createdAt: new Date().toISOString(),
            totalMatches: 0,
        };

        console.log('Creating job alert:', newAlert);
        // Here you would typically save to your backend

        // Reset form
        setAlertName('');
        setKeywords('');
        setSelectedLocations([]);
        setSelectedJobTypes([]);
        setSelectedExperienceLevels([]);
        setSalaryMin('');
        setSalaryMax('');
        setSelectedIndustries([]);
        setRemotePreference('any');
        setFrequency('weekly');
        setIsActive(true);
    };

    const getKeywordSuggestions = () => {
        const commonKeywords = [
            'React',
            'TypeScript',
            'Python',
            'Machine Learning',
            'DevOps',
            'Product Management',
            'UI/UX Design',
            'Data Science',
            'Cloud Computing',
            'Mobile Development',
            'Cybersecurity',
            'Blockchain',
            'AI',
            'Frontend',
            'Backend',
            'Full Stack',
            'Mobile App',
            'Web Development',
        ];
        return commonKeywords;
    };

    const addKeyword = (keyword: string) => {
        const currentKeywords = keywords ? keywords.split(',').map((k) => k.trim()) : [];
        if (!currentKeywords.includes(keyword)) {
            setKeywords([...currentKeywords, keyword].join(', '));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <BellIcon className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Create Job Alert</h1>
                </div>
                <p className="text-gray-600">
                    Set up personalized job notifications based on your preferences
                </p>
            </div>

            <div className="mx-auto max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-900">
                            <BriefcaseIcon className="mr-2 h-5 w-5 text-blue-600" />
                            Basic Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="alertName"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Alert Name *
                                </label>
                                <input
                                    type="text"
                                    id="alertName"
                                    value={alertName}
                                    onChange={(e) => setAlertName(e.target.value)}
                                    placeholder="e.g., Senior React Developer Jobs"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="keywords"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Keywords & Skills *
                                </label>
                                <input
                                    type="text"
                                    id="keywords"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    placeholder="e.g., React, TypeScript, Frontend Development"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Separate multiple keywords with commas
                                </p>

                                {/* Keyword Suggestions */}
                                <div className="mt-3">
                                    <p className="mb-2 text-sm text-gray-600">Popular keywords:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {getKeywordSuggestions().map((keyword) => (
                                            <button
                                                key={keyword}
                                                type="button"
                                                onClick={() => addKeyword(keyword)}
                                                className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 transition-colors duration-200 hover:bg-blue-200"
                                            >
                                                + {keyword}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Location & Remote Work */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-900">
                            <MapPinIcon className="mr-2 h-5 w-5 text-green-600" />
                            Location & Remote Work
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    Preferred Locations
                                </label>
                                <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto md:grid-cols-3">
                                    {locations.map((location) => (
                                        <label
                                            key={location}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedLocations.includes(location)}
                                                onChange={() => handleLocationToggle(location)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">
                                                {location}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="remotePreference"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Remote Work Preference
                                </label>
                                <select
                                    id="remotePreference"
                                    value={remotePreference}
                                    onChange={(e) => setRemotePreference(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="any">Any (Remote, On-site, or Hybrid)</option>
                                    <option value="remote-only">Remote Only</option>
                                    <option value="onsite-only">On-site Only</option>
                                    <option value="hybrid">Hybrid (Remote + On-site)</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* Job Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-900">
                            <CogIcon className="mr-2 h-5 w-5 text-purple-600" />
                            Job Details
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    Job Types
                                </label>
                                <div className="space-y-2">
                                    {jobTypes.map((type) => (
                                        <label key={type} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedJobTypes.includes(type)}
                                                onChange={() => handleJobTypeToggle(type)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    Experience Levels
                                </label>
                                <div className="space-y-2">
                                    {experienceLevels.map((level) => (
                                        <label key={level} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedExperienceLevels.includes(level)}
                                                onChange={() => handleExperienceToggle(level)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{level}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Salary & Industries */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-900">
                            <CurrencyDollarIcon className="mr-2 h-5 w-5 text-yellow-600" />
                            Salary & Industries
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Salary Range
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={salaryMin}
                                            onChange={(e) => setSalaryMin(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={salaryMax}
                                            onChange={(e) => setSalaryMax(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <select
                                            value={selectedCurrency}
                                            onChange={(e) => setSelectedCurrency(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        >
                                            {currencies.map((currency) => (
                                                <option key={currency} value={currency}>
                                                    {currency}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Leave empty for any salary range
                                </p>
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    Industries
                                </label>
                                <div className="grid max-h-32 grid-cols-2 gap-2 overflow-y-auto">
                                    {industries.map((industry) => (
                                        <label
                                            key={industry}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedIndustries.includes(industry)}
                                                onChange={() => handleIndustryToggle(industry)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">
                                                {industry}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Notification Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-900">
                            <BellIcon className="mr-2 h-5 w-5 text-red-600" />
                            Notification Settings
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="frequency"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Notification Frequency
                                </label>
                                <select
                                    id="frequency"
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="isActive"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Alert is active
                                </label>
                            </div>
                        </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="flex justify-end space-x-4"
                    >
                        <button
                            type="button"
                            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                        >
                            Save as Draft
                        </button>
                        <button
                            type="submit"
                            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                        >
                            <CheckIcon className="h-5 w-5" />
                            <span>Create Job Alert</span>
                        </button>
                    </motion.div>
                </form>
            </div>
        </div>
    );
}
