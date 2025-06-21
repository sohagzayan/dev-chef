'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
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
import { Textarea } from '@/components/ui/textarea';
import { useFormValidation } from '@/hooks/form/use-form-validation';
import { demoRequestSchema, type DemoRequestFormType } from '@/lib/validations';

export function DemoRequestForm() {
    const [isLoading, setIsLoading] = useState(false);
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

    const { errors, validate, validateField } = useFormValidation(demoRequestSchema);

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFieldChange = (field: keyof DemoRequestFormType, value: any) => {
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
        { value: 'other', label: 'Other' },
    ];

    const interests = [
        'Skills Assessment',
        'Interview Platform',
        'Team Analytics',
        'API Integration',
    ];

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                    label="Business Email"
                    htmlFor="businessEmail"
                    error={errors.businessEmail}
                    required
                >
                    <div className="relative">
                        <Mail className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                        <Input
                            id="businessEmail"
                            type="email"
                            placeholder="your.email@company.com"
                            value={formData.businessEmail}
                            onChange={(e) => handleFieldChange('businessEmail', e.target.value)}
                            className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
                            required
                        />
                    </div>
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="First Name"
                        htmlFor="firstName"
                        error={errors.firstName}
                        required
                    >
                        <div className="relative">
                            <User className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                            <Input
                                id="firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) => handleFieldChange('firstName', e.target.value)}
                                className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
                                required
                            />
                        </div>
                    </FormField>
                    <FormField
                        label="Last Name"
                        htmlFor="lastName"
                        error={errors.lastName}
                        required
                    >
                        <div className="relative">
                            <User className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) => handleFieldChange('lastName', e.target.value)}
                                className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
                                required
                            />
                        </div>
                    </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Company Name"
                        htmlFor="companyName"
                        error={errors.companyName}
                        required
                    >
                        <div className="relative">
                            <Building2 className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                            <Input
                                id="companyName"
                                placeholder="Acme Corp"
                                value={formData.companyName}
                                onChange={(e) => handleFieldChange('companyName', e.target.value)}
                                className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
                                required
                            />
                        </div>
                    </FormField>
                    <FormField
                        label="Job Title"
                        htmlFor="jobTitle"
                        error={errors.jobTitle}
                        required
                    >
                        <div className="relative">
                            <Briefcase className="text-muted-500 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                            <Input
                                id="jobTitle"
                                placeholder="Engineering Manager"
                                value={formData.jobTitle}
                                onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
                                className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 border-white/20 bg-white/5 pl-10 text-white"
                                required
                            />
                        </div>
                    </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Company Size"
                        htmlFor="companySize"
                        error={errors.companySize}
                        required
                    >
                        <div className="relative">
                            <Users className="text-muted-500 absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 transform" />
                            <Select
                                value={formData.companySize}
                                onValueChange={(value) => handleFieldChange('companySize', value)}
                            >
                                <SelectTrigger className="border-white/20 bg-white/5 pl-10 text-white">
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
                        </div>
                    </FormField>
                    <FormField label="Country" htmlFor="country" error={errors.country} required>
                        <Select
                            value={formData.country}
                            onValueChange={(value) => handleFieldChange('country', value)}
                        >
                            <SelectTrigger className="border-white/20 bg-white/5 text-white">
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

                <FormField
                    label="Which CodeCraft products are you interested in?"
                    htmlFor="interests"
                    error={errors.interests}
                    required
                >
                    <div className="grid grid-cols-2 gap-2">
                        {interests.map((interest) => (
                            <div key={interest} className="flex items-center space-x-2">
                                <Checkbox
                                    id={interest}
                                    checked={formData.interests.includes(interest)}
                                    onCheckedChange={(checked) =>
                                        handleInterestChange(interest, checked as boolean)
                                    }
                                    className="data-[state=checked]:bg-success-100 data-[state=checked]:border-success-100 border-white/20"
                                />
                                <Label htmlFor={interest} className="text-muted-500 text-sm">
                                    {interest}
                                </Label>
                            </div>
                        ))}
                    </div>
                </FormField>

                <FormField label="Additional Information" htmlFor="additionalInfo">
                    <Textarea
                        id="additionalInfo"
                        placeholder="Tell us about your hiring challenges or specific requirements..."
                        value={formData.additionalInfo}
                        onChange={(e) => handleFieldChange('additionalInfo', e.target.value)}
                        className="placeholder:text-muted-500 focus:border-success-100 focus:ring-success-100 min-h-[80px] border-white/20 bg-white/5 text-white"
                    />
                </FormField>

                <div className="flex items-start space-x-2">
                    <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleFieldChange('agreeToTerms', checked)}
                        className="data-[state=checked]:bg-success-100 data-[state=checked]:border-success-100 mt-1 border-white/20"
                        required
                    />
                    <Label htmlFor="terms" className="text-muted-500 text-sm leading-relaxed">
                        By clicking Schedule Demo you confirm that you have read and agree to our{' '}
                        <Link href="#" className="text-success-100 hover:underline">
                            Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link href="#" className="text-success-100 hover:underline">
                            Terms of Service
                        </Link>
                    </Label>
                </div>
                {errors.agreeToTerms && (
                    <p className="text-destructive-100 animate-fade-in text-sm">
                        {errors.agreeToTerms}
                    </p>
                )}

                <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Scheduling Demo..."
                    disabled={!formData.agreeToTerms}
                >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Demo
                </LoadingButton>
            </form>
        </>
    );
}
