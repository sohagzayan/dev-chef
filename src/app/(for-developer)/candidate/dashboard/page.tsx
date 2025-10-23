'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bookmark, BriefcaseIcon, CheckCircle, Home, Shield, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { CertificationSection } from './components/certification-section';
import { ContestsSection } from './components/contests-section';
import { Header } from './components/header';
import { PreparationSection } from './components/preparation-section';

export default function DeveloperPrepPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleCertificationStart = (certId: string) => {
        router.push(`/certification/${certId}`);
    };

    const handleInterviewPrepStart = () => {
        router.push('/interview-prep');
    };

    const handleSkillsExplore = () => {
        router.push('/skills');
    };

    const handleContestRegister = (contestId: string) => {
        router.push(`/contest/${contestId}`);
    };

    const handleContestView = (contestId: string) => {
        router.push(`/contest/${contestId}/results`);
    };

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-white">
                {/* Left Sidebar Skeleton */}
                <div className="w-64 bg-blue-600 p-6">
                    <div className="mb-8 flex items-center justify-center">
                        <Skeleton className="h-12 w-12 rounded-full" />
                    </div>
                    <nav className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2">
                                <Skeleton className="h-5 w-5 rounded" />
                                <Skeleton className="h-4 w-20 rounded" />
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Main Content Skeleton */}
                <div className="flex-1">
                    <div className="border-b border-gray-100 bg-white px-8 py-6">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-8 w-48 rounded" />
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-6 w-6 rounded" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto max-w-7xl px-6 py-12">
                        <div className="space-y-12">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-6">
                                    <Skeleton className="h-8 w-64 rounded" />
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        {[1, 2, 3].map((j) => (
                                            <Skeleton key={j} className="h-48 w-full rounded-lg" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Sidebar Navigation */}
            <div className="w-64 bg-blue-600 p-6">
                <div className="mb-8 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                        <Home className="h-6 w-6 text-blue-600" />
                    </div>
                </div>

                <nav className="space-y-2">
                    <Link
                        href="/candidate/dashboard"
                        className="flex items-center gap-3 rounded-lg bg-blue-700 px-3 py-2 text-white"
                    >
                        <Home className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/candidate/profile"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
                    >
                        <User className="h-5 w-5" />
                        Profile
                    </Link>
                    <Link
                        href="/candidate/job-feed"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
                    >
                        <BriefcaseIcon className="h-5 w-5" />
                        Job feed
                    </Link>
                    <Link
                        href="/candidate/saved-jobs"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
                    >
                        <Bookmark className="h-5 w-5" />
                        Save Jobs
                    </Link>
                    <Link
                        href="/candidate/settings"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
                    >
                        <Shield className="h-5 w-5" />
                        Setting
                    </Link>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
                <Header rank="33" points="888" />

                <div className="mx-auto max-w-7xl px-6 py-12">
                    <CertificationSection onCertificationStart={handleCertificationStart} />
                    <PreparationSection
                        onInterviewPrepStart={handleInterviewPrepStart}
                        onSkillsExplore={handleSkillsExplore}
                    />
                    <ContestsSection
                        onContestRegister={handleContestRegister}
                        onContestView={handleContestView}
                    />
                </div>
            </div>
        </div>
    );
}
