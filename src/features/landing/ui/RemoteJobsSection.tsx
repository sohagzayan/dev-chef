'use client';

import { useMemo } from 'react';
import type { Job } from '../model/types';
import { JobCard } from './JobCard';

interface RemoteJobsSectionProps {
    className?: string;
}

export default function RemoteJobsSection({ className = '' }: RemoteJobsSectionProps) {
    // Demo data – replace with real data fetching when available
    const jobs: Job[] = useMemo(
        () => [
            {
                id: '1',
                title: 'Senior Frontend Engineer',
                company: 'Acme Corp',
                companyLogo: '',
                location: 'Remote • Worldwide',
                salaryRange: '$140k – $180k',
                openings: 3,
                isNew: true,
                isPinned: true,
                tags: [
                    { label: 'Featured', variant: 'featured' },
                    { label: 'Remote', variant: 'freelancer' },
                ],
            },
            {
                id: '2',
                title: 'Backend Engineer (Node.js)',
                company: 'Nimbus',
                companyLogo: '',
                location: 'Remote • US Only',
                salaryRange: '$130k – $165k',
                openings: 2,
                isNew: true,
                tags: [
                    { label: 'Urgent', variant: 'urgent' },
                    { label: 'Node', variant: 'freelancer' },
                ],
            },
            {
                id: '3',
                title: 'Product Designer',
                company: 'Bright Labs',
                companyLogo: '',
                location: 'Remote • EU',
                salaryRange: '$95k – $130k',
                openings: 1,
                isNew: false,
                tags: [
                    { label: 'Design', variant: 'freelancer' },
                    { label: 'Internship', variant: 'internship' },
                ],
            },
            {
                id: '4',
                title: 'Data Engineer',
                company: 'DataWorks',
                companyLogo: '',
                location: 'Remote • Anywhere',
                salaryRange: '$125k – $170k',
                openings: 4,
                isNew: true,
                tags: [{ label: 'SQL', variant: 'freelancer' }],
            },
        ],
        [],
    );

    return (
        <section className={`relative py-6 sm:py-8 ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-3 sm:mb-4">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                        Search remote jobs
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                        Fresh, high‑quality remote roles curated for you.
                    </p>
                    {/* Top meta bar like reference */}
                    <div className="mt-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            {/* clock icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12.75 6a.75.75 0 00-1.5 0v6c0 .199.079.39.22.53l3 3a.75.75 0 101.06-1.06l-2.78-2.78V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Latest post 4 hours ago</span>
                            {/* rss icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#f59e0b"
                                className="ml-1 h-4 w-4"
                            >
                                <path d="M4.5 17.25a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3 8.25a.75.75 0 01.75-.75 12 12 0 0112 12 .75.75 0 01-1.5 0 10.5 10.5 0 00-10.5-10.5.75.75 0 01-.75-.75zM3 4.5a.75.75 0 01.75-.75 15.75 15.75 0 0115.75 15.75.75.75 0 01-1.5 0A14.25 14.25 0 003.75 6 .75.75 0 013 4.5z" />
                            </svg>
                        </div>
                        <div className="mt-3 h-px w-full bg-gray-100" />

                        <div className="mt-4 flex items-center justify-between">
                            {/* Left: jobs pill */}
                            <div className="inline-flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-base font-semibold text-gray-900">
                                Jobs
                                <span className="ml-3 inline-flex items-center justify-center rounded-xl bg-gray-100 px-3 py-1 text-sm font-bold text-gray-900">
                                    57
                                </span>
                            </div>

                            {/* Right: sort dropdown look */}
                            <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-base font-semibold text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 text-gray-400"
                                >
                                    <path d="M3.75 5.25a.75.75 0 01.75-.75h14.25a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75zM6 9.75a.75.75 0 01.75-.75h11.25a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM9 14.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H9.75a.75.75 0 01-.75-.75z" />
                                </svg>
                                Newest
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-4 w-4 text-gray-400"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 14.25l-4.5-4.5h9l-4.5 4.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                    {/* Left: jobs feed */}
                    <div className="space-y-3 lg:col-span-7 lg:pr-4">
                        {jobs.concat(jobs).map((job) => (
                            <div key={`${job.id}-${Math.random()}`}>
                                <JobCard job={job} />
                            </div>
                        ))}
                    </div>

                    {/* Right: sticky card */}
                    <aside className="lg:col-span-5 lg:pl-6">
                        <div className="sticky top-24">
                            <div className="rounded-2xl border border-gray-100 bg-white p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-2xl font-extrabold text-gray-900">
                                        Search remote jobs
                                    </h3>
                                    <button className="text-sm font-semibold text-gray-400 hover:text-gray-600">
                                        Clear
                                    </button>
                                </div>

                                {/* Search */}
                                <div className="mb-5">
                                    <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z"
                                            />
                                        </svg>
                                        <input
                                            className="ml-3 w-full border-0 p-0 text-base outline-none placeholder:text-gray-400"
                                            placeholder="sales"
                                        />
                                    </div>
                                </div>

                                {/* Job Categories */}
                                <div className="mb-5">
                                    <label className="mb-2 flex items-center gap-3 text-base font-semibold text-gray-900">
                                        {/* Categories icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-5 w-5 text-gray-600"
                                        >
                                            <path d="M3.75 3.75h6.5v6.5h-6.5v-6.5zM13.75 3.75h6.5v6.5h-6.5v-6.5zM3.75 13.75h6.5v6.5h-6.5v-6.5zM13.75 13.75h6.5v6.5h-6.5v-6.5z" />
                                        </svg>
                                        Job Categories
                                    </label>
                                    <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 001.5 11.25 7.5 7.5 0 0012.9 1.65z"
                                            />
                                        </svg>
                                        <input
                                            className="ml-3 w-full border-0 p-0 text-base outline-none placeholder:text-gray-400"
                                            placeholder="Search job category..."
                                        />
                                    </div>
                                </div>

                                {/* Countries */}
                                <div className="mb-5">
                                    <label className="mb-2 flex items-center gap-3 text-base font-semibold text-gray-900">
                                        {/* Flag icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-5 w-5 text-gray-600"
                                        >
                                            <path d="M3.75 3a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0V3.75A.75.75 0 013.75 3z" />
                                            <path d="M5.25 5.25h9.5l1.75-1.5a.75.75 0 01.5-.19h2.5a.75.75 0 01.75.75v8a.75.75 0 01-.75.75h-2.5a.75.75 0 01-.5-.19l-1.75-1.5h-9.5V5.25z" />
                                        </svg>
                                        Countries
                                    </label>
                                    <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z"
                                            />
                                        </svg>
                                        <input
                                            className="ml-3 w-full border-0 p-0 text-base outline-none placeholder:text-gray-400"
                                            placeholder="Search country..."
                                        />
                                    </div>
                                </div>

                                {/* Salary Range */}
                                <div className="mb-5">
                                    <label className="mb-2 flex items-center gap-3 text-base font-semibold text-gray-900">
                                        {/* Dollar icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-5 w-5 text-gray-600"
                                        >
                                            <path d="M12 2.25A9.75 9.75 0 1021.75 12 9.76 9.76 0 0012 2.25zm.75 4.5a.75.75 0 00-1.5 0v.56A5.25 5.25 0 006 12a5.25 5.25 0 005.25 5.25h.75a1.5 1.5 0 110 3h-3a.75.75 0 010-1.5h3a.75.75 0 000-1.5h-.75A6.75 6.75 0 015.25 12a6.75 6.75 0 016-6.69v-.56z" />
                                        </svg>
                                        Salary Range
                                    </label>
                                    <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z"
                                            />
                                        </svg>
                                        <input
                                            className="ml-3 w-full border-0 p-0 text-base outline-none placeholder:text-gray-400"
                                            placeholder="Search by salary range..."
                                        />
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="mb-6">
                                    <label className="mb-2 flex items-center gap-3 text-base font-semibold text-gray-900">
                                        {/* Graduation cap icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-5 w-5 text-gray-600"
                                        >
                                            <path d="M11.7 1.704a.75.75 0 01.6 0l8.25 3.75a.75.75 0 010 1.392l-8.25 3.75a.75.75 0 01-.6 0l-8.25-3.75a.75.75 0 010-1.392l8.25-3.75z" />
                                            <path d="M3.3 10.275l8.4 3.818 8.4-3.818V13.5a.75.75 0 01-.459.684l-7.741 3.149a1.5 1.5 0 01-1.3 0L3.759 14.184A.75.75 0 013.3 13.5v-3.225z" />
                                        </svg>
                                        Skills
                                    </label>
                                    <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z"
                                            />
                                        </svg>
                                        <input
                                            className="ml-3 w-full border-0 p-0 text-base outline-none placeholder:text-gray-400"
                                            placeholder="Search skills..."
                                        />
                                    </div>
                                </div>

                                <div className="-mx-2 sm:-mx-3">
                                    <button className="w-full rounded-2xl bg-[#e60000] px-6 py-3 text-base font-semibold text-white hover:bg-[#d40000]">
                                        Apply filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
