'use client';

import { motion } from 'framer-motion';

const CareerCTA = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="bg-gradient-to-r from-gray-50 to-white py-16">
            <div className="mx-auto max-w-4xl px-6 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Advance your Career with{' '}
                            <span className="text-[#8BC34A]">a DevChef Profile</span>
                        </h2>

                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Create your professional profile and connect with top employers looking
                            for talented developers like you.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-8">
                        <a
                            href="/enter/sign-up/candidate"
                            className="inline-flex items-center gap-3 rounded-lg bg-[rgba(0,55,32,1)] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[rgba(0,55,32,0.9)] hover:shadow-lg"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Create Your Free Profile
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CareerCTA;
