'use client';

import { usePathname } from 'next/navigation';
import { FooterSection } from './Footer/FooterSection';
import Navbar from './Navbar/Navbar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if we're on a problem page, problemset page, admin page, profile page, or jobs page
    const isProblemPage = pathname?.startsWith('/problems/');
    const isProblemsetPage = pathname?.startsWith('/problemset');
    const isAdminPage = pathname?.startsWith('/admin');
    const isProfilePage = pathname?.startsWith('/profile');
    const isJobsPage = pathname?.startsWith('/jobs');

    if (isProblemPage || isProblemsetPage || isAdminPage) {
        // Return only children for problem pages, problemset pages, and admin pages (no Navbar/Footer)
        return <>{children}</>;
    }

    if (isProfilePage || isJobsPage) {
        // Return navbar and children but no footer for profile pages and jobs pages
        return (
            <>
                <Navbar />
                {children}
            </>
        );
    }

    // Return full layout for other pages
    return (
        <>
            <Navbar />
            {children}
            <FooterSection />
        </>
    );
}
