'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
    Bars3Icon,
    BookmarkIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    ChartBarIcon,
    ChevronRightIcon,
    ClockIcon,
    Cog6ToothIcon,
    CurrencyDollarIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    UserIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

interface SubMenuItem {
    id: string;
    title: string;
    icon?: React.ReactNode;
}

interface ProfileSection {
    id: string;
    title: string;
    icon: React.ReactNode;
    isActive: boolean;
    submenu?: SubMenuItem[];
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(['jobs']));
    const [isNavigating, setIsNavigating] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useEffect(() => {
        if (pathname?.includes('/jobs') && !pathname?.includes('/top-jobs')) {
            setExpandedMenus(new Set(['jobs']));
        }
        if (pathname?.includes('/top-jobs')) {
            setExpandedMenus(new Set(['jobs']));
        }
        if (pathname?.includes('/job-feed')) {
            setExpandedMenus(new Set(['job-feed']));
        }
        if (pathname?.includes('/saved-jobs')) {
            setExpandedMenus(new Set(['saved-jobs']));
        }
        if (pathname?.includes('/applications')) {
            setExpandedMenus(new Set(['applications']));
        }
        if (pathname?.includes('/job-alerts')) {
            setExpandedMenus(new Set(['job-alerts']));
        }
        if (pathname?.includes('/companies')) {
            setExpandedMenus(new Set(['companies']));
        }
    }, [pathname]);

    const navigationItems: ProfileSection[] = [
        {
            id: 'jobs',
            title: 'Job Search',
            icon: <MagnifyingGlassIcon className="h-5 w-5" />,
            isActive: pathname?.includes('/jobs') || pathname?.includes('/job-feed'),
            submenu: [
                { id: 'job-feed', title: 'Job Feed' },
                { id: 'top-jobs', title: 'Top Jobs' },
                { id: 'search-jobs', title: 'Search Jobs' },
                { id: 'job-recommendations', title: 'Recommendations' },
            ],
        },
        {
            id: 'saved-jobs',
            title: 'Saved Jobs',
            icon: <BookmarkIcon className="h-5 w-5" />,
            isActive: pathname?.includes('/saved-jobs'),
            submenu: [
                { id: 'bookmarked', title: 'Bookmarked' },
                { id: 'applied', title: 'Applied' },
                { id: 'rejected', title: 'Rejected' },
            ],
        },
        {
            id: 'applications',
            title: 'Applications',
            icon: <BriefcaseIcon className="h-5 w-5" />,
            isActive: pathname?.includes('/applications'),
            submenu: [
                { id: 'active', title: 'Active' },
                { id: 'pending', title: 'Pending' },
                { id: 'completed', title: 'Completed' },
            ],
        },
        {
            id: 'job-alerts',
            title: 'Job Alerts',
            icon: <ClockIcon className="h-5 w-5" />,
            isActive: pathname?.includes('/job-alerts'),
            submenu: [
                { id: 'create-alert', title: 'Create Alert' },
                { id: 'manage-alerts', title: 'Manage Alerts' },
                { id: 'alert-history', title: 'Alert History' },
            ],
        },
        {
            id: 'companies',
            title: 'Companies',
            icon: <BuildingOfficeIcon className="h-5 w-5" />,
            isActive: pathname?.includes('/companies'),
            submenu: [
                { id: 'browse-companies', title: 'Browse Companies' },
                { id: 'company-reviews', title: 'Company Reviews' },
                { id: 'followed-companies', title: 'Followed Companies' },
            ],
        },
        {
            id: 'career-tools',
            title: 'Career Tools',
            icon: <Cog6ToothIcon className="h-5 w-5" />,
            isActive: pathname?.includes('/career-tools'),
            submenu: [
                { id: 'resume-builder', title: 'Resume Builder' },
                { id: 'cover-letter', title: 'Cover Letter' },
                { id: 'salary-negotiation', title: 'Salary Negotiation' },
            ],
        },
    ];

    const toggleMenu = (menuId: string) => {
        const newExpandedMenus = new Set(expandedMenus);
        if (newExpandedMenus.has(menuId)) {
            newExpandedMenus.delete(menuId);
        } else {
            newExpandedMenus.add(menuId);
        }
        setExpandedMenus(newExpandedMenus);
    };

    const isSubmenuItemActive = (parentId: string, subItemId: string) => {
        return pathname?.includes(`/jobs/${subItemId}`) || pathname?.includes(`/${subItemId}`);
    };

    const handleSubmenuClick = async (parentId: string, subItemId: string) => {
        setIsNavigating(true);

        switch (parentId) {
            case 'jobs':
                if (subItemId === 'job-feed') {
                    await router.push('/jobs/job-feed');
                } else if (subItemId === 'top-jobs') {
                    await router.push('/jobs/top-jobs');
                } else if (subItemId === 'search-jobs') {
                    await router.push('/jobs/search-jobs');
                } else if (subItemId === 'job-recommendations') {
                    await router.push('/jobs/job-recommendations');
                }
                break;
            case 'saved-jobs':
                await router.push(`/jobs/saved-jobs/${subItemId}`);
                break;
            case 'applications':
                await router.push(`/jobs/applications/${subItemId}`);
                break;
            case 'job-alerts':
                await router.push(`/jobs/job-alerts/${subItemId}`);
                break;
            case 'companies':
                await router.push(`/jobs/companies/${subItemId}`);
                break;
            case 'career-tools':
                await router.push(`/jobs/career-tools/${subItemId}`);
                break;
            default:
                await router.push(`/jobs/${subItemId}`);
        }

        setIsNavigating(false);
        setMobileSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-white/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Mobile Header */}
            <div className="sticky top-0 z-30 flex items-center justify-between bg-white/80 p-4 shadow-sm backdrop-blur-xl lg:hidden">
                <button
                    onClick={() => setMobileSidebarOpen(true)}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900">DevChef Jobs</h1>
                <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            <div className="flex min-h-screen">
                {/* Left Sidebar Navigation */}
                <div
                    className={`fixed top-0 left-0 z-50 flex h-full w-72 transform flex-col border-r border-gray-200 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:top-16 lg:h-[calc(100vh-4rem)]`}
                >
                    {/* User Profile Section */}
                    <div className="border-b border-gray-200 p-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                                <UserIcon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Job Seeker</h3>
                                <p className="text-sm text-gray-600">Find your dream job</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <nav className="space-y-2">
                            {navigationItems.map((item) => (
                                <div key={item.id}>
                                    <button
                                        onClick={() => toggleMenu(item.id)}
                                        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors duration-200 ${
                                            expandedMenus.has(item.id)
                                                ? 'border border-purple-200 bg-purple-50 text-purple-700'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span
                                                className={`${item.isActive ? 'text-purple-600' : 'text-gray-500'}`}
                                            >
                                                {item.icon}
                                            </span>
                                            <span className="font-medium">{item.title}</span>
                                        </div>
                                        <ChevronRightIcon
                                            className={`h-4 w-4 transition-transform duration-200 ${
                                                expandedMenus.has(item.id) ? 'rotate-90' : ''
                                            }`}
                                        />
                                    </button>

                                    {/* Submenu */}
                                    <AnimatePresence>
                                        {expandedMenus.has(item.id) && item.submenu && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="mt-2 ml-8 space-y-1 overflow-hidden"
                                            >
                                                {item.submenu.map((subItem) => (
                                                    <button
                                                        key={subItem.id}
                                                        onClick={() =>
                                                            handleSubmenuClick(item.id, subItem.id)
                                                        }
                                                        disabled={isNavigating}
                                                        className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 ${
                                                            isSubmenuItemActive(item.id, subItem.id)
                                                                ? 'bg-purple-100 text-purple-700'
                                                                : 'text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {subItem.title}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Bottom Action Card */}
                    <div className="border-t border-gray-200 p-4">
                        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                            <h4 className="mb-2 font-semibold">Need Help?</h4>
                            <p className="mb-3 text-sm text-blue-100">
                                Get personalized job recommendations and career advice
                            </p>
                            <button className="w-full rounded-lg bg-white/20 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/30">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative z-10 flex-1 p-4 pt-4 lg:ml-72 lg:p-6 lg:pt-20">
                    {children}
                </div>
            </div>
        </div>
    );
}
