'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Briefcase, Mail, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BusinessSignupModal from './components/BusinessSignupModal';
import CandidateSignupFlow from './components/CandidateSignupFlow';

type UserType = 'candidate' | 'business';

export default function CandidateSignUpPage() {
    const [userType, setUserType] = useState<UserType>('candidate');
    const [email, setEmail] = useState('');
    const [showBusinessModal, setShowBusinessModal] = useState(false);
    const [showCandidateFlow, setShowCandidateFlow] = useState(false);
    const router = useRouter();

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        if (userType === 'business') {
            setShowBusinessModal(true);
        } else {
            setShowCandidateFlow(true);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
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
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                Sign Up -{' '}
                                {userType === 'business' ? 'For Employers' : 'For Candidates'}
                            </CardTitle>
                            <CardDescription className="text-gray-600">
                                {userType === 'business'
                                    ? 'Hiring remote candidates.'
                                    : 'Looking for a remote job.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Role Toggle */}
                            <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
                                <button
                                    onClick={() => setUserType('business')}
                                    className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                                        userType === 'business'
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <Briefcase className="h-4 w-4" />
                                    I'm a Business
                                </button>
                                <button
                                    onClick={() => setUserType('candidate')}
                                    className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                                        userType === 'candidate'
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    <UserPlus className="h-4 w-4" />
                                    I'm a Candidate
                                </button>
                            </div>

                            {/* Email Input */}
                            <form onSubmit={handleEmailSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="jane@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-12 text-base"
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => router.push('/enter/login/business')}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="h-12 bg-gradient-to-r from-orange-500 to-red-500 px-6 text-base font-semibold hover:from-orange-600 hover:to-red-600"
                                    >
                                        {userType === 'business' ? 'Next' : 'Sign Up'}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Right Side - Testimonials */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center"
                >
                    <Card className="w-full max-w-md border-0 bg-gradient-to-br from-orange-500 to-red-500 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-white">
                                Just hired at Dynamite Jobs!
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-white/20 backdrop-blur-sm" />
                                    <div>
                                        <p className="font-semibold text-white">Noah Kagan</p>
                                        <p className="text-sm text-white/90">
                                            the founder of AppSumo, hired a Video Editor.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-white/20 backdrop-blur-sm" />
                                    <div>
                                        <p className="font-semibold text-white">Marlene Pitocco</p>
                                        <p className="text-sm text-white/90">
                                            the Head of HR at Empire Flippers, hired 3 Business
                                            Development Reps.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-white/20 backdrop-blur-sm" />
                                    <div>
                                        <p className="font-semibold text-white">Aura C</p>
                                        <p className="text-sm text-white/90">
                                            an Operations Leader at the Wifi Tribe, hired 2 Chapter
                                            Hosts.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Business Signup Modal */}
            <BusinessSignupModal
                isOpen={showBusinessModal}
                onClose={() => setShowBusinessModal(false)}
                email={email}
            />

            {/* Candidate Signup Flow */}
            <AnimatePresence>
                {showCandidateFlow && (
                    <CandidateSignupFlow
                        email={email}
                        onClose={() => setShowCandidateFlow(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
