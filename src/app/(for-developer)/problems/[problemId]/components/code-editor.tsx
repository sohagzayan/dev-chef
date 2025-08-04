'use client';

import { useEffect, useRef } from 'react';

interface CodeEditorProps {
    code: string;
    language: string;
    onChange: (code: string) => void;
}

export function CodeEditor({ code, language, onChange }: CodeEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [code]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;

            const newCode = code.substring(0, start) + '  ' + code.substring(end);
            onChange(newCode);

            // Set cursor position after the tab
            setTimeout(() => {
                e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
            }, 0);
        }
    };

    const getLanguageClass = () => {
        switch (language) {
            case 'javascript':
                return 'language-javascript';
            case 'python':
                return 'language-python';
            case 'java':
                return 'language-java';
            case 'cpp':
                return 'language-cpp';
            default:
                return 'language-javascript';
        }
    };

    return (
        <div className="relative h-full">
            <div className="absolute inset-0 bg-gray-900 p-4">
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`h-full w-full resize-none bg-transparent font-mono text-sm leading-relaxed text-gray-100 outline-none ${getLanguageClass()}`}
                    placeholder="Write your code here..."
                    spellCheck={false}
                    style={{
                        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                        lineHeight: '1.5',
                    }}
                />
            </div>

            {/* Line numbers */}
            <div className="absolute top-0 left-0 h-full w-12 border-r border-gray-700 bg-gray-800 p-4 select-none">
                <div className="font-mono text-xs text-gray-500">
                    {code.split('\n').map((_, index) => (
                        <div key={index} className="text-right">
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
