import { AchievementsSection } from './components/AchievementsSection';
import CareerCTA from './components/CareerCTA';
import { CommunityStatsSection } from './components/CommunityStatsSection';
import Hero from './components/Hero';
import { HeroSection } from './components/HeroSection';
import JobListings from './components/JobListings';
import { LearningPathsSection } from './components/LearningPathsSection';
import { MentorsSection } from './components/MentorsSection';

export default function Home() {
    return (
        <div>
            <Hero />
            <JobListings />
            <HeroSection />
            <AchievementsSection />
            <MentorsSection />
            <LearningPathsSection />
            <CommunityStatsSection />
            <CareerCTA />
        </div>
    );
}
