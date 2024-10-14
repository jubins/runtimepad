// rtp-frontend/src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnKdgBtlCh7vnYwdNg99HI7qxSayq_Urw",
  authDomain: "runtimepad.firebaseapp.com",
  projectId: "runtimepad",
  storageBucket: "runtimepad.appspot.com",
  messagingSenderId: "861332211613",
  appId: "1:861332211613:web:79f2365ffabd851e571174",
  measurementId: "G-509YTWZ6V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export the services you need for use in your components
export { auth, db, analytics };
