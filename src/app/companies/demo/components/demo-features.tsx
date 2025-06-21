'use client';

import { motion } from 'framer-motion';
import { BarChart, Calendar, Target, Users, Zap } from 'lucide-react';

const features = [
    {
        icon: Target,
        title: 'Skill Assessment Strategy',
        description: 'Take a deliberate, scientific approach to evaluating technical skills',
    },
    {
        icon: Users,
        title: 'Team Collaboration Tools',
        description: 'Enable seamless collaboration between hiring teams and candidates',
    },
    {
        icon: Zap,
        title: 'Automated Screening',
        description: 'Streamline your hiring process with AI-powered candidate screening',
    },
    {
        icon: BarChart,
        title: 'Advanced Analytics',
        description: 'Get detailed insights into candidate performance and hiring metrics',
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
            <div>
                <h1 className="mb-4 text-4xl font-bold text-white">
                    See CodeCraft
                    <span className="text-success-100 block">in action</span>
                </h1>
                <p className="text-muted-500 text-xl leading-relaxed">
                    Schedule a personalized demo with one of our product experts to learn how to
                    transform your hiring process and build exceptional development teams.
                </p>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">What youll discover:</h2>
                <div className="grid gap-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-start space-x-4 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                        >
                            <div className="bg-success-100/20 flex h-10 w-10 items-center justify-center rounded-lg">
                                <feature.icon className="text-success-100 h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="mb-1 font-semibold text-white">{feature.title}</h3>
                                <p className="text-muted-500 text-sm">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="bg-success-100/10 border-success-100/20 rounded-lg border p-6">
                <div className="mb-3 flex items-center space-x-2">
                    <Calendar className="text-success-100 h-5 w-5" />
                    <span className="text-success-100 font-semibold">
                        30-minute personalized demo
                    </span>
                </div>
                <p className="text-muted-500 text-sm">
                    Our product experts will tailor the demo to your specific hiring needs and
                    answer all your questions.
                </p>
            </div>
        </motion.div>
    );
}
