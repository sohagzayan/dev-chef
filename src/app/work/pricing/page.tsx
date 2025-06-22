import FAQ from './components/faq';
import FeatureShowcase from './components/feature-showcase';
import PricingCards from './components/pricing-cards';
import PricingHeader from './components/pricing-header';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white">
            <PricingHeader />
            <PricingCards />
            <FeatureShowcase />
            <FAQ />
        </div>
    );
}
