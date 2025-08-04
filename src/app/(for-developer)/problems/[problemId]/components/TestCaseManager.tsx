'use client';

import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

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

type TestCaseManagerProps = {
    testCases: TestCase[];
    onAddTestCase: (testCase: TestCase) => void;
    onDeleteTestCase: (id: string) => void;
    onRunTestCase: (testCase: TestCase) => void;
};

const TestCaseManager: React.FC<TestCaseManagerProps> = ({
    testCases,
    onAddTestCase,
    onDeleteTestCase,
    onRunTestCase,
}) => {
    const [activeTab, setActiveTab] = useState<string>(testCases[0]?.id || '');
    const [showAddForm, setShowAddForm] = useState(false);

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
    const [newTestCase, setNewTestCase] = useState({
        name: '',
        inputs: {} as Record<string, any>,
        expectedOutput: null as any,
    });

    const handleAddTestCase = () => {
        if (newTestCase.name && Object.keys(newTestCase.inputs).length > 0) {
            const testCase: TestCase = {
                id: `custom-${Date.now()}`,
                name: newTestCase.name,
                inputs: newTestCase.inputs,
                expectedOutput: newTestCase.expectedOutput,
                isCustom: true,
            };
            onAddTestCase(testCase);
            setNewTestCase({ name: '', inputs: {}, expectedOutput: null });
            setShowAddForm(false);
        }
    };

    const renderInputField = (key: string, value: any) => {
        if (Array.isArray(value)) {
            return (
                <div key={key} className="mb-3">
                    <label className="mb-1 block text-sm font-medium text-gray-300">{key} =</label>
                    <input
                        type="text"
                        value={JSON.stringify(value)}
                        onChange={(e) => {
                            try {
                                const parsed = JSON.parse(e.target.value);
                                setNewTestCase((prev) => ({
                                    ...prev,
                                    inputs: { ...prev.inputs, [key]: parsed },
                                }));
                            } catch {
                                // Handle invalid JSON
                            }
                        }}
                        className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white"
                        placeholder="[1, 2, 3]"
                    />
                </div>
            );
        }

        return (
            <div key={key} className="mb-3">
                <label className="mb-1 block text-sm font-medium text-gray-300">{key} =</label>
                <input
                    type="text"
                    value={value?.toString() || ''}
                    onChange={(e) =>
                        setNewTestCase((prev) => ({
                            ...prev,
                            inputs: { ...prev.inputs, [key]: e.target.value },
                        }))
                    }
                    className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white"
                    placeholder="Enter value"
                />
            </div>
        );
    };

    const renderTestCaseContent = (testCase: TestCase) => {
        return (
            <div className="p-4">
                <div className="space-y-4">
                    {/* Handle both old format (inputs/expectedOutput) and new format (input/output) */}
                    {testCase.inputs ? (
                        // Old format with structured inputs
                        Object.entries(testCase.inputs || {}).map(([key, value]) => (
                            <div key={key}>
                                <label className="mb-1 block text-sm font-medium text-gray-300">
                                    {key} =
                                </label>
                                <div className="rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white">
                                    {Array.isArray(value)
                                        ? JSON.stringify(value)
                                        : value?.toString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        // New format with raw input/output
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">
                                Input =
                            </label>
                            <div className="rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white">
                                {testCase.input || 'No input'}
                            </div>
                        </div>
                    )}

                    {(testCase.expectedOutput !== null || testCase.output !== null) && (
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">
                                Expected Output =
                            </label>
                            <div className="rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white">
                                {testCase.output ||
                                    (Array.isArray(testCase.expectedOutput)
                                        ? JSON.stringify(testCase.expectedOutput)
                                        : testCase.expectedOutput?.toString())}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-4 flex space-x-2">
                    <button
                        onClick={() => onRunTestCase(testCase)}
                        className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                        Run Test Case
                    </button>
                    {testCase.isCustom && (
                        <button
                            onClick={() => onDeleteTestCase(testCase.id)}
                            className="flex items-center rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                        >
                            <AiOutlineDelete className="mr-1" />
                            Delete
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="rounded-lg bg-gray-800">
            {/* Test Case Tabs */}
            <div className="flex items-center border-b border-gray-700">
                <div className="mr-4 text-xs text-gray-400">
                    {testCases.length} test case{testCases.length !== 1 ? 's' : ''}
                </div>
                {testCases.map((testCase, index) => (
                    <button
                        key={testCase.id}
                        onClick={() => setActiveTab(testCase.id)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === testCase.id
                                ? 'border-b-2 border-blue-500 bg-gray-700 text-white'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {testCase.name || `Case ${index + 1}`}
                    </button>
                ))}
                <button
                    onClick={() => setShowAddForm(true)}
                    className="ml-2 px-3 py-2 text-gray-400 hover:text-white"
                >
                    <AiOutlinePlus size={16} />
                </button>
            </div>

            {/* Test Case Content */}
            <div className="min-h-[200px]">
                {showAddForm ? (
                    <div className="p-4">
                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-300">
                                Test Case Name
                            </label>
                            <input
                                type="text"
                                value={newTestCase.name}
                                onChange={(e) =>
                                    setNewTestCase((prev) => ({ ...prev, name: e.target.value }))
                                }
                                className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white"
                                placeholder="Custom Test Case"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Input Parameters
                            </label>
                            {Object.entries(testCases[0]?.inputs || {}).map(([key, value]) =>
                                renderInputField(key, value),
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium text-gray-300">
                                Expected Output
                            </label>
                            <input
                                type="text"
                                value={newTestCase.expectedOutput?.toString() || ''}
                                onChange={(e) =>
                                    setNewTestCase((prev) => ({
                                        ...prev,
                                        expectedOutput: e.target.value,
                                    }))
                                }
                                className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white"
                                placeholder="Expected result"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={handleAddTestCase}
                                className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                            >
                                Add Test Case
                            </button>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="rounded bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    testCases.find((tc) => tc.id === activeTab) &&
                    renderTestCaseContent(testCases.find((tc) => tc.id === activeTab)!)
                )}
            </div>
        </div>
    );
};

export default TestCaseManager;
