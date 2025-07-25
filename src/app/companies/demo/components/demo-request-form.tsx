'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Briefcase,
    Building2,
    Calendar,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock,
    Mail,
    Shield,
    User,
    Users,
} from 'lucide-react';
import { FormField } from '@/components/client/common/form-field';
import { LoadingButton } from '@/components/client/common/loading-button';
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
import { Textarea } from '@/components/ui/textarea';
import { useFormValidation } from '@/hooks/form/use-form-validation';
import { demoRequestSchema, type DemoRequestFormType } from '@/lib/validations';

const steps = [
    { id: 1, title: 'Contact Info', icon: User },
    { id: 2, title: 'Company Details', icon: Building2 },
    { id: 3, title: 'Interests', icon: Briefcase },
    { id: 4, title: 'Review', icon: Check },
];

export function DemoRequestForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
    const [formData, setFormData] = useState<DemoRequestFormType>({
        businessEmail: '',
        firstName: '',
        lastName: '',
        companyName: '',
        jobTitle: '',
        companySize: '',
        country: '',
        interests: [],
        additionalInfo: '',
        agreeToTerms: false,
    });

    const { errors, validate, validateField, clearErrors } = useFormValidation(demoRequestSchema);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate(formData)) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Demo request submitted');
        } catch (error) {
            console.error('Demo request failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFieldChange = (field: keyof DemoRequestFormType, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);

        // Only validate if field has been touched or if we're validating the entire form
        if (touchedFields.has(field)) {
            validateField(field, value, newData);
        }
    };

    const handleFieldBlur = (field: keyof DemoRequestFormType) => {
        setTouchedFields((prev) => new Set(prev).add(field));
        validateField(field, formData[field as keyof DemoRequestFormType], formData);
    };

    const handleInterestChange = (interest: string, checked: boolean) => {
        const newInterests = checked
            ? [...formData.interests, interest]
            : formData.interests.filter((i) => i !== interest);
        handleFieldChange('interests', newInterests);

        // Mark interests as touched when user interacts with it
        if (!touchedFields.has('interests')) {
            setTouchedFields((prev) => new Set(prev).add('interests'));
        }
    };

    const nextStep = () => {
        // Validate current step before proceeding
        const currentStepFields = getCurrentStepFields();
        const allFieldsValid = validateCurrentStep(currentStepFields);

        if (allFieldsValid) {
            if (currentStep < steps.length) {
                setCurrentStep(currentStep + 1);
                // Clear errors when moving to next step
                clearErrors();
            }
        }
    };

    const getCurrentStepFields = () => {
        switch (currentStep) {
            case 1:
                return ['businessEmail', 'firstName', 'lastName'];
            case 2:
                return ['companyName', 'jobTitle', 'companySize', 'country'];
            case 3:
                return ['interests'];
            default:
                return [];
        }
    };

    const validateCurrentStep = (fields: string[]) => {
        // Mark all fields in current step as touched
        setTouchedFields((prev) => new Set([...prev, ...fields]));

        // Validate the current step data
        const stepData = fields.reduce((acc, field) => {
            (acc as any)[field] = formData[field as keyof DemoRequestFormType];
            return acc;
        }, {} as Partial<DemoRequestFormType>);

        try {
            // Create a partial schema for current step
            const stepSchema = demoRequestSchema.pick(
                fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
            );
            stepSchema.parse(stepData);
            return true;
        } catch (error) {
            if (error instanceof Error) {
                // Update errors for current step fields
                validate(formData);
            }
            return false;
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            clearErrors();
        }
    };

    const canProceed = () => {
        const currentStepFields = getCurrentStepFields();
        const hasAllRequiredFields = currentStepFields.every((field) => {
            const value = formData[field as keyof DemoRequestFormType];
            if (field === 'interests') {
                return Array.isArray(value) && value.length > 0;
            }
            return value && value.toString().trim().length > 0;
        });

        const hasNoErrors = currentStepFields.every((field) => !errors[field]);

        return hasAllRequiredFields && hasNoErrors;
    };

    const getFieldStatus = (fieldName: string) => {
        const isTouched = touchedFields.has(fieldName);
        const hasError = errors[fieldName];
        const hasValue = formData[fieldName as keyof DemoRequestFormType];

        if (isTouched && hasError) return 'error';
        if (isTouched && hasValue && !hasError) return 'success';
        return 'default';
    };

    const companySizes = [
        { value: '1-10', label: '1-10 employees' },
        { value: '11-50', label: '11-50 employees' },
        { value: '51-200', label: '51-200 employees' },
        { value: '201-1000', label: '201-1000 employees' },
        { value: '1000+', label: '1000+ employees' },
    ];

    const countries = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
        { value: 'other', label: 'Other' },
    ];

    const interests = [
        'Skills Assessment',
        'Interview Platform',
        'Team Analytics',
        'API Integration',
    ];

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Contact Information
                        </h3>

                        <FormField
                            label="Business Email"
                            htmlFor="businessEmail"
                            error={
                                touchedFields.has('businessEmail')
                                    ? errors.businessEmail
                                    : undefined
                            }
                            required
                        >
                            <div className="relative">
                                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                <Input
                                    id="businessEmail"
                                    type="email"
                                    placeholder="your.email@company.com"
                                    value={formData.businessEmail}
                                    onChange={(e) =>
                                        handleFieldChange('businessEmail', e.target.value)
                                    }
                                    onBlur={() => handleFieldBlur('businessEmail')}
                                    className={`border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)] ${
                                        getFieldStatus('businessEmail') === 'success'
                                            ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                                            : ''
                                    }`}
                                    required
                                />
                                {getFieldStatus('businessEmail') === 'success' && (
                                    <Check className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-green-500" />
                                )}
                            </div>
                        </FormField>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                label="First Name"
                                htmlFor="firstName"
                                error={
                                    touchedFields.has('firstName') ? errors.firstName : undefined
                                }
                                required
                            >
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="firstName"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={(e) =>
                                            handleFieldChange('firstName', e.target.value)
                                        }
                                        onBlur={() => handleFieldBlur('firstName')}
                                        className={`border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)] ${
                                            getFieldStatus('firstName') === 'success'
                                                ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                                                : ''
                                        }`}
                                        required
                                    />
                                    {getFieldStatus('firstName') === 'success' && (
                                        <Check className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-green-500" />
                                    )}
                                </div>
                            </FormField>
                            <FormField
                                label="Last Name"
                                htmlFor="lastName"
                                error={touchedFields.has('lastName') ? errors.lastName : undefined}
                                required
                            >
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="lastName"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={(e) =>
                                            handleFieldChange('lastName', e.target.value)
                                        }
                                        onBlur={() => handleFieldBlur('lastName')}
                                        className={`border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)] ${
                                            getFieldStatus('lastName') === 'success'
                                                ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                                                : ''
                                        }`}
                                        required
                                    />
                                    {getFieldStatus('lastName') === 'success' && (
                                        <Check className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-green-500" />
                                    )}
                                </div>
                            </FormField>
                        </div>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Company Details
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                label="Company Name"
                                htmlFor="companyName"
                                error={
                                    touchedFields.has('companyName')
                                        ? errors.companyName
                                        : undefined
                                }
                                required
                            >
                                <div className="relative">
                                    <Building2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="companyName"
                                        placeholder="Acme Corp"
                                        value={formData.companyName}
                                        onChange={(e) =>
                                            handleFieldChange('companyName', e.target.value)
                                        }
                                        onBlur={() => handleFieldBlur('companyName')}
                                        className={`border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)] ${
                                            getFieldStatus('companyName') === 'success'
                                                ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                                                : ''
                                        }`}
                                        required
                                    />
                                    {getFieldStatus('companyName') === 'success' && (
                                        <Check className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-green-500" />
                                    )}
                                </div>
                            </FormField>
                            <FormField
                                label="Job Title"
                                htmlFor="jobTitle"
                                error={touchedFields.has('jobTitle') ? errors.jobTitle : undefined}
                                required
                            >
                                <div className="relative">
                                    <Briefcase className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="jobTitle"
                                        placeholder="Engineering Manager"
                                        value={formData.jobTitle}
                                        onChange={(e) =>
                                            handleFieldChange('jobTitle', e.target.value)
                                        }
                                        onBlur={() => handleFieldBlur('jobTitle')}
                                        className={`border-gray-300 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)] ${
                                            getFieldStatus('jobTitle') === 'success'
                                                ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                                                : ''
                                        }`}
                                        required
                                    />
                                    {getFieldStatus('jobTitle') === 'success' && (
                                        <Check className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-green-500" />
                                    )}
                                </div>
                            </FormField>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                label="Company Size"
                                htmlFor="companySize"
                                error={
                                    touchedFields.has('companySize')
                                        ? errors.companySize
                                        : undefined
                                }
                                required
                            >
                                <div className="relative">
                                    <Users className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Select
                                        value={formData.companySize}
                                        onValueChange={(value) => {
                                            handleFieldChange('companySize', value);
                                            handleFieldBlur('companySize');
                                        }}
                                    >
                                        <SelectTrigger
                                            className={`border-gray-300 bg-white pl-10 text-gray-900 ${
                                                getFieldStatus('companySize') === 'success'
                                                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                                                    : ''
                                            }`}
                                        >
                                            <SelectValue placeholder="Select size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {companySizes.map((size) => (
                                                <SelectItem key={size.value} value={size.value}>
                                                    {size.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {getFieldStatus('companySize') === 'success' && (
                                        <Check className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-green-500" />
                                    )}
                                </div>
                            </FormField>
                            <FormField
                                label="Country"
                                htmlFor="country"
                                error={touchedFields.has('country') ? errors.country : undefined}
                                required
                            >
                                <Select
                                    value={formData.country}
                                    onValueChange={(value) => {
                                        handleFieldChange('country', value);
                                        handleFieldBlur('country');
                                    }}
                                >
                                    <SelectTrigger
                                        className={`border-gray-300 bg-white text-gray-900 ${
                                            getFieldStatus('country') === 'success'
                                                ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                                                : ''
                                        }`}
                                    >
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem key={country.value} value={country.value}>
                                                {country.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormField>
                        </div>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            What interests you?
                        </h3>

                        <FormField
                            label="Which CodeCraft products are you interested in?"
                            htmlFor="interests"
                            error={touchedFields.has('interests') ? errors.interests : undefined}
                            required
                        >
                            <div className="grid grid-cols-2 gap-3">
                                {interests.map((interest) => (
                                    <div key={interest} className="flex items-center space-x-3">
                                        <Checkbox
                                            id={interest}
                                            checked={formData.interests.includes(interest)}
                                            onCheckedChange={(checked) =>
                                                handleInterestChange(interest, checked as boolean)
                                            }
                                            className="border-gray-300 data-[state=checked]:border-[rgb(148,242,127)] data-[state=checked]:bg-[rgb(148,242,127)]"
                                        />
                                        <Label
                                            htmlFor={interest}
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            {interest}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            {getFieldStatus('interests') === 'success' && (
                                <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
                                    <Check className="h-4 w-4" />
                                    <span>Great! You&apos;ve selected your interests</span>
                                </div>
                            )}
                        </FormField>

                        <FormField
                            label="Additional Information (Optional)"
                            htmlFor="additionalInfo"
                        >
                            <Textarea
                                id="additionalInfo"
                                placeholder="Tell us about your hiring challenges..."
                                value={formData.additionalInfo}
                                onChange={(e) =>
                                    handleFieldChange('additionalInfo', e.target.value)
                                }
                                className="min-h-[80px] border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)]"
                            />
                        </FormField>
                    </motion.div>
                );

            case 4:
                return (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                            Review & Submit
                        </h3>

                        <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Name:</span>
                                    <p className="font-medium">
                                        {formData.firstName} {formData.lastName}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Email:</span>
                                    <p className="font-medium">{formData.businessEmail}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Company:</span>
                                    <p className="font-medium">{formData.companyName}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Role:</span>
                                    <p className="font-medium">{formData.jobTitle}</p>
                                </div>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Interests:</span>
                                <p className="text-sm font-medium">
                                    {formData.interests.join(', ')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="terms"
                                checked={formData.agreeToTerms}
                                onCheckedChange={(checked) =>
                                    handleFieldChange('agreeToTerms', checked)
                                }
                                className="mt-1 border-gray-300 data-[state=checked]:border-[rgb(148,242,127)] data-[state=checked]:bg-[rgb(148,242,127)]"
                                required
                            />
                            <Label
                                htmlFor="terms"
                                className="text-sm leading-relaxed text-gray-600"
                            >
                                I agree to the{' '}
                                <Link
                                    href="#"
                                    className="font-medium text-[rgb(148,242,127)] hover:underline"
                                >
                                    Privacy Policy
                                </Link>{' '}
                                and{' '}
                                <Link
                                    href="#"
                                    className="font-medium text-[rgb(148,242,127)] hover:underline"
                                >
                                    Terms of Service
                                </Link>
                            </Label>
                        </div>
                        {errors.agreeToTerms && (
                            <p className="animate-fade-in text-sm text-red-600">
                                {errors.agreeToTerms}
                            </p>
                        )}
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            {/* Progress Bar */}
            <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                                    currentStep >= step.id
                                        ? 'bg-[rgb(148,242,127)] text-white'
                                        : 'bg-gray-200 text-gray-500'
                                }`}
                            >
                                {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`mx-2 h-1 w-12 ${
                                        currentStep > step.id
                                            ? 'bg-[rgb(148,242,127)]'
                                            : 'bg-gray-200'
                                    }`}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-center text-sm text-gray-600">
                    Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
                </p>
            </div>

            {/* Trust indicators */}
            <div className="mb-6 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Shield className="h-3 w-3 text-[rgb(148,242,127)]" />
                    <span>Secure & confidential</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Clock className="h-3 w-3 text-[rgb(148,242,127)]" />
                    <span>Demo within 24 hours</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-between">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 transition-colors hover:text-gray-900"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span>Previous</span>
                        </button>
                    )}

                    {currentStep < steps.length ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className="ml-auto flex items-center space-x-2 rounded-lg bg-[rgb(148,242,127)] px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-[rgb(148,242,127)]/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span>Next</span>
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    ) : (
                        <LoadingButton
                            type="submit"
                            isLoading={isLoading}
                            loadingText="Scheduling..."
                            disabled={!formData.agreeToTerms}
                            className="ml-auto bg-[rgb(148,242,127)] font-semibold text-gray-900 hover:bg-[rgb(148,242,127)]/90"
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Demo
                        </LoadingButton>
                    )}
                </div>
            </form>
        </>
    );
}
