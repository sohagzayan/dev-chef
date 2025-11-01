'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/features/layout/ui/Footer';
import Header from '@/features/layout/ui/Header';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Hide navbar and footer on login page
    const isLoginPage = pathname === '/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    // Only footer on register page
    const isRegisterPage = pathname === '/register';

    if (isRegisterPage) {
        return (
            <>
                {children}
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
