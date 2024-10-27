// rtp-frontend/src/CollaborativeEditor.js
import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { FiSettings, FiPlus } from 'react-icons/fi';
import io from 'socket.io-client';
import Header from './components/Header';
import { v4 as uuidv4 } from 'uuid';

const socket = io('http://127.0.0.1:5000'); // Flask backend URL

const CollaborativeEditor = () => {
  const { padId } = useParams();
  const [code, setCode] = useState('// Start coding!');
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    // Apply global styles to remove any unwanted spacing
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.boxSizing = 'border-box';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.boxSizing = 'border-box';
    document.body.style.overflow = 'hidden'; // Disable scroll to make it full-screen
  }, []);

  useEffect(() => {
    if (padId) {
      socket.emit('join', { room: padId });

      socket.on('code-update', (newCode) => {
        setCode(newCode);
      });
    }

    return () => {
      socket.off('code-update');
    };
  }, [padId]);

  const handleEditorChange = (newValue) => {
    setCode(newValue);
    if (padId) {
      socket.emit('code-change', { room: padId, code: newValue });
    }
  };

  const toggleEditorTheme = () => {
    setEditorTheme((prevTheme) => (prevTheme === 'vs-dark' ? 'vs-light' : 'vs-dark'));
  };

  const createNewPad = () => {
    const newPadId = uuidv4();
    window.open(`/pad/${newPadId}`, '_blank');
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.editorWrapper}>
        {/* Sidebar with settings and add pad icons */}
        <div style={styles.sidebar}>
          <div style={styles.iconButton} onClick={toggleEditorTheme}>
            <FiSettings size={24} title="Settings (Toggle Theme)" />
          </div>
          <div style={styles.iconButton} onClick={createNewPad}>
            <FiPlus size={24} title="Create New Pad" />
          </div>
        </div>

        {/* Monaco Editor */}
        <Editor
          height="calc(100vh - 50px)" // Make sure to subtract the header height
          width="calc(100% - 50px)"   // Adjust for the sidebar width
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme={editorTheme}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    boxSizing: 'border-box',
    backgroundColor: '#1e1e1e',
  },
  editorWrapper: {
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: '10px',
    position: 'absolute',
    right: '0',
    top: '0',
    height: '100%',
    zIndex: 1000,
    width: '50px',
  },
  iconButton: {
    cursor: 'pointer',
    margin: '20px 0',
    color: '#ffffff',
  },
};

export default CollaborativeEditor;
