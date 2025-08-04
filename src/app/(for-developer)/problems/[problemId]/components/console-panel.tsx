'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Terminal } from 'lucide-react';

interface ConsoleOutput {
    type: 'info' | 'success' | 'error' | 'warning';
    message: string;
}

interface ConsolePanelProps {
    output: ConsoleOutput[];
}

export function ConsolePanel({ output }: ConsolePanelProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    const getOutputIcon = (type: string) => {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            default:
                return 'ℹ️';
        }
    };

    const getOutputColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'text-green-400';
            case 'error':
                return 'text-red-400';
            case 'warning':
                return 'text-yellow-400';
            default:
                return 'text-gray-300';
        }
    };

    return (
        <div className="border-t border-gray-700">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hover:bg-gray-750 flex w-full items-center justify-between bg-gray-800 px-4 py-2 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">Console</span>
                    {output.length > 0 && (
                        <span className="text-xs text-gray-500">({output.length})</span>
                    )}
                </div>
                {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                )}
            </button>

            {isExpanded && (
                <div className="max-h-48 overflow-y-auto bg-gray-900 p-4">
                    {output.length === 0 ? (
                        <div className="text-sm text-gray-500">
                            No output yet. Run your code to see results.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {output.map((item, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <span className="text-sm">{getOutputIcon(item.type)}</span>
                                    <span
                                        className={`font-mono text-sm ${getOutputColor(item.type)}`}
                                    >
                                        {item.message}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
