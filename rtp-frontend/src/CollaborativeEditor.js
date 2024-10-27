// rtp-frontend/src/CollaborativeEditor.js
import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { FiSettings, FiPlus } from 'react-icons/fi';
import io from 'socket.io-client';
import Header from './components/Header';
import { v4 as uuidv4 } from 'uuid';
import Tooltip from '@mui/material/Tooltip'; // Tooltip from MUI for modern look

const socket = io('http://127.0.0.1:5000'); // Flask backend URL

const CollaborativeEditor = () => {
  const { padId } = useParams();
  const [code, setCode] = useState('// Start coding!');
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('javascript');
  const [showSettings, setShowSettings] = useState(false); // Toggle settings pane visibility

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

  const toggleSettings = () => {
    setShowSettings((prevShowSettings) => !prevShowSettings);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event) => {
    setEditorTheme(event.target.value);
  };

  const createNewPad = () => {
    const newPadId = uuidv4();
    window.open(`/pad/${newPadId}`, '_blank');
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.editorWrapper(showSettings)}>
        {/* Sidebar with settings and add pad icons */}
        <div style={styles.sidebar}>
          <Tooltip title="Editor Settings" placement="left">
            <div style={styles.iconButton} onClick={toggleSettings}>
              <FiSettings size={24} />
            </div>
          </Tooltip>
          <Tooltip title="Create New RuntimePad" placement="left">
            <div style={styles.iconButton} onClick={createNewPad}>
              <FiPlus size={24} />
            </div>
          </Tooltip>
        </div>

        {/* Monaco Editor */}
        <Editor
          height="100vh"
          width={showSettings ? 'calc(100% - 350px)' : '100%'} // Adjust width if settings are open
          language={language} // Use updated language here
          value={code}
          onChange={handleEditorChange}
          theme={editorTheme}
          key={language} // Use key to force re-render on language change
        />

        {/* Settings Pane */}
        {showSettings && (
          <div style={styles.settingsPane}>
            <div style={styles.settingsHeader}>
              <h2>Settings</h2>
              <button style={styles.closeButton} onClick={toggleSettings}>
                X
              </button>
            </div>
            <div style={styles.settingsOption}>
              <label htmlFor="language">Syntax</label>
              <select id="language" value={language} onChange={handleLanguageChange}>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="json">JSON</option>
                <option value="plaintext">Plain Text</option>
              </select>
            </div>
            <div style={styles.settingsOption}>
              <label htmlFor="theme">Theme</label>
              <select id="theme" value={editorTheme} onChange={handleThemeChange}>
                <option value="vs-dark">Dark</option>
                <option value="vs-light">Light</option>
                <option value="hc-black">High Contrast</option>
              </select>
            </div>
          </div>
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
    width: showSettings ? 'calc(100% - 350px)' : '100%', // Adjust for settings pane
    transition: 'width 0.3s ease', // Smooth transition when resizing
  }),
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: '10px',
    position: 'absolute',
    right: '0', // Align to the right
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
  settingsPane: {
    position: 'fixed',
    right: '0',
    top: '50px',
    width: '350px',
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    zIndex: 2000,
    overflowY: 'auto',
    transition: 'transform 0.3s ease', // Smooth transition for showing/hiding
  },
  settingsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.5rem',
  },
  settingsOption: {
    marginBottom: '20px',
  },
};

export default CollaborativeEditor;
