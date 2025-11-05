'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Search } from 'lucide-react';
import { navigationItems } from '../lib/constants';
import { NavDropdown } from './NavDropdown';

export default function Header() {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const isAuthPage = Boolean(
        pathname &&
            (pathname.startsWith('/account') ||
                pathname.startsWith('/login') ||
                pathname.startsWith('/job-seekers') ||
                pathname.startsWith('/employers')),
    );

    if (isAuthPage) {
        return (
            <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-xl font-bold text-gray-900 uppercase">
                                Hirely
                            </span>
                        </Link>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 bg-white">
            {/* Main Navigation */}
            <nav className="border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Left Side: Logo and Navigation */}
                        <div className="flex flex-1 items-center space-x-8">
                            {/* Logo */}
                            <div className="flex items-center">
                                <Link href="/" className="flex-shrink-0">
                                    <span className="text-2xl font-bold text-gray-900 uppercase">
                                        Hirely
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop Navigation - Left Aligned */}
                            <div className="hidden lg:flex lg:items-center lg:space-x-8">
                                {/* Navigation Items */}
                                {navigationItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative"
                                        onMouseEnter={() =>
                                            item.hasDropdown && setOpenDropdown(item.id)
                                        }
                                        onMouseLeave={() => setOpenDropdown(null)}
                                    >
                                        {item.hasDropdown && item.items ? (
                                            <>
                                                <button className="flex items-center space-x-1 text-base font-medium text-gray-700 hover:text-gray-900">
                                                    <span>{item.label}</span>
                                                    <ChevronDown
                                                        className={`h-4 w-4 transition-transform ${
                                                            openDropdown === item.id
                                                                ? 'rotate-180'
                                                                : ''
                                                        }`}
                                                    />
                                                </button>
                                                <NavDropdown
                                                    label={item.label}
                                                    items={item.items}
                                                    isOpen={openDropdown === item.id}
                                                    onClose={() => setOpenDropdown(null)}
                                                    disableClickOutside={true}
                                                />
                                            </>
                                        ) : (
                                            <Link
                                                href={item.href || '#'}
                                                className="text-base font-medium text-gray-700 hover:text-gray-900"
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Search Bar and Actions */}
                        <div className="hidden lg:flex lg:min-w-0 lg:items-center lg:justify-end lg:gap-4">
                            {/* Search Bar */}
                            <div
                                className={`flex items-center rounded-lg border bg-gray-50 transition-[width,max-width,border-color,box-shadow] duration-300 ease-in-out ${
                                    isSearchFocused
                                        ? 'w-96 max-w-[calc(100vw-600px)] border-blue-400 shadow-lg shadow-blue-100'
                                        : 'w-64 max-w-none border-blue-200'
                                }`}
                            >
                                <div className="flex flex-shrink-0 items-center pl-3">
                                    <Search
                                        className={`h-4 w-4 transition-colors duration-300 ease-in-out ${
                                            isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                                        }`}
                                    />
                                    <ChevronDown className="ml-1.5 h-3 w-3 text-blue-600 transition-colors duration-300 ease-in-out" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search profiles"
                                    className="h-9 min-w-0 flex-1 rounded-lg border-0 bg-transparent pr-3 pl-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                                    aria-label="Search profiles"
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                />
                            </div>

                            {/* Buttons - Always visible with flex-shrink-0 */}
                            <div className="flex flex-shrink-0 items-center gap-4">
                                <Link
                                    href="/jobs/new"
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white hover:bg-blue-700"
                                >
                                    Post a job (FREE)
                                </Link>
                                <Link
                                    href="/login"
                                    className="text-base font-medium whitespace-nowrap text-blue-600 hover:text-blue-700"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden"
                            aria-label="Toggle mobile menu"
                        >
                            <div className="space-y-1.5">
                                <span
                                    className={`block h-0.5 w-6 bg-gray-900 transition-all ${
                                        isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                                    }`}
                                />
                                <span
                                    className={`block h-0.5 w-6 bg-gray-900 transition-all ${
                                        isMobileMenuOpen ? 'opacity-0' : ''
                                    }`}
                                />
                                <span
                                    className={`block h-0.5 w-6 bg-gray-900 transition-all ${
                                        isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                                    }`}
                                />
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu Overlay & Sidebar */}
                    {isMobileMenuOpen && (
                        <>
                            {/* Overlay */}
                            <div
                                className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />

                            {/* Sidebar */}
                            <div className="fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden">
                                <div className="p-4">
                                    {/* Header */}
                                    <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                                        <span className="text-xl font-bold text-gray-900 uppercase">
                                            Menu
                                        </span>
                                        <button
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="rounded-lg p-2 hover:bg-gray-100"
                                            aria-label="Close menu"
                                        >
                                            <svg
                                                className="h-6 w-6 text-gray-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
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

                                    {/* Main Navigation */}
                                    <div className="mb-6">
                                        {navigationItems.map((item) => (
                                            <div key={item.id} className="border-b border-gray-100">
                                                {item.hasDropdown && item.items ? (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                setOpenDropdown(
                                                                    openDropdown === item.id
                                                                        ? null
                                                                        : item.id,
                                                                )
                                                            }
                                                            className="flex w-full items-center justify-between py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                                        >
                                                            <span>{item.label}</span>
                                                            <ChevronDown
                                                                className={`h-5 w-5 transition-transform duration-200 ${
                                                                    openDropdown === item.id
                                                                        ? 'rotate-180'
                                                                        : ''
                                                                }`}
                                                            />
                                                        </button>
                                                        {openDropdown === item.id && (
                                                            <div className="bg-gray-50 pl-4">
                                                                {item.items.map((subItem) => {
                                                                    if (
                                                                        subItem.label === '' ||
                                                                        subItem.id.startsWith(
                                                                            'separator',
                                                                        )
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                key={subItem.id}
                                                                                className="my-1"
                                                                            />
                                                                        );
                                                                    }
                                                                    return (
                                                                        <Link
                                                                            key={subItem.id}
                                                                            href={subItem.href}
                                                                            onClick={() =>
                                                                                setIsMobileMenuOpen(
                                                                                    false,
                                                                                )
                                                                            }
                                                                            className="block py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                                                                        >
                                                                            {subItem.label}
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <Link
                                                        href={item.href || '#'}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="block py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quick Links Section */}
                                    <div className="mb-6 border-t border-gray-200 pt-6">
                                        <p className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
                                            Quick Links
                                        </p>
                                        <div className="space-y-1">
                                            {[
                                                { href: '/jobs', label: 'All Jobs' },
                                                { href: '/companies', label: 'Top Companies' },
                                                { href: '/blog', label: 'Blog' },
                                                { href: '/faq/job-seekers', label: 'FAQs' },
                                                { href: '/resources', label: 'Resources' },
                                                { href: '/support', label: 'Support' },
                                            ].map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="block rounded-lg py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Links */}
                                    <div className="space-y-3 border-t border-gray-200 pt-6">
                                        <Link
                                            href="/jobs/new"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                        >
                                            Post a job (FREE)
                                        </Link>
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block rounded-lg border border-blue-600 px-4 py-3 text-center text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                                        >
                                            Sign in
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </nav>

            {/* Secondary Navigation - Quick Links */}
            <nav className="hidden border-b border-gray-200 bg-gray-50 lg:block">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-10 items-center">
                        <ul className="flex space-x-6 text-xs">
                            <li>
                                <Link
                                    href="/search/jobs"
                                    className="font-medium text-gray-600 hover:text-gray-900"
                                >
                                    Browse jobs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/job-seekers"
                                    className="font-medium text-gray-600 hover:text-gray-900"
                                >
                                    Looking for work
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/employers"
                                    className="font-medium text-gray-600 hover:text-gray-900"
                                >
                                    Looking to hire
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
