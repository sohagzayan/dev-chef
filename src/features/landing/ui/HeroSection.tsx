import { jobCategories, jobStats, topSkills } from '../lib/constants';
import { SearchBar } from './SearchBar';

interface HeroSectionProps {
    className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
    return (
        <section
            className={`relative overflow-hidden py-14 md:py-20 ${className}`}
            style={{
                backgroundColor: '#ECF4FA',
                backgroundImage:
                    'radial-gradient(1200px 600px at -10% -20%, #F5FAFF 0%, transparent 60%), radial-gradient(1000px 500px at 110% -10%, #F5FAFF 0%, transparent 60%)',
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-12">
                    <div className="mx-auto max-w-3xl text-center lg:col-span-7 lg:mx-0 lg:text-left">
                        {/* Top meta */}
                        <div className="mb-4 flex items-center justify-center gap-2 text-xs text-gray-600 md:mb-6">
                            <svg
                                className="h-4 w-4 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="font-medium">
                                Trusted by {jobStats.totalJobs.toLocaleString()}+ companies
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="mx-auto mb-3 max-w-2xl text-3xl leading-tight font-semibold text-gray-900 sm:text-4xl md:text-5xl lg:mx-0">
                            Find and hire top remote talent faster
                        </h1>
                        <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-gray-700 sm:text-base lg:mx-0">
                            Post your job and get matched with qualified candidates instantly. Smart
                            search, clean workflows, zero noise.
                        </p>

                        {/* Search */}
                        <div className="mx-auto mb-8 max-w-2xl md:mb-10 lg:mx-0">
                            <SearchBar />
                        </div>

                        {/* CTA */}
                        <div className="mb-10 flex justify-center lg:justify-start">
                            <button className="rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none sm:px-8 sm:py-3.5">
                                Post a job for $299
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mx-auto grid max-w-2xl grid-cols-3 gap-6 text-left text-sm text-gray-700 lg:mx-0">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {jobStats.totalJobs.toLocaleString()}
                                </div>
                                <div className="mt-1">Active Jobs</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {jobStats.monthlyVisitors}
                                </div>
                                <div className="mt-1">Monthly Visitors</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {jobStats.yearsExperience}+
                                </div>
                                <div className="mt-1">Years Experience</div>
                            </div>
                        </div>
                    </div>
                    {/* Right side: simple decorative card to balance layout on desktop */}
                    <div className="relative hidden lg:col-span-5 lg:block">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-sm" />
                        <div className="relative rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm">
                            <div className="mb-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                Recent matches
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            Senior React Developer
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Sanity • Remote (Global)
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                                        Matched
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            Product Designer
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Linear • Remote (EU)
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                        Interviewing
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            Platform Engineer
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Vercel • Remote (US)
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                                        New
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
