import { AchievementsSection } from './components/AchievementsSection';
import { CommunityStatsSection } from './components/CommunityStatsSection';
import Hero from './components/Hero';
import { HeroSection } from './components/HeroSection';
import { LearningPathsSection } from './components/LearningPathsSection';
import { MentorsSection } from './components/MentorsSection';
import { ProjectsSection } from './components/ProjectsSection';

export default function Home() {
    return (
        <div>
            <Hero />
            <HeroSection />
            <AchievementsSection />
            <MentorsSection />
            <ProjectsSection />
            <LearningPathsSection />
            <CommunityStatsSection />
        </div>
    );
}
