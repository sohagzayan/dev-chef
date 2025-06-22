'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'How do pricing and billing work?',
            answer: 'Our pricing is based on the number of users and attempts you need. Starter plans include 120 attempts per year, Pro includes 300 attempts, and Enterprise offers custom limits. Additional attempts are available for $15 each. Annual billing offers a 20% discount compared to monthly billing, and you can upgrade or downgrade at any time.',
        },
        {
            question: 'Can I upgrade or downgrade my plan anytime?',
            answer: "Yes, you can upgrade or downgrade your plan at any time through your account dashboard. When upgrading, you'll be charged the prorated difference immediately and gain access to new features instantly. When downgrading, the change will take effect at your next billing cycle, and you'll receive account credit for the difference.",
        },
    ];

    return (
        <section className="bg-gray-50 px-4 py-20">
            <div className="mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2
                        className="mb-4 text-3xl font-semibold md:text-4xl"
                        style={{ color: 'var(--color-dark-900)' }}
                    >
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Everything you need to know about our pricing and plans
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                            >
                                <h3
                                    className="pr-4 text-lg font-medium"
                                    style={{ color: 'var(--color-dark-900)' }}
                                >
                                    {faq.question}
                                </h3>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    {openIndex === index ? (
                                        <Minus
                                            className="h-5 w-5"
                                            style={{ color: 'var(--color-success-100)' }}
                                        />
                                    ) : (
                                        <Plus
                                            className="h-5 w-5"
                                            style={{ color: 'var(--color-muted-600)' }}
                                        />
                                    )}
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="border-t border-gray-100 px-6 pb-6">
                                            <p className="pt-4 leading-relaxed text-gray-600">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-12 rounded-2xl bg-white p-8 text-center shadow-lg"
                >
                    <h3
                        className="mb-4 text-xl font-semibold"
                        style={{ color: 'var(--color-dark-900)' }}
                    >
                        Still have questions?
                    </h3>
                    <p className="mb-6 text-gray-600">
                        Our team is here to help you find the perfect plan for your needs.
                    </p>
                    <button
                        className="rounded-xl px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: 'var(--color-success-100)' }}
                    >
                        Contact Support
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
