// rtp-frontend/src/Login.js
import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

const Login = () => {
  const { sendSignInEmail } = useAuth(); // Function to send email link
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    sendSignInEmail(email);
    alert('Sign-in link has been sent to your email address. Please check your inbox.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <p>Enter your email to receive a sign-in link:</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleLogin}>Send Sign-In Link</button>
    </div>
  );
};

export default Login;
