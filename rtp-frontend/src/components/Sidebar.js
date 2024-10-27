// rtp-frontend/src/components/Sidebar.js
import React from 'react';
import { FiSettings, FiPlus } from 'react-icons/fi';
import Tooltip from '@mui/material/Tooltip';

const Sidebar = ({ toggleSettings, createNewPad, hidden }) => {
  return (
    <div style={{ ...styles.sidebar, transform: hidden ? 'translateX(100%)' : 'translateX(0)' }}>
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
  );
};

const styles = {
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
    transition: 'transform 0.3s ease', // Smooth transition for hiding/showing
  },
  iconButton: {
    cursor: 'pointer',
    margin: '20px 0',
    color: '#ffffff',
  },
};

export default Sidebar;
