'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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

export default function ProfileJobsLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(['jobs']));
    const [isNavigating, setIsNavigating] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [sidebarInitialized, setSidebarInitialized] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only initialize the sidebar once to maintain state across navigation
        if (!sidebarInitialized) {
            // Always expand the jobs section by default for better UX
            setExpandedMenus(new Set(['jobs']));
            setSidebarInitialized(true);
        }
    }, [sidebarInitialized]);

    const getActiveSection = () => {
        if (
            pathname?.includes('/profile/jobs/job-feed') ||
            pathname?.includes('/profile/jobs/top-jobs') ||
            pathname?.includes('/profile/jobs/search-jobs') ||
            pathname?.includes('/profile/jobs/job-recommendations') ||
            pathname === '/profile/jobs'
        ) {
            return 'jobs';
        }
        if (pathname?.includes('/profile/jobs/saved-jobs')) return 'saved-jobs';
        if (pathname?.includes('/profile/jobs/applications')) return 'applications';
        if (pathname?.includes('/profile/jobs/job-alerts')) return 'job-alerts';
        if (pathname?.includes('/profile/jobs/companies')) return 'companies';
        if (pathname?.includes('/profile/jobs/career-tools')) return 'career-tools';
        return 'jobs';
    };

    const navigationItems: ProfileSection[] = useMemo(
        () => [
            {
                id: 'jobs',
                title: 'Job Search',
                icon: <MagnifyingGlassIcon className="h-5 w-5" />,
                isActive: getActiveSection() === 'jobs',
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
                isActive: getActiveSection() === 'saved-jobs',
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
                isActive: getActiveSection() === 'applications',
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
                isActive: getActiveSection() === 'job-alerts',
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
                isActive: getActiveSection() === 'companies',
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
                isActive: getActiveSection() === 'career-tools',
                submenu: [
                    { id: 'resume-builder', title: 'Resume Builder' },
                    { id: 'cover-letter', title: 'Cover Letter' },
                    { id: 'salary-negotiation', title: 'Salary Negotiation' },
                ],
            },
        ],
        [],
    );

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
        return pathname?.includes(`/profile/jobs/${subItemId}`);
    };

    const handleSubmenuClick = async (parentId: string, subItemId: string) => {
        setIsNavigating(true);

        switch (parentId) {
            case 'jobs':
                if (subItemId === 'job-feed') {
                    await router.push('/profile/jobs/job-feed');
                } else if (subItemId === 'top-jobs') {
                    await router.push('/profile/jobs/top-jobs');
                } else if (subItemId === 'search-jobs') {
                    await router.push('/profile/jobs/search-jobs');
                } else if (subItemId === 'job-recommendations') {
                    await router.push('/profile/jobs/job-recommendations');
                }
                break;
            case 'saved-jobs':
                await router.push(`/profile/jobs/saved-jobs/${subItemId}`);
                break;
            case 'applications':
                await router.push(`/profile/jobs/applications/${subItemId}`);
                break;
            case 'job-alerts':
                await router.push(`/profile/jobs/job-alerts/${subItemId}`);
                break;
            case 'companies':
                await router.push(`/profile/jobs/companies/${subItemId}`);
                break;
            case 'career-tools':
                await router.push(`/profile/jobs/career-tools/${subItemId}`);
                break;
            default:
                await router.push(`/profile/jobs/${subItemId}`);
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
                <h1 className="text-lg font-semibold text-gray-900">Jobs</h1>
                <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            <div className="flex min-h-screen">
                {/* Left Sidebar Navigation */}
                <div
                    ref={sidebarRef}
                    key="profile-jobs-sidebar"
                    className={`fixed top-0 left-0 z-50 flex h-full w-72 transform flex-col border-r border-gray-200 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:top-16 lg:h-[calc(100vh-4rem)]`}
                >
                    <div className="flex h-full flex-col">
                        {/* Mobile Sidebar Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 p-4 lg:hidden">
                            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                            <button
                                onClick={() => setMobileSidebarOpen(false)}
                                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 flex-1 overflow-y-auto p-6">
                            {/* Navigation Items */}
                            <div className="space-y-2">
                                {navigationItems.map((section) => (
                                    <div key={section.id} className="space-y-1">
                                        {/* Section Header */}
                                        <button
                                            onClick={() => toggleMenu(section.id)}
                                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200 ${
                                                section.isActive
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-500">
                                                    {section.icon}
                                                </span>
                                                <span>{section.title}</span>
                                            </div>
                                            <ChevronRightIcon
                                                className={`h-4 w-4 transition-transform duration-200 ${
                                                    expandedMenus.has(section.id) ? 'rotate-90' : ''
                                                }`}
                                            />
                                        </button>

                                        {/* Submenu Items */}
                                        {section.submenu && expandedMenus.has(section.id) && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="ml-6 space-y-1"
                                            >
                                                {section.submenu.map((subItem) => (
                                                    <button
                                                        key={subItem.id}
                                                        onClick={() =>
                                                            handleSubmenuClick(
                                                                section.id,
                                                                subItem.id,
                                                            )
                                                        }
                                                        disabled={isNavigating}
                                                        className={`flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 ${
                                                            isSubmenuItemActive(
                                                                section.id,
                                                                subItem.id,
                                                            )
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {subItem.icon && (
                                                            <span className="text-gray-400">
                                                                {subItem.icon}
                                                            </span>
                                                        )}
                                                        <span>{subItem.title}</span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-72">
                    <div className="min-h-screen p-4 lg:p-6">{children}</div>
                </div>
            </div>
        </div>
    );
}
