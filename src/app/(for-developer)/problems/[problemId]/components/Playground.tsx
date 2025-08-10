'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import Split from 'split.js';
import { useAuth } from '@/context/AuthContext';
import { Problem } from '@/data/problem-data';
import EditorFooter from './EditorFooter';
import TestCaseManager from './TestCaseManager';

type PlaygroundProps = {
    problem: Problem;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setSolved: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccessfulSubmission?: () => void;
    onRunStart?: () => void;
    onRunComplete?: (canSubmitNow: boolean) => void;
    onSubmitStart?: () => void;
    onSubmitComplete?: () => void;
    isRunning?: boolean;
    isSubmitting?: boolean;
    setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
    canSubmit?: boolean;
};

export interface ISettings {
    fontSize: string;
    settingsModalIsOpen: boolean;
    dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({
    problem,
    setSuccess,
    setSolved,
    onSuccessfulSubmission,
    onRunStart,
    onRunComplete,
    onSubmitStart,
    onSubmitComplete,
    isRunning: externalIsRunning = false,
    isSubmitting: externalIsSubmitting = false,
    setIsSubmitting: externalSetIsSubmitting,
}) => {
    const { isAuthenticated, refreshSession } = useAuth();
    const [userCode, setUserCode] = useState<string>(problem.starterCode.javascript || '');
    const [fontSize] = useState('16px');
    const [language, setLanguage] = useState('javascript');
    const [isRunning, setIsRunning] = useState(false);
    const [testResults, setTestResults] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'testcase' | 'testresult'>('testcase');
    const [testCases, setTestCases] = useState(problem.testCases);

    // Use external state if provided, otherwise use internal state
    const currentIsRunning = externalIsRunning !== undefined ? externalIsRunning : isRunning;
    const currentIsSubmitting = externalIsSubmitting !== undefined ? externalIsSubmitting : false;

    // Update test cases and user code when problem changes
    useEffect(() => {
        console.log('Problem changed:', problem.title);
        console.log('Test cases:', problem.testCases);
        setTestCases(problem.testCases || []);
        setUserCode(problem.starterCode?.javascript || '');
        setTestResults([]);
        setActiveTab('testcase');
    }, [problem.id, problem.testCases, problem.starterCode?.javascript]);

    // Effect to trigger run when external isRunning becomes true
    useEffect(() => {
        if (externalIsRunning && !isRunning) {
            handleRun();
        }
    }, [externalIsRunning]);

    const codeEditorRef = useRef<HTMLDivElement>(null);
    const testPanelRef = useRef<HTMLDivElement>(null);
    const splitInstanceRef = useRef<Split.Instance | null>(null);

    const [settings] = useState<ISettings>({
        fontSize: fontSize,
        settingsModalIsOpen: false,
        dropdownIsOpen: false,
    });

    // Initialize vertical split
    useEffect(() => {
        if (codeEditorRef.current && testPanelRef.current) {
            splitInstanceRef.current = Split([codeEditorRef.current, testPanelRef.current], {
                sizes: [60, 40], // 60% code editor, 40% test panel
                minSize: [200, 150], // minimum heights
                gutterSize: 4,
                snapOffset: 0,
                dragInterval: 1,
                direction: 'vertical',
                cursor: 'row-resize',
                gutter: () => {
                    const gutter = document.createElement('div');
                    gutter.className = 'gutter gutter-vertical';
                    gutter.style.cssText = `
                        background-color: #374151;
                        cursor: row-resize;
                        position: relative;
                        transition: background-color 0.2s ease;
                    `;

                    // Add hover effect
                    gutter.addEventListener('mouseenter', () => {
                        gutter.style.backgroundColor = '#4B5563';
                    });

                    gutter.addEventListener('mouseleave', () => {
                        gutter.style.backgroundColor = '#374151';
                    });

                    return gutter;
                },
            });
        }

        return () => {
            if (splitInstanceRef.current) {
                splitInstanceRef.current.destroy();
            }
        };
    }, []);

    const getLanguageExtension = () => {
        switch (language) {
            case 'javascript':
                return javascript();
            case 'python':
                return python();
            case 'java':
                return java();
            case 'cpp':
                return cpp();
            default:
                return python();
        }
    };

    useEffect(() => {
        if (problem) {
            setUserCode(problem.starterCode[language as keyof typeof problem.starterCode] || '');
            setTestCases(problem.testCases);
        }
    }, [problem, language]);

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        if (problem) {
            setUserCode(problem.starterCode[newLanguage as keyof typeof problem.starterCode] || '');
        }
    };

    const handleRun = useCallback(async () => {
        // Call external callback if provided
        if (onRunStart) {
            onRunStart();
        } else {
            setIsRunning(true);
        }

        setTestResults([]);

        try {
            // Execute code against test cases using the API
            const response = await fetch(`/api/v1/problems/${problem.id}/test-cases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies for authentication
                body: JSON.stringify({
                    code: userCode,
                    language,
                    testCaseIds: testCases.map((tc) => tc.id),
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Please log in to run test cases');
                } else if (response.status === 500) {
                    // Try to get more specific error information
                    try {
                        const errorData = await response.json();
                        throw new Error(
                            errorData.message || 'Server error: Failed to run test cases',
                        );
                    } catch {
                        throw new Error(
                            `Server error (${response.status}): Failed to run test cases`,
                        );
                    }
                } else {
                    throw new Error(`HTTP ${response.status}: Failed to run test cases`);
                }
            }

            const result = await response.json();

            if (result.success) {
                // Transform results to match the expected format
                const transformedResults = result.data.results.map(
                    (testResult: any, index: number) => ({
                        case: index + 1,
                        status: testResult.status,
                        input: testResult.input,
                        output: testResult.actualOutput || 'No output',
                        expected: testResult.expectedOutput,
                        runtime: testResult.runtime,
                        memory: testResult.memory,
                        error: testResult.error,
                    }),
                );

                setTestResults(transformedResults);
                setActiveTab('testresult');

                // Check if all tests passed
                const allPassed = result.data.summary.allPassed;
                const newCanSubmit = allPassed;

                // Call external callback if provided
                if (onRunComplete) {
                    onRunComplete(newCanSubmit);
                } else {
                    // setCanSubmit(newCanSubmit); // This line is removed
                }
            } else {
                throw new Error(result.message || 'Failed to run test cases');
            }
        } catch (error) {
            console.error('Run failed:', error);

            // Show user-friendly error message
            const errorMessage = error instanceof Error ? error.message : 'Run failed';

            // If it's an authentication error, show a more helpful message
            if (errorMessage.includes('Please log in')) {
                alert(
                    'Please log in to run test cases. You can log in using the login button in the top navigation.',
                );
            }

            setTestResults([
                {
                    case: 1,
                    status: 'ERROR',
                    error: errorMessage,
                },
            ]);

            // Call external callback if provided
            if (onRunComplete) {
                onRunComplete(false);
            } else {
                // setCanSubmit(false); // This line is removed
            }
        } finally {
            if (!onRunStart) {
                setIsRunning(false);
            }
        }
    }, [userCode, language, testCases, problem.id, onRunStart, onRunComplete]);

    const handleSubmit = useCallback(async () => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            // Show a more helpful message with a link to login
            const shouldLogin = confirm(
                'You need to log in to submit your solution. Would you like to go to the login page now?',
            );
            if (shouldLogin) {
                window.location.href =
                    '/developers/login?redirect=' + encodeURIComponent(window.location.pathname);
            }
            return;
        }

        // Set submitting state
        if (externalSetIsSubmitting) {
            externalSetIsSubmitting(true);
        }

        // Call external callback if provided
        if (onSubmitStart) {
            onSubmitStart();
        }

        try {
            // Submit code using the real submission API
            const response = await fetch('/api/v1/submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies for authentication
                body: JSON.stringify({
                    problemId: problem.id,
                    language,
                    code: userCode,
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Try to refresh the session first
                    const refreshSuccess = await refreshSession();
                    if (refreshSuccess) {
                        // Retry the submission after successful refresh
                        const retryResponse = await fetch('/api/v1/submissions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                                problemId: problem.id,
                                language,
                                code: userCode,
                            }),
                        });

                        if (retryResponse.ok) {
                            const retryResult = await retryResponse.json();
                            if (retryResult.success) {
                                // Handle test results from submission
                                if (retryResult.data.testResults) {
                                    setTestResults(retryResult.data.testResults);
                                    setActiveTab('testresult');
                                }

                                // Check if all tests passed
                                const allPassed = retryResult.data.testResults?.every(
                                    (r: any) => r.status === 'PASSED',
                                );

                                if (allPassed) {
                                    // Show success
                                    setSuccess(true);
                                    setTimeout(() => {
                                        setSuccess(false);
                                    }, 4000);
                                    setSolved(true);

                                    // Call the callback to show accepted tab
                                    if (onSuccessfulSubmission) {
                                        onSuccessfulSubmission();
                                    }

                                    // Call external callback if provided
                                    if (onSubmitComplete) {
                                        onSubmitComplete();
                                    }
                                } else {
                                    // Show test case failures
                                    console.log('Test cases failed:', retryResult.data.testResults);
                                }
                                return;
                            }
                        }
                    }
                    throw new Error('Please log in to submit your solution');
                } else {
                    throw new Error('Failed to submit solution');
                }
            }

            const result = await response.json();

            if (result.success) {
                // Handle test results from submission
                if (result.data.testResults) {
                    setTestResults(result.data.testResults);
                    setActiveTab('testresult');
                }

                // Check if all tests passed
                const allPassed = result.data.testResults?.every((r: any) => r.status === 'PASSED');

                if (allPassed) {
                    // Show success
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 4000);
                    setSolved(true);

                    // Call the callback to show accepted tab
                    if (onSuccessfulSubmission) {
                        onSuccessfulSubmission();
                    }

                    // Call external callback if provided
                    if (onSubmitComplete) {
                        onSubmitComplete();
                    }
                } else {
                    // Show test case failures - they are already displayed in the test results tab
                    console.log('Test cases failed:', result.data.testResults);
                }
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission failed:', error);

            // Show user-friendly error message
            const errorMessage = error instanceof Error ? error.message : 'Submission failed';

            // If it's an authentication error, show a more helpful message
            if (errorMessage.includes('Please log in')) {
                const shouldLogin = confirm(
                    'Your session has expired. Would you like to log in again?',
                );
                if (shouldLogin) {
                    window.location.href =
                        '/developers/login?redirect=' +
                        encodeURIComponent(window.location.pathname);
                }
            } else {
                alert(`Submission failed: ${errorMessage}`);
            }
        } finally {
            // Reset submitting state
            if (externalSetIsSubmitting) {
                externalSetIsSubmitting(false);
            }
        }
    }, [
        isAuthenticated,
        refreshSession,
        onSubmitStart,
        problem.id,
        language,
        userCode,
        setSuccess,
        setSolved,
        onSuccessfulSubmission,
        onSubmitComplete,
        externalSetIsSubmitting,
    ]);

    const onChange = (value: string) => {
        setUserCode(value);
    };

    const handleRunSingleTestCase = async (testCase: any) => {
        // Call external callback if provided
        if (onRunStart) {
            onRunStart();
        } else {
            setIsRunning(true);
        }

        try {
            // Execute code against the specific test case using the existing API
            const response = await fetch(`/api/v1/problems/${problem.id}/test-cases`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies for authentication
                body: JSON.stringify({
                    code: userCode,
                    language,
                    testCaseIds: [testCase.id], // Only run this specific test case
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Please log in to run test cases');
                } else if (response.status === 500) {
                    // Try to get more specific error information
                    try {
                        const errorData = await response.json();
                        throw new Error(
                            errorData.message || 'Server error: Failed to run test case',
                        );
                    } catch {
                        throw new Error(
                            `Server error (${response.status}): Failed to run test case`,
                        );
                    }
                } else {
                    throw new Error(`HTTP ${response.status}: Failed to run test case`);
                }
            }

            const result = await response.json();

            if (result.success) {
                // Transform results to match the expected format
                const transformedResults = result.data.results.map((testResult: any) => ({
                    case: testCase.id, // Use testCase.id as case identifier
                    status: testResult.status,
                    input: testResult.input,
                    output: testResult.actualOutput || 'No output',
                    expected: testResult.expectedOutput,
                    runtime: testResult.runtime,
                    memory: testResult.memory,
                    error: testResult.error,
                }));

                setTestResults(transformedResults);
                setActiveTab('testresult');

                // Check if the test case passed
                const passed = result.data.summary.allPassed;

                // Call external callback if provided
                if (onRunComplete) {
                    onRunComplete(passed);
                }
            } else {
                throw new Error(result.message || 'Failed to run test case');
            }
        } catch (error) {
            console.error('Run single test case failed:', error);

            // Show user-friendly error message
            const errorMessage = error instanceof Error ? error.message : 'Run failed';

            // If it's an authentication error, show a more helpful message
            if (errorMessage.includes('Please log in')) {
                alert(
                    'Please log in to run test cases. You can log in using the login button in the top navigation.',
                );
            }

            setTestResults([
                {
                    case: testCase.id,
                    status: 'ERROR',
                    error: errorMessage,
                },
            ]);

            // Call external callback if provided
            if (onRunComplete) {
                onRunComplete(false);
            }
        } finally {
            if (!onRunStart) {
                setIsRunning(false);
            }
        }
    };

    const handleViewSource = () => {
        // Show the current user's code in a modal or alert
        // For now, we'll use a simple alert, but this could be enhanced with a proper modal
        const codeToShow = userCode || problem.starterCode?.javascript || 'No code available';

        // Use a more user-friendly approach - could be replaced with a modal
        if (typeof window !== 'undefined') {
            // Create a temporary textarea to copy the code
            const textarea = document.createElement('textarea');
            textarea.value = codeToShow;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            // Show a notification that code has been copied
            alert('Source code has been copied to clipboard!');
        }
    };

    return (
        <div className="flex h-full flex-col bg-gray-900">
            {/* 🟩 3.1 Top Right – Code Editor */}
            <div
                ref={codeEditorRef}
                className="flex flex-col bg-gray-900"
                style={{ minHeight: '200px' }}
            >
                {/* Code Editor Header */}
                <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-2">
                    <div className="flex items-center space-x-4">
                        <span className="font-medium text-white">Code</span>
                        <div className="flex items-center space-x-2">
                            <select
                                value={language}
                                onChange={(e) => handleLanguageChange(e.target.value)}
                                className="rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm text-white"
                            >
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </select>
                            <span className="text-sm text-gray-400">Auto</span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400">Saved</div>
                </div>

                {/* Code Editor */}
                <div className="flex-1 overflow-hidden">
                    <CodeMirror
                        value={userCode}
                        theme={vscodeDark}
                        onChange={onChange}
                        extensions={[getLanguageExtension()]}
                        style={{ fontSize: settings.fontSize, height: '100%' }}
                    />
                </div>
            </div>

            {/* 🟦 3.2 Bottom Right – Testcase / Output Viewer */}
            <div
                ref={testPanelRef}
                className="flex flex-col border-t border-gray-700 bg-gray-800"
                style={{ minHeight: '150px' }}
            >
                <div className="flex-1 overflow-y-auto p-4">
                    {/* Test Case Tabs */}
                    <div className="mb-4 flex items-center space-x-6">
                        <div className="flex items-center space-x-1">
                            <input
                                type="radio"
                                id="testcase"
                                name="test-tab"
                                checked={activeTab === 'testcase'}
                                onChange={() => setActiveTab('testcase')}
                                className="text-green-500"
                            />
                            <label htmlFor="testcase" className="font-medium text-white">
                                Testcase
                            </label>
                        </div>
                        <div className="flex items-center space-x-1">
                            <input
                                type="radio"
                                id="testresult"
                                name="test-tab"
                                checked={activeTab === 'testresult'}
                                onChange={() => setActiveTab('testresult')}
                                className="text-gray-400"
                            />
                            <label htmlFor="testresult" className="text-gray-400">
                                Test Result
                            </label>
                        </div>
                    </div>

                    {activeTab === 'testcase' ? (
                        <>
                            {/* Test Case Manager */}
                            <TestCaseManager
                                key={problem.id} // Force re-render when problem changes
                                testCases={testCases}
                                testResults={testResults}
                                onRunTestCase={(testCase) => {
                                    // Handle running individual test case
                                    handleRunSingleTestCase(testCase);
                                }}
                            />

                            {/* Source Link */}
                            <div className="mt-4">
                                <button
                                    onClick={() => handleViewSource()}
                                    className="text-sm text-blue-400 transition-colors hover:text-blue-300"
                                >
                                    &lt;/&gt; Source
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Test Results View */
                        <div className="space-y-3">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="text-sm text-gray-400">
                                    Executing {testResults.length} test case
                                    {testResults.length !== 1 ? 's' : ''} for {problem.title}
                                </div>
                                {testResults.length > 0 && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-400">Results:</span>
                                        <span
                                            className={`rounded px-2 py-1 text-xs font-medium ${
                                                testResults.every((r) => r.status === 'PASSED')
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-500 text-white'
                                            }`}
                                        >
                                            {
                                                testResults.filter((r) => r.status === 'PASSED')
                                                    .length
                                            }
                                            /{testResults.length} passed
                                        </span>
                                    </div>
                                )}
                            </div>
                            {testResults.length > 0 ? (
                                <>
                                    {!testResults.every((r) => r.status === 'PASSED') && (
                                        <div className="mb-4 rounded-lg border border-red-500 bg-red-900/20 p-3 text-red-300">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium">
                                                    ❌ Submission Failed
                                                </span>
                                                <span className="text-xs">
                                                    {
                                                        testResults.filter(
                                                            (r) => r.status !== 'PASSED',
                                                        ).length
                                                    }{' '}
                                                    test case(s) failed
                                                </span>
                                            </div>
                                            <div className="mt-1 text-xs text-red-200">
                                                Check the details below to see what went wrong
                                            </div>
                                        </div>
                                    )}
                                    {testResults.map((result, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-lg border p-3 ${
                                                result.status === 'PASSED'
                                                    ? 'border-green-500 bg-green-900/20 text-green-300'
                                                    : result.status === 'FAILED'
                                                      ? 'border-red-500 bg-red-900/20 text-red-300'
                                                      : 'border-yellow-500 bg-yellow-900/20 text-yellow-300'
                                            }`}
                                        >
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="font-medium">
                                                    Test Case {result.case}
                                                </span>
                                                <span
                                                    className={`rounded px-2 py-1 text-xs font-medium ${
                                                        result.status === 'PASSED'
                                                            ? 'bg-green-500 text-white'
                                                            : result.status === 'FAILED'
                                                              ? 'bg-red-500 text-white'
                                                              : 'bg-yellow-500 text-white'
                                                    }`}
                                                >
                                                    {result.status}
                                                </span>
                                            </div>
                                            {/* Input */}
                                            {result.input && (
                                                <div className="mt-2 text-sm">
                                                    <span className="font-medium text-gray-300">
                                                        Input:
                                                    </span>
                                                    <div className="mt-1 rounded bg-gray-700 p-2 font-mono text-xs text-gray-200">
                                                        {result.input
                                                            .split('\n')
                                                            .map((line: string, i: number) => (
                                                                <div key={i}>{line}</div>
                                                            ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Output */}
                                            {result.output && (
                                                <div className="mt-2 text-sm">
                                                    <span className="font-medium text-gray-300">
                                                        Output:
                                                    </span>
                                                    <div className="mt-1 rounded bg-gray-700 p-2 font-mono text-xs text-gray-200">
                                                        {result.output}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Expected Output */}
                                            {result.expected && (
                                                <div className="mt-2 text-sm">
                                                    <span className="font-medium text-gray-300">
                                                        Expected:
                                                    </span>
                                                    <div className="mt-1 rounded bg-gray-700 p-2 font-mono text-xs text-gray-200">
                                                        {result.expected}
                                                    </div>
                                                </div>
                                            )}

                                            {result.error && (
                                                <div className="mt-2 text-sm">
                                                    <span className="font-medium text-red-400">
                                                        Error:
                                                    </span>{' '}
                                                    <span className="text-red-300">
                                                        {result.error}
                                                    </span>
                                                </div>
                                            )}
                                            {result.runtime && (
                                                <div className="mt-1 text-xs opacity-75">
                                                    Runtime: {result.runtime}ms | Memory:{' '}
                                                    {result.memory}MB
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="py-8 text-center text-gray-400">
                                    No test results yet. Click &quot;Run&quot; to execute your code.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Editor Footer */}
            <EditorFooter
                handleSubmit={handleSubmit}
                handleRun={handleRun}
                isRunning={currentIsRunning}
                isSubmitting={currentIsSubmitting}
                isAuthenticated={isAuthenticated}
            />
        </div>
    );
};

export default Playground;
