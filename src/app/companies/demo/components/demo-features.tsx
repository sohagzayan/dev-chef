'use client';

import { motion } from 'framer-motion';
import { Calendar, Target, Users, Zap } from 'lucide-react';

const features = [
    {
        icon: Target,
        title: 'Smart Assessment',
        description: 'AI-powered technical skill evaluation',
    },
    {
        icon: Users,
        title: 'Team Collaboration',
        description: 'Seamless hiring team coordination',
    },
    {
        icon: Zap,
        title: 'Automated Screening',
        description: 'Intelligent candidate filtering',
    },
];

export function DemoFeatures() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
        >
            <div className="space-y-4">
                <h1 className="text-4xl leading-tight font-bold text-gray-900">
                    Transform Your
                    <span className="block text-[rgb(148,242,127)]">Hiring Process</span>
                </h1>
                <p className="text-lg text-gray-600">
                    Get a personalized demo and see how CodeCraft can revolutionize your technical
                    hiring.
                </p>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Why CodeCraft?</h2>
                <div className="grid gap-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center space-x-3"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(148,242,127)]/10">
                                <feature.icon className="h-4 w-4 text-[rgb(148,242,127)]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="rounded-lg border border-[rgb(148,242,127)]/20 bg-gradient-to-r from-[rgb(148,242,127)]/10 to-[rgb(148,242,127)]/5 p-4">
                <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(148,242,127)]">
                        <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-[rgb(148,242,127)]">
                            Free 30-minute demo
                        </h3>
                        <p className="text-sm text-gray-700">No commitment required</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
