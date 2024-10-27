// rtp-frontend/src/SignUp.js
import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

const SignUp = () => {
  const { sendSignInEmail } = useAuth(); // Function to send email link
  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    sendSignInEmail(email);
    alert('A registration link has been sent to your email address. Please check your inbox.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sign Up</h2>
      <p>Enter your email to receive a registration link:</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleSignUp}>Send Registration Link</button>
    </div>
  );
};

export default SignUp;
