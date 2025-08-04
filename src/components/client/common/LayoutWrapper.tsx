'use client';

import { usePathname } from 'next/navigation';
import { FooterSection } from './Footer/FooterSection';
import Navbar from './Navbar/Navbar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if we're on a problem page or problemset page
    const isProblemPage = pathname?.startsWith('/problems/');
    const isProblemsetPage = pathname?.startsWith('/problemset');

    if (isProblemPage || isProblemsetPage) {
        // Return only children for problem pages and problemset pages (no Navbar/Footer)
        return <>{children}</>;
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
