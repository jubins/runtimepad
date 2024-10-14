// rtp-frontend/src/CollaborativeEditor.js
import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import io from 'socket.io-client';
import { useAuth } from './AuthProvider';

const socket = io('http://localhost:5000');  // Flask backend URL

const CollaborativeEditor = () => {
  const { user, sendSignInEmail } = useAuth();
  const [code, setCode] = useState('// Start coding!');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      const room = "default-room";
      socket.emit('join', { room, username: user.email });

      socket.on('code-update', (newCode) => {
        setCode(newCode);
      });
    }

    return () => {
      socket.off('code-update');
    };
  }, [user]);

  if (!user) {
    return (
      <div>
        <p>You must be logged in to use the editor.</p>
        
        {/* Email Sign-In Form */}
        <h3>Sign In with Email Link</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={() => sendSignInEmail(email)}>Send Sign-In Link</button>
      </div>
    );
  }

  const handleEditorChange = (newValue) => {
    setCode(newValue);
    const room = "default-room";
    socket.emit('code-change', { room, code: newValue });
  };

  return (
    <div>
      <Editor
        height="90vh"
        language="javascript"
        value={code}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CollaborativeEditor;
