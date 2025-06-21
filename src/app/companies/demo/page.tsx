'use client';

import type React from 'react';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { AuthCard } from '@/components/client/layout/auth-card';
import { AuthLayout } from '@/components/client/layout/auth-layout';
import { DemoFeatures } from './components/demo-features';
import { DemoRequestForm } from './components/demo-request-form';

export default function DemoRequest() {
    return (
        <AuthLayout
            title="Enterprise Portal"
            icon={Building2}
            variant="company"
            rightContent={
                <Link
                    href="/companies/login"
                    className="text-muted-500 transition-colors hover:text-white"
                >
                    Already have an account? Sign in
                </Link>
            }
        >
            <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
                <DemoFeatures />
                <AuthCard
                    icon={Building2}
                    title="Request a Demo"
                    subtitle="Fill out the form below to schedule your personalized demo"
                    className="lg:max-w-none"
                >
                    <DemoRequestForm />
                </AuthCard>
            </div>
        </AuthLayout>
    );
}
