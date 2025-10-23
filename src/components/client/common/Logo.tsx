'use client';

import type React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

interface LogoProps {
    authState: {
        isAuthenticated: boolean;
    };
}

const Logo: React.FC<LogoProps> = ({ authState }) => {
    return (
        <Link href="/" className="group mr-4 flex items-center gap-2">
            <motion.div
                className="relative flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-md"
                whileHover={{
                    scale: 1.08,
                    rotate: [0, -3, 3, 0],
                    transition: { duration: 0.4, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.92 }}
                initial={false}
                animate={{
                    boxShadow: authState.isAuthenticated
                        ? '0 10px 25px -5px rgba(16, 185, 129, 0.4), 0 10px 10px -5px rgba(16, 185, 129, 0.04)'
                        : '0 10px 25px -5px rgba(6, 182, 212, 0.4), 0 10px 10px -5px rgba(6, 182, 212, 0.04)',
                    y: [0, -2, 0],
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    boxShadow: { duration: 0.5 },
                    y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
                }}
            >
                <motion.div
                    animate={{
                        rotate: authState.isAuthenticated ? 360 : 0,
                        scale: authState.isAuthenticated ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                        rotate: { duration: 0.6, ease: 'easeInOut' },
                        scale: { duration: 0.4, ease: 'easeInOut' },
                    }}
                >
                    <Code className="h-4 w-4 text-white" strokeWidth={2} />
                </motion.div>

                <motion.div
                    className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full"
                    initial={false}
                    animate={{
                        backgroundColor: authState.isAuthenticated ? '#10b981' : '#06b6d4',
                        scale: authState.isAuthenticated ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                        backgroundColor: { duration: 0.5 },
                        scale: {
                            duration: 0.6,
                            repeat: authState.isAuthenticated ? Number.POSITIVE_INFINITY : 0,
                            repeatDelay: 2,
                        },
                    }}
                />
            </motion.div>

            <motion.div
                className="relative hidden sm:block"
                whileHover={{ x: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                <motion.span
                    className="relative text-xl font-semibold tracking-wide"
                    initial={false}
                    animate={{
                        color: authState.isAuthenticated ? '#065f46' : 'rgba(0, 55, 32, 1)',
                    }}
                    transition={{ duration: 0.5 }}
                >
                    Dev
                    <motion.span
                        className="relative"
                        animate={{
                            color: authState.isAuthenticated ? '#10b981' : 'rgba(0, 55, 32, 1)',
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        Chefs
                        <motion.div
                            className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{
                                width: authState.isAuthenticated ? '100%' : '0%',
                                opacity: authState.isAuthenticated ? 1 : 0,
                                backgroundColor: authState.isAuthenticated ? '#10b981' : '#06b6d4',
                            }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                        />
                    </motion.span>
                </motion.span>

                <motion.div
                    className="absolute inset-0 -z-10 rounded-lg blur-xl"
                    animate={{
                        backgroundColor: authState.isAuthenticated ? '#10b98120' : '#06b6d420',
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.02, 1],
                    }}
                    whileHover={{
                        opacity: 0.8,
                        scale: 1.05,
                    }}
                    transition={{
                        backgroundColor: { duration: 0.5 },
                        opacity: {
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                        },
                        scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
                    }}
                />
            </motion.div>
        </Link>
    );
};

export default Logo;
