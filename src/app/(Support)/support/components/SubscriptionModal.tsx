'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Clock, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { plans } from '@/data/support';

interface SubscriptionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function SubscriptionModal({ open, onOpenChange }: SubscriptionModalProps) {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleSubscribe = async (planName: string) => {
        setLoading(planName);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            localStorage.setItem(
                'supportSubscription',
                JSON.stringify({
                    plan: planName,
                    subscribedAt: new Date().toISOString(),
                    active: true,
                }),
            );

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
            <DialogContent className="max-h-[90vh] !max-w-6xl overflow-y-auto">
                <DialogHeader className="pb-6 text-center">
                    <DialogTitle className="mb-2 text-3xl font-bold" style={{ color: '#0e0f0c' }}>
                        Choose Your Support Plan
                    </DialogTitle>
                    <p className="text-lg" style={{ color: '#6a6c6a' }}>
                        Get the help you need with our flexible support options
                    </p>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {plans.map((plan) => (
                        <div key={plan.name} className="relative">
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 transform">
                                    <Badge
                                        className="px-4 py-1"
                                        style={{ backgroundColor: '#94f27f', color: '#003720' }}
                                    >
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <Card
                                className={`h-full transition-all duration-300 hover:shadow-lg ${
                                    plan.popular ? 'shadow-lg ring-2' : ''
                                }`}
                                style={{
                                    borderColor: plan.popular ? '#94f27f' : '#e5e7eb',
                                }}
                            >
                                <CardHeader className="pb-4 text-center">
                                    <div
                                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                                        style={{
                                            backgroundColor: plan.popular
                                                ? '#94f27f'
                                                : plan.bgColor,
                                        }}
                                    >
                                        <plan.icon
                                            className="h-8 w-8"
                                            style={{ color: plan.color }}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold" style={{ color: '#0e0f0c' }}>
                                        {plan.name}
                                    </h3>
                                    <div className="mt-2 flex items-baseline justify-center">
                                        <span
                                            className="text-4xl font-bold"
                                            style={{ color: '#0e0f0c' }}
                                        >
                                            {plan.price}
                                        </span>
                                        <span className="ml-1" style={{ color: '#6a6c6a' }}>
                                            {plan.period}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm" style={{ color: '#6a6c6a' }}>
                                        {plan.description}
                                    </p>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <ul className="mb-6 space-y-3">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start space-x-3"
                                            >
                                                <Check
                                                    className="mt-0.5 h-5 w-5 flex-shrink-0"
                                                    style={{ color: '#94f27f' }}
                                                />
                                                <span
                                                    className="text-sm"
                                                    style={{ color: '#454745' }}
                                                >
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        onClick={() => handleSubscribe(plan.name)}
                                        disabled={loading === plan.name}
                                        className={`w-full font-semibold ${
                                            plan.popular
                                                ? 'text-white hover:opacity-90'
                                                : 'border hover:opacity-90'
                                        }`}
                                        style={{
                                            backgroundColor: plan.popular ? '#003720' : 'white',
                                            color: plan.popular ? 'white' : '#0e0f0c',
                                            borderColor: plan.popular ? '#003720' : '#e5e7eb',
                                        }}
                                    >
                                        {loading === plan.name ? (
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
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="mb-4 text-sm" style={{ color: '#6a6c6a' }}>
                        All plans include a 7-day free trial. Cancel anytime.
                    </p>
                    <div className="flex items-center justify-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" style={{ color: '#6a6c6a' }} />
                            <span className="text-sm" style={{ color: '#6a6c6a' }}>
                                24/7 availability
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" style={{ color: '#6a6c6a' }} />
                            <span className="text-sm" style={{ color: '#6a6c6a' }}>
                                Expert support team
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4" style={{ color: '#6a6c6a' }} />
                            <span className="text-sm" style={{ color: '#6a6c6a' }}>
                                4.9/5 rating
                            </span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
