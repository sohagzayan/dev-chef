'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, DollarSign, FileText, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import { PageHeader } from '@/components/admin/layout/PageHeader';
import { StatsCard } from '@/components/admin/layout/StatsCard';
import { useAdmin } from '@/components/admin/providers/AdminProvider';

export default function DashboardPage() {
    const { user } = useAdmin();

    useEffect(() => {
        console.log('Dashboard component mounted for role:', user?.role);
    }, [user?.role]);

    // Role-specific welcome messages
    const getWelcomeMessage = () => {
        switch (user?.role) {
            case 'ADMIN':
                return "Welcome to your Admin Console! Here's what's happening across your platform today.";
            case 'RECRUITER':
                return "Welcome to your Recruiter Dashboard! Here's what's happening with your hiring today.";
            case 'CANDIDATE':
                return "Welcome to your Candidate Dashboard! Here's what's happening with your applications today.";
            default:
                return "Welcome to your Dashboard! Here's what's happening today.";
        }
    };

    // Role-specific stats
    const getStatsData = () => {
        switch (user?.role) {
            case 'ADMIN':
                return [
                    {
                        title: 'Total Users',
                        value: '2,847',
                        description: '+12% from last month',
                        icon: Users,
                        color: 'blue',
                        trend: 'up',
                    },
                    {
                        title: 'Platform Revenue',
                        value: '$45,231',
                        description: '+20% from last month',
                        icon: DollarSign,
                        color: 'green',
                        trend: 'up',
                    },
                    {
                        title: 'Active Jobs',
                        value: '156',
                        description: '+8% from last month',
                        icon: FileText,
                        color: 'purple',
                        trend: 'up',
                    },
                    {
                        title: 'System Health',
                        value: '99.9%',
                        description: 'All systems operational',
                        icon: Shield,
                        color: 'green',
                        trend: 'stable',
                    },
                ];
            case 'RECRUITER':
                return [
                    {
                        title: 'Active Jobs',
                        value: '12',
                        description: '+2 new this week',
                        icon: FileText,
                        color: 'blue',
                        trend: 'up',
                    },
                    {
                        title: 'Candidates',
                        value: '89',
                        description: '+15 this week',
                        icon: Users,
                        color: 'green',
                        trend: 'up',
                    },
                    {
                        title: 'Interviews',
                        value: '8',
                        description: 'Scheduled this week',
                        icon: Activity,
                        color: 'purple',
                        trend: 'stable',
                    },
                    {
                        title: 'Hires',
                        value: '3',
                        description: 'This month',
                        icon: TrendingUp,
                        color: 'green',
                        trend: 'up',
                    },
                ];
            case 'CANDIDATE':
                return [
                    {
                        title: 'Applications',
                        value: '7',
                        description: 'Active applications',
                        icon: FileText,
                        color: 'blue',
                        trend: 'stable',
                    },
                    {
                        title: 'Interviews',
                        value: '2',
                        description: 'Scheduled',
                        icon: Activity,
                        color: 'purple',
                        trend: 'up',
                    },
                    {
                        title: 'Skills',
                        value: '12',
                        description: 'Verified skills',
                        icon: Shield,
                        color: 'green',
                        trend: 'up',
                    },
                    {
                        title: 'Progress',
                        value: '85%',
                        description: 'Profile completion',
                        icon: TrendingUp,
                        color: 'orange',
                        trend: 'up',
                    },
                ];
            default:
                return [
                    {
                        title: 'Welcome',
                        value: 'Get Started',
                        description: 'Complete your profile',
                        icon: Users,
                        color: 'blue',
                        trend: 'stable',
                    },
                ];
        }
    };

    const statsData = getStatsData();

    return (
        <div className="space-y-6">
            <PageHeader
                title={`${user?.role || 'User'} Dashboard`}
                description={getWelcomeMessage()}
                showBreadcrumbs={false}
            />

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat) => (
                    <StatsCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        description={stat.description}
                        icon={stat.icon}
                        color={stat.color}
                        trend={stat.trend}
                    />
                ))}
            </div>

            {/* Role-specific content */}
            {user?.role === 'ADMIN' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Platform Overview</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-blue-50 p-4">
                            <h3 className="font-medium text-blue-900">System Status</h3>
                            <p className="text-sm text-blue-700">All services operational</p>
                        </div>
                        <div className="rounded-lg bg-green-50 p-4">
                            <h3 className="font-medium text-green-900">Recent Activity</h3>
                            <p className="text-sm text-green-700">23 new users today</p>
                        </div>
                        <div className="rounded-lg bg-purple-50 p-4">
                            <h3 className="font-medium text-purple-900">Performance</h3>
                            <p className="text-sm text-purple-700">99.9% uptime</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {user?.role === 'RECRUITER' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <button className="rounded-lg bg-blue-50 p-4 text-left transition-colors hover:bg-blue-100">
                            <h3 className="font-medium text-blue-900">Post New Job</h3>
                            <p className="text-sm text-blue-700">Create a new job posting</p>
                        </button>
                        <button className="rounded-lg bg-green-50 p-4 text-left transition-colors hover:bg-green-100">
                            <h3 className="font-medium text-green-900">Review Candidates</h3>
                            <p className="text-sm text-green-700">View new applications</p>
                        </button>
                        <button className="rounded-lg bg-purple-50 p-4 text-left transition-colors hover:bg-purple-100">
                            <h3 className="font-medium text-purple-900">Schedule Interview</h3>
                            <p className="text-sm text-purple-700">Book interview slots</p>
                        </button>
                    </div>
                </motion.div>
            )}

            {user?.role === 'CANDIDATE' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Your Progress</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-blue-50 p-4">
                            <h3 className="font-medium text-blue-900">Profile Completion</h3>
                            <div className="mt-2">
                                <div className="h-2 w-full rounded-full bg-blue-200">
                                    <div
                                        className="h-2 rounded-full bg-blue-600"
                                        style={{ width: '85%' }}
                                    ></div>
                                </div>
                                <p className="mt-1 text-sm text-blue-700">85% Complete</p>
                            </div>
                        </div>
                        <div className="rounded-lg bg-green-50 p-4">
                            <h3 className="font-medium text-green-900">Skills Verified</h3>
                            <p className="text-sm text-green-700">12 out of 15 skills verified</p>
                        </div>
                        <div className="rounded-lg bg-purple-50 p-4">
                            <h3 className="font-medium text-purple-900">Applications</h3>
                            <p className="text-sm text-purple-700">7 active applications</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
