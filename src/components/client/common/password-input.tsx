'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PasswordInputProps {
    id: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
    error?: boolean;
    required?: boolean;
}

export function PasswordInput({
    id,
    placeholder = 'Enter password',
    value,
    onChange,
    className,
    error,
    required,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
                id={id}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                    'border-gray-300 bg-white pr-10 pl-10 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[rgb(148,242,127)] focus:ring-[rgb(148,242,127)]',
                    error && 'border-[#f75353] focus:border-[#f75353] focus:ring-[#f75353]',
                    className,
                )}
                required={required}
            />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 transform p-0 text-gray-400 transition-colors hover:text-gray-600"
            >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
        </div>
    );
}
