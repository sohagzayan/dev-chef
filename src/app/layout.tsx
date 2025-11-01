import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import Footer from '@/features/layout/ui/Footer';
import Header from '@/features/layout/ui/Header';
import { Providers } from '@/shared/providers';
import ConditionalLayout from './ConditionalLayout';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Hirely.ai - Production Ready Platform',
    description: 'Scalable, production-ready application platform',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                suppressHydrationWarning={true}
            >
                <Providers>
                    <ConditionalLayout>{children}</ConditionalLayout>
                </Providers>
            </body>
        </html>
    );
}
