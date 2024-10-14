import React, { useState } from 'react';
import CollaborativeEditor from './CollaborativeEditor';

function App() {
  const [code, setCode] = useState('// Write your code here');
  const [theme, setTheme] = useState('vs-dark'); // Example theme

  return (
    <div>
      <CollaborativeEditor
        code={code}
        theme={theme}
        onCodeChange={setCode} // Update code when changes occur in the editor
      />
    </div>
  );
}

export default App;
