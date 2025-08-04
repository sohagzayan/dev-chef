'use client';

import React from 'react';
import { BsChevronUp } from 'react-icons/bs';

type EditorFooterProps = {
    handleSubmit: () => void;
    handleRun: () => void;
    isRunning: boolean;
    isSubmitting?: boolean;
    isAuthenticated: boolean;
};

const EditorFooter: React.FC<EditorFooterProps> = ({
    handleSubmit,
    handleRun,
    isRunning,
    isSubmitting = false,
    isAuthenticated,
}) => {
    return (
        <div className="border-t border-gray-700 bg-gray-800 px-4 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-white">
                        <span>Console</span>
                        <BsChevronUp size={12} />
                    </button>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        className="flex items-center space-x-2 rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600"
                        onClick={handleRun}
                        disabled={isRunning}
                    >
                        {isRunning ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></div>
                                <span>Running...</span>
                            </>
                        ) : (
                            <>
                                <span>Run</span>
                            </>
                        )}
                    </button>
                    <button
                        className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            isSubmitting
                                ? 'cursor-not-allowed bg-gray-600 text-gray-300'
                                : isAuthenticated
                                  ? 'bg-green-600 text-white hover:bg-green-700'
                                  : 'cursor-not-allowed bg-gray-600 text-gray-400'
                        }`}
                        onClick={handleSubmit}
                        disabled={isSubmitting || !isAuthenticated}
                        title={!isAuthenticated ? 'Please log in to submit your solution' : ''}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></div>
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <span>Submit</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditorFooter;
