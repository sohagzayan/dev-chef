'use client';

import { motion } from 'framer-motion';
import {
    ArrowRight,
    Briefcase,
    CheckCircle,
    Clock,
    DollarSign,
    Filter,
    Globe,
    MapPin,
    Search,
    Star,
    TrendingUp,
    Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HowToFindRemoteJobsPage() {
    const jobCategories = [
        { name: 'Software Development', count: '2,500+', color: 'bg-blue-100 text-blue-800' },
        { name: 'Design & UX', count: '1,200+', color: 'bg-purple-100 text-purple-800' },
        { name: 'Marketing', count: '800+', color: 'bg-green-100 text-green-800' },
        { name: 'Data Science', count: '600+', color: 'bg-orange-100 text-orange-800' },
        { name: 'Product Management', count: '400+', color: 'bg-pink-100 text-pink-800' },
        { name: 'Customer Support', count: '300+', color: 'bg-indigo-100 text-indigo-800' },
    ];

    const tips = [
        {
            icon: <Search className="h-6 w-6" />,
            title: 'Use Specific Keywords',
            description:
                'Search for "remote", "work from home", or "distributed team" to find relevant opportunities.',
        },
        {
            icon: <Filter className="h-6 w-6" />,
            title: 'Filter by Location',
            description:
                'Use location filters to find jobs that allow remote work from your timezone.',
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: 'Check Company Culture',
            description:
                'Research companies that have a strong remote-first culture and distributed teams.',
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: 'Consider Time Zones',
            description: 'Look for jobs that align with your preferred working hours and timezone.',
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: 'Network Online',
            description:
                'Join remote work communities and professional networks to discover opportunities.',
        },
        {
            icon: <TrendingUp className="h-6 w-6" />,
            title: 'Stay Updated',
            description:
                'Set up job alerts and follow companies that frequently hire remote workers.',
        },
    ];

    const featuredJobs = [
        {
            title: 'Senior Frontend Developer',
            company: 'TechCorp',
            location: 'Remote',
            salary: '$80k - $120k',
            type: 'Full-time',
            posted: '2 days ago',
            featured: true,
        },
        {
            title: 'UX Designer',
            company: 'DesignStudio',
            location: 'Remote',
            salary: '$70k - $100k',
            type: 'Full-time',
            posted: '3 days ago',
            featured: false,
        },
        {
            title: 'Product Manager',
            company: 'StartupXYZ',
            location: 'Remote',
            salary: '$90k - $130k',
            type: 'Full-time',
            posted: '1 week ago',
            featured: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
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
                            How to Find Remote Jobs
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mx-auto mb-8 max-w-3xl text-xl text-gray-600"
                        >
                            Discover the best strategies and resources to land your dream remote
                            job. From job boards to networking tips, we've got you covered.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex justify-center"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 text-lg hover:from-indigo-700 hover:to-purple-700"
                            >
                                <Search className="mr-2 h-5 w-5" />
                                Start Job Search
                            </Button>
                        </motion.div>
                    </div>

                    {/* Job Categories */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-16"
                    >
                        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                            Popular Remote Job Categories
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {jobCategories.map((category, index) => (
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
                                                <h3 className="font-semibold text-gray-900">
                                                    {category.name}
                                                </h3>
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

                    {/* Tips Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mb-16"
                    >
                        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
                            Pro Tips for Finding Remote Jobs
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {tips.map((tip, index) => (
                                <motion.div
                                    key={tip.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Card className="h-full border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                                        <CardContent className="p-6">
                                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                                                {tip.icon}
                                            </div>
                                            <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                                {tip.title}
                                            </h3>
                                            <p className="text-gray-600">{tip.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Featured Jobs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mb-16"
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Featured Remote Jobs
                            </h2>
                            <Button variant="outline" className="flex items-center gap-2">
                                View All Jobs
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {featuredJobs.map((job, index) => (
                                <motion.div
                                    key={job.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Card
                                        className={`h-full border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${job.featured ? 'ring-2 ring-yellow-400' : ''}`}
                                    >
                                        <CardContent className="p-6">
                                            {job.featured && (
                                                <div className="mb-4 flex items-center gap-2">
                                                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                                                    <Badge className="bg-yellow-100 text-yellow-800">
                                                        Featured
                                                    </Badge>
                                                </div>
                                            )}
                                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                                {job.title}
                                            </h3>
                                            <p className="mb-4 text-gray-600">{job.company}</p>
                                            <div className="mb-4 space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <MapPin className="h-4 w-4" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <DollarSign className="h-4 w-4" />
                                                    {job.salary}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Briefcase className="h-4 w-4" />
                                                    {job.type}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Clock className="h-4 w-4" />
                                                    {job.posted}
                                                </div>
                                            </div>
                                            <Button className="w-full">Apply Now</Button>
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
                        <Card className="border-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <CardContent className="p-12">
                                <h2 className="mb-4 text-3xl font-bold">
                                    Ready to Start Your Remote Job Search?
                                </h2>
                                <p className="mb-8 text-xl opacity-90">
                                    Join thousands of professionals who found their dream remote
                                    jobs with us.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="bg-white text-indigo-600 hover:bg-gray-100"
                                    >
                                        <CheckCircle className="mr-2 h-5 w-5" />
                                        Create Free Account
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white text-white hover:bg-white hover:text-indigo-600"
                                    >
                                        Browse Jobs
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
