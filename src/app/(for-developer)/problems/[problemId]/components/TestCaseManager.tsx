'use client';

import { useEffect, useState } from 'react';

interface TestCase {
    id: string;
    name?: string;
    inputs?: Record<string, any>;
    expectedOutput?: any;
    input?: string;
    output?: string;
    isCustom?: boolean;
    isHidden?: boolean;
}

interface TestResult {
    case: number | string;
    status: 'PASSED' | 'FAILED' | 'ERROR';
    input?: string;
    output?: string;
    expected?: string;
    error?: string;
    runtime?: number;
    memory?: number;
}

type TestCaseManagerProps = {
    testCases: TestCase[];
    onRunTestCase: (testCase: TestCase) => void;
    testResults?: TestResult[];
};

const TestCaseManager: React.FC<TestCaseManagerProps> = ({
    testCases,
    onRunTestCase,
    testResults = [],
}) => {
    const [activeTab, setActiveTab] = useState<string>(testCases[0]?.id || '');

    // Update active tab when test cases change
    useEffect(() => {
        console.log('Test cases updated:', testCases.length);
        if (testCases.length > 0) {
            if (!testCases.find((tc) => tc.id === activeTab)) {
                setActiveTab(testCases[0].id);
            }
        } else {
            setActiveTab('');
        }
    }, [testCases, activeTab]);

    // Helper function to get test result for a specific test case
    const getTestResult = (testCaseId: string) => {
        return testResults.find((result) => result.case.toString() === testCaseId);
    };

    // Helper function to get test case status
    const getTestCaseStatus = (testCaseId: string) => {
        const result = getTestResult(testCaseId);
        return result ? result.status : null;
    };

    // Helper function to check if any test case has failed
    const hasAnyFailedTests = () => {
        return testResults.some(
            (result) => result.status === 'FAILED' || result.status === 'ERROR',
        );
    };

    // Helper function to check if all test cases have passed
    const haveAllTestsPassed = () => {
        return testResults.length > 0 && testResults.every((result) => result.status === 'PASSED');
    };

    const renderTestCaseContent = (testCase: TestCase) => {
        const testResult = getTestResult(testCase.id);

        return (
            <div className="p-6">
                <div className="space-y-6">
                    {/* Handle both old format (inputs/expectedOutput) and new format (input/output) */}
                    {testCase.inputs ? (
                        // Old format with structured inputs
                        Object.entries(testCase.inputs || {}).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                                    <span>{key} =</span>
                                </label>
                                <div className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 font-mono text-sm text-white">
                                    {Array.isArray(value)
                                        ? JSON.stringify(value)
                                        : value?.toString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        // New format with raw input/output
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                                <span>Input =</span>
                            </label>
                            <div className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 font-mono text-sm text-white">
                                {testCase.input || 'No input'}
                            </div>
                        </div>
                    )}

                    {(testCase.expectedOutput !== null || testCase.output !== null) && (
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                <span>Expected Output =</span>
                            </label>
                            <div className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 font-mono text-sm text-white">
                                {testCase.output ||
                                    (Array.isArray(testCase.expectedOutput)
                                        ? JSON.stringify(testCase.expectedOutput)
                                        : testCase.expectedOutput?.toString())}
                            </div>
                        </div>
                    )}

                    {/* Show test result if available */}
                    {testResult && (
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                                <span>Actual Output =</span>
                            </label>
                            <div
                                className={`rounded-lg border px-4 py-3 font-mono text-sm ${
                                    testResult.status === 'PASSED'
                                        ? 'border-green-500 bg-green-900/20 text-green-300'
                                        : testResult.status === 'FAILED'
                                          ? 'border-red-500 bg-red-900/20 text-red-300'
                                          : 'border-yellow-500 bg-yellow-900/20 text-yellow-300'
                                }`}
                            >
                                {testResult.error
                                    ? testResult.error
                                    : testResult.output || 'No output'}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex items-center space-x-3">
                    <button
                        onClick={() => onRunTestCase(testCase)}
                        className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        <span>▶</span>
                        <span>Run Test Case</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="rounded-lg border border-gray-700 bg-gray-800">
            {/* Test Case Header */}
            <div className="bg-gray-750 flex items-center justify-between border-b border-gray-700 px-4 py-3">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div
                            className={`h-2 w-2 rounded-full ${
                                hasAnyFailedTests()
                                    ? 'bg-red-500'
                                    : haveAllTestsPassed()
                                      ? 'bg-green-500'
                                      : 'bg-blue-500'
                            }`}
                        ></div>
                        <span className="text-sm font-medium text-white">
                            {testCases.length} Test Case{testCases.length !== 1 ? 's' : ''}
                        </span>
                        {hasAnyFailedTests() && (
                            <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                                Failed
                            </span>
                        )}
                        {haveAllTestsPassed() && (
                            <span className="ml-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                                Passed
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>Visible Test Cases</span>
                </div>
            </div>

            {/* Test Case Tabs */}
            <div className="bg-gray-750 flex items-center border-b border-gray-700">
                {testCases.map((testCase, index) => {
                    const status = getTestCaseStatus(testCase.id);
                    const isFailed = status === 'FAILED' || status === 'ERROR';
                    const isPassed = status === 'PASSED';

                    return (
                        <button
                            key={testCase.id}
                            onClick={() => setActiveTab(testCase.id)}
                            className={`relative px-6 py-3 text-sm font-medium transition-all duration-200 ${
                                activeTab === testCase.id
                                    ? isFailed
                                        ? 'border-b-2 border-red-500 bg-gray-800 text-red-400'
                                        : isPassed
                                          ? 'border-b-2 border-green-500 bg-gray-800 text-green-400'
                                          : 'border-b-2 border-blue-500 bg-gray-800 text-blue-400'
                                    : isFailed
                                      ? 'hover:bg-gray-750 text-red-400 hover:text-red-300'
                                      : isPassed
                                        ? 'hover:bg-gray-750 text-green-400 hover:text-green-300'
                                        : 'hover:bg-gray-750 text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            <span className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">#{index + 1}</span>
                                <span>Test Case {index + 1}</span>
                                {status && (
                                    <span
                                        className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                                            isFailed
                                                ? 'bg-red-500 text-white'
                                                : isPassed
                                                  ? 'bg-green-500 text-white'
                                                  : 'bg-yellow-500 text-white'
                                        }`}
                                    >
                                        {status}
                                    </span>
                                )}
                            </span>
                            {activeTab === testCase.id && (
                                <div
                                    className={`absolute right-0 bottom-0 left-0 h-0.5 ${
                                        isFailed
                                            ? 'bg-red-500'
                                            : isPassed
                                              ? 'bg-green-500'
                                              : 'bg-blue-500'
                                    }`}
                                ></div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Test Case Content */}
            <div className="min-h-[200px]">
                {testCases.find((tc) => tc.id === activeTab) &&
                    renderTestCaseContent(testCases.find((tc) => tc.id === activeTab)!)}
            </div>
        </div>
    );
};

export default TestCaseManager;
