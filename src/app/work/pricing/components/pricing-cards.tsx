'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PaymentModal from './payment-modal';

export default function PricingCards() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            monthlyPrice: 165,
            annualPrice: 132,
            originalAnnualPrice: 165,
            features: [
                '1 user',
                'Access to Screen + Interview',
                'Advanced plagiarism detection',
                '2000+ questions',
                '120 attempts per year',
                '$15 per additional attempt',
            ],
            buttonText: 'Get Started',
            popular: false,
            description: 'Perfect for small teams getting started',
        },
        {
            id: 'pro',
            name: 'Pro',
            monthlyPrice: 375,
            annualPrice: 300,
            originalAnnualPrice: 375,
            features: [
                'Unlimited users',
                'All Starter features',
                'ATS, Greenhouse, Lever, Ashby',
                'Calendar: Google & Outlook',
                '4000+ questions',
                '300 attempts per year',
                '$15 per additional attempt',
                'Priority support',
            ],
            buttonText: 'Get Started',
            popular: true,
            description: 'Most popular for growing teams',
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            monthlyPrice: null,
            annualPrice: null,
            features: [
                'Everything in Pro',
                'Custom users and attempts',
                'Certified assessments',
                '40+ integrations',
                'Full library of 7500+ questions',
                'Advanced user roles',
                'Dedicated account manager',
                'Premium support & SLA',
            ],
            buttonText: 'Contact Sales',
            popular: false,
            description: 'For large organizations',
        },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePlanSelect = (plan: any) => {
        if (plan.id === 'enterprise') {
            // Handle enterprise contact
            window.open('mailto:sales@company.com?subject=Enterprise Plan Inquiry', '_blank');
            return;
        }

        setSelectedPlan({
            ...plan,
            selectedPrice: billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice,
            billingCycle,
        });
        setShowPaymentModal(true);
    };

    return (
        <>
            <section className="px-4 py-16">
                <div className="mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="mb-16 flex justify-center"
                    >
                        <div className="relative rounded-2xl bg-gray-100 p-1.5 shadow-inner">
                            <motion.div
                                className="absolute top-1.5 bottom-1.5 rounded-xl shadow-lg"
                                style={{ backgroundColor: 'var(--color-dark-900)' }}
                                animate={{
                                    left: billingCycle === 'monthly' ? '6px' : '50%',
                                    width: 'calc(50% - 6px)',
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                            <div className="relative flex">
                                <button
                                    onClick={() => setBillingCycle('monthly')}
                                    className={`relative z-10 cursor-pointer rounded-xl px-8 py-3 text-sm font-medium transition-all duration-300 ${
                                        billingCycle === 'monthly'
                                            ? 'text-white'
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingCycle('annual')}
                                    className={`relative z-10 flex cursor-pointer items-center gap-2 rounded-xl px-8 py-3 text-sm font-medium transition-all duration-300 ${
                                        billingCycle === 'annual'
                                            ? 'text-white'
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    Annual
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-5 -right-10 rounded-full px-2 py-1 text-xs font-semibold"
                                        style={{
                                            backgroundColor:
                                                billingCycle === 'annual'
                                                    ? 'var(--color-success-100)'
                                                    : 'var(--color-success-100)',
                                            color: 'white',
                                        }}
                                    >
                                        Save 20%
                                    </motion.span>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Pricing Cards */}
                    <div className="grid gap-8 lg:grid-cols-3">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className={`relative rounded-2xl border-2 bg-white p-8 transition-all duration-300 ${
                                    plan.popular
                                        ? 'scale-105 border-2 shadow-2xl'
                                        : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                                }`}
                                style={{
                                    borderColor: plan.popular
                                        ? 'var(--color-success-100)'
                                        : undefined,
                                }}
                            >
                                {plan.popular && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                                        className="absolute -top-4 left-1/2 -translate-x-1/2 transform"
                                    >
                                        <div
                                            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg"
                                            style={{ backgroundColor: 'var(--color-success-100)' }}
                                        >
                                            <Sparkles className="h-4 w-4" />
                                            Most Popular
                                        </div>
                                    </motion.div>
                                )}

                                <div className="mb-8">
                                    <h3
                                        className="mb-2 text-xl font-semibold"
                                        style={{ color: 'var(--color-success-900)' }}
                                    >
                                        {plan.name}
                                    </h3>
                                    <p className="mb-6 text-sm text-gray-600">{plan.description}</p>

                                    {plan.monthlyPrice ? (
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={billingCycle}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="mb-2 flex items-baseline">
                                                    <span
                                                        className="text-4xl font-bold"
                                                        style={{ color: 'var(--color-dark-900)' }}
                                                    >
                                                        $
                                                        {billingCycle === 'annual'
                                                            ? plan.annualPrice
                                                            : plan.monthlyPrice}
                                                    </span>
                                                    <span className="ml-2 text-gray-500">
                                                        /month
                                                    </span>
                                                </div>
                                                {billingCycle === 'annual' && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="flex items-center gap-2 text-sm"
                                                    >
                                                        <span className="text-gray-500 line-through">
                                                            ${plan.originalAnnualPrice}/month
                                                        </span>
                                                        <span
                                                            className="rounded-full px-2 py-1 text-sm font-medium"
                                                            style={{
                                                                backgroundColor:
                                                                    'var(--color-success-100)',
                                                                color: 'white',
                                                            }}
                                                        >
                                                            Save $
                                                            {(plan.originalAnnualPrice -
                                                                plan.annualPrice) *
                                                                12}
                                                            /year
                                                        </span>
                                                    </motion.div>
                                                )}
                                                <p className="mt-2 text-xs text-gray-500">
                                                    Billed{' '}
                                                    {billingCycle === 'annual'
                                                        ? 'annually'
                                                        : 'monthly'}
                                                </p>
                                            </motion.div>
                                        </AnimatePresence>
                                    ) : (
                                        <div>
                                            <span
                                                className="text-3xl font-bold"
                                                style={{ color: 'var(--color-dark-900)' }}
                                            >
                                                Custom
                                            </span>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Contact us for pricing
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <ul className="mb-8 space-y-3">
                                    {plan.features.map((feature, featureIndex) => (
                                        <motion.li
                                            key={featureIndex}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + featureIndex * 0.05 }}
                                            className="flex items-start text-sm"
                                        >
                                            <Check
                                                className="mt-0.5 mr-3 h-4 w-4 flex-shrink-0"
                                                style={{ color: 'var(--color-success-100)' }}
                                            />
                                            <span className="text-gray-700">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <Button
                                    onClick={() => handlePlanSelect(plan)}
                                    className={`w-full transform rounded-xl py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                                        plan.popular
                                            ? 'text-white shadow-lg hover:shadow-xl'
                                            : 'border-2 bg-white hover:bg-gray-50'
                                    }`}
                                    style={{
                                        backgroundColor: plan.popular
                                            ? 'var(--color-success-100)'
                                            : 'white',
                                        borderColor: plan.popular
                                            ? 'var(--color-success-100)'
                                            : 'var(--color-dark-900)',
                                        color: plan.popular ? 'white' : 'var(--color-dark-900)',
                                    }}
                                >
                                    {plan.buttonText}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                plan={selectedPlan}
            />
        </>
    );
}
