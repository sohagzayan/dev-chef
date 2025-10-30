'use client';

import { useEffect, useMemo, useState } from 'react';
import { SearchBar } from './SearchBar';

interface HeroSectionProps {
    className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
    // Rotating subtitle lines
    const subtitles = useMemo(
        () => [
            'Do it with AI Copilot',
            'Automate your job search',
            'Tailored resumes in seconds',
            'Find insider connections fast',
        ],
        [],
    );

    const [currentIdx, setCurrentIdx] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimating(true);
            const timeout = setTimeout(() => {
                setCurrentIdx((prev) => (prev + 1) % subtitles.length);
                setAnimating(false);
            }, 700); // matches transition duration
            return () => clearTimeout(timeout);
        }, 2500);
        return () => clearInterval(interval);
    }, [subtitles.length]);
    return (
        <section
            className={`relative overflow-hidden py-20 md:py-28 ${className}`}
            style={{
                backgroundColor: '#ffffff',
                backgroundImage:
                    'repeating-linear-gradient(90deg,#e2e2e2,#fafafa 1px,transparent 0,transparent 52px),repeating-linear-gradient(180deg,rgba(235,235,235,1) 0,rgba(235,235,235,1) 1px,transparent 0,transparent 52px)',
            }}
        >
            <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-5xl text-center">
                    <h1 className="mx-auto mb-3 max-w-4xl text-4xl leading-[1.1] font-extrabold text-black sm:text-5xl md:text-6xl">
                        No More Solo Job Hunting
                    </h1>
                    <h2 className="mx-auto mb-6 max-w-3xl text-2xl font-extrabold text-black sm:text-3xl md:text-4xl">
                        <span className="relative block h-[1.2em] overflow-hidden sm:h-[1.25em]">
                            {/* current */}
                            <span
                                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-700 ease-out ${
                                    animating
                                        ? '-translate-y-full opacity-0'
                                        : 'translate-y-0 opacity-100'
                                }`}
                            >
                                {subtitles[currentIdx]}
                            </span>
                            {/* next */}
                            <span
                                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-700 ease-out ${
                                    animating
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-full opacity-0'
                                }`}
                            >
                                {subtitles[(currentIdx + 1) % subtitles.length]}
                            </span>
                        </span>
                    </h2>
                    <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl">
                        Our AI makes landing job interviews dramatically easier and faster! - get
                        matched jobs, tailored resume, and recommended insider connections in less
                        than 1 min!
                    </p>

                    <div className="mb-10 flex justify-center">
                        <button className="cta-animated inline-flex cursor-pointer items-center justify-center rounded-2xl bg-[#e60000] px-7 py-4 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-[#d40000] active:translate-y-0.5 sm:px-9 sm:py-5 sm:text-lg">
                            Post a job for $299
                        </button>
                    </div>

                    <div className="mx-auto max-w-xl">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </section>
    );
}
