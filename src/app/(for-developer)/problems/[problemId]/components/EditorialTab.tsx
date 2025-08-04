'use client';

import { useState } from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai';

interface EditorialApproach {
    id: string;
    title: string;
    algorithm: string;
    implementation: string;
    timeComplexity: string;
    spaceComplexity: string;
    intuition?: string;
}

interface EditorialTabProps {
    problemTitle: string;
    approaches: EditorialApproach[];
}

const EditorialTab: React.FC<EditorialTabProps> = ({ problemTitle, approaches }) => {
    const [activeApproach, setActiveApproach] = useState(0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">{problemTitle}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>LeetCode</span>
                    <span>11160078</span>
                    <span>Jun 25, 2021</span>
                    <div className="flex items-center space-x-2">
                        <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                            Editorial
                        </span>
                        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                            <AiOutlinePlayCircle size={16} />
                            <span>Video Solution</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Solution Article */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 text-lg font-semibold text-blue-900">Solution Article</h3>
                <p className="text-blue-800">
                    This article provides multiple approaches to solve the problem with detailed
                    explanations.
                </p>
            </div>

            {/* Approach Navigation */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    {approaches.map((approach, index) => (
                        <button
                            key={approach.id}
                            onClick={() => setActiveApproach(index)}
                            className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                                activeApproach === index
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            }`}
                        >
                            {approach.title}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Approach Content */}
            {approaches[activeApproach] && (
                <div className="space-y-6">
                    <div>
                        <h3 className="mb-4 text-xl font-semibold text-gray-900">
                            {approaches[activeApproach].title}
                        </h3>

                        {approaches[activeApproach].intuition && (
                            <div className="mb-6">
                                <h4 className="mb-3 text-lg font-semibold text-gray-900">
                                    Intuition
                                </h4>
                                <p className="leading-relaxed text-gray-700">
                                    {approaches[activeApproach].intuition}
                                </p>
                            </div>
                        )}

                        <div className="mb-6">
                            <h4 className="mb-3 text-lg font-semibold text-gray-900">Algorithm</h4>
                            <div className="rounded-lg bg-gray-50 p-4">
                                <pre className="text-sm whitespace-pre-wrap text-gray-800">
                                    {approaches[activeApproach].algorithm}
                                </pre>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="mb-3 text-lg font-semibold text-gray-900">
                                Implementation
                            </h4>
                            <div className="rounded-lg bg-gray-900 p-4">
                                <pre className="overflow-x-auto text-sm text-gray-100">
                                    <code>{approaches[activeApproach].implementation}</code>
                                </pre>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="mb-3 text-lg font-semibold text-gray-900">
                                Complexity Analysis
                            </h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <h5 className="mb-2 font-semibold text-gray-900">
                                        Time complexity: {approaches[activeApproach].timeComplexity}
                                    </h5>
                                    <p className="text-sm text-gray-700">
                                        {activeApproach === 0 &&
                                            'For each element, we try to find its complement by looping through the rest of the array which takes O(n) time. Therefore, the time complexity is O(n²).'}
                                        {activeApproach === 1 &&
                                            'We traverse the list containing n elements exactly twice. Since the hash table reduces the lookup time to O(1), the overall time complexity is O(n).'}
                                        {activeApproach === 2 &&
                                            'We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.'}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <h5 className="mb-2 font-semibold text-gray-900">
                                        Space complexity:{' '}
                                        {approaches[activeApproach].spaceComplexity}
                                    </h5>
                                    <p className="text-sm text-gray-700">
                                        {activeApproach === 0 &&
                                            'The space required does not depend on the size of the input array, so only constant space is used.'}
                                        {activeApproach === 1 &&
                                            'The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.'}
                                        {activeApproach === 2 &&
                                            'The extra space required depends on the number of items stored in the hash table, which stores at most n elements.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Comments Section */}
            <div className="border-t border-gray-200 pt-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Comments (2.6K)</h3>
                    <select className="rounded border border-gray-300 px-2 py-1 text-sm">
                        <option>Sort by: Best</option>
                        <option>Sort by: Newest</option>
                        <option>Sort by: Oldest</option>
                    </select>
                </div>

                {/* Sample Comments */}
                <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 p-4">
                        <div className="mb-2 flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                                <span className="text-sm font-medium text-white">U</span>
                            </div>
                            <span className="font-medium text-gray-900">User123</span>
                            <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-gray-700">
                            Great explanation! The hash table approach is much more efficient than
                            the brute force solution.
                        </p>
                        <div className="mt-3 flex items-center space-x-4 text-sm">
                            <button className="text-gray-500 hover:text-blue-600">👍 15</button>
                            <button className="text-gray-500 hover:text-blue-600">Reply</button>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">
                        <div className="mb-2 flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                                <span className="text-sm font-medium text-white">C</span>
                            </div>
                            <span className="font-medium text-gray-900">CodeMaster</span>
                            <span className="text-sm text-gray-500">1 week ago</span>
                        </div>
                        <p className="text-gray-700">
                            The one-pass hash table solution is elegant. It&apos;s amazing how we
                            can solve this in O(n) time and space.
                        </p>
                        <div className="mt-3 flex items-center space-x-4 text-sm">
                            <button className="text-gray-500 hover:text-blue-600">👍 8</button>
                            <button className="text-gray-500 hover:text-blue-600">Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorialTab;
