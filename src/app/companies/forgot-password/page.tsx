'use client';

import { Building2 } from 'lucide-react';
import { AuthCard } from '@/components/client/layout/auth-card';
import { AuthLayout } from '@/components/client/layout/auth-layout';
import { ForgotPasswordForm } from './components/forgot-password-form';

export default function CompanyForgotPassword() {
    return (
        <AuthLayout
            title="Enterprise Portal"
            icon={Building2}
            variant="company"
            backLink="/companies/login"
        >
            <AuthCard
                icon={Building2}
                title="Reset Password"
                subtitle="Enter your work email to receive a reset link"
            >
                <ForgotPasswordForm />
            </AuthCard>
        </AuthLayout>
    );
}
