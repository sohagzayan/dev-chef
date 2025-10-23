'use client';

import { motion } from 'framer-motion';
import {
    ArrowRight,
    Briefcase,
    Building2,
    CheckCircle,
    Clock,
    DollarSign,
    Filter,
    Globe,
    MapPin,
    Search,
    Star,
    Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function FindARemoteJobPage() {
    const searchTips = [
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
    ];

    const jobBoards = [
        {
            name: 'Remote.co',
            description: 'Curated remote jobs from top companies',
            jobs: '5,000+',
            color: 'bg-blue-100 text-blue-800',
        },
        {
            name: 'We Work Remotely',
            description: 'The largest remote work community',
            jobs: '10,000+',
            color: 'bg-green-100 text-green-800',
        },
        {
            name: 'FlexJobs',
            description: 'Hand-screened flexible and remote jobs',
            jobs: '15,000+',
            color: 'bg-purple-100 text-purple-800',
        },
        {
            name: 'AngelList',
            description: 'Startup jobs including remote positions',
            jobs: '8,000+',
            color: 'bg-orange-100 text-orange-800',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
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
                            Find a Remote Job
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
                    </div>

                    {/* Search Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-16"
                    >
                        <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
                            <CardHeader className="pb-6">
                                <CardTitle className="text-2xl font-semibold text-gray-900">
                                    Search Remote Jobs
                                </CardTitle>
                                <CardDescription>
                                    Find your perfect remote job with our advanced search tools
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="job-title"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Job Title or Keywords
                                        </Label>
                                        <div className="relative">
                                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                            <Input
                                                id="job-title"
                                                placeholder="e.g., Frontend Developer"
                                                className="h-12 pl-10 text-base"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700">
                                            Job Type
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Select job type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="full-time">Full-time</SelectItem>
                                                <SelectItem value="part-time">Part-time</SelectItem>
                                                <SelectItem value="contract">Contract</SelectItem>
                                                <SelectItem value="freelance">Freelance</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700">
                                            Experience Level
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="entry">Entry Level</SelectItem>
                                                <SelectItem value="mid">Mid Level</SelectItem>
                                                <SelectItem value="senior">Senior Level</SelectItem>
                                                <SelectItem value="lead">Lead/Principal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700">
                                            Salary Range
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Select range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0-50k">$0 - $50k</SelectItem>
                                                <SelectItem value="50k-80k">$50k - $80k</SelectItem>
                                                <SelectItem value="80k-120k">
                                                    $80k - $120k
                                                </SelectItem>
                                                <SelectItem value="120k+">$120k+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700">
                                            Timezone
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Select timezone" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="est">Eastern Time</SelectItem>
                                                <SelectItem value="pst">Pacific Time</SelectItem>
                                                <SelectItem value="cst">Central Time</SelectItem>
                                                <SelectItem value="mst">Mountain Time</SelectItem>
                                                <SelectItem value="gmt">GMT</SelectItem>
                                                <SelectItem value="any">Any Timezone</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        size="lg"
                                        className="h-12 w-full bg-gradient-to-r from-green-600 to-blue-600 text-base font-semibold hover:from-green-700 hover:to-blue-700"
                                    >
                                        <Search className="mr-2 h-5 w-5" />
                                        Search Jobs
                                    </Button>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Search Tips */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-16"
                    >
                        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
                            Pro Tips for Finding Remote Jobs
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {searchTips.map((tip, index) => (
                                <motion.div
                                    key={tip.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Card className="h-full border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                                        <CardContent className="p-6">
                                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white">
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

                    {/* Job Boards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mb-16"
                    >
                        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                            Top Remote Job Boards
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {jobBoards.map((board, index) => (
                                <motion.div
                                    key={board.name}
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
                                                        {board.name}
                                                    </h3>
                                                    <p className="mb-4 text-gray-600">
                                                        {board.description}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <Briefcase className="h-4 w-4 text-gray-500" />
                                                        <span className="text-sm text-gray-600">
                                                            {board.jobs} jobs available
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Visit
                                                </Button>
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
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-center"
                    >
                        <Card className="border-0 bg-gradient-to-r from-green-600 to-blue-600 text-white">
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
                                        className="bg-white text-green-600 hover:bg-gray-100"
                                    >
                                        <CheckCircle className="mr-2 h-5 w-5" />
                                        Create Free Account
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white text-white hover:bg-white hover:text-green-600"
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
