'use client';

import { motion, Variants } from 'framer-motion';
import HeroButtonGroup from './HeroButtonGroup';

const Hero = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 50 }, // Start a bit below the screen for a smooth bounce effect
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
                delayChildren: 0.3, // Delay children to appear after the container
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

    const badgeVariants: Variants = {
        hidden: {
            opacity: 0,
            y: -20,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                type: 'spring',
                stiffness: 100,
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

    const floatingVariants: Variants = {
        animate: {
            y: [-2, 2, -2],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <div>
            <motion.div
                className="bg-glow-radial flex flex-col items-center justify-center gap-4 px-6 pt-28 pb-12 md:pt-40 lg:gap-8 lg:pt-40 lg:pb-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.a
                    className="flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1.5 font-medium text-gray-700 transition-colors hover:bg-neutral-100"
                    href="/blog/two-dot-zero"
                    variants={badgeVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.span variants={floatingVariants} animate="animate">
                        🎉
                    </motion.span>
                    {" 1M+ Coders solved today's challenge"}
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        animate={{ x: [0, 3, 0], rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="h-6 w-6" // Smaller icon
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                        />
                    </motion.svg>
                </motion.a>

                <motion.h1
                    className="text-center text-4xl leading-[1.2] font-bold tracking-[-0.020em] text-gray-900 md:text-5xl lg:text-7xl"
                    variants={titleVariants}
                >
                    <motion.span
                        className="text-[rgba(175,183,180,1)]"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        The
                    </motion.span>
                    <motion.span
                        className="text-[rgba(0,55,32,1)]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.7,
                            type: 'spring',
                            stiffness: 100,
                        }}
                    >
                        {' perfect '}
                    </motion.span>
                    <motion.span
                        className="text-[rgba(175,183,180,1)]"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        ultimate platform
                    </motion.span>
                    <br className="hidden md:block" />
                    <motion.span
                        className="text-[rgba(0,55,32,1)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.1,
                            type: 'spring',
                            stiffness: 80,
                        }}
                    >
                        for coders on the go.
                    </motion.span>
                </motion.h1>

                <motion.h2
                    className="w-full max-w-2xl px-14 text-center text-lg leading-tight font-medium text-gray-600 lg:text-2xl"
                    variants={itemVariants}
                >
                    Transform your coding challenges into mastered skills with ease
                </motion.h2>

                <HeroButtonGroup />
            </motion.div>
        </div>
    );
};

export default Hero;
