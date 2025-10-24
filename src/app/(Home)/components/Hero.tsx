'use client';

import { motion, Variants } from 'framer-motion';

const Hero = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const titleVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 40,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <div className="relative overflow-hidden">
            {/* Light gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(148,242,127,0.05)] via-white to-[rgba(139,195,74,0.03)]" />

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[rgba(148,242,127,0.1)] to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-[rgba(139,195,74,0.08)] to-transparent blur-3xl" />

            <motion.div
                className="relative px-6 pt-16 pb-8 sm:px-12 sm:pt-20 sm:pb-12 lg:pt-28 lg:pb-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="sm:text-center">
                    <motion.h2
                        className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
                        variants={titleVariants}
                    >
                        Find Your Next Job & Master Your Skills.
                    </motion.h2>

                    <motion.p
                        className="mx-auto mt-6 max-w-3xl text-center text-lg font-medium text-gray-900"
                        variants={itemVariants}
                    >
                        Discover <strong>remote and onsite</strong> opportunities while{' '}
                        <strong>solving problems</strong> and advancing your skills.
                        <br />
                        Start your journey by{' '}
                        <a
                            href="/enter/sign-up/candidate"
                            className="text-gray-900 underline decoration-[rgba(0,55,32,1)] decoration-1 underline-offset-2 hover:decoration-2"
                        >
                            creating&nbsp;your&nbsp;free&nbsp;profile!
                        </a>
                    </motion.p>

                    {/* Search Input */}
                    <motion.div
                        className="mt-6 sm:mx-auto sm:flex sm:max-w-xl"
                        variants={itemVariants}
                    >
                        <div className="min-w-0 flex-1">
                            <form action="/remote-jobs" method="GET">
                                <label htmlFor="search" className="sr-only">
                                    Search Remote Jobs
                                </label>
                                <div className="group relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 transition-all group-focus-within:-left-4 group-focus-within:opacity-0 group-focus:-left-4 group-focus:opacity-0 group-active:-left-4 group-active:opacity-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                            className="h-6 w-6 text-gray-400"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        autoComplete="off"
                                        name="text"
                                        placeholder="Search remote jobs ..."
                                        type="search"
                                        className="block w-full rounded-full border-2 border-[rgba(175,183,180,0.3)] py-4 pr-6 pl-14 text-base text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-[#8BC34A] focus:pl-6 focus:outline-none"
                                    />
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    {/* Trending Categories */}
                    <motion.div
                        className="mt-4 flex flex-row flex-wrap items-center justify-start md:justify-center"
                        variants={itemVariants}
                    >
                        <span className="mr-4 w-full text-base font-medium text-gray-800 md:w-auto">
                            Trending categories:
                        </span>
                        {[
                            { name: 'Developer / Engineer', href: '/category/development' },
                            {
                                name: 'Management / Operations',
                                href: '/category/management-operations',
                            },
                            { name: 'Admin / Virtual Assistant', href: '/category/admin-va' },
                            { name: 'Marketing', href: '/category/marketing' },
                            { name: 'Writing', href: '/category/writing-editing' },
                            { name: 'Sales', href: '/category/business-development' },
                        ].map((category, index) => (
                            <motion.a
                                key={category.name}
                                href={category.href}
                                className="my-1 mr-2 rounded-md bg-[rgba(175,183,180,0.2)] px-2.5 py-1 text-xs font-semibold text-[rgba(0,55,32,1)] transition-colors hover:bg-[rgba(0,55,32,1)] hover:text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                            >
                                {category.name}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
