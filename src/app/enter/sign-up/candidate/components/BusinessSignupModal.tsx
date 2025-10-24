'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Eye, EyeOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface BusinessSignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}

export default function BusinessSignupModal({ isOpen, onClose, email }: BusinessSignupModalProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        password: '',
        companyName: '',
        companyDomain: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: Implement API call to register business user
        console.log('Business signup:', { email, ...formData });

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            router.push('/companies/dashboard');
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative h-[90vh] w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors hover:bg-gray-100"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="grid h-full grid-cols-1 lg:grid-cols-[60%_40%]">
                            {/* Left Side - Form */}
                            <div className="overflow-y-auto p-8">
                                <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold text-gray-900">
                                            Start reviewing applications in less than 24 hours.
                                        </h2>
                                        <p className="mt-2 text-gray-600">
                                            First time on DJ? Get 25% off your first job post.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Email (pre-filled) */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                disabled
                                                className="bg-gray-50"
                                            />
                                        </div>

                                        {/* Full Name */}
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">Full Name</Label>
                                            <Input
                                                id="fullName"
                                                type="text"
                                                placeholder="John Doe"
                                                value={formData.fullName}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        fullName: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-2">
                                            <Label htmlFor="password">New password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Create a strong password"
                                                    value={formData.password}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            password: e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Company Name */}
                                        <div className="space-y-2">
                                            <Label htmlFor="companyName">Company Name</Label>
                                            <div className="relative">
                                                <Building2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                                <Input
                                                    id="companyName"
                                                    type="text"
                                                    placeholder="ACME"
                                                    value={formData.companyName}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            companyName: e.target.value,
                                                        })
                                                    }
                                                    className="pl-10"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Company Domain */}
                                        <div className="space-y-2">
                                            <Label htmlFor="companyDomain">Company Domain</Label>
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-10 items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    https://
                                                </span>
                                                <Input
                                                    id="companyDomain"
                                                    type="text"
                                                    placeholder="example.com"
                                                    value={formData.companyDomain}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            companyDomain: e.target.value,
                                                        })
                                                    }
                                                    className="flex-1 rounded-l-none"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Terms and Conditions */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Switch
                                                    id="terms"
                                                    checked={agreeToTerms}
                                                    onCheckedChange={(checked) =>
                                                        setAgreeToTerms(checked)
                                                    }
                                                    className="flex-shrink-0"
                                                />
                                                <label
                                                    htmlFor="terms-agreement"
                                                    className="text-muted-foreground cursor-pointer text-sm leading-relaxed"
                                                >
                                                    I agree with Devchef&apos;s{' '}
                                                    <a
                                                        href="/terms-of-service"
                                                        className="text-primary hover:text-primary/80 underline transition-colors"
                                                    >
                                                        terms of service
                                                    </a>{' '}
                                                    and{' '}
                                                    <a
                                                        href="/privacy-policy"
                                                        className="text-primary hover:text-primary/80 underline transition-colors"
                                                    >
                                                        privacy policy
                                                    </a>
                                                    .
                                                </label>
                                            </div>

                                            <p className="text-xs text-gray-500">
                                                This site is protected by reCAPTCHA and the Google{' '}
                                                <a
                                                    href="/privacy"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    privacy policy
                                                </a>{' '}
                                                and{' '}
                                                <a
                                                    href="/terms"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    terms of service
                                                </a>{' '}
                                                apply.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-8 flex items-center justify-end gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={onClose}
                                            disabled={isSubmitting}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={!agreeToTerms || isSubmitting}
                                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                        >
                                            {isSubmitting ? 'Creating Account...' : 'Continue'}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Right Side - Animated Benefits */}
                            <div className="hidden overflow-y-auto bg-gradient-to-br from-yellow-400 to-orange-500 lg:block">
                                <div className="flex h-full flex-col justify-center p-12">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <h3 className="mb-12 text-3xl font-bold text-white">
                                            Join 500+ companies hiring top talent
                                        </h3>
                                    </motion.div>

                                    {/* Stats */}
                                    <div className="mb-12 grid grid-cols-2 gap-6">
                                        {[
                                            { number: '10K+', label: 'Candidates' },
                                            { number: '500+', label: 'Companies' },
                                            { number: '24hr', label: 'Avg Response' },
                                            { number: '95%', label: 'Satisfaction' },
                                        ].map((stat, index) => (
                                            <motion.div
                                                key={stat.label}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    delay: index * 0.1,
                                                    duration: 0.5,
                                                }}
                                                className="rounded-xl bg-white/20 p-4 backdrop-blur-sm"
                                            >
                                                <div className="text-3xl font-bold text-white">
                                                    {stat.number}
                                                </div>
                                                <div className="text-sm text-white/90">
                                                    {stat.label}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Company Logos - Animated */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.6 }}
                                    >
                                        <p className="mb-6 text-center text-sm font-semibold text-white">
                                            Trusted by
                                        </p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                'AUTOMATTIC',
                                                'clevertech',
                                                'TinySeed',
                                                'APPSUMO',
                                            ].map((company, index) => (
                                                <motion.div
                                                    key={company}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{
                                                        delay: 0.9 + index * 0.1,
                                                        duration: 0.5,
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex items-center justify-center rounded-lg bg-white/20 px-4 py-3 backdrop-blur-sm transition-all"
                                                >
                                                    <span className="text-sm font-bold text-white">
                                                        {company}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
