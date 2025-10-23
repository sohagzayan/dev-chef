'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
    Bookmark,
    BriefcaseIcon,
    Camera,
    CheckCircle,
    ChevronDown,
    Edit3,
    Eye,
    EyeOff,
    Gift,
    Home,
    Lock,
    Settings,
    Shield,
    User,
    Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { ProfileForm, ProfileSidebar } from './components';

// Main Profile Component
export default function CandidateProfilePage() {
    const { user, isAuthenticated } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [activeProfileTab, setActiveProfileTab] = useState('edit-profile');
    const [isLoading, setIsLoading] = useState(true);

    // Form state management
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        password: '********',
    });

    // Update form data when user data changes
    useMemo(() => {
        if (user) {
            const fullName = user.name || 'Thomas D Hardison';
            const nameParts = fullName.split(' ');
            setFormData({
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                email: user.email || 'thomasdhardison@dayrep.com',
                phone: '661-724-7734',
                address: '1368 Hayhurst Lane.',
                city: 'Mcallen',
                state: 'New York',
                zipCode: '11357',
                country: 'United States',
                password: '********',
            });
            setIsLoading(false);
        }
    }, [user]);

    // Simulate loading for better UX
    useEffect(() => {
        const timer = setTimeout(() => {
            if (user) {
                setIsLoading(false);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [user]);

    // Handle form field changes
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you would typically send the data to your API
    };

    // Mock data with advanced features
    const profileData = useMemo(
        () => ({
            name: user?.name || 'Thomas D Hardison',
            email: user?.email || 'thomasdhardison@dayrep.com',
            avatar: '/placeholder.svg',
            location: 'Mcallen, New York',
            bio: 'Full-stack developer passionate about building scalable applications and solving complex problems.',
            joinDate: '2023-01-15',
            rank: 'Top 5%',
            reputation: 1250,
            profileCompletion: 85,
            phone: '661-724-7734',
            address: '1368 Hayhurst Lane.',
            city: 'Mcallen',
            state: 'New York',
            zipCode: '11357',
            country: 'United States',
            aiSummary:
                '5+ years in full-stack development, React + Node.js expert, contributed to scaling applications to 1M+ users. Specialized in TypeScript, AWS, and PostgreSQL with proven track record of leading development teams and delivering high-impact projects.',
            skills: [
                {
                    id: '1',
                    name: 'React',
                    level: 'Expert',
                    yearsOfExperience: 4,
                    category: 'Frontend',
                    growth: 25,
                },
                {
                    id: '2',
                    name: 'Node.js',
                    level: 'Advanced',
                    yearsOfExperience: 3,
                    category: 'Backend',
                    growth: 30,
                },
                {
                    id: '3',
                    name: 'TypeScript',
                    level: 'Advanced',
                    yearsOfExperience: 3,
                    category: 'Frontend',
                    growth: 45,
                },
                {
                    id: '4',
                    name: 'Python',
                    level: 'Intermediate',
                    yearsOfExperience: 2,
                    category: 'Backend',
                    growth: 15,
                },
                {
                    id: '5',
                    name: 'AWS',
                    level: 'Intermediate',
                    yearsOfExperience: 2,
                    category: 'DevOps',
                    growth: 60,
                },
            ],
            experiences: [
                {
                    id: '1',
                    company: 'TechCorp Inc.',
                    position: 'Senior Full Stack Developer',
                    startDate: '2022-01-01',
                    current: true,
                    description:
                        'Leading development of scalable web applications using React, Node.js, and AWS.',
                    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
                    achievements: [
                        'Improved application performance by 40%',
                        'Led team of 5 developers',
                        'Implemented CI/CD pipeline',
                    ],
                    verified: true,
                },
                {
                    id: '2',
                    company: 'StartupXYZ',
                    position: 'Frontend Developer',
                    startDate: '2020-03-01',
                    endDate: '2021-12-31',
                    current: false,
                    description:
                        'Developed responsive web applications and improved user experience.',
                    technologies: ['React', 'JavaScript', 'CSS3', 'HTML5'],
                    achievements: [
                        'Reduced page load time by 60%',
                        'Implemented responsive design',
                        'Improved accessibility',
                    ],
                    verified: false,
                },
            ],
            jobPreferences: [
                {
                    id: '1',
                    title: 'Senior Full Stack Developer',
                    location: 'Remote / San Francisco, CA',
                    salaryMin: 120000,
                    salaryMax: 180000,
                    companySize: '50-200 employees',
                    industry: 'Technology',
                    employmentType: 'Full-time',
                },
                {
                    id: '2',
                    title: 'Lead Frontend Developer',
                    location: 'Hybrid / New York, NY',
                    salaryMin: 100000,
                    salaryMax: 150000,
                    companySize: '200+ employees',
                    industry: 'FinTech',
                    employmentType: 'Full-time',
                },
            ],
            stats: {
                problemsSolved: 156,
                streak: 12,
                applications: 24,
                successRate: 68,
            },
            analytics: {
                profileViews: 89,
                recruiterSearches: 23,
                jobMatches: 45,
                skillGrowth: 78,
            },
            marketInsights: {
                hotSkills: ['React', 'TypeScript', 'AWS'],
                salaryTrend: '15%',
                growthSkill: 'Python',
                growthPotential: '30%',
                competitionPercentile: '85',
            },
            achievements: [
                {
                    id: '1',
                    title: 'Profile 100% Complete',
                    icon: CheckCircle,
                    color: 'text-yellow-600',
                    bgColor: 'bg-yellow-50',
                },
                {
                    id: '2',
                    title: 'Top 5% Problem Solver',
                    icon: CheckCircle,
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-50',
                },
                {
                    id: '3',
                    title: 'Verified by Recruiter',
                    icon: CheckCircle,
                    color: 'text-green-600',
                    bgColor: 'bg-green-50',
                },
            ],
        }),
        [user],
    );

    const profileSettings = [
        {
            id: 'edit-profile',
            label: 'Edit Profile',
            icon: Edit3,
            active: activeProfileTab === 'edit-profile',
        },
        {
            id: 'notifications',
            label: 'Notifications',
            icon: Settings,
            active: activeProfileTab === 'notifications',
        },
        {
            id: 'choose-plan',
            label: 'Choose Plan',
            icon: Gift,
            active: activeProfileTab === 'choose-plan',
        },
        {
            id: 'password-security',
            label: 'Password & Security',
            icon: Lock,
            active: activeProfileTab === 'password-security',
        },
    ];

    if (!isAuthenticated || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <Card className="w-full max-w-md border-gray-100 bg-white shadow-lg">
                    <CardContent className="p-8 text-center">
                        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
                            <Users className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="mb-4 text-2xl font-bold text-gray-900">
                            Sign in to view your profile
                        </h1>
                        <p className="text-gray-600">
                            Access your comprehensive developer profile and track your progress.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

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
                    <div className="flex">
                        <div className="w-80 border-r border-gray-100 bg-gray-50 p-6">
                            <div className="mb-6">
                                <Skeleton className="mb-4 h-6 w-32 rounded" />
                                <Skeleton className="h-4 w-24 rounded" />
                            </div>
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <Skeleton key={i} className="h-10 w-full rounded" />
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 p-8">
                            <Skeleton className="mb-8 h-8 w-48 rounded" />
                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <Skeleton className="h-24 w-24 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-32 rounded" />
                                        <Skeleton className="h-4 w-24 rounded" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                        <div key={i} className="space-y-2">
                                            <Skeleton className="h-4 w-20 rounded" />
                                            <Skeleton className="h-10 w-full rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
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
                        <User className="h-6 w-6 text-blue-600" />
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
                        className="flex items-center gap-3 rounded-lg bg-blue-700 px-3 py-2 text-white"
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
                {/* Content Panels */}
                <div className="flex">
                    {/* Left Panel - Profile Settings Navigation */}
                    <ProfileSidebar
                        profileSettings={profileSettings}
                        activeProfileTab={activeProfileTab}
                        onTabChange={setActiveProfileTab}
                    />

                    {/* Right Panel - Content based on active tab */}
                    <div className="flex-1 p-8">
                        {/* Edit Profile Tab */}
                        {activeProfileTab === 'edit-profile' && (
                            <>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Edit Profile
                                    </h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Profile Picture */}
                                    <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <Avatar className="h-24 w-24">
                                                <AvatarImage
                                                    src={profileData.avatar}
                                                    alt={profileData.name}
                                                />
                                                <AvatarFallback className="bg-blue-600 text-2xl font-bold text-white">
                                                    {profileData.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <button
                                                type="button"
                                                className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
                                            >
                                                <Camera className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {profileData.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">Profile picture</p>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                First Name
                                            </label>
                                            <Input
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) =>
                                                    handleInputChange('firstName', e.target.value)
                                                }
                                                className="border-gray-200 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>
                                            <Input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) =>
                                                    handleInputChange('lastName', e.target.value)
                                                }
                                                className="border-gray-200 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    handleInputChange('email', e.target.value)
                                                }
                                                className="border-gray-200 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Contact Number
                                            </label>
                                            <Input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    handleInputChange('phone', e.target.value)
                                                }
                                                className="border-gray-200 focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Address
                                            </label>
                                            <Input
                                                type="text"
                                                value={formData.address}
                                                onChange={(e) =>
                                                    handleInputChange('address', e.target.value)
                                                }
                                                className="border-gray-200 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                City
                                            </label>
                                            <Input
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) =>
                                                    handleInputChange('city', e.target.value)
                                                }
                                                className="border-gray-200 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                State
                                            </label>
                                            <Input
                                                type="text"
                                                value={formData.state}
                                                onChange={(e) =>
                                                    handleInputChange('state', e.target.value)
                                                }
                                                className="border-gray-200 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Zip Code
                                            </label>
                                            <Input
                                                type="text"
                                                value={formData.zipCode}
                                                onChange={(e) =>
                                                    handleInputChange('zipCode', e.target.value)
                                                }
                                                className="border-gray-200 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Country
                                            </label>
                                            <Input
                                                type="text"
                                                value={formData.country}
                                                onChange={(e) =>
                                                    handleInputChange('country', e.target.value)
                                                }
                                                className="border-gray-200 focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={formData.password}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'password',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="border-gray-200 pr-10 focus:border-blue-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <div className="pt-6">
                                        <Button
                                            type="submit"
                                            className="bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}

                        {/* Notifications Tab */}
                        {activeProfileTab === 'notifications' && (
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Notification Settings
                                    </h2>
                                </div>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">
                                                        Email Notifications
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Receive notifications via email
                                                    </p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">
                                                        Push Notifications
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Receive push notifications in your browser
                                                    </p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">Job Alerts</h3>
                                                    <p className="text-sm text-gray-600">
                                                        Get notified about new job opportunities
                                                    </p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Choose Plan Tab */}
                        {activeProfileTab === 'choose-plan' && (
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Choose Your Plan
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <Card className="border-2 border-gray-200">
                                        <CardHeader>
                                            <CardTitle className="text-center">Free</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-center">
                                            <p className="text-3xl font-bold">$0</p>
                                            <p className="text-gray-600">Basic features</p>
                                            <Button className="mt-4 w-full" variant="outline">
                                                Current Plan
                                            </Button>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-2 border-blue-500">
                                        <CardHeader>
                                            <CardTitle className="text-center">Pro</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-center">
                                            <p className="text-3xl font-bold">$19</p>
                                            <p className="text-gray-600">Advanced features</p>
                                            <Button className="mt-4 w-full">Upgrade</Button>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-2 border-gray-200">
                                        <CardHeader>
                                            <CardTitle className="text-center">
                                                Enterprise
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-center">
                                            <p className="text-3xl font-bold">$49</p>
                                            <p className="text-gray-600">Full features</p>
                                            <Button className="mt-4 w-full" variant="outline">
                                                Contact Sales
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}

                        {/* Password & Security Tab */}
                        {activeProfileTab === 'password-security' && (
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Password & Security
                                    </h2>
                                </div>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="currentPassword">
                                                    Current Password
                                                </Label>
                                                <div className="relative mt-1">
                                                    <Input
                                                        id="currentPassword"
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowPassword(!showPassword)
                                                        }
                                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="newPassword">New Password</Label>
                                                <Input
                                                    id="newPassword"
                                                    type="password"
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="confirmPassword">
                                                    Confirm New Password
                                                </Label>
                                                <Input
                                                    id="confirmPassword"
                                                    type="password"
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div className="pt-4">
                                                <Button>Update Password</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
