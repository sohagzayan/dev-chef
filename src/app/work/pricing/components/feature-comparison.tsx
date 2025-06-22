'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function FeatureComparison() {
    const features = [
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
            enterprise: 'Custom number of attempts',
        },
        { name: 'Coding tests', starter: true, pro: true, enterprise: true },
        { name: 'Coding interviews', starter: true, pro: true, enterprise: true },
        { name: 'Plagiarism detection', starter: true, pro: true, enterprise: true },
        { name: 'Leaked-question detection', starter: true, pro: true, enterprise: true },
        { name: 'Real-world questions', starter: true, pro: true, enterprise: true },
        { name: 'Code reviews', starter: true, pro: true, enterprise: true },
        { name: 'Insights', starter: true, pro: true, enterprise: true },
        { name: 'Email & chat support', starter: true, pro: true, enterprise: true },
        { name: 'Customer success team', starter: false, pro: false, enterprise: true },
        { name: 'API access', starter: false, pro: false, enterprise: true },
        {
            name: 'Integrations',
            starter: false,
            pro: 'ATS, Greenhouse, Lever, Ashby Calendar: Google & Outlook',
            enterprise: '40+',
        },
        { name: 'Single sign-on (SSO)', starter: false, pro: false, enterprise: true },
        { name: 'Archiving', starter: false, pro: false, enterprise: true },
    ];

    return (
        <section className="px-4 py-20" style={{ backgroundColor: '#fafafa' }}>
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2
                        className="mb-4 text-4xl font-bold md:text-5xl"
                        style={{ color: 'var(--color-dark-900)' }}
                    >
                        Features & Capabilities
                    </h2>
                    <p className="text-xl" style={{ color: 'var(--color-muted-500)' }}>
                        Compare whats included in each plan
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="overflow-hidden rounded-3xl bg-white"
                    style={{ boxShadow: 'var(--tw-shadow)' }}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr style={{ backgroundColor: 'var(--color-dark-900)' }}>
                                    <th className="p-6 text-left font-semibold text-white">
                                        Feature
                                    </th>
                                    <th className="p-6 text-center font-semibold text-white">
                                        Starter
                                    </th>
                                    <th className="p-6 text-center font-semibold text-white">
                                        Pro
                                    </th>
                                    <th
                                        className="p-6 text-center font-semibold text-white"
                                        style={{ backgroundColor: 'var(--color-success-100)' }}
                                    >
                                        Enterprise
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, index) => (
                                    <motion.tr
                                        key={feature.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                        className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                        style={{ borderColor: 'var(--color-muted-700)' }}
                                    >
                                        <td
                                            className="p-6 font-medium"
                                            style={{ color: 'var(--color-dark-900)' }}
                                        >
                                            {feature.name}
                                        </td>
                                        <td className="p-6 text-center">
                                            {typeof feature.starter === 'boolean' ? (
                                                feature.starter ? (
                                                    <Check
                                                        className="mx-auto h-5 w-5"
                                                        style={{
                                                            color: 'var(--color-success-100)',
                                                        }}
                                                    />
                                                ) : (
                                                    <X
                                                        className="mx-auto h-5 w-5"
                                                        style={{ color: 'var(--color-muted-500)' }}
                                                    />
                                                )
                                            ) : (
                                                <span style={{ color: 'var(--color-muted-600)' }}>
                                                    {feature.starter}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-6 text-center">
                                            {typeof feature.pro === 'boolean' ? (
                                                feature.pro ? (
                                                    <Check
                                                        className="mx-auto h-5 w-5"
                                                        style={{
                                                            color: 'var(--color-success-100)',
                                                        }}
                                                    />
                                                ) : (
                                                    <X
                                                        className="mx-auto h-5 w-5"
                                                        style={{ color: 'var(--color-muted-500)' }}
                                                    />
                                                )
                                            ) : (
                                                <span style={{ color: 'var(--color-muted-600)' }}>
                                                    {feature.pro}
                                                </span>
                                            )}
                                        </td>
                                        <td
                                            className="p-6 text-center"
                                            style={{
                                                backgroundColor:
                                                    index === features.length - 1
                                                        ? 'transparent'
                                                        : '#f0fdf4',
                                            }}
                                        >
                                            {typeof feature.enterprise === 'boolean' ? (
                                                feature.enterprise ? (
                                                    <Check
                                                        className="mx-auto h-5 w-5"
                                                        style={{
                                                            color: 'var(--color-success-100)',
                                                        }}
                                                    />
                                                ) : (
                                                    <X
                                                        className="mx-auto h-5 w-5"
                                                        style={{ color: 'var(--color-muted-500)' }}
                                                    />
                                                )
                                            ) : (
                                                <span
                                                    style={{ color: 'var(--color-success-900)' }}
                                                    className="font-medium"
                                                >
                                                    {feature.enterprise}
                                                </span>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
