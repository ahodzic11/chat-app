// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA33jL6bVuoZSGTwbsBORlu_t3swQRMv0I",
  authDomain: "chat-app-fda64.firebaseapp.com",
  projectId: "chat-app-fda64",
  storageBucket: "chat-app-fda64.appspot.com",
  messagingSenderId: "108094095456",
  appId: "1:108094095456:web:7690201378f2c145750305",
  measurementId: "G-2DKY0EGR90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
