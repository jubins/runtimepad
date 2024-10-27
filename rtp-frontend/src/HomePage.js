// rtp-frontend/src/HomePage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';

const HomePage = () => {
  const navigate = useNavigate();

  // Apply body and root styling directly
  useEffect(() => {
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.boxSizing = 'border-box';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.boxSizing = 'border-box';
  }, []);

  const createNewPad = async () => {
    try {
      const response = await axios.post('/create_pad');
      const newPadId = response.data.padId;
      navigate(`/pad/${newPadId}`);
    } catch (error) {
      console.error('Error creating new pad:', error);
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContent}>
        <h1 style={styles.mainHeading}>Welcome to RuntimePad</h1>
        <button onClick={createNewPad} style={styles.createPadButton}>Create New Pad</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f7fa',
  },
  mainContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  mainHeading: {
    fontSize: '2.5rem',
    color: '#333333',
    marginBottom: '30px',
  },
  createPadButton: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default HomePage;
