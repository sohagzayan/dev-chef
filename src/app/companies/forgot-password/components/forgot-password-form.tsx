'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { z } from 'zod';
import { FormField } from '@/components/client/common/form-field';
import { LoadingButton } from '@/components/client/common/loading-button';
import { Input } from '@/components/ui/input';
import { useFormValidation } from '@/hooks/form/use-form-validation';

const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState<ForgotPasswordForm>({
        email: '',
    });

    const { errors, validate, validateField } = useFormValidation(forgotPasswordSchema);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate(formData)) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsSubmitted(true);
        } catch (error) {
            console.error('Password reset failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFieldChange = (field: keyof ForgotPasswordForm, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        validateField(field, value, newData);
    };

    if (isSubmitted) {
        return (
            <div className="space-y-4 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(148,242,127)]/20">
                    <Mail className="h-8 w-8 text-[rgb(148,242,127)]" />
                </div>
                <h3 className="text-xl font-semibold text-white">Check your email</h3>
                <p className="text-[rgba(106,108,106,1)]">
                    Weve sent a password reset link to{' '}
                    <strong className="text-white">{formData.email}</strong>
                </p>
                <p className="text-sm text-[rgba(106,108,106,1)]">
                    Didnt receive the email? Check your spam folder or{' '}
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-[rgb(148,242,127)] hover:underline"
                    >
                        try again
                    </button>
                </p>
                <Link
                    href="/companies/login"
                    className="inline-flex items-center space-x-2 text-[rgb(148,242,127)] hover:underline"
                >
                    <ArrowRight className="h-4 w-4" />
                    <span>Back to login</span>
                </Link>
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Work Email" htmlFor="email" error={errors.email} required>
                    <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-[rgba(106,108,106,1)]" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="your.email@company.com"
                            value={formData.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            className="border-white/20 bg-white/5 pl-10 text-white placeholder:text-[rgba(106,108,106,1)] focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)]"
                            required
                        />
                    </div>
                </FormField>

                <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Sending reset link..."
                >
                    Send Reset Link
                </LoadingButton>
            </form>

            <div className="text-center text-[rgba(106,108,106,1)]">
                Remember your password?{' '}
                <Link
                    href="/companies/login"
                    className="font-medium text-[rgb(148,242,127)] hover:underline"
                >
                    Sign in
                </Link>
            </div>
        </>
    );
}
