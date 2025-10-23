'use client';

import { motion } from 'framer-motion';

const JobListings = () => {
    const mockJobs = [
        {
            id: 1,
            title: 'Lead Brand Designer',
            company: 'Gymdesk',
            logo: 'G',
            logoColor: 'bg-red-500',
            employmentType: 'Full Time',
            locations: ['Canada', 'United States'],
            skills: ['Adobe CC', 'Brand Design', 'Canva', 'Capcut', 'Figma'],
            status: ['New Job!', 'Featured Job'],
            postedDays: null,
        },
        {
            id: 2,
            title: 'Marketing Operations Specialist',
            company: 'Ape Born',
            logo: 'ab',
            logoColor: 'bg-black',
            employmentType: 'Full Time',
            locations: ['Latin America', 'Europe', 'Canada', 'United States'],
            skills: ['Attention to detail', 'Marketing', 'Problem Solving', 'Time management'],
            status: ['New Job!', 'Featured Job'],
            postedDays: null,
        },
        {
            id: 3,
            title: 'Operations Specialist',
            company: 'Winning Ivy Prep College Admissions',
            logo: 'WIP',
            logoColor: 'bg-red-500',
            employmentType: 'Full Time',
            locations: ['Latin America'],
            skills: [
                'Attention to detail',
                'Critical thinking',
                'Operations Management',
                'Organizational skills',
                'Problem solving skills',
            ],
            status: ['New Job!', 'Featured Job'],
            postedDays: null,
        },
        {
            id: 4,
            title: 'HubSpot Consultant',
            company: 'Paradox Marketing',
            logo: 'PM',
            logoColor: 'bg-blue-400',
            employmentType: 'Full Time',
            locations: ['Canada', 'Europe', 'Latin America', 'South America'],
            skills: [
                'Analytical thinking',
                'Attention to detail',
                'Automation',
                'CRM',
                'Digital Marketing',
            ],
            status: ['Featured Job'],
            postedDays: 3,
        },
        {
            id: 5,
            title: 'Entry-Level Designer @ Fun Ecom Co | Great People & Flexible Hours',
            company: 'JLS Trading Co.',
            logo: 'JLS',
            logoColor: 'bg-blue-600',
            employmentType: 'Full Time',
            locations: [
                'Latin America',
                'Europe',
                'South Africa',
                'South-eastern Asia',
                'Northern Africa',
            ],
            skills: ['Ability to Learn', 'Clear Communication Skills', 'Optimization'],
            status: ['Featured Job'],
            postedDays: 12,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    className="mb-4 flex flex-col items-center justify-between space-y-4 px-4 sm:flex-row sm:space-y-0 md:px-0"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div className="flex flex-row items-end" variants={itemVariants}>
                        <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#8BC34A] to-[#7CB342] shadow-lg">
                                <span className="text-lg font-bold text-white">💼</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                                    Top DevChef Jobs
                                </h2>
                                <time className="mt-1 block text-sm text-gray-600">
                                    Updated{' '}
                                    {new Date().toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </time>
                            </div>
                        </div>
                    </motion.div>

                    <motion.a
                        href="/enter/sign-up/candidate"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#8BC34A] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#7CB342] hover:shadow-lg"
                        variants={itemVariants}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="h-4 w-4"
                        >
                            <path d="M4.214 3.227a.75.75 0 0 0-1.156-.955 8.97 8.97 0 0 0-1.856 3.825.75.75 0 0 0 1.466.316 7.47 7.47 0 0 1 1.546-3.186ZM16.942 2.272a.75.75 0 0 0-1.157.955 7.47 7.47 0 0 1 1.547 3.186.75.75 0 0 0 1.466-.316 8.971 8.971 0 0 0-1.856-3.825Z"></path>
                            <path
                                fillRule="evenodd"
                                d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 14.5a2 2 0 0 1-1.95-1.557 33.54 33.54 0 0 0 3.9 0A2 2 0 0 1 10 16.5Z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        Subscribe to Job Alerts
                    </motion.a>
                </motion.div>

                <div className="space-y-4">
                    {mockJobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            variants={itemVariants}
                            className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                        >
                            <div className="relative flex items-start space-x-4">
                                {/* Company Logo */}
                                <div className="flex-shrink-0">
                                    <div
                                        className={`${job.logoColor} flex h-14 w-14 items-center justify-center rounded-lg shadow-sm`}
                                    >
                                        <span className="text-sm font-semibold text-white">
                                            {job.logo}
                                        </span>
                                    </div>
                                </div>

                                {/* Job Details */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                                        <div className="flex-1">
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    <a
                                                        href="#"
                                                        className="hover:text-[#8BC34A] hover:underline"
                                                    >
                                                        {job.title}
                                                    </a>
                                                </h3>
                                                <div className="flex items-center space-x-2">
                                                    <a
                                                        href="#"
                                                        className="text-sm font-medium text-[rgba(0,55,32,1)] hover:underline"
                                                    >
                                                        {job.company}
                                                    </a>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-sm text-gray-600">
                                                        {job.employmentType}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                    <svg
                                                        className="h-4 w-4 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        ></path>
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        ></path>
                                                    </svg>
                                                    <span>
                                                        {job.locations.map((location, locIndex) => (
                                                            <span key={locIndex}>
                                                                <a
                                                                    href="#"
                                                                    className="hover:text-[#8BC34A] hover:underline"
                                                                >
                                                                    {location}
                                                                </a>
                                                                {locIndex <
                                                                    job.locations.length - 1 &&
                                                                    ', '}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                                <div className="mt-3 flex flex-wrap gap-1.5">
                                                    {job.skills
                                                        .slice(0, 4)
                                                        .map((skill, skillIndex) => (
                                                            <span
                                                                key={skillIndex}
                                                                className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    {job.skills.length > 4 && (
                                                        <span className="inline-flex items-center rounded-md bg-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600">
                                                            +{job.skills.length - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Tags */}
                                        <div className="mt-4 flex flex-col items-end space-y-2 lg:mt-0 lg:ml-4">
                                            <div className="flex flex-wrap justify-end gap-2">
                                                {job.status.includes('New Job!') && (
                                                    <span className="inline-flex items-center rounded-md bg-[#8BC34A] px-2 py-1 text-xs font-medium text-white">
                                                        New Job!
                                                    </span>
                                                )}
                                                {job.status.includes('Featured Job') && (
                                                    <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                                        Featured Job
                                                    </span>
                                                )}
                                            </div>
                                            {job.postedDays && (
                                                <span className="text-xs text-gray-500">
                                                    Posted {job.postedDays} days ago
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-8 flex items-center justify-center">
                    <a
                        href="/remote-jobs"
                        className="inline-flex items-center gap-3 rounded-lg bg-[rgba(0,55,32,1)] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[rgba(0,55,32,0.9)] hover:shadow-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            ></path>
                        </svg>
                        Browse All Remote Jobs
                    </a>
                </div>
            </div>
        </section>
    );
};

export default JobListings;
