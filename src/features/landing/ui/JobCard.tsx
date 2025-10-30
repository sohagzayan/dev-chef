import type { Job } from '../model/types';

interface JobCardProps {
    job: Job;
}

const tagVariants = {
    featured: 'bg-green-50 text-green-700 border-green-200',
    urgent: 'bg-orange-50 text-orange-700 border-orange-200',
    internship: 'bg-red-50 text-red-700 border-red-200',
    freelancer: 'bg-blue-50 text-blue-700 border-blue-200',
} as const;

// Only two card color variants are used: featured (yellow) and default (white)

export function JobCard({ job }: JobCardProps) {
    const isFeatured = job.tags.some(
        (t) => t.variant === 'featured' || t.label.toLowerCase() === 'featured',
    );

    return (
        <div
            className={
                `relative w-full rounded-2xl border p-4 sm:p-5 ` +
                (isFeatured ? 'border-yellow-100 bg-yellow-50' : 'border-gray-100 bg-white')
            }
        >
            {isFeatured && (
                <span className="absolute top-0 left-0 h-full w-2 rounded-l-2xl bg-yellow-400" />
            )}

            <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white ring-1 ring-gray-100">
                    {job.companyLogo ? (
                        <img
                            src={job.companyLogo}
                            alt={`${job.company} logo`}
                            className="h-12 w-12 rounded-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-gray-600">
                            {job.company.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="truncate text-xl leading-snug font-extrabold text-gray-900">
                            {job.title}
                        </h3>
                        <div className="shrink-0 space-x-2">
                            {job.isNew && (
                                <span className="inline-flex items-center rounded-md bg-yellow-400 px-2.5 py-0.5 text-[10px] font-black tracking-wide text-gray-900 uppercase">
                                    NEW
                                </span>
                            )}
                            {job.isPinned && (
                                <button aria-label="Pinned" className="text-red-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path d="M14.73 3.21a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-6.22 6.22a4.5 4.5 0 01-1.83 1.1l-2.03.61a.75.75 0 01-.93-.93l.61-2.03a4.5 4.5 0 011.1-1.83l6.22-6.22-2.47-2.47-6.22 6.22a3 3 0 00-.74 1.22l-.2.67-.67.2a3 3 0 00-1.22.74L2.2 18.6a.75.75 0 101.06 1.06l3.27-3.27c.16-.16.35-.28.56-.34l1.04-.31.31-1.04c.06-.21.18-.4.34-.56l6.22-6.22z" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-0.5 flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <span>{job.company}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4 text-blue-600"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.91-1.91a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4.03-5.47z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
                        <svg
                            className="h-5 w-5"
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
                        <span className="truncate">{job.location}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2.5">
                        {isFeatured && (
                            <span className="inline-flex items-center rounded-md bg-yellow-400 px-3 py-1 text-xs font-semibold text-gray-900">
                                Featured
                            </span>
                        )}
                        <span className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-semibold text-gray-900">
                            Full-Time
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
