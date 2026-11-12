import {getAuth} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyCeUlC0udjUA3SQ_BTHSRPTQbp4dgmNggI",
  authDomain: "minitiktok-48fac.firebaseapp.com",
  projectId: "minitiktok-48fac",
  storageBucket: "minitiktok-48fac.firebasestorage.app",
  messagingSenderId: "225808271536",
  appId: "1:225808271536:web:f2b6215a23b5a7eecb5375",
  measurementId: "G-XGHL72ZT2L"
};

export const auth = getAuth(app);
