'use client';

import { motion } from 'framer-motion';
import { BarChart3, Check, Code, Shield, Users } from 'lucide-react';

export default function FeatureShowcase() {
    const featureCategories = [
        {
            icon: <Users className="h-6 w-6" />,
            title: 'User Management',
            color: 'bg-blue-500',
            features: [
                {
                    name: 'User licenses',
                    starter: '1',
                    pro: 'Unlimited',
                    enterprise: 'Custom Quantities and Roles',
                },
                {
                    name: 'Attempts',
                    starter: '120 per year',
                    pro: '300 per year',
                    enterprise: 'Custom number',
                },
            ],
        },
        {
            icon: <Code className="h-6 w-6" />,
            title: 'Assessment Tools',
            color: 'bg-purple-500',
            features: [
                { name: 'Coding tests', starter: true, pro: true, enterprise: true },
                { name: 'Coding interviews', starter: true, pro: true, enterprise: true },
                { name: 'Plagiarism detection', starter: true, pro: true, enterprise: true },
                { name: 'Real-world questions', starter: true, pro: true, enterprise: true },
            ],
        },
        {
            icon: <BarChart3 className="h-6 w-6" />,
            title: 'Analytics & Insights',
            color: 'bg-green-500',
            features: [
                { name: 'Detailed insights', starter: true, pro: true, enterprise: true },
                { name: 'Email & chat support', starter: true, pro: true, enterprise: true },
                { name: 'Customer success team', starter: false, pro: false, enterprise: true },
            ],
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: 'Security & Integrations',
            color: 'bg-red-500',
            features: [
                { name: 'API access', starter: false, pro: false, enterprise: true },
                { name: 'Single sign-on (SSO)', starter: false, pro: false, enterprise: true },
                { name: 'Advanced integrations', starter: false, pro: 'Basic', enterprise: '40+' },
            ],
        },
    ];

    return (
        <section className="bg-gradient-to-br from-gray-50 to-white px-4 py-20">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2
                        className="mb-4 text-3xl font-semibold md:text-4xl"
                        style={{ color: 'var(--color-dark-900)' }}
                    >
                        Features & Capabilities
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        Comprehensive tools designed to streamline your technical hiring process
                    </p>
                </motion.div>

                <div className="mb-12 grid gap-8 md:grid-cols-2">
                    {featureCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4 }}
                            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="mb-6 flex items-center">
                                <div className={`mr-4 rounded-xl p-3 ${category.color} text-white`}>
                                    {category.icon}
                                </div>
                                <h3
                                    className="text-xl font-semibold"
                                    style={{ color: 'var(--color-dark-900)' }}
                                >
                                    {category.title}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {category.features.map((feature, featureIndex) => (
                                    <motion.div
                                        key={feature.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: categoryIndex * 0.1 + featureIndex * 0.05,
                                        }}
                                        viewport={{ once: true }}
                                        className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0"
                                    >
                                        <span className="text-sm font-medium text-gray-700">
                                            {feature.name}
                                        </span>
                                        <div className="flex gap-6 text-xs">
                                            <div className="w-20 text-center">
                                                {typeof feature.starter === 'boolean' ? (
                                                    feature.starter ? (
                                                        <Check
                                                            className="mx-auto h-4 w-4"
                                                            style={{
                                                                color: 'var(--color-success-100)',
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-gray-400">—</span>
                                                    )
                                                ) : (
                                                    <span className="font-medium text-gray-600">
                                                        {feature.starter}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="w-20 text-center">
                                                {typeof feature.pro === 'boolean' ? (
                                                    feature.pro ? (
                                                        <Check
                                                            className="mx-auto h-4 w-4"
                                                            style={{
                                                                color: 'var(--color-success-100)',
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-gray-400">—</span>
                                                    )
                                                ) : (
                                                    <span className="font-medium text-gray-600">
                                                        {feature.pro}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="w-20 text-center">
                                                {typeof feature.enterprise === 'boolean' ? (
                                                    feature.enterprise ? (
                                                        <Check
                                                            className="mx-auto h-4 w-4"
                                                            style={{
                                                                color: 'var(--color-success-100)',
                                                            }}
                                                        />
                                                    ) : (
                                                        <span className="text-gray-400">—</span>
                                                    )
                                                ) : (
                                                    <span
                                                        className="font-semibold"
                                                        style={{
                                                            color: 'var(--color-success-900)',
                                                        }}
                                                    >
                                                        {feature.enterprise}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Plan Headers */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-4 flex justify-end gap-6 pr-8 text-sm font-semibold"
                >
                    <div className="w-20 text-center" style={{ color: 'var(--color-muted-600)' }}>
                        Starter
                    </div>
                    <div className="w-20 text-center" style={{ color: 'var(--color-muted-600)' }}>
                        Pro
                    </div>
                    <div className="w-20 text-center" style={{ color: 'var(--color-success-900)' }}>
                        Enterprise
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
