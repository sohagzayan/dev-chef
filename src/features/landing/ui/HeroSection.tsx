import { jobCategories, jobStats, topSkills } from '../lib/constants';

interface HeroSectionProps {
    className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
    return (
        <section
            className={`relative overflow-hidden py-16 md:py-24 lg:py-32 ${className}`}
            style={{
                backgroundColor: '#ECF4FA',
                backgroundImage: `
                    radial-gradient(ellipse at top left, #F5FAFF 0%, transparent 50%),
                    radial-gradient(ellipse at top right, #F5FAFF 0%, transparent 50%),
                    radial-gradient(ellipse at bottom center, #F5FAFF 0%, transparent 40%)
                `,
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Trust Indicator */}
                    <div className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-600 md:mb-8">
                        <svg
                            className="h-5 w-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="font-medium">
                            Trusted by {jobStats.totalJobs.toLocaleString()}+ companies worldwide
                        </span>
                    </div>

                    {/* Main Heading */}
                    <div className="mb-6 space-y-4 md:mb-8">
                        <h1 className="text-3xl leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                            <span className="block font-normal">No More Solo Job Hunting</span>
                            <span className="mt-2 block font-bold">DO IT WITH AI COPILOT</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg">
                            Our AI makes landing job interviews dramatically easier and faster! -
                            get matched jobs, tailored resume, and recommended insider connections
                            in less than 1 min!
                        </p>
                    </div>

                    {/* Stats Bar */}
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 md:mb-12">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                                {jobStats.totalJobs.toLocaleString()}
                            </span>
                            <span>Active Jobs</span>
                        </div>
                        <div className="h-4 w-px bg-gray-300" />
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                                {jobStats.monthlyVisitors}
                            </span>
                            <span>Monthly Visitors</span>
                        </div>
                        <div className="h-4 w-px bg-gray-300" />
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                                {jobStats.yearsExperience}+
                            </span>
                            <span>Years Experience</span>
                        </div>
                    </div>

                    {/* Call to Action Button */}
                    <div className="flex justify-center">
                        <button
                            className="rounded-lg px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none sm:px-12 sm:py-5 sm:text-lg"
                            style={{
                                backgroundColor: '#F44336',
                            }}
                        >
                            Post a job for $299
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
