'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useUserRole } from '@/hooks/admin/useUserRole';
import useWindowSize from '@/hooks/useWindowSize';

export type AdminRole = 'ADMIN' | 'CANDIDATE' | 'RECRUITER';

interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: AdminRole;
    avatar?: string;
}

interface AdminContextType {
    user: AdminUser | null;
    sidebarOpen: boolean;
    mobileSidebarOpen: boolean;
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setMobileSidebarOpen: (open: boolean) => void;
    hasPermission: (permission: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const { width } = useWindowSize();
    const { userData } = useUserRole();

    // Ensure we're on the client before using window size
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Only auto-close mobile sidebar when we're on client and screen size changes to desktop
    useEffect(() => {
        if (isClient && width >= 1024) {
            // lg breakpoint
            setMobileSidebarOpen(false);
        }
    }, [isClient, width]);

    // Dynamic user based on database role
    const [user, setUser] = useState<AdminUser>({
        id: '1',
        name: 'James Admin',
        email: 'james@admin.com',
        role: 'RECRUITER', // Default fallback
        avatar: '/api/placeholder/40/40',
    });

    // Update user when database role is fetched
    useEffect(() => {
        if (userData) {
            console.log('🔄 AdminProvider: Updating user role from database:', userData.role);
            console.log('📧 AdminProvider: User email:', userData.email);

            setUser((prev) => ({
                ...prev,
                role: userData.role,
                email: userData.email,
            }));
        }
    }, [userData]);

    // Role switching is now fully automatic based on database
    // No manual role switching in production

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

    const hasPermission = (permission: string): boolean => {
        if (!user) return false;

        const rolePermissions: Record<AdminRole, string[]> = {
            ADMIN: [
                'dashboard',
                'users',
                'analytics',
                'settings',
                'reports',
                'notifications',
                'logs',
                'backup',
                'team_management',
                'job_management',
                'candidate_management',
                'interview_management',
                'communication',
                'talent_sourcing',
                'billing',
            ],
            RECRUITER: [
                'dashboard',
                'job_management',
                'candidate_management',
                'interview_management',
                'communication',
                'talent_sourcing',
                'reports',
                'team_management',
                'analytics',
                'users',
                'settings',
                'billing',
            ],
            CANDIDATE: ['dashboard', 'profile', 'problems', 'submissions', 'progress'],
        };

        const userPermissions = rolePermissions[user.role];
        return userPermissions.includes('*') || userPermissions.includes(permission);
    };

    return (
        <AdminContext.Provider
            value={{
                user,
                sidebarOpen,
                mobileSidebarOpen,
                toggleSidebar,
                toggleMobileSidebar,
                setSidebarOpen,
                setMobileSidebarOpen,
                hasPermission,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}
