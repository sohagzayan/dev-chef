'use client';

import { useRouter } from 'next/navigation';
import { CertificationSection } from './components/certification-section';
import { ContestsSection } from './components/contests-section';
import { Header } from './components/header';
import { PreparationSection } from './components/preparation-section';
import { TopicsSection } from './components/topics-section';

export default function DeveloperPrepPage() {
    const router = useRouter();

    const handleTopicSelect = (topicId: string) => {
        router.push(`/topics/${topicId}`);
    };

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

    return (
        <div className="min-h-screen bg-white">
            <Header rank="33" points="888" />

            <div className="mx-auto max-w-7xl px-6 py-12">
                <CertificationSection onCertificationStart={handleCertificationStart} />
                <PreparationSection
                    onInterviewPrepStart={handleInterviewPrepStart}
                    onSkillsExplore={handleSkillsExplore}
                />
                <TopicsSection onTopicSelect={handleTopicSelect} />
                <ContestsSection
                    onContestRegister={handleContestRegister}
                    onContestView={handleContestView}
                />
            </div>
        </div>
    );
}
