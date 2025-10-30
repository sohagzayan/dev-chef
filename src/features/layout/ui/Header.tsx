'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '../lib/constants';
import { NavDropdown } from './NavDropdown';

export default function Header() {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openMobileSectionId, setOpenMobileSectionId] = useState<string | null>(null);
    const isAuthPage = Boolean(
        pathname &&
            (pathname.startsWith('/signin') ||
                pathname.startsWith('/account') ||
                pathname.startsWith('/job-seekers') ||
                pathname.startsWith('/employers')),
    );

    const handleDropdownToggle = (itemId: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        e?.preventDefault();
        setOpenDropdown((prev) => (prev === itemId ? null : itemId));
    };

    // Close mobile menu on Escape key
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileOpen(false);
                setOpenDropdown(null);
                setOpenMobileSectionId(null);
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            {/* Main Header */}
            <header className="sticky top-0 z-40 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo/Brand */}
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-xl font-bold text-gray-900 uppercase">
                                Hirely
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        {!isAuthPage && (
                            <nav className="hidden items-center gap-6 lg:flex">
                                {navigationItems.map((item) => (
                                    <div key={item.id} className="relative">
                                        <button
                                            onMouseDown={(e) => {
                                                if (item.hasDropdown) {
                                                    handleDropdownToggle(item.id, e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (!item.hasDropdown) return;
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    handleDropdownToggle(item.id);
                                                }
                                            }}
                                            aria-haspopup={item.hasDropdown ? 'menu' : undefined}
                                            aria-expanded={openDropdown === item.id}
                                            className="group flex items-center gap-1 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-gray-900"
                                        >
                                            {item.label}
                                            {item.hasDropdown && (
                                                <svg
                                                    className={`h-4 w-4 transition-transform duration-200 ${
                                                        openDropdown === item.id
                                                            ? 'rotate-180'
                                                            : 'group-hover:translate-y-0.5'
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                        {item.hasDropdown && item.items && (
                                            <NavDropdown
                                                label={item.label}
                                                items={item.items}
                                                isOpen={openDropdown === item.id}
                                                onClose={() => setOpenDropdown(null)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </nav>
                        )}

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {/* Sign In Button */}
                            {!isAuthPage && (
                                <Link
                                    href="/account"
                                    className="hidden rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-gray-50 sm:block"
                                >
                                    Sign in
                                </Link>
                            )}

                            {/* Post a Job Button */}
                            {!isAuthPage && (
                                <Link
                                    href="/post-job"
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700"
                                >
                                    Post a job
                                </Link>
                            )}

                            {/* Mobile Hamburger (lg hidden) */}
                            {!isAuthPage && (
                                <button
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-teal-600 focus:outline-none lg:hidden"
                                    aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                                    aria-expanded={isMobileOpen}
                                    onClick={() => setIsMobileOpen((prev) => !prev)}
                                >
                                    <span className="relative inline-block h-5 w-6">
                                        <span
                                            className={`absolute top-0 left-0 h-0.5 w-6 rounded bg-gray-700 transition-transform duration-300 ease-in-out ${
                                                isMobileOpen ? 'translate-y-2 rotate-45' : ''
                                            }`}
                                        />
                                        <span
                                            className={`absolute top-2 left-0 h-0.5 w-6 rounded bg-gray-700 transition-opacity duration-300 ${
                                                isMobileOpen ? 'opacity-0' : 'opacity-100'
                                            }`}
                                        />
                                        <span
                                            className={`absolute top-4 left-0 h-0.5 w-6 rounded bg-gray-700 transition-transform duration-300 ease-in-out ${
                                                isMobileOpen ? '-translate-y-2 -rotate-45' : ''
                                            }`}
                                        />
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Drawer & Overlay */}
                {!isAuthPage && (
                    <div
                        className={`lg:hidden ${isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    >
                        {/* Overlay */}
                        <div
                            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
                                isMobileOpen ? 'opacity-100' : 'opacity-0'
                            }`}
                            aria-hidden="true"
                            onClick={() => setIsMobileOpen(false)}
                        />

                        {/* Drawer */}
                        <aside
                            className={`fixed inset-y-0 left-0 z-50 w-full max-w-none transform bg-white shadow-xl transition-transform duration-300 ease-out ${
                                isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="flex h-16 items-center justify-between px-4">
                                <Link
                                    href="/"
                                    className="text-xl font-bold text-gray-900 uppercase"
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    Hirely
                                </Link>
                                <button
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-teal-600 focus:outline-none"
                                    aria-label="Close menu"
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    <svg
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="px-4">
                                {/* Collapsible Sections */}
                                <div className="divide-y divide-gray-200">
                                    {navigationItems.map((section) => (
                                        <div key={section.id} className="py-4">
                                            <button
                                                className="flex w-full items-center justify-between text-left text-xl font-medium text-gray-900"
                                                onClick={() =>
                                                    setOpenMobileSectionId((prev) =>
                                                        prev === section.id ? null : section.id,
                                                    )
                                                }
                                                aria-expanded={openMobileSectionId === section.id}
                                                aria-controls={`mobile-sec-${section.id}`}
                                            >
                                                {section.label}
                                                <svg
                                                    className={`h-5 w-5 transition-transform ${
                                                        openMobileSectionId === section.id
                                                            ? 'rotate-180'
                                                            : ''
                                                    }`}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>

                                            <div
                                                id={`mobile-sec-${section.id}`}
                                                className={`overflow-hidden transition-all duration-300 ${
                                                    openMobileSectionId === section.id
                                                        ? 'mt-3 max-h-96'
                                                        : 'max-h-0'
                                                }`}
                                            >
                                                <ul className="space-y-2">
                                                    {section.items
                                                        ?.filter((i) => i.label !== '')
                                                        .map((item) => (
                                                            <li key={item.id}>
                                                                <Link
                                                                    href={item.href}
                                                                    onClick={() =>
                                                                        setIsMobileOpen(false)
                                                                    }
                                                                    className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                                >
                                                                    <span>{item.label}</span>
                                                                    {item.badge && (
                                                                        <span
                                                                            className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                                                                                item.badge
                                                                                    .variant ===
                                                                                'new'
                                                                                    ? 'bg-yellow-400 text-gray-900'
                                                                                    : 'bg-blue-500 text-white'
                                                                            }`}
                                                                        >
                                                                            {item.badge.text}
                                                                        </span>
                                                                    )}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto p-4">
                                <Link
                                    href="/post-job"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="block w-full rounded-md bg-red-600 py-3 text-center text-sm font-bold text-white hover:bg-red-700"
                                >
                                    Post a job
                                </Link>
                            </div>
                        </aside>
                    </div>
                )}
            </header>
        </>
    );
}
