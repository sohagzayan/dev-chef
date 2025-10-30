'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';

export type SignInRole = 'jobseeker' | 'employer';

interface SignInSelectorProps {
    className?: string;
}

export default function SignInSelector({ className = '' }: SignInSelectorProps) {
    const router = useRouter();
    const [role, setRole] = useState<SignInRole>('jobseeker');

    return (
        <LazyMotion features={domAnimation}>
            <div className={className}>
                <div className="space-y-4">
                    {/* Job Seeker option */}
                    <m.button
                        type="button"
                        aria-pressed={role === 'jobseeker'}
                        onClick={() => setRole('jobseeker')}
                        whileTap={{ scale: 0.98 }}
                        className="relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left transition-colors hover:bg-gray-50"
                    >
                        <AnimatePresence>
                            {role === 'jobseeker' && (
                                <m.span
                                    layoutId="roleHighlight"
                                    className="absolute inset-0 rounded-2xl border border-red-200 bg-red-50"
                                    transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                                />
                            )}
                        </AnimatePresence>
                        <div className="relative z-[1] flex items-center gap-4">
                            <div className="-space-x-2">
                                <m.span
                                    layout
                                    className="inline-block h-8 w-8 rounded-full bg-amber-300"
                                />
                                <m.span
                                    layout
                                    className="inline-block h-8 w-8 rounded-full bg-blue-300"
                                />
                                <m.span
                                    layout
                                    className="inline-block h-8 w-8 rounded-full bg-pink-300"
                                />
                            </div>
                            <div>
                                <div className="text-lg font-extrabold text-gray-900">
                                    Sign in as a Job Seeker
                                </div>
                                <p className="text-sm text-gray-600">
                                    Get matched with remote jobs.
                                </p>
                            </div>
                        </div>
                        <m.span
                            className={`relative z-[1] h-5 w-5 rounded-full border ${role === 'jobseeker' ? 'border-red-600 bg-red-600' : 'border-gray-300'}`}
                            aria-hidden
                        />
                    </m.button>

                    {/* Employer option */}
                    <m.button
                        type="button"
                        aria-pressed={role === 'employer'}
                        onClick={() => setRole('employer')}
                        whileTap={{ scale: 0.98 }}
                        className="relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left transition-colors hover:bg-gray-50"
                    >
                        <AnimatePresence>
                            {role === 'employer' && (
                                <m.span
                                    layoutId="roleHighlight"
                                    className="absolute inset-0 rounded-2xl border border-red-200 bg-red-50"
                                    transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                                />
                            )}
                        </AnimatePresence>
                        <div className="relative z-[1] flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-700">
                                    🥇
                                </span>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs font-black text-white">
                                    S
                                </span>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-black text-white">
                                    io
                                </span>
                            </div>
                            <div>
                                <div className="text-lg font-extrabold text-gray-900">
                                    Sign in as an Employer
                                </div>
                                <p className="text-sm text-gray-600">
                                    Connect with top remote talent.
                                </p>
                            </div>
                        </div>
                        <m.span
                            className={`relative z-[1] h-5 w-5 rounded-full border ${role === 'employer' ? 'border-red-600 bg-red-600' : 'border-gray-300'}`}
                            aria-hidden
                        />
                    </m.button>
                </div>

                <div className="mt-6">
                    <m.button
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                            router.push(
                                role === 'jobseeker'
                                    ? '/job-seekers/account/login'
                                    : '/employers/account/login',
                            )
                        }
                        className="w-full rounded-xl bg-red-600 py-3 text-base font-bold text-white transition-colors hover:bg-red-700"
                    >
                        Continue
                    </m.button>
                </div>
            </div>
        </LazyMotion>
    );
}
