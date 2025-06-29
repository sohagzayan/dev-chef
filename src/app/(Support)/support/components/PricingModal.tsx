'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Clock, MessageCircle, Star, Users, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PricingModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const plans = [
    {
        name: 'Basic Support',
        price: '$9',
        period: '/month',
        description: 'Perfect for individuals getting started',
        features: [
            'Email support (24-48h response)',
            'Knowledge base access',
            'Community forum access',
            'Basic tutorials',
        ],
        icon: MessageCircle,
        popular: false,
        stripePriceId: 'price_basic_support',
    },
    {
        name: 'Pro Support',
        price: '$29',
        period: '/month',
        description: 'Ideal for growing teams and businesses',
        features: [
            'Live chat support (2-4h response)',
            'Priority email support',
            'Screen sharing sessions',
            'Advanced tutorials',
            'Integration assistance',
        ],
        icon: Zap,
        popular: true,
        stripePriceId: 'price_pro_support',
    },
    {
        name: 'Enterprise Support',
        price: '$99',
        period: '/month',
        description: 'For large organizations with complex needs',
        features: [
            '24/7 live chat support',
            'Dedicated account manager',
            'Phone support',
            'Custom training sessions',
            'Priority feature requests',
            'SLA guarantee',
        ],
        icon: Star,
        popular: false,
        stripePriceId: 'price_enterprise_support',
    },
];

export default function PricingModal({ open, onOpenChange }: PricingModalProps) {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleSubscribe = async (planId: string) => {
        setLoading(planId);

        try {
            // Simulate Stripe checkout process
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // In a real app, you would integrate with Stripe here
            // const response = await fetch('/api/create-checkout-session', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ priceId: planId })
            // })

            // For demo purposes, redirect directly to live support
            onOpenChange(false);
            router.push('/support/live-chat');
        } catch (error) {
            console.error('Subscription error:', error);
        } finally {
            setLoading(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
                <DialogHeader className="pb-6 text-center">
                    <DialogTitle className="text-dark-900 mb-2 text-3xl font-bold">
                        Choose Your Support Plan
                    </DialogTitle>
                    <p className="text-muted-500 text-lg">
                        Get the help you need with our flexible support options
                    </p>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 transform">
                                    <Badge className="bg-success-100 text-success-900 px-4 py-1">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <Card
                                className={`h-full ${plan.popular ? 'ring-success-100 shadow-lg ring-2' : 'border-gray-200'} transition-all duration-300 hover:shadow-lg`}
                            >
                                <CardHeader className="pb-4 text-center">
                                    <div
                                        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${plan.popular ? 'bg-success-100' : 'bg-gray-100'}`}
                                    >
                                        <plan.icon
                                            className={`h-8 w-8 ${plan.popular ? 'text-success-900' : 'text-muted-500'}`}
                                        />
                                    </div>
                                    <h3 className="text-dark-900 text-xl font-bold">{plan.name}</h3>
                                    <div className="mt-2 flex items-baseline justify-center">
                                        <span className="text-dark-900 text-4xl font-bold">
                                            {plan.price}
                                        </span>
                                        <span className="text-muted-500 ml-1">{plan.period}</span>
                                    </div>
                                    <p className="text-muted-500 mt-2 text-sm">
                                        {plan.description}
                                    </p>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <ul className="mb-6 space-y-3">
                                        {plan.features.map((feature, featureIndex) => (
                                            <motion.li
                                                key={feature}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + featureIndex * 0.1 }}
                                                className="flex items-start space-x-3"
                                            >
                                                <Check className="text-success-100 mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <span className="text-muted-700 text-sm">
                                                    {feature}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <Button
                                        onClick={() => handleSubscribe(plan.stripePriceId)}
                                        disabled={loading === plan.stripePriceId}
                                        className={`w-full ${
                                            plan.popular
                                                ? 'bg-success-900 hover:bg-success-900/90 text-white'
                                                : 'text-dark-900 border border-gray-300 bg-white hover:bg-gray-50'
                                        }`}
                                    >
                                        {loading === plan.stripePriceId ? (
                                            <div className="flex items-center space-x-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                <span>Processing...</span>
                                            </div>
                                        ) : (
                                            'Get Started'
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-muted-500 text-sm">
                        All plans include a 7-day free trial. Cancel anytime.
                    </p>
                    <div className="mt-4 flex items-center justify-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Clock className="text-muted-500 h-4 w-4" />
                            <span className="text-muted-500 text-sm">24/7 availability</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="text-muted-500 h-4 w-4" />
                            <span className="text-muted-500 text-sm">Expert support team</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
