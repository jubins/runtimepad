// rtp-frontend/src/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();

  const createNewPad = async () => {
    try {
      // Since we set up a proxy, no need to include the base URL
      const response = await axios.post('/create_pad');
      const newPadId = response.data.padId;

      // Navigate to the newly created pad
      navigate(`/pad/${newPadId}`);
    } catch (error) {
      console.error('Error creating new pad:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to RuntimePad</h1>
      <button onClick={createNewPad}>Create New Pad</button>
    </div>
  );
};

export default HomePage;
