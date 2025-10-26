'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, ChevronDown, Eye, EyeOff, Tag, X } from 'lucide-react';
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
        selectedCategory: '',
        additionalCategories: [] as string[],
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
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
    const [additionalCategoryInputs, setAdditionalCategoryInputs] = useState<string[]>(['']);
    const [showAdditionalCategoryDropdowns, setShowAdditionalCategoryDropdowns] = useState<
        boolean[]
    >([]);
    const [filteredAdditionalCategories, setFilteredAdditionalCategories] = useState<string[][]>(
        [],
    );
    const router = useRouter();

    // Comprehensive list of job categories based on the provided images
    const jobCategories = useMemo(
        () => [
            // Admin/Virtual Assistant Group
            'Admin and Virtual Assistant',
            'Admin, Virtual Assistant and Executive Assistant',
            'Admin, Virtual Assistant and General Administration',
            'Virtual Assistant',

            // Business Development/Sales Group
            'Business Development and Sales',
            'Business Development, Sales and Account Management',
            'Sales',

            // Community Manager Group
            'Community Manager',

            // Crypto Group
            'Crypto, Web3 and Blockchain',
            'Crypto Data and Analysis',
            'Crypto Development',
            'Crypto Finance',
            'Crypto Marketing',
            'Crypto Ops and Management',
            'Crypto Product',
            'Crypto Sales and Support',

            // Customer Support Group
            'Customer Support',

            // Data Analysis Group
            'Data Analyst',
            'Data Analyst and Business Analysis',
            'Data Analyst and Data Analysis',

            // Design Group
            'Design',
            'Design and Graphic Design',
            'Design, UI/UX Design and Web Design',

            // Developer/Engineer Group
            'Developer and Engineer',
            'Developer, Engineer and Back-end',
            'Developer, Engineer and Dev-Ops',
            'Developer, Engineer and Front-end',
            'Developer, Engineer and Full-Stack',
            'Developer, Engineer and System Admin',

            // E-Commerce Group
            'E-Commerce',

            // Finance/Accounting Group
            'Finance and Accounting',
            'Accounting',
            'Finance, Accounting and Bookkeeper',

            // HR/Recruiter Group
            'HR and Recruiter',
            'HR, Recruiter and Human Resources',
            'HR, Recruiter, Recruiter and Talent Sourcing',

            // Management/Operations Group
            'Management and Operations',
            'Management, Operations and Business Manager',
            'Management, Operations and Operations Manager',
            'Management, Operations and Project Manager',
            'Management, Operations, Supply Chain and Logistics',

            // Marketing Group
            'Marketing',
            'Marketing and Email Marketing',
            'Marketing and General Digital Marketing',
            'Marketing and Social Media',

            // Multimedia Production Group
            'Multimedia Production',
            'Multimedia Production and Audio',
            'Multimedia Production and Motion Design',
            'Multimedia Production and Multimedia Content Creator',
            'Multimedia Production and Producer',
            'Multimedia Production and Video',

            // Paid Ads/PPC Group
            'Paid Ads and PPC',
            'Paid Ads, PPC and Amazon PPC',
            'Paid Ads, PPC and Facebook Ads',
            'Paid Ads, PPC and Google Ads',
            'Paid Ads, PPC and Instagram Ads',
            'Paid Ads, PPC and YouTube Ads',

            // Product Group
            'Product',
            'Product Design',
            'Product Engineer',
            'Product Management',

            // SEO/Content Marketing Group
            'SEO and Content Marketing',
            'SEO, Content Marketing and Content Management',
            'SEO, Content Marketing and Link Building',
            'SEO, Content Marketing, On Page and Off Page',
            'SEO, Content Marketing and Technical SEO',

            // Teaching/Coaching Group
            'Teacher and Coach',

            // Technical Support Group
            'Technical Support',

            // Writing/Editing Group
            'Writing and Editing',
            'Writing, Editing and Copywriting',
            'Editing',
            'Writing, Editing and Journalism',
            'Writing, Editing and SEO Writing',
        ],
        [],
    );

    useEffect(() => {
        if (onStepChange) {
            onStepChange(step);
        }
    }, [step, onStepChange]);

    // Filter categories based on input
    useEffect(() => {
        if (categoryInput.trim() === '') {
            setFilteredCategories(jobCategories);
        } else {
            const filtered = jobCategories.filter((category) =>
                category.toLowerCase().includes(categoryInput.toLowerCase()),
            );
            setFilteredCategories(filtered);
        }
    }, [categoryInput, jobCategories]);

    // Initialize dropdown arrays when inputs change
    useEffect(() => {
        setShowAdditionalCategoryDropdowns(new Array(additionalCategoryInputs.length).fill(false));
        setFilteredAdditionalCategories(additionalCategoryInputs.map(() => jobCategories));
    }, [additionalCategoryInputs, jobCategories]);

    // Handle category input focus
    const handleCategoryFocus = () => {
        setShowCategoryDropdown(true);
        setFilteredCategories(jobCategories);
    };

    // Handle category input blur
    const handleCategoryBlur = () => {
        // Delay hiding dropdown to allow for clicks
        setTimeout(() => {
            setShowCategoryDropdown(false);

            // If user has manually typed extra text after a selection, clear it
            if (formData.selectedCategory && categoryInput !== formData.selectedCategory) {
                // Check if the input contains the selected category plus extra text
                if (
                    categoryInput.startsWith(formData.selectedCategory) &&
                    categoryInput.length > formData.selectedCategory.length
                ) {
                    setCategoryInput(formData.selectedCategory);
                } else if (!categoryInput.startsWith(formData.selectedCategory)) {
                    // If user typed something completely different, clear the selection
                    setFormData((prev) => ({
                        ...prev,
                        selectedCategory: '',
                    }));
                }
            }
        }, 200);
    };

    // Handle category selection
    const handleCategorySelect = (category: string) => {
        setFormData((prev) => ({
            ...prev,
            selectedCategory: category,
        }));
        setCategoryInput(category);
        setShowCategoryDropdown(false);
    };

    // Handle additional categories input change
    const handleAdditionalCategoryInputChange = (index: number, value: string) => {
        const newInputs = [...additionalCategoryInputs];
        newInputs[index] = value;
        setAdditionalCategoryInputs(newInputs);

        // Update filtered categories for this specific input
        const newFiltered = [...filteredAdditionalCategories];
        if (value.trim() === '') {
            newFiltered[index] = jobCategories;
        } else {
            newFiltered[index] = jobCategories.filter((category) =>
                category.toLowerCase().includes(value.toLowerCase()),
            );
        }
        setFilteredAdditionalCategories(newFiltered);

        // Show dropdown for this input
        const newDropdowns = [...showAdditionalCategoryDropdowns];
        newDropdowns[index] = true;
        setShowAdditionalCategoryDropdowns(newDropdowns);
    };

    // Handle additional category input focus
    const handleAdditionalCategoryFocus = (index: number) => {
        const newDropdowns = [...showAdditionalCategoryDropdowns];
        newDropdowns[index] = true;
        setShowAdditionalCategoryDropdowns(newDropdowns);

        // Ensure filtered categories are set for this input
        const newFiltered = [...filteredAdditionalCategories];
        if (!newFiltered[index] || newFiltered[index].length === 0) {
            newFiltered[index] = jobCategories;
            setFilteredAdditionalCategories(newFiltered);
        }
    };

    // Handle additional category input blur
    const handleAdditionalCategoryBlur = (index: number) => {
        setTimeout(() => {
            const newDropdowns = [...showAdditionalCategoryDropdowns];
            newDropdowns[index] = false;
            setShowAdditionalCategoryDropdowns(newDropdowns);
        }, 200);
    };

    // Handle additional category selection
    const handleAdditionalCategorySelect = (index: number, category: string) => {
        // Add to selected categories if not already selected
        if (!formData.additionalCategories.includes(category)) {
            setFormData((prev) => ({
                ...prev,
                additionalCategories: [...prev.additionalCategories, category],
            }));

            // Clear this input field
            const newInputs = [...additionalCategoryInputs];
            newInputs[index] = '';
            setAdditionalCategoryInputs(newInputs);
        }

        // Hide dropdown for this input
        const newDropdowns = [...showAdditionalCategoryDropdowns];
        newDropdowns[index] = false;
        setShowAdditionalCategoryDropdowns(newDropdowns);
    };

    // Handle adding a new input field
    const handleAddCategoryInput = () => {
        if (additionalCategoryInputs.length < 4) {
            setAdditionalCategoryInputs([...additionalCategoryInputs, '']);
        }
    };

    // Handle remove additional category
    const handleRemoveAdditionalCategory = (category: string, index: number) => {
        // Remove from selected categories
        setFormData((prev) => ({
            ...prev,
            additionalCategories: prev.additionalCategories.filter((c) => c !== category),
        }));

        // Remove this input field
        const newInputs = additionalCategoryInputs.filter((_, i) => i !== index);
        setAdditionalCategoryInputs(newInputs);

        // Clean up dropdown states
        const newDropdowns = showAdditionalCategoryDropdowns.filter((_, i) => i !== index);
        setShowAdditionalCategoryDropdowns(newDropdowns);

        // Clean up filtered categories
        const newFiltered = filteredAdditionalCategories.filter((_, i) => i !== index);
        setFilteredAdditionalCategories(newFiltered);
    };

    // Handle category input change
    const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCategoryInput(value);
        setShowCategoryDropdown(true);

        // Don't clear selected category when user is typing extra text after selection
        // Only clear if user types something completely different from the start
        if (value !== formData.selectedCategory && !value.startsWith(formData.selectedCategory)) {
            setFormData((prev) => ({
                ...prev,
                selectedCategory: '',
            }));
        }
    };

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
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
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
                                <CardHeader className="pb-2 pl-0">
                                    <CardTitle className="text-base font-bold">
                                        Choose your job preferences
                                    </CardTitle>
                                    <CardDescription>
                                        Receive email alerts the moment a job is posted. Never miss
                                        another remote opportunity.
                                    </CardDescription>
                                </CardHeader>

                                <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        {/* Category Input with Dropdown */}
                                        <div className="relative space-y-2">
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="Type to search for category..."
                                                    value={
                                                        formData.selectedCategory || categoryInput
                                                    }
                                                    onChange={handleCategoryInputChange}
                                                    onFocus={handleCategoryFocus}
                                                    onBlur={handleCategoryBlur}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            if (filteredCategories.length > 0) {
                                                                handleCategorySelect(
                                                                    filteredCategories[0],
                                                                );
                                                            }
                                                        }
                                                    }}
                                                    className="rounded-lg border-gray-200 bg-white pr-10 shadow-sm focus:border-green-400 focus:ring-green-400"
                                                />
                                                <ChevronDown className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                            </div>

                                            {/* Dropdown */}
                                            {showCategoryDropdown && (
                                                <div
                                                    className="absolute z-50 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
                                                    onMouseDown={(e) => e.preventDefault()} // Prevent input blur when clicking dropdown
                                                >
                                                    <div className="max-h-60 overflow-y-auto">
                                                        {filteredCategories.length > 0 ? (
                                                            filteredCategories.map((category) => (
                                                                <div
                                                                    key={category}
                                                                    className="cursor-pointer border-b border-gray-100 px-4 py-3 text-sm text-gray-700 last:border-b-0 hover:bg-gray-50"
                                                                    onClick={() =>
                                                                        handleCategorySelect(
                                                                            category,
                                                                        )
                                                                    }
                                                                    onMouseDown={(e) =>
                                                                        e.preventDefault()
                                                                    } // Prevent input blur
                                                                >
                                                                    {category}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-4 py-3 text-sm text-gray-500">
                                                                Nothing found.
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Category Info */}
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">
                                                Select your primary job category to receive relevant
                                                alerts:
                                            </p>
                                            {formData.selectedCategory && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-green-600">
                                                        ✓ {formData.selectedCategory}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Additional Categories Section */}
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-600">
                                                Want to receive alerts from multiple categories?
                                                Select up to 4 other areas of interest:
                                            </p>

                                            {/* Individual Category Input Fields */}
                                            <div className="space-y-2">
                                                {additionalCategoryInputs.map(
                                                    (inputValue, index) => {
                                                        const category =
                                                            formData.additionalCategories[index];
                                                        const isSelected = !!category;

                                                        return (
                                                            <div key={index} className="relative">
                                                                <div className="relative flex items-center gap-2">
                                                                    <Input
                                                                        type="text"
                                                                        placeholder="Type to search for category..."
                                                                        value={
                                                                            category || inputValue
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleAdditionalCategoryInputChange(
                                                                                index,
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                        onFocus={() =>
                                                                            handleAdditionalCategoryFocus(
                                                                                index,
                                                                            )
                                                                        }
                                                                        onBlur={() =>
                                                                            handleAdditionalCategoryBlur(
                                                                                index,
                                                                            )
                                                                        }
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === 'Enter') {
                                                                                e.preventDefault();
                                                                                if (
                                                                                    filteredAdditionalCategories[
                                                                                        index
                                                                                    ]?.length > 0
                                                                                ) {
                                                                                    handleAdditionalCategorySelect(
                                                                                        index,
                                                                                        filteredAdditionalCategories[
                                                                                            index
                                                                                        ][0],
                                                                                    );
                                                                                }
                                                                            }
                                                                        }}
                                                                        className="flex-1 rounded-lg border-gray-200 bg-white pr-10 shadow-sm focus:border-green-400 focus:ring-green-400"
                                                                        readOnly={isSelected}
                                                                    />
                                                                    {category && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleRemoveAdditionalCategory(
                                                                                    category,
                                                                                    index,
                                                                                )
                                                                            }
                                                                            className="rounded p-1 hover:bg-red-50"
                                                                        >
                                                                            <X className="h-4 w-4 text-gray-400 hover:text-red-600" />
                                                                        </button>
                                                                    )}
                                                                </div>

                                                                {/* Dropdown for this input */}
                                                                {showAdditionalCategoryDropdowns[
                                                                    index
                                                                ] &&
                                                                    filteredAdditionalCategories[
                                                                        index
                                                                    ]?.length > 0 && (
                                                                        <div
                                                                            className="absolute z-50 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
                                                                            onMouseDown={(e) =>
                                                                                e.preventDefault()
                                                                            }
                                                                        >
                                                                            <div className="max-h-60 overflow-y-auto">
                                                                                {filteredAdditionalCategories[
                                                                                    index
                                                                                ]
                                                                                    ?.filter(
                                                                                        (cat) =>
                                                                                            !formData.additionalCategories.includes(
                                                                                                cat,
                                                                                            ),
                                                                                    )
                                                                                    .map((cat) => (
                                                                                        <div
                                                                                            key={
                                                                                                cat
                                                                                            }
                                                                                            className="cursor-pointer border-b border-gray-100 px-4 py-3 text-sm text-gray-700 last:border-b-0 hover:bg-gray-50"
                                                                                            onClick={() =>
                                                                                                handleAdditionalCategorySelect(
                                                                                                    index,
                                                                                                    cat,
                                                                                                )
                                                                                            }
                                                                                            onMouseDown={(
                                                                                                e,
                                                                                            ) =>
                                                                                                e.preventDefault()
                                                                                            }
                                                                                        >
                                                                                            {cat}
                                                                                        </div>
                                                                                    ))}

                                                                                {filteredAdditionalCategories[
                                                                                    index
                                                                                ]?.length === 0 && (
                                                                                    <div className="px-4 py-3 text-sm text-gray-500">
                                                                                        Nothing
                                                                                        found.
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>

                                            {/* Add Category Button (Full Width) */}
                                            {additionalCategoryInputs.length < 4 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={handleAddCategoryInput}
                                                    className="w-full text-sm"
                                                >
                                                    + add category
                                                </Button>
                                            )}
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

                                            <div className="flex w-full items-center justify-between">
                                                {/* Frequency Selector - Green Design */}
                                                <div className="flex flex-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setFormData({
                                                                ...formData,
                                                                alertFrequency: 'daily',
                                                            })
                                                        }
                                                        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                                                            formData.alertFrequency === 'daily'
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-transparent text-gray-600 hover:text-gray-900'
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
                                                        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                                                            formData.alertFrequency === 'weekly'
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-transparent text-gray-600 hover:text-gray-900'
                                                        }`}
                                                    >
                                                        Weekly
                                                    </button>
                                                </div>

                                                {/* Subscription Toggle - Orange Design */}
                                                <div className="ml-6 flex items-center gap-2">
                                                    <Label className="text-sm text-gray-900">
                                                        Subscribed
                                                    </Label>
                                                    <Switch
                                                        checked={formData.jobAlertsSubscribed}
                                                        onCheckedChange={(checked) =>
                                                            setFormData({
                                                                ...formData,
                                                                jobAlertsSubscribed: checked,
                                                            })
                                                        }
                                                        className="data-[state=checked]:bg-orange-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <Button
                                                    type="button"
                                                    variant="link"
                                                    className="px-0 text-xs text-gray-600 underline"
                                                >
                                                    Send me the 1st email now
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Instant Alerts */}
                                        <div className="space-y-4 pt-4">
                                            <div className="flex w-full items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold">
                                                        Instant Alerts
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Instantly receive alerts for jobs for which
                                                        you are a strong candidate.
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Label className="text-sm font-semibold text-gray-900">
                                                        Subscribed
                                                    </Label>
                                                    <Switch
                                                        checked={formData.instantAlertsSubscribed}
                                                        onCheckedChange={(checked) =>
                                                            setFormData({
                                                                ...formData,
                                                                instantAlertsSubscribed: checked,
                                                            })
                                                        }
                                                        className="data-[state=checked]:bg-orange-500"
                                                    />
                                                </div>
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
