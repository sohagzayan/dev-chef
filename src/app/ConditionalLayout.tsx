'use client';

import { usePathname } from 'next/navigation';
import Header from '@/features/layout/ui/Header';
import Footer from '@/features/layout/ui/Footer';

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Hide navbar and footer on login page
    const isLoginPage = pathname === '/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

