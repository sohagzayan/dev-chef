import type { Job } from '../model/types';

interface JobCardProps {
    job: Job;
}

const tagVariants = {
    featured: 'bg-green-50 text-green-700 border-green-200',
    urgent: 'bg-orange-50 text-orange-700 border-orange-200',
    internship: 'bg-red-50 text-red-700 border-red-200',
    freelancer: 'bg-blue-50 text-blue-700 border-blue-200',
};

export function JobCard({ job }: JobCardProps) {
    return (
        <div className="flex min-h-[280px] flex-col items-center rounded-2xl bg-white p-5 shadow-lg transition-shadow hover:shadow-xl sm:p-6">
            {/* Tags */}
            <div className="mb-4 flex w-full items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {job.tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag.label}
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${tagVariants[tag.variant]}`}
                        >
                            {tag.label}
                        </span>
                    ))}
                </div>
                {job.tags.length > 2 && (
                    <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${tagVariants[job.tags[2].variant]}`}
                    >
                        {job.tags[2].label}
                    </span>
                )}
            </div>

            {/* Company Logo */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-600">
                    {job.company.charAt(0)}
                </div>
            </div>

            {/* Job Title */}
            <h3 className="mb-2 text-center text-lg font-semibold text-gray-900">{job.title}</h3>

            {/* Location */}
            <div className="mb-4 flex items-center gap-1 text-sm text-gray-500">
                <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <span>{job.location}</span>
            </div>

            {/* Salary and Openings */}
            <div className="mt-auto flex w-full items-center justify-between">
                <span className="text-xl font-bold text-gray-900">{job.salaryRange}</span>
                <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700">
                    {job.openings} Open
                </button>
            </div>
        </div>
    );
}
