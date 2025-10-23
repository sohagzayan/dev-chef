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
    Shield,
    User,
    Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function BusinessSignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [agreeToMarketing, setAgreeToMarketing] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4">
            <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Left Side - Sign Up Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center"
                >
                    <Card className="w-full max-w-md border-0 bg-white/80 shadow-xl backdrop-blur-sm">
                        <CardHeader className="pb-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-blue-600">
                                <Building2 className="h-8 w-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                Create Business Account
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                Start hiring remote talent and building your distributed team
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="firstName"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            First Name
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                            <Input
                                                id="firstName"
                                                placeholder="John"
                                                className="h-12 pl-10 text-base"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="lastName"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            Last Name
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                            <Input
                                                id="lastName"
                                                placeholder="Doe"
                                                className="h-12 pl-10 text-base"
                                            />
                                        </div>
                                    </div>
                                </div>

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
                                            placeholder="john@company.com"
                                            className="h-12 pl-10 text-base"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Company Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Company Information
                                </h3>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="companyName"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Company Name
                                    </Label>
                                    <div className="relative">
                                        <Building2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        <Input
                                            id="companyName"
                                            placeholder="Your Company Inc."
                                            className="h-12 pl-10 text-base"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">
                                        Company Size
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Select company size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-10">1-10 employees</SelectItem>
                                            <SelectItem value="11-50">11-50 employees</SelectItem>
                                            <SelectItem value="51-200">51-200 employees</SelectItem>
                                            <SelectItem value="201-500">
                                                201-500 employees
                                            </SelectItem>
                                            <SelectItem value="500+">500+ employees</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">
                                        Industry
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="Select industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tech">Technology</SelectItem>
                                            <SelectItem value="finance">Finance</SelectItem>
                                            <SelectItem value="healthcare">Healthcare</SelectItem>
                                            <SelectItem value="education">Education</SelectItem>
                                            <SelectItem value="retail">Retail</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Security</h3>

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
                                            placeholder="Create a strong password"
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

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="confirmPassword"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm your password"
                                            className="h-12 pr-10 pl-10 text-base"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="space-y-4">
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="terms"
                                        checked={agreeToTerms}
                                        onCheckedChange={setAgreeToTerms}
                                        className="mt-1"
                                    />
                                    <Label
                                        htmlFor="terms"
                                        className="text-sm leading-relaxed text-gray-600"
                                    >
                                        I agree to the{' '}
                                        <Link
                                            href="/terms"
                                            className="font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            href="/privacy"
                                            className="font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </Label>
                                </div>

                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="marketing"
                                        checked={agreeToMarketing}
                                        onCheckedChange={setAgreeToMarketing}
                                        className="mt-1"
                                    />
                                    <Label
                                        htmlFor="marketing"
                                        className="text-sm leading-relaxed text-gray-600"
                                    >
                                        I'd like to receive marketing emails and updates about new
                                        features
                                    </Label>
                                </div>
                            </div>

                            {/* Sign Up Button */}
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    size="lg"
                                    className="h-12 w-full bg-gradient-to-r from-green-600 to-blue-600 text-base font-semibold hover:from-green-700 hover:to-blue-700"
                                    disabled={!agreeToTerms}
                                >
                                    Create Business Account
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>

                            {/* Divider */}
                            <div className="relative">
                                <Separator className="my-6" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-white px-4 text-sm text-gray-500">
                                        or sign up with
                                    </span>
                                </div>
                            </div>

                            {/* Social Sign Up */}
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

                            {/* Login Link */}
                            <div className="pt-4 text-center">
                                <p className="text-gray-600">
                                    Already have a business account?{' '}
                                    <Link
                                        href="/enter/login/business"
                                        className="font-medium text-blue-600 hover:text-blue-800"
                                    >
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Right Side - Benefits */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center"
                >
                    <div className="space-y-8">
                        <div>
                            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                                Start Building Your Remote Team Today
                            </h2>
                            <p className="text-lg text-gray-600">
                                Join the future of work with our comprehensive business platform
                                designed for remote-first companies.
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
                                        Free Trial
                                    </h3>
                                    <p className="text-gray-600">
                                        Start with a 14-day free trial. No credit card required.
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
                                        Unlimited Job Postings
                                    </h3>
                                    <p className="text-gray-600">
                                        Post as many jobs as you need to find the perfect
                                        candidates.
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
                                        Advanced Analytics
                                    </h3>
                                    <p className="text-gray-600">
                                        Track your hiring metrics and optimize your recruitment
                                        process.
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
                                    <Shield className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        Secure & Compliant
                                    </h3>
                                    <p className="text-gray-600">
                                        Enterprise-grade security with compliance tools for global
                                        hiring.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="rounded-lg bg-white/60 p-6 backdrop-blur-sm"
                        >
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                Trusted by Leading Companies
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">10K+</div>
                                    <div className="text-sm text-gray-600">Companies</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">50K+</div>
                                    <div className="text-sm text-gray-600">Successful Hires</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">95%</div>
                                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                                    <div className="text-sm text-gray-600">Support</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
