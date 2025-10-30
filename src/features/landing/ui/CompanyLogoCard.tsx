'use client';

import { useState } from 'react';
import type { CompanyLogo } from '../model/types';

interface CompanyLogoCardProps {
    logo: CompanyLogo;
    index: number;
}

export function CompanyLogoCard({ logo, index }: CompanyLogoCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group absolute transition-all duration-500 ease-out"
            style={{
                left: `${logo.position.x}%`,
                top: `${logo.position.y}%`,
                transform: `translate(-50%, -50%)`,
                animationDelay: `${index * 100}ms`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="relative rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-2xl"
                style={{
                    transform: isHovered
                        ? `rotate(${logo.position.rotation + 2}deg) scale(1.05)`
                        : `rotate(${logo.position.rotation}deg) scale(1)`,
                    boxShadow: isHovered
                        ? '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                        : '0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)',
                }}
            >
                {/* Subtle gradient overlay on hover */}
                <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50/50 to-white opacity-0 transition-opacity duration-300"
                    style={{
                        opacity: isHovered ? 1 : 0,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex min-w-[120px] items-center justify-center">
                    {logo.name === 'Google' ? (
                        <div className="flex items-center gap-0.5 font-semibold">
                            <span className="text-lg text-blue-600">G</span>
                            <span className="text-lg text-red-600">o</span>
                            <span className="text-lg text-yellow-600">o</span>
                            <span className="text-lg text-blue-600">g</span>
                            <span className="text-lg text-green-600">l</span>
                            <span className="text-lg text-red-600">e</span>
                        </div>
                    ) : logo.name === 'Amazon' ? (
                        <div className="flex items-center gap-1">
                            <svg
                                className="h-5 w-5 text-orange-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                            </svg>
                            <span className="text-base font-semibold text-gray-900">amazon</span>
                        </div>
                    ) : logo.name === 'XM' ? (
                        <span className="text-xl font-bold text-red-600">{logo.name}</span>
                    ) : logo.name === 'mailer lite' ? (
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-gray-800">mailer</span>
                            <span className="rounded-md bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
                                lite
                            </span>
                        </div>
                    ) : logo.name === 'Basecamp' ? (
                        <div className="flex items-center gap-2">
                            <svg
                                className="h-4 w-4 flex-shrink-0 text-gray-700"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-sm font-semibold text-gray-800">Basecamp</span>
                        </div>
                    ) : logo.name === 'GitHub' ? (
                        <div className="flex items-center gap-1.5">
                            <svg
                                className="h-5 w-5 text-gray-900"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-900">GitHub</span>
                        </div>
                    ) : logo.name === 'Microsoft' ? (
                        <div className="flex items-center gap-1">
                            <div className="grid grid-cols-2 gap-px">
                                <div className="h-3 w-3 bg-blue-600" />
                                <div className="h-3 w-3 bg-green-600" />
                                <div className="h-3 w-3 bg-yellow-600" />
                                <div className="h-3 w-3 bg-red-600" />
                            </div>
                            <span className="ml-1 text-sm font-semibold text-gray-900">
                                Microsoft
                            </span>
                        </div>
                    ) : (
                        <span className="text-sm font-semibold text-gray-900 capitalize">
                            {logo.name}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
