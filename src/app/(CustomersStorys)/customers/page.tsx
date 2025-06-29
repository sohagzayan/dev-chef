'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Award, Play, Quote, Star, TrendingUp, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { customerStories } from '@/data/customers';

const containerVariants = {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cardHoverVariants: any = {
    hover: {
        y: -8,
        scale: 1.02,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
};

export default function CustomerStoriesPage() {
    const featuredStory = customerStories.find((story) => story.featured);
    const regularStories = customerStories.filter((story) => !story.featured);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <motion.section
                className="relative overflow-hidden px-4 py-20 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#94f27f]/5 to-[#003720]/5" />
                <div className="relative mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Badge className="mb-6 border-[#94f27f]/20 bg-[#94f27f]/10 text-[#003720]">
                            Customer Success Stories
                        </Badge>
                        <h1 className="mb-6 font-['Mona_Sans'] text-5xl font-bold text-[#0e0f0c] md:text-6xl">
                            Real Stories, <span className="text-[#003720]">Real Results</span>
                        </h1>
                        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-[#6a6c6a]">
                            Discover how businesses like yours have transformed their operations and
                            achieved remarkable growth with our solutions.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex justify-center gap-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div>
                            <div className="text-3xl font-bold text-[#003720]">500+</div>
                            <div className="text-[#6a6c6a]">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#003720]">98%</div>
                            <div className="text-[#6a6c6a]">Satisfaction Rate</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#003720]">250%</div>
                            <div className="text-[#6a6c6a]">Average ROI</div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Featured Story */}
            {featuredStory && (
                <motion.section
                    className="px-4 py-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            className="rounded-3xl bg-gradient-to-br from-[#94f27f]/5 to-[#003720]/5 p-8 shadow-lg md:p-12"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid items-center gap-12 md:grid-cols-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Badge className="mb-4 bg-[#94f27f] text-[#003720]">
                                        Featured Story
                                    </Badge>
                                    <Quote className="mb-6 h-12 w-12 text-[#003720]" />
                                    <blockquote className="mb-8 text-2xl leading-relaxed font-medium text-[#0e0f0c] md:text-3xl">
                                        {'"'}
                                        {featuredStory.story}
                                        {'"'}
                                    </blockquote>

                                    <div className="mb-8 flex items-center gap-4">
                                        <img
                                            src={featuredStory.image || '/placeholder.svg'}
                                            alt={featuredStory.name}
                                            className="h-16 w-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="text-lg font-semibold text-[#0e0f0c]">
                                                {featuredStory.name}
                                            </div>
                                            <div className="text-[#6a6c6a]">
                                                {featuredStory.role}, {featuredStory.company}
                                            </div>
                                            <div className="mt-1 flex items-center gap-1">
                                                {[...Array(featuredStory.rating)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="h-4 w-4 fill-[#94f27f] text-[#94f27f]"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#003720]">
                                                {featuredStory.metrics.growth}
                                            </div>
                                            <div className="text-sm text-[#6a6c6a]">Growth</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#003720]">
                                                {featuredStory.metrics.time}
                                            </div>
                                            <div className="text-sm text-[#6a6c6a]">Timeline</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#003720]">
                                                {featuredStory.metrics.team}
                                            </div>
                                            <div className="text-sm text-[#6a6c6a]">Team Size</div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="relative"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                        <img
                                            src={featuredStory.image || '/placeholder.svg'}
                                            alt={`${featuredStory.company} office`}
                                            className="h-96 w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f0c]/20 to-transparent" />
                                        <motion.button
                                            className="absolute inset-0 flex items-center justify-center"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg">
                                                <Play className="ml-1 h-8 w-8 text-[#003720]" />
                                            </div>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            )}

            {/* Customer Stories Grid - Unique Design */}
            <motion.section
                className="relative overflow-hidden px-4 py-20"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-[#94f27f]" />
                    <div className="absolute right-10 bottom-20 h-24 w-24 rounded-full bg-[#003720]" />
                    <div className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full bg-[#94f27f]" />
                </div>

                <div className="relative mx-auto max-w-7xl">
                    <motion.div className="mb-20 text-center" variants={itemVariants}>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#94f27f]/10 px-4 py-2">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-[#94f27f]" />
                            <span className="text-sm font-medium text-[#003720]">
                                Customer Voices
                            </span>
                        </div>
                        <h2 className="mb-6 font-['Mona_Sans'] text-4xl font-bold text-[#0e0f0c] md:text-5xl">
                            More Success Stories
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[#6a6c6a]">
                            Discover how businesses across industries have transformed their
                            operations
                        </p>
                    </motion.div>

                    {/* Unique Masonry-style Grid */}
                    <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3 xl:columns-4">
                        {regularStories.map((story, index) => (
                            <motion.div
                                key={story.id}
                                variants={itemVariants}
                                whileHover="hover"
                                className="mb-6 break-inside-avoid"
                            >
                                <motion.div
                                    variants={cardHoverVariants}
                                    className={`group relative cursor-pointer ${
                                        index % 3 === 0
                                            ? 'bg-gradient-to-br from-[#94f27f]/5 to-[#003720]/5'
                                            : index % 3 === 1
                                              ? 'border border-[#94f27f]/20 bg-white'
                                              : 'bg-[#003720]/5'
                                    } rounded-2xl p-6 shadow-lg transition-all duration-500 hover:shadow-2xl ${index % 4 === 0 ? 'lg:mt-8' : index % 4 === 2 ? 'lg:mt-4' : ''} `}
                                >
                                    {/* Decorative Element */}
                                    <div className="absolute top-4 right-4 opacity-20 transition-opacity group-hover:opacity-40">
                                        <Quote className="h-8 w-8 text-[#003720]" />
                                    </div>

                                    {/* Industry Badge */}
                                    <div className="mb-4 flex items-start justify-between">
                                        <Badge
                                            className={`rounded-full px-3 py-1 text-xs ${
                                                index % 3 === 0
                                                    ? 'bg-[#94f27f] text-[#003720]'
                                                    : index % 3 === 1
                                                      ? 'bg-[#003720] text-white'
                                                      : 'bg-[#94f27f]/20 text-[#003720]'
                                            } `}
                                        >
                                            {story.industry}
                                        </Badge>
                                        <div className="flex items-center gap-1">
                                            {[...Array(story.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-3 w-3 fill-[#94f27f] text-[#94f27f]"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="relative">
                                            <img
                                                src={story.image || '/placeholder.svg'}
                                                alt={story.name}
                                                className="h-12 w-12 rounded-full object-cover ring-2 ring-[#94f27f]/20"
                                            />
                                            <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-[#94f27f]" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate text-sm font-semibold text-[#0e0f0c]">
                                                {story.name}
                                            </div>
                                            <div className="truncate text-xs text-[#6a6c6a]">
                                                {story.role}
                                            </div>
                                            <div className="truncate text-xs font-medium text-[#003720]">
                                                {story.company}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Story Quote */}
                                    <blockquote className="mb-4 line-clamp-4 text-sm leading-relaxed text-[#454745]">
                                        {'"'}
                                        {story.story}
                                        {'"'}
                                    </blockquote>

                                    {/* Metrics - Compact Display */}
                                    <div className="mb-4 space-y-2">
                                        {Object.entries(story.metrics)
                                            .slice(0, 2)
                                            .map(([key, value], idx) => (
                                                <div
                                                    key={key}
                                                    className="flex items-center justify-between text-xs"
                                                >
                                                    <span className="flex items-center gap-1 text-[#6a6c6a] capitalize">
                                                        <div
                                                            className={`h-2 w-2 rounded-full ${idx === 0 ? 'bg-[#94f27f]' : 'bg-[#003720]'}`}
                                                        />
                                                        {key}
                                                    </span>
                                                    <span className="font-bold text-[#003720]">
                                                        {value}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Hover Action */}
                                    <motion.div
                                        className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        initial={{ y: 10 }}
                                        whileHover={{ y: 0 }}
                                    >
                                        <div className="flex items-center justify-between border-t border-[#94f27f]/20 pt-3">
                                            <span className="text-xs text-[#6a6c6a]">
                                                Read full story
                                            </span>
                                            <ArrowRight className="h-4 w-4 text-[#003720] transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </motion.div>

                                    {/* Decorative Corner */}
                                    <div className="absolute bottom-0 left-0 h-8 w-8 rounded-br-2xl bg-gradient-to-tr from-[#94f27f]/10 to-transparent" />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA for Stories */}
                    <motion.div
                        className="mt-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Button
                            variant="outline"
                            className="group rounded-full border-[#003720] bg-transparent px-8 py-3 text-[#003720] transition-all duration-300 hover:bg-[#003720] hover:text-white"
                        >
                            View All Customer Stories
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
                className="bg-gradient-to-br from-[#94f27f]/5 to-[#003720]/5 px-4 py-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="mx-auto max-w-6xl">
                    <motion.div
                        className="grid gap-8 text-center md:grid-cols-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#94f27f]/20">
                                <Users className="h-8 w-8 text-[#003720]" />
                            </div>
                            <div className="text-3xl font-bold text-[#003720]">500+</div>
                            <div className="text-[#6a6c6a]">Active Customers</div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#94f27f]/20">
                                <TrendingUp className="h-8 w-8 text-[#003720]" />
                            </div>
                            <div className="text-3xl font-bold text-[#003720]">250%</div>
                            <div className="text-[#6a6c6a]">Average ROI</div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#94f27f]/20">
                                <Award className="h-8 w-8 text-[#003720]" />
                            </div>
                            <div className="text-3xl font-bold text-[#003720]">98%</div>
                            <div className="text-[#6a6c6a]">Satisfaction Rate</div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#94f27f]/20">
                                <Star className="h-8 w-8 text-[#003720]" />
                            </div>
                            <div className="text-3xl font-bold text-[#003720]">4.9/5</div>
                            <div className="text-[#6a6c6a]">Average Rating</div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                className="px-4 py-20 text-center"
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
                            Ready to Write Your Success Story?
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-xl text-[#6a6c6a]">
                            Join thousands of businesses that have transformed their operations and
                            achieved remarkable growth.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="bg-[#003720] px-8 py-6 text-lg text-white hover:bg-[#003720]/90"
                            >
                                Start Your Journey
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-[#003720] bg-transparent px-8 py-6 text-lg text-[#003720] hover:bg-[#003720]/5"
                            >
                                View All Stories
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}
