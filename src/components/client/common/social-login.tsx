'use client';

import { Chrome, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialLoginProps {
    onGoogleLogin?: () => void;
    onGithubLogin?: () => void;
    onLinkedinLogin?: () => void;
    disabled?: boolean;
}

export function SocialLogin({
    onGoogleLogin,
    onGithubLogin,
    onLinkedinLogin,
    disabled,
}: SocialLoginProps) {
    return (
        <div className="space-y-4">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onGoogleLogin}
                    disabled={disabled}
                    className="border-gray-300 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:border-[rgb(148,242,127)]/50 hover:bg-gray-50"
                >
                    <Chrome className="h-4 w-4" />
                    <span className="sr-only">Continue with Google</span>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onGithubLogin}
                    disabled={disabled}
                    className="border-gray-300 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:border-[rgb(148,242,127)]/50 hover:bg-gray-50"
                >
                    <Github className="h-4 w-4" />
                    <span className="sr-only">Continue with GitHub</span>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onLinkedinLogin}
                    disabled={disabled}
                    className="border-gray-300 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:border-[rgb(148,242,127)]/50 hover:bg-gray-50"
                >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">Continue with LinkedIn</span>
                </Button>
            </div>
        </div>
    );
}
