import { AuthState, NavItem } from '@/types/client/common/navbar-types';

export const getNavItems = (authState: AuthState): NavItem[] => {
    const commonItems = [
        {
            name: 'Product',
            href: '/explore',
            dropdown: [
                { name: 'Interview', href: '/interview/assessment' },
                { name: 'Engage', href: '/interview/mock' },
                { name: 'SkillUpp', href: '/interview/mock' },
            ],
        },
        {
            name: 'Resource',
            href: '/problems',
            dropdown: [
                { name: 'Customer Stories', href: '/interview/assessment' },
                { name: 'Blog', href: '/blog' },
                { name: 'Support', href: '/support' },
                { name: 'whats-new', href: '/interview/mock' },
            ],
        },
        { name: 'Pricing', href: '/work/pricing' },
        { name: 'Developer', href: '/dashboard' },
    ];

    if (!authState.isAuthenticated) {
        return commonItems;
    }

    const roleBasedItems = [
        ...commonItems,
        {
            name: 'Interview',
            href: '#',
            dropdown: [
                { name: 'Assessment', href: '/interview/assessment' },
                { name: 'Mock', href: '/interview/mock' },
            ],
        },
    ];

    if (authState.user?.role === 'premium' || authState.user?.role === 'admin') {
        roleBasedItems.push({
            name: 'Store',
            href: '#',
            dropdown: [
                { name: 'Premium', href: '/store/premium' },
                { name: 'Courses', href: '/store/courses' },
            ],
        });
    }

    if (authState.user?.role === 'admin') {
        roleBasedItems.push({ name: 'Admin', href: '/admin' });
    }

    return roleBasedItems;
};
