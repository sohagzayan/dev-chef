import { NextResponse } from 'next/server';

export interface ApiError {
    code: string;
    message: string;
    details?: any;
}

export class AppError extends Error {
    public statusCode: number;
    public code: string;
    public details?: any;

    constructor(
        message: string,
        statusCode: number = 500,
        code: string = 'INTERNAL_ERROR',
        details?: any,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        this.name = 'AppError';
    }
}

export function createErrorResponse(error: AppError | Error | unknown): NextResponse {
    if (error instanceof AppError) {
        return NextResponse.json(
            {
                success: false,
                error: error.code,
                message: error.message,
                details: error.details,
            },
            { status: error.statusCode },
        );
    }

    if (error instanceof Error) {
        return NextResponse.json(
            {
                success: false,
                error: 'INTERNAL_ERROR',
                message: error.message || 'An unexpected error occurred',
            },
            { status: 500 },
        );
    }

    return NextResponse.json(
        {
            success: false,
            error: 'UNKNOWN_ERROR',
            message: 'An unknown error occurred',
        },
        { status: 500 },
    );
}

export function createValidationErrorResponse(errors: Record<string, string[]>): NextResponse {
    return NextResponse.json(
        {
            success: false,
            error: 'VALIDATION_ERROR',
            message: 'Please check your input and try again',
            errors,
        },
        { status: 400 },
    );
}

export function createSuccessResponse<T>(
    data: T,
    message?: string,
    statusCode: number = 200,
): NextResponse {
    return NextResponse.json(
        {
            success: true,
            data,
            message,
        },
        { status: statusCode },
    );
}

// Common error types
export const ErrorTypes = {
    VALIDATION: 'VALIDATION_ERROR',
    AUTHENTICATION: 'AUTHENTICATION_ERROR',
    AUTHORIZATION: 'AUTHORIZATION_ERROR',
    NOT_FOUND: 'NOT_FOUND_ERROR',
    CONFLICT: 'CONFLICT_ERROR',
    RATE_LIMIT: 'RATE_LIMIT_ERROR',
    INTERNAL: 'INTERNAL_ERROR',
    NETWORK: 'NETWORK_ERROR',
} as const;

// Common error messages
export const ErrorMessages = {
    INVALID_EMAIL: 'Please enter a valid email address',
    EMAIL_EXISTS: 'An account with this email already exists',
    INVALID_PASSWORD: 'Password does not meet requirements',
    PASSWORDS_DONT_MATCH: "Passwords don't match",
    TERMS_NOT_AGREED: 'You must agree to the terms and conditions',
    INVALID_NAME: 'Name contains invalid characters',
    TOO_MANY_REQUESTS: 'Too many requests. Please try again later',
    NETWORK_ERROR: 'Network error. Please check your connection and try again',
    SERVER_ERROR: 'Something went wrong. Please try again later',
} as const;
