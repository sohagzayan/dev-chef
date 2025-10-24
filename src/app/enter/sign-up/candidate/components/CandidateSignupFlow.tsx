'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, Eye, EyeOff, Tag, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CandidateSignupFlowProps {
    email: string;
    onClose: () => void;
    onStepChange?: (step: 'info' | 'preferences' | 'skills' | 'salary') => void;
}

type Step = 'info' | 'preferences' | 'skills' | 'salary';

export default function CandidateSignupFlow({
    email,
    onClose,
    onStepChange,
}: CandidateSignupFlowProps) {
    const [step, setStep] = useState<Step>('info');
    const [formData, setFormData] = useState({
        fullName: '',
        password: '',
        categories: [] as string[],
        alertFrequency: 'weekly' as 'daily' | 'weekly',
        jobAlertsSubscribed: true,
        instantAlertsSubscribed: true,
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
    const [categoryInput, setCategoryInput] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (onStepChange) {
            onStepChange(step);
        }
    }, [step, onStepChange]);

    const handleInfoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: string[] = [];

        if (formData.fullName.length < 3) {
            newErrors.push('Full Name must be at least 3 characters');
        }

        if (formData.password.length < 8) {
            newErrors.push('Password must be at least 8 characters');
        }

        if (!agreeToTerms) {
            newErrors.push('You must agree with mentioned terms and policy');
        }

        setErrors(newErrors);

        if (newErrors.length === 0) {
            setStep('preferences');
        }
    };

    const handlePreferencesSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('skills');
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

    const handleAddCategory = () => {
        if (
            categoryInput.trim() &&
            !formData.categories.includes(categoryInput.trim()) &&
            formData.categories.length < 5
        ) {
            setFormData({
                ...formData,
                categories: [...formData.categories, categoryInput.trim()],
            });
            setCategoryInput('');
        }
    };

    const handleRemoveCategory = (category: string) => {
        setFormData({
            ...formData,
            categories: formData.categories.filter((c) => c !== category),
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
        <div className="flex w-full flex-col items-center">
            {step === 'preferences' && (
                <div className="mb-8 flex justify-center pt-12">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                            <span className="text-xl font-bold text-white">D</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-800">DevChef</span>
                    </div>
                </div>
            )}
            <Card className="mx-auto w-full max-w-xl border-0 bg-white/80 shadow-xl backdrop-blur-sm">
                <div className={step === 'preferences' ? '' : 'max-h-[90vh] overflow-y-auto'}>
                    <div className="px-6 py-0">
                        {/* Step 1: Profile Information */}
                        {step === 'info' && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <CardHeader className="px-0 pb-0">
                                    <CardTitle className="text-sm font-bold text-gray-800">
                                        Create New Candidate Account
                                    </CardTitle>
                                </CardHeader>

                                <form onSubmit={handleInfoSubmit} className="space-y-6">
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <div className="absolute top-1/2 left-3 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-gray-200" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                disabled
                                                onClick={onClose}
                                                className="cursor-pointer rounded-full border-0 bg-gray-100 py-3 pr-4 pl-12 text-sm font-medium shadow-sm"
                                            />
                                            <p className="absolute right-0 -bottom-5 text-xs text-gray-500">
                                                Please check above email is correct!
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.fullName}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    fullName: e.target.value,
                                                });
                                                setErrors([]);
                                            }}
                                            className={
                                                errors.some((e) => e.includes('Full Name'))
                                                    ? 'border-red-500 focus:border-red-500'
                                                    : ''
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
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        password: e.target.value,
                                                    });
                                                    setErrors([]);
                                                }}
                                                className={
                                                    errors.some((e) => e.includes('Password'))
                                                        ? 'border-red-500 focus:border-red-500'
                                                        : ''
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
                                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                        >
                                            Continue
                                        </Button>
                                    </div>

                                    {errors.length > 0 && (
                                        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                                                <div className="flex-1">
                                                    <h4 className="mb-2 font-semibold text-red-800">
                                                        There were some errors
                                                    </h4>
                                                    <ul className="space-y-1">
                                                        {errors.map((error, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-sm text-red-700"
                                                            >
                                                                • {error}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </motion.div>
                        )}

                        {/* Step 2: Job Preferences */}
                        {step === 'preferences' && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <CardHeader className="pb-6">
                                    <CardTitle className="text-2xl font-bold">
                                        Choose your job preferences
                                    </CardTitle>
                                    <CardDescription>
                                        Receive email alerts the moment a job is posted. Never miss
                                        another remote opportunity.
                                    </CardDescription>
                                </CardHeader>

                                <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        {/* Category Input */}
                                        <div className="space-y-2">
                                            <Input
                                                type="text"
                                                placeholder="Type to search for category..."
                                                value={categoryInput}
                                                onChange={(e) => setCategoryInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddCategory();
                                                    }
                                                }}
                                            />
                                        </div>

                                        {/* Selected Categories */}
                                        {formData.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {formData.categories.map((category) => (
                                                    <Badge
                                                        key={category}
                                                        variant="secondary"
                                                        className="flex items-center gap-2 px-3 py-1"
                                                    >
                                                        {category}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoveCategory(category)
                                                            }
                                                            className="ml-1 hover:text-red-600"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}

                                        {/* Add Category Info */}
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">
                                                Want to receive alerts from multiple categories?
                                                Select up to 4 other areas of interest:
                                            </p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleAddCategory}
                                                disabled={formData.categories.length >= 5}
                                                className="text-sm"
                                            >
                                                + add category
                                            </Button>
                                        </div>

                                        {/* Job Alerts Settings */}
                                        <div className="space-y-4 pt-4">
                                            <h3 className="text-lg font-semibold">
                                                Job Alerts settings
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Change the frequency to daily (weekly) or pause
                                                these alerts if you found your dream job.
                                            </p>

                                            <div className="flex items-center gap-4">
                                                <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setFormData({
                                                                ...formData,
                                                                alertFrequency: 'daily',
                                                            })
                                                        }
                                                        className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                                                            formData.alertFrequency === 'daily'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'text-gray-600 hover:text-gray-900'
                                                        }`}
                                                    >
                                                        Daily
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setFormData({
                                                                ...formData,
                                                                alertFrequency: 'weekly',
                                                            })
                                                        }
                                                        className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                                                            formData.alertFrequency === 'weekly'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'text-gray-600 hover:text-gray-900'
                                                        }`}
                                                    >
                                                        Weekly
                                                    </button>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Label className="text-sm">Subscribed</Label>
                                                    <Switch
                                                        checked={formData.jobAlertsSubscribed}
                                                        onCheckedChange={(checked) =>
                                                            setFormData({
                                                                ...formData,
                                                                jobAlertsSubscribed: checked,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <Button
                                                type="button"
                                                variant="link"
                                                className="px-0 text-sm"
                                            >
                                                Send me the 1st email now
                                            </Button>
                                        </div>

                                        {/* Instant Alerts */}
                                        <div className="space-y-4 pt-4">
                                            <h3 className="text-lg font-semibold">
                                                Instant Alerts
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Instantly receive alerts for jobs for which you are
                                                a strong candidate.
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <Label className="text-sm">Subscribed</Label>
                                                <Switch
                                                    checked={formData.instantAlertsSubscribed}
                                                    onCheckedChange={(checked) =>
                                                        setFormData({
                                                            ...formData,
                                                            instantAlertsSubscribed: checked,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
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
                                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* Step 3: Skills */}
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
                                        Select at least 3 skills you have that will help us match
                                        you to employers.
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

                        {/* Step 4: Expected Salary */}
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
                                        Candidates who make their expected salary public are more
                                        likely to be contacted by employers. You can change these
                                        numbers or make them private at any time.
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
                </div>
            </Card>
            {step === 'preferences' && <div className="pb-12" />}
        </div>
    );
}
