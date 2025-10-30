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
        <form onSubmit={handleSubmit} className="group relative w-full">
            <div className="relative flex w-full items-center rounded-2xl border border-gray-200 bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all duration-300 focus-within:border-gray-300 focus-within:shadow-[0_16px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                {/* top highlight */}
                <div className="pointer-events-none absolute inset-x-3 -top-0.5 h-px bg-gradient-to-r from-transparent via-red-200/50 to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
                {/* Search Icon */}
                <div className="pointer-events-none absolute left-4 text-gray-400 transition-transform duration-300 group-focus-within:scale-110">
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
                    className="h-14 w-full rounded-2xl bg-transparent pr-40 pl-12 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:h-16 sm:text-lg"
                    aria-label="Search for jobs"
                />

                {/* divider before button */}
                <div className="pointer-events-none absolute top-1/2 right-36 hidden h-8 -translate-y-1/2 border-l border-gray-200 sm:block" />

                {/* Search Button */}
                <button
                    type="submit"
                    className="absolute top-1/2 right-2 h-10 -translate-y-1/2 cursor-pointer rounded-xl bg-gray-100/90 px-4 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-200 select-none hover:bg-gray-200 hover:shadow-md active:scale-[0.98] sm:h-12 sm:px-6 sm:text-base"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
