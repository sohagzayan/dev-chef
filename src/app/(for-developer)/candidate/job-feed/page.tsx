'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Bookmark,
    BriefcaseIcon,
    Building2,
    Clock,
    DollarSign,
    Filter,
    Home,
    MapPin,
    Search,
    Shield,
    User,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

// Mock job data
const mockJobs = [
    {
        id: 1,
        title: 'Senior Full Stack Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$120k - $180k',
        posted: '2 days ago',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        description: 'We are looking for a Senior Full Stack Developer to join our growing team...',
        remote: true,
        urgent: true,
    },
    {
        id: 2,
        title: 'Frontend Developer',
        company: 'StartupXYZ',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$80k - $120k',
        posted: '1 week ago',
        skills: ['React', 'JavaScript', 'CSS3', 'HTML5'],
        description: 'Join our innovative startup and help build amazing user experiences...',
        remote: false,
        urgent: false,
    },
    {
        id: 3,
        title: 'Backend Engineer',
        company: 'DataFlow Systems',
        location: 'Remote',
        type: 'Full-time',
        salary: '$100k - $150k',
        posted: '3 days ago',
        skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
        description: 'Build scalable backend systems and APIs for our data platform...',
        remote: true,
        urgent: false,
    },
    {
        id: 4,
        title: 'DevOps Engineer',
        company: 'CloudTech Solutions',
        location: 'Austin, TX',
        type: 'Full-time',
        salary: '$110k - $160k',
        posted: '5 days ago',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
        description: 'Manage our cloud infrastructure and deployment pipelines...',
        remote: true,
        urgent: false,
    },
];

export default function JobFeedPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [locationFilter, setLocationFilter] = useState('');
    const [jobTypeFilter, setJobTypeFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const allSkills = Array.from(new Set(mockJobs.flatMap((job) => job.skills)));

    const filteredJobs = mockJobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSkills =
            selectedSkills.length === 0 ||
            selectedSkills.some((skill) => job.skills.includes(skill));
        const matchesLocation =
            !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
        const matchesType = !jobTypeFilter || job.type === jobTypeFilter;

        return matchesSearch && matchesSkills && matchesLocation && matchesType;
    });

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
        );
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
                        <Skeleton className="h-8 w-32 rounded" />
                    </div>
                    <div className="border-b border-gray-100 bg-gray-50 px-8 py-6">
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-96 rounded" />
                            <div className="flex gap-4">
                                <Skeleton className="h-10 w-48 rounded" />
                                <Skeleton className="h-10 w-32 rounded" />
                                <Skeleton className="h-10 w-24 rounded" />
                            </div>
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
                        <BriefcaseIcon className="h-6 w-6 text-blue-600" />
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
                        className="flex items-center gap-3 rounded-lg bg-blue-700 px-3 py-2 text-white"
                    >
                        <BriefcaseIcon className="h-5 w-5" />
                        Job feed
                    </Link>
                    <Link
                        href="/candidate/saved-jobs"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
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
                        <h1 className="text-3xl font-bold text-gray-900">Job Feed</h1>
                        <div className="flex items-center gap-4">
                            <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                Post a Job
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="border-b border-gray-100 bg-gray-50 px-8 py-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-1 items-center gap-4">
                            <div className="relative max-w-md flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="Search jobs, companies..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Input
                                placeholder="Location"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-48"
                            />
                            <select
                                value={jobTypeFilter}
                                onChange={(e) => setJobTypeFilter(e.target.value)}
                                className="rounded-md border border-gray-300 px-3 py-2"
                            >
                                <option value="">All Types</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            Filters
                        </Button>
                    </div>

                    {/* Skills Filter */}
                    <div className="mt-4">
                        <p className="mb-2 text-sm font-medium text-gray-700">Filter by Skills:</p>
                        <div className="flex flex-wrap gap-2">
                            {allSkills.map((skill) => (
                                <Badge
                                    key={skill}
                                    variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                                    className={`cursor-pointer ${
                                        selectedSkills.includes(skill)
                                            ? 'bg-blue-600 text-white'
                                            : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => toggleSkill(skill)}
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Job Listings */}
                <div className="px-8 py-6">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-gray-600">
                            Showing {filteredJobs.length} of {mockJobs.length} jobs
                        </p>
                        <select className="rounded-md border border-gray-300 px-3 py-2">
                            <option>Most Recent</option>
                            <option>Salary: High to Low</option>
                            <option>Salary: Low to High</option>
                            <option>Most Relevant</option>
                        </select>
                    </div>

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
                                                    <Badge variant="secondary" className="text-xs">
                                                        Remote
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
                                            <Button variant="outline" size="sm">
                                                Save
                                            </Button>
                                            <Button size="sm">Apply Now</Button>
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
                                            Posted {job.posted}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredJobs.length === 0 && (
                        <div className="py-12 text-center">
                            <BriefcaseIcon className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No jobs found
                            </h3>
                            <p className="text-gray-600">
                                Try adjusting your search criteria or filters.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
