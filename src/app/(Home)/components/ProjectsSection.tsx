'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Eye, Github, Heart, Play, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ProjectsSection() {
    const [activeProject, setActiveProject] = useState(0);

    const projects = [
        {
            title: 'AI Code Assistant',
            author: 'TechWizard_2024',
            description: 'GPT-powered code completion and bug detection tool',
            tech: ['TypeScript', 'OpenAI', 'VS Code API', 'Node.js'],
            likes: 1247,
            forks: 234,
            stars: 892,
            views: '12.5k',
            gradient: 'from-indigo-500 via-purple-500 to-pink-500',
            category: 'AI/ML',
            difficulty: 'Advanced',
            lastUpdated: '2 days ago',
            liveDemo: true,
        },
        {
            title: 'Real-time Collaboration IDE',
            author: 'CodeMaster_Pro',
            description: 'Multi-user code editor with live cursor tracking',
            tech: ['React', 'Socket.io', 'Monaco Editor', 'Redis'],
            likes: 856,
            forks: 167,
            stars: 634,
            views: '8.9k',
            gradient: 'from-emerald-400 via-teal-500 to-blue-600',
            category: 'Developer Tools',
            difficulty: 'Expert',
            lastUpdated: '1 week ago',
            liveDemo: true,
        },
        {
            title: 'Blockchain Voting System',
            author: 'CryptoBuilder_X',
            description: 'Decentralized voting platform with smart contracts',
            tech: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
            likes: 723,
            forks: 89,
            stars: 445,
            views: '6.2k',
            gradient: 'from-orange-400 via-red-500 to-pink-600',
            category: 'Blockchain',
            difficulty: 'Advanced',
            lastUpdated: '3 days ago',
            liveDemo: false,
        },
    ];

    useEffect(() => {
        const projectInterval = setInterval(() => {
            setActiveProject((prev) => (prev + 1) % projects.length);
        }, 4000);
        return () => clearInterval(projectInterval);
    }, []);

    return (
        <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-5xl font-bold text-[rgba(14,15,12,1)]">
                        Community Projects
                    </h2>
                    <p className="text-xl text-[rgba(106,108,106,1)]">
                        Discover and showcase amazing projects built by our community
                    </p>
                </motion.div>

                {/* Featured Project */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
                                <div
                                    className={`h-64 bg-gradient-to-br ${projects[activeProject].gradient} relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-black/20" />
                                    <motion.div
                                        className="absolute top-4 left-4 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm"
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Featured Project
                                    </motion.div>
                                    <div className="absolute right-6 bottom-6 left-6">
                                        <motion.h3
                                            className="mb-2 text-3xl font-bold text-white"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {projects[activeProject].title}
                                        </motion.h3>
                                        <motion.p
                                            className="mb-3 text-white/90"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {projects[activeProject].description}
                                        </motion.p>
                                        <motion.p
                                            className="text-white/70"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            by {projects[activeProject].author}
                                        </motion.p>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="grid gap-8 md:grid-cols-2">
                                        <div>
                                            <h4 className="mb-3 font-semibold text-[rgba(14,15,12,1)]">
                                                Technologies Used
                                            </h4>
                                            <div className="mb-6 flex flex-wrap gap-2">
                                                {projects[activeProject].tech.map(
                                                    (tech, techIndex) => (
                                                        <motion.div
                                                            key={techIndex}
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{
                                                                delay: 0.6 + techIndex * 0.1,
                                                            }}
                                                        >
                                                            <Badge
                                                                variant="secondary"
                                                                className="bg-gray-100 text-gray-700"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        </motion.div>
                                                    ),
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <div className="text-[rgba(106,108,106,1)]">
                                                        Category
                                                    </div>
                                                    <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                        {projects[activeProject].category}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-[rgba(106,108,106,1)]">
                                                        Difficulty
                                                    </div>
                                                    <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                        {projects[activeProject].difficulty}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-[rgba(106,108,106,1)]">
                                                        Last Updated
                                                    </div>
                                                    <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                        {projects[activeProject].lastUpdated}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-[rgba(106,108,106,1)]">
                                                        Views
                                                    </div>
                                                    <div className="font-semibold text-[rgba(14,15,12,1)]">
                                                        {projects[activeProject].views}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="mb-3 font-semibold text-[rgba(14,15,12,1)]">
                                                Project Stats
                                            </h4>
                                            <div className="mb-6 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Heart className="h-4 w-4 text-red-500" />
                                                        <span className="text-sm">Likes</span>
                                                    </div>
                                                    <span className="font-semibold">
                                                        {projects[activeProject].likes}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Code2 className="h-4 w-4 text-blue-500" />
                                                        <span className="text-sm">Forks</span>
                                                    </div>
                                                    <span className="font-semibold">
                                                        {projects[activeProject].forks}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Star className="h-4 w-4 text-yellow-500" />
                                                        <span className="text-sm">Stars</span>
                                                    </div>
                                                    <span className="font-semibold">
                                                        {projects[activeProject].stars}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Eye className="h-4 w-4 text-purple-500" />
                                                        <span className="text-sm">Views</span>
                                                    </div>
                                                    <span className="font-semibold">
                                                        {projects[activeProject].views}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <Button className="flex-1 bg-[rgb(148,242,127)] text-[rgba(0,55,32,1)] hover:bg-[rgb(148,242,127)]/80">
                                                    <Github className="mr-2 h-4 w-4" />
                                                    View Code
                                                </Button>
                                                {projects[activeProject].liveDemo && (
                                                    <Button variant="outline" className="flex-1">
                                                        <Play className="mr-2 h-4 w-4" />
                                                        Live Demo
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Project Navigation */}
                    <div className="mt-6 flex justify-center gap-2">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveProject(index)}
                                className={`h-3 w-3 rounded-full transition-all ${
                                    index === activeProject
                                        ? 'bg-[rgb(148,242,127)]'
                                        : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Project Grid */}
                <div className="grid gap-8 md:grid-cols-3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
                            onClick={() => setActiveProject(index)}
                        >
                            <div className={`h-32 bg-gradient-to-br ${project.gradient} relative`}>
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute right-3 bottom-3 left-3">
                                    <h4 className="text-sm font-semibold text-white">
                                        {project.title}
                                    </h4>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="mb-2 text-xs text-[rgba(106,108,106,1)]">
                                    by {project.author}
                                </p>
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <Heart className="h-3 w-3 text-red-500" />
                                            {project.likes}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Star className="h-3 w-3 text-yellow-500" />
                                            {project.stars}
                                        </span>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        {project.category}
                                    </Badge>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
