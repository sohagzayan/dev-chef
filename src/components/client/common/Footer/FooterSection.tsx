'use client';

import { motion } from 'framer-motion';
import { Bell, Facebook, Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

export function FooterSection() {
    const socialLinks = [
        { icon: Github, href: '#' },
        { icon: Twitter, href: '#' },
        { icon: Linkedin, href: '#' },
        { icon: Instagram, href: '#' },
        { icon: Facebook, href: '#' },
        { icon: Mail, href: '#' },
    ];

    const servicesLinks = [
        'Find Remote Jobs',
        'Post a Remote Job',
        'Remote First Recruiting',
        'Resources & Services',
        'Sign Up for Candidates',
        'Sign Up for Employers',
        'Login',
    ];

    const companyLinks = [
        'Blog',
        'Testimonials',
        'About',
        'Contact Us',
        'Terms and Conditions',
        'Privacy Policy',
    ];

    const brandsLinks = [
        'Our Development Community',
        'Devchefs Circle Community',
        'Tech Learning Podcast',
        'Devchefs Brands',
    ];

    const jobCategories = [
        'Remote Virtual Assistant Jobs',
        'Remote Business Development & Sales Jobs',
        'Remote Design Jobs',
        'Remote Finance and Accounting Jobs',
        'Remote Operations Jobs',
        'Remote Customer Service Jobs',
        'Remote Marketing Jobs',
        'Remote Product Jobs',
        'Remote Web Developer Jobs',
        'Remote Tech Support Jobs',
        'Remote Data Analyst Jobs',
        'Remote Recruiter and HR Jobs',
        'Remote Paid Ads and PPC Jobs',
        'Remote Video Editing Jobs',
        'Remote Community Manager Jobs',
        'Remote SEO and Content Marketing Jobs',
        'Remote Teaching Jobs',
        'Remote Writing Jobs',
        'Remote E-Commerce Jobs',
        'All Remote Jobs Categories',
    ];

    return (
        <footer className="bg-[#1A1A1A] text-white">
            <div className="container mx-auto px-4 py-12">
                {/* Top Section - Four Columns */}
                <div className="mb-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Services Column */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold text-gray-300 uppercase">SERVICES</h3>
                        <ul className="space-y-2">
                            {servicesLinks.map((link, index) => (
                                <motion.li key={index} whileHover={{ x: 5 }}>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        {link}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold text-gray-300 uppercase">COMPANY</h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link, index) => (
                                <motion.li key={index} whileHover={{ x: 5 }}>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        {link}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Devchefs Brands Column */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold text-gray-300 uppercase">
                            DEV CHEFS BRANDS
                        </h3>
                        <ul className="space-y-2">
                            {brandsLinks.map((link, index) => (
                                <motion.li key={index} whileHover={{ x: 5 }}>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        {link}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Job Alerts & Logo Column */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold text-gray-300 uppercase">
                            GET REMOTE JOB ALERTS
                        </h3>
                        <p className="mb-4 text-sm text-gray-400">
                            Get notified about new remote jobs immediately!
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mb-6 flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                        >
                            <Bell className="h-4 w-4" />
                            Subscribe to Job Alerts
                        </motion.button>

                        {/* Logo placeholder */}
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500">
                                <span className="text-sm font-bold text-white">dc</span>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">devchefs</div>
                                <div className="text-sm text-white">platform</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator Line */}
                <div className="mb-8 border-t border-gray-600"></div>

                {/* Browse Remote Jobs Section */}
                <div className="mb-8">
                    <h3 className="mb-6 text-lg font-bold text-gray-300 uppercase">
                        BROWSE REMOTE JOBS
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {jobCategories.map((category, index) => (
                            <motion.div key={index} whileHover={{ x: 5 }}>
                                <a
                                    href="#"
                                    className="block py-1 text-sm text-gray-400 transition-colors hover:text-white"
                                >
                                    {category}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section - Copyright & Social Media */}
                <div className="border-t border-gray-600 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-gray-400">
                            © Devchefs Platform. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ scale: 1.2, y: -2 }}
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    <social.icon className="h-5 w-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
