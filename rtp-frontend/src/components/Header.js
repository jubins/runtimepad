// rtp-frontend/src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useAuth } from '../AuthProvider';

const Header = () => {
  const { user, signOut } = useAuth();
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <div style={styles.header}>
      <h2 style={styles.logo}>RuntimePad</h2>
      <div>
        {user ? (
          <>
            <span style={styles.welcomeMessage}>Welcome, {user.email}</span>
            <button onClick={signOut} style={styles.signOutButton}>
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={handleOpenLogin} style={styles.loginButton}>
            Login
          </button>
        )}
      </div>
      <LoginModal open={openLogin} handleClose={handleCloseLogin} />
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333333',
    color: '#ffffff',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2000, // High z-index to always stay on top
    height: '60px',
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  loginButton: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '8px 16px',
    backgroundColor: '#007BFF',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  welcomeMessage: {
    marginRight: '20px',
    fontSize: '1rem',
  },
  signOutButton: {
    padding: '8px 16px',
    fontSize: '1rem',
    backgroundColor: '#d9534f',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Header;
