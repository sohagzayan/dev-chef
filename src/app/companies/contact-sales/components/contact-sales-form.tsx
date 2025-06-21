'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, Building2, Calendar, Mail, User, Users } from 'lucide-react';
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
import { useFormValidation } from '@/hooks/form/use-form-validation';
import {
    contactSalesSchema,
    type ContactSalesForm as ContactSalesFormType,
} from '@/lib/validations';

export function ContactSalesForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<ContactSalesFormType>({
        businessEmail: '',
        firstName: '',
        lastName: '',
        companyName: '',
        jobTitle: '',
        companySize: '',
        country: '',
        interests: [],
        agreeToTerms: false,
    });

    const { errors, validate, validateField } = useFormValidation(contactSalesSchema);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate(formData)) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Contact sales request submitted');
        } catch (error) {
            console.error('Contact sales request failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFieldChange = (field: keyof ContactSalesFormType, value: any) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        validateField(field, value, newData);
    };

    const handleInterestChange = (interest: string, checked: boolean) => {
        const newInterests = checked
            ? [...formData.interests, interest]
            : formData.interests.filter((i) => i !== interest);
        handleFieldChange('interests', newInterests);
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
        { value: 'au', label: 'Australia' },
        { value: 'other', label: 'Other' },
    ];

    const interests = [
        'Skills Assessment',
        'Interview Platform',
        'Team Analytics',
        'API Integration',
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8"
        >
            <div className="mb-8">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">Schedule a Demo</h2>
                <p className="text-gray-600">
                    Fill out the form below and well be in touch within 24 hours.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    label="Business Email*"
                    htmlFor="businessEmail"
                    error={errors.businessEmail}
                    required
                >
                    <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            id="businessEmail"
                            type="email"
                            placeholder="your.email@company.com"
                            value={formData.businessEmail}
                            onChange={(e) => handleFieldChange('businessEmail', e.target.value)}
                            className="border-gray-300 bg-white pl-10 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)]"
                            required
                        />
                    </div>
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="First Name*"
                        htmlFor="firstName"
                        error={errors.firstName}
                        required
                    >
                        <div className="relative">
                            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) => handleFieldChange('firstName', e.target.value)}
                                className="border-gray-300 bg-white pl-10 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)]"
                                required
                            />
                        </div>
                    </FormField>

                    <FormField
                        label="Last Name*"
                        htmlFor="lastName"
                        error={errors.lastName}
                        required
                    >
                        <div className="relative">
                            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) => handleFieldChange('lastName', e.target.value)}
                                className="border-gray-300 bg-white pl-10 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)]"
                                required
                            />
                        </div>
                    </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Company Name*"
                        htmlFor="companyName"
                        error={errors.companyName}
                        required
                    >
                        <div className="relative">
                            <Building2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="companyName"
                                placeholder="Acme Corp"
                                value={formData.companyName}
                                onChange={(e) => handleFieldChange('companyName', e.target.value)}
                                className="border-gray-300 bg-white pl-10 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)]"
                                required
                            />
                        </div>
                    </FormField>

                    <FormField
                        label="Job Title*"
                        htmlFor="jobTitle"
                        error={errors.jobTitle}
                        required
                    >
                        <div className="relative">
                            <Briefcase className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                id="jobTitle"
                                placeholder="Engineering Manager"
                                value={formData.jobTitle}
                                onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
                                className="border-gray-300 bg-white pl-10 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)]"
                                required
                            />
                        </div>
                    </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Company Size*"
                        htmlFor="companySize"
                        error={errors.companySize}
                        required
                    >
                        <div className="relative">
                            <Users className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Select
                                value={formData.companySize}
                                onValueChange={(value) => handleFieldChange('companySize', value)}
                            >
                                <SelectTrigger className="border-gray-300 bg-white pl-10 text-gray-900 shadow-sm">
                                    <SelectValue placeholder="Please select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {companySizes.map((size) => (
                                        <SelectItem key={size.value} value={size.value}>
                                            {size.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </FormField>

                    <FormField label="Country*" htmlFor="country" error={errors.country} required>
                        <Select
                            value={formData.country}
                            onValueChange={(value) => handleFieldChange('country', value)}
                        >
                            <SelectTrigger className="border-gray-300 bg-white text-gray-900 shadow-sm">
                                <SelectValue placeholder="Please select..." />
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

                <FormField
                    label="Which CodeCraft products are you interested in?*"
                    htmlFor="interests"
                    error={errors.interests}
                    required
                >
                    <div className="space-y-3">
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
                                <Label htmlFor={interest} className="font-normal text-gray-700">
                                    {interest}
                                </Label>
                            </div>
                        ))}
                    </div>
                </FormField>

                <div className="space-y-4">
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
                        <Label htmlFor="terms" className="text-sm leading-relaxed text-gray-600">
                            By clicking Schedule a demo below you confirm that you have read and
                            agree to CodeCrafts{' '}
                            <Link href="#" className="text-[rgb(148,242,127)] hover:underline">
                                Privacy Policy
                            </Link>
                        </Label>
                    </div>
                    {errors.agreeToTerms && (
                        <p className="animate-fade-in text-sm text-[#f75353]">
                            {errors.agreeToTerms}
                        </p>
                    )}
                </div>

                <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Scheduling Demo..."
                    disabled={!formData.agreeToTerms}
                    className="w-full"
                >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a demo
                </LoadingButton>
            </form>
        </motion.div>
    );
}
