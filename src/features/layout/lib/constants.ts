import type { NavItem } from '../model/types';

export const navigationItems: NavItem[] = [
    {
        id: 'jobs',
        label: 'Jobs',
        hasDropdown: true,
        items: [
            {
                id: 'trending',
                label: 'Top Trending Remote Jobs',
                href: '/jobs/trending',
                badge: { text: 'NEW!', variant: 'new' },
            },
            { id: 'separator-1', label: '', href: '' },
            { id: 'all-jobs', label: 'All Jobs', href: '/jobs' },
            {
                id: 'programming',
                label: 'Programming',
                href: '/jobs/programming',
                hasSubmenu: true,
            },
            { id: 'design', label: 'Design', href: '/jobs/design' },
            { id: 'devops', label: 'Devops and Sysadmin', href: '/jobs/devops' },
            {
                id: 'management',
                label: 'Management and Finance',
                href: '/jobs/management',
            },
            { id: 'product', label: 'Product', href: '/jobs/product' },
            {
                id: 'support',
                label: 'Customer Support',
                href: '/jobs/support',
            },
            {
                id: 'sales',
                label: 'Sales and Marketing',
                href: '/jobs/sales',
            },
            { id: 'separator-2', label: '', href: '' },
            { id: 'other', label: 'All Other Jobs', href: '/jobs/other' },
            { id: 'separator-3', label: '', href: '' },
            { id: 'full-time', label: 'Full-Time', href: '/jobs/full-time' },
            { id: 'contract', label: 'Contract', href: '/jobs/contract' },
        ],
    },
    {
        id: 'find-work',
        label: 'Find work',
        hasDropdown: true,
        items: [
            {
                id: 'top-companies',
                label: 'Top 100 Remote Companies',
                href: '/companies',
            },
            {
                id: 'top-searches',
                label: 'Top Remote Job Searches',
                href: '/searches',
            },
            {
                id: 'all-jobs',
                label: 'View All Jobs Posted',
                href: '/jobs/all',
                badge: { text: 'NEW!', variant: 'new' },
            },
            {
                id: 'automate',
                label: 'Automate your Job Search',
                href: '/automate',
                badge: { text: 'NEW!', variant: 'new' },
            },
            { id: 'separator-1', label: '', href: '' },
            {
                id: 'faq',
                label: 'FAQ - Job Seekers',
                href: '/faq/job-seekers',
            },
            { id: 'support', label: 'Contact Support', href: '/support' },
            { id: 'separator-2', label: '', href: '' },
            { id: 'rss', label: 'RSS Feed', href: '/rss' },
            {
                id: 'resources',
                label: 'Remote Work Resources',
                href: '/resources',
            },
        ],
    },
    {
        id: 'find-talent',
        label: 'Find talent',
        hasDropdown: true,
        items: [
            {
                id: 'hiring-guide',
                label: 'Remote Hiring Guide',
                href: '/employers/guide',
            },
            {
                id: 'hire-developers',
                label: 'Hiring Remote Software Developers',
                href: '/employers/developers',
            },
            {
                id: 'why-wwr',
                label: 'Why Choose WWR?',
                href: '/employers/why',
            },
            { id: 'separator-1', label: '', href: '' },
            {
                id: 'faq-employers',
                label: 'FAQ - Employers',
                href: '/faq/employers',
            },
            { id: 'separator-2', label: '', href: '' },
            {
                id: 'bundles',
                label: 'Save with Bundles',
                href: '/employers/bundles',
                icon: 'piggy-bank',
            },
        ],
    },
];
