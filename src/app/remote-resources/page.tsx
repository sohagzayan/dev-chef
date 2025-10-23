'use client';

import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    BookOpen,
    CheckCircle,
    Clock,
    Globe,
    Lightbulb,
    Star,
    Target,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RemoteResourcesPage() {
    const resourceCategories = [
        {
            name: 'Getting Started',
            count: '25+',
            color: 'bg-blue-100 text-blue-800',
            icon: <Lightbulb className="h-5 w-5" />,
        },
        {
            name: 'Productivity Tools',
            count: '50+',
            color: 'bg-green-100 text-green-800',
            icon: <Zap className="h-5 w-5" />,
        },
        {
            name: 'Communication',
            count: '30+',
            color: 'bg-purple-100 text-purple-800',
            icon: <Users className="h-5 w-5" />,
        },
        {
            name: 'Career Growth',
            count: '40+',
            color: 'bg-orange-100 text-orange-800',
            icon: <TrendingUp className="h-5 w-5" />,
        },
        {
            name: 'Work-Life Balance',
            count: '20+',
            color: 'bg-pink-100 text-pink-800',
            icon: <Target className="h-5 w-5" />,
        },
        {
            name: 'Success Stories',
            count: '15+',
            color: 'bg-indigo-100 text-indigo-800',
            icon: <Award className="h-5 w-5" />,
        },
    ];

    const featuredResources = [
        {
            title: 'Complete Remote Work Setup Guide',
            description:
                'Everything you need to know about setting up your home office for maximum productivity.',
            type: 'Guide',
            readTime: '15 min read',
            rating: 4.9,
            featured: true,
        },
        {
            title: 'Top 10 Remote Communication Tools',
            description: 'Discover the best tools for staying connected with your remote team.',
            type: 'Tool List',
            readTime: '8 min read',
            rating: 4.8,
            featured: false,
        },
        {
            title: 'How to Stay Productive While Working Remotely',
            description:
                'Proven strategies and techniques to maintain high productivity in a remote environment.',
            type: 'Article',
            readTime: '12 min read',
            rating: 4.7,
            featured: true,
        },
        {
            title: 'Remote Team Building Activities',
            description:
                'Fun and engaging activities to build strong relationships with your remote colleagues.',
            type: 'Guide',
            readTime: '10 min read',
            rating: 4.6,
            featured: false,
        },
        {
            title: 'Time Management for Remote Workers',
            description:
                'Master your schedule and maximize your efficiency with these time management tips.',
            type: 'Article',
            readTime: '7 min read',
            rating: 4.8,
            featured: false,
        },
        {
            title: 'Remote Work Success Stories',
            description:
                'Inspiring stories from professionals who have built successful remote careers.',
            type: 'Case Study',
            readTime: '20 min read',
            rating: 4.9,
            featured: true,
        },
    ];

    const tools = [
        {
            name: 'Slack',
            category: 'Communication',
            description: 'Team communication and collaboration platform',
            rating: 4.8,
            free: true,
        },
        {
            name: 'Zoom',
            category: 'Video Conferencing',
            description: 'Video meetings and webinars',
            rating: 4.6,
            free: true,
        },
        {
            name: 'Notion',
            category: 'Productivity',
            description: 'All-in-one workspace for notes and projects',
            rating: 4.7,
            free: true,
        },
        {
            name: 'Trello',
            category: 'Project Management',
            description: 'Visual project management tool',
            rating: 4.5,
            free: true,
        },
        {
            name: 'Calendly',
            category: 'Scheduling',
            description: 'Easy scheduling and calendar management',
            rating: 4.6,
            free: true,
        },
        {
            name: 'Loom',
            category: 'Screen Recording',
            description: 'Record and share video messages',
            rating: 4.8,
            free: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-6xl"
                >
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mb-6 text-5xl font-bold text-gray-900"
                        >
                            Remote Resources
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mx-auto mb-8 max-w-3xl text-xl text-gray-600"
                        >
                            Everything you need to succeed in remote work. From guides and tools to
                            success stories and best practices.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex justify-center"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 text-lg hover:from-purple-700 hover:to-indigo-700"
                            >
                                <BookOpen className="mr-2 h-5 w-5" />
                                Explore Resources
                            </Button>
                        </motion.div>
                    </div>

                    {/* Resource Categories */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-16"
                    >
                        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                            Resource Categories
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {resourceCategories.map((category, index) => (
                                <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Card className="cursor-pointer border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                                                        {category.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">
                                                            {category.name}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <Badge className={category.color}>
                                                    {category.count}
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Featured Resources */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mb-16"
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-gray-900">Featured Resources</h2>
                            <Button variant="outline" className="flex items-center gap-2">
                                View All Resources
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {featuredResources.map((resource, index) => (
                                <motion.div
                                    key={resource.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Card
                                        className={`h-full border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${resource.featured ? 'ring-2 ring-purple-400' : ''}`}
                                    >
                                        <CardContent className="p-6">
                                            {resource.featured && (
                                                <div className="mb-4 flex items-center gap-2">
                                                    <Star className="h-4 w-4 fill-current text-purple-500" />
                                                    <Badge className="bg-purple-100 text-purple-800">
                                                        Featured
                                                    </Badge>
                                                </div>
                                            )}
                                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                                {resource.title}
                                            </h3>
                                            <p className="mb-4 text-gray-600">
                                                {resource.description}
                                            </p>
                                            <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                                                <Badge variant="outline">{resource.type}</Badge>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {resource.readTime}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                                                    {resource.rating}
                                                </div>
                                            </div>
                                            <Button className="w-full">Read More</Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tools Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                            Essential Remote Work Tools
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {tools.map((tool, index) => (
                                <motion.div
                                    key={tool.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Card className="h-full border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                                        {tool.name}
                                                    </h3>
                                                    <p className="mb-2 text-sm text-gray-600">
                                                        {tool.category}
                                                    </p>
                                                    <p className="mb-4 text-gray-600">
                                                        {tool.description}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                                                        <span className="text-sm text-gray-600">
                                                            {tool.rating}
                                                        </span>
                                                        {tool.free && (
                                                            <Badge className="bg-green-100 text-green-800">
                                                                Free
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="text-center"
                    >
                        <Card className="border-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                            <CardContent className="p-12">
                                <h2 className="mb-4 text-3xl font-bold">
                                    Ready to Master Remote Work?
                                </h2>
                                <p className="mb-8 text-xl opacity-90">
                                    Access our complete library of remote work resources and tools.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="bg-white text-purple-600 hover:bg-gray-100"
                                    >
                                        <CheckCircle className="mr-2 h-5 w-5" />
                                        Get Free Access
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white text-white hover:bg-white hover:text-purple-600"
                                    >
                                        Browse All Resources
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
