import { AuthState, NavItem } from '@/types/client/common/navbar-types';

export const getNavItems = (authState: AuthState): NavItem[] => {
    const commonItems = [
        { name: 'Explore', href: '/explore' },
        { name: 'Problems', href: '/problems' },
        { name: 'Contest', href: '/contest' },
        { name: 'Discuss', href: '/discuss' },
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
