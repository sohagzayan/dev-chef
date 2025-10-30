'use client';

import { useState } from 'react';

interface SearchBarProps {
    onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch?.(query);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex w-full flex-col gap-2 sm:max-w-2xl sm:flex-row"
        >
            <div className="relative flex-1">
                {/* Search Icon */}
                <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-green-600">
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Input */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Skills, Designations, Keyword"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pr-4 pl-12 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none sm:h-14 sm:text-base"
                    aria-label="Search for jobs"
                />
            </div>

            {/* Search Button */}
            <button
                type="submit"
                className="h-12 rounded-xl bg-green-600 px-6 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none sm:h-14 sm:px-8"
            >
                Find Job
            </button>
        </form>
    );
}
