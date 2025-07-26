'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';
import { AuthCard } from '@/components/client/layout/auth-card';
import { AuthLayout } from '@/components/client/layout/auth-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CandidateForgotPasswordForm } from './components/candidate-forgot-password-form';
import { RecruiterForgotPasswordForm } from './components/recruiter-forgot-password-form';

type UserType = 'candidate' | 'recruiter';

export default function ForgotPassword() {
    const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);

    const userTypes = [
        {
            id: 'candidate' as const,
            title: 'Job Seeker',
            subtitle: "I'm looking for opportunities",
            icon: Users,
            description: 'Reset password for your candidate account',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700',
        },
        {
            id: 'recruiter' as const,
            title: 'Recruiter',
            subtitle: "I'm hiring talent",
            icon: Building2,
            description: 'Reset password for your recruiter account',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            textColor: 'text-purple-700',
        },
    ];

    if (selectedUserType) {
        const userType = userTypes.find((type) => type.id === selectedUserType);
        const Icon = userType?.icon || Users;

        return (
            <AuthLayout
                variant={selectedUserType === 'candidate' ? 'developer' : 'company'}
                backLink="/forgot-password"
            >
                <div className="w-full max-w-sm">
                    <AuthCard
                        icon={Icon}
                        title="Reset Password"
                        subtitle={`Enter your email to receive a reset link for your ${selectedUserType} account`}
                    >
                        <div className="space-y-4">
                            <Button
                                variant="ghost"
                                onClick={() => setSelectedUserType(null)}
                                className="text-muted-500 mb-4 text-sm transition-colors hover:bg-blue-50 hover:text-blue-600"
                            >
                                ← Back to user type selection
                            </Button>

                            {selectedUserType === 'candidate' ? (
                                <CandidateForgotPasswordForm />
                            ) : (
                                <RecruiterForgotPasswordForm />
                            )}
                        </div>
                    </AuthCard>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout variant="default" backLink="/">
            <div className="w-full max-w-md">
                <AuthCard
                    icon={Users}
                    title="Select Your Account Type"
                    subtitle="Choose the type of account you need to reset password for"
                >
                    <div className="grid grid-cols-2 gap-3">
                        {userTypes.map((userType) => {
                            const Icon = userType.icon;
                            return (
                                <motion.div
                                    key={userType.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full"
                                >
                                    <Card
                                        className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${userType.bgColor} ${userType.borderColor} hover:border-opacity-100 h-full border-2`}
                                        onClick={() => setSelectedUserType(userType.id)}
                                    >
                                        <CardContent className="flex h-full flex-col justify-center p-4">
                                            <div className="flex flex-col items-center space-y-2 text-center">
                                                <div
                                                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${userType.color} text-white shadow-md`}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3
                                                        className={`font-semibold ${userType.textColor}`}
                                                    >
                                                        {userType.title}
                                                    </h3>
                                                    <p className="text-muted-500 text-xs">
                                                        {userType.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-muted-500 text-xs">
                            Remember your password?{' '}
                            <Link href="/" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </AuthCard>
            </div>
        </AuthLayout>
    );
}
