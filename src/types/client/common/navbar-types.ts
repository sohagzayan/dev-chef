export type User = {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'premium' | 'admin';
    avatarUrl?: string;
};

export type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    notificationCount: number;
};

export interface NavItem {
    name: string;
    href: string;
    dropdown?: { name: string; href: string }[];
}
