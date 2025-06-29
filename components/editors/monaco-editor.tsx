"use client";

import { useRef, useEffect } from 'react';
import Editor, { EditorProps, Monaco } from '@monaco-editor/react';
import { useTheme } from 'next-themes';

interface MonacoEditorProps extends EditorProps {
  className?: string;
}

export function MonacoEditor({ className, ...props }: MonacoEditorProps) {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    
    // Configure Monaco editor
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.foreground': '#ffffff',
      }
    });

    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000',
      }
    });

    if (props.onMount) {
      props.onMount(editor, monaco);
    }
  };

  return (
    <div className={className}>
      <Editor
        theme={theme === 'dark' ? 'custom-dark' : 'custom-light'}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
          },
          automaticLayout: true,
          ...props.options,
        }}
        onMount={handleEditorDidMount}
        {...props}
      />
    </div>
  );
}