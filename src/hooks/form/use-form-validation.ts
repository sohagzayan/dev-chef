'use client';

import { useState } from 'react';
import { z } from 'zod';

export function useFormValidation<T extends z.ZodSchema>(schema: T) {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isValid, setIsValid] = useState(false);

    const validate = (data: z.infer<T>): boolean => {
        try {
            schema.parse(data);
            setErrors({});
            setIsValid(true);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path) {
                        newErrors[err.path.join('.')] = err.message;
                    }
                });
                console.log('Validation errors:', newErrors);
                setErrors(newErrors);
                setIsValid(false);
                return false;
            }
            return false;
        }
    };

    const validateField = (fieldName: string, value: any, data: z.infer<T>) => {
        // Don't validate empty fields unless they're required
        if (!value || value.toString().trim() === '') {
            // Clear the field error if it exists
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
            return;
        }

        try {
            // Validate the entire form data
            schema.parse(data);
            // If validation passes, clear the field error
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Find errors for the specific field
                const fieldErrors = error.errors.filter((err) => err.path.join('.') === fieldName);
                if (fieldErrors.length > 0) {
                    console.log(`Validation error for ${fieldName}:`, fieldErrors[0].message);
                    setErrors((prev) => ({
                        ...prev,
                        [fieldName]: fieldErrors[0].message,
                    }));
                } else {
                    // Clear field error if no specific error for this field
                    setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors[fieldName];
                        return newErrors;
                    });
                }
            }
        }
    };

    const clearErrors = () => {
        setErrors({});
        setIsValid(false);
    };

    return {
        errors,
        isValid,
        validate,
        validateField,
        clearErrors,
    };
}
