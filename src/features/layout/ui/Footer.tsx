'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-10 border-t border-gray-100">
            {/* Top bar */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-6 text-sm font-semibold text-gray-700">
                        <Link href="#" className="hover:text-gray-900">
                            Top 100 Companies
                        </Link>
                        <Link href="#" className="hover:text-gray-900">
                            Blog
                        </Link>
                        <Link href="#" className="hover:text-gray-900">
                            FAQ – Employers
                        </Link>
                        <Link href="#" className="hidden hover:text-gray-900 md:inline">
                            Events
                        </Link>
                        <Link href="#" className="hidden hover:text-gray-900 md:inline">
                            RSS
                        </Link>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 ring-1 ring-rose-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-4 w-4"
                        >
                            <path d="M12 2.25c-2.9 0-5.25 2.35-5.25 5.25 0 3.5 5.25 9.75 5.25 9.75s5.25-6.25 5.25-9.75c0-2.9-2.35-5.25-5.25-5.25zm0 7.5a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z" />
                        </svg>
                        37,315 Remote jobs posted
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-gray-900 text-gray-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-start justify-between gap-6 py-6 md:flex-row md:items-center">
                        <p className="text-sm">© {new Date().getFullYear()} Hirely</p>
                        <nav className="flex flex-wrap items-center gap-4 text-sm">
                            <Link href="/how-it-works" className="hover:text-white">
                                How it works
                            </Link>
                            <Link href="/services/resume-review" className="hover:text-white">
                                Career Services
                            </Link>
                            <Link href="#" className="hover:text-white">
                                Contact Support
                            </Link>
                            <Link href="#" className="hover:text-white">
                                Terms
                            </Link>
                            <Link href="#" className="hover:text-white">
                                Guidelines
                            </Link>
                            <Link href="#" className="hover:text-white">
                                Privacy
                            </Link>
                            <Link href="#" className="hover:text-white">
                                Why Choose Hirely?
                            </Link>
                        </nav>
                        <div className="flex items-center gap-4">
                            {/* Social icons */}
                            {['facebook', 'linkedin', 'instagram', 'x'].map((key) => (
                                <span
                                    key={key}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                                    </svg>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
