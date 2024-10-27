// rtp-frontend/src/Login.js
import React, { useState } from 'react';
import Header from './components/Header';
import { useAuth } from './AuthProvider';

const Login = () => {
  const { sendSignInEmail } = useAuth();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    sendSignInEmail(email);
    alert('Sign-in link has been sent to your email address. Please check your inbox.');
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.card}>
        <h2>Login</h2>
        <p>Enter your email to receive a sign-in link:</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>Send Sign-In Link</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  card: {
    marginTop: '50px',
    padding: '30px',
    width: '400px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;
