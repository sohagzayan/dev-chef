'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function PricingHeader() {
    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h1
                        className="mb-3 text-4xl leading-tight font-semibold tracking-tight md:text-5xl"
                        style={{ color: 'var(--color-dark-900)' }}
                    >
                        Select a plan that suits your needs.
                    </h1>
                    <p className="mx-auto mb-4 max-w-3xl text-lg leading-relaxed text-gray-600">
                        Assess skills for any developer role, from interns to experienced hires,
                        including software engineer, back-end, front-end, DevOps, data scientist,
                        and QA/SDET.
                    </p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex items-center justify-center gap-2 text-sm text-gray-500"
                    >
                        <div className="flex -space-x-1">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <span>Trusted by 20+ companies worldwide</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
