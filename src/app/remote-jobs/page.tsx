'use client';

import { motion } from 'framer-motion';
import {
    ArrowRight,
    Briefcase,
    Building2,
    Clock,
    DollarSign,
    Filter,
    Globe,
    MapPin,
    Search,
    Star,
    Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RemoteJobsPage() {
    const jobCategories = [
        { name: 'Software Development', count: '2,500+', color: 'bg-blue-100 text-blue-800' },
        { name: 'Design & UX', count: '1,200+', color: 'bg-purple-100 text-purple-800' },
        { name: 'Marketing', count: '800+', color: 'bg-green-100 text-green-800' },
        { name: 'Data Science', count: '600+', color: 'bg-orange-100 text-orange-800' },
        { name: 'Product Management', count: '400+', color: 'bg-pink-100 text-pink-800' },
        { name: 'Customer Support', count: '300+', color: 'bg-indigo-100 text-indigo-800' },
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
            description:
                'Join our team to build amazing user experiences with React and TypeScript.',
        },
        {
            title: 'UX Designer',
            company: 'DesignStudio',
            location: 'Remote',
            salary: '$70k - $100k',
            type: 'Full-time',
            posted: '3 days ago',
            featured: false,
            description: 'Create beautiful and intuitive designs for our growing product suite.',
        },
        {
            title: 'Product Manager',
            company: 'StartupXYZ',
            location: 'Remote',
            salary: '$90k - $130k',
            type: 'Full-time',
            posted: '1 week ago',
            featured: true,
            description:
                'Lead product strategy and work with cross-functional teams to deliver great products.',
        },
        {
            title: 'DevOps Engineer',
            company: 'CloudTech',
            location: 'Remote',
            salary: '$85k - $115k',
            type: 'Full-time',
            posted: '4 days ago',
            featured: false,
            description: 'Manage our cloud infrastructure and help scale our platform.',
        },
        {
            title: 'Data Scientist',
            company: 'AnalyticsPro',
            location: 'Remote',
            salary: '$75k - $110k',
            type: 'Full-time',
            posted: '5 days ago',
            featured: false,
            description: 'Analyze data to drive business insights and improve our products.',
        },
        {
            title: 'Marketing Manager',
            company: 'GrowthCo',
            location: 'Remote',
            salary: '$65k - $95k',
            type: 'Full-time',
            posted: '6 days ago',
            featured: false,
            description: 'Drive growth through innovative marketing strategies and campaigns.',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
                            Remote Jobs
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mx-auto mb-8 max-w-3xl text-xl text-gray-600"
                        >
                            Discover thousands of remote job opportunities from companies worldwide.
                            Find your perfect remote role and work from anywhere.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex justify-center"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-lg hover:from-blue-700 hover:to-indigo-700"
                            >
                                <Search className="mr-2 h-5 w-5" />
                                Search Remote Jobs
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

                    {/* Featured Jobs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mb-16"
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-gray-900">Latest Remote Jobs</h2>
                            <Button variant="outline" className="flex items-center gap-2">
                                View All Jobs
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                                            <p className="mb-4 text-sm text-gray-700">
                                                {job.description}
                                            </p>
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
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-center"
                    >
                        <Card className="border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            <CardContent className="p-12">
                                <h2 className="mb-4 text-3xl font-bold">
                                    Ready to Start Your Remote Career?
                                </h2>
                                <p className="mb-8 text-xl opacity-90">
                                    Join thousands of professionals who found their dream remote
                                    jobs with us.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="bg-white text-blue-600 hover:bg-gray-100"
                                    >
                                        <Users className="mr-2 h-5 w-5" />
                                        Create Free Account
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white text-white hover:bg-white hover:text-blue-600"
                                    >
                                        Browse All Jobs
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
