// rtp-frontend/src/HomePage.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const createNewPad = async () => {
    try {
      // Call the backend to create a new pad and get a UUID
      const response = await axios.post('/create_pad');
      const newPadId = response.data.padId;

      // Navigate to the newly created pad
      navigate(`/pad/${newPadId}`);
    } catch (error) {
      console.error('Error creating new pad:', error);
    }
  };

  return (
    <div>
      {/* Menu Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
        <h2>RuntimePad</h2>
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
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '20px' }}>
        <h1>Welcome to RuntimePad</h1>
        <button onClick={createNewPad}>Create New Pad</button>
      </div>
    </div>
  );
};

export default HomePage;
