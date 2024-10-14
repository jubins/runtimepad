// rtp-frontend/src/AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [emailForSignIn, setEmailForSignIn] = useState('');

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Send the sign-in link to the provided email
  const sendSignInEmail = async (email) => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/', // The URL the user will be redirected to after clicking the link
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email); // Store the email for later verification
  };

  // Complete the sign-in process if the user has clicked the sign-in link
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
          setUser(result.user);
        })
        .catch((error) => {
          console.error('Error signing in with email link', error);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, sendSignInEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

// Fix the typo here: replace `useConte` with `useContext`
export const useAuth = () => useContext(AuthContext);
