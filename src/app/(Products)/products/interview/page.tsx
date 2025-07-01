'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import {
    ArrowRight,
    Code2,
    Cpu,
    Database,
    GitBranch,
    Play,
    Shield,
    Sparkles,
    Terminal,
    Users,
    Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

export default function InterviewPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        jobTitle: '',
        teamSize: '',
        message: '',
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        if (!formData.company.trim()) errors.company = 'Company name is required';
        if (!formData.jobTitle.trim()) errors.jobTitle = 'Job title is required';
        if (!formData.teamSize) errors.teamSize = 'Please select team size';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);

        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            phone: '',
            jobTitle: '',
            teamSize: '',
            message: '',
        });
        setFormErrors({});
        alert("Thank you! We'll be in touch soon.");
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (formErrors[field]) {
            setFormErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const features = [
        {
            icon: <Code2 className="h-6 w-6" />,
            title: 'Real-time Collaboration',
            description:
                'Live code sharing with instant feedback and seamless pair programming experience.',
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: 'Smart Analytics',
            description:
                'AI-powered insights into candidate performance with detailed assessment reports.',
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: 'Instant Setup',
            description:
                'Pre-configured environments ready in seconds with zero configuration required.',
        },
    ];

    const companies = [
        'Google',
        'Microsoft',
        'Amazon',
        'Meta',
        'Netflix',
        'Spotify',
        'Uber',
        'Airbnb',
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 lg:py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-[#94f27f]/8 via-white to-[#003720]/5" />
                <div className="relative container mx-auto px-4">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                        <div
                            className={`space-y-6 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        >
                            <Badge className="border-[#94f27f]/25 bg-[#94f27f]/15 text-[#003720] transition-colors hover:bg-[#94f27f]/20">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Next-Gen Interview Platform
                            </Badge>

                            <h1 className="text-4xl leading-tight font-bold text-[#0e0f0c] lg:text-5xl xl:text-6xl">
                                Code, create, and innovate
                                <span className="block bg-gradient-to-r from-[#94f27f] to-[#003720] bg-clip-text text-transparent">
                                    with live coding interviews
                                </span>
                            </h1>

                            <p className="max-w-xl text-lg leading-relaxed text-[#6a6c6a]">
                                Get real-time data on what a world-class technical interview looks
                                like. Assess candidates fairly with our comprehensive platform.
                            </p>

                            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                                <Button
                                    size="lg"
                                    className="bg-[#94f27f] text-[#003720] shadow-lg transition-all duration-300 hover:bg-[#003720] hover:text-white hover:shadow-xl"
                                >
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-[#6a6c6a]/30 bg-transparent text-[#6a6c6a] transition-all duration-300 hover:bg-[#6a6c6a] hover:text-white"
                                >
                                    <Play className="mr-2 h-4 w-4" />
                                    Book a Demo
                                </Button>
                            </div>
                        </div>

                        <div
                            className={`relative transition-all delay-200 duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                        >
                            <div className="relative mx-auto max-w-lg">
                                <div className="absolute -inset-3 rounded-xl bg-gradient-to-r from-[#94f27f]/20 to-[#003720]/20 opacity-70 blur-lg" />
                                <Card className="relative overflow-hidden border-[#454745]/50 bg-[#0e0f0c] shadow-2xl">
                                    <CardContent className="p-0">
                                        <div className="flex items-center gap-3 bg-[#454745] px-4 py-3">
                                            <div className="flex gap-2">
                                                <div className="h-3 w-3 rounded-full bg-[#f75353]" />
                                                <div className="h-3 w-3 rounded-full bg-[#94f27f]" />
                                                <div className="h-3 w-3 rounded-full bg-[#6a6c6a]" />
                                            </div>
                                            <span className="text-sm text-[#83928c]">
                                                live-interview.js
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <pre className="text-sm leading-relaxed text-[#94f27f]">
                                                <code>{`function optimizeSearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}`}</code>
                                            </pre>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Floating indicators */}
                                <div className="absolute -top-3 -right-3 animate-pulse rounded-lg bg-[#94f27f] p-2 shadow-lg">
                                    <Terminal className="h-4 w-4 text-[#003720]" />
                                </div>
                                <div className="absolute -bottom-3 -left-3 rounded-lg bg-[#003720] p-2 shadow-lg">
                                    <GitBranch className="h-4 w-4 text-[#94f27f]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted Companies */}
            <section className="border-t border-[#83928c]/10 py-12">
                <div className="container mx-auto px-4">
                    <p className="mb-8 text-center text-sm text-[#6a6c6a]">
                        Trusted by 3,000+ companies worldwide
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 opacity-60 lg:gap-12">
                        {companies.map((company, index) => (
                            <div
                                key={company}
                                className={`cursor-pointer text-base font-medium text-[#83928c] transition-all duration-500 hover:text-[#94f27f] hover:opacity-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gradient-to-b from-white to-[#94f27f]/3 py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <Badge className="mb-4 border-[#003720]/15 bg-[#003720]/10 text-[#003720]">
                            Core Features
                        </Badge>
                        <h2 className="mb-4 text-3xl font-bold text-[#0e0f0c] lg:text-4xl">
                            Interviews that mirror the daily work of a developer
                        </h2>
                        <p className="text-lg leading-relaxed text-[#6a6c6a]">
                            Our platform combines cutting-edge technology with intuitive design to
                            deliver comprehensive interview experiences.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className={`group cursor-pointer border-[#83928c]/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                                    activeFeature === index
                                        ? 'shadow-md ring-1 ring-[#94f27f]/50'
                                        : ''
                                }`}
                                onMouseEnter={() => setActiveFeature(index)}
                            >
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#94f27f]/15 to-[#003720]/15 text-[#003720] transition-transform duration-300 group-hover:scale-105">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="mb-3 text-lg font-semibold text-[#0e0f0c]">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-[#6a6c6a]">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Demo Section */}
            <section className="relative overflow-hidden bg-[#0e0f0c] py-16">
                <div className="absolute inset-0 bg-gradient-to-r from-[#003720]/15 to-[#94f27f]/8" />
                <div className="relative container mx-auto px-4">
                    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
                        <div className="space-y-6">
                            <Badge className="border-[#94f27f]/30 bg-[#94f27f]/20 text-[#94f27f]">
                                Live Demo
                            </Badge>
                            <h2 className="text-3xl font-bold text-white lg:text-4xl">
                                The next generation of technical interviews
                            </h2>
                            <p className="leading-relaxed text-[#83928c]">
                                Experience how our platform transforms traditional interviews into
                                engaging, collaborative sessions that reveal true potential and
                                technical capabilities.
                            </p>

                            <div className="space-y-3">
                                {[
                                    {
                                        icon: <Database className="h-4 w-4" />,
                                        text: 'Real-time code execution environment',
                                    },
                                    {
                                        icon: <Cpu className="h-4 w-4" />,
                                        text: 'AI-powered code analysis and feedback',
                                    },
                                    {
                                        icon: <Shield className="h-4 w-4" />,
                                        text: 'Secure, isolated sandbox testing',
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 text-[#83928c]"
                                    >
                                        <div className="text-[#94f27f]">{item.icon}</div>
                                        <span className="text-sm">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                size="lg"
                                className="bg-[#94f27f] text-[#003720] transition-all duration-300 hover:bg-white hover:text-[#0e0f0c]"
                            >
                                Try Interactive Demo
                                <Play className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="relative">
                            <Card className="border-[#83928c]/20 bg-[#454745]/30 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-white">
                                                Live Interview Session
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 animate-pulse rounded-full bg-[#94f27f]" />
                                                <span className="text-xs text-[#94f27f]">
                                                    Recording
                                                </span>
                                            </div>
                                        </div>

                                        <div className="rounded-lg bg-[#0e0f0c] p-4">
                                            <div className="mb-2 flex items-center gap-2">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#94f27f]">
                                                    <span className="text-xs font-bold text-[#003720]">
                                                        JS
                                                    </span>
                                                </div>
                                                <span className="text-xs text-[#83928c]">
                                                    Candidate solving algorithm
                                                </span>
                                            </div>
                                            <div className="font-mono text-xs text-[#94f27f]">
                                                {'>'} Implementing binary search...
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-lg bg-[#003720]/20 p-3">
                                                <div className="text-xs font-medium text-[#94f27f]">
                                                    Performance
                                                </div>
                                                <div className="text-lg font-bold text-white">
                                                    92%
                                                </div>
                                            </div>
                                            <div className="rounded-lg bg-[#003720]/20 p-3">
                                                <div className="text-xs font-medium text-[#94f27f]">
                                                    Time
                                                </div>
                                                <div className="text-lg font-bold text-white">
                                                    15:30
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* See HackerRank In Action Form Section */}
            <section className="bg-gradient-to-b from-[#94f27f]/5 to-white py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-[#0e0f0c] lg:text-4xl">
                                See HackerRank In action
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-[#6a6c6a]">
                                Ready to transform your technical interviews? Get a personalized
                                demo and see how our platform can revolutionize your hiring process.
                            </p>
                        </div>

                        <Card className="border-[#83928c]/15 shadow-lg">
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="firstName"
                                                className="font-medium text-[#0e0f0c]"
                                            >
                                                First Name *
                                            </Label>
                                            <Input
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={(e) =>
                                                    handleInputChange('firstName', e.target.value)
                                                }
                                                className={`border-[#83928c]/30 focus:border-[#94f27f] ${formErrors.firstName ? 'border-[#f75353]' : ''}`}
                                                placeholder="Enter your first name"
                                            />
                                            {formErrors.firstName && (
                                                <p className="text-sm text-[#f75353]">
                                                    {formErrors.firstName}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="lastName"
                                                className="font-medium text-[#0e0f0c]"
                                            >
                                                Last Name *
                                            </Label>
                                            <Input
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={(e) =>
                                                    handleInputChange('lastName', e.target.value)
                                                }
                                                className={`border-[#83928c]/30 focus:border-[#94f27f] ${formErrors.lastName ? 'border-[#f75353]' : ''}`}
                                                placeholder="Enter your last name"
                                            />
                                            {formErrors.lastName && (
                                                <p className="text-sm text-[#f75353]">
                                                    {formErrors.lastName}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className="font-medium text-[#0e0f0c]"
                                            >
                                                Work Email *
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    handleInputChange('email', e.target.value)
                                                }
                                                className={`border-[#83928c]/30 focus:border-[#94f27f] ${formErrors.email ? 'border-[#f75353]' : ''}`}
                                                placeholder="you@company.com"
                                            />
                                            {formErrors.email && (
                                                <p className="text-sm text-[#f75353]">
                                                    {formErrors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="company"
                                                className="font-medium text-[#0e0f0c]"
                                            >
                                                Company *
                                            </Label>
                                            <Input
                                                id="company"
                                                value={formData.company}
                                                onChange={(e) =>
                                                    handleInputChange('company', e.target.value)
                                                }
                                                className={`border-[#83928c]/30 focus:border-[#94f27f] ${formErrors.company ? 'border-[#f75353]' : ''}`}
                                                placeholder="Your company name"
                                            />
                                            {formErrors.company && (
                                                <p className="text-sm text-[#f75353]">
                                                    {formErrors.company}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="jobTitle"
                                                className="font-medium text-[#0e0f0c]"
                                            >
                                                Job Title *
                                            </Label>
                                            <Input
                                                id="jobTitle"
                                                value={formData.jobTitle}
                                                onChange={(e) =>
                                                    handleInputChange('jobTitle', e.target.value)
                                                }
                                                className={`border-[#83928c]/30 focus:border-[#94f27f] ${formErrors.jobTitle ? 'border-[#f75353]' : ''}`}
                                                placeholder="e.g. Engineering Manager"
                                            />
                                            {formErrors.jobTitle && (
                                                <p className="text-sm text-[#f75353]">
                                                    {formErrors.jobTitle}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="phone"
                                                className="font-medium text-[#0e0f0c]"
                                            >
                                                Phone Number
                                            </Label>
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    handleInputChange('phone', e.target.value)
                                                }
                                                className="border-[#83928c]/30 focus:border-[#94f27f]"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="teamSize"
                                            className="font-medium text-[#0e0f0c]"
                                        >
                                            Team Size *
                                        </Label>
                                        <Select
                                            value={formData.teamSize}
                                            onValueChange={(value) =>
                                                handleInputChange('teamSize', value)
                                            }
                                        >
                                            <SelectTrigger
                                                className={`border-[#83928c]/30 focus:border-[#94f27f] ${formErrors.teamSize ? 'border-[#f75353]' : ''}`}
                                            >
                                                <SelectValue placeholder="Select your team size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1-10">1-10 employees</SelectItem>
                                                <SelectItem value="11-50">
                                                    11-50 employees
                                                </SelectItem>
                                                <SelectItem value="51-200">
                                                    51-200 employees
                                                </SelectItem>
                                                <SelectItem value="201-1000">
                                                    201-1000 employees
                                                </SelectItem>
                                                <SelectItem value="1000+">
                                                    1000+ employees
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {formErrors.teamSize && (
                                            <p className="text-sm text-[#f75353]">
                                                {formErrors.teamSize}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="message"
                                            className="font-medium text-[#0e0f0c]"
                                        >
                                            Tell us about your hiring needs
                                        </Label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) =>
                                                handleInputChange('message', e.target.value)
                                            }
                                            className="min-h-[100px] border-[#83928c]/30 focus:border-[#94f27f]"
                                            placeholder="What challenges are you facing with technical interviews?"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                                        <Button
                                            type="submit"
                                            size="lg"
                                            disabled={isSubmitting}
                                            className="flex-1 bg-[#94f27f] text-[#003720] transition-all duration-300 hover:bg-[#003720] hover:text-white sm:flex-none"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Get Demo'}
                                            {!isSubmitting && (
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            )}
                                        </Button>
                                        <p className="self-center text-sm text-[#6a6c6a]">
                                            Free demo • No commitment • 30-minute session
                                        </p>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-gradient-to-r from-[#94f27f] to-[#003720] py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="mx-auto max-w-3xl space-y-6">
                        <h2 className="text-3xl font-bold text-white lg:text-4xl">
                            Ready to revolutionize your hiring?
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-white/90">
                            Join thousands of companies already using our platform to find
                            exceptional talent through better technical interviews.
                        </p>

                        <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                            <Input
                                placeholder="Enter your work email"
                                className="border-white/20 bg-white/10 text-white placeholder:text-white/70 focus:bg-white/20"
                            />
                            <Button
                                size="lg"
                                className="bg-white whitespace-nowrap text-[#003720] shadow-lg transition-all duration-300 hover:bg-white/90"
                            >
                                Start Free Trial
                            </Button>
                        </div>

                        <p className="text-sm text-white/70">
                            No credit card required • 14-day free trial • Cancel anytime
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
