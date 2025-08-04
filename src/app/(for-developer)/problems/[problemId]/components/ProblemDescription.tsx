'use client';

import { useEffect, useRef, useState } from 'react';
import { AiFillDislike, AiFillLike, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAuth } from '@/context/AuthContext';
import { Problem } from '@/data/problem-data';
import AcceptedTab from './AcceptedTab';
import EditorialTab from './EditorialTab';
import ProblemHints from './ProblemHints';
import SolutionsTab from './SolutionsTab';
import SubmissionsTab from './SubmissionsTab';

type ProblemDescriptionProps = {
    problem: Problem;
    showAcceptedTab?: boolean;
    onSuccessfulSubmission?: () => void;
};

type TabType = 'description' | 'accepted' | 'editorial' | 'solutions' | 'submissions';

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
    problem,
    showAcceptedTab = false,
    onSuccessfulSubmission,
}) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('description');
    const [hasAcceptedSubmission, setHasAcceptedSubmission] = useState(false);
    const hasAutoSwitchedRef = useRef(false);
    const { isAuthenticated } = useAuth();

    const handleLike = async () => {
        if (updating) return;
        setUpdating(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLiked(!liked);
        if (disliked) setDisliked(false);
        setUpdating(false);
    };

    const handleDislike = async () => {
        if (updating) return;
        setUpdating(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDisliked(!disliked);
        if (liked) setLiked(false);
        setUpdating(false);
    };

    // Check for accepted submissions on component mount
    useEffect(() => {
        const checkAcceptedSubmission = async () => {
            // Only check for accepted submissions if user is authenticated
            if (!isAuthenticated) {
                setHasAcceptedSubmission(false);
                return;
            }

            try {
                const response = await fetch(
                    `/api/v1/submissions?problemId=${problem.id}&status=ACCEPTED&limit=1`,
                    {
                        credentials: 'include', // Include cookies for authentication
                    },
                );
                if (response.ok) {
                    const data = await response.json();
                    const hasSubmission = data.success && data.data.length > 0;
                    setHasAcceptedSubmission(hasSubmission);

                    // If we have an accepted submission but the tab isn't shown, trigger the callback
                    if (hasSubmission && !showAcceptedTab && onSuccessfulSubmission) {
                        onSuccessfulSubmission();
                    }
                }
            } catch (error) {
                console.error('Error checking accepted submission:', error);
                setHasAcceptedSubmission(false);
            }
        };

        checkAcceptedSubmission();
    }, [problem.id, showAcceptedTab, onSuccessfulSubmission, isAuthenticated]);

    // Auto-switch to accepted tab when it first becomes available
    useEffect(() => {
        if (showAcceptedTab && hasAcceptedSubmission && !hasAutoSwitchedRef.current) {
            setActiveTab('accepted');
            hasAutoSwitchedRef.current = true;
        }
    }, [showAcceptedTab, hasAcceptedSubmission]);

    // Reset auto-switch flag when problem changes
    useEffect(() => {
        hasAutoSwitchedRef.current = false;
    }, [problem.id]);

    const getDifficultyClass = (difficulty: string) => {
        switch (difficulty.toUpperCase()) {
            case 'EASY':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'MEDIUM':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'HARD':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'description':
                return (
                    <div className="space-y-6">
                        {/* Problem Statement */}
                        <div>
                            <div className="leading-relaxed whitespace-pre-wrap text-gray-800">
                                {problem.description}
                            </div>
                        </div>

                        {/* Examples */}
                        <div>
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Examples:</h3>
                            <div className="space-y-4">
                                {problem.examples.map((example, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                                    >
                                        <p className="mb-2 font-medium text-gray-900">
                                            Example {index + 1}:
                                        </p>
                                        <div className="space-y-2 text-sm">
                                            <div>
                                                <strong className="text-gray-900">Input:</strong>{' '}
                                                <code className="rounded bg-gray-100 px-1">
                                                    {example.input}
                                                </code>
                                            </div>
                                            <div>
                                                <strong className="text-gray-900">Output:</strong>{' '}
                                                <code className="rounded bg-gray-100 px-1">
                                                    {example.output}
                                                </code>
                                            </div>
                                            {example.explanation && (
                                                <div>
                                                    <strong className="text-gray-900">
                                                        Explanation:
                                                    </strong>{' '}
                                                    {example.explanation}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Constraints */}
                        <div>
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                Constraints:
                            </h3>
                            <ul className="list-inside list-disc space-y-1 text-gray-700">
                                {problem.constraints.map((constraint, index) => (
                                    <li key={index}>
                                        <code className="rounded bg-gray-100 px-1">
                                            {constraint}
                                        </code>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Follow-up */}
                        {problem.followUp && (
                            <div>
                                <p className="text-sm text-gray-600">
                                    <strong>Follow-up:</strong> {problem.followUp}
                                </p>
                            </div>
                        )}

                        {/* Hints Section */}
                        <ProblemHints hints={problem.hints} />
                    </div>
                );

            case 'accepted':
                if (!showAcceptedTab || !hasAcceptedSubmission) {
                    setActiveTab('description');
                    return null;
                }
                return <AcceptedTab problemId={problem.id} />;

            case 'editorial':
                const editorialApproaches = [
                    {
                        id: '1',
                        title: 'Brute Force',
                        algorithm:
                            'The brute force approach is simple. Loop through each element x and find if there is another value that equals to target−x.',
                        implementation: `function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}`,
                        timeComplexity: 'O(n²)',
                        spaceComplexity: 'O(1)',
                    },
                    {
                        id: '2',
                        title: 'Two-pass Hash Table',
                        intuition:
                            'To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.',
                        algorithm:
                            "A simple implementation uses two iterations. In the first iteration, we add each element's value as a key and its index as a value to the hash table. Then, in the second iteration, we check if each element's complement (target−nums[i]) exists in the hash table. If it does exist, we return current element's index and its complement's index. Beware that the complement must not be nums[i] itself!",
                        implementation: `function twoSum(nums, target) {
    const map = new Map();
    
    // First pass: build the hash table
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }
    
    // Second pass: find the complement
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement) && map.get(complement) !== i) {
            return [i, map.get(complement)];
        }
    }
    
    return [];
}`,
                        timeComplexity: 'O(n)',
                        spaceComplexity: 'O(n)',
                    },
                    {
                        id: '3',
                        title: 'One-pass Hash Table',
                        algorithm:
                            "It turns out we can do it in one-pass. While we are iterating and inserting elements into the hash table, we also look back to check if current element's complement already exists in the hash table. If it exists, we have found a solution and return the indices immediately.",
                        implementation: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
                        timeComplexity: 'O(n)',
                        spaceComplexity: 'O(n)',
                    },
                ];
                return (
                    <EditorialTab problemTitle={problem.title} approaches={editorialApproaches} />
                );

            case 'solutions':
                return <SolutionsTab problemId={problem.id} />;

            case 'submissions':
                return <SubmissionsTab problemId={problem.id} />;

            default:
                return null;
        }
    };

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-6">
                {/* Problem Header */}
                <div className="mb-6">
                    <h1 className="mb-3 text-2xl font-semibold text-gray-900">{problem?.title}</h1>

                    {/* Difficulty and Tags */}
                    <div className="mb-4 flex items-center space-x-3">
                        <span
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${getDifficultyClass(problem.difficulty)}`}
                        >
                            {problem.difficulty}
                        </span>
                        {isAuthenticated && (
                            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                {problem.attempts || 0} attempt
                                {(problem.attempts || 0) !== 1 ? 's' : ''}
                            </span>
                        )}
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                            Topics
                        </button>
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                            Companies
                        </button>
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                            Hint
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {[
                            { id: 'description', label: 'Description' },
                            ...(showAcceptedTab && hasAcceptedSubmission
                                ? [{ id: 'accepted', label: 'Accepted' }]
                                : []),
                            { id: 'editorial', label: 'Editorial' },
                            { id: 'solutions', label: 'Solutions' },
                            { id: 'submissions', label: 'Submissions' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="mb-8">{renderTabContent()}</div>

                {/* Engagement Metrics */}
                <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={handleLike}
                                    className={`rounded p-1 ${liked ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {updating ? (
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                    ) : (
                                        <AiFillLike size={16} />
                                    )}
                                </button>
                                <span className="text-sm text-gray-600">63.2K</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={handleDislike}
                                    className={`rounded p-1 ${disliked ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {updating ? (
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                    ) : (
                                        <AiFillDislike size={16} />
                                    )}
                                </button>
                                <span className="text-sm text-gray-600">1.5K</span>
                            </div>
                            <button className="text-sm text-gray-400 hover:text-gray-600">
                                Comments
                            </button>
                            <button className="text-sm text-gray-400 hover:text-gray-600">
                                Share
                            </button>
                        </div>

                        {/* Online Users */}
                        <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-600">2224 Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDescription;
