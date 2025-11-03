'use client';

import { useEffect, useRef } from 'react';
import type React from 'react';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

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
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder || 'Describe the work to be done...',
            }),
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            isUpdatingFromEditor.current = true;
            onChange(editor.getHTML());
            setTimeout(() => {
                isUpdatingFromEditor.current = false;
            }, 0);
        },
        editorProps: {
            attributes: {
                class: 'prose-editor min-h-[200px] p-4 text-sm leading-relaxed focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-500',
            },
        },
    });

    // Sync content when prop changes externally (for form reset, etc.)
    useEffect(() => {
        if (editor && !isUpdatingFromEditor.current && content !== editor.getHTML()) {
            const { from, to } = editor.state.selection;
            editor.commands.setContent(content || '', false);
            try {
                editor.commands.setTextSelection({ from, to });
            } catch {
                // Selection might be invalid after content change, that's okay
            }
        }
    }, [content, editor, placeholder]);

    if (!editor) {
        return null;
    }

    const ToolbarButton = ({
        onClick,
        active,
        icon: Icon,
        label,
    }: {
        onClick: () => void;
        active: boolean;
        icon: React.ComponentType<{ className?: string }>;
        label: string;
    }) => (
        <button
            onClick={onClick}
            type="button"
            className={`rounded-lg p-2 transition-all ${
                active ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
            }`}
            title={label}
            aria-label={label}
        >
            <Icon className="h-5 w-5" />
        </button>
    );

    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            {/* Toolbar */}
            <div className="flex items-center gap-1 bg-slate-50 p-3">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                    icon={Bold}
                    label="Bold (Ctrl+B)"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                    icon={Italic}
                    label="Italic (Ctrl+I)"
                />

                <div className="mx-1 h-6 w-px bg-slate-200" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                    icon={List}
                    label="Bullet List"
                />
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                    icon={ListOrdered}
                    label="Ordered List"
                />
            </div>

            {/* Editor Content */}
            <div className="prose-editor min-h-[200px] p-4 text-sm leading-relaxed focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-500">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
