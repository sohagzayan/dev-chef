'use client';

import { Code2 } from 'lucide-react';
import { AuthCard } from '@/components/client/layout/auth-card';
import { AuthLayout } from '@/components/client/layout/auth-layout';
import { ForgotPasswordForm } from './components/forgot-password-form';

export default function DeveloperForgotPassword() {
    return (
        <AuthLayout
            title="Developer Hub"
            icon={Code2}
            variant="developer"
            backLink="/developers/login"
        >
            <AuthCard
                icon={Code2}
                title="Reset Password"
                subtitle="Enter your email or username to receive a reset link"
            >
                <ForgotPasswordForm />
            </AuthCard>
        </AuthLayout>
    );
}
