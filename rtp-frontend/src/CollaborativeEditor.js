// rtp-frontend/src/CollaborativeEditor.js
import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SettingsPanel from './components/SettingsPanel';
import { v4 as uuidv4 } from 'uuid';

const socket = io('http://127.0.0.1:5000'); // Flask backend URL

const CollaborativeEditor = () => {
  const { padId } = useParams();
  const [code, setCode] = useState('// Start coding!');
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('javascript');
  const [showSettings, setShowSettings] = useState(false); // Toggle settings pane visibility

  useEffect(() => {
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

  const toggleSettings = () => {
    setShowSettings((prevShowSettings) => !prevShowSettings);
  };

  const createNewPad = () => {
    const newPadId = uuidv4();
    window.open(`/pad/${newPadId}`, '_blank');
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.editorWrapper(showSettings)}>
        <Sidebar
          toggleSettings={toggleSettings}
          createNewPad={createNewPad}
          hidden={showSettings} // Pass the hidden prop to control visibility
        />
        <Editor
          height="100vh"
          width={showSettings ? 'calc(100% - 300px)' : '100%'} // Adjust width if settings are open
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme={editorTheme}
          key={language} // Use key to force re-render on language change
        />
        {showSettings && (
          <SettingsPanel
            editorTheme={editorTheme}
            setEditorTheme={setEditorTheme}
            language={language}
            setLanguage={setLanguage}
            closeSettings={toggleSettings}
          />
        )}
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
  editorWrapper: (showSettings) => ({
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
    height: '100%',
    width: '100%', // Full width; sidebar handles visibility
    transition: 'width 0.3s ease', // Smooth transition when resizing
  }),
};

export default CollaborativeEditor;
