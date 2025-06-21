'use client';

import { Building2 } from 'lucide-react';
import { AuthLayout } from '@/components/client/layout/auth-layout';
import { ContactSalesFeatures } from './components/contact-sales-features';
import { ContactSalesForm } from './components/contact-sales-form';

export default function ContactSales() {
    return (
        <AuthLayout
            title="Enterprise Portal"
            icon={Building2}
            variant="company"
            rightContent={
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600">Already have an account?</span>
                    <a
                        href="/companies/login"
                        className="font-medium text-[rgb(148,242,127)] hover:underline"
                    >
                        Sign in
                    </a>
                </div>
            }
        >
            <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
                {/* Left Side - Information */}
                <ContactSalesFeatures />

                {/* Right Side - Form */}
                <div className="mx-auto w-full max-w-md lg:max-w-none">
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                        <ContactSalesForm />
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
