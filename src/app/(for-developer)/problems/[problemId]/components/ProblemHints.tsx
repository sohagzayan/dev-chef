'use client';

import { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { BsLightbulb } from 'react-icons/bs';

type ProblemHintsProps = {
    hints?: string[];
};

const ProblemHints: React.FC<ProblemHintsProps> = ({ hints = [] }) => {
    const [expandedHints, setExpandedHints] = useState<Set<number>>(new Set());

    // Default hints if none provided
    const defaultHints = [
        "Try using a hash table to store the numbers you've seen so far.",
        'Think about the time complexity - can you do better than O(n²)?',
        'Consider using a two-pointer approach or binary search if the array is sorted.',
    ];

    const hintsToShow = hints.length > 0 ? hints : defaultHints;

    const toggleHint = (index: number) => {
        const newExpanded = new Set(expandedHints);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedHints(newExpanded);
    };

    return (
        <div className="space-y-3">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Hints</h3>
            {hintsToShow.map((hint, index) => (
                <div key={index} className="overflow-hidden rounded-lg border border-gray-200">
                    <button
                        onClick={() => toggleHint(index)}
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
                    >
                        <div className="flex items-center space-x-3">
                            <BsLightbulb className="text-yellow-500" size={18} />
                            <span className="font-medium text-gray-900">Hint {index + 1}</span>
                        </div>
                        {expandedHints.has(index) ? (
                            <AiOutlineUp className="text-gray-500" size={16} />
                        ) : (
                            <AiOutlineDown className="text-gray-500" size={16} />
                        )}
                    </button>

                    {expandedHints.has(index) && (
                        <div className="px-4 pb-4">
                            <div className="border-t border-gray-100 pt-4">
                                <p className="leading-relaxed text-gray-700">{hint}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProblemHints;
