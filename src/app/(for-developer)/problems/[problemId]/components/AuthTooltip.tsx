'use client';

import { useState } from 'react';

interface AuthTooltipProps {
    children: React.ReactNode;
    message: string;
}

const AuthTooltip: React.FC<AuthTooltipProps> = ({ children, message }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block">
            <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
                {children}
            </div>

            {isVisible && (
                <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform">
                    <div className="rounded-md bg-gray-900 px-3 py-2 text-xs text-white shadow-lg">
                        {message}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 transform border-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthTooltip;
