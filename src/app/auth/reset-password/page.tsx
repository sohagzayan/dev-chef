'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Eye, EyeOff, Lock, XCircle } from 'lucide-react';
import { AuthCard } from '@/components/client/layout/auth-card';
import { AuthLayout } from '@/components/client/layout/auth-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ResetPasswordForm {
    password: string;
    confirmPassword: string;
}

interface ValidationState {
    hasMinLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    passwordsMatch: boolean;
}

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [form, setForm] = useState<ResetPasswordForm>({
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [tokenValid, setTokenValid] = useState<boolean | null>(null);

    const [validation, setValidation] = useState<ValidationState>({
        hasMinLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
        passwordsMatch: false,
    });

    // Validate password requirements
    useEffect(() => {
        const password = form.password;
        setValidation({
            hasMinLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            passwordsMatch: password === form.confirmPassword && password.length > 0,
        });
    }, [form.password, form.confirmPassword]);

    // Validate token on component mount
    useEffect(() => {
        if (!token) {
            setTokenValid(false);
            setError('Invalid reset link. Please request a new password reset.');
            return;
        }

        validateToken();
    }, [token]);

    const validateToken = async () => {
        try {
            const response = await fetch('/api/auth/verify-reset-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (response.ok) {
                setTokenValid(true);
            } else {
                const data = await response.json();
                setTokenValid(false);
                setError(
                    data.error ||
                        'Invalid or expired reset link. Please request a new password reset.',
                );
            }
        } catch (error) {
            setTokenValid(false);
            setError('Failed to validate reset link. Please try again.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Check if all validations pass
        const allValid = Object.values(validation).every(Boolean);
        if (!allValid) {
            setError('Please ensure all password requirements are met.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    password: form.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            } else {
                setError(data.error || 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange =
        (field: keyof ResetPasswordForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
            setError(null);
        };

    if (tokenValid === false) {
        return (
            <AuthLayout variant="default" backLink="/forgot-password">
                <div className="w-full max-w-md">
                    <AuthCard
                        icon={XCircle}
                        title="Invalid Reset Link"
                        subtitle="The password reset link is invalid or has expired"
                    >
                        <div className="space-y-4">
                            <div className="text-center">
                                <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
                                <p className="text-muted-600 mb-4">{error}</p>
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/forgot-password">Request New Reset Link</Link>
                            </Button>
                        </div>
                    </AuthCard>
                </div>
            </AuthLayout>
        );
    }

    if (success) {
        return (
            <AuthLayout variant="default" backLink="/">
                <div className="w-full max-w-md">
                    <AuthCard
                        icon={CheckCircle}
                        title="Password Reset Successfully"
                        subtitle="Your password has been updated successfully"
                    >
                        <div className="space-y-4">
                            <div className="text-center">
                                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
                                <p className="text-muted-600 mb-4">
                                    You will be redirected to the login page shortly.
                                </p>
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/">Go to Login</Link>
                            </Button>
                        </div>
                    </AuthCard>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout variant="default" backLink="/forgot-password">
            <div className="w-full max-w-md">
                <AuthCard
                    icon={Lock}
                    title="Reset Your Password"
                    subtitle="Enter your new password below"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-lg border border-red-200 bg-red-50 p-3"
                            >
                                <p className="text-sm text-red-600">{error}</p>
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={handleInputChange('password')}
                                    placeholder="Enter your new password"
                                    className="pr-10"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-muted-400 hover:text-muted-600 absolute top-1/2 right-3 -translate-y-1/2 transform"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={form.confirmPassword}
                                    onChange={handleInputChange('confirmPassword')}
                                    placeholder="Confirm your new password"
                                    className="pr-10"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="text-muted-400 hover:text-muted-600 absolute top-1/2 right-3 -translate-y-1/2 transform"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        <Card className="bg-gray-50">
                            <CardContent className="p-4">
                                <h4 className="mb-3 text-sm font-medium text-gray-700">
                                    Password Requirements
                                </h4>
                                <div className="space-y-2">
                                    <div
                                        className={`flex items-center text-sm ${validation.hasMinLength ? 'text-green-600' : 'text-gray-500'}`}
                                    >
                                        {validation.hasMinLength ? (
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                        ) : (
                                            <XCircle className="mr-2 h-4 w-4" />
                                        )}
                                        At least 8 characters
                                    </div>
                                    <div
                                        className={`flex items-center text-sm ${validation.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}
                                    >
                                        {validation.hasUppercase ? (
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                        ) : (
                                            <XCircle className="mr-2 h-4 w-4" />
                                        )}
                                        One uppercase letter
                                    </div>
                                    <div
                                        className={`flex items-center text-sm ${validation.hasLowercase ? 'text-green-600' : 'text-gray-500'}`}
                                    >
                                        {validation.hasLowercase ? (
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                        ) : (
                                            <XCircle className="mr-2 h-4 w-4" />
                                        )}
                                        One lowercase letter
                                    </div>
                                    <div
                                        className={`flex items-center text-sm ${validation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}
                                    >
                                        {validation.hasNumber ? (
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                        ) : (
                                            <XCircle className="mr-2 h-4 w-4" />
                                        )}
                                        One number
                                    </div>
                                    <div
                                        className={`flex items-center text-sm ${validation.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}
                                    >
                                        {validation.hasSpecialChar ? (
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                        ) : (
                                            <XCircle className="mr-2 h-4 w-4" />
                                        )}
                                        One special character
                                    </div>
                                    <div
                                        className={`flex items-center text-sm ${validation.passwordsMatch ? 'text-green-600' : 'text-gray-500'}`}
                                    >
                                        {validation.passwordsMatch ? (
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                        ) : (
                                            <XCircle className="mr-2 h-4 w-4" />
                                        )}
                                        Passwords match
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading || !Object.values(validation).every(Boolean)}
                        >
                            {isLoading ? 'Resetting Password...' : 'Reset Password'}
                        </Button>

                        <div className="text-center">
                            <p className="text-muted-500 text-xs">
                                Remember your password?{' '}
                                <Link href="/" className="text-primary hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </AuthCard>
            </div>
        </AuthLayout>
    );
}
