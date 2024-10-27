// rtp-frontend/src/CollaborativeEditor.js
import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Link, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth } from './AuthProvider';

const socket = io('http://127.0.0.1:5000');  // Flask backend URL

const CollaborativeEditor = () => {
  const { padId } = useParams(); // Get the padId from the URL
  const { user, signOut } = useAuth(); // Use signOut from the context
  const [code, setCode] = useState('// Start coding!');
  const [editorTheme, setEditorTheme] = useState('vs-dark'); // Default theme is dark

  // Handle user joining a room based on padId
  useEffect(() => {
    if (padId) {
      socket.emit('join', { room: padId, username: user ? user.email : 'Guest' });

      socket.on('code-update', (newCode) => {
        setCode(newCode);
      });
    }

    return () => {
      socket.off('code-update');
    };
  }, [padId, user]);

  const handleEditorChange = (newValue) => {
    setCode(newValue);
    if (padId) {
      socket.emit('code-change', { room: padId, code: newValue });
    }
  };

  // Function to toggle between light and dark themes for the editor
  const toggleEditorTheme = () => {
    setEditorTheme((prevTheme) => (prevTheme === 'vs-dark' ? 'vs-light' : 'vs-dark'));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
        <h2>RuntimePad Editor</h2>
        <div>
          {user ? (
            <>
              <p style={{ display: 'inline-block', marginRight: '10px' }}>Welcome, {user.email}</p>
              <button onClick={signOut} style={{ marginRight: '20px' }}>Sign Out</button>
            </>
          ) : (
            <div>
              <Link to="/login" style={{ marginRight: '10px', color: '#ffffff' }}>Login</Link>
            </div>
          )}
          {/* Theme toggle button */}
          <button onClick={toggleEditorTheme} style={{ marginLeft: '20px' }}>
            Switch to {editorTheme === 'vs-dark' ? 'Light' : 'Dark'} Theme
          </button>
        </div>
      </div>

      {/* Monaco Editor always visible */}
      <Editor
        height="90vh"
        language="javascript"
        value={code}
        onChange={handleEditorChange}
        theme={editorTheme} // Set the Monaco Editor theme here
      />
    </div>
  );
};

export default CollaborativeEditor;
