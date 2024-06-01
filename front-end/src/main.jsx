import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initializeApp } from "firebase/app";
import './index.css'

const firebaseConfig = {
  apiKey: "AIzaSyABBb3p23anyQ2LknP9aXHm4hvV5mNDPsk",
  authDomain: "tanteta-health-center.firebaseapp.com",
  projectId: "tanteta-health-center",
  storageBucket: "tanteta-health-center.appspot.com",
  messagingSenderId: "577363152026",
  appId: "1:577363152026:web:94096a8fb26ef29b64a323"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
