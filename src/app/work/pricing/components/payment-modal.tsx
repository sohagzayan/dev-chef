'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check, CreditCard, Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plan: any;
}

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        company: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        billingAddress: '',
        city: '',
        zipCode: '',
        country: 'United States',
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const steps = [
        { id: 1, title: 'Account Details', description: 'Basic information' },
        { id: 2, title: 'Payment Method', description: 'Secure payment' },
        { id: 3, title: 'Confirmation', description: 'Review & confirm' },
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsProcessing(false);
        setIsComplete(true);
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    if (!plan) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {!isComplete ? (
                            <>
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                                    <div>
                                        <h2
                                            className="text-2xl font-semibold"
                                            style={{ color: 'var(--color-dark-900)' }}
                                        >
                                            Complete Your Purchase
                                        </h2>
                                        <p className="mt-1 text-gray-600">
                                            {plan.name} Plan - ${plan.selectedPrice}/month
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-2 transition-colors hover:bg-gray-100"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Progress Steps */}
                                <div className="bg-gray-50 px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        {steps.map((step, index) => (
                                            <div key={step.id} className="flex items-center">
                                                <div className="flex items-center">
                                                    <motion.div
                                                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                                                            currentStep >= step.id
                                                                ? 'text-white'
                                                                : 'bg-gray-200 text-gray-600'
                                                        }`}
                                                        style={{
                                                            backgroundColor:
                                                                currentStep >= step.id
                                                                    ? 'var(--color-success-100)'
                                                                    : undefined,
                                                        }}
                                                        animate={{
                                                            scale:
                                                                currentStep === step.id ? 1.1 : 1,
                                                        }}
                                                    >
                                                        {currentStep > step.id ? (
                                                            <Check className="h-4 w-4" />
                                                        ) : (
                                                            step.id
                                                        )}
                                                    </motion.div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {step.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                {index < steps.length - 1 && (
                                                    <div className="mx-4 flex-1">
                                                        <div
                                                            className="h-0.5 rounded-full"
                                                            style={{
                                                                backgroundColor:
                                                                    currentStep > step.id
                                                                        ? 'var(--color-success-100)'
                                                                        : '#e5e7eb',
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="max-h-96 overflow-y-auto p-6">
                                    <AnimatePresence mode="wait">
                                        {currentStep === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-4"
                                            >
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                                        Email Address *
                                                    </label>
                                                    <Input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'email',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="john@company.com"
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                                        Full Name *
                                                    </label>
                                                    <Input
                                                        value={formData.fullName}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'fullName',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="John Doe"
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                                        Company Name
                                                    </label>
                                                    <Input
                                                        value={formData.company}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'company',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Acme Inc."
                                                        className="w-full"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}

                                        {currentStep === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-4"
                                            >
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                                        <CreditCard className="mr-2 inline h-4 w-4" />
                                                        Card Number *
                                                    </label>
                                                    <Input
                                                        value={formData.cardNumber}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'cardNumber',
                                                                formatCardNumber(e.target.value),
                                                            )
                                                        }
                                                        placeholder="1234 5678 9012 3456"
                                                        maxLength={19}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                                            Expiry Date *
                                                        </label>
                                                        <Input
                                                            value={formData.expiryDate}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    'expiryDate',
                                                                    formatExpiryDate(
                                                                        e.target.value,
                                                                    ),
                                                                )
                                                            }
                                                            placeholder="MM/YY"
                                                            maxLength={5}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                                            CVV *
                                                        </label>
                                                        <Input
                                                            value={formData.cvv}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    'cvv',
                                                                    e.target.value.replace(
                                                                        /\D/g,
                                                                        '',
                                                                    ),
                                                                )
                                                            }
                                                            placeholder="123"
                                                            maxLength={4}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                                                    <Lock className="h-4 w-4" />
                                                    <span>
                                                        Your payment information is encrypted and
                                                        secure
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}

                                        {currentStep === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <div className="rounded-lg bg-gray-50 p-4">
                                                    <h3
                                                        className="mb-3 font-semibold"
                                                        style={{ color: 'var(--color-dark-900)' }}
                                                    >
                                                        Order Summary
                                                    </h3>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <span>
                                                                {plan.name} Plan (
                                                                {plan.billingCycle})
                                                            </span>
                                                            <span>${plan.selectedPrice}/month</span>
                                                        </div>
                                                        {plan.billingCycle === 'annual' && (
                                                            <div
                                                                className="flex justify-between text-sm"
                                                                style={{
                                                                    color: 'var(--color-success-100)',
                                                                }}
                                                            >
                                                                <span>Annual discount (20%)</span>
                                                                <span>
                                                                    -$
                                                                    {plan.monthlyPrice -
                                                                        plan.selectedPrice}
                                                                    /month
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div className="flex justify-between border-t pt-2 font-semibold">
                                                            <span>Total</span>
                                                            <span>
                                                                $
                                                                {plan.billingCycle === 'annual'
                                                                    ? plan.selectedPrice * 12
                                                                    : plan.selectedPrice}
                                                                /
                                                                {plan.billingCycle === 'annual'
                                                                    ? 'year'
                                                                    : 'month'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <p>
                                                        By completing this purchase, you agree to
                                                        our Terms of Service and Privacy Policy.
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-6">
                                    <Button
                                        onClick={currentStep === 1 ? onClose : handleBack}
                                        variant="outline"
                                        className="flex items-center gap-2"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        {currentStep === 1 ? 'Cancel' : 'Back'}
                                    </Button>

                                    <Button
                                        onClick={currentStep === 3 ? handleSubmit : handleNext}
                                        disabled={isProcessing}
                                        className="px-8 text-white"
                                        style={{ backgroundColor: 'var(--color-success-100)' }}
                                    >
                                        {isProcessing ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    ease: 'linear',
                                                }}
                                                className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                                            />
                                        ) : currentStep === 3 ? (
                                            'Complete Purchase'
                                        ) : (
                                            'Continue'
                                        )}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            /* Success State */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                                    style={{ backgroundColor: 'var(--color-success-100)' }}
                                >
                                    <Check className="h-8 w-8 text-white" />
                                </motion.div>
                                <h3
                                    className="mb-2 text-2xl font-semibold"
                                    style={{ color: 'var(--color-dark-900)' }}
                                >
                                    Welcome to {plan.name}!
                                </h3>
                                <p className="mb-6 text-gray-600">
                                    Your subscription has been activated. Check your email for setup
                                    instructions.
                                </p>
                                <Button
                                    onClick={onClose}
                                    className="px-8 text-white"
                                    style={{ backgroundColor: 'var(--color-success-100)' }}
                                >
                                    Get Started
                                </Button>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
