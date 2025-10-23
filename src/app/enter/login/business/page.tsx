'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Briefcase,
    Building2,
    CheckCircle,
    Eye,
    EyeOff,
    Globe,
    Lock,
    Mail,
    Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function BusinessLoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Left Side - Login Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center"
                >
                    <Card className="w-full max-w-md border-0 bg-white/80 shadow-xl backdrop-blur-sm">
                        <CardHeader className="pb-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600">
                                <Building2 className="h-8 w-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                Business Login
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Sign in to your business account to manage your team and post jobs
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Business Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@company.com"
                                        className="h-12 pl-10 text-base"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className="h-12 pr-10 pl-10 text-base"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={rememberMe}
                                        onCheckedChange={setRememberMe}
                                    />
                                    <Label htmlFor="remember" className="text-sm text-gray-600">
                                        Remember me
                                    </Label>
                                </div>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    size="lg"
                                    className="h-12 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-base font-semibold hover:from-blue-700 hover:to-indigo-700"
                                >
                                    Sign In
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>

                            {/* Divider */}
                            <div className="relative">
                                <Separator className="my-6" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-white px-4 text-sm text-gray-500">
                                        or continue with
                                    </span>
                                </div>
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    className="h-12 border-gray-300 hover:bg-gray-50"
                                >
                                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-12 border-gray-300 hover:bg-gray-50"
                                >
                                    <svg
                                        className="mr-2 h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                                    </svg>
                                    LinkedIn
                                </Button>
                            </div>

                            {/* Sign Up Link */}
                            <div className="pt-4 text-center">
                                <p className="text-gray-600">
                                    Don't have a business account?{' '}
                                    <Link
                                        href="/enter/sign-up/business"
                                        className="font-medium text-blue-600 hover:text-blue-800"
                                    >
                                        Sign up here
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Right Side - Features */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center"
                >
                    <div className="space-y-8">
                        <div>
                            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                                Why Choose Our Business Platform?
                            </h2>
                            <p className="text-lg text-gray-600">
                                Join thousands of companies that trust us to help them find the best
                                remote talent.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex items-start gap-4"
                            >
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        Verified Talent Pool
                                    </h3>
                                    <p className="text-gray-600">
                                        Access pre-vetted professionals who excel in remote work
                                        environments.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex items-start gap-4"
                            >
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        Team Management
                                    </h3>
                                    <p className="text-gray-600">
                                        Manage your team, track performance, and collaborate
                                        seamlessly.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="flex items-start gap-4"
                            >
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                                    <Briefcase className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        Advanced Job Posting
                                    </h3>
                                    <p className="text-gray-600">
                                        Create compelling job posts with our advanced tools and
                                        templates.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="flex items-start gap-4"
                            >
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                                    <Globe className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        Global Reach
                                    </h3>
                                    <p className="text-gray-600">
                                        Connect with talent from around the world, 24/7
                                        availability.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="grid grid-cols-3 gap-6 pt-8"
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">10K+</div>
                                <div className="text-sm text-gray-600">Companies</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">50K+</div>
                                <div className="text-sm text-gray-600">Remote Jobs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">95%</div>
                                <div className="text-sm text-gray-600">Success Rate</div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
