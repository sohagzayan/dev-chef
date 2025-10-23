'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Bell,
    Bookmark,
    BriefcaseIcon,
    CheckCircle,
    Eye,
    EyeOff,
    Globe,
    Home,
    Mail,
    Moon,
    Settings,
    Shield,
    Sun,
    User,
    XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const [profileData, setProfileData] = useState({
        firstName: 'Thomas',
        lastName: 'Hardison',
        email: 'thomasdhardison@dayrep.com',
        phone: '661-724-7734',
        bio: 'Full-stack developer passionate about building scalable applications and solving complex problems.',
        website: 'https://thomashardison.dev',
        location: 'Mcallen, New York',
        timezone: 'America/New_York',
        language: 'English',
    });

    const [securityData, setSecurityData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: true,
        loginAlerts: true,
        sessionTimeout: '24h',
    });

    const handleInputChange = (field: string, value: string) => {
        setProfileData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSecurityChange = (field: string, value: string | boolean) => {
        setSecurityData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveProfile = () => {
        console.log('Saving profile:', profileData);
        // Here you would typically send the data to your API
    };

    const handleSaveSecurity = () => {
        console.log('Saving security settings:', securityData);
        // Here you would typically send the data to your API
    };

    const handleSaveNotifications = () => {
        console.log('Saving notification settings:', {
            emailNotifications,
            pushNotifications,
            marketingEmails,
        });
        // Here you would typically send the data to your API
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'preferences', label: 'Preferences', icon: Settings },
    ];

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
                            <Skeleton className="h-4 w-64 rounded" />
                        </div>
                    </div>
                    <div className="border-b border-gray-100 bg-gray-50 px-8">
                        <div className="flex space-x-8">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-12 w-24 rounded" />
                            ))}
                        </div>
                    </div>
                    <div className="px-8 py-6">
                        <div className="space-y-6">
                            <Skeleton className="h-64 w-full rounded-lg" />
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
                        <Shield className="h-6 w-6 text-blue-600" />
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
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
                    >
                        <Bookmark className="h-5 w-5" />
                        Save Jobs
                    </Link>
                    <Link
                        href="/candidate/settings"
                        className="flex items-center gap-3 rounded-lg bg-blue-700 px-3 py-2 text-white"
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
                            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                            <p className="mt-1 text-gray-600">
                                Manage your account preferences and security
                            </p>
                        </div>
                    </div>
                </div>

                {/* Settings Tabs */}
                <div className="border-b border-gray-100 bg-gray-50 px-8">
                    <div className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Settings Content */}
                <div className="px-8 py-6">
                    {/* Profile Settings */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Personal Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                value={profileData.firstName}
                                                onChange={(e) =>
                                                    handleInputChange('firstName', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                value={profileData.lastName}
                                                onChange={(e) =>
                                                    handleInputChange('lastName', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) =>
                                                    handleInputChange('email', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                value={profileData.phone}
                                                onChange={(e) =>
                                                    handleInputChange('phone', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Input
                                                id="bio"
                                                value={profileData.bio}
                                                onChange={(e) =>
                                                    handleInputChange('bio', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="website">Website</Label>
                                            <Input
                                                id="website"
                                                value={profileData.website}
                                                onChange={(e) =>
                                                    handleInputChange('website', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                value={profileData.location}
                                                onChange={(e) =>
                                                    handleInputChange('location', e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5" />
                                        Password & Security
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="currentPassword">
                                                Current Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="currentPassword"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={securityData.currentPassword}
                                                    onChange={(e) =>
                                                        handleSecurityChange(
                                                            'currentPassword',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="pr-10"
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
                                        <div>
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="newPassword"
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    value={securityData.newPassword}
                                                    onChange={(e) =>
                                                        handleSecurityChange(
                                                            'newPassword',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowNewPassword(!showNewPassword)
                                                    }
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showNewPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="confirmPassword">
                                                Confirm New Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    value={securityData.confirmPassword}
                                                    onChange={(e) =>
                                                        handleSecurityChange(
                                                            'confirmPassword',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmPassword(!showConfirmPassword)
                                                    }
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button onClick={handleSaveSecurity}>
                                            Update Password
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Two-Factor Authentication</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Enable 2FA</p>
                                            <p className="text-sm text-gray-600">
                                                Add an extra layer of security to your account
                                            </p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={securityData.twoFactorEnabled}
                                            onChange={(e) =>
                                                handleSecurityChange(
                                                    'twoFactorEnabled',
                                                    e.target.checked,
                                                )
                                            }
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bell className="h-5 w-5" />
                                        Notification Preferences
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Email Notifications</p>
                                                <p className="text-sm text-gray-600">
                                                    Receive notifications via email
                                                </p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={emailNotifications}
                                                onChange={(e) =>
                                                    setEmailNotifications(e.target.checked)
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                            />
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Push Notifications</p>
                                                <p className="text-sm text-gray-600">
                                                    Receive push notifications in your browser
                                                </p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={pushNotifications}
                                                onChange={(e) =>
                                                    setPushNotifications(e.target.checked)
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                            />
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Marketing Emails</p>
                                                <p className="text-sm text-gray-600">
                                                    Receive updates about new features and
                                                    promotions
                                                </p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={marketingEmails}
                                                onChange={(e) =>
                                                    setMarketingEmails(e.target.checked)
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button onClick={handleSaveNotifications}>
                                            Save Preferences
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Preferences Settings */}
                    {activeTab === 'preferences' && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="h-5 w-5" />
                                        Display & Language
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Dark Mode</p>
                                                <p className="text-sm text-gray-600">
                                                    Switch between light and dark themes
                                                </p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={darkMode}
                                                onChange={(e) => setDarkMode(e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                            />
                                        </div>
                                        <Separator />
                                        <div>
                                            <Label htmlFor="language">Language</Label>
                                            <select
                                                id="language"
                                                value={profileData.language}
                                                onChange={(e) =>
                                                    handleInputChange('language', e.target.value)
                                                }
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                            >
                                                <option value="English">English</option>
                                                <option value="Spanish">Spanish</option>
                                                <option value="French">French</option>
                                                <option value="German">German</option>
                                                <option value="Chinese">Chinese</option>
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="timezone">Timezone</Label>
                                            <select
                                                id="timezone"
                                                value={profileData.timezone}
                                                onChange={(e) =>
                                                    handleInputChange('timezone', e.target.value)
                                                }
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                            >
                                                <option value="America/New_York">
                                                    Eastern Time (ET)
                                                </option>
                                                <option value="America/Chicago">
                                                    Central Time (CT)
                                                </option>
                                                <option value="America/Denver">
                                                    Mountain Time (MT)
                                                </option>
                                                <option value="America/Los_Angeles">
                                                    Pacific Time (PT)
                                                </option>
                                                <option value="Europe/London">London (GMT)</option>
                                                <option value="Europe/Paris">Paris (CET)</option>
                                            </select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
