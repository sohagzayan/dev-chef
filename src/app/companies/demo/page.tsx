'use client';

import type React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';
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
                    className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900"
                >
                    <span>Already have an account?</span>
                    <span className="font-medium text-[rgb(148,242,127)]">Sign in</span>
                    <ArrowRight className="h-4 w-4" />
                </Link>
            }
        >
            <div className="mx-auto grid max-w-7xl items-start gap-16 lg:grid-cols-2">
                <DemoFeatures />
                <div className="flex flex-col items-center justify-center">
                    <AuthCard
                        title="Request a Demo"
                        subtitle="Fill out the form below to schedule your personalized demo with our product experts"
                        className="w-full lg:max-w-md"
                    >
                        <DemoRequestForm />
                    </AuthCard>
                </div>
            </div>
        </AuthLayout>
    );
}
