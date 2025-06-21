'use client';

import { Building2 } from 'lucide-react';
import { AuthCard } from '@/components/client/layout/auth-card';
import { AuthLayout } from '@/components/client/layout/auth-layout';
import { LoginForm } from './components/login-form';

export default function CompanyLogin() {
    return (
        <AuthLayout title="Enterprise Portal" icon={Building2} variant="company">
            <AuthCard
                icon={Building2}
                title="Welcome Back!"
                subtitle="Sign in to your company account"
            >
                <LoginForm />
            </AuthCard>
        </AuthLayout>
    );
}
