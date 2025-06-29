'use client';

import type React from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    BarChart3,
    Calendar,
    ChevronRight,
    Download,
    Lightbulb,
    Palette,
    Play,
    Search,
    Send,
    Shield,
    Sparkles,
    Star,
    Tag,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updates } from '@/data/whats-new';

const filterOptions = [
    { id: 'all', label: 'All Updates', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'feature', label: 'Features', icon: <Zap className="h-4 w-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
    { id: 'improvement', label: 'Improvements', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'design', label: 'Design', icon: <Palette className="h-4 w-4" /> },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

const getCategoryIcon = (type: string) => {
    switch (type) {
        case 'feature':
            return <Zap className="h-5 w-5" />;
        case 'security':
            return <Shield className="h-5 w-5" />;
        case 'improvement':
            return <BarChart3 className="h-5 w-5" />;
        case 'design':
            return <Palette className="h-5 w-5" />;
        default:
            return <Sparkles className="h-5 w-5" />;
    }
};

const getCategoryColor = (type: string) => {
    switch (type) {
        case 'feature':
            return 'bg-[#94f27f] text-[#003720]';
        case 'security':
            return 'bg-[#003720] text-white';
        case 'improvement':
            return 'bg-[#94f27f]/20 text-[#003720]';
        case 'design':
            return 'bg-[#6a6c6a] text-white';
        default:
            return 'bg-[#6a6c6a] text-white';
    }
};

export default function WhatsNewPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [email, setEmail] = useState('');

    const filteredUpdates = updates.filter((update) => {
        const matchesFilter = activeFilter === 'all' || update.type === activeFilter;
        const matchesSearch =
            searchQuery === '' ||
            update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            update.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            update.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    // Group updates by month
    const updatesByMonth = filteredUpdates.reduce(
        (acc, update) => {
            const month = update.month;
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(update);
            return acc;
        },
        {} as Record<string, typeof updates>,
    );

    const handleSuggestionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle suggestion submission
        console.log('Suggestion:', suggestion, 'Email:', email);
        setSuggestion('');
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Unique Hero Section */}
            <motion.section
                className="relative overflow-hidden px-4 py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Dynamic Grid Background */}
                <div className="absolute inset-0 opacity-5">
                    <div className="grid h-full grid-cols-12 gap-4">
                        {Array.from({ length: 48 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="rounded-full bg-[#94f27f]"
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 0.3, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatDelay: 2,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative mx-auto max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#94f27f]/20">
                                    <TrendingUp className="h-6 w-6 text-[#003720]" />
                                </div>
                                <div>
                                    <Badge className="mb-1 border-[#94f27f]/20 bg-[#94f27f]/10 text-[#003720]">
                                        Live Updates
                                    </Badge>
                                    <div className="text-sm text-[#6a6c6a]">
                                        Last updated 2 hours ago
                                    </div>
                                </div>
                            </div>

                            <h1 className="mb-6 font-['Mona_Sans'] text-4xl leading-tight font-bold text-[#0e0f0c] md:text-6xl">
                                What{"'"}s New in{' '}
                                <span className="relative text-[#003720]">
                                    2024
                                    <motion.div
                                        className="absolute right-0 -bottom-2 left-0 h-1 bg-[#94f27f]"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 1, delay: 1 }}
                                    />
                                </span>
                            </h1>

                            <p className="mb-8 text-lg leading-relaxed text-[#6a6c6a]">
                                Discover the latest features, improvements, and innovations. Filter
                                by category, search for specific updates, or suggest new features.
                            </p>

                            {/* Quick Stats */}
                            <div className="mb-8 grid grid-cols-3 gap-4">
                                <div className="rounded-2xl bg-[#94f27f]/5 p-4 text-center">
                                    <div className="text-2xl font-bold text-[#003720]">25+</div>
                                    <div className="text-sm text-[#6a6c6a]">New Features</div>
                                </div>
                                <div className="rounded-2xl bg-[#003720]/5 p-4 text-center">
                                    <div className="text-2xl font-bold text-[#003720]">50+</div>
                                    <div className="text-sm text-[#6a6c6a]">Improvements</div>
                                </div>
                                <div className="rounded-2xl bg-[#94f27f]/5 p-4 text-center">
                                    <div className="text-2xl font-bold text-[#003720]">99.9%</div>
                                    <div className="text-sm text-[#6a6c6a]">Uptime</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Content - Interactive Panel */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="rounded-3xl border border-[#94f27f]/20 bg-gradient-to-br from-[#94f27f]/10 to-[#003720]/10 p-8 backdrop-blur-sm">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#94f27f]">
                                        <Lightbulb className="h-5 w-5 text-[#003720]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#0e0f0c]">
                                            Suggest a Feature
                                        </h3>
                                        <p className="text-sm text-[#6a6c6a]">
                                            Help us build what you need
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleSuggestionSubmit} className="space-y-4">
                                    <Textarea
                                        placeholder="What feature would you like to see next?"
                                        value={suggestion}
                                        onChange={(e) => setSuggestion(e.target.value)}
                                        className="resize-none border-[#94f27f]/20 focus:border-[#003720]"
                                        rows={3}
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Your email (optional)"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="border-[#94f27f]/20 focus:border-[#003720]"
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full bg-[#003720] text-white hover:bg-[#003720]/90"
                                        disabled={!suggestion.trim()}
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        Send Suggestion
                                    </Button>
                                </form>

                                <div className="mt-6 border-t border-[#94f27f]/20 pt-6">
                                    <div className="flex items-center justify-between text-sm text-[#6a6c6a]">
                                        <span>Recent suggestions:</span>
                                        <Badge
                                            variant="outline"
                                            className="border-[#94f27f]/20 text-[#003720]"
                                        >
                                            <Users className="mr-1 h-3 w-3" />
                                            127 this month
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Search and Filter Section */}
            <motion.section
                className="bg-gradient-to-r from-[#94f27f]/5 to-[#003720]/5 px-4 py-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                        {/* Search */}
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#6a6c6a]" />
                            <Input
                                type="text"
                                placeholder="Search updates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border-[#94f27f]/20 bg-white pl-10 focus:border-[#003720]"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2">
                            {filterOptions.map((option) => (
                                <Button
                                    key={option.id}
                                    variant={activeFilter === option.id ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setActiveFilter(option.id)}
                                    className={
                                        activeFilter === option.id
                                            ? 'bg-[#003720] text-white hover:bg-[#003720]/90'
                                            : 'border-[#94f27f]/20 bg-white text-[#003720] hover:bg-[#94f27f]/10'
                                    }
                                >
                                    {option.icon}
                                    <span className="ml-2">{option.label}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Updates by Month */}
            <motion.section
                className="px-4 py-20"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="mx-auto max-w-7xl">
                    <AnimatePresence mode="wait">
                        {Object.entries(updatesByMonth)
                            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                            .map(([month, monthUpdates]) => (
                                <motion.div
                                    key={month}
                                    className="mb-16"
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    {/* Month Header */}
                                    <div className="mb-8 flex items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#94f27f]/20">
                                                <Calendar className="h-6 w-6 text-[#003720]" />
                                            </div>
                                            <div>
                                                <h2 className="font-['Mona_Sans'] text-3xl font-bold text-[#0e0f0c]">
                                                    {month}
                                                </h2>
                                                <p className="text-[#6a6c6a]">
                                                    {monthUpdates.length} updates
                                                </p>
                                            </div>
                                        </div>
                                        <div className="h-px flex-1 bg-gradient-to-r from-[#94f27f]/30 to-transparent" />
                                    </div>

                                    {/* Featured Update for the Month */}
                                    {monthUpdates.some((update) => update.featured) && (
                                        <div className="mb-12">
                                            {monthUpdates
                                                .filter((update) => update.featured)
                                                .map((update) => (
                                                    <motion.div
                                                        key={update.id}
                                                        className="relative overflow-hidden rounded-3xl border border-[#94f27f]/10 bg-white p-8 shadow-lg"
                                                        whileHover={{ y: -4 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {/* Decorative Elements */}
                                                        <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-[#94f27f]/5" />

                                                        <div className="relative grid items-center gap-8 md:grid-cols-3">
                                                            <div className="md:col-span-2">
                                                                <div className="mb-4 flex items-center gap-3">
                                                                    <Badge className="bg-[#94f27f] px-4 py-2 text-[#003720]">
                                                                        <Star className="mr-2 h-4 w-4" />
                                                                        Featured This Month
                                                                    </Badge>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="border-[#003720]/20 text-[#003720]"
                                                                    >
                                                                        {update.version}
                                                                    </Badge>
                                                                </div>

                                                                <h3 className="mb-4 font-['Mona_Sans'] text-2xl font-bold text-[#0e0f0c] md:text-3xl">
                                                                    {update.title}
                                                                </h3>

                                                                <p className="mb-6 leading-relaxed text-[#454745]">
                                                                    {update.description}
                                                                </p>

                                                                <div className="mb-6 flex flex-wrap gap-2">
                                                                    {update.tags.map((tag) => (
                                                                        <Badge
                                                                            key={tag}
                                                                            variant="outline"
                                                                            className="border-[#94f27f]/30 text-[#003720]"
                                                                        >
                                                                            <Tag className="mr-1 h-3 w-3" />
                                                                            {tag}
                                                                        </Badge>
                                                                    ))}
                                                                </div>

                                                                <div className="flex flex-col gap-4 sm:flex-row">
                                                                    <Button className="bg-[#003720] text-white hover:bg-[#003720]/90">
                                                                        Try It Now
                                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="outline"
                                                                        className="border-[#003720] bg-transparent text-[#003720] hover:bg-[#003720]/5"
                                                                    >
                                                                        <Download className="mr-2 h-4 w-4" />
                                                                        Release Notes
                                                                    </Button>
                                                                </div>
                                                            </div>

                                                            <div className="relative">
                                                                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                                                                    <img
                                                                        src={
                                                                            update.image ||
                                                                            '/placeholder.svg'
                                                                        }
                                                                        alt={update.title}
                                                                        className="h-64 w-full object-cover"
                                                                    />
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f0c]/20 to-transparent" />
                                                                    <motion.button
                                                                        className="group absolute inset-0 flex items-center justify-center"
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                    >
                                                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-colors group-hover:bg-white">
                                                                            <Play className="ml-1 h-6 w-6 text-[#003720]" />
                                                                        </div>
                                                                    </motion.button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                        </div>
                                    )}

                                    {/* Regular Updates Grid */}
                                    <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3 xl:columns-4">
                                        {monthUpdates
                                            .filter((update) => !update.featured)
                                            .map((update, index) => (
                                                <motion.div
                                                    key={update.id}
                                                    className="mb-6 break-inside-avoid"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 0.6,
                                                        delay: index * 0.1,
                                                    }}
                                                    whileHover={{ y: -4 }}
                                                >
                                                    <div
                                                        className={`group relative cursor-pointer ${
                                                            index % 3 === 0
                                                                ? 'bg-gradient-to-br from-[#94f27f]/5 to-[#003720]/5'
                                                                : index % 3 === 1
                                                                  ? 'border border-[#94f27f]/20 bg-white'
                                                                  : 'bg-[#003720]/5'
                                                        } rounded-2xl p-6 shadow-lg transition-all duration-500 hover:shadow-2xl`}
                                                    >
                                                        {/* Category Badge */}
                                                        <div className="mb-4 flex items-start justify-between">
                                                            <Badge
                                                                className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs ${getCategoryColor(update.type)} `}
                                                            >
                                                                {getCategoryIcon(update.type)}
                                                                {update.category}
                                                            </Badge>
                                                            <Badge
                                                                variant="outline"
                                                                className="border-[#6a6c6a]/20 text-xs text-[#6a6c6a]"
                                                            >
                                                                {update.version}
                                                            </Badge>
                                                        </div>

                                                        {/* Update Image */}
                                                        <div className="relative mb-4 h-32 overflow-hidden rounded-lg">
                                                            <img
                                                                src={
                                                                    update.image ||
                                                                    '/placeholder.svg'
                                                                }
                                                                alt={update.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f0c]/20 to-transparent" />
                                                        </div>

                                                        {/* Update Info */}
                                                        <div className="space-y-3">
                                                            <h3 className="line-clamp-2 text-sm leading-tight font-semibold text-[#0e0f0c]">
                                                                {update.title}
                                                            </h3>

                                                            <p className="line-clamp-3 text-xs leading-relaxed text-[#454745]">
                                                                {update.description}
                                                            </p>

                                                            {/* Tags */}
                                                            <div className="flex flex-wrap gap-1">
                                                                {update.tags
                                                                    .slice(0, 2)
                                                                    .map((tag) => (
                                                                        <span
                                                                            key={tag}
                                                                            className="rounded-full bg-[#94f27f]/10 px-2 py-1 text-xs text-[#003720]"
                                                                        >
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                {update.tags.length > 2 && (
                                                                    <span className="rounded-full bg-[#6a6c6a]/10 px-2 py-1 text-xs text-[#6a6c6a]">
                                                                        +{update.tags.length - 2}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Date and Impact */}
                                                            <div className="flex items-center justify-between border-t border-[#94f27f]/10 pt-2 text-xs text-[#6a6c6a]">
                                                                <div className="flex items-center gap-1">
                                                                    <Calendar className="h-3 w-3" />
                                                                    <span>
                                                                        {new Date(
                                                                            update.date,
                                                                        ).toLocaleDateString(
                                                                            'en-US',
                                                                            {
                                                                                month: 'short',
                                                                                day: 'numeric',
                                                                            },
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <div
                                                                        className={`h-2 w-2 rounded-full ${
                                                                            update.impact === 'High'
                                                                                ? 'bg-[#94f27f]'
                                                                                : 'bg-[#6a6c6a]'
                                                                        }`}
                                                                    />
                                                                    <span>{update.impact}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Hover Action */}
                                                        <motion.div
                                                            className="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                            initial={{ y: 10 }}
                                                            whileHover={{ y: 0 }}
                                                        >
                                                            <div className="flex items-center justify-between border-t border-[#94f27f]/20 pt-3">
                                                                <span className="text-xs text-[#6a6c6a]">
                                                                    Learn more
                                                                </span>
                                                                <ChevronRight className="h-4 w-4 text-[#003720] transition-transform group-hover:translate-x-1" />
                                                            </div>
                                                        </motion.div>

                                                        {/* Decorative Corner */}
                                                        <div className="absolute bottom-0 left-0 h-8 w-8 rounded-br-2xl bg-gradient-to-tr from-[#94f27f]/10 to-transparent" />
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </div>
                                </motion.div>
                            ))}
                    </AnimatePresence>

                    {/* No Results */}
                    {Object.keys(updatesByMonth).length === 0 && (
                        <motion.div
                            className="py-16 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#94f27f]/20">
                                <Search className="h-8 w-8 text-[#003720]" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-[#0e0f0c]">
                                No updates found
                            </h3>
                            <p className="mb-6 text-[#6a6c6a]">
                                Try adjusting your search or filter criteria
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setActiveFilter('all');
                                    setSearchQuery('');
                                }}
                                className="border-[#003720] bg-transparent text-[#003720] hover:bg-[#003720]/5"
                            >
                                Clear Filters
                            </Button>
                        </motion.div>
                    )}
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                className="bg-gradient-to-br from-[#94f27f]/5 to-[#003720]/5 px-4 py-20 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="mb-6 font-['Mona_Sans'] text-4xl font-bold text-[#0e0f0c] md:text-5xl">
                            Stay Updated
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-xl text-[#6a6c6a]">
                            Never miss an update. Subscribe to our newsletter and be the first to
                            know about new features and improvements.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="bg-[#003720] px-8 py-6 text-lg text-white hover:bg-[#003720]/90"
                            >
                                Subscribe to Updates
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-[#003720] bg-transparent px-8 py-6 text-lg text-[#003720] hover:bg-[#003720]/5"
                            >
                                View Changelog
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}
