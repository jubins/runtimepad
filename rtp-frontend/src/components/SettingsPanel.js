// rtp-frontend/src/components/SettingsPanel.js
import React from 'react';

const SettingsPanel = ({ editorTheme, setEditorTheme, language, setLanguage, closeSettings }) => {
  return (
    <div style={styles.settingsPane}>
      <div style={styles.settingsHeader}>
        <h2>Settings</h2>
        <button style={styles.closeButton} onClick={closeSettings}>
          X
        </button>
      </div>
      <div style={styles.settingsOption}>
        <label htmlFor="language">Syntax</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={styles.selectBox}
        >
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
        <select
          id="theme"
          value={editorTheme}
          onChange={(e) => setEditorTheme(e.target.value)}
          style={styles.selectBox}
        >
          <option value="vs-dark">Dark</option>
          <option value="vs-light">Light</option>
          <option value="hc-black">High Contrast</option>
        </select>
      </div>
    </div>
  );
};

const styles = {
  settingsPane: {
    position: 'fixed',
    right: '0',
    top: '50px',
    width: '300px',
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    zIndex: 2000,
    overflowY: 'auto',
    transition: 'transform 0.3s ease',
    fontFamily: 'Arial, sans-serif',
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
  selectBox: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
};

export default SettingsPanel;
