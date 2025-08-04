'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    AiOutlineClose,
    AiOutlineCode,
    AiOutlineExclamationCircle,
    AiOutlineSend,
} from 'react-icons/ai';

interface LoginBannerProps {
    action: 'run' | 'submit';
    onClose?: () => void;
}

const LoginBanner: React.FC<LoginBannerProps> = ({ action, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    if (!isVisible) return null;

    const getActionIcon = () => {
        return action === 'run' ? (
            <AiOutlineCode className="h-4 w-4" />
        ) : (
            <AiOutlineSend className="h-4 w-4" />
        );
    };

    const getActionText = () => {
        return action === 'run' ? 'run code' : 'submit solution';
    };

    return (
        <div className="animate-in slide-in-from-top fixed top-0 right-0 left-0 z-50 border-b border-blue-700 bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg duration-300">
            <div className="mx-auto max-w-7xl px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <AiOutlineExclamationCircle className="h-5 w-5 text-blue-300" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-200">
                                You need to{' '}
                                <Link
                                    href="/developers/login"
                                    className="animate-pulse font-semibold text-blue-300 underline transition-colors duration-200 hover:text-blue-200"
                                >
                                    log in / sign up
                                </Link>{' '}
                                to {getActionText()}
                            </span>
                            <div className="flex items-center space-x-1 text-blue-300">
                                {getActionIcon()}
                            </div>
                        </div>
                    </div>

                    {onClose && (
                        <button
                            onClick={handleClose}
                            className="flex-shrink-0 rounded-full p-1 text-gray-400 transition-colors duration-200 hover:bg-blue-700 hover:text-white"
                            aria-label="Close banner"
                        >
                            <AiOutlineClose className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Progress bar animation */}
                <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-blue-700">
                    <div
                        className="h-full animate-pulse rounded-full bg-blue-400"
                        style={{ width: '30%' }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default LoginBanner;
