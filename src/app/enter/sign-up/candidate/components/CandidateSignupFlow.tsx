'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { DollarSign, Eye, EyeOff, Tag, User, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CandidateSignupFlowProps {
    email: string;
    onClose: () => void;
}

type Step = 'info' | 'skills' | 'salary';

export default function CandidateSignupFlow({ email, onClose }: CandidateSignupFlowProps) {
    const [step, setStep] = useState<Step>('info');
    const [formData, setFormData] = useState({
        fullName: '',
        password: '',
        skills: [] as string[],
        salaryPeriod: 'year' as 'year' | 'month' | 'hour',
        salaryFrom: '',
        salaryTo: '',
        hideSalary: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [skillInput, setSkillInput] = useState('');
    const [salaryInput, setSalaryInput] = useState('');
    const router = useRouter();

    const handleInfoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.fullName && formData.password && agreeToTerms) {
            setStep('skills');
        }
    };

    const handleSkillsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.skills.length >= 3) {
            setStep('salary');
        }
    };

    const handleAddSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData({
                ...formData,
                skills: [...formData.skills, skillInput.trim()],
            });
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skill: string) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((s) => s !== skill),
        });
    };

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: Implement API call to register candidate
        console.log('Candidate signup:', { email, ...formData });

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            router.push('/profile/complete');
        }, 1000);
    };

    const handleSalaryPeriodChange = (period: 'year' | 'month' | 'hour') => {
        setFormData({ ...formData, salaryPeriod: period });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors hover:bg-gray-100"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="p-8">
                    {/* Step 1: Profile Information */}
                    {step === 'info' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <CardHeader className="pb-6">
                                <CardTitle className="text-2xl font-bold">
                                    Create New Candidate Account
                                </CardTitle>
                                <CardDescription>
                                    Please check above email is correct!
                                </CardDescription>
                            </CardHeader>

                            <form onSubmit={handleInfoSubmit} className="space-y-6">
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

                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, fullName: e.target.value })
                                        }
                                        required
                                    />
                                </div>

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

                                <div className="flex items-center gap-3">
                                    <Switch
                                        className="flex-shrink-0"
                                        id="terms"
                                        checked={agreeToTerms}
                                        onCheckedChange={(checked) => setAgreeToTerms(checked)}
                                    />
                                    <Label
                                        htmlFor="terms"
                                        className="cursor-pointer text-sm leading-relaxed"
                                    >
                                        I agree with&nbsp;Dynamite&nbsp;Jobs'{' '}
                                        <a
                                            href="/terms"
                                            className="whitespace-nowrap text-blue-600 hover:underline"
                                        >
                                            terms of service
                                        </a>{' '}
                                        and{' '}
                                        <a
                                            href="/privacy"
                                            className="whitespace-nowrap text-blue-600 hover:underline"
                                        >
                                            privacy policy
                                        </a>
                                        .
                                    </Label>
                                </div>

                                <p className="text-xs text-gray-500">
                                    This site is protected by reCAPTCHA and the Google{' '}
                                    <a
                                        href="/privacy"
                                        className="whitespace-nowrap text-blue-600 hover:underline"
                                    >
                                        privacy policy
                                    </a>{' '}
                                    and{' '}
                                    <a
                                        href="/terms"
                                        className="whitespace-nowrap text-blue-600 hover:underline"
                                    >
                                        terms of service
                                    </a>{' '}
                                    apply.
                                </p>

                                <div className="flex items-center justify-between pt-4">
                                    <Button type="button" variant="outline" onClick={onClose}>
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={!agreeToTerms}
                                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {/* Step 2: Skills */}
                    {step === 'skills' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <CardHeader className="pb-6">
                                <CardTitle className="text-2xl font-bold">
                                    Preferred skills
                                </CardTitle>
                                <CardDescription>
                                    Select at least 3 skills you have that will help us match you to
                                    employers.
                                </CardDescription>
                            </CardHeader>

                            <form onSubmit={handleSkillsSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    {formData.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {formData.skills.map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="secondary"
                                                    className="flex items-center gap-2 px-3 py-1"
                                                >
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSkill(skill)}
                                                        className="ml-1 hover:text-red-600"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Tag className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                type="text"
                                                placeholder="Type to search for a skill"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddSkill();
                                                    }
                                                }}
                                                className="pl-10"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={handleAddSkill}
                                            variant="outline"
                                        >
                                            Add
                                        </Button>
                                    </div>

                                    {formData.skills.length < 3 && (
                                        <p className="text-sm text-gray-500">
                                            Add at least {3 - formData.skills.length} more skill
                                            {3 - formData.skills.length !== 1 ? 's' : ''} to
                                            continue.
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep('info')}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={formData.skills.length < 3}
                                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {/* Step 3: Expected Salary */}
                    {step === 'salary' && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <CardHeader className="pb-6">
                                <CardTitle className="text-2xl font-bold">
                                    Expected Salary
                                </CardTitle>
                                <CardDescription>
                                    Candidates who make their expected salary public are more likely
                                    to be contacted by employers. You can change these numbers or
                                    make them private at any time.
                                </CardDescription>
                            </CardHeader>

                            <form onSubmit={handleFinalSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <Tabs
                                        value={formData.salaryPeriod}
                                        onValueChange={(value) =>
                                            handleSalaryPeriodChange(
                                                value as 'year' | 'month' | 'hour',
                                            )
                                        }
                                    >
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="year">Per Year</TabsTrigger>
                                            <TabsTrigger value="month">Per Month</TabsTrigger>
                                            <TabsTrigger value="hour">Per Hour</TabsTrigger>
                                        </TabsList>
                                    </Tabs>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Yearly From</Label>
                                            <div className="relative">
                                                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                                                    $
                                                </span>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    value={formData.salaryFrom}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            salaryFrom: e.target.value,
                                                        })
                                                    }
                                                    className="pr-12 pl-8"
                                                />
                                                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                                                    USD
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>To (optional)</Label>
                                            <div className="relative">
                                                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                                                    $
                                                </span>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    value={formData.salaryTo}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            salaryTo: e.target.value,
                                                        })
                                                    }
                                                    className="pr-12 pl-8"
                                                />
                                                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                                                    USD
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="hideSalary"
                                            checked={formData.hideSalary}
                                            onCheckedChange={(checked) =>
                                                setFormData({
                                                    ...formData,
                                                    hideSalary: checked as boolean,
                                                })
                                            }
                                        />
                                        <Label htmlFor="hideSalary">
                                            Hide salary from companies
                                        </Label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep('skills')}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                    >
                                        {isSubmitting ? 'Creating Account...' : 'Next'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
