// rtp-frontend/src/components/LoginModal.js
import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { useAuth } from '../AuthProvider';

const LoginModal = ({ open, handleClose }) => {
  const { sendSignInEmail } = useAuth(); // Function to send email link
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    sendSignInEmail(email);
    alert('Sign-in link has been sent to your email address. Please check your inbox.');
    handleClose(); // Close the modal after sending the link
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box sx={styles.modalBox}>
        <Typography id="login-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <Typography id="login-modal-description" sx={{ mt: 2 }}>
          Enter your email to receive a sign-in link:
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button onClick={handleLogin} variant="contained" color="primary" sx={{ mt: 2 }}>
          Send Sign-In Link
        </Button>
      </Box>
    </Modal>
  );
};

const styles = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
};

export default LoginModal;
