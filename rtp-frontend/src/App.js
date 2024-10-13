import React, { useState } from 'react';
import TextEditor from './TextEditor';

function App() {
  const [code, setCode] = useState('// Write your code here');
  const [theme, setTheme] = useState('vs-dark'); // Example theme

  return (
    <div>
      <TextEditor
        code={code}
        theme={theme}
        onCodeChange={setCode} // Update code when changes occur in the editor
      />
    </div>
  );
}

export default App;
