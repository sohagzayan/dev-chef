'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FormField } from '@/components/client/common/form-field';
import { LoadingButton } from '@/components/client/common/loading-button';
import { PasswordInput } from '@/components/client/common/password-input';
import { SocialLogin } from '@/components/client/common/social-login';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormValidation } from '@/hooks/form/use-form-validation';
import { companyLoginSchema, type CompanyLoginForm } from '@/lib/validations';

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<CompanyLoginForm>({
        email: '',
        password: '',
        rememberMe: false,
    });

    const { errors, validate, validateField } = useFormValidation(companyLoginSchema);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate(formData)) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Login successful');
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFieldChange = (field: keyof CompanyLoginForm, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        validateField(field, value, newData);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Work Email" htmlFor="email" error={errors.email} required>
                    <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="your.email@company.com"
                            value={formData.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            className="border-gray-300 bg-white pl-10 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)]"
                            required
                        />
                    </div>
                </FormField>

                <FormField label="Password" htmlFor="password" error={errors.password} required>
                    <PasswordInput
                        id="password"
                        value={formData.password}
                        onChange={(value) => handleFieldChange('password', value)}
                        error={!!errors.password}
                        required
                    />
                </FormField>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={formData.rememberMe}
                            onCheckedChange={(checked) => handleFieldChange('rememberMe', checked)}
                            className="border-gray-300 data-[state=checked]:border-[rgb(148,242,127)] data-[state=checked]:bg-[rgb(148,242,127)]"
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-600">
                            Remember me
                        </Label>
                    </div>
                    <Link
                        href="/companies/forgot-password"
                        className="text-sm text-[rgb(148,242,127)] hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                <LoadingButton type="submit" isLoading={isLoading} loadingText="Signing in...">
                    Sign In
                </LoadingButton>
            </form>

            <SocialLogin disabled={isLoading} />

            <div className="text-center text-gray-600">
                Dont have an account?{' '}
                <Link
                    href="/companies/demo"
                    className="font-medium text-[rgb(148,242,127)] hover:underline"
                >
                    Request Demo
                </Link>{' '}
                or{' '}
                <Link
                    href="/companies/trial"
                    className="font-medium text-[rgb(148,242,127)] hover:underline"
                >
                    Start Free Trial
                </Link>
            </div>
        </>
    );
}
