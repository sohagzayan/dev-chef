'use client';

import { motion } from 'framer-motion';
import { Briefcase, Clock, DollarSign, Globe, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function PostRemoteJobPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-4xl"
                >
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mb-4 text-4xl font-bold text-gray-900"
                        >
                            Post a Remote Job
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mx-auto max-w-2xl text-xl text-gray-600"
                        >
                            Reach top talent worldwide with our remote job posting platform. Connect
                            with skilled professionals who thrive in remote environments.
                        </motion.p>
                    </div>

                    {/* Main Form */}
                    <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
                        <CardHeader className="pb-6">
                            <CardTitle className="text-2xl font-semibold text-gray-900">
                                Job Details
                            </CardTitle>
                            <CardDescription>
                                Fill in the details to create an attractive job posting
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Job Title */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="job-title"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Job Title *
                                </Label>
                                <Input
                                    id="job-title"
                                    placeholder="e.g., Senior Frontend Developer"
                                    className="h-12 text-lg"
                                />
                            </div>

                            {/* Company & Location */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="company"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Company Name *
                                    </Label>
                                    <Input
                                        id="company"
                                        placeholder="e.g., TechCorp Inc."
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="location"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Company Location
                                    </Label>
                                    <div className="relative">
                                        <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        <Input
                                            id="location"
                                            placeholder="e.g., San Francisco, CA"
                                            className="h-12 pl-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Job Type & Experience */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">
                                        Job Type *
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
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">
                                        Experience Level *
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="entry">
                                                Entry Level (0-2 years)
                                            </SelectItem>
                                            <SelectItem value="mid">
                                                Mid Level (3-5 years)
                                            </SelectItem>
                                            <SelectItem value="senior">
                                                Senior Level (6+ years)
                                            </SelectItem>
                                            <SelectItem value="lead">
                                                Lead/Principal (8+ years)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Salary Range */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">
                                    Salary Range (USD)
                                </Label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="relative">
                                        <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        <Input placeholder="Min salary" className="h-12 pl-10" />
                                    </div>
                                    <div className="relative">
                                        <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        <Input placeholder="Max salary" className="h-12 pl-10" />
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="description"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Job Description *
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the role, responsibilities, and requirements..."
                                    className="min-h-32 text-base"
                                />
                            </div>

                            {/* Requirements */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="requirements"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Requirements *
                                </Label>
                                <Textarea
                                    id="requirements"
                                    placeholder="List the required skills, qualifications, and experience..."
                                    className="min-h-24 text-base"
                                />
                            </div>

                            {/* Benefits */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="benefits"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Benefits & Perks
                                </Label>
                                <Textarea
                                    id="benefits"
                                    placeholder="List the benefits and perks you offer..."
                                    className="min-h-24 text-base"
                                />
                            </div>

                            {/* Remote Work Options */}
                            <div className="space-y-4">
                                <Label className="text-sm font-medium text-gray-700">
                                    Remote Work Options
                                </Label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="fully-remote" />
                                        <Label htmlFor="fully-remote" className="text-sm">
                                            Fully Remote
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="hybrid" />
                                        <Label htmlFor="hybrid" className="text-sm">
                                            Hybrid
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="flexible" />
                                        <Label htmlFor="flexible" className="text-sm">
                                            Flexible Hours
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="pt-6"
                            >
                                <Button
                                    size="lg"
                                    className="h-14 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-semibold hover:from-blue-700 hover:to-indigo-700"
                                >
                                    <Briefcase className="mr-2 h-5 w-5" />
                                    Post Remote Job
                                </Button>
                            </motion.div>
                        </CardContent>
                    </Card>

                    {/* Features Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
                    >
                        <Card className="border-0 bg-white/60 p-6 text-center backdrop-blur-sm">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                <Globe className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                Global Reach
                            </h3>
                            <p className="text-gray-600">
                                Access talent from around the world with our remote-first platform
                            </p>
                        </Card>

                        <Card className="border-0 bg-white/60 p-6 text-center backdrop-blur-sm">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                Quality Candidates
                            </h3>
                            <p className="text-gray-600">
                                Connect with pre-vetted professionals who excel in remote work
                            </p>
                        </Card>

                        <Card className="border-0 bg-white/60 p-6 text-center backdrop-blur-sm">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                <Clock className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                Fast Hiring
                            </h3>
                            <p className="text-gray-600">
                                Streamlined process to find and hire the right candidate quickly
                            </p>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
