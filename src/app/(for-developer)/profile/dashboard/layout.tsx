'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
    Bars3Icon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    CalendarIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    Cog6ToothIcon,
    DocumentTextIcon,
    UserIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/hooks/redux/useAuth';

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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuth();
    const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(['dashboard']));
    const [isNavigating, setIsNavigating] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Determine if user is candidate or recruiter
    const isCandidate = user?.role === 'candidate';
    const isRecruiter = user?.role === 'employer';

    // Auto-expand menu based on current path
    useEffect(() => {
        if (pathname?.includes('/dashboard')) {
            setExpandedMenus(new Set(['dashboard']));
        } else if (pathname?.includes('/problems')) {
            setExpandedMenus(new Set(['problems']));
        } else if (pathname?.includes('/learning')) {
            setExpandedMenus(new Set(['learning']));
        } else if (pathname?.includes('/interview-prep')) {
            setExpandedMenus(new Set(['interview-prep']));
        } else if (pathname?.includes('/jobs')) {
            setExpandedMenus(new Set(['jobs']));
        } else if (pathname?.includes('/career')) {
            setExpandedMenus(new Set(['career']));
        } else if (pathname?.includes('/community')) {
            setExpandedMenus(new Set(['community']));
        } else if (pathname?.includes('/account')) {
            setExpandedMenus(new Set(['account']));
        } else if (pathname?.includes('/tools')) {
            setExpandedMenus(new Set(['tools']));
        } else if (pathname?.includes('/support')) {
            setExpandedMenus(new Set(['support']));
        }
    }, [pathname]);

    // Candidate Navigation Items
    const candidateNavigationItems: ProfileSection[] = [
        {
            id: 'dashboard',
            title: 'Dashboard',
            icon: <ChartBarIcon className="h-5 w-5" />,
            isActive: true,
            submenu: [
                { id: 'overview', title: 'Overview' },
                { id: 'analytics', title: 'Analytics' },
                { id: 'progress', title: 'Progress Tracking' },
                { id: 'achievements', title: 'Achievements' },
            ],
        },
        {
            id: 'problems',
            title: 'Problems',
            icon: <CheckCircleIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'problem-solving', title: 'Problem Solving' },
                { id: 'practice', title: 'Practice Problems' },
                { id: 'submissions', title: 'My Submissions' },
                { id: 'solutions', title: 'My Solutions' },
                { id: 'favorites', title: 'Favorite Problems' },
                { id: 'history', title: 'Solving History' },
            ],
        },
        {
            id: 'learning',
            title: 'Learning',
            icon: <CalendarIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'courses', title: 'Courses' },
                { id: 'tutorials', title: 'Tutorials' },
                { id: 'certifications', title: 'Certifications' },
                { id: 'skills', title: 'Skills Development' },
                { id: 'learning-paths', title: 'Learning Paths' },
                { id: 'study-materials', title: 'Study Materials' },
            ],
        },
        {
            id: 'interview-prep',
            title: 'Interview Prep',
            icon: <UsersIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'mock-interviews', title: 'Mock Interviews' },
                { id: 'interview-questions', title: 'Interview Questions' },
                { id: 'coding-challenges', title: 'Coding Challenges' },
                { id: 'system-design', title: 'System Design' },
                { id: 'behavioral', title: 'Behavioral Prep' },
                { id: 'interview-resources', title: 'Resources' },
            ],
        },
        {
            id: 'jobs',
            title: 'Jobs',
            icon: <BriefcaseIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'job-feed', title: 'Job Feed' },
                { id: 'top-jobs', title: 'Top Jobs' },
                { id: 'search-jobs', title: 'Search Jobs' },
                { id: 'job-recommendations', title: 'Job Recommendations' },
                { id: 'saved-jobs', title: 'Saved Jobs' },
                { id: 'applications', title: 'My Applications' },
                { id: 'job-alerts', title: 'Job Alerts' },
                { id: 'companies', title: 'Companies' },
                { id: 'career-tools', title: 'Career Tools' },
            ],
        },
        {
            id: 'career',
            title: 'Career',
            icon: <Cog6ToothIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'resume-builder', title: 'Resume Builder' },
                { id: 'resume-upload', title: 'Resume Upload' },
                { id: 'portfolio', title: 'Portfolio' },
                { id: 'skills-assessment', title: 'Skills Assessment' },
                { id: 'career-goals', title: 'Career Goals' },
                { id: 'mentorship', title: 'Mentorship' },
            ],
        },
        {
            id: 'community',
            title: 'Community',
            icon: <UsersIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'discussions', title: 'Discussions' },
                { id: 'forums', title: 'Forums' },
                { id: 'events', title: 'Events' },
                { id: 'contests', title: 'Contests' },
                { id: 'collaboration', title: 'Collaboration' },
                { id: 'networking', title: 'Networking' },
            ],
        },
        {
            id: 'profile',
            title: 'Profile',
            icon: <UserIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'profile-settings', title: 'Profile Settings' },
                { id: 'personal-info', title: 'Personal Information' },
                { id: 'preferences', title: 'Preferences' },
                { id: 'privacy', title: 'Privacy Settings' },
                { id: 'verification', title: 'Verification' },
            ],
        },
        {
            id: 'account',
            title: 'Account',
            icon: <Cog6ToothIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'account-settings', title: 'Account Settings' },
                { id: 'password', title: 'Password & Security' },
                { id: 'notifications', title: 'Notifications' },
                { id: 'billing', title: 'Billing & Subscription' },
                { id: 'integrations', title: 'Integrations' },
                { id: 'data-export', title: 'Data Export' },
            ],
        },
        {
            id: 'tools',
            title: 'Tools',
            icon: <ChartBarIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'calendar', title: 'Calendar' },
                { id: 'task-manager', title: 'Task Manager' },
                { id: 'goal-tracker', title: 'Goal Tracker' },
                { id: 'progress-analytics', title: 'Progress Analytics' },
                { id: 'time-tracking', title: 'Time Tracking' },
                { id: 'productivity', title: 'Productivity Tools' },
            ],
        },
        {
            id: 'support',
            title: 'Support',
            icon: <Cog6ToothIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'help-center', title: 'Help Center' },
                { id: 'contact-support', title: 'Contact Support' },
                { id: 'feedback', title: 'Feedback' },
                { id: 'bug-report', title: 'Bug Report' },
                { id: 'feature-request', title: 'Feature Request' },
                { id: 'documentation', title: 'Documentation' },
            ],
        },
    ];

    // Recruiter Navigation Items
    const recruiterNavigationItems: ProfileSection[] = [
        {
            id: 'dashboard',
            title: 'Dashboard',
            icon: <ChartBarIcon className="h-5 w-5" />,
            isActive: true,
            submenu: [
                { id: 'overview', title: 'Overview' },
                { id: 'analytics', title: 'Analytics' },
                { id: 'hiring-metrics', title: 'Hiring Metrics' },
                { id: 'company-insights', title: 'Company Insights' },
            ],
        },
        {
            id: 'job-management',
            title: 'Job Management',
            icon: <BriefcaseIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'post-job', title: 'Post New Job' },
                { id: 'active-jobs', title: 'Active Jobs' },
                { id: 'draft-jobs', title: 'Draft Jobs' },
                { id: 'closed-jobs', title: 'Closed Jobs' },
                { id: 'job-templates', title: 'Job Templates' },
            ],
        },
        {
            id: 'candidates',
            title: 'Candidates',
            icon: <UsersIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'all-candidates', title: 'All Candidates' },
                { id: 'shortlisted', title: 'Shortlisted' },
                { id: 'interview-scheduled', title: 'Interview Scheduled' },
                { id: 'hired', title: 'Hired' },
                { id: 'rejected', title: 'Rejected' },
                { id: 'candidate-search', title: 'Search Candidates' },
            ],
        },
        {
            id: 'hiring-pipeline',
            title: 'Hiring Pipeline',
            icon: <CheckCircleIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'applications', title: 'Applications' },
                { id: 'interviews', title: 'Interviews' },
                { id: 'assessments', title: 'Assessments' },
                { id: 'reference-checks', title: 'Reference Checks' },
                { id: 'offer-management', title: 'Offer Management' },
            ],
        },
        {
            id: 'company',
            title: 'Company',
            icon: <BuildingOfficeIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'company-profile', title: 'Company Profile' },
                { id: 'team-members', title: 'Team Members' },
                { id: 'branding', title: 'Branding' },
                { id: 'company-culture', title: 'Company Culture' },
                { id: 'benefits', title: 'Benefits & Perks' },
            ],
        },
        {
            id: 'reports',
            title: 'Reports',
            icon: <DocumentTextIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'hiring-reports', title: 'Hiring Reports' },
                { id: 'candidate-reports', title: 'Candidate Reports' },
                { id: 'time-to-hire', title: 'Time to Hire' },
                { id: 'source-analytics', title: 'Source Analytics' },
                { id: 'cost-per-hire', title: 'Cost per Hire' },
            ],
        },
        {
            id: 'settings',
            title: 'Settings',
            icon: <Cog6ToothIcon className="h-5 w-5" />,
            isActive: false,
            submenu: [
                { id: 'account-settings', title: 'Account Settings' },
                { id: 'notification-settings', title: 'Notifications' },
                { id: 'integration-settings', title: 'Integrations' },
                { id: 'billing-settings', title: 'Billing & Plans' },
                { id: 'team-settings', title: 'Team Management' },
            ],
        },
    ];

    // Choose navigation based on user role
    const navigationItems = isRecruiter ? recruiterNavigationItems : candidateNavigationItems;

    const toggleMenu = (menuId: string) => {
        const newExpandedMenus = new Set<string>();
        if (!expandedMenus.has(menuId)) {
            newExpandedMenus.add(menuId);
        }
        setExpandedMenus(newExpandedMenus);
    };

    const isSubmenuItemActive = (parentId: string, subItemId: string) => {
        if (parentId === 'dashboard') {
            switch (subItemId) {
                case 'overview':
                    return pathname === '/profile/dashboard/overview';
                case 'analytics':
                    return pathname === '/profile/dashboard/analytics';
                case 'progress':
                    return pathname === '/profile/dashboard/progress-tracking';
                case 'achievements':
                    return pathname === '/profile/dashboard/achievements';
                default:
                    return false;
            }
        } else if (parentId === 'problems') {
            switch (subItemId) {
                case 'problem-solving':
                    return pathname === '/profile/problems/problem-solving';
                case 'practice':
                    return pathname === '/profile/problems/practice';
                case 'submissions':
                    return pathname === '/profile/problems/submissions';
                case 'solutions':
                    return pathname === '/profile/problems/solutions';
                case 'favorites':
                    return pathname === '/profile/problems/favorites';
                case 'history':
                    return pathname === '/profile/problems/history';
                default:
                    return false;
            }
        }
        return false;
    };

    const handleSubmenuClick = async (parentId: string, subItemId: string) => {
        setIsNavigating(true);
        // Handle navigation for different menu sections
        switch (parentId) {
            case 'dashboard':
                switch (subItemId) {
                    case 'overview':
                        await router.push('/profile/dashboard/overview');
                        break;
                    case 'analytics':
                        await router.push('/profile/dashboard/analytics');
                        break;
                    case 'progress':
                        await router.push('/profile/dashboard/progress-tracking');
                        break;
                    case 'achievements':
                        await router.push('/profile/dashboard/achievements');
                        break;
                    default:
                        break;
                }
                break;
            case 'problems':
                switch (subItemId) {
                    case 'problem-solving':
                        await router.push('/profile/problems/problem-solving');
                        break;
                    case 'practice':
                        await router.push('/profile/problems/practice');
                        break;
                    case 'submissions':
                        await router.push('/profile/problems/submissions');
                        break;
                    case 'solutions':
                        await router.push('/profile/problems/solutions');
                        break;
                    case 'favorites':
                        await router.push('/profile/problems/favorites');
                        break;
                    case 'history':
                        await router.push('/profile/problems/history');
                        break;
                    default:
                        break;
                }
                break;
            case 'learning':
                // Add navigation for learning section
                await router.push(`/profile/learning/${subItemId}`);
                break;
            case 'interview-prep':
                // Add navigation for interview prep section
                await router.push(`/interview-prep/${subItemId}`);
                break;
            case 'jobs':
                // Navigate to the appropriate jobs section within profile
                switch (subItemId) {
                    case 'job-feed':
                        await router.push('/profile/jobs/job-feed');
                        break;
                    case 'top-jobs':
                        await router.push('/profile/jobs/top-jobs');
                        break;
                    case 'search-jobs':
                        await router.push('/profile/jobs/search-jobs');
                        break;
                    case 'job-recommendations':
                        await router.push('/profile/jobs/job-recommendations');
                        break;
                    case 'saved-jobs':
                        await router.push('/profile/jobs/saved-jobs');
                        break;
                    case 'applications':
                        await router.push('/profile/jobs/applications');
                        break;
                    case 'job-alerts':
                        await router.push('/profile/jobs/job-alerts');
                        break;
                    case 'companies':
                        await router.push('/profile/jobs/companies');
                        break;
                    case 'career-tools':
                        await router.push('/profile/jobs/career-tools');
                        break;
                    default:
                        await router.push('/profile/jobs');
                }
                break;
            case 'career':
                // Add navigation for career section
                await router.push(`/career/${subItemId}`);
                break;
            case 'community':
                // Add navigation for community section
                await router.push(`/community/${subItemId}`);
                break;
            case 'profile':
                // Add navigation for profile section
                await router.push(`/profile/${subItemId}`);
                break;
            case 'account':
                // Add navigation for account section
                await router.push(`/account/${subItemId}`);
                break;
            case 'tools':
                // Add navigation for tools section
                await router.push(`/tools/${subItemId}`);
                break;
            case 'support':
                // Add navigation for support section
                await router.push(`/support/${subItemId}`);
                break;
            default:
                break;
        }

        // Reset navigation state after a short delay
        setTimeout(() => {
            setIsNavigating(false);
        }, 1000);
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
                <h1 className="text-lg font-semibold text-gray-900">DevChef Dashboard</h1>
                <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            <div className="flex min-h-screen">
                {/* Left Sidebar Navigation */}
                <div
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
                            {/* User Profile */}
                            <div className="mb-8 rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
                                        <UserIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {user?.name || 'User'}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {isRecruiter
                                                ? 'Recruiter'
                                                : isCandidate
                                                  ? 'Job Seeker'
                                                  : 'Developer'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Items */}
                            <nav className="space-y-2">
                                {navigationItems.map((item) => (
                                    <div key={item.id}>
                                        <button
                                            onClick={() => toggleMenu(item.id)}
                                            className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition-colors duration-200 ${
                                                item.isActive
                                                    ? 'border border-purple-200 bg-purple-50 text-purple-700'
                                                    : 'border border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className={`h-5 w-5 ${
                                                        item.isActive
                                                            ? 'text-purple-600'
                                                            : 'text-gray-500'
                                                    }`}
                                                >
                                                    {item.icon}
                                                </div>
                                                <span className="font-medium">{item.title}</span>
                                            </div>
                                            {item.submenu && (
                                                <div
                                                    className={`h-4 w-4 transition-transform duration-200 ${
                                                        expandedMenus.has(item.id)
                                                            ? 'rotate-90'
                                                            : ''
                                                    }`}
                                                >
                                                    <ChevronRightIcon className="h-4 w-4" />
                                                </div>
                                            )}
                                        </button>

                                        {/* Submenu */}
                                        {item.submenu && (
                                            <AnimatePresence>
                                                {expandedMenus.has(item.id) && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-2 ml-8 space-y-1">
                                                            {item.submenu.map((subItem) => (
                                                                <button
                                                                    key={subItem.id}
                                                                    onClick={() =>
                                                                        handleSubmenuClick(
                                                                            item.id,
                                                                            subItem.id,
                                                                        )
                                                                    }
                                                                    className={`flex w-full items-center space-x-3 rounded-lg px-4 py-2 text-sm transition-colors duration-200 ${
                                                                        isSubmenuItemActive(
                                                                            item.id,
                                                                            subItem.id,
                                                                        )
                                                                            ? 'border border-purple-200 bg-purple-50 text-purple-700'
                                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                                    }`}
                                                                >
                                                                    <div
                                                                        className={`h-2 w-2 rounded-full ${
                                                                            isSubmenuItemActive(
                                                                                item.id,
                                                                                subItem.id,
                                                                            )
                                                                                ? 'bg-purple-500'
                                                                                : 'bg-gray-200'
                                                                        }`}
                                                                    ></div>
                                                                    <span className="text-sm">
                                                                        {isNavigating &&
                                                                        isSubmenuItemActive(
                                                                            item.id,
                                                                            subItem.id,
                                                                        )
                                                                            ? 'Loading...'
                                                                            : subItem.title}
                                                                    </span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            {/* Bottom Action Card */}
                            <div className="mt-8 rounded-xl border border-purple-200 bg-purple-50 p-4">
                                <div className="mb-2 flex items-center space-x-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500">
                                        <CheckCircleIcon className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="font-medium text-purple-900">
                                        Start Solving
                                    </span>
                                </div>
                                <p className="text-sm text-purple-700">
                                    Begin your coding journey with practice problems
                                </p>
                            </div>
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
