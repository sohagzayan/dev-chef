'use client';

import { motion } from 'framer-motion';
import { Coffee, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function FooterSection() {
    const socialLinks = [
        { icon: Github, href: '#' },
        { icon: Twitter, href: '#' },
        { icon: Linkedin, href: '#' },
        { icon: Mail, href: '#' },
    ];

    const footerSections = [
        {
            title: 'Learn',
            links: ['Algorithms', 'Data Structures', 'System Design', 'Interview Prep'],
        },
        {
            title: 'Community',
            links: ['Mentorship', 'Projects', 'Discussions', 'Events'],
        },
        {
            title: 'Support',
            links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
        },
    ];

    return (
        <footer className="bg-[rgba(14,15,12,1)] py-16 text-white">
            <div className="container mx-auto px-6">
                <div className="mb-12 grid gap-8 md:grid-cols-4">
                    <div>
                        <motion.h3
                            className="mb-4 bg-gradient-to-r from-[rgb(148,242,127)] to-white bg-clip-text text-2xl font-bold text-transparent"
                            whileHover={{ scale: 1.05 }}
                        >
                            Algorithm Playground
                        </motion.h3>
                        <p className="mb-4 text-[rgba(106,108,106,1)]">
                            Empowering developers worldwide with interactive learning experiences
                            and expert mentorship.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ scale: 1.2, y: -2 }}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(69,71,69,1)] transition-colors hover:bg-[rgb(148,242,127)] hover:text-[rgba(0,55,32,1)]"
                                >
                                    <social.icon className="h-5 w-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h4 className="mb-4 text-lg font-semibold text-[rgb(148,242,127)]">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <motion.li key={linkIndex} whileHover={{ x: 5 }}>
                                        <a
                                            href="#"
                                            className="text-[rgba(106,108,106,1)] transition-colors hover:text-white"
                                        >
                                            {link}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-[rgba(69,71,69,1)] pt-8">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <p className="mb-4 text-[rgba(106,108,106,1)] md:mb-0">
                            © 2025 Algorithm Playground. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2">
                            <Coffee className="h-4 w-4 text-[rgb(148,242,127)]" />
                            <span className="text-[rgba(106,108,106,1)]">
                                Made with love for developers
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
