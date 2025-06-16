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
        <Link href="/" className="group mr-6 flex items-center gap-3">
            <motion.div
                className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg"
                whileHover={{
                    scale: 1.05,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
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
                    <Code className="h-5 w-5 text-white" strokeWidth={2.5} />
                </motion.div>

                <motion.div
                    className="absolute -top-1 -right-1 h-3 w-3 rounded-full"
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
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
                <motion.span
                    className="relative text-2xl font-bold tracking-tight"
                    initial={false}
                    animate={{
                        color: authState.isAuthenticated ? '#065f46' : '#0f172a',
                    }}
                    transition={{ duration: 0.5 }}
                >
                    Dev
                    <motion.span
                        className="relative"
                        animate={{
                            color: authState.isAuthenticated ? '#10b981' : '#06b6d4',
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
