import React from 'react';
import { Editor } from '@monaco-editor/react';

const TextEditor = ({ code, theme, onCodeChange }) => {
  return (
    <div style={{ height: '100vh' }}>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        value={code}
        theme={theme}
        onChange={(value) => onCodeChange(value || '')} // Handle code changes
      />
    </div>
  );
};

export default TextEditor;