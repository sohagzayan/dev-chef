'use client';

import { motion } from 'framer-motion';
import { BarChart, CheckCircle, Target, Users, Zap } from 'lucide-react';

const features = [
    {
        icon: Target,
        title: 'Set up a skills strategy',
        description: 'Take a deliberate, scientific approach to evaluating technical skills',
    },
    {
        icon: Users,
        title: 'Showcase your tech brand',
        description: 'Host coding events and connect with developers',
    },
    {
        icon: Zap,
        title: 'Optimize your hiring process',
        description: 'Validate the skills you need using tools developers love',
    },
    {
        icon: BarChart,
        title: 'Mobilize your internal talent',
        description: 'Inventory internal capabilities and close technical skills gaps',
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
                <h1 className="mb-4 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
                    See CodeCraft
                    <span className="block text-[rgb(148,242,127)]">in action</span>
                </h1>
                <p className="text-xl leading-relaxed text-gray-600">
                    Attend a live, personalized demo with one of our product experts to learn how to
                    engage, hire, and upskill the tech talent you need to innovate. Well cover how
                    to:
                </p>
            </div>

            <div className="space-y-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-4"
                    >
                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(148,242,127)]">
                            <CheckCircle className="h-5 w-5 text-[rgba(14,15,12,1)]" />
                        </div>
                        <div>
                            <h3 className="mb-1 font-semibold text-gray-900">{feature.title}.</h3>
                            <p className="text-gray-600">{feature.description}.</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <div className="mb-3 flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-[rgb(148,242,127)]"></div>
                    <span className="font-semibold text-gray-900">30-minute personalized demo</span>
                </div>
                <p className="text-sm text-gray-600">
                    Our product experts will tailor the demo to your specific hiring needs and
                    answer all your questions about implementing CodeCraft in your organization.
                </p>
            </div>
        </motion.div>
    );
}
