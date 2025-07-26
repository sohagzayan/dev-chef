'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle, Mail, Shield } from 'lucide-react';
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

export function RecruiterForgotPasswordForm() {
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
                userType: 'recruiter',
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
                        'This email is registered as a candidate. Please use the candidate form.';
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
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 text-center"
            >
                {/* Success Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg"
                >
                    <CheckCircle className="h-8 w-8 text-white" />
                </motion.div>

                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl font-bold text-gray-900"
                >
                    Check your email
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-sm leading-relaxed text-gray-600"
                >
                    We&apos;ve sent a secure password reset link to{' '}
                    <span className="font-semibold text-gray-900">{formData.email}</span>
                </motion.p>

                {/* Security Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="rounded-lg border border-blue-100 bg-blue-50 p-3"
                >
                    <div className="flex items-start space-x-2">
                        <Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                        <div className="text-left">
                            <p className="text-xs font-medium text-blue-900">Security Notice</p>
                            <p className="mt-1 text-xs text-blue-700">
                                The reset link expires in 15 minutes. Check your spam folder if you
                                don&apos;t see it.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="space-y-2"
                >
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-xs text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                    >
                        Didn&apos;t receive the email? Try again
                    </button>

                    <Link
                        href="/companies/login"
                        className="inline-flex items-center space-x-2 text-xs text-gray-600 transition-colors hover:text-gray-900"
                    >
                        <ArrowRight className="h-3 w-3" />
                        <span>Back to login</span>
                    </Link>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3"
                >
                    <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <FormField label="Work Email" htmlFor="email" error={errors.email} required>
                        <div className="group relative">
                            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 transition-colors group-focus-within:text-blue-500" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="your.email@company.com"
                                value={formData.email}
                                onChange={(e) => handleFieldChange('email', e.target.value)}
                                className="border-gray-200 py-2 pr-4 pl-10 text-gray-900 transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </FormField>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <LoadingButton
                        type="submit"
                        isLoading={isLoading}
                        loadingText="Sending secure reset link..."
                        disabled={isLoading}
                        className="w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-2 font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 hover:shadow-xl active:scale-[0.98]"
                    >
                        Send Reset Link
                    </LoadingButton>
                </motion.div>
            </form>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-4 border-t border-gray-100 pt-4 text-center"
            >
                <p className="text-xs text-gray-600">
                    Remember your password?{' '}
                    <Link
                        href="/companies/login"
                        className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    );
}
