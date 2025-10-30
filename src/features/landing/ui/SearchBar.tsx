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
        <form onSubmit={handleSubmit} className="relative w-full">
            <div className="relative flex w-full items-center rounded-xl border border-gray-200 bg-white shadow-lg transition-shadow focus-within:border-gray-300 focus-within:shadow-xl hover:shadow-xl">
                {/* Search Icon */}
                <div className="pointer-events-none absolute left-4 text-gray-400">
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
                    placeholder="Search"
                    className="h-14 w-full rounded-xl bg-transparent pr-4 pl-12 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:h-16 sm:text-lg"
                    aria-label="Search for jobs"
                />

                {/* Search Button */}
                <button
                    type="submit"
                    className="absolute right-2 h-10 rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none sm:h-12 sm:px-6 sm:text-base"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
