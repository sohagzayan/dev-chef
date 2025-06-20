'use client';

import { motion } from 'framer-motion';
import { Award, Target, TrendingUp, Users } from 'lucide-react';

export function CommunityStatsSection() {
    const stats = [
        { number: '50K+', label: 'Active Developers', icon: Users },
        { number: '1M+', label: 'Problems Solved', icon: Target },
        { number: '500+', label: 'Expert Mentors', icon: Award },
        { number: '95%', label: 'Success Rate', icon: TrendingUp },
    ];

    return (
        <section className="bg-gradient-to-r from-[rgba(14,15,12,1)] to-[rgba(69,71,69,1)] py-20 text-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-5xl font-bold">Join Our Growing Community</h2>
                    <p className="text-xl opacity-80">
                        Thousands of developers are already leveling up their skills
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(148,242,127)]"
                            >
                                <stat.icon className="h-8 w-8 text-[rgba(0,55,32,1)]" />
                            </motion.div>
                            <motion.h3
                                className="mb-2 text-4xl font-bold"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                            >
                                {stat.number}
                            </motion.h3>
                            <p className="text-lg opacity-80">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
