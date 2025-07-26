'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, CheckCircle, Mail } from 'lucide-react';
import { z } from 'zod';
import { FormField } from '@/components/client/common/form-field';
import { LoadingButton } from '@/components/client/common/loading-button';
import { Input } from '@/components/ui/input';
import { useFormValidation } from '@/hooks/form/use-form-validation';
import { useForgotPasswordMutation } from '@/store/api/authApi';

const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export function CandidateForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<ForgotPasswordForm>({
        email: '',
    });

    const { errors, validate, validateField } = useFormValidation(forgotPasswordSchema);
    const [forgotPassword] = useForgotPasswordMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validate(formData)) return;

        setIsLoading(true);
        try {
            await forgotPassword({
                email: formData.email,
                userType: 'candidate',
            }).unwrap();

            // Show success message
            setIsSubmitted(true);
        } catch (error: any) {
            console.error('Password reset failed:', error);

            // Handle specific error codes
            const errorCode = error?.data?.code;
            let errorMessage = 'Something went wrong. Please try again.';

            switch (errorCode) {
                case 'USER_NOT_FOUND':
                    errorMessage = 'No account found with this email address.';
                    break;
                case 'ACCOUNT_DEACTIVATED':
                    errorMessage = 'This account has been deactivated. Please contact support.';
                    break;
                case 'WRONG_USER_TYPE':
                    errorMessage =
                        'This email is registered as a recruiter. Please use the recruiter form.';
                    break;
                case 'RATE_LIMITED':
                    errorMessage =
                        'Too many reset attempts. Please wait 15 minutes before trying again.';
                    break;
                case 'EMAIL_SEND_FAILED':
                    errorMessage = 'Failed to send email. Please try again later.';
                    break;
                case 'VALIDATION_ERROR':
                    errorMessage = error?.data?.error || 'Invalid email format.';
                    break;
                default:
                    errorMessage = error?.data?.error || 'Something went wrong. Please try again.';
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFieldChange = (field: keyof ForgotPasswordForm, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        validateField(field, value, newData);
        // Clear error when user starts typing
        if (error) setError(null);
    };

    if (isSubmitted) {
        return (
            <div className="space-y-4 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                    <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Check your email</h3>
                <p className="text-sm text-gray-600">
                    We&apos;ve sent a password reset link to{' '}
                    <strong className="text-gray-900">{formData.email}</strong>
                </p>
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                    <p className="text-xs text-blue-700">
                        💡 <strong>Tip:</strong> Check your spam folder if you don&apos;t see the
                        email within a few minutes.
                    </p>
                </div>
                <div className="space-y-2">
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-sm text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                    >
                        Didn&apos;t receive the email? Try again
                    </button>
                    <Link
                        href="/developers/login"
                        className="inline-flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                    >
                        <ArrowRight className="h-3 w-3" />
                        <span>Back to login</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
                    <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Email Address" htmlFor="email" error={errors.email} required>
                    <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            className="border-gray-200 py-2 pr-4 pl-10 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </FormField>

                <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Sending reset link..."
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                    Send Reset Link
                </LoadingButton>
            </form>

            <div className="mt-4 border-t border-gray-100 pt-4 text-center">
                <p className="text-xs text-gray-600">
                    Remember your password?{' '}
                    <Link
                        href="/developers/login"
                        className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </>
    );
}
