'use client';

import { motion } from 'framer-motion';
import { BarChart, CheckCircle, Target, Users, Zap } from 'lucide-react';

const features = [
    {
        icon: Target,
        title: 'Skills Strategy',
        description: 'Scientific approach to evaluating technical skills',
    },
    {
        icon: Users,
        title: 'Tech Brand Showcase',
        description: 'Host coding events and connect with developers',
    },
    {
        icon: Zap,
        title: 'Optimized Hiring',
        description: 'Validate skills using tools developers love',
    },
    {
        icon: BarChart,
        title: 'Internal Talent',
        description: 'Inventory capabilities and close skills gaps',
    },
];

export function ContactSalesFeatures() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
        >
            <div>
                <h1 className="mb-4 text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:text-5xl">
                    See CodeCraft
                    <span className="block text-[rgb(148,242,127)]">in action</span>
                </h1>
                <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
                    Get a personalized demo to learn how to engage, hire, and upskill tech talent.
                </p>
            </div>

            <div className="space-y-4">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                    >
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(148,242,127)]">
                            <CheckCircle className="h-4 w-4 text-[rgba(14,15,12,1)]" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-2 flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-[rgb(148,242,127)]"></div>
                    <span className="font-semibold text-gray-900">30-minute personalized demo</span>
                </div>
                <p className="text-sm text-gray-600">
                    Tailored to your hiring needs with Q&A session.
                </p>
            </div>
        </motion.div>
    );
}
