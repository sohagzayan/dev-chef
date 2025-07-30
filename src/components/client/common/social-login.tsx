'use client';

import { Chrome, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialLoginProps {
    onGoogleLogin?: () => void;
    onGithubLogin?: () => void;
    disabled?: boolean;
}

export function SocialLogin({ onGoogleLogin, onGithubLogin, disabled }: SocialLoginProps) {
    return (
        <div className="space-y-4">
            {/* Improved Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 font-medium text-gray-500">
                        Or continue with
                    </span>
                </div>
            </div>

            {/* Improved Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onGoogleLogin}
                    disabled={disabled}
                    className="group relative overflow-hidden border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:border-green-300 hover:bg-green-50 hover:shadow-md"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <Chrome className="relative h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span className="sr-only">Continue with Google</span>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onGithubLogin}
                    disabled={disabled}
                    className="group relative overflow-hidden border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:border-green-300 hover:bg-green-50 hover:shadow-md"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <Github className="relative h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span className="sr-only">Continue with GitHub</span>
                </Button>
            </div>
        </div>
    );
}
