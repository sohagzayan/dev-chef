'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Bookmark,
    BriefcaseIcon,
    Building2,
    CheckCircle,
    Clock,
    DollarSign,
    Home,
    MapPin,
    Shield,
    Trash2,
    User,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Mock saved jobs data
const mockSavedJobs = [
    {
        id: 1,
        title: 'Senior Full Stack Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$120k - $180k',
        savedDate: '2024-01-15',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        description: 'We are looking for a Senior Full Stack Developer to join our growing team...',
        remote: true,
        urgent: true,
        applied: false,
    },
    {
        id: 2,
        title: 'Frontend Developer',
        company: 'StartupXYZ',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$80k - $120k',
        savedDate: '2024-01-10',
        skills: ['React', 'JavaScript', 'CSS3', 'HTML5'],
        description: 'Join our innovative startup and help build amazing user experiences...',
        remote: false,
        urgent: false,
        applied: true,
    },
    {
        id: 3,
        title: 'Backend Engineer',
        company: 'DataFlow Systems',
        location: 'Remote',
        type: 'Full-time',
        salary: '$100k - $150k',
        savedDate: '2024-01-08',
        skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
        description: 'Build scalable backend systems and APIs for our data platform...',
        remote: true,
        urgent: false,
        applied: false,
    },
    {
        id: 4,
        title: 'DevOps Engineer',
        company: 'CloudTech Solutions',
        location: 'Austin, TX',
        type: 'Full-time',
        salary: '$110k - $160k',
        savedDate: '2024-01-05',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
        description: 'Manage our cloud infrastructure and deployment pipelines...',
        remote: true,
        urgent: false,
        applied: false,
    },
];

export default function SavedJobsPage() {
    const [savedJobs, setSavedJobs] = useState(mockSavedJobs);
    const [filter, setFilter] = useState('all'); // all, applied, not-applied
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const filteredJobs = savedJobs.filter((job) => {
        if (filter === 'applied') return job.applied;
        if (filter === 'not-applied') return !job.applied;
        return true;
    });

    const removeJob = (jobId: number) => {
        setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
    };

    const toggleApplied = (jobId: number) => {
        setSavedJobs((prev) =>
            prev.map((job) => (job.id === jobId ? { ...job, applied: !job.applied } : job)),
        );
    };

    const getFilteredCount = (filterType: string) => {
        return savedJobs.filter((job) => {
            if (filterType === 'applied') return job.applied;
            if (filterType === 'not-applied') return !job.applied;
            return true;
        }).length;
    };

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-white">
                {/* Left Sidebar Skeleton */}
                <div className="w-64 bg-blue-600 p-6">
                    <div className="mb-8 flex items-center justify-center">
                        <Skeleton className="h-12 w-12 rounded-full" />
                    </div>
                    <nav className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2">
                                <Skeleton className="h-5 w-5 rounded" />
                                <Skeleton className="h-4 w-20 rounded" />
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Main Content Skeleton */}
                <div className="flex-1">
                    <div className="border-b border-gray-100 bg-white px-8 py-6">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-32 rounded" />
                            <Skeleton className="h-4 w-48 rounded" />
                        </div>
                    </div>
                    <div className="border-b border-gray-100 bg-gray-50 px-8 py-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-24 w-full rounded-lg" />
                            ))}
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-32 w-full rounded-lg" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Sidebar Navigation */}
            <div className="w-64 bg-blue-600 p-6">
                <div className="mb-8 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                        <Bookmark className="h-6 w-6 text-blue-600" />
                    </div>
                </div>

                <nav className="space-y-2">
                    <Link
                        href="/candidate/dashboard"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
                    >
                        <Home className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/candidate/profile"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
                    >
                        <User className="h-5 w-5" />
                        Profile
                    </Link>
                    <Link
                        href="/candidate/job-feed"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
                    >
                        <BriefcaseIcon className="h-5 w-5" />
                        Job feed
                    </Link>
                    <Link
                        href="/candidate/saved-jobs"
                        className="flex items-center gap-3 rounded-lg bg-blue-700 px-3 py-2 text-white"
                    >
                        <Bookmark className="h-5 w-5" />
                        Save Jobs
                    </Link>
                    <Link
                        href="/candidate/settings"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
                    >
                        <Shield className="h-5 w-5" />
                        Setting
                    </Link>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
                {/* Top Header */}
                <div className="border-b border-gray-100 bg-white px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
                            <p className="mt-1 text-gray-600">
                                Manage your saved job opportunities
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" onClick={() => window.history.back()}>
                                Back to Job Feed
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats and Filters */}
                <div className="border-b border-gray-100 bg-gray-50 px-8 py-6">
                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="rounded-lg border border-gray-200 bg-white p-4">
                            <div className="flex items-center gap-3">
                                <Bookmark className="h-8 w-8 text-blue-600" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {savedJobs.length}
                                    </p>
                                    <p className="text-sm text-gray-600">Total Saved</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {savedJobs.filter((job) => job.applied).length}
                                    </p>
                                    <p className="text-sm text-gray-600">Applied</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4">
                            <div className="flex items-center gap-3">
                                <Clock className="h-8 w-8 text-yellow-600" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {savedJobs.filter((job) => !job.applied).length}
                                    </p>
                                    <p className="text-sm text-gray-600">Pending</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-8 w-8 text-purple-600" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {new Set(savedJobs.map((job) => job.location)).size}
                                    </p>
                                    <p className="text-sm text-gray-600">Locations</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2">
                        <Button
                            variant={filter === 'all' ? 'default' : 'outline'}
                            onClick={() => setFilter('all')}
                            className="flex items-center gap-2"
                        >
                            All Jobs ({getFilteredCount('all')})
                        </Button>
                        <Button
                            variant={filter === 'applied' ? 'default' : 'outline'}
                            onClick={() => setFilter('applied')}
                            className="flex items-center gap-2"
                        >
                            Applied ({getFilteredCount('applied')})
                        </Button>
                        <Button
                            variant={filter === 'not-applied' ? 'default' : 'outline'}
                            onClick={() => setFilter('not-applied')}
                            className="flex items-center gap-2"
                        >
                            Not Applied ({getFilteredCount('not-applied')})
                        </Button>
                    </div>
                </div>

                {/* Saved Jobs List */}
                <div className="px-8 py-6">
                    {filteredJobs.length === 0 ? (
                        <div className="py-12 text-center">
                            <Bookmark className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                {filter === 'all' ? 'No saved jobs yet' : `No ${filter} jobs`}
                            </h3>
                            <p className="mb-4 text-gray-600">
                                {filter === 'all'
                                    ? 'Start saving jobs from the job feed to see them here.'
                                    : `You don't have any ${filter} jobs at the moment.`}
                            </p>
                            {filter === 'all' && (
                                <Button onClick={() => (window.location.href = '/job-feed')}>
                                    Browse Jobs
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredJobs.map((job) => (
                                <Card key={job.id} className="transition-shadow hover:shadow-md">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <CardTitle className="text-lg">
                                                        {job.title}
                                                    </CardTitle>
                                                    {job.urgent && (
                                                        <Badge
                                                            variant="destructive"
                                                            className="text-xs"
                                                        >
                                                            Urgent
                                                        </Badge>
                                                    )}
                                                    {job.remote && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            Remote
                                                        </Badge>
                                                    )}
                                                    {job.applied && (
                                                        <Badge
                                                            variant="default"
                                                            className="bg-green-600 text-xs"
                                                        >
                                                            Applied
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Building2 className="h-4 w-4" />
                                                        {job.company}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        {job.location}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {job.type}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign className="h-4 w-4" />
                                                        {job.salary}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant={job.applied ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => toggleApplied(job.id)}
                                                    className={
                                                        job.applied
                                                            ? 'bg-green-600 hover:bg-green-700'
                                                            : ''
                                                    }
                                                >
                                                    {job.applied ? 'Applied' : 'Mark Applied'}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeJob(job.id)}
                                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-3 text-gray-600">{job.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-2">
                                                {job.skills.map((skill) => (
                                                    <Badge
                                                        key={skill}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                Saved {new Date(job.savedDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
