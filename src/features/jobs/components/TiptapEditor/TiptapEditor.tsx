'use client';

import { useEffect, useRef } from 'react';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export function TiptapEditor({ content, onChange, placeholder }: TiptapEditorProps) {
    const isUpdatingFromEditor = useRef(false);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Start typing...',
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            isUpdatingFromEditor.current = true;
            onChange(editor.getHTML());
            // Reset flag after a brief delay
            setTimeout(() => {
                isUpdatingFromEditor.current = false;
            }, 0);
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] px-4 py-3 text-gray-900 placeholder:text-gray-400',
            },
        },
    });

    // Sync content when prop changes externally (for form reset, etc.)
    // Only update if the change didn't come from the editor itself
    useEffect(() => {
        if (editor && !isUpdatingFromEditor.current && content !== editor.getHTML()) {
            const { from, to } = editor.state.selection;
            editor.commands.setContent(content, false);
            // Try to restore cursor position, but don't error if it's invalid
            try {
                editor.commands.setTextSelection({ from, to });
            } catch {
                // Selection might be invalid after content change, that's okay
            }
        }
    }, [content, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="rounded-lg border border-gray-300 bg-white shadow-sm transition-shadow focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
            {/* Toolbar */}
            <div className="flex items-center gap-1 border-b border-gray-200 bg-gray-50 px-3 py-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`flex h-7 w-7 items-center justify-center rounded text-sm font-bold transition-all ${
                        editor.isActive('bold')
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                    title="Bold (Ctrl+B)"
                    aria-label="Bold"
                >
                    B
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`flex h-7 w-7 items-center justify-center rounded text-sm font-bold italic transition-all ${
                        editor.isActive('italic')
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                    title="Italic (Ctrl+I)"
                    aria-label="Italic"
                >
                    I
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`flex h-7 items-center justify-center gap-1 rounded px-2 text-xs transition-all ${
                        editor.isActive('orderedList')
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                    }`}
                    title="Numbered list"
                    aria-label="Numbered list"
                >
                    <svg
                        className="h-3.5 w-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M3 4a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    </svg>
                    <span className="text-xs font-medium">123</span>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`flex h-7 items-center justify-center gap-1 rounded px-2 text-xs transition-all ${
                        editor.isActive('bulletList')
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                    }`}
                    title="Bullet list"
                    aria-label="Bullet list"
                >
                    <svg
                        className="h-3.5 w-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M3 4a1 1 0 100-2 1 1 0 000 2zm0 6a1 1 0 100-2 1 1 0 000 2zm0 6a1 1 0 100-2 1 1 0 000 2zm3-11h14a1 1 0 110 2H6a1 1 0 010-2zm0 6h14a1 1 0 110 2H6a1 1 0 010-2zm0 6h14a1 1 0 110 2H6a1 1 0 010-2z" />
                    </svg>
                    <span className="text-xs font-medium">•••</span>
                </button>
            </div>

            {/* Editor Content */}
            <div className="relative">
                <EditorContent
                    editor={editor}
                    className="[&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:px-4 [&_.ProseMirror]:py-3 [&_.ProseMirror]:text-gray-900 [&_.ProseMirror]:outline-none [&_.ProseMirror_em]:italic [&_.ProseMirror_li]:my-1 [&_.ProseMirror_ol]:ml-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_strong]:font-bold [&_.ProseMirror_ul]:ml-6 [&_.ProseMirror_ul]:list-disc"
                />
            </div>
        </div>
    );
}
