'use client';

import { Building2, LogOut, Mail, User } from 'lucide-react';
import { ProtectedCompanyRoute } from '@/components/client/common/ProtectedCompanyRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthClient } from '@/hooks/client/use-auth-client';

export default function CompanyDashboard() {
    const { user, logout } = useAuthClient();

    return (
        <ProtectedCompanyRoute>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="border-b bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Building2 className="h-8 w-8 text-[rgb(148,242,127)]" />
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Company Dashboard
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">
                                        {user?.profile?.firstName} {user?.profile?.lastName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {user?.profile?.companyName}
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={logout}
                                    className="flex items-center space-x-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Welcome Card */}
                        <Card className="md:col-span-2 lg:col-span-3">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="h-5 w-5" />
                                    <span>Welcome back!</span>
                                </CardTitle>
                                <CardDescription>
                                    Manage your hiring process and find the best talent for your
                                    company.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg bg-blue-50 p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-600">0</div>
                                        <div className="text-sm text-blue-600">Active Jobs</div>
                                    </div>
                                    <div className="rounded-lg bg-green-50 p-4 text-center">
                                        <div className="text-2xl font-bold text-green-600">0</div>
                                        <div className="text-sm text-green-600">Applications</div>
                                    </div>
                                    <div className="rounded-lg bg-purple-50 p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-600">0</div>
                                        <div className="text-sm text-purple-600">Interviews</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Company Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Building2 className="h-5 w-5" />
                                    <span>Company Info</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Company Name
                                    </label>
                                    <p className="text-sm text-gray-900">
                                        {user?.profile?.companyName}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Your Role
                                    </label>
                                    <p className="text-sm text-gray-900">
                                        {user?.profile?.jobTitle || 'Not specified'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Company Size
                                    </label>
                                    <p className="text-sm text-gray-900">
                                        {user?.profile?.companySize || 'Not specified'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>Common tasks and shortcuts</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full justify-start" variant="outline">
                                    <Building2 className="mr-2 h-4 w-4" />
                                    Post New Job
                                </Button>
                                <Button className="w-full justify-start" variant="outline">
                                    <User className="mr-2 h-4 w-4" />
                                    View Applications
                                </Button>
                                <Button className="w-full justify-start" variant="outline">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Contact Support
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Your latest actions and updates</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="py-8 text-center text-gray-500">
                                    <p className="text-sm">No recent activity</p>
                                    <p className="mt-1 text-xs">Start by posting your first job!</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </ProtectedCompanyRoute>
    );
}
