'use client';

import { useEffect, useRef, useState } from 'react';
import type { NavDropdownItem } from '../model/types';

interface NavDropdownProps {
    label: string;
    items: NavDropdownItem[];
    isOpen: boolean;
    onClose: () => void;
}

export function NavDropdown({ label, items, isOpen, onClose }: NavDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            setShouldRender(true);
            // Trigger animation after render
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            setIsAnimating(false);
            // Delay unmounting to allow exit animation
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 200);
            return () => clearTimeout(timer);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!shouldRender) return null;

    return (
        <div
            ref={dropdownRef}
            className={`absolute top-full left-0 z-50 mt-2 w-64 origin-top overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 ease-out ${
                isAnimating
                    ? 'translate-y-0 scale-100 opacity-100'
                    : '-translate-y-2 scale-95 opacity-0'
            }`}
        >
            {/* Dropdown Arrow with Animation */}
            <div
                className={`absolute -top-2 left-6 h-4 w-4 rotate-45 bg-white transition-all duration-300 ${
                    isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
            />

            <div className="relative rounded-lg bg-white p-2">
                {items.map((item, index) => {
                    if (item.label === '' || item.id.startsWith('separator')) {
                        return (
                            <div
                                key={item.id || `separator-${index}`}
                                className={`my-1 border-t border-gray-200 transition-opacity duration-300 ${
                                    isAnimating ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{
                                    transitionDelay: `${(index + 1) * 20}ms`,
                                }}
                            />
                        );
                    }

                    return (
                        <a
                            key={item.id}
                            href={item.href}
                            className={`group flex items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:pl-4 ${
                                isAnimating
                                    ? 'translate-x-0 opacity-100'
                                    : '-translate-x-2 opacity-0'
                            }`}
                            style={{
                                transitionDelay: `${(index + 1) * 25}ms`,
                            }}
                        >
                            <div className="flex items-center gap-2">
                                {item.icon && (
                                    <span className="text-gray-400 transition-transform duration-200 group-hover:scale-110 group-hover:text-gray-600">
                                        {item.icon === 'twitter' && '🐦'}
                                        {item.icon === 'instagram' && '📷'}
                                        {item.icon === 'linkedin' && '💼'}
                                        {item.icon === 'facebook' && '👥'}
                                        {item.icon === 'piggy-bank' && '💰'}
                                    </span>
                                )}
                                <span className={item.hasSubmenu ? 'flex items-center gap-1' : ''}>
                                    {item.label}
                                    {item.hasSubmenu && (
                                        <svg
                                            className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    )}
                                </span>
                            </div>
                            {item.badge && (
                                <span
                                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase transition-all duration-200 group-hover:scale-110 ${
                                        item.badge.variant === 'new'
                                            ? 'bg-yellow-400 text-gray-900'
                                            : 'bg-blue-500 text-white'
                                    }`}
                                >
                                    {item.badge.text}
                                </span>
                            )}
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
