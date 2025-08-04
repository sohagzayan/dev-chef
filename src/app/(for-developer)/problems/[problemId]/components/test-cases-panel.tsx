'use client';

import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface TestCase {
    case: number;
    status: 'PASSED' | 'FAILED' | 'RUNNING';
    input: string;
    output: string;
    expected: string;
    runtime: number;
    memory: number;
}

interface TestCasesPanelProps {
    activeTestCase: number;
    onTestCaseChange: (index: number) => void;
    testResults: TestCase[];
    testCases?: any[];
}

export function TestCasesPanel({
    activeTestCase,
    onTestCaseChange,
    testResults,
    testCases,
}: TestCasesPanelProps) {
    const defaultTestCases =
        testCases && testCases.length > 0
            ? testCases.map((tc, index) => ({
                  case: index + 1,
                  input: tc.input,
                  output: tc.output,
                  expected: tc.output,
              }))
            : [
                  {
                      case: 1,
                      input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3',
                      output: 'true',
                      expected: 'true',
                  },
                  {
                      case: 2,
                      input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13',
                      output: 'false',
                      expected: 'false',
                  },
                  {
                      case: 3,
                      input: 'matrix = [[1]], target = 1',
                      output: 'true',
                      expected: 'true',
                  },
              ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PASSED':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'FAILED':
                return <XCircle className="h-4 w-4 text-red-500" />;
            case 'RUNNING':
                return <Clock className="h-4 w-4 animate-spin text-yellow-500" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PASSED':
                return 'text-green-500';
            case 'FAILED':
                return 'text-red-500';
            case 'RUNNING':
                return 'text-yellow-500';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <div className="p-4">
            <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-300">Testcases</h3>
            </div>

            {/* Test Case Tabs */}
            <div className="mb-4 flex space-x-1">
                {defaultTestCases.map((testCase, index) => {
                    const result = testResults.find((r) => r.case === testCase.case);
                    const status = result?.status || '';

                    return (
                        <button
                            key={testCase.case}
                            onClick={() => onTestCaseChange(index)}
                            className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                                activeTestCase === index
                                    ? 'bg-gray-700 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                {getStatusIcon(status)}
                                <span>Case {testCase.case}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Active Test Case Details */}
            {defaultTestCases[activeTestCase] && (
                <div className="space-y-3">
                    <div>
                        <div className="mb-1 text-xs font-medium text-gray-400">Input:</div>
                        <div className="rounded bg-gray-900 p-3 font-mono text-sm text-gray-300">
                            {defaultTestCases[activeTestCase].input}
                        </div>
                    </div>

                    <div>
                        <div className="mb-1 text-xs font-medium text-gray-400">Output:</div>
                        <div className="rounded bg-gray-900 p-3 font-mono text-sm text-gray-300">
                            {defaultTestCases[activeTestCase].output}
                        </div>
                    </div>

                    {/* Test Results */}
                    {testResults.length > 0 && (
                        <div className="space-y-2">
                            {testResults.map((result) => (
                                <div
                                    key={result.case}
                                    className="flex items-center justify-between rounded bg-gray-900 p-2"
                                >
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(result.status)}
                                        <span
                                            className={`text-sm font-medium ${getStatusColor(result.status)}`}
                                        >
                                            Test case {result.case}: {result.status}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {result.runtime}ms, {result.memory}MB
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
