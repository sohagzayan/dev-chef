'use client';

import { useState } from 'react';
import {
    CalculatorIcon,
    ChartBarIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    LightBulbIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface SalaryData {
    role: string;
    location: string;
    companySize: string;
    industry: string;
    experience: number;
    median: number;
    p25: number;
    p75: number;
    p90: number;
    min: number;
    max: number;
    sampleSize: number;
}

interface NegotiationScenario {
    id: string;
    title: string;
    description: string;
    tips: string[];
    sampleScript: string;
    doDont: {
        do: string[];
        dont: string[];
    };
}

export default function SalaryNegotiationPage() {
    const [currentSalary, setCurrentSalary] = useState('');
    const [targetSalary, setTargetSalary] = useState('');

    const [location, setLocation] = useState('');
    const [role, setRole] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [industry, setIndustry] = useState('');

    const [showCalculator, setShowCalculator] = useState(true);
    const [showMarketData, setShowMarketData] = useState(false);
    const [showStrategies, setShowStrategies] = useState(false);

    const locations = [
        'San Francisco',
        'New York',
        'Seattle',
        'Austin',
        'Boston',
        'Denver',
        'Chicago',
        'Remote',
    ];
    const roles = [
        'Software Engineer',
        'Frontend Developer',
        'Backend Developer',
        'DevOps Engineer',
        'Data Scientist',
        'Product Manager',
        'UX Designer',
    ];
    const companySizes = ['Startup (1-50)', 'Small (51-200)', 'Medium (201-1000)', 'Large (1000+)'];
    const industries = [
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'E-commerce',
        'Manufacturing',
    ];

    const mockSalaryData: SalaryData[] = [
        {
            role: 'Software Engineer',
            location: 'San Francisco',
            companySize: 'Large (1000+)',
            industry: 'Technology',
            experience: 5,
            median: 150000,
            p25: 130000,
            p75: 180000,
            p90: 220000,
            min: 110000,
            max: 250000,
            sampleSize: 1250,
        },
        {
            role: 'Frontend Developer',
            location: 'New York',
            companySize: 'Medium (201-1000)',
            industry: 'Technology',
            experience: 3,
            median: 120000,
            p25: 100000,
            p75: 140000,
            p90: 160000,
            min: 85000,
            max: 180000,
            sampleSize: 890,
        },
        {
            role: 'Data Scientist',
            location: 'Seattle',
            companySize: 'Large (1000+)',
            industry: 'Technology',
            experience: 4,
            median: 140000,
            p25: 120000,
            p75: 170000,
            p90: 200000,
            min: 100000,
            max: 230000,
            sampleSize: 650,
        },
    ];

    const negotiationScenarios: NegotiationScenario[] = [
        {
            id: '1',
            title: 'Countering a Low Offer',
            description: 'When the initial offer is below market rate or your expectations',
            tips: [
                'Research market rates thoroughly before responding',
                'Express enthusiasm for the role while addressing compensation',
                'Provide specific data to support your counter',
                'Consider total compensation, not just base salary',
            ],
            sampleScript:
                "I'm very excited about this opportunity and believe I can bring significant value to the team. Based on my research of the market and my experience, I was expecting a range of $X-$Y. Is there flexibility in the budget for this role?",
            doDont: {
                do: [
                    'Come prepared with market research',
                    'Focus on your value and contributions',
                    'Be specific about your expectations',
                    'Show enthusiasm for the role',
                ],
                dont: [
                    'Accept immediately without consideration',
                    'Make ultimatums or threats',
                    'Focus only on salary without considering benefits',
                    'Negotiate aggressively without research',
                ],
            },
        },
        {
            id: '2',
            title: 'Promotion Negotiation',
            description: 'Negotiating salary when being promoted within your company',
            tips: [
                'Document your achievements and contributions',
                'Research market rates for the new role',
                "Highlight the value you've brought to the company",
                'Consider timing and company performance',
            ],
            sampleScript:
                "I'm grateful for the promotion and excited about the new responsibilities. Given my contributions to the team and the market rate for this role, I'd like to discuss the compensation package to ensure it reflects the increased scope.",
            doDont: {
                do: [
                    'Document your achievements',
                    'Research market rates for the new role',
                    'Show appreciation for the promotion',
                    'Focus on your contributions and value',
                ],
                dont: [
                    'Take the promotion for granted',
                    'Compare yourself to other employees',
                    'Make demands without justification',
                    'Forget to consider total compensation',
                ],
            },
        },
        {
            id: '3',
            title: 'New Job Offer',
            description: 'Negotiating salary for a new position at a different company',
            tips: [
                "Don't disclose your current salary unless required",
                'Let them make the first offer when possible',
                'Consider the entire compensation package',
                'Negotiate multiple aspects, not just salary',
            ],
            sampleScript:
                "I'm very interested in this role and excited about the opportunity to contribute to your team. Based on my experience and the market, I was expecting a range of $X-$Y. I'd also like to discuss the overall compensation package including benefits and equity.",
            doDont: {
                do: [
                    'Research the company and role thoroughly',
                    'Consider the entire compensation package',
                    'Show enthusiasm for the opportunity',
                    'Be prepared to walk away if needed',
                ],
                dont: [
                    'Disclose your current salary unnecessarily',
                    'Accept the first offer without consideration',
                    'Focus only on base salary',
                    'Make decisions based on emotion',
                ],
            },
        },
    ];

    const calculateSalaryIncrease = () => {
        if (!currentSalary || !targetSalary) return null;

        const current = parseFloat(currentSalary);
        const target = parseFloat(targetSalary);

        if (isNaN(current) || isNaN(target)) return null;

        const increase = target - current;
        const percentage = (increase / current) * 100;

        return { increase, percentage };
    };

    const getMarketData = () => {
        if (!role || !location || !companySize || !industry) return null;

        return mockSalaryData.find(
            (data) =>
                data.role === role &&
                data.location === location &&
                data.companySize === companySize &&
                data.industry === industry,
        );
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const salaryIncrease = calculateSalaryIncrease();
    const marketData = getMarketData();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 lg:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-3">
                    <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Salary Negotiation</h1>
                </div>
                <p className="text-gray-600">
                    Tools and strategies to help you negotiate better compensation
                </p>
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Navigation Tabs */}
                <div className="mb-6 rounded-2xl bg-white p-2 shadow-lg">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => {
                                setShowCalculator(true);
                                setShowMarketData(false);
                                setShowStrategies(false);
                            }}
                            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                showCalculator
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <CalculatorIcon className="mr-2 inline h-4 w-4" />
                            Calculator
                        </button>
                        <button
                            onClick={() => {
                                setShowCalculator(false);
                                setShowMarketData(true);
                                setShowStrategies(false);
                            }}
                            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                showMarketData
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <ChartBarIcon className="mr-2 inline h-4 w-4" />
                            Market Data
                        </button>
                        <button
                            onClick={() => {
                                setShowCalculator(false);
                                setShowMarketData(false);
                                setShowStrategies(true);
                            }}
                            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                showStrategies
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <DocumentTextIcon className="mr-2 inline h-4 w-4" />
                            Strategies
                        </button>
                    </div>
                </div>

                {/* Calculator Section */}
                {showCalculator && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6 rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <div className="mb-6 flex items-center space-x-3">
                            <CalculatorIcon className="h-6 w-6 text-blue-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                Salary Increase Calculator
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Current Annual Salary
                                </label>
                                <div className="relative">
                                    <CurrencyDollarIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={currentSalary}
                                        onChange={(e) => setCurrentSalary(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Target Annual Salary
                                </label>
                                <div className="relative">
                                    <CurrencyDollarIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={targetSalary}
                                        onChange={(e) => setTargetSalary(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {salaryIncrease && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4"
                            >
                                <h3 className="mb-3 font-medium text-blue-900">
                                    Salary Increase Analysis
                                </h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {formatCurrency(salaryIncrease.increase)}
                                        </div>
                                        <div className="text-sm text-blue-700">
                                            Absolute Increase
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {salaryIncrease.percentage.toFixed(1)}%
                                        </div>
                                        <div className="text-sm text-blue-700">
                                            Percentage Increase
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 rounded border border-blue-200 bg-white p-3">
                                    <h4 className="mb-2 font-medium text-blue-900">
                                        Negotiation Tips:
                                    </h4>
                                    <ul className="space-y-1 text-sm text-blue-800">
                                        <li>
                                            • Research market rates for similar roles in your area
                                        </li>
                                        <li>
                                            • Highlight your achievements and value to the company
                                        </li>
                                        <li>
                                            • Consider the total compensation package, not just
                                            salary
                                        </li>
                                        <li>
                                            • Be prepared to negotiate multiple aspects (salary,
                                            benefits, equity)
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Market Data Section */}
                {showMarketData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6 rounded-2xl bg-white p-6 shadow-lg"
                    >
                        <div className="mb-6 flex items-center space-x-3">
                            <ChartBarIcon className="h-6 w-6 text-green-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Market Salary Data</h2>
                        </div>

                        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Role</option>
                                    {roles.map((r) => (
                                        <option key={r} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Location
                                </label>
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Location</option>
                                    {locations.map((loc) => (
                                        <option key={loc} value={loc}>
                                            {loc}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Company Size
                                </label>
                                <select
                                    value={companySize}
                                    onChange={(e) => setCompanySize(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Size</option>
                                    {companySizes.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Industry
                                </label>
                                <select
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Industry</option>
                                    {industries.map((ind) => (
                                        <option key={ind} value={ind}>
                                            {ind}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {marketData ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {formatCurrency(marketData.median)}
                                        </div>
                                        <div className="text-sm text-gray-600">Median</div>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {formatCurrency(marketData.p25)}
                                        </div>
                                        <div className="text-sm text-gray-600">25th Percentile</div>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {formatCurrency(marketData.p75)}
                                        </div>
                                        <div className="text-sm text-gray-600">75th Percentile</div>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {formatCurrency(marketData.p90)}
                                        </div>
                                        <div className="text-sm text-gray-600">90th Percentile</div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                    <h4 className="mb-3 font-medium text-blue-900">
                                        Salary Range Analysis
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-blue-800">Range:</span>
                                            <span className="font-medium text-blue-900">
                                                {formatCurrency(marketData.min)} -{' '}
                                                {formatCurrency(marketData.max)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-blue-800">
                                                Sample Size:
                                            </span>
                                            <span className="font-medium text-blue-900">
                                                {marketData.sampleSize} professionals
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-blue-800">
                                                Experience Level:
                                            </span>
                                            <span className="font-medium text-blue-900">
                                                {marketData.experience} years
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="py-8 text-center text-gray-500">
                                <ChartBarIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <p>Select criteria above to view market salary data</p>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Strategies Section */}
                {showStrategies && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="rounded-2xl bg-white p-6 shadow-lg">
                            <div className="mb-6 flex items-center space-x-3">
                                <DocumentTextIcon className="h-6 w-6 text-purple-600" />
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Negotiation Strategies
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {negotiationScenarios.map((scenario) => (
                                    <motion.div
                                        key={scenario.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="rounded-lg border border-gray-200 p-6"
                                    >
                                        <h3 className="mb-3 text-xl font-semibold text-gray-900">
                                            {scenario.title}
                                        </h3>
                                        <p className="mb-4 text-gray-600">{scenario.description}</p>

                                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                            <div>
                                                <h4 className="mb-3 flex items-center font-medium text-gray-900">
                                                    <LightBulbIcon className="mr-2 h-5 w-5 text-yellow-500" />
                                                    Key Tips
                                                </h4>
                                                <ul className="space-y-2">
                                                    {scenario.tips.map((tip, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start space-x-2"
                                                        >
                                                            <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                                            <span className="text-gray-700">
                                                                {tip}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="mb-3 font-medium text-gray-900">
                                                    Sample Script
                                                </h4>
                                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                                                    <p className="text-sm text-gray-700 italic">
                                                        "{scenario.sampleScript}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                            <div>
                                                <h4 className="mb-3 flex items-center font-medium text-green-700">
                                                    <CheckCircleIcon className="mr-2 h-5 w-5 text-green-500" />
                                                    Do's
                                                </h4>
                                                <ul className="space-y-2">
                                                    {scenario.doDont.do.map((item, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start space-x-2"
                                                        >
                                                            <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                                            <span className="text-gray-700">
                                                                {item}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="mb-3 flex items-center font-medium text-red-700">
                                                    <ExclamationTriangleIcon className="mr-2 h-5 w-5 text-red-500" />
                                                    Don'ts
                                                </h4>
                                                <ul className="space-y-2">
                                                    {scenario.doDont.dont.map((item, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start space-x-2"
                                                        >
                                                            <XCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                                                            <span className="text-gray-700">
                                                                {item}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-lg">
                            <div className="mb-4 flex items-center space-x-3">
                                <InformationCircleIcon className="h-6 w-6 text-blue-600" />
                                <h3 className="text-xl font-semibold text-gray-900">
                                    General Negotiation Tips
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <h4 className="mb-3 font-medium text-gray-900">
                                        Before Negotiating
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li>• Research market rates for your role and location</li>
                                        <li>• Document your achievements and contributions</li>
                                        <li>• Understand your worth and bottom line</li>
                                        <li>• Practice your negotiation pitch</li>
                                        <li>• Consider the total compensation package</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="mb-3 font-medium text-gray-900">
                                        During Negotiation
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li>• Listen actively and ask questions</li>
                                        <li>• Stay calm and professional</li>
                                        <li>• Focus on your value, not just needs</li>
                                        <li>• Be prepared to compromise</li>
                                        <li>• Get everything in writing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
