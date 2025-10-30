import { HeroSection, RemoteJobsSection } from '@/features/landing';

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <RemoteJobsSection />
        </main>
    );
}
