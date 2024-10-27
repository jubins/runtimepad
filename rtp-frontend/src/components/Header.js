// rtp-frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>RuntimePad</h2>
      <div>
        {user ? (
          <>
            <span style={styles.welcomeMessage}>Welcome, {user.email}</span>
            <button onClick={signOut} style={styles.signOutButton}>Sign Out</button>
          </>
        ) : (
          <Link to="/login" style={styles.loginLink}>Login</Link>
        )}
      </div>
    </header>
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
    margin: '0', // Ensure there's no margin that creates a gap
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0', // Remove any top margin from the logo
  },
  loginLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '8px 16px',
    backgroundColor: '#007BFF',
    borderRadius: '5px',
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
