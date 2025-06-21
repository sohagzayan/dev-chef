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
                setErrors(newErrors);
                setIsValid(false);
                return false;
            }
            return false;
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateField = (fieldName: string, value: any, data: z.infer<T>) => {
        try {
            schema.parse(data);
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldError = error.errors.find((err) => err.path.join('.') === fieldName);
                if (fieldError) {
                    setErrors((prev) => ({
                        ...prev,
                        [fieldName]: fieldError.message,
                    }));
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
