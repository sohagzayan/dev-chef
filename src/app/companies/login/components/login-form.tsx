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

    const handleFieldChange = (field: keyof CompanyLoginForm, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        validateField(field, value, newData);
    };

    return (
        <div className="space-y-6">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    <FormField label="Work Email" htmlFor="email" error={errors.email} required>
                        <div className="relative">
                            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="your.email@company.com"
                                value={formData.email}
                                onChange={(e) => handleFieldChange('email', e.target.value)}
                                className="border-gray-300 bg-white py-2.5 pr-4 pl-10 text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)]"
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
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={formData.rememberMe}
                            onCheckedChange={(checked) => handleFieldChange('rememberMe', checked)}
                            className="border-gray-300 data-[state=checked]:border-[rgb(148,242,127)] data-[state=checked]:bg-[rgb(148,242,127)]"
                        />
                        <Label
                            htmlFor="remember"
                            className="cursor-pointer text-sm font-medium text-gray-700"
                        >
                            Remember me
                        </Label>
                    </div>
                    <Link
                        href="/companies/forgot-password"
                        className="text-sm font-medium text-[rgb(148,242,127)] transition-colors duration-200 hover:text-[rgb(148,242,127)]/80"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                    <LoadingButton
                        type="submit"
                        isLoading={isLoading}
                        loadingText="Signing in..."
                        className="w-full py-2.5 text-sm font-semibold"
                    >
                        Sign In
                    </LoadingButton>
                </div>
            </form>

            {/* Social Login */}
            <div className="pt-1">
                <SocialLogin disabled={isLoading} />
            </div>

            {/* Bottom Links */}
            <div className="space-y-2 pt-4 text-center">
                <p className="text-xs text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/companies/demo"
                        className="font-semibold text-[rgb(148,242,127)] transition-colors duration-200 hover:text-[rgb(148,242,127)]/80"
                    >
                        Request Demo
                    </Link>
                </p>
                <p className="text-xs text-gray-600">
                    Want to try before you buy?{' '}
                    <Link
                        href="/companies/trial"
                        className="font-semibold text-[rgb(148,242,127)] transition-colors duration-200 hover:text-[rgb(148,242,127)]/80"
                    >
                        Start Free Trial
                    </Link>
                </p>
            </div>
        </div>
    );
}
